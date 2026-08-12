const nextJest = require('next/jest')

const createJestConfig = nextJest({
  dir: './',
})

const customJestConfig = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleDirectories: ['node_modules', '<rootDir>/src'],
  collectCoverageFrom: [
    'src/hooks/**/*.js',
    'src/utils/formatters.js',
    '!src/**/*.stories.js',
  ],
  coveragePathIgnorePatterns: ['/node_modules/', '/.next/'],
  coverageThreshold: {
    global: {
      lines: 95,
      statements: 95,
      functions: 90,
      branches: 75,
    },
  },
}

module.exports = createJestConfig(customJestConfig)
