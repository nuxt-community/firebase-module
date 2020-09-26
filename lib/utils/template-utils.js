/*
  id: used in module config and for the names of the services .js files
  objectName: name of the Firebase object/function, e.g. firebase.remoteConfig (and for v7+ injection names (e.g. ))
  injectionNameOld: name of the module injections, e.g. fireConfig (legacy v6)
  importName: name of the import, e.g. import 'firebase/remote-config'
*/
const serviceMappings = {
  app: {
    id: 'app',
    objectName: null,
    injectionNameOld: null,
    importName: 'app',
    clientOnly: false
  },
  auth: {
    id: 'auth',
    objectName: 'auth',
    injectionNameOld: 'fireAuth',
    importName: 'auth',
    clientOnly: false
  },
  realtimeDb: {
    id: 'realtimeDb',
    objectName: 'database',
    injectionNameOld: 'fireDb',
    importName: 'database',
    clientOnly: false
  },
  firestore: {
    id: 'firestore',
    objectName: 'firestore',
    injectionNameOld: 'fireStore',
    importName: 'firestore',
    clientOnly: false
  },
  storage: {
    id: 'storage',
    objectName: 'storage',
    injectionNameOld: 'fireStorage',
    importName: 'storage',
    clientOnly: false
  },
  functions: {
    id: 'functions',
    objectName: 'functions',
    injectionNameOld: 'fireFunc',
    importName: 'functions',
    clientOnly: false
  },
  messaging: {
    id: 'messaging',
    objectName: 'messaging',
    injectionNameOld: 'fireMess',
    importName: 'messaging',
    clientOnly: true
  },
  performance: {
    id: 'performance',
    objectName: 'performance',
    injectionNameOld: 'firePerf',
    importName: 'performance',
    clientOnly: true
  },
  analytics: {
    id: 'analytics',
    objectName: 'analytics',
    injectionNameOld: 'fireAnalytics',
    importName: 'analytics',
    clientOnly: true
  },
  remoteConfig: {
    id: 'remoteConfig',
    objectName: 'remoteConfig',
    injectionNameOld: 'fireConfig',
    importName: 'remote-config',
    clientOnly: true
  }
}

function writeStaticImports (options) {
  return Object.values(serviceMappings)
    .map(serviceMapping => writeImportStatement(options, serviceMapping, true))
    .filter(Boolean)
    .join('\n')
}

function writeImportStatement (options, serviceMapping, staticOnly = false) {
  if (!serviceMapping) {
    serviceMapping = options.serviceMapping
    // TODO - does this make sense?
  }

  const serviceOptions = options.services[serviceMapping.id]
  if (!serviceOptions) {
    return
  }

  const useStaticImport = serviceOptions.static

  let pathAppendix = ''
  if (serviceOptions.memoryOnly) {
    // Only works with Firestore
    pathAppendix = '/memory'
  }

  const servicePath = serviceMapping.importName
  const importPath = `'firebase/${servicePath}${pathAppendix}'`

  if (staticOnly) {
    if (!useStaticImport) {
      return
    }

    if (serviceMapping.id === 'app') {
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
  serviceMappings,
  writeStaticImports,
  writeImportStatement
}
