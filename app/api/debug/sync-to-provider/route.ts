import { NextRequest, NextResponse } from 'next/server'
import { upsertSubscriber, syncToProvider } from '@/lib/subscriber'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => null)
    if (!body || !body.email) return NextResponse.json({ error: 'Missing email' }, { status: 400 })

    // Optional debug key check to avoid public exposure when DEBUG_API_KEY is set
    const debugKey = request.headers.get('x-debug-key') || null
    if (process.env.DEBUG_API_KEY && process.env.DEBUG_API_KEY !== debugKey) {
      return NextResponse.json({ error: 'Unauthorized (invalid debug key)' }, { status: 401 })
    }

    const email = String(body.email).trim()
    const name = body.name ? String(body.name).trim() : null

    // Ensure the canonical subscriber row exists (upsert)
    const row = await upsertSubscriber({
      email,
      name,
      consent_source: 'debug-sync-endpoint',
      metadata: { debug: true },
      subscribed: true,
    })

    // Call syncToProvider and return the raw result for debugging
    const result = await syncToProvider(row)

    return NextResponse.json({ success: true, subscriber: row, syncResult: result }, { status: 200 })
  } catch (err: any) {
    console.error('/api/debug/sync-to-provider error', err)
    return NextResponse.json({ error: 'Server error', detail: String(err?.message || err) }, { status: 500 })
  }
}
