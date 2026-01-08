"use client"

import type React from "react"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Info, Check, MessageCircle, BookOpen } from "lucide-react"
import Link from "next/link"

const sectors = ["מסעדות ומזון", "קמעונאות", "שירותים מקצועיים", "בנייה", "בריאות", "ייצור", "טכנולוגיה", "אחר"]

const businessSizes = ["1–5 עובדים", "6–10", "11–25", "26–50", "50+"]

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

const timeSlots = ["בוקר (9:00–12:00)", "צהריים (12:00–15:00)", "אחר הצהריים (15:00–18:00)", "גמיש — כל שעה"]

export default function ConsultationPage() {
  const [submitted, setSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    businessName: "",
    sector: "",
    businessSize: "",
    challenges: [] as string[],
    otherChallenge: "",
    aiExperience: "",
    goal: "",
    timeSlots: [] as string[],
    joinWhatsApp: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
    setSubmitted(true)
  }

  const toggleChallenge = (challenge: string) => {
    setFormData((prev) => ({
      ...prev,
      challenges: prev.challenges.includes(challenge)
        ? prev.challenges.filter((c) => c !== challenge)
        : [...prev.challenges, challenge],
    }))
  }

  const toggleTimeSlot = (slot: string) => {
    setFormData((prev) => ({
      ...prev,
      timeSlots: prev.timeSlots.includes(slot) ? prev.timeSlots.filter((s) => s !== slot) : [...prev.timeSlots, slot],
    }))
  }

  if (submitted) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="max-w-2xl mx-auto px-4 py-16">
          <div className="bg-white rounded-3xl shadow-xl p-8 text-center">
            <div className="text-6xl mb-4">✅</div>
            <h2 className="text-2xl font-bold text-[#0b2e7b] mb-4">הבקשה התקבלה!</h2>

            <div className="bg-slate-50 rounded-xl p-6 mb-8 text-right">
              <h3 className="font-bold text-[#0b2e7b] mb-4">מה עכשיו?</h3>
              <ol className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                    1
                  </span>
                  <span className="text-slate-600">נבדוק את כל הבקשות השבוע</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                    2
                  </span>
                  <span className="text-slate-600">אם נבחרתם — נשלח מייל לתיאום תוך 3–5 ימים</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                    3
                  </span>
                  <span className="text-slate-600">נקבע שיחת ייעוץ (30 דקות, ללא עלות)</span>
                </li>
              </ol>
            </div>

            <div className="bg-blue-50 rounded-xl p-6 mb-8 text-right">
              <h3 className="font-bold text-blue-800 mb-3">מה לצפות מהייעוץ:</h3>
              <ul className="space-y-2 text-blue-700">
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 mt-0.5 flex-shrink-0" />
                  <span>ניתוח הצרכים הספציפיים של העסק שלכם</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 mt-0.5 flex-shrink-0" />
                  <span>המלצות לכלי AI מותאמים</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 mt-0.5 flex-shrink-0" />
                  <span>תוכנית פעולה ברורה וריאליסטית</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 mt-0.5 flex-shrink-0" />
                  <span>הערכת עלויות וזמנים צפויים</span>
                </li>
              </ul>
            </div>

            <div className="grid gap-4 mb-8">
              <Link
                href="/simulator"
                className="flex items-center gap-4 p-4 bg-slate-50 hover:bg-slate-100 rounded-xl transition-colors"
              >
                <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-amber-600" />
                </div>
                <div className="text-right">
                  <p className="font-bold text-[#0b2e7b]">נסו את הסימולטור</p>
                  <p className="text-sm text-slate-500">בזמן שאתם מחכים</p>
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
                  <p className="font-bold text-[#0b2e7b]">הצטרפו ל־WhatsApp</p>
                  <p className="text-sm text-slate-500">לקהילה התומכת</p>
                </div>
              </a>

              <Link
                href="/about"
                className="flex items-center gap-4 p-4 bg-slate-50 hover:bg-slate-100 rounded-xl transition-colors"
              >
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                  <Info className="w-6 h-6 text-blue-600" />
                </div>
                <div className="text-right">
                  <p className="font-bold text-[#0b2e7b]">קראו עלינו</p>
                  <p className="text-sm text-slate-500">הכירו את BizgoAI Israel</p>
                </div>
              </Link>
            </div>

            <p className="text-sm text-slate-500">
              שאלות? צרו קשר:{" "}
              <a href="mailto:hello@bizgoai.co.il" className="text-blue-600 hover:underline">
                hello@bizgoai.co.il
              </a>
            </p>
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
            ייעוץ AI אישי — 30 דקות, בחינם
          </h1>
          <p className="text-lg text-slate-600">
            לא בטוחים מאיפה להתחיל עם AI? נדבר על האתגרים הספציפיים של העסק שלכם.
          </p>
        </div>

        {/* Transparency box */}
        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6 mb-10">
          <div className="flex items-start gap-3 mb-4">
            <Info className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="font-bold text-blue-800 mb-2">שקיפות מלאה: הייעוץ הוא כלי שיווקי</h3>
              <p className="text-blue-700">
                אתם ממלאים טופס ומצטרפים לקהילה. אנחנו בוחרים עסקים מתאימים פעם בשבוע ופונים לתאם שיחה.
              </p>
            </div>
          </div>
          <div className="bg-white rounded-xl p-4 mr-8">
            <p className="font-semibold text-slate-700 mb-2">למה זה עדיין משתלם לכם:</p>
            <ul className="space-y-1 text-slate-600 text-sm">
              <li>• אסטרטגיית AI מותאמת לעסק</li>
              <li>• המלצות לכלים ספציפיות</li>
              <li>• תוכנית פעולה ברורה</li>
              <li>• גישה לקהילה תומכת</li>
            </ul>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-3xl shadow-xl p-8">
          {/* Section 1 */}
          <div className="mb-10">
            <h2 className="text-xl font-bold text-[#0b2e7b] mb-6 pb-2 border-b border-slate-200">על העסק שלכם</h2>

            <div className="space-y-6">
              <div>
                <Label htmlFor="fullName" className="text-slate-700 font-medium">
                  שם מלא *
                </Label>
                <Input
                  id="fullName"
                  required
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="mt-2 border-2 border-slate-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                />
              </div>

              <div>
                <Label htmlFor="email" className="text-slate-700 font-medium">
                  כתובת אימייל *
                </Label>
                <Input
                  id="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="mt-2 border-2 border-slate-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                />
                <p className="text-sm text-slate-500 mt-1">נשלח אישור ופרטי הייעוץ</p>
              </div>

              <div>
                <Label htmlFor="phone" className="text-slate-700 font-medium">
                  מספר טלפון
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="mt-2 border-2 border-slate-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                />
                <p className="text-sm text-slate-500 mt-1">מעדיפים תיאום ב־WhatsApp</p>
              </div>

              <div>
                <Label htmlFor="businessName" className="text-slate-700 font-medium">
                  שם העסק *
                </Label>
                <Input
                  id="businessName"
                  required
                  value={formData.businessName}
                  onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                  className="mt-2 border-2 border-slate-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                />
              </div>

              <div>
                <Label className="text-slate-700 font-medium">ענף/סקטור *</Label>
                <Select
                  required
                  value={formData.sector}
                  onValueChange={(value) => setFormData({ ...formData, sector: value })}
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
              </div>

              <div>
                <Label className="text-slate-700 font-medium">גודל העסק *</Label>
                <Select
                  required
                  value={formData.businessSize}
                  onValueChange={(value) => setFormData({ ...formData, businessSize: value })}
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
              </div>
            </div>
          </div>

          {/* Section 2 */}
          <div className="mb-10">
            <h2 className="text-xl font-bold text-[#0b2e7b] mb-6 pb-2 border-b border-slate-200">אתגרי ה־AI שלכם</h2>

            <div className="space-y-6">
              <div>
                <Label className="text-slate-700 font-medium mb-3 block">מה האתגר הגדול ביותר שלכם עם AI? *</Label>
                <div className="grid sm:grid-cols-2 gap-3">
                  {challenges.map((challenge) => (
                    <div
                      key={challenge}
                      onClick={() => toggleChallenge(challenge)}
                      className={`p-3 rounded-xl border-2 cursor-pointer transition-all ${
                        formData.challenges.includes(challenge)
                          ? "border-amber-500 bg-amber-50"
                          : "border-slate-200 hover:border-slate-300"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <Checkbox checked={formData.challenges.includes(challenge)} />
                        <span className="text-slate-700">{challenge}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-3">
                  <Input
                    placeholder="אחר (פרטו)"
                    value={formData.otherChallenge}
                    onChange={(e) => setFormData({ ...formData, otherChallenge: e.target.value })}
                    className="border-2 border-slate-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                  />
                </div>
              </div>

              <div>
                <Label className="text-slate-700 font-medium mb-3 block">האם השתמשתם בכלי AI בעבר? *</Label>
                <div className="space-y-2">
                  {aiExperience.map((exp) => (
                    <div
                      key={exp}
                      onClick={() => setFormData({ ...formData, aiExperience: exp })}
                      className={`p-3 rounded-xl border-2 cursor-pointer transition-all ${
                        formData.aiExperience === exp
                          ? "border-amber-500 bg-amber-50"
                          : "border-slate-200 hover:border-slate-300"
                      }`}
                    >
                      <span className="text-slate-700">{exp}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <Label htmlFor="goal" className="text-slate-700 font-medium">
                  מה המטרה העיקרית שלכם מהייעוץ? *
                </Label>
                <Textarea
                  id="goal"
                  required
                  value={formData.goal}
                  onChange={(e) => setFormData({ ...formData, goal: e.target.value })}
                  placeholder="אני רוצה לאוטומט מעקבי לקוחות, לא בטוח באיזה כלי להשתמש ומה העלות"
                  className="mt-2 border-2 border-slate-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 min-h-[100px]"
                />
                <p className="text-sm text-slate-500 mt-1">היו ספציפיים — זה עוזר לנו להתכונן ולבחור</p>
              </div>
            </div>
          </div>

          {/* Section 3 */}
          <div className="mb-10">
            <h2 className="text-xl font-bold text-[#0b2e7b] mb-6 pb-2 border-b border-slate-200">תיאום</h2>

            <div className="space-y-6">
              <div>
                <Label className="text-slate-700 font-medium mb-3 block">מתי נוח לשיחה? *</Label>
                <div className="grid sm:grid-cols-2 gap-3">
                  {timeSlots.map((slot) => (
                    <div
                      key={slot}
                      onClick={() => toggleTimeSlot(slot)}
                      className={`p-3 rounded-xl border-2 cursor-pointer transition-all ${
                        formData.timeSlots.includes(slot)
                          ? "border-amber-500 bg-amber-50"
                          : "border-slate-200 hover:border-slate-300"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <Checkbox checked={formData.timeSlots.includes(slot)} />
                        <span className="text-slate-700">{slot}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <Label className="text-slate-700 font-medium mb-3 block">להצטרף לקהילת WhatsApp? *</Label>
                <div className="space-y-2">
                  <div
                    onClick={() => setFormData({ ...formData, joinWhatsApp: "yes" })}
                    className={`p-3 rounded-xl border-2 cursor-pointer transition-all ${
                      formData.joinWhatsApp === "yes"
                        ? "border-amber-500 bg-amber-50"
                        : "border-slate-200 hover:border-slate-300"
                    }`}
                  >
                    <span className="text-slate-700">כן, הוסיפו אותי לקבוצה</span>
                  </div>
                  <div
                    onClick={() => setFormData({ ...formData, joinWhatsApp: "no" })}
                    className={`p-3 rounded-xl border-2 cursor-pointer transition-all ${
                      formData.joinWhatsApp === "no"
                        ? "border-amber-500 bg-amber-50"
                        : "border-slate-200 hover:border-slate-300"
                    }`}
                  >
                    <span className="text-slate-700">לא, רק ייעוץ</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-bold rounded-xl py-6 text-lg"
          >
            שליחת בקשה ←
          </Button>
        </form>
      </main>
      <Footer />
    </div>
  )
}
