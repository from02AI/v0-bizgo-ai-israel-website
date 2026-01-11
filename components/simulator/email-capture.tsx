"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Check, MessageCircle, Mail, BookOpen, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { useSimulator } from "@/contexts/simulator-context"

export function EmailCapture() {
  const { tool1Data, tool2Data, tool3Data } = useSimulator()
  const [email, setEmail] = useState("")
  const [joinWhatsApp, setJoinWhatsApp] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      // Prepare data for PDF generation
      const reportData = {
        date: new Date().toLocaleDateString('he-IL', { 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric' 
        }),
        taskName: tool1Data?.taskName || 'משימה ללא שם',
        // Tool 1
        fitScore: tool1Data?.score || 0,
        fitLabel: tool1Data?.fitLabel || '',
        taskTypeLabel: tool1Data?.taskTypeLabel || '',
        repetitivenessLabel: tool1Data?.repetitivenessLabel || '',
        documentationLabel: tool1Data?.documentationLabel || '',
        // Tool 2
        safetyScore: tool2Data?.safetyScore || 0,
        safetyLabel: tool2Data?.safetyLabel || '',
        riskStatus: tool2Data?.status || 'yellow',
        backupsLabel: tool2Data?.backupsLabel || '',
        errorDetectionLabel: tool2Data?.errorDetectionLabel || '',
        errorConsequenceLabel: tool2Data?.errorConsequenceLabel || '',
        capacityLabel: tool2Data?.capacityLabel || '',
        // Tool 3
        hoursPerWeek: tool3Data?.hoursPerWeek || 0,
        employees: tool3Data?.numEmployees || 0,
        hourlyRate: tool3Data?.hourlyRate || 0,
        technicalComfort: tool3Data?.technicalComfortLabel || '',
        implementationProfile: tool3Data?.implementationProfileLabel || '',
        learningHours: tool3Data?.learningHours || 0,
        recommendedTier: tool3Data?.recommendedTier || '',
        budgetMin: tool3Data?.budgetMin || 0,
        budgetMax: tool3Data?.budgetMax || 0,
        monthlyBudgetUsed: tool3Data?.monthlyBudgetUsed || 0,
        breakEvenMonth: tool3Data?.breakEvenMonth || 7,
        totalSixMonthSavings: tool3Data?.sixMonthTotal || 0,
        monthlyBreakdown: tool3Data?.monthlyBreakdown || [],
      }

      // Step 1: Generate PDF
      const pdfResponse = await fetch('/api/generate-pdf', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reportData),
      })

      if (!pdfResponse.ok) {
        throw new Error('Failed to generate PDF')
      }

      // Get PDF as blob and convert to base64
      const pdfBlob = await pdfResponse.blob()
      const pdfBase64 = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader()
        reader.onloadend = () => {
          const base64 = (reader.result as string).split(',')[1]
          resolve(base64)
        }
        reader.onerror = reject
        reader.readAsDataURL(pdfBlob)
      })

      // Step 2: Send email with PDF attachment
      const emailResponse = await fetch('/api/send-report', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          pdfBase64,
          reportData,
        }),
      })

      if (!emailResponse.ok) {
        throw new Error('Failed to send email')
      }

      setSubmitted(true)
    } catch (err) {
      console.error('Error:', err)
      setError('אירעה שגיאה בשליחת הדוח. אנא נסה שנית.')
    } finally {
      setLoading(false)
    }
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
            <Link
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
            </Link>

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

            <Link
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
            </Link>
          </div>

          <Button asChild variant="outline" className="w-full rounded-xl bg-transparent">
            <Link href="/">חזרה לדף הבית</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <div className="bg-white rounded-3xl shadow-xl p-8">
        <h2 className="text-2xl font-bold text-[#0b2e7b] mb-2 text-center">שלחו לי את התוצאות</h2>
        <p className="text-slate-600 text-center mb-6">נשלח לכם דוח שלם הכולל:</p>

        <ul className="space-y-3 mb-8">
          {[
            "תיעוד כל הנתונים שהזנת ",
            "תוצאות הסימולטור: התאמת משימות, בדיקת בטיחות, חישוב חסכון",
            "טבלת חישוב החסכון ל-6 חודשים",
            "הסברים שיעזרו לך להבין יותר את התוצאות עבור העסק שלך ",
          ].map((item, index) => (
            <li key={index} className="flex items-start gap-3">
              <Check className="w-5 h-5 text-green-600 mt-0.5 shrink-0" />
              <span className="text-slate-600">{item}</span>
            </li>
          ))}
        </ul>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-right">
              <p className="text-red-800 text-sm">{error}</p>
            </div>
          )}

          <Input
            id="email"
            type="email"
            required
            disabled={loading}
            aria-label="כתובת אימייל"
            placeholder="כתובת אימייל"
            value={email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
            className="text-lg py-6 rounded-xl border-2 border-slate-300 focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
          />

          <div className="flex items-center gap-3">
            <Checkbox
              id="whatsapp"
              checked={joinWhatsApp}
              disabled={loading}
              aria-label="הוסיפו אותי גם לקהילת ה־WhatsApp להמלצות כלים שוטפות"
              onCheckedChange={(checked) => setJoinWhatsApp(checked as boolean)}
            />
            <label htmlFor="whatsapp" className="text-slate-600 cursor-pointer">
              הוסיפו אותי גם לקהילת ה־WhatsApp להמלצות כלים שוטפות
            </label>
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-linear-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-bold rounded-xl py-6 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <Loader2 className="w-5 h-5 animate-spin" />
                מכין את הדוח...
              </span>
            ) : (
              'שלחו לי את התוצאות ←'
            )}
          </Button>
        </form>

        <p className="text-sm text-slate-400 text-center mt-4">אנחנו מכבדים את הפרטיות שלכם. ניתן להסיר בכל עת.</p>

        <Link href="/" className="block text-center text-sm text-slate-500 hover:text-slate-700 mt-4">
          מוותר על הדוח - חזרה לאתר
        </Link>
      </div>
    </div>
  )
}
