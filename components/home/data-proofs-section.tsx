import { ChevronLeft, ChevronRight, GraduationCap, DollarSign, Clock } from "lucide-react"

const statCards = [
  {
    stat: "71.9%",
    title: "פער ידע",
    description:
      "בעלי עסקים קטנים מציינים 'אני לא יודע מספיק על כלים דיגיטליים חדשים' כסיבה העיקרית לכך שלא הטמיעו AI.",
    source: "Intuit & ICIC, מרץ 2025",
  },
  {
    stat: "36%",
    title: "תקציבים עולים",
    description:
      "תקציבי ה־AI החודשיים צפויים לעלות ב־36% ב־2025, אבל רק 39% מהארגונים יודעים להעריך ROI בביטחון — פער נראות הולך וגדל.",
    source: "CloudZero State of AI Costs, 2025",
  },
  {
    stat: "37%",
    title: "לחץ זמן",
    description: "בעלי עסקים קטנים חסרי זמן/משאבים לבחון כלים לעומק — גם כשהם יודעים שזה יכול לעזור.",
    source: "PayPal/Reimagine Main Street, 2025",
  },
  {
    stat: "62%",
    title: "חסם הבנה",
    description: "חוסר הבנה של היתרונות וחוסר משאבים פנימיים (60%) הם החסמים המרכזיים בפני אימוץ AI.",
    source: "Service Direct AI Report, 2025",
  },
  {
    stat: "34%",
    title: "אין ROI ברור",
    description: "ללא שימושיות ברורה או החזר השקעה מורגש — עסקים מהססים להשקיע תקציב מוגבל.",
    source: "PayPal/Reimagine Main Street, 2025",
  },
  {
    stat: "28%",
    title: "ירידת אימוץ",
    description: "אימוץ AI בעסקים קטנים ירד מ־42% ב־2024 ל־28% בלבד ב־2025 — תסכול מהולך וגדל מהטמעה מורכבת.",
    source: "Yahoo Finance/NEXT Survey, 2025",
  },
]

const quoteCards = [
  {
    icon: GraduationCap,
    title: "פער ידע",
    quote: "רק שליש מהמשיבים מדווחים שהם מדרגים תוכניות AI בכל הארגון, וחברות גדולות נוטות יותר להגיע לשלב הזה.",
    source: "McKinsey State of AI, 2025",
  },
  {
    icon: DollarSign,
    title: "מגבלות תקציב",
    quote:
      "הפער בין מי שיכולים להרשות השקעה בטכנולוגיות לבין מי שלא — רק יגדל. כדי ש־AI יועיל לכלכלה, חייבים לוודא שעסקים קטנים לא נשארים מאחור.",
    source: "Todd McCracken, President, NSBA",
  },
  {
    icon: Clock,
    title: "לחץ זמן",
    quote:
      "רוב בעלי העסקים הקטנים שאני מדבר איתם מרגישים מוצפים לגמרי כשזה מגיע ל־AI — יודעים שזה יכול לעזור, אבל לא יודעים מאיפה להתחיל או אילו כלים באמת פותרים את הבעיה שלהם.",
    source: "BizTech Magazine, יוני 2025",
  },
]

export function DataProofsSection() {
  return (
    <section className="bg-white py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-blue-600 drop-shadow-sm mb-4">
            אתם לא לבד בזה
          </h2>
          <p className="text-lg sm:text-xl text-slate-600">
            מחקרי תעשייה מאשרים: פער האימוץ של AI בעסקים קטנים — אמיתי
          </p>
        </div>

        {/* Horizontal scrollable container */}
        <div className="overflow-x-auto pb-4 -mx-4 px-4 scroll-snap-x">
          <div className="flex gap-4" style={{ width: "max-content" }}>
            {/* Stat cards */}
            {statCards.map((card, index) => (
              <div
                key={index}
                className="w-80 flex-shrink-0 bg-white rounded-2xl border border-slate-200 p-6 shadow-lg scroll-snap-item"
              >
                <div className="text-4xl font-black text-[#0b2e7b] mb-2">{card.stat}</div>
                <div className="text-lg font-bold text-blue-600 mb-3">{card.title}</div>
                <p className="text-slate-600 text-sm leading-relaxed mb-4">{card.description}</p>
                <p className="text-xs text-slate-400">{card.source}</p>
              </div>
            ))}

            {/* Quote cards */}
            {quoteCards.map((card, index) => (
              <div
                key={`quote-${index}`}
                className="w-80 flex-shrink-0 bg-gradient-to-br from-blue-50 to-white rounded-2xl border border-blue-100 p-6 shadow-lg scroll-snap-item"
              >
                <div className="w-10 h-10 bg-[#0b2e7b] rounded-lg flex items-center justify-center mb-4">
                  <card.icon className="w-5 h-5 text-white" />
                </div>
                <div className="text-lg font-bold text-[#0b2e7b] mb-3">{card.title}</div>
                <p className="text-slate-600 text-sm leading-relaxed mb-4 italic">"{card.quote}"</p>
                <p className="text-xs text-slate-400">{card.source}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll hint */}
        <div className="flex items-center justify-center gap-2 mt-4 text-slate-400 text-sm">
          <ChevronRight className="w-4 h-4" />
          <span>גלול לעוד נתונים</span>
          <ChevronLeft className="w-4 h-4" />
        </div>
      </div>
    </section>
  )
}
