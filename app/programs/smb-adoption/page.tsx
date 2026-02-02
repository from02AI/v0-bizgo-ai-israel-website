import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Header } from '@/components/header'
import { MessageCircle, TrendingUp, AlertTriangle } from 'lucide-react'

// SMB Adoption Program page — Refined design with #0b2e7b, blue-600, amber-600
export default function Page() {
  const weeks = [
    {
      number: 1,
      label: 'שבוע 1',
      time: '30–45 דק׳',
      title: 'משימה חודשית ליישום AI ואוטומציה בעסק',
      description: 'כל חודש מתמקדים בתהליך עסקי אחד מרכזי להטמעה בעסק',
      format: 'פורמט: משתתפי/ות התכנית מקבלים מייל עם הדרכה מפורטת וחומרים נלווים'
    },
    {
      number: 2,
      label: 'שבוע 2',
      time: '60 דק׳ (לא חובה)',
      title: 'Open Office (זום פתוח)',
      description: 'הזדמנות לשאול שאלות, לשתף, ולפתור חסמים.',
      format: 'פורמט: שעה קבועה בזום, ללא חובת השתתפות'
    },
    {
      number: 3,
      label: 'שבוע 3',
      time: '10–15 דק׳',
      title: 'עדכוני AI',
      description: 'מה חדש בשוק ואיך זה רלוונטי לעסקים קטנים בישראל.',
      format: 'פורמט: משתתפי/ות התכנית מקבלים מייל עם מידע שיעזור בחיבור לעולם ה-AI ולחיזוק התכנית וביצוע המשימה החודשית'
    },
    {
      number: 4,
      label: 'שבוע 4',
      time: '60 דק׳ (לא חובה)',
      title: 'Open Office (זום פתוח)',
      description: 'הזדמנות למי שרוצה לשאול שאלות, לשתף בתהליך',
      format: 'פורמט: שעה קבועה בזום, ללא חובת השתתפות'
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <style>{`
        /* Override sticky header to static on this page only */
        header[dir="ltr"] { position: static !important; }
      `}</style>
      <Header />
      
      <main dir="rtl" className="text-right flex-1">
      {/* HERO SECTION — Navy background, strong brand presence */}
      <section className="bg-[#0b2e7b] text-white py-20 md:py-32 lg:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="font-black text-4xl md:text-5xl lg:text-6xl leading-tight mb-6">
            תוכנית יישום AI ואוטומציות <br />לעסקים קטנים
            </h1>
        

    

            <p className="font-bold text-lg md:text-xl text-blue-100 mb-10 max-w-4xl mx-auto leading-relaxed">
מסגרת מובנית של 12 שבועות ללקוחות העסקיים שלך <br />
מוצעת כרגע רק במסגרת פיילוט שיתוף פעולה עם נותני שירותים מקצועיים          </p>



            {/* Timeline indicator with amber accents */}
            <div className="inline-flex flex-wrap justify-center gap-6 md:gap-12 bg-white/5 backdrop-blur-sm rounded-2xl px-8 md:px-12 py-1">
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-amber-400 mb-1">3 חודשים</div>
                <div className="text-sm text-blue-100 font-medium">תכנית מובנית</div>
              </div>
              <div className="hidden md:block w-px bg-white/20"></div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-amber-400 mb-1"> ללא עלות</div>
                <div className="text-sm text-blue-100 font-medium">לשותפים נבחרים</div>
              </div>
              <div className="hidden md:block w-px bg-white/20"></div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-amber-400 mb-1">ליווי ותמיכה</div>
                <div className="text-sm text-blue-100 font-medium">קבוצת ווטסאפ ומפגשי זום</div>
              </div>
            </div>
            <div className="flex items-center justify-center mt-8 md:mt-12 mb-6 md:mb-4">
              <Button asChild size="lg" className="bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-lg px-8 py-8 text-lg md:text-xl shadow-lg">
                <Link href="/contact" className="text-lg md:text-xl">לקביעת שיחת הכרות</Link>
              </Button>
            </div>

            <p className="text-sm text-blue-100 text-center max-w-lg mx-auto mb-2"> פגישת זום קצרה לבדיקת התאמה הדדית, ללא התחייבות.</p>
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
              <p className="text-sm text-gray-600">מהעסקים הקטנים מדווחים שאין להם זמן/משאבים לבדוק כלים כמו שצריך.</p>
              <div className="text-xs text-gray-500 mt-4">PayPal / Reimagine Main Street, 2025</div>
            </div>

            {/* Stat card 2 - Knowledge Gap */}
            <div className="bg-white rounded-xl shadow-sm p-8 text-center border-t-4 border-blue-600">
              <div className="text-5xl md:text-6xl font-black text-amber-600 mb-3">72%</div>
              <h3 className="text-2xl font-bold text-[#0b2e7b] mb-2">פערי ידע</h3>
              <p className="text-sm text-gray-600"> בעלי עסקים קטנים מציינים "אני לא יודע מספיק" כסיבה העיקרית לכך שלא הטמיעו AI.</p>
              <div className="text-xs text-gray-500 mt-4">Intuit & ICIC, מרץ 2025</div>
            </div>

            {/* Stat card 3 - No Clear ROI */}
            <div className="bg-white rounded-xl shadow-sm p-8 text-center border-t-4 border-blue-600">
              <div className="text-5xl md:text-6xl font-black text-amber-600 mb-3">34%</div>
              <h3 className="text-2xl font-bold text-[#0b2e7b] mb-2">אין חיסכון ברור</h3>
              <p className="text-sm text-gray-600">עסקים קטנים לא רואים עדיין שימוש ברור או ROI — ולכן נתקעים ולא מתקדמים.</p>
              <div className="text-xs text-gray-500 mt-4">PayPal / Reimagine Main Street, 2025</div>
            </div>
          </div>
        </div>
      </section>

     

      <section className="bg-blue-600 text-white py-6 md:py-20">
           <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-4xl md:text-5xl font-black mb-8 text-white">שיתוף פעולה משתלם</h2>
          <div className="text-center">
            <p className="text-3xl text-gray-300 font-semibold mb-10">BizGoAI מספקת ללקוחותיכם תוכנית ליישום AI ואוטומציות בעסק<br />
אתם מספקים חיבור לעסקים קטנים<br /></p>
          </div>
        </div>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-6 md:gap-10 items-stretch">
            {/* For partners (left card) */}
            <div className="flex-1 bg-[#0b2e7b] backdrop-blur-sm rounded-xl p-8 border border-blue-400/20">
              <h3 className="text-3xl font-bold text-white mb-6"> אתם: שותפים מקצועיים</h3>

              <ul className="space-y-4 mt-6">
                <li className="flex gap-3">
                  <span className="text-amber-400 font-bold">✓</span>
                  <span className="font-semibold">מתן ערך מיידי ומשמעותי ללקוחות שלכם</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-amber-400 font-bold">✓</span>
                  <span className="font-semibold">הגדלת הסיכוי של לקוחותיכם לצלוח את מהפכת ה-AI</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-amber-400 font-bold">✓</span>
                  <span className="font-semibold">תהליך מובנה ומנוהל ע"י BizGoAI כך שההשקעה מצידכם מינימאלית </span>
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
              <h3 className="text-3xl font-bold text-white mb-6"> לקוחות: עסקים קטנים</h3>

              <ul className="space-y-4 mt-6">
                <li className="flex gap-3">
                  <span className="text-amber-400 font-bold">✓</span>
                  <span className="font-semibold">מסלול ברור לכניסה קלה לעולם ה-AI ואוטומציות לעסק</span>
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
                  <span className="font-semibold">חומרים ברמה גבוהה מוכנים ליישום, תכנים, מאמרים, מצגות</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-amber-400 font-bold">✓</span>
                  <span className="font-semibold">ליווי ותמיכה בקבוצת ווטסאפ ייעודית לשאלות ומפגשי זום</span>
                </li>

              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* PROGRAM STRUCTURE SECTION — RTL Vertical Timeline (NEW DESIGN) */}
      <section className="bg-white py-20 md:py-28">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8" dir="rtl">
          <h2 className="text-center text-4xl md:text-5xl font-black mb-8 text-[#0b2e7b]">מה בתכנית?</h2>
          <p className="text-center text-gray-600 text-[18px] mb-12">מחזור של 4 שבועות שחוזר על עצמו למשך 3 חודשים</p>

          <div className="relative">
            {/* Timeline line - visible on md+ only */}
            <div className="hidden md:block absolute top-2 bottom-8 w-[2px] bg-[#0b2e7b]" style={{ right: 'calc(17.5% - 16px)' }} />

            {/* Desktop timeline - cards left of the line */}
            <div className="hidden md:block">
              <div className="space-y-8">
                {weeks.map((week) => (
                  <div key={week.number} className="relative mb-8">
                    {/* Node */}
                    <div className="hidden md:flex absolute top-0 -translate-y-1 w-11 h-11 z-10 bg-amber-600 rounded-full items-center justify-center text-white font-bold text-[13px] leading-none" style={{ right: 'calc(17.5% - 22px)' }}>
                      {`שבוע ${week.number}`}
                    </div>

                    {/* Card */}
                    <div className="md:mx-auto md:w-[65%] w-full bg-white border border-gray-200 rounded-xl p-6 shadow-sm text-right">
                      <div className="flex justify-between items-start mb-3">
                      </div>
                      <h3 className="text-[20px] font-bold text-[#0b2e7b] mb-2">{week.title}</h3>
                      <p className="text-[15px] font-semibold text-gray-700 mb-2">{week.description}</p>
                      <p className="text-[15px] text-gray-600 mt-1">
                        <span className="font-semibold">פורמט:</span> {week.format.replace(/^\s*פורמט:\s*/,'')}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Mobile: stacked full-width cards (no timeline line) */}
            <div className="md:hidden space-y-6">
              {weeks.map((week) => (
                <div key={week.number} className="w-full bg-white border border-gray-200 rounded-xl p-6 shadow-sm text-right">
                  <div className="flex justify-between items-start mb-3">
                    <span className="inline-block px-3 py-1 bg-[#eff6ff] text-[#1d4ed8] rounded-full text-sm font-medium">{week.label}</span>
                    <span className="inline-block px-3 py-1 bg-[#dbeafe] text-[#1e40af] rounded-full text-sm font-medium">{week.time}</span>
                  </div>
                  <h3 className="text-[20px] font-bold text-[#0b2e7b] mb-2">{week.title}</h3>
                  <p className="text-[15px] font-semibold text-gray-700 mb-2">{week.description}</p>
                  <p className="text-[15px] text-gray-600 mt-1">
                    <span className="font-semibold">פורמט:</span> {week.format.replace(/^\s*פורמט:\s*/,'')}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom clarifier */}
          <div className="pt-2">
            <p className=" text-center text-[#6b7280] text-[16px] font-bold max-w-[600px] mx-auto">לאורך כל התכנית ייאספו נתונים מהמשתתפים/ות ובסוף כל חודש משובים <br />לטובת התאמות שוטפות לצרכים העולים בזמן אמת</p>
          </div>
        </div>
      </section>

      {/* QUALIFICATION & PROCESS SECTION */}
      <section className="bg-[#0b2e7b] py-20 md:py-28" dir="rtl">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Part 1: Who Is This For */}
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">
            למי זה מתאים?
          </h2>
          
          <div className="max-w-2xl mx-auto mb-20">
            <ul className="space-y-4">
              <li className="grid grid-cols-[40px_1fr] items-start gap-4">
                <div className="w-10 flex items-start justify-center">
                  <span className="text-gray-300 font-bold text-2xl">•</span>
                </div>
                <div className="text-right">
                  <span className="font-bold text-gray-300 text-2xl"> עסק שנותן שירותים לעסקים קטנים</span>
                </div>
              </li>

              <li className="grid grid-cols-[40px_1fr] items-start gap-4">
                <div className="w-10 flex items-start justify-center">
                  <span className="text-gray-300 font-bold text-2xl">•</span>
                </div>
                <div className="text-right">
                  <span className="font-bold text-gray-300 text-2xl"> בעל לפחות 100 לקוחות פוטנציאליים לתכנית (כדי להגיע למספר משתתפים מינימאלי מתאים).</span>
                </div>
              </li>

              <li className="grid grid-cols-[40px_1fr] items-start gap-4">
                <div className="w-10 flex items-start justify-center">
                  <span className="text-gray-300 font-bold text-2xl">•</span>
                </div>
                <div className="text-right">
                  <span className="font-bold text-gray-300 text-2xl"> חיבור לקדמה טכנולוגית ורצון להוביל</span>
                </div>
              </li>

              <li className="grid grid-cols-[40px_1fr] items-start gap-4">
                <div className="w-10 flex items-start justify-center">
                  <span className="text-gray-300 font-bold text-2xl">•</span>
                </div>
                <div className="text-right">
                  <span className="font-bold text-gray-300 text-2xl"> הבנת צורך השעה ורצון לעזור ללקוחות שלכם (ולעצמכם) לצלוח את מהפכת ה-AI</span>
                </div>
              </li>
            </ul>
          </div>

          {/* Part 2: How It Works */}
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-8">
          איך מתקדמים?
          </h2>
        

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="bg-white border border-gray-200 rounded-xl p-8 shadow-sm">
              <div className="flex flex-col items-center gap-4">
                <div className="w-16 h-16 bg-amber-600 rounded-full flex items-center justify-center text-white font-bold text-2xl">
                  1
                </div>
                <div className="text-right w-full">
                  <h3 className="text-2xl font-bold text-[#0b2e7b]  mb-3">שיחת הכרות קצרה</h3>
                  <p className="text-gray-600 text-base leading-relaxed">
                    הסברים על התכנית והצרכים, מענה על שאלות ותיאום ציפיות
                  </p>
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="bg-white border border-gray-200 rounded-xl p-8 shadow-sm">
              <div className="flex flex-col items-center gap-4">
                <div className="w-16 h-16 bg-amber-600 rounded-full flex items-center justify-center text-white font-bold text-2xl">
                  2
                </div>
                <div className="text-right w-full">
                  <h3 className="text-2xl font-bold text-[#0b2e7b] mb-3">החלטה משותפת</h3>
                  <p className="text-gray-600 text-base leading-relaxed">
                    הבנה שיש רצון הדדי לעבוד יחד וסיכום כל התנאים
                  </p>
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="bg-white border border-gray-200 rounded-xl p-8 shadow-sm">
              <div className="flex flex-col items-center gap-4">
                <div className="w-16 h-16 bg-amber-600 rounded-full flex items-center justify-center text-white font-bold text-2xl">
                  3
                </div>
                <div className="text-right w-full">
                  <h3 className="text-2xl font-bold text-[#0b2e7b] mb-3">הזמנה ללקוחות</h3>
                  <p className="text-gray-600 text-base leading-relaxed">
                    הודעה על פתיחת התכנית בהתאם לתנאים שסוכמו
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* FINAL CTA SECTION — Amber button, professional call-to-action */}
      <section className="bg-slate-50 py-20 md:py-28">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-black text-[#0b2e7b] mb-4">הצעד הבא</h2>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            <Button asChild size="lg" className="bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-lg px-8 py-6 text-lg min-h-[48px]">
              <Link href="/contact">לקבוע שיחת הכרות ←</Link>
            </Button>

           
          </div>

          <p className="text-sm text-gray-500">
            שאלות? אפשר לכתוב ישירות ב-WhatsApp או ללחוץ על הקישור
          </p>
        </div>
      </section>

      {/* Custom CTA Button - This Page Only */}
      <a
        href="https://wa.me/972544403660?text=%D7%A9%D7%9C%D7%95%D7%9D%21%20%D7%90%D7%A0%D7%99%20%D7%9E%D7%A2%D7%95%D7%99%D7%99%D7%9F%2F%D7%AA%20%D7%9C%D7%A7%D7%91%D7%9C%20%D7%9E%D7%99%D7%93%D7%A2%20%D7%A0%D7%95%D7%A1%D7%A3%20%D7%A2%D7%9C%20BizGoAI"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 left-6 z-50 flex items-center gap-2 bg-[#0b2e7b] text-white px-5 py-3 rounded-full shadow-lg hover:bg-[#0a2460] transition-all hover:scale-105"
        aria-label="לתיאום שיחה"
      >
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z" />
        </svg>
        <span className="hidden sm:inline font-semibold text-sm">לתיאום שיחה</span>
      </a>
    </main>

    </div>
  )
}
