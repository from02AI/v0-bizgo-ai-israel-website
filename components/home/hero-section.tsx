import Link from "next/link"
import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"

export function HeroSection() {
  return (
    <section className="bg-linear-to-b from-neutral-50 to-white py-16 md:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-black tracking-tight text-[#0b2e7b] mb-6 text-balance max-w-[95vw] mx-auto">
     BizGoAI לעסקים קטנים</h1>
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-blue-600 mb-4">מתקדמים לבינה המלאכותית, בבטחון. ביחד.</h2>
        <div className="text-base sm:text-lg md:text-xl text-slate-600 leading-relaxed mb-4 max-w-2xl mx-auto">
          <p className="mb-2">← מתחילים בכלי הערכה חינמי</p>
          <p className="mb-2">← מתחברים לקהילה תומכת AI לעסקים קטנים</p>
          <p>← צומחים עם מגוון כלים ופתרונות</p>
        </div>

        <Button
          asChild
          size="lg"
          className="mt-5 bg-linear-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-bold rounded-xl shadow-lg hover:shadow-amber-500/25 transition-all text-base sm:text-lg px-8 sm:px-12 py-4 sm:py-6 md:py-8 min-h-[44px]"
        >
          <Link href="/simulator">התחל סימולטור</Link>
        </Button>

        <div className="flex flex-wrap justify-center gap-4 sm:gap-5 mt-3 text-sm text-slate-600">
          <div className="flex items-center gap-2">
            <Check className="w-5 h-5  text-blue-600" />
            <span>ללא עלות</span>
          </div>
          <div className="flex items-center gap-2">
            <Check className="w-5 h-5  text-blue-600" />
            <span>ללא התחייבות</span>
          </div>
          <div className="flex items-center gap-2">
            <Check className="w-5 h-5  text-blue-600" />
            <span>תוצאות מיידיות</span>
          </div>
        </div>
      </div>
    </section>
  )
}
