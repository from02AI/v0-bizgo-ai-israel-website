import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { MessageCircle, TrendingUp, AlertTriangle } from 'lucide-react'

// SMB Adoption Program page — Refined design with #0b2e7b, blue-600, amber-600
export default function Page() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main dir="rtl" className="text-right flex-1">
      {/* HERO SECTION — Navy background, strong brand presence */}
      <section className="bg-[#0b2e7b] text-white py-24 md:py-32 lg:py-25">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="font-black text-4xl md:text-5xl lg:text-6xl leading-tight mb-6">
             תכנית AI ואוטומציות <br />לעסקים קטנים
            </h1>
            <p className="text-lg md:text-xl text-blue-100 mb-10 max-w-4xl mx-auto leading-relaxed">
-- מוצעת כרגע כפיילוט במסגרת שיתוף פעולה עם ארגונים מקצועיים --           </p>

            {/* Timeline indicator with amber accents */}
            <div className="inline-flex flex-wrap justify-center gap-6 md:gap-12 bg-white/5 backdrop-blur-sm rounded-2xl px-8 md:px-12 py-6">
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-amber-400 mb-1">3 חודשים</div>
                <div className="text-sm text-blue-100 font-medium">תכנית מובנית</div>
              </div>
              <div className="hidden md:block w-px bg-white/20"></div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-amber-400 mb-1">יישום מעשי</div>
                <div className="text-sm text-blue-100 font-medium">לא רק חומר תיאורטי</div>
              </div>
              <div className="hidden md:block w-px bg-white/20"></div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-amber-400 mb-1">ליווי ותמיכה</div>
                <div className="text-sm text-blue-100 font-medium">קבוצת ווטסאפ ומפגשי זום</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* RESEARCH CREDIBILITY SECTION — Light background, navy text, amber numbers */}
      <section className="bg-slate-50 py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-black text-[#0b2e7b] mb-4 text-center">AI ואוטומציה אינם מותרות<br />זהו הכרח עסקי בעידן המשתנה במהירות </h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
עסקים קטנים לחוצים לאמץ את הבינה מלאכותית כדי להישאר במשחק.<br />
מחקרים מראים על אתגרים משמעותיים בשל משאבים מוגבלים של זמן, תקציב וידע טכנולוגי. </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Stat card 1 - Time Pressure */}
            <div className="bg-white rounded-xl shadow-sm p-8 text-center border-t-4 border-blue-600">
              <div className="text-5xl md:text-6xl font-black text-amber-600 mb-3">37%</div>
              <h3 className="text-2xl font-bold text-[#0b2e7b] mb-2">לחץ זמן</h3>
              <p className="text-sm text-gray-600">בעלי עסקים קטנים חסרי זמן/משאבים לבחון כלים לעומק — גם כשמי יודע שזה יכול לעזור.</p>
              <div className="text-xs text-gray-500 mt-4">PayPal / Reimagine Main Street, 2025</div>
            </div>

            {/* Stat card 2 - Knowledge Gap */}
            <div className="bg-white rounded-xl shadow-sm p-8 text-center border-t-4 border-blue-600">
              <div className="text-5xl md:text-6xl font-black text-amber-600 mb-3">72%</div>
              <h3 className="text-2xl font-bold text-[#0b2e7b] mb-2">פערי ידע</h3>
              <p className="text-sm text-gray-600">בעלי עסקים מציינים "אני לא יודע מספיק על כלים דיגיטליים חדשים" כסיבה העיקרית לכך שלא הטמיעו AI.</p>
              <div className="text-xs text-gray-500 mt-4">Intuit & ICIC, מרץ 2025</div>
            </div>

            {/* Stat card 3 - No Clear ROI */}
            <div className="bg-white rounded-xl shadow-sm p-8 text-center border-t-4 border-blue-600">
              <div className="text-5xl md:text-6xl font-black text-amber-600 mb-3">34%</div>
              <h3 className="text-2xl font-bold text-[#0b2e7b] mb-2">אין חיסכון ברור</h3>
              <p className="text-sm text-gray-600">ללא שימושיות ברורה או החזר השקעה מורגש — עסקים מהססים להשקיע תקציב מוגבל.</p>
              <div className="text-xs text-gray-500 mt-4">PayPal / Reimagine Main Street, 2025</div>
            </div>
          </div>
        </div>
      </section>

      {/* DUAL VALUE PROPOSITION — Navy background (placed after Research) */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl md:text-5xl font-black mb-8 text-blue-600">שת"פ בו כולם מרוויחים</h2>
      </div>

      <section className="bg-blue-600 text-white py-6 md:py-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 md:p-10 border border-white/10">
            <div className="flex flex-col md:flex-row gap-6 md:gap-10 items-stretch">
              {/* For partners (left card) */}
              <div className="flex-1 bg-[#0b2e7b] backdrop-blur-sm rounded-xl p-8 border border-blue-400/20">
                <h3 className="text-3xl font-bold text-white mb-6"> ארגונים מקצועיים</h3>

                <ul className="space-y-4 mt-6">
                  <li className="flex gap-3">
                    <span className="text-amber-400 font-bold">✓</span>
                    <span className="font-semibold">מתן ערך מיידי ומשמעותי ללקוחות שלכם</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-amber-400 font-bold">✓</span>
                    <span className="font-semibold">% גבוה יותר מלקוחותיכם ייצלחו את מהפכת ה-AI</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-amber-400 font-bold">✓</span>
                    <span className="font-semibold">תהליך מובנה ומנוהל כך שההשקעה מצידכם מינימאלית</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-amber-400 font-bold">✓</span>
                    <span className="font-semibold">מיתוג התכנית כשיתוף פעולה בינינו לטובת לקוחותיכם</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-amber-400 font-bold">✓</span>
                    <span className="font-semibold">במסגרת הפיילוט התכנית על כל מרכיביה מוצעת ללא עלות </span>
                  </li>

                </ul>
              </div>

              <div className="hidden md:block w-px bg-white/10"></div>

              {/* For SMBs (right card) */}
              <div className="flex-1 bg-[#0b2e7b] backdrop-blur-sm rounded-xl p-8 border border-amber-400/20">
                <h3 className="text-3xl font-bold text-white mb-6"> בעלי עסקים קטנים</h3>

                <ul className="space-y-4 mt-6">
                  <li className="flex gap-3">
                    <span className="text-amber-400 font-bold">✓</span>
                    <span className="font-semibold">כניסה קלה לעולם ה-AI ואוטומציות</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-amber-400 font-bold">✓</span>
                    <span className="font-semibold">הזדמנות לשידרוג משמעותי של הפעילות העסקית</span>
                  </li>

                  <li className="flex gap-3">
                    <span className="text-amber-400 font-bold">✓</span>
                    <span className="font-semibold">תכנית מובנית ומותאמת לעסקים קטנים בישראל</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-amber-400 font-bold">✓</span>
                    <span className="font-semibold">חומרים ברמה גבוההת מוכנים ליישום, תכנים, מאמרים, מצגות</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-amber-400 font-bold">✓</span>
                    <span className="font-semibold">ליווי ותמיכה בקבוצת ווטסאפ ייעודית לשאלות ומפגשי זום</span>
                  </li>

                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PROGRAM STRUCTURE SECTION — Light background, navy headings */}
      <section className="bg-white py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-black text-[#0b2e7b] mb-4 text-center">איך התוכנית עובדת? </h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">המחזור חוזר על עצמו 3 פעמים — כל 4 שבועות מבנה זהה שמתאימה למידה הדרגתית</p>

          <div className="space-y-8">
            {[1, 2, 3].map((cycle) => (
              <div key={cycle} className="border-r-4 border-amber-600 pr-6">
                <div className="mb-4">
                  <h3 className="text-2xl font-bold text-[#0b2e7b]">מחזור {cycle}</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  {/* Week 1 */}
                  <div className="bg-slate-50 rounded-xl p-6 border-l-4 border-blue-600">
                    <div className="text-lg font-bold text-[#0b2e7b] mb-2">🌐 שבוע 1</div>
                    <div className="text-sm font-semibold text-blue-600 mb-2">יישום תהליך AI מעשי</div>
                    <p className="text-sm text-gray-600">הסבר ממוקד של תהליך עסקי + תבנית מוכנה לשימוש מיידי</p>
                  </div>

                  {/* Week 2 */}
                  <div className="bg-slate-50 rounded-xl p-6 border-l-4 border-amber-600">
                    <div className="text-lg font-bold text-[#0b2e7b] mb-2">🤝 שבוע 2</div>
                    <div className="text-sm font-semibold text-amber-600 mb-2">מפגש Q&A חי (שעה)</div>
                    <p className="text-sm text-gray-600">זום ישיר לקבלת תשובות, התאמות ללקוחותיכם, פתרון בעיות</p>
                  </div>

                  {/* Week 3 */}
                  <div className="bg-slate-50 rounded-xl p-6 border-l-4 border-blue-600">
                    <div className="text-lg font-bold text-[#0b2e7b] mb-2">🔍 שבוע 3</div>
                    <div className="text-sm font-semibold text-blue-600 mb-2">עדכוני AI בזמן אמת</div>
                    <p className="text-sm text-gray-600">תובנות מהשוק הגלובלי ודוגמאות רלוונטיות לעסקים קטנים בישראל</p>
                  </div>

                  {/* Week 4 */}
                  <div className="bg-slate-50 rounded-xl p-6 border-l-4 border-amber-600">
                    <div className="text-lg font-bold text-[#0b2e7b] mb-2">🛠️ שבוע 4</div>
                    <div className="text-sm font-semibold text-amber-600 mb-2">בדיקה ותיקון</div>
                    <p className="text-sm text-gray-600">בדיקה של שימוש בתבניות, תיקונים, טיפול בחריגים</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EXPECTATIONS SETTING — White background, transparent messaging */}
      <section className="bg-white py-20 md:py-28">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-black text-[#0b2e7b] mb-8">מה התוכנית לא מבטיחה</h2>
          
          <div className="bg-slate-50 rounded-xl p-10 border border-gray-200 mb-8">
            <div className="space-y-4 text-lg">
              <div className="flex items-start gap-3 text-left md:text-right">
                <span className="text-red-500 font-bold text-2xl">✕</span>
                <p className="text-gray-700"><strong>לא מבטיחה חיסכון כספי מובטח</strong> — התוצאות תלויות ביישום ובתהליכים של החברה שלכם</p>
              </div>
              <div className="flex items-start gap-3 text-left md:text-right">
                <span className="text-red-500 font-bold text-2xl">✕</span>
                <p className="text-gray-700"><strong>לא מבטיחה צמיחה עסקית אוטומטית</strong> — AI הוא כלי, לא וקסם</p>
              </div>
              <div className="flex items-start gap-3 text-left md:text-right">
                <span className="text-red-500 font-bold text-2xl">✕</span>
                <p className="text-gray-700"><strong>לא מחליפה ייעוץ עסקי או תכנון אסטרטגי</strong> — אנחנו מלמדים כלים, לא אסטרטגיה</p>
              </div>
            </div>
          </div>

          <p className="text-lg text-gray-600 font-semibold">
            זו תוכנית למידה מובנית ויישום מעשי, לא פתרון קסם. אנחנו מאמינים בשקיפות.
          </p>
        </div>
      </section>

      {/* PARTNER CHALLENGE SECTION — Navy background, blue-600 icons (moved after expectations) */}
      <section className="bg-[#0b2e7b] text-white py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-black mb-4 text-center">האתגר של שותפים מקצועיים</h2>
          <p className="text-center text-blue-100 mb-12 max-w-2xl mx-auto">יועצים, רואי חשבון ויועצים עסקיים עומדים בחזית השינוי — הנה הלחצים שהם מרגישים</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Challenge 1 */}
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10 hover:bg-white/10 transition-colors">
              <MessageCircle className="w-12 h-12 text-blue-400 mb-4" />
              <h3 className="text-2xl font-bold mb-3">לקוחות שואלים</h3>
              <p className="text-blue-100">
                "איך מתחילים עם AI? אילו כלים מתאימים לעסק שלנו? איך זה עובד בעברית?"
              </p>
            </div>

            {/* Challenge 2 */}
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10 hover:bg-white/10 transition-colors">
              <TrendingUp className="w-12 h-12 text-blue-400 mb-4" />
              <h3 className="text-2xl font-bold mb-3">לחץ להציע ערך</h3>
              <p className="text-blue-100">
                צריך להישאר רלוונטי בעידן AI — להציע ללקוחות יותר מייעוץ קלסי
              </p>
            </div>

            {/* Challenge 3 */}
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10 hover:bg-white/10 transition-colors">
              <AlertTriangle className="w-12 h-12 text-blue-400 mb-4" />
              <h3 className="text-2xl font-bold mb-3">חשש מסיכון</h3>
              <p className="text-blue-100">
                לא מומחה בטכנולוגיה? אפשר לתת ללקוחות סיוע שלא ייגמר בבעיה?
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* EXPECTATIONS SETTING — White background, transparent messaging */}
      <section className="bg-white py-20 md:py-28">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-black text-[#0b2e7b] mb-8">מה התוכנית לא מבטיחה</h2>
          
          <div className="bg-slate-50 rounded-xl p-10 border border-gray-200 mb-8">
            <div className="space-y-4 text-lg">
              <div className="flex items-start gap-3 text-left md:text-right">
                <span className="text-red-500 font-bold text-2xl">✕</span>
                <p className="text-gray-700"><strong>לא מבטיחה חיסכון כספי מובטח</strong> — התוצאות תלויות ביישום ובתהליכים של החברה שלכם</p>
              </div>
              <div className="flex items-start gap-3 text-left md:text-right">
                <span className="text-red-500 font-bold text-2xl">✕</span>
                <p className="text-gray-700"><strong>לא מבטיחה צמיחה עסקית אוטומטית</strong> — AI הוא כלי, לא וקסם</p>
              </div>
              <div className="flex items-start gap-3 text-left md:text-right">
                <span className="text-red-500 font-bold text-2xl">✕</span>
                <p className="text-gray-700"><strong>לא מחליפה ייעוץ עסקי או תכנון אסטרטגי</strong> — אנחנו מלמדים כלים, לא אסטרטגיה</p>
              </div>
            </div>
          </div>

          <p className="text-lg text-gray-600 font-semibold">
            זו תוכנית למידה מובנית ויישום מעשי, לא פתרון קסם. אנחנו מאמינים בשקיפות.
          </p>
        </div>
      </section>

      {/* PARTNER CHALLENGE SECTION — Navy background, blue-600 icons (moved after expectations) */}
      <section className="bg-[#0b2e7b] text-white py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-black mb-4 text-center">האתגר של שותפים מקצועיים</h2>
          <p className="text-center text-blue-100 mb-12 max-w-2xl mx-auto">יועצים, רואי חשבון ויועצים עסקיים עומדים בחזית השינוי — הנה הלחצים שהם מרגישים</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Challenge 1 */}
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10 hover:bg-white/10 transition-colors">
              <MessageCircle className="w-12 h-12 text-blue-400 mb-4" />
              <h3 className="text-2xl font-bold mb-3">לקוחות שואלים</h3>
              <p className="text-blue-100">
                "איך מתחילים עם AI? אילו כלים מתאימים לעסק שלנו? איך זה עובד בעברית?"
              </p>
            </div>

            {/* Challenge 2 */}
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10 hover:bg-white/10 transition-colors">
              <TrendingUp className="w-12 h-12 text-blue-400 mb-4" />
              <h3 className="text-2xl font-bold mb-3">לחץ להציע ערך</h3>
              <p className="text-blue-100">
                צריך להישאר רלוונטי בעידן AI — להציע ללקוחות יותר מייעוץ קלסי
              </p>
            </div>

            {/* Challenge 3 */}
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10 hover:bg-white/10 transition-colors">
              <AlertTriangle className="w-12 h-12 text-blue-400 mb-4" />
              <h3 className="text-2xl font-bold mb-3">חשש מסיכון</h3>
              <p className="text-blue-100">
                לא מומחה בטכנולוגיה? אפשר לתת ללקוחות סיוע שלא ייגמר בבעיה?
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA SECTION — Amber button, professional call-to-action */}
      <section className="bg-slate-50 py-20 md:py-28">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-black text-[#0b2e7b] mb-4">הצעד הבא</h2>
          <p className="text-lg text-gray-700 mb-2">שיחת התאמה קצרה (15-20 דקות) לבחון אם התוכנית מתאימה לעסק או ללקוחותיכם</p>
          <p className="text-base text-gray-600 mb-8">ללא התחייבות, ללא עלות</p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            <Button asChild size="lg" className="bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-lg px-8 py-6 text-lg min-h-[48px]">
              <Link href="/contact">קבעו שיחת התאמה ←</Link>
            </Button>

            <a href="/assets/bizgoai-presentation.pdf" className="text-[#0b2e7b] font-semibold hover:underline">
              הורידו מצגת מלאה ←
            </a>
          </div>

          <p className="text-sm text-gray-500">
            שאלות? אפשר לכתוב ישירות ב-WhatsApp או ללחוץ על הקישור
          </p>
        </div>
      </section>
    </main>

      <Footer />
    </div>
  )
}
