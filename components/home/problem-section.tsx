import { Clock, DollarSign, Lightbulb } from "lucide-react"

const painPoints = [
  {
    icon: Clock,
    title: "זמן",
    description: "שוקעים בעבודה יומיומית — בלי רוחב פס לחקור פתרונות AI",
  },
  {
    icon: DollarSign,
    title: "תקציב",
    description: "משאבים מוגבלים ופחד אמיתי לבזבז כסף ללא תמורה ברורה ROI",
  },
  {
    icon: Lightbulb,
    title: "מומחיות",
    description: "אין ידע טכני פנימי או צוות IT שיכול להעריך, ליישם ולתחזק כלים",
  },
]

export function ProblemSection() {
  return (
    <section className="bg-white pt-12 pb-16 md:pt-16 md:pb-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-blue-600 drop-shadow-sm mb-4">
            טובעים בכאוס של AI
          </h2>
          <p className="text-lg sm:text-xl text-[#0b2e7b] drop-shadow-sm max-w-3xl mx-auto">
            עסקים קטנים נמצאים בלחץ לאמץ AI בעוד שהטכנולוגיה רצה מהר יותר מהיכולת שלהם להדביק את הקצב.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {painPoints.map((point, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl border border-slate-200 p-6 shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="w-14 h-14 bg-[#0b2e7b]/10 rounded-xl flex items-center justify-center mb-4">
                <point.icon className="w-7 h-7 text-[#0b2e7b] stroke-[1.5]" />
              </div>
              <h3 className="text-xl font-bold text-[#0b2e7b] mb-2">{point.title}</h3>
              <p className="text-slate-600 leading-relaxed">{point.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
