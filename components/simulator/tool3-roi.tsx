"use client"

import { useState } from "react"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useSimulator } from "@/contexts/simulator-context"

const learningHoursMap: Record<string, number> = {
  "1-2": 1.5,
  "3-5": 4,
  "6-10": 8,
  "10+": 12,
}

export function Tool3ROI() {
  const { setTool3Data } = useSimulator()
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    hoursPerTask: 2,
    timesPerMonth: 4,
    hourlyRate: 80,
    learningHours: "3-5",
    maintenanceHours: 2,
    toolCost: 0,
  })
  const [showResults, setShowResults] = useState(false)
  const [results, setResults] = useState<{
    sixMonthTotal: number
    monthlyBreakdown: {
      month: number
      laborSaved: number
      learningCost: number
      maintenanceCost: number
      toolCost: number
      netSavings: number
    }[]
  } | null>(null)

  const calculateROI = () => {
    const { hoursPerTask, timesPerMonth, hourlyRate, learningHours, maintenanceHours, toolCost } = formData
    const learningHoursNum = learningHoursMap[learningHours]
    const monthlyTaskHours = hoursPerTask * timesPerMonth
    const monthlyLaborCost = monthlyTaskHours * hourlyRate
    const learningCost = learningHoursNum * hourlyRate
    const maintenanceCost = maintenanceHours * hourlyRate

    // Month 1: 50% efficiency
    const month1LaborSaved = monthlyLaborCost * 0.5
    const month1Net = month1LaborSaved - learningCost - maintenanceCost - toolCost

    // Month 2: 75% efficiency
    const month2LaborSaved = monthlyLaborCost * 0.75
    const month2Net = month2LaborSaved - maintenanceCost - toolCost

    // Months 3-6: 100% efficiency
    const month3to6LaborSaved = monthlyLaborCost
    const month3to6Net = month3to6LaborSaved - maintenanceCost - toolCost

    const sixMonthTotal = month1Net + month2Net + month3to6Net * 4

    const monthlyBreakdown = [
      { month: 1, laborSaved: month1LaborSaved, learningCost, maintenanceCost, toolCost, netSavings: month1Net },
      { month: 2, laborSaved: month2LaborSaved, learningCost: 0, maintenanceCost, toolCost, netSavings: month2Net },
      {
        month: 3,
        laborSaved: month3to6LaborSaved,
        learningCost: 0,
        maintenanceCost,
        toolCost,
        netSavings: month3to6Net,
      },
      {
        month: 4,
        laborSaved: month3to6LaborSaved,
        learningCost: 0,
        maintenanceCost,
        toolCost,
        netSavings: month3to6Net,
      },
      {
        month: 5,
        laborSaved: month3to6LaborSaved,
        learningCost: 0,
        maintenanceCost,
        toolCost,
        netSavings: month3to6Net,
      },
      {
        month: 6,
        laborSaved: month3to6LaborSaved,
        learningCost: 0,
        maintenanceCost,
        toolCost,
        netSavings: month3to6Net,
      },
    ]

    setTool3Data({
      ...formData,
      sixMonthTotal,
      monthlyBreakdown,
    })

    setResults({ sixMonthTotal, monthlyBreakdown })
    setShowResults(true)
  }

  if (showResults && results) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-12">
        <div className="bg-white rounded-3xl shadow-xl p-8">
          <div className="text-center mb-8">
            <p className="text-slate-500 mb-2">תחזית חיסכון ל־6 חודשים</p>
            <div className="text-5xl font-black text-[#0b2e7b]">
              ₪{results.sixMonthTotal.toLocaleString("he-IL", { maximumFractionDigits: 0 })}
            </div>
          </div>

          <div className="overflow-x-auto mb-8">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="py-3 px-2 text-right font-semibold text-slate-600">חודש</th>
                  <th className="py-3 px-2 text-right font-semibold text-slate-600">חיסכון עבודה</th>
                  <th className="py-3 px-2 text-right font-semibold text-slate-600">עלות למידה</th>
                  <th className="py-3 px-2 text-right font-semibold text-slate-600">תחזוקה</th>
                  <th className="py-3 px-2 text-right font-semibold text-slate-600">עלות כלי</th>
                  <th className="py-3 px-2 text-right font-semibold text-[#0b2e7b]">חיסכון נטו</th>
                </tr>
              </thead>
              <tbody>
                {results.monthlyBreakdown.map((row) => (
                  <tr key={row.month} className="border-b border-slate-100">
                    <td className="py-3 px-2">{row.month}</td>
                    <td className="py-3 px-2 text-green-600">
                      ₪{row.laborSaved.toLocaleString("he-IL", { maximumFractionDigits: 0 })}
                    </td>
                    <td className="py-3 px-2 text-red-500">
                      {row.learningCost > 0
                        ? `-₪${row.learningCost.toLocaleString("he-IL", { maximumFractionDigits: 0 })}`
                        : "₪0"}
                    </td>
                    <td className="py-3 px-2 text-red-500">
                      -₪{row.maintenanceCost.toLocaleString("he-IL", { maximumFractionDigits: 0 })}
                    </td>
                    <td className="py-3 px-2 text-red-500">
                      -₪{row.toolCost.toLocaleString("he-IL", { maximumFractionDigits: 0 })}
                    </td>
                    <td className={`py-3 px-2 font-bold ${row.netSavings >= 0 ? "text-green-600" : "text-red-600"}`}>
                      ₪{row.netSavings.toLocaleString("he-IL", { maximumFractionDigits: 0 })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="bg-slate-50 rounded-xl p-4 mb-8 text-sm text-slate-600">
            <p className="font-semibold text-slate-700 mb-2">הסברי החישוב:</p>
            <ul className="space-y-1">
              <li>• חודש 1: עקומת למידה (50% יעילות)</li>
              <li>• חודש 2: שיפור (75% יעילות)</li>
              <li>• חודשים 3-6: יעילות מלאה (100%)</li>
              <li>• ניכינו עלויות תחזוקה ועלות הכלי</li>
            </ul>
          </div>

          <Button
            onClick={() => {
              window.location.href = "/simulator/email-capture"
            }}
            className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-bold rounded-xl py-6 text-lg"
          >
            רוצים את הפירוט המלא? ←
          </Button>
        </div>
      </div>
    )
  }

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <Label htmlFor="hoursPerTask" className="text-lg font-medium text-slate-700 block mb-3">
                כמה שעות לוקחת המשימה לעובד אחד?
              </Label>
              <div className="flex items-center gap-4">
                <Input
                  id="hoursPerTask"
                  type="range"
                  min="0"
                  max="40"
                  value={formData.hoursPerTask}
                  onChange={(e) => setFormData({ ...formData, hoursPerTask: Number(e.target.value) })}
                  className="flex-1"
                />
                <span className="text-2xl font-bold text-[#0b2e7b] min-w-[60px] text-center">
                  {formData.hoursPerTask}
                </span>
              </div>
            </div>
            <Button
              onClick={() => setStep(2)}
              className="w-full bg-[#0b2e7b] hover:bg-[#0a2668] text-white rounded-xl py-6"
            >
              המשך ←
            </Button>
          </div>
        )
      case 2:
        return (
          <div className="space-y-6">
            <div>
              <Label htmlFor="timesPerMonth" className="text-lg font-medium text-slate-700 block mb-3">
                כמה פעמים בחודש מבוצעת המשימה?
              </Label>
              <div className="flex items-center gap-4">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setFormData({ ...formData, timesPerMonth: Math.max(1, formData.timesPerMonth - 1) })}
                >
                  -
                </Button>
                <Input
                  id="timesPerMonth"
                  type="number"
                  min="1"
                  value={formData.timesPerMonth}
                  onChange={(e) => setFormData({ ...formData, timesPerMonth: Number(e.target.value) })}
                  className="text-center text-2xl font-bold w-24"
                />
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setFormData({ ...formData, timesPerMonth: formData.timesPerMonth + 1 })}
                >
                  +
                </Button>
              </div>
            </div>
            <div className="flex gap-4">
              <Button variant="outline" onClick={() => setStep(1)} className="flex-1 rounded-xl py-6">
                <ArrowRight className="w-4 h-4 ml-2" /> חזרה
              </Button>
              <Button
                onClick={() => setStep(3)}
                className="flex-1 bg-[#0b2e7b] hover:bg-[#0a2668] text-white rounded-xl py-6"
              >
                המשך ←
              </Button>
            </div>
          </div>
        )
      case 3:
        return (
          <div className="space-y-6">
            <div>
              <Label htmlFor="hourlyRate" className="text-lg font-medium text-slate-700 block mb-3">
                שכר שעתי ממוצע של המבצע (₪)
              </Label>
              <Input
                id="hourlyRate"
                type="number"
                min="0"
                value={formData.hourlyRate}
                onChange={(e) => setFormData({ ...formData, hourlyRate: Number(e.target.value) })}
                className="text-xl"
              />
            </div>
            <div className="flex gap-4">
              <Button variant="outline" onClick={() => setStep(2)} className="flex-1 rounded-xl py-6">
                <ArrowRight className="w-4 h-4 ml-2" /> חזרה
              </Button>
              <Button
                onClick={() => setStep(4)}
                className="flex-1 bg-[#0b2e7b] hover:bg-[#0a2668] text-white rounded-xl py-6"
              >
                המשך ←
              </Button>
            </div>
          </div>
        )
      case 4:
        return (
          <div className="space-y-6">
            <div>
              <Label className="text-lg font-medium text-slate-700 block mb-3">כמה זמן למידה יידרש לכלי?</Label>
              <div className="grid grid-cols-2 gap-3">
                {["1-2", "3-5", "6-10", "10+"].map((option) => (
                  <button
                    key={option}
                    onClick={() => setFormData({ ...formData, learningHours: option })}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      formData.learningHours === option
                        ? "border-[#0b2e7b] bg-blue-50"
                        : "border-slate-200 hover:border-slate-300"
                    }`}
                  >
                    {option === "10+" ? "יותר מ־10 שעות" : `${option} שעות`}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex gap-4">
              <Button variant="outline" onClick={() => setStep(3)} className="flex-1 rounded-xl py-6">
                <ArrowRight className="w-4 h-4 ml-2" /> חזרה
              </Button>
              <Button
                onClick={() => setStep(5)}
                className="flex-1 bg-[#0b2e7b] hover:bg-[#0a2668] text-white rounded-xl py-6"
              >
                המשך ←
              </Button>
            </div>
          </div>
        )
      case 5:
        return (
          <div className="space-y-6">
            <div>
              <Label htmlFor="maintenanceHours" className="text-lg font-medium text-slate-700 block mb-3">
                זמן תחזוקה חודשי (בדיקות/תיקונים/עדכונים)
              </Label>
              <div className="flex items-center gap-4">
                <Input
                  id="maintenanceHours"
                  type="range"
                  min="0"
                  max="20"
                  value={formData.maintenanceHours}
                  onChange={(e) => setFormData({ ...formData, maintenanceHours: Number(e.target.value) })}
                  className="flex-1"
                />
                <span className="text-2xl font-bold text-[#0b2e7b] min-w-[60px] text-center">
                  {formData.maintenanceHours}
                </span>
              </div>
            </div>
            <div className="flex gap-4">
              <Button variant="outline" onClick={() => setStep(4)} className="flex-1 rounded-xl py-6">
                <ArrowRight className="w-4 h-4 ml-2" /> חזרה
              </Button>
              <Button
                onClick={() => setStep(6)}
                className="flex-1 bg-[#0b2e7b] hover:bg-[#0a2668] text-white rounded-xl py-6"
              >
                המשך ←
              </Button>
            </div>
          </div>
        )
      case 6:
        return (
          <div className="space-y-6">
            <div>
              <Label htmlFor="toolCost" className="text-lg font-medium text-slate-700 block mb-3">
                עלות חודשית של הכלי (אם ידועה)
              </Label>
              <Input
                id="toolCost"
                type="number"
                min="0"
                value={formData.toolCost}
                onChange={(e) => setFormData({ ...formData, toolCost: Number(e.target.value) })}
                placeholder="₪/חודש"
                className="text-xl"
              />
              <p className="text-sm text-slate-500 mt-2">לא בטוח? השאירו 0 — נבצע הערכה.</p>
            </div>
            <div className="flex gap-4">
              <Button variant="outline" onClick={() => setStep(5)} className="flex-1 rounded-xl py-6">
                <ArrowRight className="w-4 h-4 ml-2" /> חזרה
              </Button>
              <Button
                onClick={calculateROI}
                className="flex-1 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-bold rounded-xl py-6"
              >
                חשב ROI ←
              </Button>
            </div>
          </div>
        )
    }
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <div className="mb-8">
        <div className="text-sm text-slate-500 mb-2">שאלה {step} מתוך 6</div>
        <div className="h-1 bg-slate-100 rounded-full">
          <div className="h-full bg-[#0b2e7b] rounded-full transition-all" style={{ width: `${(step / 6) * 100}%` }} />
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-xl p-8">{renderStep()}</div>
    </div>
  )
}
