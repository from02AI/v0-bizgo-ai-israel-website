module.exports = {
  testEnvironment: 'jsdom',
  testMatch: ['**/test/unit/**/*.test.js', '**/test/integration/**/*.test.js'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1'
  }
  ,
  // Minimal coverage thresholds to enforce in CI (adjust as needed)
  coverageThreshold: {
    global: {
      branches: 60,
      functions: 60,
      lines: 60,
      statements: 60
    }
  }
}

