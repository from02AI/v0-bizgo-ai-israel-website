import Link from "next/link"
import { Search, ShieldCheck, TrendingUp, Check, FileText, BarChart3, AlertCircle, Lightbulb, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

const tools = [
  {
    icon: Search,
    iconColor: "text-[#0b2e7b]",
    iconBg: "bg-gradient-to-br from-blue-50 to-blue-100",
    title: "משימות",
    description: "מגלים איפה AI יכול לעזור בעסק",
    step: "1",
    borderClass: "border-blue-100",
    badgeBorder: "border-blue-100 text-[#0b2e7b]",
  },
  {
    icon: ShieldCheck,
    iconColor: "text-[#0b2e7b]",
    iconBg: "bg-gradient-to-br from-blue-50 to-blue-100",
    title: "בטיחות",
    description: "מאתרים סיכונים לפני שמתחילים",
    step: "2",
    borderClass: "border-blue-100",
    badgeBorder: "border-blue-100 text-[#0b2e7b]",
  },
  {
    icon: TrendingUp,
    iconColor: "text-[#0b2e7b]",
    iconBg: "bg-gradient-to-br from-blue-50 to-blue-100",
    title: "חסכון",
    description: "מחשבים חיסכון ל־6 חודשים",
    step: "3",
    borderClass: "border-blue-100",
    badgeBorder: "border-blue-100 text-[#0b2e7b]",
  },
]

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="bg-neutral-50 py-16 md:py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-blue-600 drop-shadow-sm mb-4">
            גלה איך AI חוסך לך זמן וכסף
          </h2>
          <p className="text-lg sm:text-xl text-slate-600">בדיקה מהירה, 3 כלים פשוטים, תשובות מיידיות, מבוסס מחקר, דוח מלא. ללא עלות!</p>
        </div>

        {/* Tools Grid with Connection Arrows */}
        <div className="relative mb-12">
          <div className="grid md:grid-cols-3 gap-8">
            {tools.map((tool, index) => (
              <div key={index} className="relative">
                {/* Card */}
                <div className={`bg-white rounded-3xl border-2 ${tool.borderClass} p-6 shadow-lg hover:shadow-2xl hover:border-blue-200 transition-all duration-300 h-full flex flex-col items-center text-center relative overflow-hidden group`}>
                  {/* Step Number removed per design */}
                  
                  {/* Icon */}
                  <div className={`w-16 h-16 ${tool.iconBg} rounded-2xl flex items-center justify-center mb-5 shadow-lg group-hover:scale-105 transition-transform duration-300`}>
                    <tool.icon className={`w-8 h-8 ${tool.iconColor} stroke-[2.5]`} />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-[#0b2e7b] mb-2">{tool.title}</h3>
                  <p className="text-slate-600 leading-relaxed">{tool.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Connectors between cards - desktop only. Arrow chevrons positioned in grid gap */}
          <div className="hidden md:block absolute inset-0 pointer-events-none">
            {/* Connector 1 (between col 1 and 2) */}
            <div style={{ left: '33.333%' }} className="absolute top-1/2 transform -translate-y-1/2 -translate-x-1/2">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-500 rounded-full flex items-center justify-center shadow-lg">
                <ArrowLeft className="w-5 h-5 text-white stroke-[2.5]" />
              </div>
            </div>

            {/* Connector 2 (between col 2 and 3) */}
            <div style={{ left: '66.666%' }} className="absolute top-1/2 transform -translate-y-1/2 -translate-x-1/2">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-500 rounded-full flex items-center justify-center shadow-lg">
                <ArrowLeft className="w-5 h-5 text-white stroke-[2.5]" />
              </div>
            </div>
          </div>
        </div>

        {/* PDF Value Preview Section */}
        <div className="bg-gradient-to-br from-blue-50 via-white to-amber-50 rounded-3xl border-2 border-blue-200 p-8 mb-10 shadow-xl">
          {/* Side-by-side layout: headline + cards (right/55%) + PDF preview (left/45%) on desktop, stacked on mobile */}
          <div className="grid md:grid-cols-[55%_45%] gap-8 items-start">
            {/* Headline + Feature cards (RIGHT side in RTL) */}
            <div className="order-2 md:order-1">
              <div className="text-center mb-6">
                <h3 className="text-2xl sm:text-3xl font-bold text-[#0b2e7b] mb-2">הדוח המקצועי שתקבלו</h3>
              </div>

              {/* Feature cards grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="flex items-start gap-4 bg-white/90 backdrop-blur rounded-2xl p-6 border border-blue-100">
                <div className="w-14 h-14 bg-blue-100 rounded-lg flex items-center justify-center shrink-0">
                  <Search className="w-7 h-7 text-blue-600" />
                </div>
                <div className="text-right">
                  <p className="font-bold text-[#0b2e7b] text-base">ניתוח התאמת משימה ל-AI</p>
                  <p className="text-sm text-slate-500">ציון מדויק עם הסבר מפורט</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4 bg-white/90 backdrop-blur rounded-2xl p-6 border border-blue-100">
                <div className="w-14 h-14 bg-blue-100 rounded-lg flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-7 h-7 text-blue-600" />
                </div>
                <div className="text-right">
                  <p className="font-bold text-[#0b2e7b] text-base">מפת סיכונים ובטיחות</p>
                  <p className="text-sm text-slate-500">זיהוי נקודות תשומת לב</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4 bg-white/90 backdrop-blur rounded-2xl p-6 border border-amber-100">
                <div className="w-14 h-14 bg-amber-100 rounded-lg flex items-center justify-center shrink-0">
                  <BarChart3 className="w-7 h-7 text-amber-600" />
                </div>
                <div className="text-right">
                  <p className="font-bold text-[#0b2e7b] text-base">גרף חיסכון 6 חודשים</p>
                  <p className="text-sm text-slate-500">תחזית פירוט מלאה</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4 bg-white/90 backdrop-blur rounded-2xl p-6 border border-amber-100">
                <div className="w-14 h-14 bg-amber-100 rounded-lg flex items-center justify-center shrink-0">
                  <Lightbulb className="w-7 h-7 text-amber-600" />
                </div>
                <div className="text-right">
                  <p className="font-bold text-[#0b2e7b] text-base">המלצות כלים מותאמות</p>
                  <p className="text-sm text-slate-500">פתרונות ספציפיים לעסק שלך</p>
                </div>
              </div>
            </div>

            {/* CTA moved here: below the 4 cards and centered */}
            <div className="mt-6 flex flex-col items-center col-span-1 sm:col-span-2">
              <div className="flex justify-center w-full">
                <Button
                  asChild
                  size="lg"
                  className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-bold rounded-xl shadow-lg hover:shadow-amber-500/25 transition-all text-xl px-12 py-4"
                >
                  <Link href="/simulator">להתחיל את הסימולטור עכשיו ←</Link>
                </Button>
              </div>

              <div className="flex flex-wrap justify-center gap-6 mt-4 text-sm text-slate-600">
                <div className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-green-600" />
                  <span>חינם לגמרי</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-green-600" />
                  <span>10 דקות</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-green-600" />
                  <span>תוצאות מיידיות</span>
                </div>
              </div>
            </div>
            
            </div>

            {/* PDF Mockup (LEFT side in RTL) - reduced to ~2/3 size */}
            <div className="order-1 md:order-2 mx-auto max-w-xs md:max-w-sm">
              <div className="relative">
                <img
                  src="/pdf-preview.png"
                  alt="דוגמה לדוח: גרף חיסכון לטווח 6 חודשים"
                  className="w-full rounded-2xl shadow-2xl transform -rotate-2 md:-rotate-3 mx-auto block"
                  loading="lazy"
                />
                <div className="absolute top-3 right-3">
                  <span className="bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full">דוגמה</span>
                </div>
              </div>
            </div>
          </div>
          
  
        </div>

        
      </div>
    </section>
  )
}
