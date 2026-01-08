import Link from "next/link"
import { Target, Handshake, Rocket } from "lucide-react"

const keyPoints = [
  {
    icon: Target,
    text: "קהילה ישראלית: 100% תוכן בעברית, מותאם לעסקים בישראל",
  },
  {
    icon: Handshake,
    text: "בלי בולשיט: נתונים מגובים במחקר, לא שיווק מנופח",
  },
  {
    icon: Rocket,
    text: "מתחילים עכשיו, צומחים ביחד: כלים חינמיים היום, פתרונות שנבנה יחד מחר",
  },
]

export function AboutPreviewSection() {
  return (
    <section className="bg-neutral-50 py-16 md:py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-blue-600 drop-shadow-sm mb-6 text-center">
          למה BizgoAI Israel?
        </h2>

        <div className="max-w-3xl mx-auto text-center mb-10">
          <p className="text-lg text-slate-600 leading-relaxed mb-4">
            אנחנו מאמינים שלעסקים קטנים בישראל מגיעה גישה הוגנת ל־AI. די לשיווק מנופח, די לכלים שלא עובדים, די לבזבוז
            זמן וכסף.
          </p>
          <p className="text-lg text-slate-600 leading-relaxed">
            BizgoAI Israel נבנה על קהילה של בעלי עסקים קטנים שמשתפים ניסיון אמיתי, כדי שתוכלו לאמץ AI בביטחון — תוך
            חיסכון בזמן ובכסף.
          </p>
        </div>

        <div className="space-y-4 mb-10">
          {keyPoints.map((point, index) => (
            <div key={index} className="flex items-start gap-4 bg-white rounded-xl p-4 shadow-sm">
              <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <point.icon className="w-5 h-5 text-amber-600" />
              </div>
              <p className="text-slate-700 font-medium pt-2">{point.text}</p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link
            href="/about"
            className="text-blue-600 font-semibold hover:text-blue-700 transition-colors inline-flex items-center gap-2"
          >
            קראו את הסיפור המלא ←
          </Link>
        </div>
      </div>
    </section>
  )
}
