import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"
import { upsertSubscriber, syncToProvider } from '@/lib/subscriber'
import { Resend } from 'resend'
import puppeteer from 'puppeteer-core'
import chromium from '@sparticuz/chromium'
import { buildPdfHtml } from '@/lib/pdf-template'

// Debug: log when module is loaded (helps validate that the route is deployed and imports run on cold start)
console.log('[UPDATE-REPORT] Module loaded. SUPABASE_URL present:', !!process.env.SUPABASE_URL, 'RESEND_API_KEY present:', !!process.env.RESEND_API_KEY)

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

// Check if running locally (not in Vercel serverless)
const isLocal = process.env.NODE_ENV === 'development' || !process.env.VERCEL

// Common Chrome paths for local development
const LOCAL_CHROME_PATHS = {
  win32: [
    'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
    (process.env.LOCALAPPDATA || '') + '\\Google\\Chrome\\Application\\chrome.exe',
  ],
  darwin: ['/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'],
  linux: ['/usr/bin/google-chrome', '/usr/bin/chromium-browser'],
}

async function getLocalChromePath(): Promise<string | null> {
  const platform = process.platform as keyof typeof LOCAL_CHROME_PATHS
  const paths = LOCAL_CHROME_PATHS[platform] || []
  
  for (const p of paths) {
    try {
      const fs = await import('fs')
      if (fs.existsSync(p)) return p
    } catch { /* ignore */ }
  }
  return null
}

// Simple GET handler to confirm route is reachable
export async function GET() {
  console.log('[UPDATE-REPORT] GET ping received')
  return NextResponse.json({ ok: true })
}

const SUPABASE_URL = process.env.SUPABASE_URL
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY

if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
  console.warn("Supabase env vars not set: SUPABASE_URL or SUPABASE_SERVICE_KEY")
}

export async function POST(request: NextRequest) {
  console.log('[UPDATE-REPORT] ========== REQUEST RECEIVED ==========')
  console.log('[UPDATE-REPORT] Timestamp:', new Date().toISOString())

  if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
    console.log('[UPDATE-REPORT] ERROR: Supabase env vars not set')
    return NextResponse.json({ error: "Server not configured for Supabase" }, { status: 500 })
  }

  let body: any
  try {
    body = await request.json()
    console.log('[UPDATE-REPORT] Received body:', JSON.stringify(body, null, 2))  
  } catch (err) {
    console.log('[UPDATE-REPORT] ERROR: Invalid JSON')
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 })
  }

  const { id, user_email, subscribeCommunity } = body || {}
  const subscribed = !!subscribeCommunity
  console.log('[UPDATE-REPORT] Extracted values:', { id, user_email, hasId: !!id, hasEmail: !!user_email })

  if (!id || !user_email) {
    console.log('[UPDATE-REPORT] ERROR: Missing id or user_email')
    return NextResponse.json({ error: "Missing id or user_email" }, { status: 400 })
  }

  try {
    const supabase = createClient(SUPABASE_URL || "", SUPABASE_SERVICE_KEY || "") 

    console.log('[UPDATE-REPORT] Querying Supabase for id:', id)
    const { data, error } = await supabase
      .from('simulator_reports')
      .update({ user_email })
      .eq('id', id)
      .select('*')
      .single()

    if (error) {
      console.error('[UPDATE-REPORT] Supabase update error', error)
      return NextResponse.json({ error: 'Failed to update report', detail: error.message }, { status: 500 })
    }

    console.log('[UPDATE-REPORT] Successfully updated record, id:', data.id)

    // Best-effort internal notification if the user explicitly opted into community updates.
    // Does not block returning success and does not rely on additional DB columns.
    if (subscribed && user_email && process.env.RESEND_API_KEY) {
      try {
        const resendInternal = new Resend(process.env.RESEND_API_KEY)

        const rawFrom = process.env.RESEND_FROM || ''
        const normalizeFrom = (s: string) => s.replace(/\u00A0|\u202F|\uFEFF|\u200B/g, ' ').replace(/_/g, ' ').replace(/\s+/g, ' ').trim()
        const normalizedFrom = normalizeFrom(rawFrom)
        const fromValidRegex = /^(.*<[^@\s]+@[^>]+>|[^@\s]+@[^@\s]+\.[^@\s]+)$/
        const fromAddress = (normalizedFrom && fromValidRegex.test(normalizedFrom))
          ? normalizedFrom
          : 'BizGoAI <contact@bizgoai.co.il>'

        const toInternal = process.env.CONTACT_EMAIL || 'contact@bizgoai.co.il'
        const taskName = data.tool1_task_name || 'דוח סימולטור'

        const internalResult = await resendInternal.emails.send({
          from: fromAddress,
          to: [toInternal],
          replyTo: String(user_email),
          subject: `Opt-in לקהילה (סימולטור): ${taskName}`,
          html: `<!doctype html><html lang="he" dir="rtl"><body style="direction:rtl;font-family:Arial,sans-serif;">
            <h2 style="margin:0 0 12px 0; color:#0b2e7b;">Opt-in לקהילה — סימולטור</h2>
            <p style="margin:0 0 8px 0;"><strong>אימייל:</strong> ${String(user_email)}</p>
            <p style="margin:0 0 8px 0;"><strong>מזהה דוח:</strong> ${String(data.id)}</p>
            <p style="margin:0; color:#666; font-size:12px;">המשתמש בחר להצטרף לקהילה/לקבל עדכונים.</p>
          </body></html>`,
        })

        if (internalResult.error) {
          console.warn('[UPDATE-REPORT] Internal opt-in notify error:', internalResult.error)
        } else {
          console.log('[UPDATE-REPORT] Internal opt-in notify sent. ID:', internalResult.data?.id)
        }
      } catch (err) {
        console.warn('[UPDATE-REPORT] Internal opt-in notify exception (ignored):', err)
      }
    }

    // If the user opted into community updates, create canonical subscriber and start provider sync.
    if (subscribed && user_email) {
      (async () => {
        try {
          const row = await upsertSubscriber({
            email: String(user_email).trim(),
            name: null,
            consent_source: 'simulator-update',
            metadata: { reportId: data.id },
            ip: null,
            user_agent: null,
            subscribed: true,
          })
          syncToProvider(row).catch((e) => console.warn('[UPDATE-REPORT] provider sync failed (ignored)', e))
        } catch (e) {
          console.warn('[UPDATE-REPORT] upsertSubscriber failed (ignored)', e)
        }
      })()
    }

    let emailSent = false
    // Canonical site URL for building absolute links inside emails. Prefer server-only SITE_URL,
    // fall back to NEXT_PUBLIC_SITE_URL for dev/build environments, then to a safe default.
    const siteUrl = process.env.SITE_URL || process.env.NEXT_PUBLIC_SITE_URL || 'https://bizgoai.co.il'
    console.log('[UPDATE-REPORT] Checking email send conditions:', { 
      hasEmail: !!user_email,
      email: user_email,
      hasResendKey: !!process.env.RESEND_API_KEY,
      resendKeyPrefix: process.env.RESEND_API_KEY?.substring(0, 8)
    })

    if (user_email && process.env.RESEND_API_KEY) {
      console.log('[UPDATE-REPORT] Starting email send to:', user_email)
      try {
        const resend = new Resend(process.env.RESEND_API_KEY)

        // Build payload with CORRECT fields that match pdf-template.ts interfaces
        const payload = {
          tool1Data: {
            taskName: data.tool1_task_name,
            taskTypeLabel: data.tool1_task_type_label,
            repetitivenessLabel: data.tool1_repetitiveness_label,
            documentationLabel: data.tool1_documentation_label,
            score: data.tool1_score,
            fitLabel: data.tool1_fit_label,
          },
          tool2Data: {
            safetyScore: data.tool2_safety_score,
            status: data.tool2_status,
            safetyLabel: data.tool2_safety_label,
            backupsLabel: data.tool2_backups_label,
            errorDetectionLabel: data.tool2_error_detection_label,
            errorConsequenceLabel: data.tool2_error_consequence_label,
            capacityLabel: data.tool2_capacity_label,
            weightedRisk: data.tool2_weighted_risk,
          },
          tool3Data: {
            hoursPerWeek: data.tool3_hours_per_week,
            numEmployees: data.tool3_num_employees,
            hourlyRate: data.tool3_hourly_rate,
            sixMonthTotal: data.tool3_six_month_total,
            breakEvenMonth: data.tool3_break_even_month,
            monthlyBudgetUsed: data.tool3_monthly_budget_used,
            implementationProfileLabel: data.tool3_implementation_profile_label,
            learningHours: data.tool3_learning_hours,
            technicalComfortLabel: data.tool3_technical_comfort_label,
            recommendedTier: data.tool3_recommended_tier,
            budgetMin: data.tool3_budget_min,
            budgetMax: data.tool3_budget_max,
            riskAdjusted: data.tool3_risk_adjusted,
            monthlyBreakdown: data.tool3_monthly_breakdown,
          },
        }

        console.log('[UPDATE-REPORT] Payload built with correct fields')
        console.log('[UPDATE-REPORT] Tool1 taskName:', payload.tool1Data.taskName)
        console.log('[UPDATE-REPORT] Tool1 score:', payload.tool1Data.score)
        console.log('[UPDATE-REPORT] Building HTML template')
        const html = buildPdfHtml(payload)

        let browser = null
        try {
          console.log('[UPDATE-REPORT] Launching Puppeteer...')
          
          // Use local Chrome for development, @sparticuz/chromium for Vercel
          let launchOptions
          
          if (isLocal) {
            const localChrome = await getLocalChromePath()
            if (!localChrome) {
              console.warn('[UPDATE-REPORT] No local Chrome found, skipping PDF generation')
              throw new Error('No local Chrome')
            }
            console.log('[UPDATE-REPORT] Using local Chrome:', localChrome)
            launchOptions = {
              executablePath: localChrome,
              headless: true,
              args: ['--no-sandbox', '--disable-setuid-sandbox'],
            }
          } else {
            console.log('[UPDATE-REPORT] Using Vercel chromium')
            launchOptions = {
              args: chromium.args,
              defaultViewport: chromium.defaultViewport,
              executablePath: await chromium.executablePath(),
              headless: chromium.headless,
            }
          }
          
          browser = await puppeteer.launch(launchOptions)
          
          console.log('[UPDATE-REPORT] Creating PDF page')
          const page = await browser.newPage()
          
          console.log('[UPDATE-REPORT] Setting page content')
          await page.setContent(html, { waitUntil: 'networkidle0' })
          
          console.log('[UPDATE-REPORT] Generating PDF buffer')
          const pdfUint8Array = await page.pdf({ 
            format: 'A4', 
            printBackground: true,
            margin: {
              top: '20mm',
              bottom: '20mm',
              left: '15mm',
              right: '15mm',
            },
          })
          
          // CRITICAL FIX: page.pdf() returns Uint8Array, NOT Buffer!
          // Must explicitly wrap with Buffer.from() for correct base64 encoding
          const pdfBuffer = Buffer.from(pdfUint8Array)
          
          console.log('[UPDATE-REPORT] PDF generated, size:', pdfBuffer.length, 'bytes')
          console.log('[UPDATE-REPORT] Is Uint8Array:', pdfUint8Array instanceof Uint8Array)
          console.log('[UPDATE-REPORT] Is Buffer after wrap:', Buffer.isBuffer(pdfBuffer))
          console.log('[UPDATE-REPORT] PDF first 20 bytes:', pdfBuffer.slice(0, 20).toString('hex'))

          // Now base64 encoding will work correctly
          const base64Content = pdfBuffer.toString('base64')
          console.log('[UPDATE-REPORT] Base64 length:', base64Content.length, 'bytes')
          console.log('[UPDATE-REPORT] Base64 first 50 chars:', base64Content.substring(0, 50))
          console.log('[UPDATE-REPORT] Base64 last 50 chars:', base64Content.substring(base64Content.length - 50))
          
          // Calculate ratio to verify encoding
          const ratio = (base64Content.length / pdfBuffer.length).toFixed(2)
          console.log('[UPDATE-REPORT] Base64 expansion ratio:', ratio, '(should be ~1.33)')

          console.log('[UPDATE-REPORT] Sending email via Resend')
          // Normalize and validate RESEND_FROM to prevent malformed characters from blocking sends
          const rawFrom = process.env.RESEND_FROM || ''
          const normalizeFrom = (s: string) => s.replace(/\u00A0|\u202F|\uFEFF|\u200B/g, ' ').replace(/_/g, ' ').replace(/\s+/g, ' ').trim()
          const normalizedFrom = normalizeFrom(rawFrom)
          const fromValidRegex = /^(.*<[^@\s]+@[^>]+>|[^@\s]+@[^@\s]+\.[^@\s]+)$/
          let finalFrom = ''
          if (normalizedFrom && fromValidRegex.test(normalizedFrom)) {
            finalFrom = normalizedFrom
          } else {
            console.warn('[UPDATE-REPORT] RESEND_FROM invalid or missing after normalization; falling back to BizGoAI <contact@bizgoai.co.il>')
            finalFrom = 'BizGoAI <contact@bizgoai.co.il>'
          }

          const emailResult = await resend.emails.send({
            from: finalFrom,
            to: [user_email],
            subject: 'דוח הערכת מוכנות AI שלך',
            html: `<!DOCTYPE html>
<html lang="he">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
<head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4; direction: rtl;">
  <div style="max-width: 600px; margin: 20px auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 4px rgba(0,0,0,0.1); direction: rtl;">
    <div style="background: linear-gradient(135deg, #0b2e7b 0%, #1a4ba8 100%); padding: 30px; text-align: center; direction: rtl;">
      <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: bold; direction: rtl;">BizGoAI</h1>
      <p style="color: #e0e7ff; margin: 10px 0 0 0; font-size: 14px; direction: rtl;">הערכת מוכנות AI לעסק שלך</p>
    </div>
    <div style="padding: 40px 30px; direction: rtl; text-align: right;">
      <h2 style="color: #0b2e7b; font-size: 22px; margin: 0 0 20px 0; text-align: right;">שלום!</h2>
      <p style="color: #333333; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0; text-align: right;">
תודה שהשתמשת בסימולטור BizGoAI. <br/> מצורף למייל קובץ PDF עם דוח התוצאות המפורט לעסק שלך.
      </p>
      <div style="background-color: #f8f9fa; border-right: 4px solid #0b2e7b; padding: 20px; margin: 20px 0; border-radius: 4px; direction: rtl;">
        <h3 style="color: #0b2e7b; font-size: 18px; margin: 0 0 15px 0; text-align: right;">הדוח כולל:</h3>
        <ul style="color: #555555; font-size: 15px; line-height: 1.8; margin: 0; padding: 0 20px 0 0; list-style-position: inside; text-align: right;">
          <li style="text-align: right;">הערכת התאמת המשימה ל-AI</li>
          <li style="text-align: right;">בדיקת בטיחות</li>
          <li style="text-align: right;">הערכת חסכון ל-6 חודשים </li>
        </ul>
      </div>
      <p style="color: #333333; font-size: 16px; line-height: 1.6; margin: 20px 0; text-align: right;">
        ניתן לפתוח את הקובץ המצורף ולעיין בניתוח המפורט.
      </p>
      <p class="signature" dir="rtl" style="direction: rtl; text-align: right;">
        בברכה,<br/>
        שני כרמי רדושיצקי
        מייסדת BizGoAI <br/>
        <span style="font-weight: normal; font-size: 14px;">עסקים קטנים מתקדמים עם AI. בביטחון.</span>
      </p>
    </div>
    <div style="background-color: #f8f9fa; padding: 20px 30px; text-align: center; border-top: 1px solid #e0e0e0; direction: rtl;">
      <p style="color: #999999; font-size: 12px; margin: 0;">© 2026 BizGoAI. כל הזכויות שמורות.</p>
    </div>
  </div>
</body>
</html>`,
            attachments: [
              {
                filename: `BizGoAI-Report-${id}.pdf`,
                content: base64Content,
                // CRITICAL FIX: Removed contentType - let Resend infer from .pdf filename
              },
            ],
          })

          console.log('[UPDATE-REPORT] Email send result:', JSON.stringify(emailResult))

          emailSent = true
          console.log('[UPDATE-REPORT] Email sent successfully!')
        } catch (puppeteerError) {
          console.error('[UPDATE-REPORT] Puppeteer/PDF error:', puppeteerError)
          throw puppeteerError
        } finally {
          if (browser) {
            console.log('[UPDATE-REPORT] Closing browser')
            try { await browser.close() } catch (err) { console.warn('[UPDATE-REPORT] Failed closing browser', err) }
          }
        }
      } catch (err) {
        console.error('[UPDATE-REPORT ERROR] Failed sending email:', err)
      }
    } else {
      console.log('[UPDATE-REPORT] Skipped email send - missing email or API key')
    }

    console.log('[UPDATE-REPORT] Returning response:', { id: data.id, emailSent })
    return NextResponse.json({ id: data.id, emailSent }, { status: 200 })
  } catch (err) {
    console.error('[UPDATE-REPORT] Unexpected error', err)
    return NextResponse.json({ error: 'Unexpected error' }, { status: 500 })      
  }
}
