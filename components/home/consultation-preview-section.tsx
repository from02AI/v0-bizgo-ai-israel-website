import Link from "next/link"
import * as Icons from "lucide-react"
import { Button } from "@/components/ui/button"

export function ConsultationPreviewSection() {
  return (
    <section id="consultation" className="bg-gray-50 pt-20 pb-12 md:pt-28 md:pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12">
          <div className="text-center mb-10">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#0b2e7b] drop-shadow-sm mb-4">
התאמת כלי AI בחינם לעסק שלך          </h2>
            <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto">
              לא ברור מאיפה להתחיל עם AI או מה הצעד הנכון הבא? <br /><br />
              אני בונה מאגר ידע וכלים פרקטיים ל"קהילת AI לעסקים קטנים" <br />
              ומציעה לך להצטרף למספר מוגבל של עסקים <br />
שיקבלו תהליך חינמי להתאמת כלי AI לעסק.             </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-10">
            {/* What you'll get */}
            <div>
              <h3 className="font-bold text-blue-600 mb-4 text-lg">מה תקבלו:</h3>
              <ul className="space-y-3">
                {[
                  "שיחת Zoom אבחון מקצועית - 30 דקות לניתוח תהליך עבודה ספציפי והתאמתו ל-AI",
                  "כ-5 שעות עבודה שלי: מחקר, בדיקת כלים, הכנת חומרים (מותאם למורכבות הנדרשת)",
                  "מסמך מסכם הכולל תוכנית הטמעה מותאמת אישית - כלי AI לתהליך הנבחר, שלבים מדויקים, מדדי הצלחה",
                ].map(
                  (item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <Icons.Check className="w-5 h-5 text-amber-600 mt-0.5 shrink-0" />
                      <span className="text-slate-600">{item}</span>
                    </li>
                  ),
                )}
              </ul>
            </div>

            {/* How it works */}
            <div>
              <h3 className="font-bold text-blue-600 mb-4 text-lg">איך זה עובד:</h3>
              <ol className="space-y-3">
                {[
                  "ממלאים טופס קצר על העסק (כ־7 דקות)",
                  "אני עוברת על הבקשות ובוחרת עסקים מתאימים",
                  "  אצור קשר ונקבע פגישת Zoom "
                ].map(
                  (item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="w-6 h-6 bg-amber-600 text-white rounded-full flex items-center justify-center text-sm font-bold shrink-0">
                        {index + 1}
                      </span>
                      <span className="text-slate-600">{item}</span>
                    </li>
                  ),
                )}
              </ol>
            </div>
          </div>

          {/* Important box */}
          <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6 mb-4">
            <div className="flex items-start gap-3">
              <Icons.AlertCircle className="w-5 h-5 text-blue-600 mt-0.5 shrink-0" />
              <div>
                <p className="text-slate-700 mb-2">
                  <strong>חשוב:</strong> התכנית לעסקים קטנים בלבד. <br />נדרשת תקשורת ישירה מול בעל/ת הסמכות לקבלת החלטות בתחום זה בעסק<div className="br">              שקיפות: הגשת בקשה לא מבטיחה שתתקבלו, אבל אם תיבחרו — תקבלו תהליך ממוקד ומדיד
</div>
                </p>
              </div>
            </div>
          </div>

          <div className="text-center">
            <Button
              asChild
              size="lg"
              className="bg-linear-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold rounded-xl shadow-lg hover:shadow-blue-500/25 transition-all text-lg px-8 py-6"
            >
              <Link href="/consultation">הגישו בקשה לאבחון והתאמת כלי AI ללא עלות ←</Link>
            </Button>
            <p className="text-sm text-slate-500 mt-4">
              מספר המקומות מוגבל * בחירה בהתאם לצורך
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
