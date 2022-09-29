export default {
  clearMocks: true,
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  coverageReporters: ['json', 'text', 'lcov', 'clover'],
  coverageThreshold: {
    global: {
      brach: 100,
      functions: 100,
      lines: 100,
      statements: 100,
    },
  },
  // força um coverage para todos os arquivos
  collectCoverageFrom: ['src/**/*.js', '!src/index.js'],
  maxWorkers: '50%',
  testEnvironment: 'node',
  transform: {
    '^.+\\.(js)$': 'babel-jest',
  },
  watchPathIgnorePatterns: ['node_modules'],
  transformIgnorePatterns: ['node_modules'],
}
