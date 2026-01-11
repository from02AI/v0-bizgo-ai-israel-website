const { cn } = require('../../lib/utils')

describe('lib/utils.cn', () => {
  test('merges class names and deduplicates via tailwind-merge', () => {
    const result = cn('px-4', 'py-2', 'px-4', { 'text-red-500': true, 'hidden': false })
    expect(typeof result).toBe('string')
    expect(result).toContain('px-4')
    expect(result).toContain('py-2')
    expect(result).toContain('text-red-500')
    // Ensure duplicates are not repeated
    expect(result.match(/px-4/g).length).toBe(1)
  })
})
