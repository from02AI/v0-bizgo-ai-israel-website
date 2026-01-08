"use client"

import { useState } from "react"
import { ArrowRight, Check, RotateCcw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useSimulator } from "@/contexts/simulator-context"

interface Question {
  context: string
  question: string
  options: { label: string; points: number }[]
}

const questions: Question[] = [
  {
    context: "חשבו על משימה אחת חוזרת בעסק שלכם שגוזלת זמן משמעותי.",
    question: "כמה פעמים אתם מבצעים את המשימה?",
    options: [
      { label: "פעם בשנה", points: 0 },
      { label: "כמה פעמים בשנה", points: 3 },
      { label: "פעם בחודש", points: 7 },
      { label: "יותר מפעם בשבוע", points: 10 },
    ],
  },
  {
    context: "נשארים עם אותה משימה…",
    question: "עד כמה המשימה הזו חוזרת על עצמה?",
    options: [
      { label: "כל פעם שונה", points: 0 },
      { label: "יש דפוסים בסיסיים", points: 3 },
      { label: "תהליך די סטנדרטי", points: 7 },
      { label: "תהליך זהה בכל פעם", points: 10 },
    ],
  },
  {
    context: "אותה משימה — נדבר על זמן.",
    question: "כמה שעות בשבוע עובד אחד מקדיש למשימה?",
    options: [
      { label: "פחות משעה", points: 0 },
      { label: "1–5 שעות", points: 3 },
      { label: "6–15 שעות", points: 7 },
      { label: "יותר מ־15 שעות", points: 10 },
    ],
  },
  {
    context: "שאלה אחרונה על המשימה הזו.",
    question: "איזה סוג משימה זו?",
    options: [
      { label: "🎨 עבודה יצירתית לחלוטין", points: 0 },
      { label: "🎨📊 שילוב יצירתיות ונתונים", points: 3 },
      { label: "📊 ניתוח מסמכים/נתונים", points: 7 },
      { label: "🔄 משימות שגרתיות/אדמיניסטרטיביות", points: 10 },
    ],
  },
]

export function Tool1Opportunity() {
  const { setCurrentTool, setTool1Data, tool1Data, resetSimulator } = useSimulator()
  const [questionIndex, setQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState<number[]>([])
  const [showResults, setShowResults] = useState(false)

  const handleAnswer = (points: number) => {
    const newAnswers = [...answers, points]
    setAnswers(newAnswers)

    if (questionIndex < questions.length - 1) {
      setQuestionIndex(questionIndex + 1)
    } else {
      // Calculate score
      const q1 = newAnswers[0] * 0.35
      const q2 = newAnswers[1] * 0.3
      const q3 = newAnswers[2] * 0.15
      const q4 = newAnswers[3] * 0.2
      const totalPoints = q1 + q2 + q3 + q4
      const score = Math.round((totalPoints / 10) * 10) / 10

      setTool1Data({
        q1: newAnswers[0],
        q2: newAnswers[1],
        q3: newAnswers[2],
        q4: newAnswers[3],
        score,
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
    if (score >= 8) return { emoji: "🟢", text: "הזדמנות מצוינת", color: "text-green-600" }
    if (score >= 5) return { emoji: "🟡", text: "פוטנציאל בינוני", color: "text-yellow-600" }
    return { emoji: "🔴", text: "לא מומלץ להתחיל כאן", color: "text-red-600" }
  }

  if (showResults && tool1Data) {
    const scoreInfo = getScoreColor(tool1Data.score)

    return (
      <div className="max-w-2xl mx-auto px-4 py-12">
        <div className="bg-white rounded-3xl shadow-xl p-8 text-center">
          <div className="text-6xl mb-4">{scoreInfo.emoji}</div>
          <div className="text-5xl font-black text-[#0b2e7b] mb-2">
            {tool1Data.score}
            <span className="text-2xl text-slate-400">/10</span>
          </div>
          <p className={`text-xl font-bold ${scoreInfo.color} mb-8`}>{scoreInfo.text}</p>

          <div className="text-right bg-slate-50 rounded-2xl p-6 mb-8">
            <h3 className="font-bold text-[#0b2e7b] mb-4">למה הציון הזה?</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <span className="text-slate-600">תדירות גבוהה + חזרתיות = מועמד מצוין לאוטומציה</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <span className="text-slate-600">השקעת זמן משמעותית = פוטנציאל ROI משמעותי</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <span className="text-slate-600">סוג המשימה מתאים לחוזקות של AI</span>
              </li>
            </ul>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-8 text-right">
            <p className="text-blue-800">המשיכו לכלי 2 כדי לבדוק מוכנות ובטיחות לפני יישום.</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              onClick={() => {
                setCurrentTool(2)
                setShowResults(false)
                setQuestionIndex(0)
                setAnswers([])
              }}
              className="flex-1 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-bold rounded-xl py-6 text-lg"
            >
              המשך לבדיקת בטיחות ←
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                resetSimulator()
                setShowResults(false)
                setQuestionIndex(0)
                setAnswers([])
              }}
              className="flex-1 rounded-xl py-6"
            >
              <RotateCcw className="w-4 h-4 ml-2" />
              התחלה מחדש
            </Button>
          </div>
        </div>
      </div>
    )
  }

  const currentQuestion = questions[questionIndex]

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <div className="mb-8">
        <div className="text-sm text-slate-500 mb-2">
          שאלה {questionIndex + 1} מתוך {questions.length}
        </div>
        <div className="h-1 bg-slate-100 rounded-full">
          <div
            className="h-full bg-[#0b2e7b] rounded-full transition-all"
            style={{ width: `${((questionIndex + 1) / questions.length) * 100}%` }}
          />
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-xl p-8">
        <p className="text-slate-500 mb-4">{currentQuestion.context}</p>
        <h2 className="text-2xl font-bold text-[#0b2e7b] mb-8">{currentQuestion.question}</h2>

        <div className="space-y-3">
          {currentQuestion.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswer(option.points)}
              className="w-full text-right p-4 bg-slate-50 hover:bg-blue-50 border-2 border-slate-200 hover:border-blue-300 rounded-xl transition-all font-medium text-slate-700"
            >
              {option.label}
            </button>
          ))}
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
