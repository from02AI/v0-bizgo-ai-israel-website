"use client"

import type React from "react"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import * as Icons from "lucide-react"
import Link from "next/link"

const sectors = ["מסעדות ומזון", "קמעונאות", "שירותים מקצועיים", "בנייה", "בריאות", "ייצור", "טכנולוגיה", "אחר"]

const businessSizes = ["1–5 עובדים", "6–10", "11–25", "26–50", "50+"]

const revenueRanges = [
  "עד ₪120,000",
  "₪120,000–₪750,000",
  "₪750,000–₪6,000,000",
  "₪6,000,000–₪20,000,000",
  "מעדיפ/ה לא לציין",
]

const challenges = [
  "לא יודעים מאיפה להתחיל",
  "לא בטוחים אילו כלים מתאימים",
  "מגבלות תקציב",
  "אין זמן לחקר",
  "חוסר ידע טכני",
  "פחד מבזבוז כסף",
]

const aiExperience = [
  "לא, אף פעם",
  "כן, ולא עבד טוב",
  "כן, משתמשים בכלי בסיס (כמו ChatGPT)",
  "כן, משתמשים בכלים מתקדמים באופן קבוע",
]

// scheduling/time slot selection removed

// customer touchpoints question removed

const processes = [
  "מענה ללקוחות (וואטסאפ / מייל / אינסטגרם)",
  "לידים: איסוף + מעקב + הודעות המשך",
  "יצירת הצעות מחיר / הצעות מסודרות",
  "תזכורות תשלום / גבייה / מעקב חשבוניות",
  "תיאום פגישות + אישורים + תזכורות",
  "יצירת תוכן ושיווק (פוסטים/מודעות/מיילים)",
  "הזנת נתונים (CRM / גיליונות / הזמנות)",
  "אונבורדינג לקוחות (הודעת פתיחה, שאלון, מסמכים, FAQ)",
  "גיוס/סינון מועמדים (מיון קו״ח + הודעות ראשוניות)",
  "תיעוד תהליכים (SOP / צ׳קליסטים / הדרכת צוות)",
]

const processFrequency = [
  "כל יום / כמעט כל יום",
  "כמה פעמים בשבוע",
  "פעם בשבוע–שבועיים",
  "פעם בחודש / לעיתים נדירות",
]

const weeklyTimeSpent = [
  "0–10 שעות",
  "10-20 שעות",
  "20-30 שעות",
  "30-40 שעות",
  "40+ שעות",
]

const aiMistakeImpact = [
  "נמוך (אי־נעימות קלה / אפשר לתקן בקלות)",
  "בינוני (יכול לעלות בזמן/כסף, אבל נשלט)",
  "גבוה (סיכון ללקוח/כסף/מוניטין/רגולציה)",
]

const currentTools = [
  "וואטסאפ",
  "ג׳ימייל / אאוטלוק",
  "אקסל / Google Sheets",
  "אתר (Wix / WordPress / Webflow)",
  "Shopify / חנות אונליין",
  "CRM (לדוגמה: HubSpot / Monday / Zoho / אחר)",
  "מערכת חשבוניות / הנה״ח",
]

const mainLimitations = [
  "אין זמן להתנסות/להטמיע",
  "תקציב / חשש לבזבוז כסף",
  "לא יודעים מאיפה להתחיל",
  "לא בטוחים איזה כלי מתאים",
  "ידע טכני / הטמעה",
  "מידע רגיש / פרטיות",
  "התנגדות צוות / שינוי הרגלים",
]

// Simple presentational checkbox icon - no React state, just visual display
function CheckIcon({ checked }: { checked: boolean }) {
  return (
    <div 
      className={`w-5 h-5 rounded border-2 flex items-center justify-center shrink-0 transition-colors ${
        checked 
          ? 'bg-gray-500 border-gray-500' 
          : 'border-slate-300 bg-white'
      }`}
    >
      {checked && (
        <svg 
          className="w-3 h-3 text-white" 
          fill="none" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth="2" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <polyline points="20 6 9 17 4 12" />
        </svg>
      )}
    </div>
  )
}

function CollapsibleSection({
  title,
  children,
  defaultOpen = false,
}: {
  title: string
  // keep children loosely typed to avoid JSX typing edge-cases in this file
  children: any
  defaultOpen?: boolean
}) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div className="mb-10">
      <div className="relative mb-4 overflow-hidden">
        <h2 className="text-xl font-bold text-[#0b2e7b] pr-14 break-words">{title}</h2>
        <button
          type="button"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="absolute right-0 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center text-slate-600"
          aria-label={open ? "סגור קטע" : "פתח קטע"}
        >
          <span className="text-lg font-bold">{open ? '−' : '+'}</span>
        </button>
      </div>
      {open && <div>{children}</div>}
    </div>
  )
}

export default function ConsultationPage() {
  const [submitted, setSubmitted] = useState(false)
  // placeholder social links (update later if needed)
  const socialLinks = {
    website: process.env.NEXT_PUBLIC_SITE_URL || '/',
    newsletter: '/newsletter',
    linkedin: 'https://www.linkedin.com/in/shani-carmi-radoszycki-b7474886/',
    facebook: 'https://www.facebook.com/groups/3741611762641473',
    // group invite link for community
    whatsapp: 'https://chat.whatsapp.com/JLuDnhyUykg0sy0zOW8fM8',
  }
  const [formData, setFormData] = useState({
    // Threshold conditions
    isDecisionMaker: false,
    canCommitToTrial: false,
    // Business info
    fullName: "",
    email: "",
    phone: "",
    businessName: "",
    sector: "",
    businessSize: "",
                websiteUrl: "", // Ensure websiteUrl exists in state
    mainProduct: "",
      revenueRange: "", // Ensure revenueRange exists in state
    // Process focus
    selectedProcess: "",
    processFrequency: "",
    weeklyTimeSpent: "",
    aiMistakeImpact: "",
    // AI challenges (removed: single-question moved out)
    aiExperience: "",
    goal: "",
    currentTools: [] as string[],
    otherTool: "",
    mainLimitation: "",
    otherLimitation: "",
    urgency: "",
    // Marketing/community opt-in: default to checked per product request
    // user can still uncheck before submitting
    subscribeCommunity: true,
    // Scheduling (removed)
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [submitAttempted, setSubmitAttempted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitAttempted(true)
    // Client-side validation
    const validate = () => {
      const errs: Record<string, string> = {}
      if (!formData.isDecisionMaker) errs.isDecisionMaker = 'יש לאשר שאתם בעלי החלטה כדי להמשיך'
      if (!formData.canCommitToTrial) errs.canCommitToTrial = 'יש לאשר שאתם יכולים להתחייב לתהליך'
      if (!formData.fullName?.trim()) errs.fullName = 'יש להזין שם מלא'
      if (!formData.email?.trim()) errs.email = 'יש להזין כתובת אימייל'
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) errs.email = 'כתובת אימייל לא תקינה'
      if (!formData.businessName?.trim()) errs.businessName = 'יש להזין שם עסק'
      if (!formData.sector) errs.sector = 'יש לבחור ענף'
      if (!formData.mainProduct?.trim()) errs.mainProduct = 'יש לציין את המוצר/שירות המרכזי'
      if (!formData.businessSize) errs.businessSize = 'יש לבחור את גודל העסק'
      if (!formData.selectedProcess) errs.selectedProcess = 'יש לבחור תהליך'
      if (!formData.weeklyTimeSpent) errs.weeklyTimeSpent = 'יש לבחור טווח שעות'
      if (!formData.aiMistakeImpact) errs.aiMistakeImpact = 'יש לבחור רמת סיכון'
      if (!formData.aiExperience) errs.aiExperience = 'יש לבחור תשובה'
      if (!formData.mainLimitation) errs.mainLimitation = 'יש לבחור מגבלה'
      if (formData.mainLimitation === 'אחר (פרטו)' && !formData.otherLimitation?.trim()) errs.otherLimitation = 'יש לפרט את המגבלה'
      if (!formData.goal?.trim()) errs.goal = 'יש לציין מה המטרה העיקרית של הייעוץ'
      if (!formData.currentTools || formData.currentTools.length === 0) errs.currentTools = 'יש לבחור לפחות כלי אחד'
      return errs
    }

    const validationErrors = validate()
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      // focus first error (if possible)
      const firstField = Object.keys(validationErrors)[0]
      const el = document.getElementById(firstField)
      if (el) el.focus()
      return
    }

    // Send to server API which saves to Supabase
    ;(async () => {
      try {
        const res = await fetch('/api/consultation', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        })

        if (!res.ok) {
          const data = await res.json().catch(() => ({}))
          console.error('Save failed', data)
          if (data && data.errors) {
            // structured server-side validation errors
            setErrors(data.errors)
            return
          }
          alert('שגיאה בשליחת הטופס — נסו שוב מאוחר יותר')
          return
        }

        const data = await res.json()
        console.log('Saved consultation id', data.id)
        setSubmitted(true)
      } catch (err) {
        console.error('Unexpected submit error', err)
        alert('שגיאה בשליחת הטופס — נסו שוב מאוחר יותר')
      }
    })()
  }

  // toggleCustomerTouchpoint removed

  const toggleTool = (tool: string) => {
    setFormData((prev) => ({
      ...prev,
      currentTools: prev.currentTools.includes(tool)
        ? prev.currentTools.filter((t) => t !== tool)
        : [...prev.currentTools, tool],
    }))
    setErrors((prev) => ({ ...prev, currentTools: '' }))
  }

  if (submitted) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="max-w-2xl mx-auto px-4 py-16">
            <div className="bg-white rounded-3xl shadow-xl p-8 text-center">
              <div className="text-6xl mb-4">✅</div>
              <h2 className="text-2xl font-bold text-[#0b2e7b] mb-4">הטופס התקבל. תודה! </h2>

              {/* Social section (same style as simulator email-capture) */}
              <div className="mt-6">
                <div className="text-center mb-4">
                  <p className="text-sm text-slate-600 mt-1">הצטרפ/י לפעילות בערוצים השונים וקבל/י מידע חיוני AI לעסקים קטנים, חומרים, כלים ופתרונות נוספים</p>
                </div>

                <div className="flex justify-center gap-6 mt-4">
                  <a href={socialLinks.whatsapp} target="_blank" rel="noopener noreferrer" className="text-center" aria-label="WhatsApp">
                    <div style={{width:48,height:48,background:'#25D366',borderRadius:24,display:'flex',alignItems:'center',justifyContent:'center',margin:'0 auto 6px auto',boxShadow:'0 4px 8px rgba(37, 211, 102, 0.3)'}}>
                      <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><text x="50%" y="55%" dominantBaseline="middle" textAnchor="middle" fill="white" fontSize="16" fontWeight="700" fontFamily="Arial, sans-serif">W</text></svg>
                    </div>
                    <div className="text-xs text-slate-700 font-semibold">WhatsApp</div>
                  </a>

                  <a href={socialLinks.facebook} target="_blank" rel="noopener noreferrer" className="text-center" aria-label="Facebook">
                    <div style={{width:48,height:48,background:'#1877F2',borderRadius:24,display:'flex',alignItems:'center',justifyContent:'center',margin:'0 auto 6px auto',boxShadow:'0 4px 8px rgba(24, 119, 242, 0.3)'}}>
                      <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><text x="50%" y="55%" dominantBaseline="middle" textAnchor="middle" fill="white" fontSize="18" fontWeight="700" fontFamily="Arial, sans-serif">f</text></svg>
                    </div>
                    <div className="text-xs text-slate-700 font-semibold">Facebook</div>
                  </a>

                  <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="text-center" aria-label="LinkedIn">
                    <div style={{width:48,height:48,background:'#0A66C2',borderRadius:24,display:'flex',alignItems:'center',justifyContent:'center',margin:'0 auto 6px auto',boxShadow:'0 4px 8px rgba(10, 102, 194, 0.3)'}}>
                      <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fill="white" fontSize="16" fontWeight="700" fontFamily="Arial, sans-serif">in</text></svg>
                    </div>
                    <div className="text-xs text-slate-700 font-semibold">LinkedIn</div>
                  </a>

                  <a href={socialLinks.newsletter} target="_blank" rel="noopener noreferrer" className="text-center" aria-label="Newsletter">
                    <div style={{width:48,height:48,background:'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',borderRadius:24,display:'flex',alignItems:'center',justifyContent:'center',margin:'0 auto 6px auto',boxShadow:'0 4px 8px rgba(245, 87, 108, 0.3)'}}>
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg"><path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </div>
                    <div className="text-xs text-slate-700 font-semibold">Newsletter</div>
                  </a>

                  <a href={socialLinks.website} target="_blank" rel="noopener noreferrer" className="text-center" aria-label="Website">
                    <div style={{width:48,height:48,background:'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',borderRadius:24,display:'flex',alignItems:'center',justifyContent:'center',margin:'0 auto 6px auto',boxShadow:'0 4px 8px rgba(102, 126, 234, 0.3)'}}>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="10" fill="none" stroke="white" strokeWidth="2"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" stroke="white" strokeWidth="2" fill="none"/></svg>
                    </div>
                    <div className="text-xs text-slate-700 font-semibold">Website</div>
                  </a>
                </div>
              </div>
              <a href="/" className="block text-center text-sm text-slate-500 hover:text-slate-700 mt-6">בחזרה לאתר</a>
            </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <Header />
      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Hero */}
        <div className="text-center mb-10">
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-[#0b2e7b] mb-4">
             התאמת כלי AI לעסק שלך
          </h1>
          <p className="text-lg text-slate-600">
            מילוי השאלון אורך כ-5 דקות. <br />
            מטרתו: הכרות עם העסק שלך, בדיקת התאמה והכנה מירבית לשיחת האבחון המעמיקה.
          </p>
        </div>

        {/* Transparency box */}
        <div className="bg-gray-50 borde rounded-2xl p-6 mb-10 flex items-center justify-center">
          <div className="bg-white rounded-xl p-4 w-full max-w-3xl border-t-4 border-blue-200">
            <p className="font-semibold text-slate-700 mb-2">עסקים מתאימים יקבלו</p>
            <ul className="space-y-1 text-slate-600 text-sm">
              <li>• שיחת Zoom אבחון מקצועית</li>
              <li>• עבודת מחקר צרכים ובדיקת כלי AI מתאימים</li>
              <li>• מסמך מסכם הכולל תוכנית הטמעה מותאמת אישית</li>
            </ul>
            <p className="text-base text-slate-700 mt-3 font-semibold">ללא עלות * מספר המקומות מוגבל * בחירת עסקים מתאימים לפי צורך</p>
          </div>
        </div>

        {/* Form */}
        <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6 mb-10 flex items-center justify-center">
          <div className="bg-white rounded-xl p-6 w-full max-w-3xl border-t-4 border-blue-200 shadow-xl">
            <form onSubmit={handleSubmit} className="">
          {/* Section 0 - Threshold Conditions */}
          <CollapsibleSection title="תיאום ציפיות">
            <div className="pb-6 border-b border-slate-200">
              <div className="space-y-4">
                <div
                  onClick={() => {
                    setFormData({ ...formData, isDecisionMaker: !formData.isDecisionMaker })
                    setErrors((prev) => ({ ...prev, isDecisionMaker: '' }))
                  }}
                  className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                    formData.isDecisionMaker
                      ? "border-amber-500 bg-amber-50"
                      : "border-slate-200 hover:border-slate-300"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <CheckIcon checked={formData.isDecisionMaker} />
                    <div className="flex-1">
                      <span className="text-slate-700 font-medium">
                        אני בעל/ת העסק או מוסמך/ת לקבל החלטות בתחום AI בעסק*
                      </span>
                      {errors.isDecisionMaker ? (
                        <p className="text-sm text-red-600 mt-1">{errors.isDecisionMaker}</p>
                      ) : (
                        <p className="text-sm text-slate-500 mt-1">בלי זה לא נוכל להמשיך</p>
                      )}
                    </div>
                  </div>
                </div>

                <div
                  onClick={() => {
                    setFormData({ ...formData, canCommitToTrial: !formData.canCommitToTrial })
                    setErrors((prev) => ({ ...prev, canCommitToTrial: '' }))
                  }}
                  className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                    formData.canCommitToTrial
                      ? "border-amber-500 bg-amber-50"
                      : "border-slate-200 hover:border-slate-300"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <CheckIcon checked={formData.canCommitToTrial} />
                    <div className="flex-1">
                      <span className="text-slate-700 font-medium">
                      הבנתי את מלוא מהות ההצעה ואני יכול/ה להתחייב לתהליך איפיון והטמעת AI בעסק *
                      </span>
                      {errors.canCommitToTrial && <p className="text-sm text-red-600 mt-1">{errors.canCommitToTrial}</p>}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CollapsibleSection>

          {/* Section 1 */}
          <CollapsibleSection title="על העסק שלך">
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="fullName" className="text-slate-700 font-medium">
                    שם מלא *
                  </Label>
                  <Input
                    id="fullName"
                    required
                    value={formData.fullName}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      setFormData({ ...formData, fullName: e.target.value })
                      setErrors((prev) => ({ ...prev, fullName: '' }))
                    }}
                    className={`mt-2 rounded-xl ${errors.fullName ? 'border-red-500' : 'border-2 border-slate-300'} focus:ring-2 focus:ring-amber-500 focus:border-amber-500`}
                  />
                  {errors.fullName && <p className="text-sm text-red-600 mt-2">{errors.fullName}</p>}
                </div>

                <div>
                  <Label htmlFor="email" className="text-slate-700 font-medium">
                    כתובת אימייל - חשוב לוודא שתקינה *
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      setFormData({ ...formData, email: e.target.value })
                      setErrors((prev) => ({ ...prev, email: '' }))
                    }}
                    className={`mt-2 rounded-xl ${errors.email ? 'border-red-500' : 'border-2 border-slate-300'} focus:ring-2 focus:ring-amber-500 focus:border-amber-500`}
                  />
                  {errors.email && <p className="text-sm text-red-600 mt-2">{errors.email}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="phone" className="text-slate-700 font-medium">
                    מספר טלפון - חשוב לוודא שתקין
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, phone: e.target.value })}
                    className="mt-2 border-2 border-slate-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                  />
                </div>

                <div>
                  <Label htmlFor="businessName" className="text-slate-700 font-medium">
                    שם העסק *
                  </Label>
                  <Input
                    id="businessName"
                    required
                    value={formData.businessName}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      setFormData({ ...formData, businessName: e.target.value })
                      setErrors((prev) => ({ ...prev, businessName: '' }))
                    }}
                    className={`mt-2 rounded-xl ${errors.businessName ? 'border-red-500' : 'border-2 border-slate-300'} focus:ring-2 focus:ring-amber-500 focus:border-amber-500`}
                  />
                  {errors.businessName && <p className="text-sm text-red-600 mt-2">{errors.businessName}</p>}
                </div>
              </div>

              <div>
                <Label htmlFor="websiteUrl" className="text-slate-700 font-medium">
                  אתר העסק
                </Label>
                <Input
                  id="websiteUrl"
                  type="text"
                  value={formData.websiteUrl}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, websiteUrl: e.target.value })}
                  placeholder="https://yourbusiness.co.il"
                  className="mt-2 border-2 border-slate-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                />
              </div>

              <div>
                <Label className="text-slate-700 font-medium">ענף/סקטור *</Label>
                <Select
                  required
                  value={formData.sector}
                  onValueChange={(value: string) => {
                    setFormData({ ...formData, sector: value })
                    setErrors((prev) => ({ ...prev, sector: '' }))
                  }}
                >
                  <SelectTrigger className="mt-2 border-2 border-slate-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500">
                    <SelectValue placeholder="בחרו ענף" />
                  </SelectTrigger>
                  <SelectContent>
                    {sectors.map((sector) => (
                      <SelectItem key={sector} value={sector}>
                        {sector}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.sector && <p className="text-sm text-red-600 mt-2">{errors.sector}</p>}
                </div>

                {/* moved: main product + annual revenue */}
                <div>
                  <Label htmlFor="mainProduct" className="text-slate-700 font-medium">
                    מה המוצר/השירות המרכזי של העסק? *
                  </Label>
                  <Input
                    id="mainProduct"
                    required
                    value={formData.mainProduct}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      setFormData({ ...formData, mainProduct: e.target.value })
                      setErrors((prev) => ({ ...prev, mainProduct: '' }))
                    }}
                    placeholder="לדוגמה: שירותי ניקיון, ייעוץ משכנתאות, מסעדה..."
                    className={`mt-2 rounded-xl ${errors.mainProduct ? 'border-red-500' : 'border-2 border-slate-300'} focus:ring-2 focus:ring-amber-500 focus:border-amber-500`}
                  />
                  {errors.mainProduct && <p className="text-sm text-red-600 mt-2">{errors.mainProduct}</p>}
                </div>

              <div className="space-y-6 mt-4">
                <div>
                  <Label className="text-slate-700 font-medium mb-3 block">מה המחזור השנתי של העסק? (מחזור מוערך, לא רווח)</Label>
                  <Select
                    value={formData.revenueRange}
                    onValueChange={(value: string) => setFormData({ ...formData, revenueRange: value })}
                  >
                    <SelectTrigger className="mt-2 border-2 border-slate-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500">
                      <SelectValue placeholder="בחרו טווח מחזור" />
                    </SelectTrigger>
                    <SelectContent>
                      {revenueRanges.map((r) => (
                        <SelectItem key={r} value={r}>
                          {r}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="text-slate-700 font-medium mb-3 block">מה גודל העסק? *</Label>
                  <Select
                    required
                    value={formData.businessSize}
                    onValueChange={(value: string) => {
                      setFormData({ ...formData, businessSize: value })
                      setErrors((prev) => ({ ...prev, businessSize: '' }))
                    }}
                  >
                    <SelectTrigger className="mt-2 border-2 border-slate-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500">
                      <SelectValue placeholder="בחרו גודל" />
                    </SelectTrigger>
                    <SelectContent>
                      {businessSizes.map((size) => (
                        <SelectItem key={size} value={size}>
                          {size}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.businessSize && <p className="text-sm text-red-600 mt-2">{errors.businessSize}</p>}
                </div>

              </div>
              {/* customer touchpoints question removed */}
            </div>
          </CollapsibleSection>

          {/* Section 2 - Process Focus */}
          <CollapsibleSection title="על מה תרצה/י שנעבוד?">
            <div className="space-y-6">
              <div>
                <Label className="text-slate-700 font-medium mb-3 block">
                  בחרו תהליך אחד להתמקד בו בייעוץ *
                </Label>
                <Select
                  required
                  value={formData.selectedProcess}
                  onValueChange={(value: string) => {
                    setFormData({ ...formData, selectedProcess: value })
                    setErrors((prev) => ({ ...prev, selectedProcess: '' }))
                  }}
                >
                  <SelectTrigger className="mt-2 border-2 border-slate-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500">
                    <SelectValue placeholder="בחרו תהליך" />
                  </SelectTrigger>
                  <SelectContent>
                    {processes.map((process) => (
                      <SelectItem key={process} value={process}>
                        {process}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.selectedProcess && <p className="text-sm text-red-600 mt-2">{errors.selectedProcess}</p>}
              </div>

              <div>
                <Label className="text-slate-700 font-medium mb-3 block">
                  בערך כמה סה"כ זמן בשבוע (לכל העובדים) מושקע בתהליך הזה? *
                </Label>
                <Select
                  required
                  value={formData.weeklyTimeSpent}
                  onValueChange={(value: string) => {
                    setFormData({ ...formData, weeklyTimeSpent: value })
                    setErrors((prev) => ({ ...prev, weeklyTimeSpent: '' }))
                  }}
                >
                  <SelectTrigger className="mt-2 border-2 border-slate-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500">
                    <SelectValue placeholder="בחרו טווח שעות" />
                  </SelectTrigger>
                  <SelectContent>
                    {weeklyTimeSpent.map((time) => (
                      <SelectItem key={time} value={time}>
                        {time}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.weeklyTimeSpent && <p className="text-sm text-red-600 mt-2">{errors.weeklyTimeSpent}</p>}
              </div>

              <div>
                <Label className="text-slate-700 font-medium mb-3 block">
                  אם AI עושה טעות בתהליך הזה — כמה זה יכול להזיק? *
                </Label>
                <Select
                  required
                  value={formData.aiMistakeImpact}
                  onValueChange={(value: string) => {
                    setFormData({ ...formData, aiMistakeImpact: value })
                    setErrors((prev) => ({ ...prev, aiMistakeImpact: '' }))
                  }}
                >
                  <SelectTrigger className="mt-2 border-2 border-slate-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500">
                    <SelectValue placeholder="בחרו רמת סיכון" />
                  </SelectTrigger>
                  <SelectContent>
                    {aiMistakeImpact.map((impact) => (
                      <SelectItem key={impact} value={impact}>
                        {impact}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.aiMistakeImpact && <p className="text-sm text-red-600 mt-2">{errors.aiMistakeImpact}</p>}
              </div>

              {/* moved: current tools from Section 3 */}
              <div>
                <Label className="text-slate-700 font-medium mb-3 block">באילו כלים אתם משתמשים היום בתהליך הזה? *</Label>
                <div className="grid sm:grid-cols-2 gap-3">
                  {currentTools.map((tool) => (
                    <div
                      key={tool}
                      onClick={() => toggleTool(tool)}
                      className={`p-3 rounded-xl border-2 cursor-pointer transition-all ${
                        formData.currentTools.includes(tool)
                          ? "border-amber-500 bg-amber-50"
                          : "border-slate-200 hover:border-slate-300"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <CheckIcon checked={formData.currentTools.includes(tool)} />
                        <span className="text-slate-700">{tool}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-3">
                  <Input
                    placeholder="אחר (פרטו)"
                    value={formData.otherTool}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      const val = e.target.value
                      setFormData((prev) => {
                        const trimmed = val.trim()
                        // remove previous otherTool value from tools list if present
                        const prevOther = prev.otherTool && prev.otherTool.trim() ? prev.otherTool : null
                        let tools = prev.currentTools.filter((t) => t !== prevOther)
                        if (trimmed) {
                          // add the typed value as a chosen tool (if not present)
                          if (!tools.includes(trimmed)) tools = [...tools, trimmed]
                        }
                        return { ...prev, otherTool: val, currentTools: tools }
                      })
                      setErrors((prev) => ({ ...prev, currentTools: '' }))
                    }}
                    className={`border-slate-300 rounded-xl ${errors.currentTools ? 'border-red-500' : 'border-2 border-slate-300'} focus:ring-2 focus:ring-amber-500 focus:border-amber-500`}
                  />
                </div>
                {errors.currentTools && <p className="text-sm text-red-600 mt-2">{errors.currentTools}</p>}
              </div>
            </div>
          </CollapsibleSection>

          {/* Section 3 */}
          <CollapsibleSection title="העסק שלך ו-AI">
            <div className="space-y-6">
              {/* 'What is your biggest challenge with AI?' question removed */}

              <div>
                <Label className="text-slate-700 font-medium mb-3 block">האם השתמשתם בכלי AI בעבר? *</Label>
                <Select
                  required
                  value={formData.aiExperience}
                  onValueChange={(value: string) => {
                    setFormData({ ...formData, aiExperience: value })
                    setErrors((prev) => ({ ...prev, aiExperience: '' }))
                  }}
                >
                  <SelectTrigger className="mt-2 border-2 border-slate-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500">
                    <SelectValue placeholder="בחרו תשובה" />
                  </SelectTrigger>
                  <SelectContent>
                    {aiExperience.map((exp) => (
                      <SelectItem key={exp} value={exp}>
                        {exp}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.aiExperience && <p className="text-sm text-red-600 mt-2">{errors.aiExperience}</p>}
              </div>

              <div>
                <Label className="text-slate-700 font-medium mb-3 block">
                  מה המגבלה המרכזית שלכם כרגע בדרך לשימוש ב-AI? (בחרו אחת) *
                </Label>
                <Select
                  required
                  value={formData.mainLimitation}
                  onValueChange={(value: string) => {
                    setFormData({ ...formData, mainLimitation: value })
                    setErrors((prev) => ({ ...prev, mainLimitation: '' }))
                  }}
                >
                  <SelectTrigger className="mt-2 border-2 border-slate-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500">
                    <SelectValue placeholder="בחרו מגבלה" />
                  </SelectTrigger>
                  <SelectContent>
                    {mainLimitations.map((lim) => (
                      <SelectItem key={lim} value={lim}>
                        {lim}
                      </SelectItem>
                    ))}
                    <SelectItem value="אחר (פרטו)">אחר (פרטו)</SelectItem>
                  </SelectContent>
                </Select>
                {formData.mainLimitation === "אחר (פרטו)" && (
                  <div className="mt-3">
                    <Input
                      placeholder="אחר (פרטו)"
                      value={formData.otherLimitation}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        const val = e.target.value
                        setFormData((prev) => {
                          const trimmed = val.trim()
                          const next: any = { ...prev, otherLimitation: val }
                          // typing into the "other" field should count as choosing that option
                          if (trimmed && prev.mainLimitation !== 'אחר (פרטו)') {
                            next.mainLimitation = 'אחר (פרטו)'
                          }
                          return next
                        })
                        setErrors((prev) => ({ ...prev, otherLimitation: '', mainLimitation: '' }))
                      }}
                      className={`border-slate-300 rounded-xl ${errors.otherLimitation ? 'border-red-500' : 'border-2 border-slate-300'} focus:ring-2 focus:ring-amber-500 focus:border-amber-500`}
                    />
                    {errors.otherLimitation && <p className="text-sm text-red-600 mt-2">{errors.otherLimitation}</p>}
                  </div>
                )}
              </div>

              <div>
                <Label htmlFor="goal" className="text-slate-700 font-medium">
                  מה המטרה העיקרית שלכם מהייעוץ? *
                </Label>
                <Textarea
                  id="goal"
                  required
                  value={formData.goal}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                    setFormData({ ...formData, goal: e.target.value })
                    setErrors((prev) => ({ ...prev, goal: '' }))
                  }}
                  placeholder="אני רוצה לאוטומט מעקבי לקוחות, לא בטוח באיזה כלי להשתמש ומה העלות"
                  className="mt-2 border-2 border-slate-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 min-h-25"
                />
                {errors.goal && <p className="text-sm text-red-600 mt-2">{errors.goal}</p>}
                <p className="text-sm text-slate-500 mt-1">היו ספציפיים — זה עוזר לנו להתכונן ולבחור</p>
              </div>

              <div>
                <Label htmlFor="urgency" className="text-slate-700 font-medium">
                  משפט אחד: למה זה דחוף/חשוב עכשיו? (אופציונלי אבל מומלץ)
                </Label>
                <Input
                  id="urgency"
                  value={formData.urgency}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, urgency: e.target.value })}
                  placeholder="לדוגמה: מאבד לקוחות בגלל זמני תגובה איטיים..."
                  className="mt-2 border-2 border-slate-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                />
              </div>
            </div>
          </CollapsibleSection>
<div className="mb-6">
              <p className="text-sm text-slate-600 text-right">לחיצה על "+" לפתיחת כל חלק בשאלון. חשוב לענות על כל השאלות כדי לשלוח את הטופס.</p>
            </div>
          {submitAttempted && Object.keys(errors).length > 0 && (
            <div className="mb-4 p-3 bg-red-50 border border-red-300 text-red-700 rounded-xl text-right">
              מידע חסר או לא תקין. יש לבדוק שכל הנתונים הוזנו בהתאם להנחיות, לתקן ולשלוח שוב
            </div>
          )}
          {/* Scheduling section removed */}

          <Button
            type="submit"
            className="w-full bg-linear-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-bold rounded-xl py-6 text-lg"
          >
            שליחה ←
          </Button>

          <div
            onClick={() => setFormData((prev) => ({ ...prev, subscribeCommunity: !prev.subscribeCommunity }))}
            className={`mt-4 p-3 rounded-xl cursor-pointer transition-all flex items-start gap-3`}
            id="subscribeCommunity"
            role="checkbox"
            aria-checked={formData.subscribeCommunity}
          >
            <CheckIcon checked={formData.subscribeCommunity} />
            <div className="flex-1 text-right">
              <span className="text-slate-700">אני מעוניין/ת להצטרף לקהילת BizGoAI ולקבל עדכונים ותוכן</span>
            </div>
          </div>

          <p className="text-xs text-slate-500 text-right mt-3 leading-relaxed">
            נשתמש בפרטים שמסרת כדי לטפל בבקשה ולהתאים שיחת ייעוץ. מסירת הפרטים היא מרצון, אך בלי אימייל לא נוכל ליצור קשר.
            מידע נוסף וזכויותיך: {" "}
            <a href="/privacy" target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:underline">מדיניות הפרטיות</a>.
          </p>

            
        </form>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
