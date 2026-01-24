"use client"

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'

export default function CTARegistrationForm() {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle'|'loading'|'success'|'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    setErrorMessage('')

    // Basic client-side validation
    if (!name.trim() || !email.trim()) {
      setErrorMessage('אנא מלא/י שם וכתובת אימייל')
      setStatus('error')
      return
    }

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: name.trim(),
            email: email.trim(),
            phone: phone.trim(),
            // api/contact expects message; include contextual note
            message: 'הרשמה מהכפתור בעמוד אודות - רצון להצטרף לקהילה/עדכונים',
            // signal this as a community opt-in
            subscribeCommunity: true,
          }),
      })

      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data?.error || 'שגיאה בשליחת הטופס')
      }

      setStatus('success')
      setName('')
      setPhone('')
      setEmail('')
    } catch (err: any) {
      setStatus('error')
      setErrorMessage(err?.message || 'שגיאה בשליחת הטופס')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-4xl mx-auto mb-2" dir="rtl">
      <div className="flex flex-col sm:flex-row items-center gap-3 justify-center">
        <input
          aria-label="שם"
          placeholder="שם"
          value={name}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
          className="rounded-lg px-4 py-3 text-sm w-full sm:w-1/3 bg-white/95 text-slate-800 placeholder-slate-400 shadow-sm border border-transparent focus:outline-none focus:ring-2 focus:ring-amber-300"
        />

        <input
          aria-label="טלפון"
          placeholder="טלפון (אופציונלי)"
          value={phone}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPhone(e.target.value)}
          className="rounded-lg px-4 py-3 text-sm w-full sm:w-1/3 bg-white/95 text-slate-800 placeholder-slate-400 shadow-sm border border-transparent focus:outline-none focus:ring-2 focus:ring-amber-300"
        />

        <input
          aria-label="אימייל"
          placeholder="אימייל"
          type="email"
          value={email}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
          className="rounded-lg px-4 py-3 text-sm w-full sm:w-1/3 bg-white/95 text-slate-800 placeholder-slate-400 shadow-sm border border-transparent focus:outline-none focus:ring-2 focus:ring-amber-300"
          required
        />
      </div>

      {/* Submit button moved to bottom, full width on mobile */}
      <div className="w-full flex justify-center mt-9">
        <Button 
          type="submit" 
          disabled={status === 'loading'}
          className="bg-amber-600 hover:bg-amber-600 text-white font-semibold px-8 py-6 rounded-lg shadow-md disabled:opacity-50 min-w-[220px] text-base"
        >
          {status === 'loading' ? 'שולח...' : 'הצטרפו לקהילת AI לעסקים קטנים'}
        </Button>
      </div>

      {status === 'success' && (
        <div className="mt-4 text-center">
          <p className="text-lg font-bold text-green-100">✓ תודה רבה!</p>
          <p className="text-white/90">קיבלנו את הפרטים שלך ונחזור אליך בהקדם.</p>
        </div>
      )}
      {status === 'error' && (
        <p className="mt-3 text-center text-red-200 bg-red-900/30 py-2 px-4 rounded-lg">{errorMessage}</p>
      )}
    </form>
  )
}
