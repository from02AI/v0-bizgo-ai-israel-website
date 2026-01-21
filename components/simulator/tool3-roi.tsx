"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowRight, AlertTriangle, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useSimulator } from "@/contexts/simulator-context"

// Conservative adoption curve based on change management research
// Month 1: -10% (learning dip), then gradual improvement
const adoptionCurve = [-0.10, 0.20, 0.50, 0.70, 0.85, 0.90]

// Calculate learning hours from Tool1 & Tool2 data
function calculateLearningHours(tool1Score: number, tool2Capacity: number): number {
  // Base learning hours from task complexity (Tool1 score 0-10)
  // Higher score (easier task) = less learning needed
  const baseHours = 20 - tool1Score * 1.5 // 20h (hard) to 5h (easy)
  
  // Capacity multiplier from Tool2 (inverted 10-slider means low capacity = high risk)
  // High capacity (low q4 value) = faster learning; Low capacity (high q4 value) = slower
  const capacityMultiplier = 1 + (tool2Capacity - 5) * 0.1 // 0.6x to 1.5x
  
  return Math.max(2, Math.min(20, Math.round(baseHours * capacityMultiplier)))
}

// Recommend tool tier based on Tool1 complexity (granular score-based ranges)
function recommendToolTier(tool1Score: number): { tier: string; minBudget: number; maxBudget: number; maintenance: number } {
  if (tool1Score >= 9) {
    // Score 9-10: Very simple, routine tasks
    return { tier: "כלים פשוטים", minBudget: 50, maxBudget: 150, maintenance: 1 }
  } else if (tool1Score >= 7) {
    // Score 7-8: Simple tasks with some customization
    return { tier: "כלים בסיסיים", minBudget: 100, maxBudget: 250, maintenance: 1.5 }
  } else if (tool1Score >= 5) {
    // Score 5-6: Moderate complexity
    return { tier: "כלים בתשלום", minBudget: 200, maxBudget: 500, maintenance: 2 }
  } else if (tool1Score >= 3) {
    // Score 3-4: Complex tasks
    return { tier: "כלים מתקדמים", minBudget: 600, maxBudget: 1500, maintenance: 3 }
  } else {
    // Score 0-2: Very complex/critical tasks
    return { tier: "פתרונות ארגוניים", minBudget: 1500, maxBudget: 4000, maintenance: 5 }
  }
}

export function Tool3ROI() {
  const router = useRouter()
  const { setTool3Data, tool2Data, tool1Data, tool3Data } = useSimulator()
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    hoursPerWeek: 5,
    numEmployees: 3,
    hourlyRate: 100,
    monthlyBudget: 0,
  })
  const [techComfort, setTechComfort] = useState<'high' | 'medium' | 'low' | 'none'>('medium')
  const [implementationProfile, setImplementationProfile] = useState<'self' | 'minimal' | 'full'>('minimal')
  const [budgetMode, setBudgetMode] = useState<'simulator' | 'preferred'>('simulator')
  const [showResults, setShowResults] = useState(false)
  const [results, setResults] = useState<{
    sixMonthTotal: number
    breakEvenMonth: number
    riskAdjusted: boolean
    recommendedTier: string
    budgetStatus: "sufficient" | "low" | "high"
    monthlyBreakdown: {
      month: number
      laborSaved: number
      learningCost: number
      maintenanceCost: number
      toolCost: number
      netSavings: number
      cumulativeSavings: number
    }[]
  } | null>(null)
  const [savedReportId, setSavedReportId] = useState<string | null>(null)

  const calculateROI = async () => {
    // Defensive sanitization of numeric inputs (clamp to reasonable ranges)
    const clamp = (v: number, a: number, b: number) => Math.max(a, Math.min(b, Number.isFinite(v) ? v : a))
    const hoursPerWeek = clamp(formData.hoursPerWeek, 0, 168)
    const numEmployees = Math.max(1, Math.round(clamp(formData.numEmployees, 1, 1000)))
    const hourlyRate = clamp(formData.hourlyRate, 1, 10000)
    const monthlyBudget = Math.max(0, Number.isFinite(formData.monthlyBudget) ? formData.monthlyBudget : 0)

    // Auto-calculate learning hours from Tool1 & Tool2 (sanitize external values)
    const tool1Score = clamp(tool1Data?.score ?? 5, 0, 10)
    const tool2Capacity = clamp(tool2Data?.q4 ?? 5, 1, 10)
    const learningHours = calculateLearningHours(tool1Score, tool2Capacity)
    
    // Get tool recommendation
    const recommendation = recommendToolTier(tool1Score)
    // Estimate a conservative-moderate minimum budget using all relevant inputs
    const estimateMinBudget = (() => {
      let base = recommendation.minBudget || 0
      // adjust for Tool2 risk status
      if (tool2Data?.status === 'yellow') base *= 1.15
      else if (tool2Data?.status === 'red') base *= 1.4

      // adjust for data sensitivity (tool2 q3 higher means more costly compliance/custom work)
      const dataRisk = tool2Data?.q3 ?? 5
      if (dataRisk >= 7) base *= 1.25
      else if (dataRisk >= 4) base *= 1.1

      // tech comfort multiplier (research-based digital literacy impact)
      const techComfortMap: Record<string, number> = {
        high: 0.75,   // Tech-savvy: 25% faster learning/integration
        medium: 1.0,  // Baseline
        low: 1.5,     // 50% more time/support needed
        none: 2.2,    // Manual workflows transitioning: 2.2x multiplier
      }
      base *= techComfortMap[techComfort] ?? 1.0

      // implementation profile mapping: who will implement and expected external help
      const profileMap: Record<string, { techMul: number; assistanceFactor: number }> = {
        self: { techMul: 0.9, assistanceFactor: 0 }, // we do it ourselves
        minimal: { techMul: 1.0, assistanceFactor: 0.25 }, // light external help
        full: { techMul: 1.15, assistanceFactor: 1.0 }, // full external implementation
      }

      const profile = profileMap[implementationProfile]
      if (profile) base *= profile.techMul

      const assistanceEstimate = Math.round(base * (profile ? profile.assistanceFactor : 0))
      const final = Math.max(0, Math.round(base + assistanceEstimate))
      return final
    })()

    // Determine which budget to use: simulator estimate or user's preferred
    const monthlyBudgetUsed = budgetMode === 'simulator' ? estimateMinBudget : monthlyBudget

    const toolCostPerMonth = Math.min(monthlyBudgetUsed, recommendation.maxBudget || monthlyBudgetUsed)
    const maintenanceHoursPerMonth = recommendation.maintenance
    
    // Determine budget status
    let budgetStatus: "sufficient" | "low" | "high" = "sufficient"
    if (monthlyBudget < recommendation.minBudget) budgetStatus = "low"
    else if (recommendation.maxBudget > 0 && monthlyBudget > recommendation.maxBudget * 1.5) budgetStatus = "high"
    
    // Calculate monthly labor hours (hours/week × 4.33 weeks/month × num employees)
    const monthlyLaborHours = hoursPerWeek * 4.33 * numEmployees
    const monthlyLaborValue = monthlyLaborHours * hourlyRate
    
    // Calculate costs with team learning economies
    // First employee: full learning time
    // Employees 2-5: 75% time (peer learning benefit)
    // Employees 6+: 85% time (diminishing returns + coordination overhead)
    const calculateTeamLearningCost = (hours: number, rate: number, employees: number): number => {
      if (employees === 1) return hours * rate
      
      let totalHours = hours // First employee
      const smallTeamCount = Math.min(employees - 1, 4)
      totalHours += smallTeamCount * (hours * 0.75)
      
      if (employees > 5) {
        const largeTeamCount = employees - 5
        totalHours += largeTeamCount * (hours * 0.85)
      }
      
      return totalHours * rate
    }
    
    const learningCost = calculateTeamLearningCost(learningHours, hourlyRate, numEmployees)
    const maintenanceCostPerMonth = maintenanceHoursPerMonth * hourlyRate
    
    // Risk adjustment multiplier from Tool2
    let riskMultiplier = 1.0
    let riskAdjusted = false
    if (tool2Data?.status === "yellow") {
      riskMultiplier = 1.15
      riskAdjusted = true
    } else if (tool2Data?.status === "red") {
      riskMultiplier = 1.40
      riskAdjusted = true
    }
    
    // Calculate adjusted costs
    const adjustedMaintenanceCost = maintenanceCostPerMonth * riskMultiplier
    // assistance monthly cost estimate (conservative-moderate): proportional to recommendation
    const profileMapMonthly: Record<string, number> = {
      self: 0,
      minimal: 0.25,
      full: 1.0,
    }
    const assistFactorMonthly = profileMapMonthly[implementationProfile] ?? 0
    const assistanceMonthly = Math.round(recommendation.minBudget * assistFactorMonthly)
    const adjustedToolCost = toolCostPerMonth + assistanceMonthly
    
    // Calculate 6-month breakdown with conservative adoption curve
    const monthlyBreakdown = adoptionCurve.map((efficiency, index) => {
      const month = index + 1
      const laborSaved = monthlyLaborValue * efficiency
      const learningCostThisMonth = month === 1 ? learningCost : 0
      const netSavings = laborSaved - learningCostThisMonth - adjustedMaintenanceCost - adjustedToolCost

      return {
        month,
        laborSaved,
        learningCost: learningCostThisMonth,
        maintenanceCost: adjustedMaintenanceCost,
        toolCost: adjustedToolCost,
        netSavings,
        cumulativeSavings: 0, // Will calculate below
      }
    })
    
    // Calculate cumulative savings and find break-even month
    let cumulative = 0
    let breakEvenMonth = 7 // Default to beyond 6 months
    monthlyBreakdown.forEach((row) => {
      cumulative += row.netSavings
      row.cumulativeSavings = cumulative
      if (breakEvenMonth === 7 && cumulative >= 0) {
        breakEvenMonth = row.month
      }
    })

    const sixMonthTotal = cumulative
    
    // Generate labels for PDF
    const getTechnicalComfortLabel = (comfort: 'high' | 'medium' | 'low' | 'none') => {
      const labels = {
        high: 'גבוהה — תשתיות ואינטגרציות',
        medium: 'בינונית — כלים דיגיטליים',
        low: 'נמוכה — שימוש נקודתי',
        none: 'אין ניסיון / ידני'
      }
      return labels[comfort]
    }

    const getImplementationProfileLabel = (profile: 'self' | 'minimal' | 'full') => {
      const labels = {
        self: 'אני בעצמי (ללא עלויות חיצוניות)',
        minimal: 'נדרשת עזרה חיצונית מינימלית',
        full: 'נדרשת עזרה חיצונית מלאה'
      }
      return labels[profile]
    }

    setTool3Data({
      hoursPerWeek,
      numEmployees,
      hourlyRate,
      learningHours,
      sixMonthTotal,
      breakEvenMonth,
      riskAdjusted,
      monthlyBreakdown,
      estimatedMinBudget: estimateMinBudget,
      monthlyBudgetUsed,
      implementationProfile,
      tool1Score: tool1Score,
      tool2Status: tool2Data?.status ?? null,
      technicalComfort: techComfort,
      technicalComfortLabel: getTechnicalComfortLabel(techComfort),
      implementationProfileLabel: getImplementationProfileLabel(implementationProfile),
      recommendedTier: recommendation.tier,
      budgetMin: recommendation.minBudget,
      budgetMax: recommendation.maxBudget,
    })
    
    setResults({ 
      sixMonthTotal, 
      breakEvenMonth, 
      riskAdjusted, 
      recommendedTier: recommendation.tier,
      budgetStatus,
      monthlyBreakdown 
    })
    setShowResults(true)
    // Save report to provider DB (non-blocking for UX). If it fails, we still show results.
    try {
      const payload = { tool1Data, tool2Data, tool3Data: {
        hoursPerWeek,
        numEmployees,
        hourlyRate,
        learningHours,
        sixMonthTotal,
        breakEvenMonth,
        riskAdjusted,
        monthlyBreakdown,
        estimatedMinBudget: estimateMinBudget,
        monthlyBudgetUsed,
        implementationProfile,
        tool1Score,
        tool2Status: tool2Data?.status ?? null,
        technicalComfort: techComfort,
        technicalComfortLabel: getTechnicalComfortLabel(techComfort),
        implementationProfileLabel: getImplementationProfileLabel(implementationProfile),
        recommendedTier: recommendation.tier,
        budgetMin: recommendation.minBudget,
        budgetMax: recommendation.maxBudget
      }}

      const resp = await fetch('/api/save-report', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      if (resp.ok) {
        const j = await resp.json()
        if (j?.id) {
          const idStr = String(j.id)
          setSavedReportId(idStr)
          try { localStorage.setItem('bizgo.savedReportId', idStr) } catch (e) { /* ignore */ }
        }
      } else {
        const text = await resp.text().catch(() => '')
        console.warn('Failed to save report', resp.status, text)
      }
    } catch (err) {
      console.warn('Error saving report', err)
    }
  }

  if (showResults && results) {
    const statusInfoMap = {
      green: { emoji: "✅", text: "חסכון בסיסי (סיכון נמוך)", color: "text-green-600" },
      yellow: { emoji: "⚠️", text: "חסכון מותאם (סיכון בינוני +15%)", color: "text-yellow-600" },
      red: { emoji: "🔴", text: "חסכון מותאם (סיכון גבוה +40%)", color: "text-red-600" },
    } as const

    const statusInfo = tool2Data?.status ? statusInfoMap[tool2Data.status as keyof typeof statusInfoMap] : null

    return (
      <div className="max-w-3xl mx-auto px-4 py-8 sm:py-12">
        <div className="bg-white rounded-3xl shadow-xl p-6 sm:p-8 relative">
          <div className="text-center mb-6 sm:mb-8">
            <p className="text-sm sm:text-base text-slate-500 mb-2">תחזית חיסכון ל־6 חודשים</p>
            <div className="text-3xl sm:text-4xl md:text-5xl font-black text-[#0b2e7b] mb-2">
              ₪{results.sixMonthTotal.toLocaleString("he-IL", { maximumFractionDigits: 0 })}
            </div>
            <p className="text-sm text-slate-500 mt-1">
              טווח אפשרי: ₪{Math.round(results.sixMonthTotal * 0.75).toLocaleString("he-IL")} - ₪{Math.round(results.sixMonthTotal * 1.25).toLocaleString("he-IL")}
            </p>
            <p className="text-xs text-slate-400 mt-1">
              (תלוי בקצב אימוץ בפועל ובעיות טכניות לא צפויות)
            </p>
            {/* status line removed per request */}
            <p className="text-slate-600 mt-2 text-sm">
              נקודת איזון: {results.breakEvenMonth <= 6 ? `חודש ${results.breakEvenMonth}` : "מעבר ל-6 חודשים"}
            </p>
            
              {/* detail block removed per request */}
          </div>

          <div className="flex items-start gap-3 bg-yellow-50 border border-yellow-100 rounded-xl p-3 mb-4 text-right">
            <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5 shrink-0" />
            <p className="text-sm text-yellow-800">
              הסימולטור מספק הערכה כללית בלבד ואינו מהווה ייעוץ מקצועי. הערכה זו מתבססת על הנחות ומידע שהזנתם; היא אינדיקטיבית בלבד ותיתכן שונות בתנאים אמיתיים. אין לראות בתוצאה התחייבות.
            </p>
          </div>

          {/* Primary action placed above the blurred table */}
          <div className="mb-4 space-y-3">
            <Button
              onClick={() => {
                router.push("/simulator/email-capture")
              }}
              className="w-full bg-linear-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-bold rounded-xl py-4 sm:py-6 px-6 sm:px-10 text-base sm:text-lg min-h-[44px]"
            >
              שלחו לי את התוצאות המלאות למייל ←
            </Button>
          </div>

          <div className="overflow-x-auto mb-4 filter blur-sm">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="py-3 px-2 text-right font-semibold text-slate-600">חודש</th>
                  <th className="py-3 px-2 text-right font-semibold text-slate-600">חיסכון</th>
                  <th className="py-3 px-2 text-right font-semibold text-slate-600">עלויות</th>
                  <th className="py-3 px-2 text-right font-semibold text-[#0b2e7b]">נטו</th>
                  <th className="py-3 px-2 text-right font-semibold text-[#0b2e7b]">מצטבר</th>
                </tr>
              </thead>
              <tbody>
                {results.monthlyBreakdown.map((row) => (
                  <tr key={row.month} className="border-b border-slate-100">
                    <td className="py-3 px-2">{row.month}</td>
                    <td className="py-3 px-2 text-green-600">
                      +₪{row.laborSaved.toLocaleString("he-IL", { maximumFractionDigits: 0 })}
                    </td>
                    <td className="py-3 px-2 text-red-500">
                      -₪
                      {(row.learningCost + row.maintenanceCost + row.toolCost).toLocaleString("he-IL", {
                        maximumFractionDigits: 0,
                      })}
                    </td>
                    <td className={`py-3 px-2 font-bold ${row.netSavings >= 0 ? "text-green-600" : "text-red-600"}`}>
                      {row.netSavings >= 0 ? "+" : ""}₪{row.netSavings.toLocaleString("he-IL", { maximumFractionDigits: 0 })}
                    </td>
                    <td className={`py-3 px-2 font-bold ${row.cumulativeSavings >= 0 ? "text-green-600" : "text-red-600"}`}>
                      {row.cumulativeSavings >= 0 ? "+" : ""}₪{row.cumulativeSavings.toLocaleString("he-IL", { maximumFractionDigits: 0 })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Skip link displayed as plain text under the table */}
          <div className="text-center mt-4">
            <a href="/" className="text-sm text-slate-500 hover:text-slate-700">מוותר על הדוח - חזרה לאתר</a>
          </div>
        </div>
      </div>
    )
  }

  const renderStep = () => {
    // Get mission title from Tool1 (empty when not provided)
    const missionTitle = tool1Data?.taskName ?? ""
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-[#0b2e7b] mb-6 text-right">
              {missionTitle ? `כמה שעות בממוצע בשבוע לוקחת המשימה "${missionTitle}" לעובד אחד?` : "כמה שעות בממוצע בשבוע לוקחת המשימה?"}
            </h3>
            <div>
              <div className="flex items-center gap-4 mb-6">
                <Input
                  id="hoursPerWeek"
                  type="range"
                  min="1"
                  max="20"
                  step="0.5"
                  value={formData.hoursPerWeek}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, hoursPerWeek: Number(e.target.value) })}
                  className="flex-1"
                />
                <span className="text-3xl font-bold text-[#0b2e7b] min-w-20 text-center">
                  {formData.hoursPerWeek}h
                </span>
              </div>
            </div>

            <div className="border-t pt-6">
              <Label htmlFor="numEmployees" className="text-lg font-medium text-slate-700 block mb-4 text-right">
                כמה עובדים בפועל מבצעים את המשימה?
              </Label>
              <div className="flex items-center gap-4">
                <Input
                  id="numEmployees"
                  type="range"
                  min="1"
                  max="30"
                  value={formData.numEmployees}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, numEmployees: Number(e.target.value) })}
                  className="flex-1"
                />
                <span className="text-3xl font-bold text-[#0b2e7b] min-w-20 text-center">
                  ×{formData.numEmployees}
                </span>
              </div>
              <p className="text-sm text-slate-500 mt-3 text-right">
                סה"כ זמן צוות שבועי: {(formData.hoursPerWeek * formData.numEmployees).toFixed(1)} שעות
              </p>
            </div>

            <div className="border-t pt-6">
              <Label className="text-lg font-medium text-slate-700 block mb-4 text-right">עלות שעת עבודה ממוצעת (₪)</Label>
              <div className="flex items-center gap-4 mb-4">
                <Input
                  id="hourlyRate"
                  type="range"
                  min="50"
                  max="250"
                  step="5"
                  value={formData.hourlyRate}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, hourlyRate: Number(e.target.value) })}
                  className="flex-1"
                />
                <span className="text-3xl font-bold text-[#0b2e7b] min-w-20 text-center">₪{formData.hourlyRate}</span>
              </div>
              <p className="text-sm text-slate-500 mt-2 text-right">
                עלות חודשית נוכחית: ₪{(formData.hoursPerWeek * 4.33 * formData.numEmployees * formData.hourlyRate).toLocaleString("he-IL", { maximumFractionDigits: 0 })}
              </p>
            </div>

            <Button
              onClick={() => setStep(2)}
              className="w-full bg-linear-to-r from-amber-500 to-amber-600 text-white rounded-xl py-6 mt-6"
            >
              המשך ←
            </Button>
          </div>
        )

      case 2:
        // Q2: Organizational readiness for adopting AI (focus on business tech usage)
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-[#0b2e7b] mb-4 text-right">
              {missionTitle
                ? `מה רמת המוכנות הטכנולוגית של העסק להטמעת AI עבור המשימה "${missionTitle}"?`
                : `מה רמת המוכנות הטכנולוגית של הארגון לאימוץ AI?`}
            </h3>
            <div className="space-y-3">
                <button onClick={() => { setTechComfort('high'); setStep(3); }} className="w-full text-right p-4 bg-slate-50 hover:bg-blue-50 border-2 border-slate-200 hover:border-blue-300 rounded-xl transition-all font-medium text-slate-700">
                  <div className="font-semibold">גבוהה — תשתיות ואינטגרציות</div>
                  <div className="text-sm text-slate-600">כלים מזהים: APIs פנימיים/חיצוניים, מחסן נתונים (DW), ETL/אינטגרציות אוטומטיות, צוות פיתוח/DevOps.</div>
                </button>
                <button onClick={() => { setTechComfort('medium'); setStep(3); }} className="w-full text-right p-4 bg-slate-50 hover:bg-blue-50 border-2 border-slate-200 hover:border-blue-300 rounded-xl transition-all font-medium text-slate-700">
                  <div className="font-semibold">בינונית — כלים דיגיטליים ושילובים בסיסיים</div>
                  <div className="text-sm text-slate-600">כלים מזהים: SaaS (CRM/ERP), גליונות (Google/Excel), כלים חיבור קלה (Zapier/Make), APIs חלקיים.</div>
                </button>
                <button onClick={() => { setTechComfort('low'); setStep(3); }} className="w-full text-right p-4 bg-slate-50 hover:bg-blue-50 border-2 border-slate-200 hover:border-blue-300 rounded-xl transition-all font-medium text-slate-700">
                  <div className="font-semibold">נמוכה — שימוש נקודתי בכלים</div>
                  <div className="text-sm text-slate-600">כלים מזהים: גליונות/CSV, קבצים ידניים, טפסים, פתרונות נקודתיים ללא אינטגרציה.</div>
                </button>
                <button onClick={() => { setTechComfort('none'); setStep(3); }} className="w-full text-right p-4 bg-slate-50 hover:bg-blue-50 border-2 border-slate-200 hover:border-blue-300 rounded-xl transition-all font-medium text-slate-700">
                  <div className="font-semibold">אין נסיון / ידני (מאוד נמוכה)</div>
                  <div className="text-sm text-slate-600">כלים מזהים: תהליכים ידניים, נייר/קבצים מפוזרים. </div>
                </button>
            </div>

            <div className="mt-6">
              <button onClick={() => setStep(1)} className="mt-6 flex items-center gap-2 text-slate-500 hover:text-slate-700 transition-colors">
                <ArrowRight className="w-4 h-4" />
                חזרה לשאלה הקודמת
              </button>
            </div>
          </div>
        )

      case 3:
        // Implementation step (who will implement) - moved to step 3
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-[#0b2e7b] mb-4 text-right">
              {missionTitle ? `מי יבצעו את הטמעת כלי AI למשימה "${missionTitle}"?` : `מי יבצעו את הטמעת כלי AI?`}
            </h3>
            <div className="space-y-3">
              <button onClick={() => { setImplementationProfile('self'); setStep(4); }} className="w-full text-right p-4 bg-slate-50 hover:bg-blue-50 border-2 border-slate-200 hover:border-blue-300 rounded-xl transition-all font-medium text-slate-700">
                <div className="font-semibold">אני בעצמי</div>
                <div className="text-sm text-slate-600">נבחן וניישם פנימית ללא עלות חיצונית משמעותית.</div>
              </button>
              <button onClick={() => { setImplementationProfile('minimal'); setStep(4); }} className="w-full text-right p-4 bg-slate-50 hover:bg-blue-50 border-2 border-slate-200 hover:border-blue-300 rounded-xl transition-all font-medium text-slate-700">
                <div className="font-semibold">עזרה מינימלית</div>
                <div className="text-sm text-slate-600">סיוע חיצוני חלקי בלבד — הגדרות והדרכה קצרה.</div>
              </button>
              <button onClick={() => { setImplementationProfile('full'); setStep(4); }} className="w-full text-right p-4 bg-slate-50 hover:bg-blue-50 border-2 border-slate-200 hover:border-blue-300 rounded-xl transition-all font-medium text-slate-700">
                <div className="font-semibold">עזרה מלאה</div>
                <div className="text-sm text-slate-600">הטמעה מלאה על ידי ספק חיצוני כולל פיתוח ותמיכה.</div>
                <div className="text-xs text-slate-500 mt-1">עלות הטמעה חד-פעמית: ₪3,000 - ₪20,000+ (משתנה לפי מורכבות)</div>
              </button>
            </div>

            <div className="mt-6">
              <button onClick={() => setStep(2)} className="mt-6 flex items-center gap-2 text-slate-500 hover:text-slate-700 transition-colors">
                <ArrowRight className="w-4 h-4" />
                חזרה לשאלה הקודמת
              </button>
            </div>
          </div>
        )
      case 4:
        const tool1Score = tool1Data?.score || 5
        const recommendation = recommendToolTier(tool1Score)
        const isBudgetLow = formData.monthlyBudget > 0 && formData.monthlyBudget < recommendation.minBudget
        const isBudgetHigh =
          recommendation.maxBudget > 0 && formData.monthlyBudget > recommendation.maxBudget * 1.5

        return (
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-[#0b2e7b] mb-4 text-right">
              {missionTitle ? `מה התקציב החודשי שאתם מוכנים להשקיע בכלי AI למשימה "${missionTitle}"?` : 'מה התקציב החודשי שאתם מוכנים להשקיע בכלי AI?'}
            </h3>

            <div>
              <div className="flex gap-3 mb-4">
                <button
                  type="button"
                  onClick={() => setBudgetMode('simulator')}
                  className={`px-4 py-2 rounded-xl text-sm font-medium ${budgetMode === 'simulator' ? 'bg-linear-to-r from-amber-500 to-amber-600 text-white' : 'bg-slate-50 text-slate-700 border border-slate-200'}`}
                >
                  הערכת סימולטור
                </button>
                <button
                  type="button"
                  onClick={() => setBudgetMode('preferred')}
                  className={`px-4 py-2 rounded-xl text-sm font-medium ${budgetMode === 'preferred' ? 'bg-linear-to-r from-amber-500 to-amber-600 text-white' : 'bg-slate-50 text-slate-700 border border-slate-200'}`}
                >
                  תקציב מועדף
                </button>
              </div>

              <Label htmlFor="monthlyBudget" className="text-base font-medium text-slate-700 block mb-3 text-right">
                תקציב חודשי (₪)
              </Label>
              <Input
                id="monthlyBudget"
                type="number"
                min="0"
                value={budgetMode === 'simulator' ? (recommendation.minBudget > 0 ? recommendation.minBudget : formData.monthlyBudget) : formData.monthlyBudget}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, monthlyBudget: Number(e.target.value) })}
                className="text-xl"
                placeholder={recommendation.minBudget > 0 ? `${recommendation.minBudget}` : "0"}
                disabled={budgetMode === 'simulator'}
              />
              {budgetMode === 'simulator' && (
                <p className="text-sm text-slate-500 mt-2 text-right"> ההערכה מבוססת על נתוני המשימה שהזנת. ניתן לבחור "תקציב מועדף" לשינוי הסכום
.</p>
              )}
            </div>

            {/* Budget feedback */}
            {formData.monthlyBudget > 0 && isBudgetLow && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 text-right">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5 shrink-0" />
                  <div className="text-sm text-yellow-800">
                    <p className="font-bold">התקציב נמוך מהמומלץ</p>
                    <p>
                      למשימה מסוג זה מומלץ תקציב של לפחות ₪{recommendation.minBudget}/חודש. תקציב נמוך עלול להגביל
                      את היעילות.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {formData.monthlyBudget > 0 && !isBudgetLow && !isBudgetHigh && (
              <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-right">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 shrink-0" />
                  <div className="text-sm text-green-800">
                    <p className="font-bold">תקציב מתאים!</p>
                    <p>התקציב שהזנתם מספיק עבור כלי איכותי למשימה.</p>
                  </div>
                </div>
              </div>
            )}

            {formData.monthlyBudget > 0 && isBudgetHigh && (
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-right">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-blue-600 mt-0.5 shrink-0" />
                  <div className="text-sm text-blue-800">
                    <p className="font-bold">תקציב גבוה מהנדרש</p>
                    <p>
                      למשימה זו, תקציב של ₪{recommendation.maxBudget || 300}/חודש כבר מספק. אפשר לחסוך או להשקיע
                      בתכונות מתקדמות.
                    </p>
                  </div>
                </div>
              </div>
            )}

            <div className="flex gap-4 mt-6">
              <Button variant="outline" onClick={() => setStep(3)} className="flex-1 rounded-xl py-6">
                <ArrowRight className="w-4 h-4 ml-2" /> חזרה
              </Button>
              <Button
                onClick={calculateROI}
                className="flex-1 bg-linear-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-bold rounded-xl py-6"
              >
                חישוב תוצאות ←
              </Button>
            </div>
          </div>
        )
    }
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      {/* Progress dots */}
      <div className="mb-8 flex justify-center">
        <div className="flex items-center gap-3">
          {[1, 2, 3, 4].map((dotStep) => (
            <span
              key={dotStep}
              className={`w-3 h-3 rounded-full transition-colors ${
                dotStep === step ? "bg-blue-600" : "bg-slate-200"
              }`}
            />
          ))}
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-xl p-8">{renderStep()}</div>
    </div>
  )
}
