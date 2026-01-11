"use client"

import { useState } from "react"
import { ArrowRight, Check, AlertTriangle, X, RotateCcw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useSimulator } from "@/contexts/simulator-context"
import Link from "next/link"

interface Question {
  context: string
  question: string
  // options is present for multiple-choice; if absent we'll render a slider
  options?: { label: string; risk: number }[]
  slider?: { left: string; right: string; min?: number; max?: number }
}

const questions: Question[] = [
  {
    context: "כלי AI עובדים עם נתוני העסק. נבדוק את הגיבויים.",
    question: "האם יש לך גיבויים למידע החשוב למשימה \"שם המשימה\"?",
    options: [
      { label: "✅ כן, מערכת גיבוי אוטומטית", risk: 0 },
      { label: "⚠️ כן, גיבויים ידניים מדי פעם", risk: 5 },
      { label: "❌ אין גיבויים", risk: 10 },
    ],
  },
  {
    context: "AI עלול לטעות.",
    question: "באיזו קלות תוכל/י לזהות אם AI שוגה במשימה \"שם המשימה\"?",
    slider: { left: "לא ניתן לזהות", right: "בקלות מאוד", min: 1, max: 10 },
  },
  {
    context: "לטעויות של AI יש השלכות.",
    question: "מה קורה אם AI עושה טעות במשימה \"שם המשימה\"?",
    options: [
      { label: "✅ תיקון פשוט בדקות", risk: 0 },
      { label: "⚠️ שעות של תיקונים", risk: 5 },
      { label: "❌ נזק כספי או משפטי", risk: 10 },
    ],
  },
  {
    context: "הטמעת כלי AI דורשת יכולות ומשאבים: זמן שלך/עובדיך או תקציב עזרה חיצונית",
    question: "יש לך משאבים להטמעת כלי AI עבור המשימה\"שם המשימה\"?",
    slider: { left: "אין לי ", right: "כמה שנדרש", min: 1, max: 10 },
  },
]

export function Tool2Safety() {
  const { setCurrentTool, setTool2Data, tool2Data, resetSimulator, tool1Data } = useSimulator()
  const [questionIndex, setQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState<number[]>([])
  const [sliderValue, setSliderValue] = useState<number>(5)
  const [showResults, setShowResults] = useState(false)

  const handleAnswer = (risk: number) => {
    const newAnswers = [...answers, risk]
    setAnswers(newAnswers)

    if (questionIndex < questions.length - 1) {
      setQuestionIndex(questionIndex + 1)
    } else {
      // Critical Blockers - any single critical risk triggers RED
      const hasCriticalBlocker = (
        newAnswers[0] >= 10 ||  // No backups
        newAnswers[1] >= 9 ||   // Catastrophic error risk
        newAnswers[2] >= 9      // Highly regulated data
      )
      
      let status: "green" | "yellow" | "red" = "green"
      
      if (hasCriticalBlocker) {
        status = "red"
      } else {
        // Weighted Risk Score: Infrastructure 25%, Errors 40%, Data 20%, Capacity 15%
        const weightedRisk = (
          newAnswers[0] * 0.25 +  // Infrastructure (backups)
          newAnswers[1] * 0.40 +  // Error scenario (most critical)
          newAnswers[2] * 0.20 +  // Data sensitivity
          newAnswers[3] * 0.15    // Implementation capacity
        )
        
        // Interaction effect: excellent controls reduce overall risk
        const hasStrongControls = newAnswers[1] <= 3 && newAnswers[3] <= 3
        const adjustedRisk = hasStrongControls ? weightedRisk * 0.80 : weightedRisk
        
        // Determine status based on adjusted risk
        if (adjustedRisk >= 6) status = "red"
        else if (adjustedRisk >= 3.5) status = "yellow"
        else status = "green"
      }

      // Defensive sanitization/clamping before storing
      const clamp = (v: number, a: number, b: number) => Math.max(a, Math.min(b, Number.isFinite(v) ? v : a))
      const q1 = clamp(newAnswers[0], 0, 10)
      const q2 = clamp(newAnswers[1], 1, 10)
      const q3 = clamp(newAnswers[2], 0, 10)
      const q4 = clamp(newAnswers[3], 1, 10)

      // Calculate final weighted risk for display
      const weightedRisk = +(q1 * 0.25 + q2 * 0.40 + q3 * 0.20 + q4 * 0.15).toFixed(2)

      // Calculate safety score (inverse of risk)
      const safetyScore = Math.max(0, Math.min(10, Math.round(10 - weightedRisk)))

      // Generate labels for PDF
      const getSafetyLabel = (score: number) => {
        if (score >= 8) return "בטיחות גבוהה — פנוי לפיילוט"
        if (score >= 6) return "בטיחות בינונית — דרוש תכנון נוסף"
        if (score >= 4) return "סיכון משמעותי — יש להכין אמצעי בקרה"
        return "סיכון גבוה — מומלץ לבחור משימה אחרת"
      }

      const getBackupsLabel = (risk: number) => {
        if (risk === 0) return "מערכת גיבוי אוטומטית"
        if (risk === 5) return "גיבויים ידניים מדי פעם"
        return "אין גיבויים"
      }

      const getErrorDetectionLabel = (risk: number) => {
        if (risk <= 3) return "זיהוי קל ותיקון מהיר"
        if (risk <= 5) return "זיהוי בזמן סביר"
        if (risk <= 7) return "קשה לזהות"
        return "סיכון נזק משמעותי"
      }

      const getErrorConsequenceLabel = (risk: number) => {
        if (risk === 0) return "תיקון פשוט בדקות"
        if (risk === 5) return "שעות של תיקונים"
        return "נזק כספי או משפטי"
      }

      const getCapacityLabel = (risk: number) => {
        if (risk <= 3) return "קיבולת מלאה"
        if (risk <= 6) return "קיבולת בינונית"
        return "עומס גבוה, קיבולת מוגבלת"
      }

      setTool2Data({
        q1,
        q2,
        q3,
        q4,
        weightedRisk,
        status,
        safetyScore,
        safetyLabel: getSafetyLabel(safetyScore),
        backupsLabel: getBackupsLabel(q1),
        errorDetectionLabel: getErrorDetectionLabel(q2),
        errorConsequenceLabel: getErrorConsequenceLabel(q3),
        capacityLabel: getCapacityLabel(q4),
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

  const getBackupLabel = (risk: number) => {
    if (risk === 0) return "מערכת גיבוי אוטומטית"
    if (risk === 5) return "גיבויים ידניים"
    return "אין גיבויים"
  }

  const getErrorLabel = (risk: number) => {
    if (risk <= 3) return "זיהוי קל ותיקון מהיר"
    if (risk <= 5) return "זיהוי בזמן סביר, תיקון דורש שעות"
    if (risk <= 7) return "קשה לזהות, תיקון מורכב"
    return "סיכון נזק משמעותי"
  }

  const getDataLabel = (risk: number) => {
    if (risk === 0) return "מידע ציבורי/לא רגיש"
    if (risk === 3) return "נתונים עסקיים פנימיים"
    if (risk === 7) return "מידע אישי (PII)"
    return "נתונים מוסדרים (רפואי/פיננסי)"
  }

  const getCapacityLabel = (risk: number) => {
    if (risk <= 3) return "קיבולת מלאה"
    if (risk <= 6) return "קיבולת בינונית"
    return "עומס גבוה, קיבולת מוגבלת"
  }

  const getRiskIcon = (risk: number) => {
    if (risk <= 3) return <Check className="w-5 h-5 text-green-600" />
    if (risk <= 6) return <AlertTriangle className="w-5 h-5 text-yellow-600" />
    return <X className="w-5 h-5 text-red-600" />
  }

  if (showResults && tool2Data) {
    // Convert weighted risk (0=low risk,10=high risk) into a safety score (higher=better)
    const safetyScore = Math.max(0, Math.min(10, Math.round(10 - tool2Data.weightedRisk)))

    const getSafetyColor = (score: number) => {
      const bucket = Math.floor(score)
      if (bucket >= 8) return { emoji: "🟢", text: "בטיחות גבוהה — פנוי לפיילוט", color: "text-green-600" }
      if (bucket >= 6) return { emoji: "🟡", text: "בטיחות בינונית — דרוש תכנון נוסף", color: "text-yellow-600" }
      if (bucket >= 4) return { emoji: "🟠", text: "סיכון משמעותי — יש להכין אמצעי בקרה", color: "text-orange-500" }
      return { emoji: "🔴", text: "סיכון גבוה — מומלץ לבחור משימה אחרת או להתייעץ", color: "text-red-600" }
    }

    const scoreInfo = getSafetyColor(safetyScore)

    const safeTaskLabel = tool1Data?.taskName ? tool1Data.taskName.replace(/["“”'״]/g, "") : ""

    return (
      <div className="max-w-2xl mx-auto px-4 py-12">
        <div className="bg-white rounded-3xl shadow-xl p-8 text-center">
          <h3 className="text-lg font-semibold text-slate-700 mb-4">{safeTaskLabel ? `הערכת בטיחות למשימה ״${safeTaskLabel}״` : 'הערכת בטיחות למשימה'}</h3>
          <div className="text-6xl mb-4">{scoreInfo.emoji}</div>
          <div className="text-5xl font-black text-[#0b2e7b] mb-2">{safetyScore}<span className="text-2xl text-slate-400">/10</span></div>
          <p className={`text-xl font-bold ${scoreInfo.color} mb-4`}>{scoreInfo.text}</p>

          <div className="text-right bg-slate-50 rounded-2xl p-6 mb-6">
            <h3 className="font-bold text-[#0b2e7b] mb-4">איך חישבנו את הציון?</h3>
            <p className="text-slate-600 mb-3">הציון מורכב ממספר מרכיבי סיכון שכל אחד מהם משפיע על היכולת להטמיע את הכלי בבטחה.</p>
            <ul className="space-y-2">
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-green-600 mt-0.5 shrink-0" />
                <span className="text-slate-600">תשתית וגיבויים - חוסן מערכתי מקטין את הסיכון לאובדן או לשיבושים.</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-green-600 mt-0.5 shrink-0" />
                <span className="text-slate-600"> שגיאות - טעויות שקשה לגלות או שגורמות לנזק משמעותי מעלות את הסיכון.</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-green-600 mt-0.5 shrink-0" />
                <span className="text-slate-600">נתונים - חוסרים, איכות נמוכה או רגישות מידע מגדילים את הסיכון.</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-green-600 mt-0.5 shrink-0" />
                <span className="text-slate-600">משאבים - מחסור בזמינות ללמידה, הטמעה וביצוע בדיקות מעלה את הסיכון.</span>
              </li>
            </ul>
          </div>

          <div className="flex items-start gap-3 bg-yellow-50 border border-yellow-100 rounded-xl p-3 mb-6 text-right">
            <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5 shrink-0" />
            <p className="text-sm text-yellow-800">
              הסימולטור מספק הערכה כללית בלבד ואינו מהווה ייעוץ מקצועי. הערכה זו מתבססת על הנחות ומידע שהזנתם; היא אינדיקטיבית בלבד ותיתכן שונות בתנאים אמיתיים. אין לראות בתוצאה התחייבות.
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
              }}
              className="flex-1 rounded-xl py-6"
            >
              בחר משימה אחרת
            </Button>
            <Button
              onClick={() => {
                setCurrentTool(3)
                setShowResults(false)
                setQuestionIndex(0)
                setAnswers([])
              }}
              className="flex-1 bg-linear-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-bold rounded-xl py-6 text-lg"
            >
              לחישוב חסכון לעסק ←
            </Button>
          </div>
        </div>
      </div>
    )
  }

  const currentQuestion = questions[questionIndex]

  // Replace placeholder task name in question text with the saved task name from Tool1 (if any).
  // If no mission title was provided, remove the placeholder entirely (show no fallback text).
  const safeTask = tool1Data?.taskName ? tool1Data.taskName.replace(/[\"“”'״]/g, "") : ""
  const getDisplayedQuestion = (q: string) => {
    try {
      if (q.match(/[\"'״]?\s*שם המשימה\s*[\"'״]?/)) {
          if (safeTask) {
            return q
              .replace(/[\"'״]?\s*שם המשימה\s*[\"'״]?/g, ` ״${safeTask}״ `)
              .replace(/\s+/g, ' ')
              .replace(/\s+([?!.:,;])/g, '$1')
              .trim()
          }
          return q
            .replace(/[\"'״]?\s*שם המשימה\s*[\"'״]?/g, ' ')
            .replace(/\s+/g, ' ')
            .replace(/\s+([?!.:,;])/g, '$1')
            .trim()
      }
      return q
    } catch (e) {
      return q
    }
  }

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
        <p className="text-slate-500 mb-4">{currentQuestion.context}</p>
        <h2 className="text-2xl font-bold text-[#0b2e7b] mb-8">{getDisplayedQuestion(currentQuestion.question)}</h2>

        <div className="space-y-3">
          {currentQuestion.options ? (
            currentQuestion.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(option.risk)}
                className="w-full text-right p-4 bg-slate-50 hover:bg-blue-50 border-2 border-slate-200 hover:border-blue-300 rounded-xl transition-all font-medium text-slate-700"
              >
                {option.label}
              </button>
            ))
          ) : (
            // slider UI
            <div className="space-y-4">
              <div className="flex items-center justify-between text-sm text-slate-600">
                <span>{currentQuestion.slider?.left}</span>
                <span>{currentQuestion.slider?.right}</span>
              </div>
              <input
                type="range"
                min={currentQuestion.slider?.min ?? 1}
                max={currentQuestion.slider?.max ?? 10}
                step={1}
                value={sliderValue}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSliderValue(Number(e.target.value))}
                className="w-full"
              />
              <div className="text-center text-[#0b2e7b] font-semibold text-xl">{sliderValue}</div>
              <div className="flex justify-center">
                <Button
                  onClick={() => {
                    handleAnswer(sliderValue)
                  }}
                  className="mx-auto bg-linear-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-bold rounded-xl py-4 px-12 text-lg"
                >
                  הבא
                </Button>
              </div>
            </div>
          )}
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
