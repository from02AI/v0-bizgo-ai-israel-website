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

  const { id, user_email } = body || {}
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

    let emailSent = false
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

        const payload = {
          user_email: data.user_email,
          tool1Data: {
            taskName: data.tool1_task_name,
            q1: data.tool1_q1,
            q2: data.tool1_q2,
            q3: data.tool1_q3,
            q4: data.tool1_q4,
            q5: data.tool1_q5,
            q6: data.tool1_q6,
            score: data.tool1_score,
            level: data.tool1_level,
            color: data.tool1_color,
          },
          tool2Data: {
            hasDataPolicy: data.tool2_has_data_policy,
            hasAiGovernance: data.tool2_has_ai_governance,
            hasRiskFramework: data.tool2_has_risk_framework,
            hasIncidentPlan: data.tool2_has_incident_plan,
            hasExternalAudit: data.tool2_has_external_audit,
            score: data.tool2_score,
            level: data.tool2_level,
            color: data.tool2_color,
          },
          tool3Data: {
            hoursPerWeek: data.tool3_hours_per_week,
            hourlyRate: data.tool3_hourly_rate,
            automationPercentage: data.tool3_automation_percentage,
            toolCostPerMonth: data.tool3_tool_cost_per_month,
            monthlySavings: data.tool3_monthly_savings,
            roi: data.tool3_roi,
          },
        }

        console.log('[UPDATE-REPORT] Building HTML template')
        const html = buildPdfHtml(payload)

        let browser = null
        try {
          console.log('[UPDATE-REPORT] Launching Puppeteer...')
          browser = await puppeteer.launch({
            args: chromium.args,
            defaultViewport: chromium.defaultViewport,
            executablePath: await chromium.executablePath(),
            headless: chromium.headless,
          })
          
          console.log('[UPDATE-REPORT] Creating PDF page')
          const page = await browser.newPage()
          
          console.log('[UPDATE-REPORT] Setting page content')
          await page.setContent(html, { waitUntil: 'networkidle0' })
          
          console.log('[UPDATE-REPORT] Generating PDF buffer')
          const pdfBuffer = await page.pdf({ format: 'A4', printBackground: true })
          
          console.log('[UPDATE-REPORT] PDF generated, size:', pdfBuffer.length, 'bytes')

          console.log('[UPDATE-REPORT] Sending email via Resend')
          await resend.emails.send({
            from: process.env.RESEND_FROM || 'BizgoAI Israel <onboarding@resend.dev>',
            to: [user_email],
            subject: 'ðŸš€ ×"×•×— ×"×›× ×•×ª AI ×©×œ×š - BizgoAI Israel',
            html: `
              <div dir="rtl" style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
                <h1 style="color: #0b2e7b;">×©×œ×•×!</h1>
                <p style="font-size: 16px; line-height: 1.6;">
                  ×ž×¦×•×¨×£ ×"×•×— ×"×"×›× ×•×ª ×©×œ×š ×œ-AI, ×›×•×œ×œ:
                </p>
                <ul style="font-size: 14px; line-height: 1.8;">
                  <li>× ×™×§×•×" ×"×ª××ž×ª ×"×ž×©×™×ž×" ×œ-AI</li>
                  <li>×"×¢×¨×›×ª ×'×˜×™×—×•×ª AI</li>
                  <li>×—×™×©×•×' ROI ×•×"×—×–×¨ ×"×©×§×¢×"</li>
                </ul>
                <p style="font-size: 16px; line-height: 1.6;">
                  × ×™×ª×Ÿ ×œ×¤×ª×•×— ××ª ×"×§×•×'×¥ ×"×ž×¦×•×¨×£ ×•×œ×¢×™×™×Ÿ ×'× ×•×—×•×ª.
                </p>
                <p style="font-size: 14px; color: #666;">
                  ×'×'×¨×›×",<br />
                  ×¦×•×•×ª BizgoAI Israel
                </p>
              </div>
            `,
            attachments: [
              {
                filename: `BizgoAI-Report-${id}.pdf`,
                content: pdfBuffer,
              },
            ],
          })

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
