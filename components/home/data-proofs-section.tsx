import { ChevronLeft, ChevronRight, GraduationCap, DollarSign, Clock, CheckCircle } from "lucide-react"

const statCards = [
  {
    emoji: "🎓",
    stat: "71.9%",
    title: "פער ידע",
    description:
      "בעלי עסקים קטנים מציינים 'אני לא יודע מספיק על כלים דיגיטליים חדשים' כסיבה העיקרית לכך שלא הטמיעו AI.",
    source: "Intuit & ICIC, מרץ 2025",
  },
  {
    emoji: "💰",
    stat: "36%",
    title: "תקציבים עולים",
    description:
      "תקציבי ה־AI החודשיים צפויים לעלות ב־36% ב־2025, אבל רק 39% מהארגונים יודעים להעריך חסכון בביטחון — פער נראות הולך וגדל.",
    source: "CloudZero State of AI Costs, 2025",
  },
  {
    emoji: "⏰",
    stat: "37%",
    title: "לחץ זמן",
    description: "בעלי עסקים קטנים חסרי זמן/משאבים לבחון כלים לעומק — גם כשהם יודעים שזה יכול לעזור.",
    source: "PayPal/Reimagine Main Street, 2025",
  },
  {
    emoji: "🧠",
    stat: "62%",
    title: "חסם הבנה",
    description: "חוסר הבנה של היתרונות וחוסר משאבים פנימיים (60%) הם החסמים המרכזיים בפני אימוץ AI.",
    source: "Service Direct AI Report, 2025",
  },
  {
    emoji: "💡",
    stat: "34%",
    title: "אין חסכון ברור",
    description: "ללא שימושיות ברורה או החזר השקעה מורגש — עסקים מהססים להשקיע תקציב מוגבל.",
    source: "PayPal/Reimagine Main Street, 2025",
  },
  {
    emoji: "📉",
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
    <section className="bg-[#4169E1] py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white drop-shadow-sm mb-4">
            אתם לא לבד בזה
          </h2>
          <p className="text-lg sm:text-xl text-white">
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
                className="w-80 shrink-0 bg-[#1e3a8a] rounded-2xl p-6 shadow-lg scroll-snap-item"
              >
                {/* Emoji at top */}
                <div className="text-4xl mb-3">{card.emoji}</div>
                
                {/* Title in uppercase - small, above stat */}
                <div className="text-xs font-bold text-cyan-400 uppercase tracking-wide mb-2">{card.title}</div>
                
                {/* Huge stat number */}
                <div className="text-6xl font-black text-amber-400 mb-4">{card.stat}</div>
                
                {/* Description */}
                <p className="text-white text-sm leading-relaxed mb-4">{card.description}</p>
                
                {/* Citation with checkmark */}
                <div className="flex items-start gap-1.5 text-xs text-blue-200">
                  <CheckCircle className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                  <span>{card.source}</span>
                </div>
              </div>
            ))}

            {/* Quote cards */}
            {quoteCards.map((card, index) => (
              <div
                key={`quote-${index}`}
                className="w-80 shrink-0 bg-[#1e3a8a] rounded-2xl p-6 shadow-lg scroll-snap-item"
              >
                <div className="w-10 h-10 bg-amber-500 rounded-lg flex items-center justify-center mb-4">
                  <card.icon className="w-5 h-5 text-white stroke-2" />
                </div>
                
                {/* Title in uppercase */}
                <div className="text-xs font-bold text-cyan-400 uppercase tracking-wide mb-3">{card.title}</div>
                
                <p className="text-white text-sm leading-relaxed mb-4 italic">"{card.quote}"</p>
                
                {/* Citation with checkmark */}
                <div className="flex items-start gap-1.5 text-xs text-blue-200">
                  <CheckCircle className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                  <span>{card.source}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll hint */}
        <div className="flex items-center justify-center gap-2 mt-4 text-white text-sm">
          <ChevronRight className="w-4 h-4" />
          <span>גלול לעוד נתונים</span>
          <ChevronLeft className="w-4 h-4" />
        </div>
      </div>
    </section>
  )
}
