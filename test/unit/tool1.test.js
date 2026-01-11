const { calculateLearningHours, recommendToolTier } = require('./helpers')

describe('Tool1 & learningHours logic', () => {
  test('recommendToolTier maps scores to tiers', () => {
    expect(recommendToolTier(8).tier).toBe('חינמי')
    expect(recommendToolTier(5).tier).toBe('בתשלום')
    expect(recommendToolTier(2).tier).toBe('מתקדם')
  })

  test('learningHours decreases with higher tool1Score', () => {
    const low = calculateLearningHours(2, 5)
    const high = calculateLearningHours(9, 5)
    expect(high).toBeLessThanOrEqual(low)
  })

  test('learningHours respects clamps (2..20)', () => {
    expect(calculateLearningHours(0, 10)).toBeGreaterThanOrEqual(2)
    expect(calculateLearningHours(10, 1)).toBeLessThanOrEqual(20)
  })
})
