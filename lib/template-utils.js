
const serviceMapping = {
  app: 'app',
  auth: 'auth',
  realtimeDb: 'database',
  firestore: 'firestore',
  storage: 'storage',
  functions: 'functions',
  messaging: 'messaging',
  performance: 'performance',
  analytics: 'analytics',
  remoteConfig: 'remote-config'
}

const injectionMapping = {
  auth: 'Auth',
  realtimeDb: 'Db',
  firestore: 'Store',
  storage: 'Storage',
  functions: 'Func',
  messaging: 'Mess',
  performance: 'Perf',
  analytics: 'Analytics',
  remoteConfig: 'Config'
}

function writeStaticImports (options) {
  return Object.keys(serviceMapping)
    .map(service => writeImportStatement(options, service, true))
    .filter(Boolean)
    .join('\n')
}

function writeImportStatement (options, service, staticOnly = false) {
  if (!service) {
    service = options.service
  }

  const serviceOptions = options.services[service]
  if (!serviceOptions) {
    return
  }

  const useStaticImport = serviceOptions.static

  let pathAppendix = ''
  if (serviceOptions.memoryOnly) {
    // Only works with Firestore
    pathAppendix = '/memory'
  }

  const servicePath = serviceMapping[service]
  const importPath = `'firebase/${servicePath}${pathAppendix}'`

  if (staticOnly) {
    if (!useStaticImport) {
      return
    }

    if (service === 'app') {
      return `import * as firebase from ${importPath}`
    }

    return `import ${importPath}`
  }

  const webpackComments = []

  // Add Chunk Name Comment
  let webpackChunkName = serviceOptions.chunkName
  if (!webpackChunkName && process.env.NODE_ENV !== 'production') {
    webpackChunkName = `firebase-${servicePath}`
  }

  if (webpackChunkName) {
    webpackComments.push(`webpackChunkName: '${webpackChunkName}'`)
  }

  // Add Preload Comment
  if (serviceOptions.preload) {
    webpackComments.push('webpackPreload: true')
  }

  // Add strings surrounding the comment
  let webpackCommentsString = ''
  if (webpackComments.length) {
    webpackCommentsString = `/* ${webpackComments.join(', ')} */`
  }

  return `await import(${webpackCommentsString}${importPath})`
}

module.exports = {
  serviceMapping,
  injectionMapping,
  writeStaticImports,
  writeImportStatement
}
