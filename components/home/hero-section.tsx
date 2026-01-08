import Link from "next/link"
import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"

export function HeroSection() {
  return (
    <section className="bg-gradient-to-b from-neutral-50 to-white py-16 md:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-[#0b2e7b] mb-6 text-balance">
          עסקים קטנים מתקדמים עם AI. בביטחון.
        </h1>

        <p className="text-lg sm:text-xl text-slate-600 leading-relaxed mb-4 max-w-2xl mx-auto">
          מתחילים בכלי הערכה חינמי →
          <br />
          ממשיכים עם קהילה תומכת לעסקים קטנים →
          <br />
          צומחים עם כלים ופתרונות שנבנה ביחד
        </p>

        <p className="text-lg text-[#0b2e7b] font-medium mb-8">AI מבלבל? קבלו תשובות ישירות.</p>

        <Button
          asChild
          size="lg"
          className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-bold rounded-xl shadow-lg hover:shadow-amber-500/25 transition-all text-lg px-8 py-6"
        >
          <Link href="/simulator">התחל סימולטור</Link>
        </Button>

        <div className="flex flex-wrap justify-center gap-6 mt-8 text-sm text-slate-600">
          <div className="flex items-center gap-2">
            <Check className="w-5 h-5 text-green-600" />
            <span>ללא עלות</span>
          </div>
          <div className="flex items-center gap-2">
            <Check className="w-5 h-5 text-green-600" />
            <span>ללא התחייבות</span>
          </div>
          <div className="flex items-center gap-2">
            <Check className="w-5 h-5 text-green-600" />
            <span>תוצאות כנות</span>
          </div>
        </div>
      </div>
    </section>
  )
}
