import firebase from 'firebase/app'

const config = <%= serialize(options.config) %>

<%
/** --------------------------------------------------------------------------------------------- **/
/** -------------------------------------- Import Scripts --------------------------------------- **/
/** --------------------------------------------------------------------------------------------- **/

const serviceMapping = {
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

function writeStaticImports() {
  return Object.keys(serviceMapping)
    .map(service => writeImportStatement(service, true))
    .filter(Boolean)
    .join('\n')
}

function writeImportStatement(service, staticImport = false) {
  const serviceOptions = options.services[service]
  const importStatically = typeof serviceOptions === 'object' && serviceOptions.static
  const importDynamically = serviceOptions && !importStatically

  if (importStatically && staticImport) {
    return `import 'firebase/${serviceMapping[service]}'`
  }

  if (!importDynamically || staticImport) {
    return
  }

  const webpackComments = []

  // Add Chunk Name Comment
  if (process.env.NODE_ENV !== 'production' && !serviceOptions.chunkName) {
    webpackComments.push(`webpackChunkName: 'firebase-${serviceMapping[service]}'`)
  }
  if (serviceOptions.chunkName) {
    webpackComments.push(`webpackChunkName: '${serviceOptions.chunkName}'`)
  }

  // Add Preload Comment
  if (serviceOptions.preload) {
    webpackComments.push(`webpackPreload: true`)
  }

  // Add strings surrounding the comment
  let webpackCommentsString = ''
  if (webpackComments.length) {
    webpackCommentsString = `/* ${webpackComments.join(', ')} */`
  }
  return `await import(${webpackCommentsString}'firebase/${serviceMapping[service]}')`
}

/** --------------------------------------------------------------------------------------------- **/
/** -------------------------------------- END: Import Scripts ---------------------------------- **/
/** --------------------------------------------------------------------------------------------- **/
%>
<%= writeStaticImports() %>

export default async ({ res }, inject) => {
  // Resolve the firebase app corresponding to the server user
  let session
  if (process.server && res && res.locals && res.locals.user) {
    const { default: SessionManager } = await import('@nuxtjs/firebase/lib/helpers/SessionManager')

    const manager = new SessionManager(firebase, {
      config,
      sessions: <%= serialize(options.sessions) %>
    })
    session = await manager.startSession(res.locals.user.uid)
    res.locals._session = session
    res.locals._manager = manager
  } else {
    session = firebase.apps[0] || firebase.initializeApp(config)
  }

  <% if (options.services.auth) { %>
  /** --------------------------------------------------------------------------------------------- **/
  /** -------------------------------------- FIREBASE AUTH ---------------------------------------- **/
  /** --------------------------------------------------------------------------------------------- **/

  <%= writeImportStatement('auth') %>

  const fireAuth = session.auth()
  const fireAuthObj = firebase.auth
  inject('fireAuth', fireAuth)
  inject('fireAuthObj', fireAuthObj)

  <% if (options.services.auth.persistence) { %>

  // persistence should only be enabled client side
  if (process.client) {
    const persistence = firebase.auth.Auth.Persistence.<%=
      options.services.auth.persistence === 'session'
        ? 'SESSION'
        : options.services.auth.persistence === 'none'
          ? 'NONE'
          : 'LOCAL'
    %>

    try {
      await fireAuth.setPersistence(persistence)
    } catch (err) {
      if (err.code === 'auth/invalid-persistence-type') {
        console.warn(`[@nuxtjs/firebase]: Invalid persistence type '${persistence}' provided`)
      } else if (err.code === 'auth/unsupported-persistence-type') {
        console.warn(`[@nuxtjs/firebase]: Persistence type '${persistence}' is not supported in this environment.`)
      }
    }
  }

  <% } %>

  <% } %>

  <% if (options.services.realtimeDb) { %>
  /** --------------------------------------------------------------------------------------------- **/
  /** ------------------------------------ FIREBASE REALTIME DB ----------------------------------- **/
  /** --------------------------------------------------------------------------------------------- **/

  <%= writeImportStatement('realtimeDb') %>

  const fireDb = session.database()
  const fireDbObj = firebase.database
  inject('fireDb', fireDb)
  inject('fireDbObj', fireDbObj)

  <% } %>

  <% if (options.services.firestore) { %>
  /** --------------------------------------------------------------------------------------------- **/
  /** ------------------------------------- FIREBASE FIRESTORE ------------------------------------ **/
  /** --------------------------------------------------------------------------------------------- **/

  <%= writeImportStatement('firestore') %>

  const fireStore = session.firestore()
  const fireStoreObj = firebase.firestore
  inject('fireStore', fireStore)
  inject('fireStoreObj', fireStoreObj)

  <% if (typeof options.services.firestore === 'object') { %>

  <% if (typeof options.services.firestore.settings === 'object') { %>

  fireStore.settings(<%= serialize(options.services.firestore.settings) %>)

  <% } %>

  <% if (options.services.firestore.enablePersistence) { %>

  // persistence should only be enabled client side
  if (process.client) {
    try {
      await fireStore.enablePersistence(<%= serialize(
        typeof options.services.firestore.enablePersistence === 'object'
          ? options.services.firestore.enablePersistence
          : {}
      ) %>)
    } catch (err) {
      if (err.code == 'failed-precondition') {
        console.warn('[@nuxtjs/firebase]: Firestore Persistence not enabled. Multiple tabs open, persistence can only be enabled in one tab at a a time.')
      } else if (err.code == 'unimplemented') {
        console.info('[@nuxtjs/firebase]: Firestore Persistence not enabled. The current browser does not support all of the features required to enable persistence.')
      }
    }
  }

  <% } %>

  <% } %>

  <% } %>

  <% if (options.services.storage) { %>
  /** --------------------------------------------------------------------------------------------- **/
  /** -------------------------------------- FIREBASE STORAGE ------------------------------------- **/
  /** --------------------------------------------------------------------------------------------- **/

  <%= writeImportStatement('storage') %>

  const fireStorage = session.storage()
  const fireStorageObj = firebase.storage
  inject('fireStorage', fireStorage)
  inject('fireStorageObj', fireStorageObj)

  <% } %>

  <% if (options.services.functions) { %>
  /** --------------------------------------------------------------------------------------------- **/
  /** ------------------------------------ FIREBASE FUNCTIONS ------------------------------------- **/
  /** --------------------------------------------------------------------------------------------- **/

  <%= writeImportStatement('functions') %>

  <% /* If .location is undefined, default will be "us-central1" */ %>
  const fireFunc = session.functions(<%=
    typeof options.services.functions.location === 'string'
      ? serialize(options.services.functions.location)
      : ''
  %>)
  const fireFuncObj = firebase.functions

  <% /* Uses emulator, if emulatorPort is set. */ %>
  <% if (['string', 'number'].includes(typeof options.services.functions.emulatorPort)) { %>

  fireFunc.useFunctionsEmulator('http://localhost:<%= `${options.services.functions.emulatorPort}` %>')

  <% } %>

  inject('fireFunc', fireFunc)
  inject('fireFuncObj', fireFuncObj)

  <% } %>

  <% if (options.services.messaging) { %>
  /** --------------------------------------------------------------------------------------------- **/
  /** ------------------------------------ FIREBASE MESSAGING ------------------------------------- **/
  /** --------------------------------------------------------------------------------------------- **/

  // Firebase Messaging can only be initiated on client side
  if (process.client && firebase.messaging.isSupported()) {
    <%= writeImportStatement('messaging') %>

    const fireMess = session.messaging()
    const fireMessObj = firebase.messaging

    if (manager.config.fcmPublicVapidKey) {
      fireMess.usePublicVapidKey(manager.config.fcmPublicVapidKey)
    }

    inject('fireMess', fireMess)
    inject('fireMessObj', fireMessObj)
  }

  <% } %>

  <% if (options.services.performance) { %>
  /** --------------------------------------------------------------------------------------------- **/
  /** ----------------------------------- FIREBASE REALTIME DB ------------------------------------ **/
  /** --------------------------------------------------------------------------------------------- **/

  // Firebase Performance can only be initiated on client side
  if(process.client) {
    <%= writeImportStatement('performance') %>

    const firePerf = session.performance()
    const firePerfObj = firebase.performance
    inject('firePerf', firePerf)
    inject('firePerfObj', firePerfObj)
  }

  <% } %>

  <% if (options.services.analytics) { %>
  /** --------------------------------------------------------------------------------------------- **/
  /** ----------------------------------- FIREBASE ANALYTICS -------------------------------------- **/
  /** --------------------------------------------------------------------------------------------- **/

  // Firebase Analytics can only be initiated on the client side
  if (process.client) {
    <%= writeImportStatement('analytics') %>

    const fireAnalytics = session.analytics()
    const fireAnalyticsObj = firebase.analytics
    inject('fireAnalytics', fireAnalytics)
    inject('fireAnalyticsObj', fireAnalyticsObj)
  }

  <% } %>

  <% if (options.services.remoteConfig) { %>
  /** --------------------------------------------------------------------------------------------- **/
  /** -------------------------------- FIREBASE REMOTE CONFIG DB ---------------------------------- **/
  /** --------------------------------------------------------------------------------------------- **/

  // Firebase Remote Config can only be initiated on the client side
  if (process.client) {
    <%= writeImportStatement('remoteConfig') %>

    const fireConfig = session.remoteConfig()
    const fireConfigObj = firebase.remoteConfig

    <% if (typeof options.services.remoteConfig === 'object') { %>

    <% if (options.services.remoteConfig.settings) { %>

    fireConfig.settings = {
      fetchTimeoutMillis: <%= `${options.services.remoteConfig.settings.fetchTimeoutMillis || 60000 }` %>,
      minimumFetchIntervalMillis: <%= `${options.services.remoteConfig.settings.minimumFetchIntervalMillis || 43200000}` %>
    }

    <% } %>

    <% if (typeof options.services.remoteConfig.settings.defaultConfig === 'object') { %>

    fireConfig.defaultConfig = <%= serialize(options.services.remoteConfig.settings.defaultConfig) %>

    <% } %>

    <% } %>

    inject('fireConfig', fireConfig)
    inject('fireConfigObj', fireConfigObj)

  }
  <% } %>
}
