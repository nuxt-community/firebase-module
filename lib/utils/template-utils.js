/*
  id: used in module config and for the names of the services .js files
  objectName: name of the Firebase object/function, e.g. firebase.remoteConfig (and for v7+ injection names (e.g. ))
  importName: name of the import, e.g. import 'firebase/remote-config'
*/
const serviceMappings = {
  app: {
    id: 'app',
    objectName: null,
    importName: 'app',
    clientOnly: false
  },
  auth: {
    id: 'auth',
    objectName: 'auth',
    importName: 'auth',
    clientOnly: false
  },
  realtimeDb: {
    id: 'realtimeDb',
    objectName: 'database',
    importName: 'database',
    clientOnly: false
  },
  firestore: {
    id: 'firestore',
    objectName: 'firestore',
    importName: 'firestore',
    clientOnly: false
  },
  storage: {
    id: 'storage',
    objectName: 'storage',
    importName: 'storage',
    clientOnly: false
  },
  functions: {
    id: 'functions',
    objectName: 'functions',
    importName: 'functions',
    clientOnly: false
  },
  messaging: {
    id: 'messaging',
    objectName: 'messaging',
    importName: 'messaging',
    clientOnly: true
  },
  performance: {
    id: 'performance',
    objectName: 'performance',
    importName: 'performance',
    clientOnly: true
  },
  analytics: {
    id: 'analytics',
    objectName: 'analytics',
    importName: 'analytics',
    clientOnly: true
  },
  remoteConfig: {
    id: 'remoteConfig',
    objectName: 'remoteConfig',
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
