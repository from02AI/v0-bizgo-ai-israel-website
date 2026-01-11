"use client"

import { useState } from "react"
import { ArrowRight, Check, RotateCcw, AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useSimulator } from "@/contexts/simulator-context"

interface Question {
  context: string
  question: string
  options: { label: string; points: number }[]
}

const questions: Question[] = [
  {
    context: "בחר/י משימה אחת חוזרת בעסק שלך שגוזלת זמן משמעותי.",
    question: "מה אופי המשימה המשימה הזו?",
    options: [
      { label: "🎨 עבודה יצירתית או אסטרטגית", points: 0 },
      { label: "🧠 ניתוח מקצועי הדורש מומחיות או שיקול דעת", points: 2 },
      { label: "📊 עיבוד מידע עם כללים ברורים", points: 7 },
      { label: "🔄 משימות אדמיניסטרטיביות שגרתיות", points: 10 },
    ],
  },
  {
    context: "",
    question: "עד כמה המשימה המשימה הזו חוזרת על עצמה?",
    options: [
      { label: "כל פעם שונה לחלוטין", points: 0 },
      { label: "יש תבנית בסיסית, אבל הרבה וריאציות", points: 5 },
      { label: "תהליך זהה או כמעט זהה בכל פעם", points: 10 },
    ],
  },
  {
    context: "",
    question: "כמה דוגמאות או תיעוד יש לך מביצועים קודמים של המשימה \"המשימה הזו\"?",
    options: [
      { label: "❌ אין תיעוד או דוגמאות קודמות", points: 0 },
      { label: "📄 קצת דוגמאות (פחות מ-20)", points: 3 },
      { label: "📚 מאגר בינוני (20-100 דוגמאות)", points: 7 },
      { label: "🗄️ מאגר גדול (100+ דוגמאות מתועדות)", points: 10 },
    ],
  },
]

export function Tool1Opportunity() {
  const { setCurrentTool, setTool1Data, tool1Data, resetSimulator } = useSimulator()
  const [questionIndex, setQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState<number[]>([])
  const [taskName, setTaskName] = useState<string>("")
  const [showResults, setShowResults] = useState(false)

  const handleAnswer = (points: number) => {
    const newAnswers = [...answers, points]
    setAnswers(newAnswers)

    if (questionIndex < questions.length - 1) {
      setQuestionIndex(questionIndex + 1)
    } else {
      // Weights: task type 25%, repetitiveness 45%, documentation 30%
      const qTask = newAnswers[0] * 0.25
      const qRepeat = newAnswers[1] * 0.45
      const qDocumentation = newAnswers[2] * 0.30
      const totalPoints = qTask + qRepeat + qDocumentation
      // score on 0-10 scale, rounded to nearest integer
      const score = Math.round(totalPoints)

      // Generate labels for PDF
      const getFitLabel = (s: number) => {
        if (s >= 8) return "התאמה מצוינת — עדיפות גבוהה"
        if (s >= 6) return "מועמד טוב — המשיכו בתכנון"
        if (s >= 4) return "התאמה בינונית — דורש התאמה"
        return "התאמה נמוכה — שקול משימות אחרות"
      }

      const getTaskTypeLabel = (q1: number) => {
        if (q1 === 10) return "משימות אדמיניסטרטיביות שגרתיות"
        if (q1 === 7) return "עיבוד מידע עם כללים ברורים"
        if (q1 === 2) return "ניתוח מקצועי הדורש מומחיות"
        return "עבודה יצירתית או אסטרטגית"
      }

      const getRepetitivenessLabel = (q2: number) => {
        if (q2 === 10) return "תהליך זהה בכל פעם"
        if (q2 === 5) return "תבנית בסיסית עם וריאציות"
        return "כל פעם שונה לחלוטין"
      }

      const getDocumentationLabel = (q3: number) => {
        if (q3 === 10) return "מאגר גדול (100+ דוגמאות)"
        if (q3 === 7) return "מאגר בינוני (20-100 דוגמאות)"
        if (q3 === 3) return "קצת דוגמאות (פחות מ-20)"
        return "אין תיעוד או דוגמאות"
      }

      // Map answers to Tool1Data shape
      // q1 = task type (newAnswers[0])
      // q2 = repetitiveness (newAnswers[1])
      // q3 = documentation (newAnswers[2])
      const safeTask = taskName ? taskName.replace(/[\"""]/g, "") : undefined
      setTool1Data({
        q1: newAnswers[0],
        q2: newAnswers[1],
        q3: newAnswers[2],
        q4: 0, // Not used - kept for interface compatibility
        taskName: safeTask,
        score,
        fitLabel: getFitLabel(score),
        taskTypeLabel: getTaskTypeLabel(newAnswers[0]),
        repetitivenessLabel: getRepetitivenessLabel(newAnswers[1]),
        documentationLabel: getDocumentationLabel(newAnswers[2]),
      })
      setShowResults(true)
    }
  }

  const handleBack = () => {
    if (questionIndex > 0) {
      setQuestionIndex(questionIndex - 1)
      setAnswers(answers.slice(0, -1))
    }
  }

  const getScoreColor = (score: number) => {
    // Use integer buckets 0-3,4-5,6-7,8-10 based on floor(score)
    const bucket = Math.floor(score)
    if (bucket >= 8) return { emoji: "🟢", text: "התאמה מצוינת — עדיפות גבוהה, סיכון נמוך וצפוי חיסכון גבוה",  color: "text-[#0b2e7b]" }
    if (bucket >= 6) return { emoji: "🟡", text: "מועמד טוב — המשיכו בתכנון ובדקו אבחון בטיחות בכלי 2", color: "text-[#0b2e7b]" }
    if (bucket >= 4) return { emoji: "🟠", text: "התאמה נמוכה-בינונית — דורש התאמה משמעותית ועלות הטמעה גבוהה", color: "text-[#0b2e7b]" }
    return { emoji: "🔴", text: "התאמה נמוכה — מומלץ להתמקד במשימות אחרות אלא אם זו עדיפות אסטרטגית",  color: "text-[#0b2e7b]" }
  }
  const getResultTitle = (score: number) => {
    const bucket = Math.floor(score)
    if (bucket >= 8) return "התאמה מצוינת — עדיפות גבוהה, סיכון נמוך וצפי חיסכון גבוה"
    if (bucket >= 6) return "מועמד טוב — המשיכו בתכנון ובדקו אבחון בטיחות בכלי 2"
    if (bucket >= 4) return "התאמה בינונית — דורש התאמה משמעותית ועלות הטמעה גבוהה"
    return "התאמה נמוכה — מומלץ להתמקד במשימות אחרות"
  }

  if (showResults && tool1Data) {
    const scoreInfo = getScoreColor(tool1Data.score)
    const safeTaskForResults = taskName ? taskName.replace(/[\"“”]/g, "") : ""

    return (
      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="bg-white rounded-3xl shadow-xl p-8 text-center">
          <h3 className="text-lg font-semibold text-slate-700 mb-4">{safeTaskForResults ? `הערכת התאמת המשימה "${safeTaskForResults}" ל‑AI` : 'הערכת התאמת המשימה ל‑AI'}</h3>
          <div className="text-6xl mb-4">{scoreInfo.emoji}</div>
          <div className="text-5xl font-black text-[#0b2e7b] mb-2">
            {tool1Data.score}
            <span className="text-2xl text-slate-400">/10</span>
          </div>
          <p className={`text-xl font-bold ${scoreInfo.color} mb-2`}>{getResultTitle(tool1Data.score)}</p>
          

          <div className="text-right bg-slate-50 rounded-2xl p-6 mb-6">
            <h3 className="font-bold text-[#0b2e7b] mb-4">איך חישבנו את הציון?</h3>
            <p className="text-slate-600 mb-3">הציון מורכב מ־3 מרכיבים עיקריים. לכל מרכיב הוקצה משקל לפי חשיבות יחסית.</p>
            <ul className="space-y-2">
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-blue-600 mt-0.5 shrink-0" />
                <span className="text-slate-600">סוג המשימה — משימות שגרתיות ומובנות מתאימות יותר לאוטומציה.</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-blue-600 mt-0.5 shrink-0" />
                <span className="text-slate-600">חזרתיות — תהליכים עקביים וחוזרים מאפשרים ל-AI ללמוד טוב יותר.</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-blue-600 mt-0.5 shrink-0" />
                <span className="text-slate-600">תיעוד ודוגמאות — מאגר גדול של דוגמאות משפר את איכות האימון.</span>
              </li>
            </ul>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6 text-right">
            <p className="text-blue-600">רוצים להעמיק? המשיכו לכלי 2 כדי לבדוק מוכנות ובטיחות לפני יישום, שם נבחן סיכונים ותנאים להטמעה בטוחה.</p>
          </div>

          <div className="flex items-start gap-3 bg-yellow-50 border border-yellow-100 rounded-xl p-3 mb-6 text-right">
            <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5 shrink-0" />
            <p className="text-sm text-yellow-800">
              הסימולטור לשירותך ומספק הערכה כללית בלבד, ואינו מהווה ייעוץ מקצועי או התחייבות. ההערכה מתבססת על מידע שהזנת, היא אינדיקטיבית בלבד ותיתכן שונות בתנאים אמיתיים.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              variant="outline"
              onClick={() => {
                resetSimulator()
                setShowResults(false)
                setQuestionIndex(0)
                setAnswers([])
                setTaskName("")
              }}
              className="flex-1 rounded-xl py-6"
            >
              <RotateCcw className="w-4 h-4 ml-2" />
              התחלה מחדש
            </Button>
            <Button
              onClick={() => {
                setCurrentTool(2)
                setShowResults(false)
                setQuestionIndex(0)
                setAnswers([])
              }}
              className="flex-1 bg-linear-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-bold rounded-xl py-6 text-lg"
            >
              המשך לבדיקת בטיחות ←
            </Button>
          </div>
        </div>
      </div>
    )
  }

  const currentQuestion = questions[questionIndex]

  // Compute displayed question text (inject mission name when provided; otherwise remove placeholder)
  const displayedQuestion = (() => {
    try {
      let q = currentQuestion.question
      const safe = taskName ? taskName.replace(/[\"“”'״]/g, "") : ""
      if (q.match(/[\"'״]?\s*המשימה הזו\s*[\"'״]?/)) {
        if (safe) {
          return q
            .replace(/[\"'״]?\s*המשימה הזו\s*[\"'״]?/g, ` ״${safe}״ `)
            .replace(/\s+/g, ' ')
            .replace(/\s+([?!.:,;])/g, '$1')
            .trim()
        }
        return q
          .replace(/[\"'״]?\s*המשימה הזו\s*[\"'״]?/g, ' ')
          .replace(/\s+/g, ' ')
          .replace(/\s+([?!.:,;])/g, '$1')
          .trim()
      }
      return q
    } catch (e) {
      return currentQuestion.question
    }
  })()

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <div className="mb-8 flex justify-center">
        <div className="flex items-center gap-3">
          {questions.map((_, i) => (
            <span
              key={i}
              className={`w-3 h-3 rounded-full transition-colors ${
                i === questionIndex ? "bg-blue-600" : "bg-slate-200"
              }`}
            />
          ))}
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-xl p-8">
        {/* For question 1 show the flow title as a question heading, centered (above the context) */}
        {questionIndex === 0 && (
          <h2 className="text-2xl font-bold text-[#0b2e7b] mb-3 text-center">בדיקת התאמת משימות ל-AI</h2>
        )}

        {currentQuestion.context && (
          <p className="text-slate-500 mb-4"><strong className="font-bold">{currentQuestion.context}</strong></p>
        )}

        {/* Optional task name input for first question (placed above the question heading) */}
        {questionIndex === 0 && (
          <div className="mb-4">
            <textarea
              dir="rtl"
              name="missionTitle"
              placeholder="הכנס שם המשימה לכאן"
              value={taskName}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTaskName(e.target.value)}
              className="w-full md:w-72 p-2 rounded-xl border border-slate-200 bg-white text-right placeholder:text-slate-400 h-12 resize-none"
              rows={1}
              maxLength={60}
              aria-label="שם המשימה (אופציונלי)"
            />
          </div>
        )}

        {/* render question text and inject task name when applicable */}

        <h2 className="text-2xl font-bold text-[#0b2e7b] mb-8">{displayedQuestion}</h2>

        <div className="space-y-3">
          {currentQuestion.options ? (
            currentQuestion.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(option.points)}
                className="w-full text-right p-4 bg-slate-50 hover:bg-blue-50 border-2 border-slate-200 hover:border-blue-300 rounded-xl transition-all font-medium text-slate-700"
              >
                {option.label}
              </button>
            ))
          ) : null}
        </div>

        {questionIndex > 0 && (
          <button
            onClick={handleBack}
            className="mt-6 flex items-center gap-2 text-slate-500 hover:text-slate-700 transition-colors"
          >
            <ArrowRight className="w-4 h-4" />
            חזרה לשאלה הקודמת
          </button>
        )}
      </div>
    </div>
  )
}
