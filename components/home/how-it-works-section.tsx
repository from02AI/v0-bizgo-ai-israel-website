import Link from "next/link"
import { Target, Shield, Calculator, Check } from "lucide-react"
import { Button } from "@/components/ui/button"

const tools = [
  {
    icon: Target,
    iconColor: "text-[#0b2e7b]",
    iconBg: "bg-[#0b2e7b]/10",
    title: "משימות",
    description: "לגלות איפה AI יכול לעזור בעסק",
    stats: "4 שאלות | 2 דקות",
  },
  {
    icon: Shield,
    iconColor: "text-blue-600",
    iconBg: "bg-blue-100",
    title: "בטיחות",
    description: "האם העסק מוכן לאמץ AI? מאתרים סיכונים לפני שמתחילים",
    stats: "4 שאלות | 2 דקות",
  },
  {
    icon: Calculator,
    iconColor: "text-amber-600",
    iconBg: "bg-amber-100",
    title: "חסכון",
    description: "מחשבים חיסכון ל־6 חודשים כולל עלויות חבויות (עקומת למידה, טעויות, תחזוקה)",
    stats: "6 שאלות | 3 דקות",
  },
]

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="bg-neutral-50 py-16 md:py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-blue-600 drop-shadow-sm mb-4">
            סימולטור AI לעסק
          </h2>
          <p className="text-lg sm:text-xl text-slate-600">3 כלים פשוטים, 5 דקות, תשובות כנות על AI לעסק שלך</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-10">
          {tools.map((tool, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl border border-blue-100/50 p-6 shadow-xl hover:shadow-2xl transition-shadow"
            >
              <div className={`w-14 h-14 ${tool.iconBg} rounded-xl flex items-center justify-center mb-4`}>
                <tool.icon className={`w-7 h-7 ${tool.iconColor}`} />
              </div>
              <h3 className="text-xl font-bold text-[#0b2e7b] mb-2">{tool.title}</h3>
              <p className="text-slate-600 leading-relaxed mb-4">{tool.description}</p>
              <p className="text-sm text-slate-500 font-medium">{tool.stats}</p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Button
            asChild
            size="lg"
            className="bg-linear-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-bold rounded-xl shadow-lg hover:shadow-amber-500/25 transition-all text-lg px-8 py-6"
          >
            <Link href="/simulator">להתחיל את הסימולטור עכשיו ←</Link>
          </Button>

          <div className="flex flex-wrap justify-center gap-6 mt-6 text-sm text-slate-600">
            <div className="flex items-center gap-2">
              <Check className="w-5 h-5 text-green-600" />
              <span>חינם לגמרי</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-5 h-5 text-green-600" />
              <span>5 דקות</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-5 h-5 text-green-600" />
              <span>תוצאות מיידיות</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
