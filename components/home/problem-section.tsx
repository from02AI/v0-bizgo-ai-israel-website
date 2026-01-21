import { Clock, DollarSign, Lightbulb } from "lucide-react"

const painPoints = [
  {
    icon: Clock,
    title: "זמן",
    description: [
      "עמוסים בעבודה יומיומית",
      "בלי זמן לחקור פתרונות AI",
    ],
  },
  {
    icon: DollarSign,
    title: "תקציב",
    description: [
      "משאבים מוגבלים וחשש לבזבז כסף",
      "ללא הבנה עמוקה ותמורה ברורה",
    ],
  },
  {
    icon: Lightbulb,
    title: "מומחיות",
    description: [
      "ללא מספיק ידע טכני או צוות IT",
      "שיכול להעריך, ליישם ולתחזק כלים",
    ],
  },
]

export function ProblemSection() {
  return (
    <section className="bg-[#1e3a8a] pt-12 pb-16 md:pt-16 md:pb-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-white mb-4">
            טובעים בכאוס של AI?
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-white max-w-3xl mx-auto">
            עסקים קטנים נמצאים בלחץ להתקדם לבינה המלאכותית <br />בעוד שהטכנולוגיה רצה מהר יותר מהיכולת להדביק את הקצב.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {painPoints.map((point, index) => (
            <div
              key={index}
              className="bg-blue-600 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-shadow text-center"
            >
              <div className="w-14 h-14 bg-amber-500 rounded-xl flex items-center justify-center mb-4 mx-auto">
                <point.icon className="w-7 h-7 text-white stroke-2" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">{point.title}</h3>
              <p className="text-white leading-relaxed">
                {point.description.map((line, i) => (
                  <span key={i} className={`block ${i === 0 ? "" : "mt-1"}`}>
                    {line}
                  </span>
                ))}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
