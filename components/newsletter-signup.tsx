"use client"

import { useState, ChangeEvent, FormEvent } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'

export default function NewsletterSignup() {
  const [email, setEmail] = useState('')
  const [consent, setConsent] = useState(true)
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!email || !email.includes('@')) {
      setMessage('נא להזין כתובת אימייל תקינה')
      setStatus('error')
      return
    }

    if (!consent) {
      setMessage('אנא אשר/י את מדיניות הפרטיות כדי להרשם')
      setStatus('error')
      return
    }

    setStatus('loading')
    setMessage('')

    try {
      const res = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source: 'newsletter-page' }),
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data?.error || 'שגיאה ברישום')

      setStatus('success')
      setMessage('תודה — נשלח אליך אימייל לאישור')
      setEmail('')
    } catch (err) {
      setStatus('error')
      setMessage(err instanceof Error ? err.message : 'שגיאה לא ידועה')
    }
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-sm" dir="rtl">
      <h2 className="text-2xl font-bold mb-3">הרשמה לניוזלטר</h2>
      <p className="text-sm text-slate-600 mb-4">הצטרפו לקבלת מידע וחומרים בנושאי AI לעסקים קטנים.</p>

      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <Input
            id="newsletter-email"
            type="email"
            required
            placeholder="כתובת אימייל"
            value={email}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
            className="py-2"
          />
        </div>

        <div className="flex items-start gap-3">
          <Checkbox id="newsletter-consent" checked={consent} onCheckedChange={(v: any) => setConsent(v === true)} />
          <label htmlFor="newsletter-consent" className="text-sm text-slate-700">
            אני מסכים/ה לקבלת עדכונים וקריאת <a href="/privacy" className="text-blue-600 hover:underline">מדיניות הפרטיות</a>
          </label>
        </div>

        {status === 'error' && <div className="text-sm text-red-700">{message}</div>}
        {status === 'success' && <div className="text-sm text-green-700">{message}</div>}

        <div>
          <Button type="submit" className="w-full" disabled={status === 'loading'}>
            {status === 'loading' ? 'שולח...' : 'הרשמה'}
          </Button>
        </div>
      </form>
    </div>
  )
}
