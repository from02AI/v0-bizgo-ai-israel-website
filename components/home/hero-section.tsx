import Link from "next/link"
import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"

export function HeroSection() {
  return (
    <section className="bg-linear-to-b from-neutral-50 to-white py-16 md:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-black tracking-tight text-[#0b2e7b] mb-6 text-balance">
      קהילת AI לעסקים קטנים</h1>
        <h2 className="text-2xl sm:text-3xl font-bold  text-blue-600 mb-4">מתקדמים לבינה המלאכותית, בבטחון. ביחד.</h2>
        <p className="text-lg sm:text-xl text-slate-600 leading-relaxed mb-4 max-w-2xl mx-auto">
         ← מתחילים בכלי הערכה חינמי 
          <br />
          ← מתחברים לקהילה תומכת AI לעסקים קטנים 
          <br />
          ← צומחים עם מגוון כלים ופתרונות 
        </p>

        <Button
          asChild
          size="lg"
          className="mt-5 bg-linear-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-bold rounded-xl shadow-lg hover:shadow-amber-500/25 transition-all text-lg px-12 py-8"
        >
          <Link href="/simulator">התחל סימולטור</Link>
        </Button>

        <div className="flex flex-wrap justify-center gap-5 mt-3 text-sm text-slate-600">
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
