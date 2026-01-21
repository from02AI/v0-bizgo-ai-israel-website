import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"
import { Resend } from 'resend'

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

const SUPABASE_URL = process.env.SUPABASE_URL
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY

// Debug logging
console.log('[CONSULTATION] Module loaded. SUPABASE_URL present:', !!SUPABASE_URL, 'RESEND_API_KEY present:', !!process.env.RESEND_API_KEY)

if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
  console.warn("Supabase env vars not set: SUPABASE_URL or SUPABASE_SERVICE_KEY")
}

export async function POST(request: NextRequest) {
  console.log('[CONSULTATION] ========== REQUEST RECEIVED ==========')
  console.log('[CONSULTATION] Timestamp:', new Date().toISOString())
  
  if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
    console.log('[CONSULTATION] ERROR: Supabase env vars not set')
    return NextResponse.json({ error: "Server not configured for Supabase" }, { status: 500 })
  }

  let body: any
  try {
    body = await request.json()
    console.log('[CONSULTATION] Received consultation request for:', body.email, 'business:', body.businessName)
  } catch (err) {
    console.log('[CONSULTATION] ERROR: Invalid JSON')
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 })
  }

  // Extract common headers for debugging and storage
  const forwardedFor = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || null
  const userAgent = request.headers.get('user-agent') || null

  console.log('[CONSULTATION] Request metadata:', { ip: forwardedFor?.substring(0, 20), userAgent: userAgent?.substring(0, 50) })

  // Basic validation
  // Structured validation
  const errors: Record<string, string> = {}
  if (!body || typeof body !== 'object') {
    console.log('[CONSULTATION] ERROR: Invalid body type')
    return NextResponse.json({ error: 'Invalid body' }, { status: 400 })
  }

  if (!body.isDecisionMaker) errors.isDecisionMaker = 'יש לאשר שאתם בעלי החלטה כדי להמשיך'
  if (!body.canCommitToTrial) errors.canCommitToTrial = 'יש לאשר שאתם יכולים להתחייב לתהליך'
  if (!body.fullName || !String(body.fullName).trim()) errors.fullName = 'יש להזין שם מלא'
  if (!body.email || !String(body.email).trim()) errors.email = 'יש להזין כתובת אימייל'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(body.email))) errors.email = 'כתובת אימייל לא תקינה'
  if (!body.businessName || !String(body.businessName).trim()) errors.businessName = 'יש להזין שם עסק'
  if (!body.sector) errors.sector = 'יש לבחור ענף'
  if (!body.mainProduct || !String(body.mainProduct).trim()) errors.mainProduct = 'יש לציין את המוצר/שירות המרכזי'
  if (!body.businessSize) errors.businessSize = 'יש לבחור את גודל העסק'
  if (!body.selectedProcess) errors.selectedProcess = 'יש לבחור תהליך'
  if (!body.weeklyTimeSpent) errors.weeklyTimeSpent = 'יש לבחור טווח שעות'
  if (!body.aiMistakeImpact) errors.aiMistakeImpact = 'יש לבחור רמת סיכון'
  if (!body.aiExperience) errors.aiExperience = 'יש לבחור תשובה'
  if (!body.mainLimitation) errors.mainLimitation = 'יש לבחור מגבלה'
  if (body.mainLimitation === 'אחר (פרטו)' && (!body.otherLimitation || !String(body.otherLimitation).trim())) errors.otherLimitation = 'יש לפרט את המגבלה'
  if (!body.goal || !String(body.goal).trim()) errors.goal = 'יש לציין מה המטרה העיקרית של הייעוץ'
  if (!body.currentTools || !Array.isArray(body.currentTools) || body.currentTools.length === 0) errors.currentTools = 'יש לבחור לפחות כלי אחד'

  if (Object.keys(errors).length > 0) {
    console.log('[CONSULTATION] Validation errors:', errors)
    return NextResponse.json({ errors }, { status: 400 })
  }

  console.log('[CONSULTATION] Validation passed, preparing to save to Supabase')

  const record = {
    full_name: body.fullName || null,
    email: body.email || null,
    phone: body.phone || null,
    business_name: body.businessName || null,
    sector: body.sector || null,
    business_size: body.businessSize || null,
    website_url: body.websiteUrl || null,
    main_product: body.mainProduct || null,
    revenue_range: body.revenueRange || null,
    selected_process: body.selectedProcess || null,
    process_frequency: body.processFrequency || null,
    weekly_time_spent: body.weeklyTimeSpent || null,
    ai_mistake_impact: body.aiMistakeImpact || null,
    ai_experience: body.aiExperience || null,
    goal: body.goal || null,
    current_tools: body.currentTools || null,
    other_tool: body.otherTool || null,
    main_limitation: body.mainLimitation || null,
    other_limitation: body.otherLimitation || null,
    urgency: body.urgency || null,
    is_decision_maker: typeof body.isDecisionMaker === 'boolean' ? body.isDecisionMaker : null,
    can_commit_to_trial: typeof body.canCommitToTrial === 'boolean' ? body.canCommitToTrial : null,
    user_ip: forwardedFor,
    user_agent: userAgent,
  }

  try {
    // create supabase client at runtime so build doesn't fail when env vars are absent
    const supabase = createClient(SUPABASE_URL || "", SUPABASE_SERVICE_KEY || "")

    const { data, error } = await supabase
      .from('consultation_requests')
      .insert([record])
      .select('id, email, full_name')
      .single()

    console.log('[CONSULTATION] Supabase insert response:', { success: !!data, error: error?.message, id: data?.id })

    if (error) {
      console.error('[CONSULTATION] Supabase insert error:', error)
      return NextResponse.json({ error: 'Failed to save consultation request', detail: error.message }, { status: 500 })
    }

    console.log('[CONSULTATION] Successfully saved to Supabase. ID:', data.id)

    // Send confirmation email - PROPERLY AWAITED with comprehensive logging
    let emailSent = false
    let emailError: any = null
    
    try {
      if (!data?.email) {
        console.log('[CONSULTATION] WARNING: No email address in saved data, skipping email')
      } else if (!process.env.RESEND_API_KEY) {
        console.log('[CONSULTATION] WARNING: RESEND_API_KEY not set, skipping email')
      } else {
        console.log('[CONSULTATION] Starting email send process to:', data.email)
        
        const resend = new Resend(process.env.RESEND_API_KEY)

        // Normalize and validate RESEND_FROM to avoid malformed characters (non-breaking spaces, underscores, zero-width, etc.)
        const rawFrom = process.env.RESEND_FROM || ''
        const normalizeFrom = (s: string) => {
          return s
            // Replace common non-standard space characters with normal space
            .replace(/\u00A0|\u202F|\uFEFF|\u200B/g, ' ')
            // Replace underscores (often introduced by copy/paste) with spaces
            .replace(/_/g, ' ')
            // Collapse repeated whitespace to single space
            .replace(/\s+/g, ' ')
            .trim()
        }

        const codepoints = (s: string) => s.split('').map(ch => `${ch} U+${ch.charCodeAt(0).toString(16).toUpperCase().padStart(4,'0')}`).join(', ')

        const normalizedFrom = normalizeFrom(rawFrom)
        console.log('[CONSULTATION] RESEND_FROM raw:', JSON.stringify(rawFrom))
        console.log('[CONSULTATION] RESEND_FROM normalized:', JSON.stringify(normalizedFrom))
        console.log('[CONSULTATION] RESEND_FROM codepoints:', codepoints(rawFrom || normalizedFrom))

        // Accept either: plain email (email@domain.tld) OR display name with angle brackets (Name <email@domain.tld>)
        const fromValidRegex = /^(.*<[^@\s]+@[^>]+>|[^@\s]+@[^@\s]+\.[^@\s]+)$/
        let fromAddress = ''
        if (normalizedFrom && fromValidRegex.test(normalizedFrom)) {
          fromAddress = normalizedFrom
        } else if (normalizedFrom && /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(normalizedFrom)) {
          fromAddress = normalizedFrom
        } else {
          // Fall back to a verified display-name + email to ensure recipient sees BizGoAI as sender
          console.warn('[CONSULTATION] RESEND_FROM is missing or invalid after normalization. Falling back to BizGoAI <contact@bizgoai.co.il>')
          fromAddress = 'BizGoAI <contact@bizgoai.co.il>'
        }

        console.log('[CONSULTATION] Email from address (final):', fromAddress)
        
        const html = `<!doctype html>
<html lang="he" dir="rtl">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body {
      font-family: Arial, Helvetica, sans-serif;
      direction: rtl;
      text-align: right;
      background-color: #f5f5f5;
      margin: 0;
      padding: 0;
    }
    .container {
      max-width: 600px;
      margin: 20px auto;
      background-color: #ffffff;
      border-radius: 10px;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
      overflow: hidden;
    }
    .header {
      background: linear-gradient(135deg, #0b2e7b 0%, #1a4ba8 100%);
      color: white;
      padding: 30px 20px;
      text-align: center;
    }
    .header h1 {
      margin: 0;
      font-size: 28px;
      font-weight: bold;
    }
    .content {
      padding: 30px;
      color: #333;
      line-height: 1.6;
    }
    .content h2 {
      color: #0b2e7b;
      font-size: 22px;
      margin-top: 0;
    }
    .content p {
      font-size: 16px;
      margin: 15px 0;
    }
    .highlight-box {
      background-color: #f0f7ff;
      /* In RTL emails the accent border is better on the left side */
      border-left: 4px solid #0b2e7b;
      padding: 15px;
      margin: 20px 0;
      border-radius: 5px;
    }
    .footer {
      background-color: #f5f5f5;
      padding: 20px;
      text-align: center;
      font-size: 14px;
      color: #666;
    }
    .signature {
      margin-top: 30px;
      font-weight: bold;
      color: #0b2e7b;
    }
  </style>
</head>
<!--
  Email clients often strip <head> styles; to ensure RTL displays correctly we add
  explicit dir and inline styles on body and major containers.
-->
<body dir="rtl" style="direction: rtl; unicode-bidi: embed; text-align: right; margin:0; padding:0; background-color:#f5f5f5;">
  <div class="container" dir="rtl" style="direction: rtl; unicode-bidi: embed; text-align: right;">
    <div class="header" dir="rtl" style="direction: rtl; text-align: center;">
      <h1 dir="rtl" style="direction: rtl; margin:0;">🎉 ברוכים הבאים ל-BizgoAI Israel</h1>
    </div>
    <div class="content" dir="rtl" style="direction: rtl; text-align: right;">
      <h2 dir="rtl" style="direction: rtl;">שלום ${data.full_name || 'יקר/ה'},</h2>
      <p dir="rtl" style="direction: rtl; text-align: right;">
        תודה רבה על הפנייה שלך לקבלת ייעוץ מקצועי להטמעת AI בעסק שלך.
        <strong>קיבלנו את בקשתך בהצלחה!</strong>
      </p>

      <div class="highlight-box" dir="rtl" style="direction: rtl; text-align: right;">
        <p dir="rtl" style="direction: rtl;"><strong>מה הלאה?</strong></p>
        <ul dir="rtl" style="margin: 10px 0; padding-right: 20px; text-align: right;">
          <li dir="rtl">צוות BizgoAI יבדוק את הפנייה שלך בקפידה</li>
          <li dir="rtl">נחזור אליך תוך 24-48 שעות עבודה</li>
          <li dir="rtl">נתאם שיחת אבחון ראשונית (Zoom)</li>
          <li dir="rtl">נכין עבורך תוכנית הטמעה מותאמת אישית</li>
        </ul>
      </div>

      <p dir="rtl" style="direction: rtl; text-align: right;">
        בינתיים, אם יש לך שאלות נוספות או מידע שברצונך להוסיף,
        אתם מוזמנים לענות ישירות לאימייל זה.
      </p>

      <p class="signature" dir="rtl" style="direction: rtl; text-align: right;">
        בברכה,<br/>
        צוות BizgoAI Israel<br/>
        <span style="font-weight: normal; font-size: 14px;">עסקים קטנים מתקדמים עם AI. בביטחון.</span>
      </p>
    </div>
    <div class="footer" dir="rtl" style="direction: rtl; text-align: center;">
      <p dir="rtl">© 2025 BizgoAI Israel | <a href="https://bizgoai.co.il" style="color: #0b2e7b;">bizgoai.co.il</a></p>
      <p dir="rtl" style="font-size: 12px; margin-top: 10px;">
        קיבלת מייל זה כי פנית לקבלת ייעוץ דרך האתר שלנו
      </p>
    </div>
  </div>
</body>
</html>`

        console.log('[CONSULTATION] Email HTML prepared, calling Resend API...')
        
        const emailResult = await resend.emails.send({
          from: fromAddress,
          to: data.email,
          subject: 'אישור קבלת בקשת ייעוץ — BizgoAI Israel',
          html,
        })

        console.log('[CONSULTATION] Resend API response:', JSON.stringify(emailResult, null, 2))
        
        if (emailResult.error) {
          console.error('[CONSULTATION] Resend returned error:', emailResult.error)
          emailError = emailResult.error
        } else {
          console.log('[CONSULTATION] ✅ Email sent successfully! Email ID:', emailResult.data?.id)
          emailSent = true
        }
      }
    } catch (err: any) {
      console.error('[CONSULTATION] Exception while sending email:', err)
      console.error('[CONSULTATION] Error details:', {
        message: err.message,
        name: err.name,
        stack: err.stack?.substring(0, 500)
      })
      emailError = err
    }

    console.log('[CONSULTATION] Final email status:', { emailSent, hasError: !!emailError })
    console.log('[CONSULTATION] Returning success response with ID:', data.id)

    // Serialize error properly for JSON response
    let errorMessage: string | undefined = undefined
    if (emailError) {
      if (typeof emailError === 'string') {
        errorMessage = emailError
      } else if (emailError.message) {
        errorMessage = emailError.message
      } else {
        errorMessage = JSON.stringify(emailError)
      }
    }

    return NextResponse.json({ 
      id: data.id,
      emailSent,
      emailError: errorMessage
    }, { status: 201 })
  } catch (err: any) {
    console.error('[CONSULTATION] Unexpected save error:', err)
    return NextResponse.json({ error: 'Unexpected server error' }, { status: 500 })
  }
}
