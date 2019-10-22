import firebase from 'firebase/app'

export default async (ctx, inject) => {

  const options = <%= serialize(options) %>

  // Don't include when Firebase is already initialized
  if (!firebase.apps.length) {
    firebase.initializeApp(options.config[options.currentEnv])
  }

  if (options.useOnly.includes('auth')) {
    await import('firebase/auth')

    const fireAuth = firebase.auth()
    const fireAuthObj = firebase.auth
    inject('fireAuth', fireAuth)
    inject('fireAuthObj', fireAuthObj)
  }

  if (options.useOnly.includes('realtimeDb')) {
    await import('firebase/database')

    const fireDb = firebase.database()
    const fireDbObj = firebase.database
    inject('fireDb', fireDb)
    inject('fireDbObj', fireDbObj)
  }

  if (options.useOnly.includes('firestore')) {
    await import('firebase/firestore')

    const fireStore = firebase.firestore()
    const fireStoreObj = firebase.firestore
    inject('fireStore', fireStore)
    inject('fireStoreObj', fireStoreObj)
  }

  if (options.useOnly.includes('storage')) {
    await import('firebase/storage')

    const fireStorage = firebase.storage()
    const fireStorageObj = firebase.storage
    inject('fireStorage', fireStorage)
    inject('fireStorageObj', fireStorageObj)
  }

  if (options.useOnly.includes('functions')) {
    await import('firebase/functions')

    const fireFunc = firebase.app().functions(options.functionsLocation)
    const fireFuncObj = firebase.functions
    inject('fireFunc', fireFunc)
    inject('fireFuncObj', fireFuncObj)
  }

  // Firebase Messaging can only be initiated on client side
  if (process.browser && options.useOnly.includes('messaging')) {
    await import('firebase/messaging')

    if (firebase.messaging.isSupported()) {
      const fireMess = firebase.messaging()
      const fireMessObj = firebase.messaging
      inject('fireMess', fireMess)
      inject('fireMessObj', fireMessObj)
    }
  }

  // Firebase Performance can only be initiated on client side
  if(process.browser && options.useOnly.includes('performance')){
    await import('firebase/performance')

    const firePerf = firebase.performance()
    const firePerfObj = firebase.performance
    inject('firePerf', firePerf)
    inject('firePerfObj', firePerfObj)
  }

  // Firebase Analytics can only be initiated on the client side
  if(process.browser && options.useOnly.includes('analytics')) {
    await import('firebase/analytics')

    const fireAnalytics = firebase.analytics()
    const fireAnalyticsObj = firebase.analytics
    inject('fireAnalytics', fireAnalytics)
    inject('fireAnalyticsObj', fireAnalyticsObj)
  }

  // Firebase Remote Config can only be initiated on the client side
  if(process.browser && options.useOnly.includes('remoteConfig')) {
    await import('firebase/remote-config')

    const fireConfig = firebase.remoteConfig()
    const fireConfigObj = firebase.remoteConfig

    if (options.remoteConfig) {
      const { settings: remoteSettings, defaultConfig: remoteDefaultConfig } = options.remoteConfig
      if (remoteSettings) {
        const { minimumFetchIntervalMillis, fetchTimeoutMillis } = remoteSettings
        fireConfig.settings = {
          fetchTimeoutMillis: fetchTimeoutMillis ? fetchTimeoutMillis : 60000,
          minimumFetchIntervalMillis: minimumFetchIntervalMillis ? minimumFetchIntervalMillis : 43200000
        }
      }
      fireConfig.defaultConfig = (remoteDefaultConfig)
    }

    inject('fireConfig', fireConfig)
    inject('fireConfigObj', fireConfigObj)
  }
}
