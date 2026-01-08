"use client"

import { useState } from "react"
import { ArrowRight, Check, AlertTriangle, X, RotateCcw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useSimulator } from "@/contexts/simulator-context"
import Link from "next/link"

interface Question {
  context: string
  question: string
  options: { label: string; risk: number }[]
}

const questions: Question[] = [
  {
    context: "כלי AI עובדים עם נתוני העסק. נבדוק את הגיבויים.",
    question: "האם יש לכם גיבויים למידע חשוב?",
    options: [
      { label: "✅ כן, מערכת גיבוי אוטומטית", risk: 0 },
      { label: "⚠️ כן, גיבויים ידניים מדי פעם", risk: 5 },
      { label: "❌ אין גיבויים", risk: 10 },
    ],
  },
  {
    context: "AI עלול לטעות. האם תוכלו לגלות?",
    question: "האם תוכלו לזהות אם AI שוגה במשימה הזו?",
    options: [
      { label: "✅ כן, בקלות", risk: 0 },
      { label: "⚠️ אולי, לפעמים", risk: 5 },
      { label: "❌ לא, אין לי איך לדעת", risk: 10 },
    ],
  },
  {
    context: "מה ההשפעה אם AI טועה?",
    question: "מה קורה אם AI עושה טעות במשימה הזו?",
    options: [
      { label: "✅ תיקון פשוט בדקות", risk: 0 },
      { label: "⚠️ שעות של תיקונים", risk: 5 },
      { label: "❌ נזק כספי או משפטי", risk: 10 },
    ],
  },
  {
    context: "כלי AI דורשים זמן למידה. יש לכם קיבולת?",
    question: "יש לכם זמן ללמוד כלי חדש?",
    options: [
      { label: "✅ כן, יש לי/לנו זמן", risk: 0 },
      { label: "⚠️ זמן מוגבל", risk: 5 },
      { label: "❌ אין זמן בכלל", risk: 10 },
    ],
  },
]

export function Tool2Safety() {
  const { setCurrentTool, setTool2Data, tool2Data, resetSimulator } = useSimulator()
  const [questionIndex, setQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState<number[]>([])
  const [showResults, setShowResults] = useState(false)

  const handleAnswer = (risk: number) => {
    const newAnswers = [...answers, risk]
    setAnswers(newAnswers)

    if (questionIndex < questions.length - 1) {
      setQuestionIndex(questionIndex + 1)
    } else {
      const maxRisk = Math.max(...newAnswers)
      let status: "green" | "yellow" | "red" = "green"
      if (maxRisk >= 8) status = "red"
      else if (maxRisk >= 5) status = "yellow"

      setTool2Data({
        q1: newAnswers[0],
        q2: newAnswers[1],
        q3: newAnswers[2],
        q4: newAnswers[3],
        maxRisk,
        status,
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

  const getStatusInfo = (status: "green" | "yellow" | "red") => {
    switch (status) {
      case "green":
        return { emoji: "🟢", text: "סטטוס בטיחות: מוכן לפיילוט", color: "text-green-600", bg: "bg-green-50" }
      case "yellow":
        return { emoji: "🟡", text: "סטטוס בטיחות: נדרשת היערכות", color: "text-yellow-600", bg: "bg-yellow-50" }
      case "red":
        return { emoji: "🔴", text: "סטטוס בטיחות: יש בעיות קריטיות", color: "text-red-600", bg: "bg-red-50" }
    }
  }

  const getRiskIcon = (risk: number) => {
    if (risk === 0) return <Check className="w-5 h-5 text-green-600" />
    if (risk === 5) return <AlertTriangle className="w-5 h-5 text-yellow-600" />
    return <X className="w-5 h-5 text-red-600" />
  }

  if (showResults && tool2Data) {
    const statusInfo = getStatusInfo(tool2Data.status)

    return (
      <div className="max-w-2xl mx-auto px-4 py-12">
        <div className="bg-white rounded-3xl shadow-xl p-8 text-center">
          <div className="text-6xl mb-4">{statusInfo.emoji}</div>
          <p className={`text-xl font-bold ${statusInfo.color} mb-8`}>{statusInfo.text}</p>

          <div className="text-right bg-slate-50 rounded-2xl p-6 mb-8">
            <h3 className="font-bold text-[#0b2e7b] mb-4">פירוט הסיכונים:</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                {getRiskIcon(tool2Data.q1)}
                <span className="text-slate-600">
                  גיבויים:{" "}
                  {tool2Data.q1 === 0 ? "מערכת גיבוי תקינה" : tool2Data.q1 === 5 ? "גיבויים חלקיים" : "אין גיבויים"}
                </span>
              </li>
              <li className="flex items-start gap-3">
                {getRiskIcon(tool2Data.q2)}
                <span className="text-slate-600">
                  זיהוי שגיאות:{" "}
                  {tool2Data.q2 === 0 ? "יכולת זיהוי גבוהה" : tool2Data.q2 === 5 ? "יכולת חלקית" : "אין יכולת זיהוי"}
                </span>
              </li>
              <li className="flex items-start gap-3">
                {getRiskIcon(tool2Data.q3)}
                <span className="text-slate-600">
                  השפעת שגיאות: {tool2Data.q3 === 0 ? "תיקון מהיר" : tool2Data.q3 === 5 ? "דורש זמן" : "נזק משמעותי"}
                </span>
              </li>
              <li className="flex items-start gap-3">
                {getRiskIcon(tool2Data.q4)}
                <span className="text-slate-600">
                  זמן למידה: {tool2Data.q4 === 0 ? "יש זמן" : tool2Data.q4 === 5 ? "זמן מוגבל" : "אין זמן"}
                </span>
              </li>
            </ul>
          </div>

          {tool2Data.status === "green" && (
            <>
              <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-8 text-right">
                <h4 className="font-bold text-green-800 mb-2">אמצעי זהירות מומלצים:</h4>
                <ul className="text-green-700 space-y-1 text-sm">
                  <li>• התחילו בפיילוט קטן לפני שימוש רחב</li>
                  <li>• בדקו תוצאות באופן שוטף בחודש הראשון</li>
                  <li>• הגדירו תהליך לזיהוי ותיקון שגיאות</li>
                  <li>• שמרו על גיבויים קבועים</li>
                </ul>
              </div>
              <Button
                onClick={() => {
                  setCurrentTool(3)
                  setShowResults(false)
                  setQuestionIndex(0)
                  setAnswers([])
                }}
                className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-bold rounded-xl py-6 text-lg"
              >
                המשך למחשבון ROI ←
              </Button>
            </>
          )}

          {tool2Data.status === "yellow" && (
            <>
              <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-8 text-right">
                <h4 className="font-bold text-yellow-800 mb-2">צעדי היערכות נדרשים:</h4>
                <ol className="text-yellow-700 space-y-1 text-sm">
                  <li>1. הקימו מערכת גיבוי אוטומטית</li>
                  <li>2. הגדירו תהליך בדיקת איכות לתוצאות AI</li>
                  <li>3. הקצו זמן ללמידה ותרגול</li>
                </ol>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  onClick={() => {
                    setCurrentTool(3)
                    setShowResults(false)
                    setQuestionIndex(0)
                    setAnswers([])
                  }}
                  className="flex-1 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-bold rounded-xl py-6"
                >
                  המשך למחשבון ROI ←
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    setCurrentTool(1)
                    setShowResults(false)
                    setQuestionIndex(0)
                    setAnswers([])
                  }}
                  className="flex-1 rounded-xl py-6"
                >
                  <ArrowRight className="w-4 h-4 ml-2" />
                  חזרה למאתר הזדמנויות
                </Button>
              </div>
            </>
          )}

          {tool2Data.status === "red" && (
            <>
              <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-8 text-right">
                <p className="text-red-800">
                  זיהינו סיכונים קריטיים שעלולים לגרום לנזק משמעותי. מומלץ להתייעץ עם מומחה לפני שממשיכים, או לבחור
                  משימה אחרת להתחיל איתה.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  onClick={() => {
                    resetSimulator()
                    setShowResults(false)
                    setQuestionIndex(0)
                    setAnswers([])
                  }}
                  variant="outline"
                  className="flex-1 rounded-xl py-6"
                >
                  <RotateCcw className="w-4 h-4 ml-2" />
                  התחל מחדש עם משימה אחרת
                </Button>
                <Button asChild className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl py-6">
                  <Link href="/consultation">הגש בקשה לייעוץ מקצועי</Link>
                </Button>
              </div>
            </>
          )}
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
              onClick={() => handleAnswer(option.risk)}
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
