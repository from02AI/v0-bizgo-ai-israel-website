import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function PrivacyPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        <h1 className="text-4xl font-black tracking-tight text-[#0b2e7b] mb-8">מדיניות פרטיות</h1>

        <div className="prose prose-lg text-slate-600 leading-relaxed space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-[#0b2e7b] mb-4">מבוא</h2>
            <p>
              BizGoAI אנחנו מחויבים להגן על הפרטיות שלכם. מדיניות פרטיות זו מסבירה אילו מידע אנחנו אוספים, כיצד
              אנחנו משתמשים בו, ומהן הזכויות שלכם בנוגע למידע הזה.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#0b2e7b] mb-4">איזה מידע אנחנו אוספים?</h2>
            <p>אנחנו אוספים את המידע הבא:</p>
            <ul className="list-disc list-inside space-y-2 mt-4">
              <li>
                <strong>פרטי קשר:</strong> שם, כתובת אימייל, מספר טלפון (אופציונלי)
              </li>
              <li>
                <strong>מידע על העסק:</strong> שם העסק, ענף, גודל, אתגרים עם AI
              </li>
              <li>
                <strong>תוצאות הסימולטור:</strong> התשובות שלכם בשלושת הכלים וציוני ההערכה
              </li>
              <li>
                <strong>מידע טכני:</strong> כתובת IP, סוג דפדפן, זמני גישה (לצורך שיפור השירות)
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#0b2e7b] mb-4">כיצד אנחנו משתמשים במידע?</h2>
            <p>המידע שאנחנו אוספים משמש למטרות הבאות:</p>
            <ul className="list-disc list-inside space-y-2 mt-4">
              <li>
                <strong>מתן שירות:</strong> להריץ את הסימולטור ולספק תוצאות מותאמות
              </li>
              <li>
                <strong>תיאום ייעוץ:</strong> ליצור קשר לגבי בקשות ייעוץ
              </li>
              <li>
                <strong>ניוזלטר וקהילה:</strong> לשלוח עדכונים ותוכן (רק אם הסכמתם)
              </li>
              <li>
                <strong>שיפור השירות:</strong> לנתח שימוש ולשפר את הכלים והתוכן שלנו
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#0b2e7b] mb-4">אחסון מידע</h2>
            <p>
              בשלב ה־MVP (גרסת הבדיקה), תוצאות הסימולטור נשמרות בדפדפן שלכם בלבד ולא מועברות לשרתים שלנו. מידע שמילאתם
              בטפסים (כמו בקשת ייעוץ או הרשמה לניוזלטר) נשמר במערכות שלנו באופן מאובטח.
            </p>
            <p className="mt-4">
              אנחנו לא מוכרים או משתפים את המידע שלכם עם צדדים שלישיים למטרות שיווקיות, אלא אם הסכמתם לכך במפורש.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#0b2e7b] mb-4">הזכויות שלכם</h2>
            <p>יש לכם את הזכויות הבאות:</p>
            <ul className="list-disc list-inside space-y-2 mt-4">
              <li>
                <strong>גישה:</strong> לבקש עותק של המידע שאנחנו מחזיקים עליכם
              </li>
              <li>
                <strong>תיקון:</strong> לבקש תיקון מידע שגוי
              </li>
              <li>
                <strong>מחיקה:</strong> לבקש מחיקת המידע שלכם
              </li>
              <li>
                <strong>הסרה מרשימות תפוצה:</strong> להסיר את עצמכם מהניוזלטר או קבוצות בכל עת
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#0b2e7b] mb-4">עוגיות (Cookies)</h2>
            <p>
              האתר משתמש בעוגיות חיוניות לתפקוד תקין. אנחנו עשויים להשתמש גם בעוגיות אנליטיות לצורך הבנת דפוסי שימוש
              ושיפור השירות. ניתן לשלוט בהגדרות העוגיות דרך הדפדפן שלכם.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#0b2e7b] mb-4">יצירת קשר</h2>
            <p>לכל שאלה או בקשה בנוגע לפרטיות, צרו קשר:</p>
            <p className="mt-4">
              אימייל:{" "}
              <a href="mailto:privacy@bizgoai.co.il" className="text-blue-600 hover:underline">
                privacy@bizgoai.co.il
              </a>
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#0b2e7b] mb-4">עדכונים למדיניות</h2>
            <p>
              אנחנו עשויים לעדכן מדיניות זו מעת לעת. שינויים מהותיים יפורסמו באתר ותקבלו הודעה באימייל (אם נרשמתם). המשך
              השימוש באתר לאחר עדכון המדיניות מהווה הסכמה לתנאים המעודכנים.
            </p>
          </section>

          <section className="pt-8 border-t border-slate-200">
            <p className="text-sm text-slate-500">עודכן לאחרונה: ינואר 2026</p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  )
}
