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
          <p className="text-lg sm:text-xl text-slate-600">בדיקה מהירה, 3 כלים פשוטים, תשובות מיידיות.<div className="br"></div> דוח מפורט של 2 עמודים למייל- ללא עלות!</p>
        </div>

        {/* Tools cards removed */}

        {/* PDF Value Preview Section */}
        <div className="bg-linear-to-br from-blue-50 via-white to-amber-50 rounded-3xl border-2 border-blue-200 p-8 mb-10 shadow-xl">
          {/* Side-by-side layout: headline + cards (right/55%) + PDF preview (left/45%) on desktop, stacked on mobile */}
          <div className="grid md:grid-cols-[55%_45%] gap-8 items-start">
            {/* Headline + Feature cards (RIGHT side in RTL) */}
            <div className="order-2 md:order-1">
              <div className="text-center mb-6">
              </div>

              {/* Feature cards grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="flex items-start gap-4 bg-white/90 backdrop-blur rounded-2xl p-6 border border-blue-100">
                <div className="w-14 h-14 bg-blue-100 rounded-lg flex items-center justify-center shrink-0">
                  <Search className="w-7 h-7 text-blue-600" />
                </div>
                <div className="text-right">
                  <p className="font-bold text-[#0b2e7b] text-base"> התאמת משימה ל-AI</p>
                  <p className="text-sm text-slate-500">מגלים איפה AI יכול לעזור בעסק

</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4 bg-white/90 backdrop-blur rounded-2xl p-6 border border-blue-100">
                <div className="w-14 h-14 bg-blue-100 rounded-lg flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-7 h-7 text-blue-600" />
                </div>
                <div className="text-right">
                  <p className="font-bold text-[#0b2e7b] text-base">בדיקת בטיחות</p>
                  <p className="text-sm text-slate-500">מאתרים סיכונים לפני שמתחילים

</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4 bg-white/90 backdrop-blur rounded-2xl p-6 border border-blue-100">
                <div className="w-14 h-14 bg-blue-100 rounded-lg flex items-center justify-center shrink-0">
                  <BarChart3 className="w-7 h-7 text-blue-600" />
                </div>
                <div className="text-right">
                  <p className="font-bold text-[#0b2e7b] text-base">גרף חסכון</p>
                  <p className="text-sm text-slate-500">הערכת חיסכון 6 חודשים</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4 bg-white/90 backdrop-blur rounded-2xl p-6 border border-blue-100">
                <div className="w-14 h-14 bg-blue-100 rounded-lg flex items-center justify-center shrink-0">
                  <Lightbulb className="w-7 h-7 text-blue-600" />
                </div>
                <div className="text-right">
                  <p className="font-bold text-[#0b2e7b] text-base">הסברים מלאים ודוח מפורט למייל</p>
                </div>

              </div>
            </div>

            {/* CTA moved here: below the 4 cards and centered */}
            <div className="mt-8 flex flex-col items-center col-span-1 sm:col-span-2">
              <div className="flex justify-center w-full">
                <Button
                  asChild
                  size="lg"
                  className="bg-linear-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-bold rounded-xl shadow-lg hover:shadow-amber-500/25 transition-all text-2xl px-14 py-8"
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
                {/* Fanned PDF previews: bottom card */}
                <img
                  src="/pdf-preview.png"
                  alt="דוגמה לדוח: גרף חיסכון לטווח 6 חודשים - שכבה אחורית"
                  className="w-full rounded-2xl shadow-2xl transform -rotate-2 md:-rotate-3 origin-bottom-left mx-auto block z-10"
                  loading="lazy"
                />

                {/* Top card slightly offset/rotated to create a 'fan' */}
                <img
                  src="/pdf_preview2.png"
                  alt="דוגמה לדוח: גרף חיסכון - שכבה קדמית"
                  className="absolute bottom-0 left-0 md:left-0 w-11/12 md:w-[88%] rounded-2xl shadow-2xl transform rotate-15 origin-bottom-left mx-auto block z-20"
                  loading="lazy"
                />

                <div className="absolute top-3 right-3 z-30">
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
