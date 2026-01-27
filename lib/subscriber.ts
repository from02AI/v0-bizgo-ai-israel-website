import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = process.env.SUPABASE_URL || ''
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY || ''

if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
  console.warn('Supabase not configured for lib/subscriber')
}

export async function upsertSubscriber(opts: {
  email: string
  name?: string | null
  consent_source?: string | null
  metadata?: Record<string, any> | null
  ip?: string | null
  user_agent?: string | null
  subscribed?: boolean
}) {
  if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
    throw new Error('Supabase not configured')
  }

  const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY)

  const payload = {
    // store email as-provided (trimmed). A generated column `email_lower`
    // (computed in the DB) will contain the lowercase value for uniqueness.
    email: String(opts.email).trim(),
    name: opts.name ?? null,
    subscribed: opts.subscribed === undefined ? true : !!opts.subscribed,
    consent_ts: new Date().toISOString(),
    consent_source: opts.consent_source ?? null,
    provider_ids: {},
    metadata: opts.metadata ?? {},
    ip: opts.ip ?? null,
    user_agent: opts.user_agent ?? null,
  }

  // Upsert by generated lowercase column to avoid ON CONFLICT vs expression-index mismatch
  const { data, error } = await supabase
    .from('subscribers')
    .upsert(payload, { onConflict: ['email_lower'] })
    .select('*')
    .single()

  if (error) {
    console.error('[upsertSubscriber] supabase error', error)
    throw error
  }

  return data
}

// Placeholder for provider sync. Implement provider-specific logic here.
export async function syncToProvider(subscriber: any) {
  // Best-effort sync to configured providers. This function will not throw
  // so it is safe to call as a non-blocking background operation.
  try {
    // MailerLite integration (Connect API)
    const MAILERLITE_API_KEY = process.env.MAILERLITE_API_KEY
    const MAILERLITE_GROUP_ID = process.env.MAILERLITE_GROUP_ID

    // Diagnostic logging to help debug missing provider syncs
    try {
      console.log('[syncToProvider] start', { email: subscriber?.email, id: subscriber?.id })
      console.log('[syncToProvider] MAILERLITE_API_KEY present:', !!MAILERLITE_API_KEY, 'MAILERLITE_GROUP_ID present:', !!MAILERLITE_GROUP_ID)
    } catch (e) {
      // swallow any logging error
    }

    // If a real group id is configured, use it. Ignore common placeholder values.
    const hasMailerLiteGroupConfigured = Boolean(MAILERLITE_API_KEY && MAILERLITE_GROUP_ID && !String(MAILERLITE_GROUP_ID).toLowerCase().includes('your_'))
    if (hasMailerLiteGroupConfigured) {
      try {
        const resp = await fetch('https://connect.mailerlite.com/api/subscribers', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${MAILERLITE_API_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: subscriber.email,
            name: subscriber.name ?? undefined,
            groups: [MAILERLITE_GROUP_ID],
          }),
        })

        const text = await resp.text()
        let json: any
        try {
          json = text ? JSON.parse(text) : {}
        } catch (e) {
          json = { raw: text }
        }

        if (resp.ok) {
          // Update provider_ids in Supabase to record the MailerLite id if present
          const mailerliteId = json.data?.id ?? json.id ?? null
          if (mailerliteId) {
            if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
              console.warn('[syncToProvider] Supabase not configured; skipping provider_ids update')
              return { ok: true, provider: 'mailerlite' }
            }

            const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY)
            const existing = subscriber.provider_ids ?? {}
            const updated = { ...existing, mailerlite: mailerliteId }

            const { error } = await supabase
              .from('subscribers')
              .update({ provider_ids: updated })
              .eq('id', subscriber.id)

            if (error) {
              console.warn('[syncToProvider] failed to persist provider id', error)
            }
          }

          return { ok: true, provider: 'mailerlite', resp: json }
        }

        // Non-OK response: return details for logging but do not throw
        console.warn('[syncToProvider] mailerlite non-ok', resp.status, json)
        return { ok: false, provider: 'mailerlite', status: resp.status, body: json }
      } catch (err) {
        console.warn('[syncToProvider] mailerlite exception (ignored)', err)
        return { ok: false, provider: 'mailerlite', reason: 'exception' }
      }
    }

    // If the config has an API key but no group id, attempt to auto-discover or create
    if (MAILERLITE_API_KEY && !MAILERLITE_GROUP_ID) {
      try {
        // 1) list groups and look for a group named 'Newsletter'
        const listResp = await fetch('https://connect.mailerlite.com/api/groups', {
          headers: { Authorization: `Bearer ${MAILERLITE_API_KEY}` },
        })
        const listJson = await (async () => {
          const t = await listResp.text()
          try { return t ? JSON.parse(t) : {} } catch { return { raw: t } }
        })()

        let groupId: any = null
        if (listResp.ok && Array.isArray(listJson.data)) {
          const found = listJson.data.find((g: any) => String(g.name || '').toLowerCase() === 'newsletter')
          if (found) groupId = found.id
        }

        // 2) if not found, create a group named 'Newsletter'
        if (!groupId) {
          const createResp = await fetch('https://connect.mailerlite.com/api/groups', {
            method: 'POST',
            headers: { Authorization: `Bearer ${MAILERLITE_API_KEY}`, 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: 'Newsletter' }),
          })
          const createText = await createResp.text()
          let createJson: any
          try { createJson = createText ? JSON.parse(createText) : {} } catch { createJson = { raw: createText } }
          if (createResp.ok) {
            groupId = createJson.data?.id ?? createJson.id ?? null
          } else {
            console.warn('[syncToProvider] failed to create mailerlite group', createResp.status, createJson)
          }
        }

        // 3) if we have a groupId, post the subscriber into it
        if (groupId) {
          const postResp = await fetch('https://connect.mailerlite.com/api/subscribers', {
            method: 'POST',
            headers: { Authorization: `Bearer ${MAILERLITE_API_KEY}`, 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: subscriber.email, name: subscriber.name ?? undefined, groups: [groupId] }),
          })
          const postText = await postResp.text()
          let postJson: any
          try { postJson = postText ? JSON.parse(postText) : {} } catch { postJson = { raw: postText } }

          if (postResp.ok) {
            const mailerliteId = postJson.data?.id ?? postJson.id ?? null
            let updateError = null
            if (mailerliteId && SUPABASE_URL && SUPABASE_SERVICE_KEY) {
              const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY)
              const existing = subscriber.provider_ids ?? {}
              const updated = { ...existing, mailerlite: mailerliteId }
              const { error } = await supabase.from('subscribers').update({ provider_ids: updated }).eq('id', subscriber.id)
              if (error) {
                console.warn('[syncToProvider] failed to persist provider id', error)
                updateError = error
              }
            }
            return { ok: true, provider: 'mailerlite', resp: postJson, persisted: updateError ? { ok: false, error: updateError } : { ok: true } }
          }

          console.warn('[syncToProvider] mailerlite post non-ok', postResp.status, postJson)
          return { ok: false, provider: 'mailerlite', status: postResp.status, body: postJson }
        }
      } catch (err) {
        console.warn('[syncToProvider] mailerlite auto-discovery/creation failed (ignored)', err)
        return { ok: false, provider: 'mailerlite', reason: 'auto-discovery-failed' }
      }
    }

    // If no provider configured, return a neutral result
    if (!process.env.RESEND_API_KEY && !MAILERLITE_API_KEY) {
      return { ok: false, reason: 'no-provider-configured' }
    }

    // If MAILERLITE_API_KEY is set but the configured group id is a placeholder,
    // attempt auto-discovery/creation. Use the hasMailerLiteGroupConfigured flag
    // computed earlier to decide.
    if (MAILERLITE_API_KEY && !hasMailerLiteGroupConfigured) {
      try {
        // 1) list groups and look for a group named 'Newsletter'
        const listResp = await fetch('https://connect.mailerlite.com/api/groups', {
          headers: { Authorization: `Bearer ${MAILERLITE_API_KEY}` },
        })
        const listJson = await (async () => {
          const t = await listResp.text()
          try { return t ? JSON.parse(t) : {} } catch { return { raw: t } }
        })()

        let groupId: any = null
        if (listResp.ok && Array.isArray(listJson.data)) {
          const found = listJson.data.find((g: any) => String(g.name || '').toLowerCase() === 'newsletter')
          if (found) groupId = found.id
        }

        // 2) if not found, create a group named 'Newsletter'
        if (!groupId) {
          const createResp = await fetch('https://connect.mailerlite.com/api/groups', {
            method: 'POST',
            headers: { Authorization: `Bearer ${MAILERLITE_API_KEY}`, 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: 'Newsletter' }),
          })
          const createText = await createResp.text()
          let createJson: any
          try { createJson = createText ? JSON.parse(createText) : {} } catch { createJson = { raw: createText } }
          if (createResp.ok) {
            groupId = createJson.data?.id ?? createJson.id ?? null
          } else {
            console.warn('[syncToProvider] failed to create mailerlite group', createResp.status, createJson)
          }
        }

        // 3) if we have a groupId, post the subscriber into it
        if (groupId) {
          const postResp = await fetch('https://connect.mailerlite.com/api/subscribers', {
            method: 'POST',
            headers: { Authorization: `Bearer ${MAILERLITE_API_KEY}`, 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: subscriber.email, name: subscriber.name ?? undefined, groups: [groupId] }),
          })
          const postText = await postResp.text()
          let postJson: any
          try { postJson = postText ? JSON.parse(postText) : {} } catch { postJson = { raw: postText } }

          if (postResp.ok) {
            const mailerliteId = postJson.data?.id ?? postJson.id ?? null
            if (mailerliteId && SUPABASE_URL && SUPABASE_SERVICE_KEY) {
              const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY)
              const existing = subscriber.provider_ids ?? {}
              const updated = { ...existing, mailerlite: mailerliteId }
              const { error } = await supabase.from('subscribers').update({ provider_ids: updated }).eq('id', subscriber.id)
              if (error) console.warn('[syncToProvider] failed to persist provider id', error)
            }
            return { ok: true, provider: 'mailerlite', resp: postJson }
          }

          console.warn('[syncToProvider] mailerlite post non-ok', postResp.status, postJson)
          return { ok: false, provider: 'mailerlite', status: postResp.status, body: postJson }
        }
      } catch (err) {
        console.warn('[syncToProvider] mailerlite auto-discovery/creation failed (ignored)', err)
        return { ok: false, provider: 'mailerlite', reason: 'auto-discovery-failed' }
      }
    }

    // Future providers (Resend Audience, others) can be implemented here.
    return { ok: true }
  } catch (err) {
    console.warn('[syncToProvider] provider sync failed (ignored)', err)
    return { ok: false, reason: 'exception' }
  }
}

export default { upsertSubscriber, syncToProvider }
