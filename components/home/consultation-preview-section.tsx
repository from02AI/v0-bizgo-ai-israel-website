import Link from "next/link"
import { Check, Info } from "lucide-react"
import { Button } from "@/components/ui/button"

export function ConsultationPreviewSection() {
  return (
    <section id="consultation" className="bg-white py-16 md:py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-blue-600 drop-shadow-sm mb-4">
            צריכים עזרה אישית? ייעוץ חינם.
          </h2>
          <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto">
            לא בטוחים מאיפה להתחיל? נדבר על העסק שלכם. ייעוץ חינם של 30 דקות עם מומחה AI לעסקים קטנים.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-10">
          {/* What you'll get */}
          <div>
            <h3 className="font-bold text-[#0b2e7b] mb-4 text-lg">מה תקבלו:</h3>
            <ul className="space-y-3">
              {["זיהוי הזדמנויות AI שמתאימות לעסק שלכם", "המלצות לכלים מותאמים אישית", "תוכנית התחלה ברורה"].map(
                (item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-slate-600">{item}</span>
                  </li>
                ),
              )}
            </ul>
          </div>

          {/* How it works */}
          <div>
            <h3 className="font-bold text-[#0b2e7b] mb-4 text-lg">איך זה עובד:</h3>
            <ol className="space-y-3">
              {["ממלאים טופס קצר (2 דקות)", "אנחנו בוחרים עסקים מתאימים (פעם בשבוע)", "מתאמים שיחה — ללא התחייבות"].map(
                (item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                      {index + 1}
                    </span>
                    <span className="text-slate-600">{item}</span>
                  </li>
                ),
              )}
            </ol>
          </div>
        </div>

        {/* Transparency box */}
        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6 mb-8">
          <div className="flex items-start gap-3 mb-4">
            <Info className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
            <p className="text-slate-700">
              <strong>שקיפות מלאה:</strong> הייעוץ הוא כלי שיווקי. אתם נותנים אימייל ומצטרפים לקהילה, ואנחנו בוחרים את
              העסקים שהכי מתאימים לצרכים שלנו.
            </p>
          </div>
          <div className="mr-8">
            <p className="font-semibold text-slate-700 mb-2">למה זה עדיין משתלם לכם:</p>
            <ul className="space-y-1 text-slate-600">
              <li>• תקבלו המלצות AI אמיתיות ומותאמות</li>
              <li>• תוכנית התחלה בלי התחייבות</li>
              <li>• גישה לקהילה תומכת של בעלי עסקים קטנים</li>
            </ul>
          </div>
        </div>

        <div className="text-center">
          <Button
            asChild
            size="lg"
            className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-bold rounded-xl shadow-lg hover:shadow-amber-500/25 transition-all text-lg px-8 py-6"
          >
            <Link href="/consultation">הגישו בקשה לייעוץ חינם ←</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
