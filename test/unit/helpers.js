// Helper functions copied from simulator logic for unit testing
const adoptionCurve = [-0.10, 0.20, 0.50, 0.70, 0.85, 0.90]

function calculateLearningHours(tool1Score, tool2Capacity) {
  const baseHours = 20 - tool1Score * 1.5
  const capacityMultiplier = 1 + (tool2Capacity - 5) * 0.1
  return Math.max(2, Math.min(20, Math.round(baseHours * capacityMultiplier)))
}

function recommendToolTier(tool1Score) {
  if (tool1Score >= 9) return { tier: 'כלים פשוטים', minBudget: 50, maxBudget: 150, maintenance: 1 }
  if (tool1Score >= 7) return { tier: 'כלים בסיסיים', minBudget: 100, maxBudget: 250, maintenance: 1.5 }
  if (tool1Score >= 5) return { tier: 'כלים בתשלום', minBudget: 200, maxBudget: 500, maintenance: 2 }
  if (tool1Score >= 3) return { tier: 'כלים מתקדמים', minBudget: 600, maxBudget: 1500, maintenance: 3 }
  return { tier: 'פתרונות ארגוניים', minBudget: 1500, maxBudget: 4000, maintenance: 5 }
}

function calculateROI({ hoursPerWeek, numEmployees, hourlyRate, monthlyBudget }, tool1Data, tool2Data, opts) {
  const tool1Score = tool1Data?.score ?? 5
  const tool2Capacity = tool2Data?.q4 ?? 5
  const learningHours = calculateLearningHours(tool1Score, tool2Capacity)

  const recommendation = recommendToolTier(tool1Score)

  const estimateMinBudget = (() => {
    let base = recommendation.minBudget || 0
    if (tool2Data?.status === 'yellow') base *= 1.15
    else if (tool2Data?.status === 'red') base *= 1.4

    const dataRisk = tool2Data?.q3 ?? 5
    if (dataRisk >= 7) base *= 1.25
    else if (dataRisk >= 4) base *= 1.1

    const techComfortMap = { high: 0.75, medium: 1.0, low: 1.5, none: 2.2 }
    base *= techComfortMap[opts.techComfort] ?? 1.0

    const profileMap = { self: { techMul: 0.9, assistanceFactor: 0 }, minimal: { techMul: 1.0, assistanceFactor: 0.25 }, full: { techMul: 1.15, assistanceFactor: 1.0 } }
    const profile = profileMap[opts.implementationProfile]
    if (profile) base *= profile.techMul
    const assistanceEstimate = Math.round(base * (profile ? profile.assistanceFactor : 0))
    return Math.max(0, Math.round(base + assistanceEstimate))
  })()

  const monthlyBudgetUsed = opts.budgetMode === 'simulator' ? estimateMinBudget : monthlyBudget
  const toolCostPerMonth = Math.min(monthlyBudgetUsed, recommendation.maxBudget || monthlyBudgetUsed)
  const maintenanceHoursPerMonth = recommendation.maintenance

  const monthlyLaborHours = hoursPerWeek * 4.33 * numEmployees
  const monthlyLaborValue = monthlyLaborHours * hourlyRate

  const calculateTeamLearningCost = (hours, rate, employees) => {
    if (employees === 1) return hours * rate
    let totalHours = hours
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

  let riskMultiplier = 1.0
  if (tool2Data?.status === 'yellow') riskMultiplier = 1.15
  else if (tool2Data?.status === 'red') riskMultiplier = 1.40

  const adjustedMaintenanceCost = maintenanceCostPerMonth * riskMultiplier
  const profileMapMonthly = { self: 0, minimal: 0.25, full: 1.0 }
  const assistFactorMonthly = profileMapMonthly[opts.implementationProfile] ?? 0
  const assistanceMonthly = Math.round(recommendation.minBudget * assistFactorMonthly)
  const adjustedToolCost = toolCostPerMonth + assistanceMonthly

  const monthlyBreakdown = adoptionCurve.map((efficiency, index) => {
    const month = index + 1
    const laborSaved = monthlyLaborValue * efficiency
    const learningCostThisMonth = month === 1 ? learningCost : 0
    const netSavings = laborSaved - learningCostThisMonth - adjustedMaintenanceCost - adjustedToolCost
    return { month, laborSaved, learningCost: learningCostThisMonth, maintenanceCost: adjustedMaintenanceCost, toolCost: adjustedToolCost, netSavings, cumulativeSavings: 0 }
  })

  let cumulative = 0
  let breakEvenMonth = 7
  monthlyBreakdown.forEach((row) => { cumulative += row.netSavings; row.cumulativeSavings = cumulative; if (breakEvenMonth === 7 && cumulative >= 0) breakEvenMonth = row.month })

  return { learningHours, recommendation, estimateMinBudget, monthlyBudgetUsed, monthlyBreakdown, sixMonthTotal: cumulative, breakEvenMonth }
}

module.exports = { calculateLearningHours, recommendToolTier, calculateROI }
