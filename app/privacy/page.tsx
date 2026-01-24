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
              אנחנו ב‑BizGoAI מחויבים להגן על הפרטיות שלכם. מדיניות זו מסבירה איזה מידע אישי נאסף באתר, למה הוא
              משמש, למי הוא עשוי להיות מועבר, ומהן הזכויות שלכם.
            </p>

            <p className="mt-4">
              <strong>בעל/ת השליטה במידע:</strong> BizGoAI (מופעל/ת על‑ידי אדם פרטי).
              <br />
              <strong>יצירת קשר בנושאי פרטיות:</strong>{" "}
              <a href="mailto:contact@bizgoai.co.il" className="text-blue-600 hover:underline">
                contact@bizgoai.co.il
              </a>
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#0b2e7b] mb-4">איזה מידע אנחנו אוספים?</h2>
            <ul className="list-disc list-inside space-y-2 mt-4">
              <li>
                <strong>פרטי קשר (בטפסים):</strong> שם, כתובת אימייל, מספר טלפון, ותוכן ההודעה/הבקשה.
              </li>
              <li>
                <strong>מידע על העסק (בטופס התאמת כלי AI):</strong> פרטים על העסק ותהליכים (לדוגמה: ענף, גודל עסק,
                תהליכים, כלים קיימים, מטרות ואתגרים).
              </li>
              <li>
                <strong>נתוני סימולטור ותוצאות:</strong> התשובות שלכם בשלושת הכלים ותוצאות החישוב. נתוני הסימולטור
                נשמרים במאגר שלנו; אתם יכולים להשתמש בסימולטור גם בלי למסור אימייל.
              </li>
              <li>
                <strong>מידע טכני:</strong> נתונים כמו כתובת IP, User‑Agent ולוגים תפעוליים (למשל לצורכי אבטחה,
                מניעת תקלה ושיפור השירות). בטופס התאמת כלי AI (הטופס הארוך) אנחנו שומרים גם IP ו‑User‑Agent יחד עם
                הבקשה.
              </li>
              <li>
                <strong>מידע אנליטי:</strong> באתר מוטמע Vercel Analytics לצורך מדידה ושיפור חוויית השימוש.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#0b2e7b] mb-4">כיצד אנחנו משתמשים במידע?</h2>
            <p>המידע שאנחנו אוספים משמש למטרות הבאות:</p>
            <ul className="list-disc list-inside space-y-2 mt-4">
              <li>
                <strong>מתן שירות:</strong> להפעיל את הסימולטור, לחשב תוצאות ולהפיק דוח.
              </li>
              <li>
                <strong>מענה לפניות ותיאום ייעוץ:</strong> ליצור קשר לגבי פניות באתר ובקשות להתאמת כלי AI.
              </li>
              <li>
                <strong>קהילה ועדכונים:</strong> לשלוח תוכן ועדכונים או לצרף לקהילה <em>רק אם נתתם הסכמה מפורשת</em>.
              </li>
              <li>
                <strong>שיפור השירות:</strong> לנתח שימוש ולשפר את הכלים והתוכן שלנו
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#0b2e7b] mb-4">אחסון מידע</h2>
            <p>
              <strong>סימולטור:</strong> נתוני הסימולטור נשמרים במאגר הנתונים שלנו (Supabase). אם בחרתם למסור אימייל
              כדי לקבל דוח למייל, האימייל נשמר יחד עם הדוח ונשתמש בו כדי לשלוח את הדוח.
            </p>
            <p className="mt-4">
              <strong>שליחת מיילים ודוחות:</strong> אנחנו משתמשים בשירות Resend כדי לשלוח הודעות אימייל (למשל דוח PDF
              או אישור קבלת פנייה).
            </p>

            <p className="mt-4">
              <strong>תשתיות:</strong> האתר מתארח ב‑Vercel. ייתכן שמידע יעובד/יאוחסן מחוץ לישראל (למשל בהתאם למיקומי
              שרתים/ספקים).
            </p>

            <p className="mt-4">
              אנחנו לא מוכרים מידע אישי. אנחנו לא מעבירים מידע אישי לצדדים שלישיים למטרות שיווק שלהם.
              שליחת עדכונים שיווקיים נעשית רק אם נתתם הסכמה מפורשת, וניתן לבקש הסרה בכל עת.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#0b2e7b] mb-4">האם חובה למסור מידע?</h2>
            <ul className="list-disc list-inside space-y-2 mt-4">
              <li>השימוש בסימולטור אפשרי גם ללא מסירת אימייל.</li>
              <li>כדי לקבל דוח למייל — נדרש למסור כתובת אימייל; ללא אימייל לא נוכל לשלוח את הדוח.</li>
              <li>בטפסי יצירת קשר/התאמת כלי AI יש שדות חובה (למשל שם ואימייל). ללא שדות חובה לא נוכל לטפל בפנייה.</li>
            </ul>
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
              נכון למועד העדכון, האתר לא מציג חלון הסכמה לעוגיות ואנחנו לא מצהירים על שימוש יזום בעוגיות שיווקיות.
              יחד עם זאת, באתר מוטמע Vercel Analytics לצורכי מדידה ושיפור השירות. אם בעתיד נוסיף עוגיות/כלים נוספים
              (למשל אנליטיקה מבוססת Cookies), נעדכן את המדיניות בהתאם.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#0b2e7b] mb-4">יצירת קשר</h2>
            <p>לכל שאלה או בקשה בנוגע לפרטיות, צרו קשר:</p>
            <p className="mt-4">
              אימייל:{" "}
              <a href="mailto:contact@bizgoai.co.il" className="text-blue-600 hover:underline">
                contact@bizgoai.co.il
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
