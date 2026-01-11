const { calculateROI } = require('./helpers')

describe('Tool3 ROI logic', () => {
  test('calculateROI returns expected structure and 6-month breakdown', () => {
    const out = calculateROI({ hoursPerWeek:5, numEmployees:2, hourlyRate:100, monthlyBudget:0 }, { score:10 }, { q4:1, q3:0, status:'green' }, { techComfort:'high', implementationProfile:'self', budgetMode:'simulator' })
    expect(typeof out.learningHours).toBe('number')
    expect(Array.isArray(out.monthlyBreakdown)).toBe(true)
    expect(out.monthlyBreakdown.length).toBe(6)
    expect(typeof out.sixMonthTotal).toBe('number')
  })

  test('cumulative equals sum of netSavings', () => {
    const out = calculateROI({ hoursPerWeek:8, numEmployees:4, hourlyRate:120, monthlyBudget:400 }, { score:6 }, { q4:5, q3:4, status:'yellow' }, { techComfort:'medium', implementationProfile:'minimal', budgetMode:'simulator' })
    const sum = out.monthlyBreakdown.reduce((s,r) => s + r.netSavings, 0)
    expect(Math.abs(sum - out.sixMonthTotal)).toBeLessThan(1e-6)
  })
})
