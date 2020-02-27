module.exports = {
  collectCoverage: true,
  collectCoverageFrom: [
    'lib/**/*.js',
    '!lib/plugins/*.js',
    '!lib/serverMiddleware/*.js',
    '!lib/templates/*.js'
  ],
  testEnvironment: 'node'
}
