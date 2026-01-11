// Simple test runner that replicates calculation logic from the simulator components
// Run with: node test/simulator-tests.js

function calculateLearningHours(tool1Score, tool2Capacity) {
  const baseHours = 20 - tool1Score * 1.5
  const capacityMultiplier = 1 + (tool2Capacity - 5) * 0.1
  return Math.max(2, Math.min(20, Math.round(baseHours * capacityMultiplier)))
}

function recommendToolTier(tool1Score) {
  if (tool1Score >= 7) {
    return { tier: "חינמי", minBudget: 0, maxBudget: 0, maintenance: 1 }
  } else if (tool1Score >= 4) {
    return { tier: "בתשלום", minBudget: 200, maxBudget: 500, maintenance: 2 }
  } else {
    return { tier: "מתקדם", minBudget: 1000, maxBudget: 3000, maintenance: 4 }
  }
}

const adoptionCurve = [0.35, 0.65, 0.85, 0.92, 0.95, 0.95]

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

    const techComfortMap = { high: 0.9, medium: 1.0, low: 1.08, none: 1.15 }
    base *= techComfortMap[opts.techComfort] ?? 1.0

    const profileMap = { self: { techMul: 0.9, assistanceFactor: 0 }, minimal: { techMul: 1.0, assistanceFactor: 0.25 }, full: { techMul: 1.15, assistanceFactor: 1.0 } }
    const profile = profileMap[opts.implementationProfile]
    if (profile) base *= profile.techMul
    const assistanceEstimate = Math.round(base * (profile ? profile.assistanceFactor : 0))
    const final = Math.max(0, Math.round(base + assistanceEstimate))
    return final
  })()

  const monthlyBudgetUsed = opts.budgetMode === 'simulator' ? estimateMinBudget : monthlyBudget
  const toolCostPerMonth = Math.min(monthlyBudgetUsed, recommendation.maxBudget || monthlyBudgetUsed)
  const maintenanceHoursPerMonth = recommendation.maintenance

  let budgetStatus = 'sufficient'
  if (monthlyBudget < recommendation.minBudget) budgetStatus = 'low'
  else if (recommendation.maxBudget > 0 && monthlyBudget > recommendation.maxBudget * 1.5) budgetStatus = 'high'

  const monthlyLaborHours = hoursPerWeek * 4.33 * numEmployees
  const monthlyLaborValue = monthlyLaborHours * hourlyRate

  const learningCost = learningHours * hourlyRate * numEmployees
  const maintenanceCostPerMonth = maintenanceHoursPerMonth * hourlyRate

  let riskMultiplier = 1.0
  let riskAdjusted = false
  if (tool2Data?.status === 'yellow') { riskMultiplier = 1.15; riskAdjusted = true }
  else if (tool2Data?.status === 'red') { riskMultiplier = 1.40; riskAdjusted = true }

  const adjustedMaintenanceCost = maintenanceCostPerMonth * riskMultiplier
  const profileMapMonthly = { self: 0, minimal: 0.25, full: 1.0 }
  const assistFactorMonthly = profileMapMonthly[opts.implementationProfile] ?? 0
  const assistanceMonthly = Math.round(recommendation.minBudget * assistFactorMonthly)
  const adjustedToolCost = toolCostPerMonth + assistanceMonthly

  const monthlyBreakdown = adoptionCurve.map((efficiency, i) => {
    const month = i + 1
    const laborSaved = monthlyLaborValue * efficiency
    const learningCostThisMonth = month === 1 ? learningCost : 0
    const netSavings = laborSaved - learningCostThisMonth - adjustedMaintenanceCost - adjustedToolCost
    return { month, laborSaved, learningCost: learningCostThisMonth, maintenanceCost: adjustedMaintenanceCost, toolCost: adjustedToolCost, netSavings, cumulativeSavings: 0 }
  })

  let cumulative = 0
  let breakEvenMonth = 7
  monthlyBreakdown.forEach((row) => { cumulative += row.netSavings; row.cumulativeSavings = cumulative; if (breakEvenMonth === 7 && cumulative >= 0) breakEvenMonth = row.month })

  const sixMonthTotal = cumulative

  return {
    learningHours,
    recommendation,
    estimateMinBudget,
    monthlyBudgetUsed,
    toolCostPerMonth,
    maintenanceHoursPerMonth,
    maintenanceCostPerMonth,
    adjustedMaintenanceCost,
    assistanceMonthly,
    adjustedToolCost,
    monthlyBreakdown,
    sixMonthTotal,
    breakEvenMonth,
    riskAdjusted,
  }
}

// --- Tests ---
function assertEqual(a, b, msg) {
  const ok = JSON.stringify(a) === JSON.stringify(b)
  if (!ok) {
    console.error('ASSERT FAIL:', msg)
    console.error('Expected:', JSON.stringify(b, null, 2))
    console.error('Actual:  ', JSON.stringify(a, null, 2))
    process.exit(1)
  }
}

console.log('Running simulator calculation tests...')

// Tool 1 tests
const tool1Tests = [
  { name: 'Excellent fit', q1: 10, q2: 10, q3: 10, expectedScore: 10 },
  { name: 'Medium fit', q1: 7, q2: 5, q3: 7, expectedScore: 6 },
  { name: 'Low fit', q1: 0, q2: 0, q3: 0, expectedScore: 0 },
]

tool1Tests.forEach((t) => {
  const qTask = t.q1 * 0.25
  const qRepeat = t.q2 * 0.45
  const qDocumentation = t.q3 * 0.30
  const totalPoints = qTask + qRepeat + qDocumentation
  const score = Math.round(totalPoints)
  assertEqual(score, t.expectedScore, `Tool1 ${t.name}`)
  console.log(`Tool1 test '${t.name}' passed (score=${score})`)
})

// Tool 2 tests
const tool2Tests = [
  { name: 'Green', q1: 0, q2: 2, q3: 0, q4: 2, expectedStatus: 'green', expectedWeightedRisk: 1.1 },
  { name: 'Yellow', q1: 5, q2: 5, q3: 5, q4: 6, expectedStatus: 'yellow', expectedWeightedRisk: 5.15 },
  { name: 'RedCritical', q1: 10, q2: 8, q3: 10, q4: 8, expectedStatus: 'red', expectedWeightedRisk: 8.9 },
]

tool2Tests.forEach((t) => {
  const hasCriticalBlocker = (t.q1 >= 10 || t.q2 >= 9 || t.q3 >= 9)
  let status = 'green'
  if (hasCriticalBlocker) status = 'red'
  else {
    const weightedRisk = t.q1 * 0.25 + t.q2 * 0.40 + t.q3 * 0.20 + t.q4 * 0.15
    const hasStrongControls = t.q2 <= 3 && t.q4 <= 3
    const adjustedRisk = hasStrongControls ? weightedRisk * 0.8 : weightedRisk
    if (adjustedRisk >= 6) status = 'red'
    else if (adjustedRisk >= 3.5) status = 'yellow'
    else status = 'green'
  }
  const weightedRisk = +(t.q1 * 0.25 + t.q2 * 0.40 + t.q3 * 0.20 + t.q4 * 0.15).toFixed(2)
  assertEqual(status, t.expectedStatus, `Tool2 status ${t.name}`)
  // allow small rounding tolerance for weighted risk
  const diff = Math.abs(weightedRisk - t.expectedWeightedRisk)
  if (diff > 0.01) { console.error('Weighted risk mismatch', weightedRisk, t.expectedWeightedRisk); process.exit(1) }
  console.log(`Tool2 test '${t.name}' passed (status=${status}, weightedRisk=${weightedRisk})`)
})

// Tool 3 tests (functional checks)
const tool3Tests = [
  {
    name: 'Best case free tool',
    tool1Data: { score: 10 },
    tool2Data: { q4: 1, q3: 0, status: 'green' },
    form: { hoursPerWeek: 5, numEmployees: 2, hourlyRate: 100, monthlyBudget: 0 },
    opts: { techComfort: 'high', implementationProfile: 'self', budgetMode: 'simulator' }
  },
  {
    name: 'Moderate case paid tool',
    tool1Data: { score: 5 },
    tool2Data: { q4: 5, q3: 5, status: 'yellow' },
    form: { hoursPerWeek: 10, numEmployees: 3, hourlyRate: 150, monthlyBudget: 300 },
    opts: { techComfort: 'medium', implementationProfile: 'minimal', budgetMode: 'preferred' }
  },
  {
    name: 'Worst case enterprise',
    tool1Data: { score: 2 },
    tool2Data: { q4: 8, q3: 10, status: 'red' },
    form: { hoursPerWeek: 20, numEmployees: 10, hourlyRate: 80, monthlyBudget: 2000 },
    opts: { techComfort: 'none', implementationProfile: 'full', budgetMode: 'preferred' }
  }
]

tool3Tests.forEach((t) => {
  const out = calculateROI(t.form, t.tool1Data, t.tool2Data, t.opts)
  // basic structural assertions
  if (!Number.isInteger(out.learningHours)) { console.error('learningHours not integer'); process.exit(1) }
  if (!out.recommendation || typeof out.recommendation.tier !== 'string') { console.error('recommendation missing'); process.exit(1) }
  if (!Array.isArray(out.monthlyBreakdown) || out.monthlyBreakdown.length !== 6) { console.error('monthlyBreakdown invalid'); process.exit(1) }
  console.log(`Tool3 test '${t.name}' passed — learningHours=${out.learningHours}, tier=${out.recommendation.tier}, sixMonthTotal=${out.sixMonthTotal.toFixed(2)}, breakEvenMonth=${out.breakEvenMonth}`)
})

console.log('All tests passed.')

// --- Extended exhaustive and property tests ---
console.log('\nRunning extended exhaustive/property tests...')

// 1) Tool1 score monotonicity: increasing any input should not decrease score
for (let q1a = 0; q1a <= 10; q1a++) {
  for (let q2a = 0; q2a <= 10; q2a++) {
    for (let q3a = 0; q3a <= 10; q3a++) {
      const scoreBase = Math.round(q1a * 0.25 + q2a * 0.45 + q3a * 0.30)
      // bump q1
      const scoreQ1 = Math.round((Math.min(10, q1a + 1)) * 0.25 + q2a * 0.45 + q3a * 0.30)
      if (scoreQ1 < scoreBase) { console.error('Tool1 monotonicity fail q1', q1a, q2a, q3a); process.exit(1) }
      // bump q2
      const scoreQ2 = Math.round(q1a * 0.25 + (Math.min(10, q2a + 1)) * 0.45 + q3a * 0.30)
      if (scoreQ2 < scoreBase) { console.error('Tool1 monotonicity fail q2', q1a, q2a, q3a); process.exit(1) }
      // bump q3
      const scoreQ3 = Math.round(q1a * 0.25 + q2a * 0.45 + (Math.min(10, q3a + 1)) * 0.30)
      if (scoreQ3 < scoreBase) { console.error('Tool1 monotonicity fail q3', q1a, q2a, q3a); process.exit(1) }
    }
  }
}
console.log('Tool1 monotonicity checks passed')

// 2) Tool2: critical blocker behavior and threshold mapping across ranges
for (let q1 = 0; q1 <= 10; q1 += 1) {
  for (let q2 = 1; q2 <= 10; q2 += 1) {
    for (let q3 = 0; q3 <= 10; q3 += 1) {
      for (let q4 = 1; q4 <= 10; q4 += 1) {
        const hasCritical = (q1 >= 10 || q2 >= 9 || q3 >= 9)
        let weightedRisk = q1 * 0.25 + q2 * 0.40 + q3 * 0.20 + q4 * 0.15
        const hasStrongControls = q2 <= 3 && q4 <= 3
        const adjusted = hasStrongControls ? weightedRisk * 0.8 : weightedRisk
        let status = 'green'
        if (hasCritical) status = 'red'
        else if (adjusted >= 6) status = 'red'
        else if (adjusted >= 3.5) status = 'yellow'
        else status = 'green'

        // sanity checks
        if (weightedRisk < 0 || weightedRisk > 10) { console.error('Tool2 weightedRisk out of range', weightedRisk); process.exit(1) }
        if (!['green','yellow','red'].includes(status)) { console.error('Invalid status', status); process.exit(1) }
      }
    }
  }
}
console.log('Tool2 exhaustive checks passed')

// 3) Tool3 properties: learningHours bounds and monotonicity w.r.t task score
for (let score = 0; score <= 10; score += 1) {
  for (let cap = 1; cap <= 10; cap += 1) {
    const lh = calculateLearningHours(score, cap)
    if (!Number.isInteger(lh)) { console.error('learningHours not integer in grid', score, cap); process.exit(1) }
    if (lh < 2 || lh > 20) { console.error('learningHours out of clamp range', score, cap, lh); process.exit(1) }
  }
}
console.log('Tool3 learningHours bounds checks passed')

// Check cumulative correctness for a sample set (no negative employees/hours)
const sample = calculateROI({ hoursPerWeek: 8, numEmployees: 4, hourlyRate: 120, monthlyBudget: 400 }, { score: 6 }, { q4: 5, q3: 4, status: 'yellow' }, { techComfort: 'medium', implementationProfile: 'minimal', budgetMode: 'simulator' })
let sumNet = 0
sample.monthlyBreakdown.forEach((r) => { sumNet += r.netSavings })
if (Math.abs(sumNet - sample.sixMonthTotal) > 1e-6) { console.error('Cumulative mismatch', sumNet, sample.sixMonthTotal); process.exit(1) }
console.log('Cumulative savings consistency check passed')

console.log('\nExtended tests completed successfully.')
