import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        {/* Hero */}
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-[#0b2e7b] mb-4">
            לעסקים קטנים מגיעה גישה הוגנת ל־AI
          </h1>
          <p className="text-xl text-slate-600">BizgoAI Israel קיימת כדי להשוות את המגרש.</p>
        </div>

        {/* Section 1 */}
        <section className="mb-16">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-blue-600 mb-6">פער ה־AI רק גדל</h2>
          <div className="prose prose-lg text-slate-600 leading-relaxed space-y-4">
            <p>בישראל יש כ־560,000 עסקים קטנים ובינוניים. הם עמוד השדרה של הכלכלה.</p>
            <p>אבל כשזה מגיע ל־AI, עסקים קטנים טובעים:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>62% חסרים מומחיות להעריך כלים</li>
              <li>74% מההטמעות שמתחילות מכלי — נכשלות</li>
              <li>37% חסרי זמן לחקור פתרונות</li>
              <li>34% לא רואים ROI ברור</li>
            </ul>
            <p>
              בינתיים, ארגונים גדולים מדרגים AI בהצלחה. יש להם: צוותי IT ייעודיים, תקציבים לניסוי ולכישלון, זמן ומשאבים
              ליישום נכון, גישה ליועצים מומחים.
            </p>
            <p className="font-semibold text-[#0b2e7b]">התוצאה? עסקים קטנים נשארים מאחור. כל יום.</p>
          </div>
        </section>

        {/* Section 2 */}
        <section className="mb-16">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-blue-600 mb-6">זה לא רק טכנולוגיה</h2>
          <div className="prose prose-lg text-slate-600 leading-relaxed space-y-4">
            <p>
              כשעסקים קטנים לא מאמצים AI, הם לא רק מפספסים יעילות — הם מפסידים ביתרון התחרותי. הפער בין מי שמשתמש ב־AI
              לבין מי שלא — רק גדל.
            </p>
            <p>ההשפעות מצטברות: עסקים שמתחילים היום עם AI יהיו שנים קדימה בעוד שנתיים. אלה שמחכים — ירדפו אחרי.</p>
          </div>
        </section>

        {/* Section 3 */}
        <section className="mb-16">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-blue-600 mb-6">בוחרים דרך אחרת</h2>
          <p className="text-lg text-slate-600 mb-6">
            BizgoAI Israel היא לא עוד ספקית כלי AI. אנחנו פלטפורמה שמתחילה בקהילה — על ידי עסקים קטנים, בשביל עסקים
            קטנים.
          </p>

          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-bold text-[#0b2e7b] mb-3">1. מתחילים בהערכה (לא במכירה)</h3>
              <p className="text-slate-600 leading-relaxed">
                לפני שמציעים כלים, אנחנו עוזרים לכם להבין אם AI בכלל מתאים למשימה שלכם. הסימולטור שלנו מזהה הזדמנויות,
                בודק מוכנות, ומחשב ROI ריאליסטי — כולל עלויות נסתרות.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-[#0b2e7b] mb-3">2. לומדים מעמיתים (לא מספקים)</h3>
              <p className="text-slate-600 leading-relaxed">
                הקהילה שלנו מבוססת על ניסיון אמיתי. בעלי עסקים משתפים מה עבד, מה נכשל, וכמה באמת עלה. בלי שיווק מנופח,
                בלי הבטחות ריקות.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-[#0b2e7b] mb-3">3. בונים ביחד (לא מלמעלה)</h3>
              <p className="text-slate-600 leading-relaxed">
                הכלים והפתרונות של BizgoAI Israel נבנים בתגובה לצרכים אמיתיים של הקהילה. אתם אומרים מה אתם צריכים —
                ואנחנו בונים את זה ביחד.
              </p>
            </div>
          </div>
        </section>

        {/* Section 4 */}
        <section className="mb-16">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-blue-600 mb-6">
            מגובה מחקר, מונע נתונים, נטול הטיות
          </h2>

          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-bold text-[#0b2e7b] mb-3">ראיות — לא דעות</h3>
              <p className="text-slate-600 leading-relaxed">
                כל הנתונים והמחקרים שאנחנו מציגים מגיעים ממקורות מאומתים. אנחנו לא ממציאים סטטיסטיקות — אנחנו מצטטים
                מחקרים אמיתיים.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-[#0b2e7b] mb-3">שקיפות — לא אינטרסים חבויים</h3>
              <p className="text-slate-600 leading-relaxed">
                כשאנחנו ממליצים על כלי, אנחנו אומרים למה. אם יש לנו שותפות עם ספק — תדעו. המטרה שלנו היא שתקבלו את
                ההחלטה הטובה ביותר עבורכם.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-[#0b2e7b] mb-3">ולידציה קהילתית — לא הבטחות ספקים</h3>
              <p className="text-slate-600 leading-relaxed">
                לפני שכלי נכנס להמלצות שלנו, הוא עובר בדיקה של בעלי עסקים אמיתיים. לא מספיק שהספק מבטיח — צריך שמישהו
                מהקהילה ישתמש ויאשר.
              </p>
            </div>
          </div>
        </section>

        {/* Section 5 */}
        <section className="mb-16">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-blue-600 mb-6">נבנה על ידי מי שמבין את השטח</h2>
          <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200">
            <p className="text-slate-500 italic text-center">סיפור המייסד יתווסף כאן</p>
          </div>
        </section>

        {/* Section 6 */}
        <section className="mb-16">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-blue-600 mb-6">לאן אנחנו הולכים</h2>

          <div className="space-y-6">
            <div className="bg-white rounded-xl border border-slate-200 p-6">
              <h3 className="text-lg font-bold text-[#0b2e7b] mb-2">שלב 1: תשתית קהילה (עכשיו)</h3>
              <p className="text-slate-600">
                בניית הקהילה, כלי ההערכה החינמיים, והייעוץ הראשוני. המטרה: להוכיח ערך ולבנות אמון.
              </p>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 p-6">
              <h3 className="text-lg font-bold text-[#0b2e7b] mb-2">שלב 2: כלים מונעי־קהילה (6–12 חודשים)</h3>
              <p className="text-slate-600">
                פיתוח כלים וטמפלטים מבוססי הצרכים שעולים מהקהילה. שותפויות עם ספקי AI שעומדים בסטנדרטים שלנו.
              </p>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 p-6">
              <h3 className="text-lg font-bold text-[#0b2e7b] mb-2">שלב 3: צמיחת האקוסיסטם (12+ חודשים)</h3>
              <p className="text-slate-600">
                הרחבה לתעשיות ספציפיות, תוכניות הכשרה, ושותפויות אסטרטגיות עם ארגוני עסקים קטנים.
              </p>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="text-center bg-gradient-to-br from-blue-50 to-white rounded-3xl p-8 border border-blue-100">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-blue-600 mb-4">להיות חלק מהפתרון</h2>
          <p className="text-lg text-slate-600 mb-8 max-w-xl mx-auto">
            לעסקים קטנים בישראל מגיע יותר משיווק מנופח וכלים שלא עובדים. ביחד — בונים דרך טובה יותר.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-bold rounded-xl px-8 py-6"
            >
              <Link href="/simulator">סימולטור</Link>
            </Button>
            <Button asChild className="bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl px-8 py-6">
              <Link href="/consultation">ייעוץ חינם</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="border-green-600 text-green-600 hover:bg-green-50 font-bold rounded-xl px-8 py-6 bg-transparent"
            >
              <a href="#">WhatsApp</a>
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
