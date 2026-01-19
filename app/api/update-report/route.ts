import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

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

    const { data, error } = await supabase
      .from('simulator_reports')
      .update({ user_email })
      .eq('id', id)
      .select('id')
      .single()

    if (error) {
      console.error('Supabase update error', error)
      return NextResponse.json({ error: 'Failed to update report', detail: error.message }, { status: 500 })
    }

    return NextResponse.json({ id: data.id }, { status: 200 })
  } catch (err) {
    console.error('Unexpected update error', err)
    return NextResponse.json({ error: 'Unexpected error' }, { status: 500 })
  }
}
