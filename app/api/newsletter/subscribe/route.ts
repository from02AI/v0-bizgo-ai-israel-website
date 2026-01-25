import { NextRequest, NextResponse } from 'next/server'
import { upsertSubscriber, syncToProvider } from '@/lib/subscriber'

export async function POST(request: NextRequest) {
  try {
    const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown'
    const ua = request.headers.get('user-agent') || null

    const body = await request.json().catch(() => null)
    if (!body || !body.email) {
      return NextResponse.json({ error: 'Missing email' }, { status: 400 })
    }

    const email = String(body.email).trim()
    const name = body.name ? String(body.name).trim() : null
    const source = body.source ? String(body.source).trim() : 'newsletter'
    const subscribed = body.subscribeCommunity === undefined ? true : !!body.subscribeCommunity

    // Upsert canonical subscriber record in Supabase
    const row = await upsertSubscriber({
      email,
      name,
      consent_source: source,
      metadata: { raw: body },
      ip,
      user_agent: ua,
      subscribed,
    })

    // Best-effort provider sync (non-blocking for user)
    let syncResult = null
    try {
      syncResult = await syncToProvider(row)
    } catch (err) {
      console.warn('[newsletter/subscribe] provider sync failed (ignored)', err)
      syncResult = { ok: false, reason: 'exception' }
    }

    return NextResponse.json({ success: true, subscriber: row, syncResult }, { status: 200 })
  } catch (err: any) {
    console.error('/api/newsletter/subscribe error', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
