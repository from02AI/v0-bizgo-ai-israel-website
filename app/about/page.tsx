import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import CTARegistrationForm from '@/components/cta-registration-form'

export default function AboutPage() {
  return (
    <div className="min-h-screen" dir="rtl">
      <Header />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        {/* Hero Section - Founder Introduction */}
        <div className="text-center mb-20">
          <div className="mb-8 flex justify-center">
            <div className="relative w-48 h-48 sm:w-56 sm:h-56 rounded-full overflow-hidden shadow-2xl ring-[#0b2e7b]">
              <img
                src="/images/founder.jpg"
                alt="מייסדת BizGoAI"
                className="object-cover w-full h-full"
                loading="eager"
              />
            </div>
          </div>
         
          <p className="text-2xl sm:text-2xl text-blue-600 font-bold max-w-2xl mx-auto leading-relaxed">
            הקמתי את BizGoAI כדי לבנות גשרים בין עידן ה-AI{" "}<span className="hidden sm:inline"><br /></span>לבין המציאות של עסקים קטנים.
          </p>
        </div>

        {/* Personal Journey */}
        <section className="mb-16">
          <div className="rounded-3xl p-8 sm:p-10 shadow-sm">
            <h2 className="text-2xl sm:text-3xl font-bold text-blue-600 mb-6">למה AI? </h2>
            <div className="prose prose-lg max-w-none text-slate-700 leading-relaxed space-y-4">
              <p>
              שמי שני כרמי רדושיצקי, רואת חשבון בהכשרתי ובמשך 15 שנים יזמתי פרויקטים וניהלתי בתפקידי אופרציה וכספים במגוון ארגונים (עסקים קטנים, חברות, עמותות, קואופרטיבים) ותחומים: הייטק, חינוך, בנקאות ועוד.
              </p>
              <p className=" text-slate-700">
                  <span className="font-bold text-[#0b2e7b]">בתחילת שנת 2025 "נפלה עלי ההבנה" ש-AI הולך לשנות הכל{" "}<span className="hidden sm:inline"><br /></span>תחום העיסוק, התפקידים, העבודה השוטפת...ישתנו או ייעלמו. </span>{" "}<span className="hidden sm:inline"><br /><br /></span>
                  מהר מאוד הבנתי עד כמה העולם הזה עצום.
                  בעיקר חדש ושונה מכל מה שהכרנו עד היום — ואנחנו רק בהתחלה.
                  הרשתות החברתיות מגבירות את הרעש וכמויות התוכן (עם הרבה פייק){" "}<span className="hidden sm:inline"><br /></span>
                  הרבה הבטחות שקשה להבחין בין מה שעובד לבין מה שמצולם טוב<div className="br"></div>אפשר בקלות ללכת לאיבוד<div className="br"></div>

והלחץ "להתקדם ל-AI" רק עולה.
              </p>
              <p>
                <span className="font-bold text-blue-600">מאז אני ממשיכה לחקור, לומדת, מעמיקה ומתמקדת בבניית פתרונות ומוצרים דיגיטליים עם AI.</span>
              </p>
            </div>
          </div>
        </section>

     

        {/* The Real Gap */}
        <section className="mb-16">
          <div className="rounded-3xl p-8 sm:p-10 text-slate-700 shadow-sm">
            <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-blue-600">למה עסקים קטנים?</h2>
            <div className="prose prose-lg max-w-none text-slate-700 leading-relaxed space-y-4">
              <p>
                הפער האמיתי הוא <span>לא מחסור בכלים</span> — אלא מחסור באמון:
              </p>

              <ul className="m-0 list-inside space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="text-[#0b2e7b] text-xl font-bold">•</span>
                    <span className="font-semibold text-[#0b2e7b]">?מאיפה להתחיל</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#0b2e7b] text-xl font-bold">•</span>
                    <span className="font-semibold text-[#0b2e7b]">במה AI יכול לעזור בעסק?</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#0b2e7b] text-xl font-bold">•</span>
                    <span className="font-semibold text-[#0b2e7b]">מה מתאים לעסק שלי?</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#0b2e7b] text-xl font-bold">•</span>
                    <span className="font-semibold text-[#0b2e7b]">על מה אפשר לסמוך?</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#0b2e7b] text-xl font-bold">•</span>
                    <span className="font-semibold text-[#0b2e7b]">ממה כדאי להיזהר?</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#0b2e7b] text-xl font-bold">•</span>
                    <span className="font-semibold text-[#0b2e7b]">מיוחד לישראל: איך להסתדר בתחום שעדיין לא מונגש טוב לעברית?</span>
                  </li>
              </ul>

              <div className="mt-4 pt-2">
                <ul className="m-0 list-inside space-y-1">
                  
                </ul>
                <p>
                  <span className=" font-bold text-blue-600">לעסקים קטנים יש יכולת נמוכה להשקיע משאבי זמן, תקציב וידע טכנולוגיים נדרשים{" "}<span className="hidden sm:inline"><br /></span>כדי לנווט בעולם החדש של AI - ואז הכאוס הופך לסיכון ממשי
.</span>
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Title for the Solution cards (not in a card) */}
        <section className="mb-8 text-center mt-24">
          <h2 className="text-3xl sm:text-4xl font-black text-[#0b2e7b] mb-3">BizGoAI נבנית בדיוק עבור זה</h2>
          <p className="text-lg sm:text-xl text-slate-700">לבנות גשרים. לחבר בין אנשים. ולצמוח ביחד.</p>
        </section>

      
        
        {/* Moved: The Solution cards */}
        <section className="mb-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div className="bg-white rounded-2xl p-6 border-r-4 border-blue-600 shadow-sm flex flex-col items-start justify-center min-h-[120px]">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl">👥</span>
                <h3 className="text-lg font-bold text-[#0b2e7b]">קהילה</h3>
              </div>
              <p className="text-slate-700 text-sm">
                קהילה של עסקים קטנים בישראל לשיתוף, תמיכה וצמיחה משותפת.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 border-r-4 border-blue-600 shadow-sm flex flex-col items-start justify-center min-h-[120px]">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl">📚</span>
                <h3 className="text-lg font-bold text-[#0b2e7b]">מאגר ידע בעברית</h3>
              </div>
              <p className="text-slate-700 text-sm">
                מה עובד לעסקים קטנים, מה הצרכים בפועל, ואילו פתרונות באמת מתאימים.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 border-r-4 border-blue-600 shadow-sm flex flex-col items-start justify-center min-h-[120px]">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl">🛠️</span>
                <h3 className="text-lg font-bold text-[#0b2e7b]">פתרונות וכלים </h3>
              </div>
              <p className="text-slate-700 text-sm">
                שמאפשרים להעביר את הידע הזה מהר ובקלות — להרבה אנשים.
              </p>
            </div>
          </div>
        </section>

{/* Final CTA */}
        <section className="text-center bg-blue-600 rounded-3xl p-10 border-2 shadow-lg">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">בואו נצא למסע הזה ביחד</h2>
          <p className="text-lg text-white mb-6 max-w-2xl mx-auto leading-relaxed">
            אם אתם עסק קטן בישראל שרוצה להתקדם ל-AI בבטחון — אתם במקום הנכון.
          </p>

          {/* Inline registration form (name, phone, email) */}
          <div className="mb-4">
            {/* Client-side form component */}
            {/* eslint-disable-next-line @next/next/no-before-interactive-script-outside-document */}
            {/* Import locally to keep this page mostly server-rendered */}
            <script type="module" />
            {/* Lazy-loaded client component */}
            {
              /* The CTARegistrationForm is a client component — import dynamically above */
            }
            <div>
              {/* We'll import the component normally — Next will handle bundling */}
              {/* @ts-ignore */}
              <CTARegistrationForm />
            </div>

          </div>

          {/* Simulator button removed as requested */}
        </section>

      </main>
      <Footer />
    </div>
  )
}
