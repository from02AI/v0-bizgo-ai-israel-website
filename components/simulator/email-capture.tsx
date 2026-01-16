"use client"

import React, { useState } from "react"
// use plain anchors here to avoid a transient TS typing issue with `next/link` in this workspace
import { Check, MessageCircle, Mail, BookOpen } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { useSimulator } from "@/contexts/simulator-context"
import { PDFDownloadButton } from "@/components/simulator/PDFDownloadButton"

export function EmailCapture() {
  // (removed NextLink wrapper; use <a> elements below)
  const { tool1Data, tool2Data, tool3Data } = useSimulator()
  const [email, setEmail] = useState("")
  const [joinWhatsApp, setJoinWhatsApp] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log("Email submitted:", email, "Join WhatsApp:", joinWhatsApp)
    setSubmitted(true)

    // Save email to provider DB for the same session if possible.
    // Non-blocking: fire-and-forget background update.
    ;(async () => {
      try {
        const savedId = typeof window !== 'undefined' ? localStorage.getItem('bizgo.savedReportId') : null

        if (savedId) {
          // Update existing report with email
          await fetch('/api/update-report', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: savedId, user_email: email }),
          })
          return
        }

        // No existing saved id: create a new report row including the email
        const payload = { user_email: email, tool1Data, tool2Data, tool3Data }
        await fetch('/api/save-report', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        })
      } catch (err) {
        console.warn('Failed to save email to provider db', err)
      }
    })()
  }

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-12">
        <div className="bg-white rounded-3xl shadow-xl p-8 text-center">
          <div className="text-6xl mb-4">✅</div>
          <h2 className="text-2xl font-bold text-[#0b2e7b] mb-2">הדוח נשלח!</h2>
          <p className="text-slate-600 mb-8">בדקו את תיבת המייל.</p>
          <p className="text-slate-500 mb-8">הרגע שלחנו הערכת AI מלאה ל־{email}</p>

          <div className="grid gap-4 mb-8">
            <a
              href="/consultation"
              className="flex items-center gap-4 p-4 bg-slate-50 hover:bg-slate-100 rounded-xl transition-colors"
            >
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <Mail className="w-6 h-6 text-blue-600" />
              </div>
              <div className="text-right">
                <p className="font-bold text-[#0b2e7b]">לקבוע ייעוץ חינם</p>
                <p className="text-sm text-slate-500">שיחה אישית עם מומחה AI</p>
              </div>
            </a>

            <a
              href="#"
              className="flex items-center gap-4 p-4 bg-slate-50 hover:bg-slate-100 rounded-xl transition-colors"
            >
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <MessageCircle className="w-6 h-6 text-green-600" />
              </div>
              <div className="text-right">
                <p className="font-bold text-[#0b2e7b]">להצטרף לקהילה</p>
                <p className="text-sm text-slate-500">WhatsApp, ניוזלטר</p>
              </div>
            </a>

            <a
              href="/about"
              className="flex items-center gap-4 p-4 bg-slate-50 hover:bg-slate-100 rounded-xl transition-colors"
            >
              <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-amber-600" />
              </div>
              <div className="text-right">
                <p className="font-bold text-[#0b2e7b]">ללמוד עוד</p>
                <p className="text-sm text-slate-500">על BizgoAI Israel</p>
              </div>
            </a>
          </div>

          <Button asChild variant="outline" className="w-full rounded-xl bg-transparent">
            <a href="/">חזרה לדף הבית</a>
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
              <Check className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
              <span className="text-slate-600">{item}</span>
            </li>
          ))}
        </ul>

        {/* PDF Download Section */}
        <div className="mb-6 p-4 bg-blue-50 rounded-xl border border-blue-200">
          <h3 className="text-lg font-bold text-[#0b2e7b] mb-2 text-center">צפייה מיידית בדוח</h3>
          <p className="text-sm text-slate-600 text-center mb-4">הורידו את הדוח עכשיו ללא צורך באימייל</p>
          <PDFDownloadButton 
            tool1Data={tool1Data}
            tool2Data={tool2Data}
            tool3Data={tool3Data}
          />
        </div>

        <div className="relative mb-6">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-slate-200" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="bg-white px-4 text-slate-500">או קבלו למייל</span>
          </div>
        </div>

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
              onCheckedChange={(checked: boolean) => setJoinWhatsApp(checked)}
            />
            <label htmlFor="whatsapp" className="text-slate-600 cursor-pointer">
              הוסיפו אותי גם לקהילת ה־WhatsApp להמלצות כלים שוטפות
            </label>
          </div>

          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-bold rounded-xl py-6 text-lg"
          >
            שלחו לי את הדוח המלא ←
          </Button>
        </form>

        <p className="text-sm text-slate-400 text-center mt-4">אנחנו מכבדים את הפרטיות שלכם. ניתן להסיר בכל עת.</p>

        <a href="/" className="block text-center text-sm text-slate-500 hover:text-slate-700 mt-4">
          אין לי צורך בדוח המלא - חזור לאתר
        </a>
      </div>
    </div>
  )
}
