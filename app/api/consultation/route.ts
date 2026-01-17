import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

const SUPABASE_URL = process.env.SUPABASE_URL
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY

if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
  console.warn("Supabase env vars not set: SUPABASE_URL or SUPABASE_SERVICE_KEY")
}

const supabase = createClient(SUPABASE_URL || "", SUPABASE_SERVICE_KEY || "")

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

  // Extract common headers for debugging and storage
  const forwardedFor = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || null
  const userAgent = request.headers.get('user-agent') || null
  console.log('Incoming consultation request', { body, ip: forwardedFor, userAgent })

  // Basic validation
  // Structured validation
  const errors: Record<string, string> = {}
  if (!body || typeof body !== 'object') {
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
    return NextResponse.json({ errors }, { status: 400 })
  }

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
    const { data, error } = await supabase
      .from('consultation_requests')
      .insert([record])
      .select('id')
      .single()

    console.log('Supabase insert response', { data, error })

    if (error) {
      console.error('Supabase insert error', error)
      return NextResponse.json({ error: 'Failed to save consultation request', detail: error.message }, { status: 500 })
    }

    return NextResponse.json({ id: data.id }, { status: 201 })
  } catch (err: any) {
    console.error('Unexpected save error', err)
    return NextResponse.json({ error: 'Unexpected server error' }, { status: 500 })
  }
}
