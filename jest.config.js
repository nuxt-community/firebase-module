module.exports = {
  collectCoverage: true,
  collectCoverageFrom: [
    'lib/**/*.js',
    '!lib/plugins/**/*.js',
    '!lib/serverMiddleware/*.js',
    '!lib/sw-templates/*.js'
  ],
  moduleFileExtensions: [
    'ts',
    'js',
    'json'
  ],
  testEnvironment: 'node',
  transform: {
    '^.+\\.js$': 'babel-jest'
  },
  transformIgnorePatterns: [
    'node_modules'
  ]
}
