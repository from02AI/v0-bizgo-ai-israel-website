import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = process.env.SUPABASE_URL || ''
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY || ''

export async function GET(req: Request) {
  // Protect this debug route: only allow in development or when a special header is present.
  const env = process.env.NODE_ENV || 'development'
  const allowHeader = req.headers.get('x-debug-allow')
  if (env === 'production' && allowHeader !== 'yes') {
    return NextResponse.json({ error: 'Debug route disabled in production' }, { status: 403 })
  }

  const url = new URL(req.url)
  const email = url.searchParams.get('email')
  if (!email) return NextResponse.json({ error: 'missing email' }, { status: 400 })

  if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
    return NextResponse.json({ error: 'supabase not configured' }, { status: 500 })
  }

  const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY)
  try {
    const { data, error } = await supabase
      .from('subscribers')
      .select('*')
      .eq('email', String(email).trim())
      .limit(1)

    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
    return NextResponse.json({ data }, { status: 200 })
  } catch (err: any) {
    return NextResponse.json({ error: String(err?.message || err) }, { status: 500 })
  }
}
