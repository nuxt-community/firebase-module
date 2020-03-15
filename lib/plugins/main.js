import firebase from 'firebase/app'

<%
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
  const importStatically = serviceOptions && serviceOptions.static
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
%>
<%= writeStaticImports() %>

  /** --------------------------------------------------------------------------------------------- **/
  /** -------------------------------------- END: Import Scripts ---------------------------------- **/
  /** --------------------------------------------------------------------------------------------- **/

export default async ({ res }, inject) => {

  const options = <%= serialize(options) %>
  const firebaseConfig = options.config

  // Resolve the firebase app corresponding to the server user
  let session
  if (process.server && res && res.locals && res.locals.user) {
    session = firebase.apps.find(a => a.name === res.locals.user.uid) || firebase.initializeApp({
      ...firebaseConfig,
      _created: Date.now()
    }, res.locals.user.uid)
    res.locals._session = session
  } else {
    session = firebase.apps.find(a => a.name === '[DEFAULT]') || firebase.initializeApp(firebaseConfig)
  }

  /** --------------------------------------------------------------------------------------------- **/
  /** -------------------------------------- FIREBASE AUTH ---------------------------------------- **/
  /** --------------------------------------------------------------------------------------------- **/

   <% if (options.services.auth) { %>
    <%= writeImportStatement('auth') %>

    const fireAuth = session.auth()
    const fireAuthObj = firebase.auth
    inject('fireAuth', fireAuth)
    inject('fireAuthObj', fireAuthObj)
  <% } %>

  /** --------------------------------------------------------------------------------------------- **/
  /** -------------------------------------- FIREBASE REALTIME DB --------------------------------- **/
  /** --------------------------------------------------------------------------------------------- **/
  <% if (options.services.realtimeDb) { %>
    <%= writeImportStatement('realtimeDb') %>

    const fireDb = session.database()
    const fireDbObj = firebase.database
    inject('fireDb', fireDb)
    inject('fireDbObj', fireDbObj)

  <% } %>

  /** --------------------------------------------------------------------------------------------- **/
  /** ---------------------------------------- FIREBASE FIRESTORE --------------------------------- **/
  /** --------------------------------------------------------------------------------------------- **/

  <% if (options.services.firestore) { %>
    <%= writeImportStatement('firestore') %>

    const fireStore = session.firestore()
    const fireStoreObj = firebase.firestore
    inject('fireStore', fireStore)
    inject('fireStoreObj', fireStoreObj)

    const settings = options.services.firestore.settings
    if (settings) {
      fireStore.settings(settings)
    }

    const enablePersistence = options.services.firestore.enablePersistence
    if (enablePersistence && process.client) {
      try {
        await fireStore.enablePersistence((
          typeof enablePersistence === 'object'
            ? enablePersistence
            : {}
        ))
      } catch (err) {
        if (err.code == 'failed-precondition') {
          console.info("Firestore Persistence not enabled. Multiple tabs open, persistence can only be enabled in one tab at a a time.")
        } else if (err.code == 'unimplemented') {
          console.info("Firestore Persistence not enabled. The current browser does not support all of the features required to enable persistence.")
        }
      }
    }

  <% } %>

  /** --------------------------------------------------------------------------------------------- **/
  /** ------------------------------------------ FIREBASE STORAGE --------------------------------- **/
  /** --------------------------------------------------------------------------------------------- **/

  <% if (options.services.storage) { %>
    <%= writeImportStatement('storage') %>

    const fireStorage = session.storage()
    const fireStorageObj = firebase.storage
    inject('fireStorage', fireStorage)
    inject('fireStorageObj', fireStorageObj)

  <% } %>

  /** --------------------------------------------------------------------------------------------- **/
  /** ---------------------------------------- FIREBASE FUNCTIONS --------------------------------- **/
  /** --------------------------------------------------------------------------------------------- **/

  <% if (options.services.functions) { %>
    <%= writeImportStatement('functions') %>

    // If .location is undefined, default will be "us-central1"
    const fireFunc = session.functions(options.services.functions.location)
    const fireFuncObj = firebase.functions

    // Uses emulator, if emulatorPort is set.
    if (options.services.functions.emulatorPort) {
      fireFunc.useFunctionsEmulator(`http://localhost:${options.services.functions.emulatorPort}`)
    }

    inject('fireFunc', fireFunc)
    inject('fireFuncObj', fireFuncObj)

  <% } %>

  /** --------------------------------------------------------------------------------------------- **/
  /** ---------------------------------------- FIREBASE MESSAGING --------------------------------- **/
  /** --------------------------------------------------------------------------------------------- **/

  <% if (options.services.messaging) { %>
  // Firebase Messaging can only be initiated on client side
  if (process.browser) {
    <%= writeImportStatement('messaging') %>

    if (firebase.messaging.isSupported()) {
      const fireMess = session.messaging()
      const fireMessObj = firebase.messaging

      if (firebaseConfig.fcmPublicVapidKey) {
        fireMess.usePublicVapidKey(firebaseConfig.fcmPublicVapidKey)
      }

      inject('fireMess', fireMess)
      inject('fireMessObj', fireMessObj)
    }
  }

  <% } %>

  /** --------------------------------------------------------------------------------------------- **/
  /** -------------------------------------- FIREBASE REALTIME DB --------------------------------- **/
  /** --------------------------------------------------------------------------------------------- **/

  // Firebase Performance can only be initiated on client side
  <% if (options.services.performance) { %>
  if(process.browser) {
    <%= writeImportStatement('performance') %>

    const firePerf = session.performance()
    const firePerfObj = firebase.performance
    inject('firePerf', firePerf)
    inject('firePerfObj', firePerfObj)
  }
  <% } %>

  /** --------------------------------------------------------------------------------------------- **/
  /** ---------------------------------------- FIREBASE ANALYTICS --------------------------------- **/
  /** --------------------------------------------------------------------------------------------- **/

  // Firebase Analytics can only be initiated on the client side
  <% if (options.services.analytics) { %>
  if (process.browser) {
    <%= writeImportStatement('analytics') %>

    const fireAnalytics = session.analytics()
    const fireAnalyticsObj = firebase.analytics
    inject('fireAnalytics', fireAnalytics)
    inject('fireAnalyticsObj', fireAnalyticsObj)

  }
  <% } %>

  /** --------------------------------------------------------------------------------------------- **/
  /** --------------------------------- FIREBASE REMOTE CONFIG DB --------------------------------- **/
  /** --------------------------------------------------------------------------------------------- **/
  <% if (options.services.remoteConfig) { %>
  // Firebase Remote Config can only be initiated on the client side
  if (process.browser) {
    <%= writeImportStatement('remoteConfig') %>

    const fireConfig = session.remoteConfig()
    const fireConfigObj = firebase.remoteConfig

    const { settings: remoteSettings, defaultConfig: remoteDefaultConfig } = options.services.remoteConfig
    if (remoteSettings) {
      const { minimumFetchIntervalMillis, fetchTimeoutMillis } = remoteSettings
      fireConfig.settings = {
        fetchTimeoutMillis: fetchTimeoutMillis ? fetchTimeoutMillis : 60000,
        minimumFetchIntervalMillis: minimumFetchIntervalMillis ? minimumFetchIntervalMillis : 43200000
      }
    }
    fireConfig.defaultConfig = (remoteDefaultConfig)

    inject('fireConfig', fireConfig)
    inject('fireConfigObj', fireConfigObj)

  }
  <% } %>
}
