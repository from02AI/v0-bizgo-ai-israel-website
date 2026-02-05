"use client"

import React, { useState } from "react"
// use plain anchors here to avoid a transient TS typing issue with `next/link` in this workspace
import { Check, MessageCircle, Mail, BookOpen } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { useSimulator } from "@/contexts/simulator-context"

export function EmailCapture() {
  // (removed NextLink wrapper; use <a> elements below)
  const { tool1Data, tool2Data, tool3Data } = useSimulator()
  const [email, setEmail] = useState("")
  // Marketing/community opt-in: default to checked per product request
  // user can still uncheck before submitting
  const [joinWhatsApp, setJoinWhatsApp] = useState(true)
  const [submitted, setSubmitted] = useState(false)

  // Placeholder social links — will be replaced with real URLs when provided
  const socialLinks = {
    website: process.env.NEXT_PUBLIC_SITE_URL || '/',
    newsletter: '/newsletter',
    linkedin: 'https://www.linkedin.com/in/shani-carmi-radoszycki-b7474886/',
    facebook: 'https://www.facebook.com/groups/3741611762641473',
    // Group invite for community
    whatsapp: 'https://chat.whatsapp.com/JLuDnhyUykg0sy0zOW8fM8',
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    
    // Validate email is not empty
    if (!email || email.trim() === '') {
      alert('נא להזין כתובת אימייל')
      return
    }
    
    console.log("Email submitted:", email, "Join WhatsApp:", joinWhatsApp)
    console.log("Full submission data:", { email, tool1Data, tool2Data, tool3Data })
    setSubmitted(true)

    // Save email to provider DB for the same session if possible.
    // Non-blocking: fire-and-forget background update.
    ;(async () => {
      try {
        const savedId = typeof window !== 'undefined' ? localStorage.getItem('bizgo.savedReportId') : null
        console.log('[EMAIL-CAPTURE] SavedId from localStorage:', savedId)

        if (savedId) {
          // Update existing report with email
          console.log('[EMAIL-CAPTURE] Calling update-report with:', { id: savedId, user_email: email, subscribeCommunity: joinWhatsApp })
          const response = await fetch('/api/update-report', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: savedId, user_email: email, subscribeCommunity: joinWhatsApp }),
          })
          const result = await response.json()
          console.log('[EMAIL-CAPTURE] Update-report response:', result)
          return
        }

        // No existing saved id: create a new report row including the email
        const payload = { user_email: email, tool1Data, tool2Data, tool3Data, subscribeCommunity: joinWhatsApp }
        console.log('[EMAIL-CAPTURE] Calling save-report with payload:', payload)
        const response = await fetch('/api/save-report', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        })
        const result = await response.json()
        console.log('[EMAIL-CAPTURE] Save-report response:', result)
      } catch (err) {
        console.error('[EMAIL-CAPTURE] Failed to save email to provider db', err)
      }
    })()
  }

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-12">
        <div className="bg-white rounded-3xl shadow-xl p-8 text-center">
          <div className="text-6xl mb-4">✅</div>
          <h2 className="text-2xl font-bold text-[#0b2e7b] mb-2">דוח הערכת מוכנות AI שלך נשלח ל-{email}</h2>
          <p className="text-slate-600 mb-8">בדקו את תיבת המייל. יכול להגיע לתיקיות שונות/ספאם.</p>

          {/* CTA moved to bottom of card (replaced previous 'back to home' action) */}

          {/* Social section copied from pdf-template.ts (visual badges) */}
          <div className="mb-6">
            <div className="text-center mb-4">
              <p className="text-lg font-bold text-[#0b2e7b] mb-0">תודה שהשתמשת בסימולטור של BizGoAI</p>
              <p className="text-sm text-slate-600 mt-1">נשמח להמשיך לעזור לך בקבלת החלטות טובות ובטוחות סביב AI לעסק שלך.</p>
            </div>
          </div>

          <Button asChild className="w-full py-3 sm:py-4 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-bold flex items-center justify-center shadow-md focus:outline-none focus:ring-4 focus:ring-amber-200 min-h-[44px] text-sm sm:text-base">
            <a href="/#consultation" aria-label="המשך להתאמת כלי AI בחינם לעסק שלך">המשך להתאמת כלי AI בחינם לעסק שלך</a>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <div className="bg-white rounded-3xl shadow-xl p-8">
        <h2 className="text-2xl font-bold text-[#0b2e7b] mb-2 text-center">לקבלת הניתוח המלא למייל- ללא עלות!</h2>
        <p className="text-slate-600 text-center mb-6">נשלח לך דוח שלם הכולל:</p>

        <ul className="space-y-3 mb-8">
          {[
            "תיעוד של נתוני המשימה שהזנת",
            "תוצאות הסימולטור ל-3 הכלים: התאמת משימה ל-AI, בדידת בטיחות, החזר חסכון",
            "גרף וטבלה עם פירוט מלא של החזר החיסכון ל-6 חודשים",
            "הסברים שיעזרו לך להבין את התוצאות בקלות",
          ].map((item, index) => (
            <li key={index} className="flex items-start gap-3">
              <Check className="w-5 h-5 text-green-600 mt-0.5 shrink-0" />
              <span className="text-slate-600">{item}</span>
            </li>
          ))}
        </ul>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="email"
            required
            placeholder="כתובת אימייל"
            value={email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
            className="text-lg py-6 rounded-xl border-2 border-slate-300 focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
          />

          <div className="flex items-center gap-3">
            <Checkbox
              id="whatsapp"
              checked={joinWhatsApp}
              onCheckedChange={(checked: boolean | 'indeterminate') => setJoinWhatsApp(checked === true)}
            />
            <label htmlFor="whatsapp" className="text-slate-600 cursor-pointer">
              אני מעוניין/ת להצטרף לקהילת BizGoAI ולקבל עדכונים ותוכן
            </label>
          </div>

          <Button
            type="submit"
            className="w-full bg-linear-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-bold rounded-xl py-4 sm:py-6 text-base sm:text-lg min-h-[44px]"
          >
            שלחו לי את הדוח המלא ←
          </Button>
        </form>

        <p className="text-xs text-slate-500 text-center mt-4 leading-relaxed">
          נשתמש באימייל כדי לשלוח את דוח ה-PDF. מסירת האימייל היא מרצון, אך בלי אימייל לא נוכל לשלוח את הדוח במייל.
          עדכונים/קהילה נשלחים רק אם סימנתם הצטרפות. לפרטים נוספים: {" "}
          <a href="/privacy" target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:underline">מדיניות הפרטיות</a>.
        </p>

        <a href="/" className="block text-center text-sm text-slate-500 hover:text-slate-700 mt-4">
          אין לי צורך בדוח המלא - חזור לאתר
        </a>
      </div>
    </div>
  )
}
