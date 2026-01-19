import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"
import { Resend } from 'resend'
import puppeteer from 'puppeteer'
import { buildPdfHtml } from '@/lib/pdf-template'

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

const SUPABASE_URL = process.env.SUPABASE_URL
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY

if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
  console.warn("Supabase env vars not set: SUPABASE_URL or SUPABASE_SERVICE_KEY")
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

  const { id, user_email } = body || {}
  if (!id || !user_email) {
    return NextResponse.json({ error: "Missing id or user_email" }, { status: 400 })
  }

  try {
    const supabase = createClient(SUPABASE_URL || "", SUPABASE_SERVICE_KEY || "")

    // Update the email and fetch full report data for PDF generation
    const { data, error } = await supabase
      .from('simulator_reports')
      .update({ user_email })
      .eq('id', id)
      .select('*')
      .single()

    if (error) {
      console.error('Supabase update error', error)
      return NextResponse.json({ error: 'Failed to update report', detail: error.message }, { status: 500 })
    }

    // Send email with PDF if email was provided and API key is set
    let emailSent = false
    if (user_email && process.env.RESEND_API_KEY) {
      console.log('[DEBUG update-report] Sending email to:', user_email)
      try {
        const resend = new Resend(process.env.RESEND_API_KEY)
        
        // Build payload from database record
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

        const html = buildPdfHtml(payload)
        
        let browser = null
        try {
          browser = await puppeteer.launch({
            headless: true,
            args: ['--no-sandbox', '--disable-setuid-sandbox'],
          })
          const page = await browser.newPage()
          await page.setContent(html, { waitUntil: 'networkidle0' })
          const pdfBuffer = await page.pdf({ format: 'A4', printBackground: true })

          await resend.emails.send({
            from: process.env.RESEND_FROM || 'BizgoAI Israel <onboarding@resend.dev>',
            to: [user_email],
            subject: '🚀 דוח הכנות AI שלך - BizgoAI Israel',
            html: `
              <div dir="rtl" style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
                <h1 style="color: #0b2e7b;">שלום!</h1>
                <p style="font-size: 16px; line-height: 1.6;">
                  מצורף דוח ההכנות שלך ל-AI, כולל:
                </p>
                <ul style="font-size: 14px; line-height: 1.8;">
                  <li>ניקוד התאמת המשימה ל-AI</li>
                  <li>הערכת בטיחות AI</li>
                  <li>חישוב ROI והחזר השקעה</li>
                </ul>
                <p style="font-size: 16px; line-height: 1.6;">
                  ניתן לפתוח את הקובץ המצורף ולעיין בו בנוחות.
                </p>
                <p style="font-size: 14px; color: #666;">
                  בברכה,<br />
                  צוות BizgoAI Israel
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
          console.log('[DEBUG update-report] Email sent successfully!')
        } finally {
          if (browser) {
            try { await browser.close() } catch (err) { console.warn('Failed closing browser', err) }
          }
        }
      } catch (err) {
        console.error('[ERROR update-report] Failed sending email', err)
      }
    } else {
      console.log('[DEBUG update-report] Skipped email - no email or API key')
    }

    return NextResponse.json({ id: data.id, emailSent }, { status: 200 })
  } catch (err) {
    console.error('Unexpected update error', err)
    return NextResponse.json({ error: 'Unexpected error' }, { status: 500 })
  }
}
