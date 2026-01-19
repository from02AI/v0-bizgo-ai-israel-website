import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"
import { Resend } from 'resend'
import puppeteer from 'puppeteer-core'
import chromium from '@sparticuz/chromium'
import { buildPdfHtml } from '@/lib/pdf-template'

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

const SUPABASE_URL = process.env.SUPABASE_URL
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY

if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
  // We don't throw at import time to avoid crashing builds, but log for visibility
  console.warn("Supabase env vars not set: SUPABASE_URL or SUPABASE_SERVICE_KEY")
}

function mapNumeric(v: unknown) {
  if (v === undefined || v === null) return null
  const n = Number(v)
  return Number.isFinite(n) ? n : null
}

export async function POST(request: NextRequest) {
  if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
    return NextResponse.json({ error: "Server not configured for Supabase" }, { status: 500 })
  }

  let body: any
  try {
    body = await request.json()
  } catch (err) {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 })
  }

  console.log('[SAVE-REPORT] Received request body keys:', Object.keys(body || {}))
  console.log('[SAVE-REPORT] user_email value:', body?.user_email, 'type:', typeof body?.user_email)

  const { tool1Data, tool2Data, tool3Data, user_email } = body || {}

  if (!tool1Data && !tool2Data && !tool3Data) {
    return NextResponse.json({ error: "No simulator data provided" }, { status: 400 })
  }

  // Map fields from your TS interfaces to DB columns (null when absent)
  const record: Record<string, unknown> = {
    user_email: user_email ?? null,

    /* Tool 1 */
    tool1_task_name: tool1Data?.taskName ?? null,
    tool1_q1: mapNumeric(tool1Data?.q1),
    tool1_q2: mapNumeric(tool1Data?.q2),
    tool1_q3: mapNumeric(tool1Data?.q3),
    tool1_q4: mapNumeric(tool1Data?.q4) ?? 0,
    tool1_score: mapNumeric(tool1Data?.score),
    tool1_fit_label: tool1Data?.fitLabel ?? null,
    tool1_task_type_label: tool1Data?.taskTypeLabel ?? null,
    tool1_repetitiveness_label: tool1Data?.repetitivenessLabel ?? null,
    tool1_documentation_label: tool1Data?.documentationLabel ?? null,

    /* Tool 2 */
    tool2_q1: mapNumeric(tool2Data?.q1),
    tool2_q2: mapNumeric(tool2Data?.q2),
    tool2_q3: mapNumeric(tool2Data?.q3),
    tool2_q4: mapNumeric(tool2Data?.q4),
    tool2_weighted_risk: mapNumeric(tool2Data?.weightedRisk),
    tool2_status: tool2Data?.status ?? null,
    tool2_safety_score: mapNumeric(tool2Data?.safetyScore),
    tool2_safety_label: tool2Data?.safetyLabel ?? null,
    tool2_backups_label: tool2Data?.backupsLabel ?? null,
    tool2_error_detection_label: tool2Data?.errorDetectionLabel ?? null,
    tool2_error_consequence_label: tool2Data?.errorConsequenceLabel ?? null,
    tool2_capacity_label: tool2Data?.capacityLabel ?? null,

    /* Tool 3 */
    tool3_hours_per_week: mapNumeric(tool3Data?.hoursPerWeek),
    tool3_num_employees: mapNumeric(tool3Data?.numEmployees),
    tool3_hourly_rate: mapNumeric(tool3Data?.hourlyRate),
    tool3_learning_hours: mapNumeric(tool3Data?.learningHours),
    tool3_six_month_total: mapNumeric(tool3Data?.sixMonthTotal),
    tool3_break_even_month: mapNumeric(tool3Data?.breakEvenMonth),
    tool3_risk_adjusted: typeof tool3Data?.riskAdjusted === 'boolean' ? tool3Data.riskAdjusted : null,
    tool3_estimated_min_budget: mapNumeric(tool3Data?.estimatedMinBudget),
    tool3_monthly_budget_used: mapNumeric(tool3Data?.monthlyBudgetUsed),
    tool3_implementation_profile: tool3Data?.implementationProfile ?? null,
    tool3_tool1_score: mapNumeric(tool3Data?.tool1Score),
    tool3_tool2_status: tool3Data?.tool2Status ?? null,
    tool3_technical_comfort: tool3Data?.technicalComfort ?? null,
    tool3_technical_comfort_label: tool3Data?.technicalComfortLabel ?? null,
    tool3_implementation_profile_label: tool3Data?.implementationProfileLabel ?? null,
    tool3_recommended_tier: tool3Data?.recommendedTier ?? null,
    tool3_budget_min: mapNumeric(tool3Data?.budgetMin),
    tool3_budget_max: mapNumeric(tool3Data?.budgetMax),

    tool3_monthly_breakdown: tool3Data?.monthlyBreakdown ?? null,
  }

  try {
    // create supabase client at runtime
    const supabase = createClient(SUPABASE_URL || "", SUPABASE_SERVICE_KEY || "")

    const { data, error } = await supabase
      .from('simulator_reports')
      .insert([record])
      .select('id')
      .single()

    if (error) {
      console.error('Supabase insert error', error)
      return NextResponse.json({ error: 'Failed to save report', detail: error.message }, { status: 500 })
    }

    // Attempt to send welcome email with PDF when an email was provided
    let emailSent = false
    const recipient = user_email || null
    
    console.log('[DEBUG] Email send check:', {
      hasRecipient: !!recipient,
      recipient,
      hasResendKey: !!process.env.RESEND_API_KEY,
      resendKeyPrefix: process.env.RESEND_API_KEY?.substring(0, 8)
    })

    if (recipient && process.env.RESEND_API_KEY) {
      console.log('[DEBUG] Starting email send...')
      try {
        const resend = new Resend(process.env.RESEND_API_KEY)

        // Build HTML and render PDF via puppeteer (same settings as /api/generate-pdf)
        const html = buildPdfHtml({ tool1Data, tool2Data, tool3Data })
        let browser = null
        try {
          browser = await puppeteer.launch({
            args: chromium.args,
            defaultViewport: chromium.defaultViewport,
            executablePath: await chromium.executablePath(),
            headless: chromium.headless,
          })

          const page = await browser.newPage()
          await page.setContent(html, { waitUntil: 'networkidle0' })

          const pdfBuffer = await page.pdf({
            format: 'A4',
            printBackground: true,
            margin: { top: '20mm', bottom: '20mm', left: '15mm', right: '15mm' },
          })

          const fromAddress = process.env.RESEND_FROM || 'BizgoAI Israel <onboarding@resend.dev>'
          const taskName = record.tool1_task_name ?? 'דוח'
          const subject = `דוח הערכת מוכנות AI שלך - BizgoAI Israel`

          await resend.emails.send({
            from: fromAddress,
            to: recipient,
            subject,
            html: `<!DOCTYPE html>
<html lang="he">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4; direction: rtl;">
  <div style="max-width: 600px; margin: 20px auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 4px rgba(0,0,0,0.1); direction: rtl;">
    <div style="background: linear-gradient(135deg, #0b2e7b 0%, #1a4ba8 100%); padding: 30px; text-align: center; direction: rtl;">
      <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: bold; direction: rtl;">BizgoAI Israel</h1>
      <p style="color: #e0e7ff; margin: 10px 0 0 0; font-size: 14px; direction: rtl;">פלטפורמת הערכת מוכנות AI</p>
    </div>
    <div style="padding: 40px 30px; direction: rtl; text-align: right;">
      <h2 style="color: #0b2e7b; font-size: 22px; margin: 0 0 20px 0; text-align: right;">שלום!</h2>
      <p style="color: #333333; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0; text-align: right;">
        תודה שהשתמשת בסימולטור ההערכה שלנו! מצורף דוח מפורט עם תוצאות הניתוח שלך.
      </p>
      <div style="background-color: #f8f9fa; border-right: 4px solid #0b2e7b; padding: 20px; margin: 20px 0; border-radius: 4px; direction: rtl;">
        <h3 style="color: #0b2e7b; font-size: 18px; margin: 0 0 15px 0; text-align: right;">הדוח כולל:</h3>
        <ul style="color: #555555; font-size: 15px; line-height: 1.8; margin: 0; padding: 0 20px 0 0; list-style-position: inside; text-align: right;">
          <li style="text-align: right;">ניקוד התאמת המשימה לבינה מלאכותית</li>
          <li style="text-align: right;">הערכת בטיחות ואבטחת מידע</li>
          <li style="text-align: right;">חישוב ROI והחזר השקעה צפוי</li>
          <li style="text-align: right;">המלצות מותאמות אישית</li>
        </ul>
      </div>
      <p style="color: #333333; font-size: 16px; line-height: 1.6; margin: 20px 0; text-align: right;">
        ניתן לפתוח את הקובץ המצורף ולעיין בניתוח המפורט.
      </p>
      <div style="background-color: #e8f4f8; border-radius: 6px; padding: 20px; margin: 30px 0; text-align: center; direction: rtl;">
        <p style="color: #0b2e7b; font-size: 15px; margin: 0; font-weight: 600;">💡 זקוקים לייעוץ נוסף?</p>
        <p style="color: #555555; font-size: 14px; margin: 10px 0 0 0;">אנחנו כאן כדי לעזור לכם ליישם AI בצורה הטובה ביותר</p>
      </div>
      <p style="color: #666666; font-size: 14px; line-height: 1.6; margin: 30px 0 0 0; text-align: right;">
        בברכה,<br/>
        <strong style="color: #0b2e7b;">צוות BizgoAI Israel</strong>
      </p>
    </div>
    <div style="background-color: #f8f9fa; padding: 20px 30px; text-align: center; border-top: 1px solid #e0e0e0; direction: rtl;">
      <p style="color: #999999; font-size: 12px; margin: 0;">© 2026 BizgoAI Israel. כל הזכויות שמורות.</p>
    </div>
  </div>
</body>
</html>`,
            attachments: [
              {
                filename: `BizgoAI-Report-${(record.tool1_task_name || 'report').toString().replace(/[^a-z0-9]/gi, '-')}.pdf`,
                content: pdfBuffer.toString('base64'),
                contentType: 'application/pdf',
              },
            ],
          })

          emailSent = true
          console.log('[DEBUG] Email sent successfully!')
        } finally {
          if (browser) {
            try { await browser.close() } catch (err) { console.warn('Failed closing browser after send', err) }
          }
        }
      } catch (err) {
        console.error('[ERROR] Failed sending welcome email with PDF', err)
        // Don't fail the request because of email issues
      }
    } else {
      console.log('[DEBUG] Skipped email send - recipient or API key missing')
    }

    return NextResponse.json({ id: data.id, emailSent }, { status: 201 })
  } catch (err: any) {
    console.error('Unexpected save error', err)
    return NextResponse.json({ error: 'Unexpected server error' }, { status: 500 })
  }
}
