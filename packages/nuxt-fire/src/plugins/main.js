import firebase from 'firebase/app'
<% if (options.services.auth && options.services.auth.static) { %>import 'firebase/auth'<% } %>
<% if (options.services.realtimeDb && options.services.realtimeDb.static) { %>import 'firebase/database'<% } %>
<% if (options.services.firestore && options.services.firestore.static) { %>import 'firebase/firestore'<% } %>
<% if (options.services.storage && options.services.storage.static) { %>import 'firebase/storage'<% } %>
<% if (options.services.functions && options.services.functions.static) { %>import 'firebase/functions'<% } %>
<% if (options.services.messaging && options.services.messaging.static) { %>import 'firebase/messaging'<% } %>
<% if (options.services.performance && options.services.performance.static) { %>import 'firebase/performance'<% } %>
<% if (options.services.analytics && options.services.analytics.static) { %>import 'firebase/analytics'<% } %>
<% if (options.services.remoteConfig && options.services.remoteConfig.static) { %>import 'firebase/remote-config'<% } %>

export default async (ctx, inject) => {

  const options = <%= serialize(options) %>
  const firebaseConfig = options.config

  // Don't include when Firebase is already initialized
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig)
  }

  /** --------------------------------------------------------------------------------------------- **/
  /** -------------------------------------- FIREBASE AUTH ---------------------------------------- **/
  /** --------------------------------------------------------------------------------------------- **/

   <% if (options.services.auth) { %>
    <% if (!options.services.auth.static) { %>
    await import(
      <% if (options.services.auth.chunkName) { %>
      /* webpackChunkName: "<%= options.services.auth.chunkName %>" */
      <% } %>
      <% if (options.services.auth.preload) { %>
      /* webpackPreload: true */
      <% } %>
      'firebase/auth')
    <% } %>

    const fireAuth = firebase.auth()
    const fireAuthObj = firebase.auth
    inject('fireAuth', fireAuth)
    inject('fireAuthObj', fireAuthObj)
  <% } %>

  /** --------------------------------------------------------------------------------------------- **/
  /** -------------------------------------- FIREBASE REALTIME DB --------------------------------- **/
  /** --------------------------------------------------------------------------------------------- **/
  <% if (options.services.realtimeDb) { %>
    <% if (!options.services.realtimeDb.static) { %>
    await import(
      <% if (options.services.realtimeDb.chunkName) { %>
      /* webpackChunkName: "<%= options.services.realtimeDb.chunkName %>" */
      <% } %>
      <% if (options.services.realtimeDb.preload) { %>
      /* webpackPreload: true */
      <% } %>
      'firebase/database')
    <% } %>

    const fireDb = firebase.database()
    const fireDbObj = firebase.database
    inject('fireDb', fireDb)
    inject('fireDbObj', fireDbObj)

  <% } %>

  /** --------------------------------------------------------------------------------------------- **/
  /** ---------------------------------------- FIREBASE FIRESTORE --------------------------------- **/
  /** --------------------------------------------------------------------------------------------- **/

  <% if (options.services.firestore) { %>
    <% if (!options.services.firestore.static) { %>
    await import(
      <% if (options.services.firestore.chunkName) { %>
      /* webpackChunkName: "<%= options.services.firestore.chunkName %>" */
      <% } %>
      <% if (options.services.firestore.preload) { %>
      /* webpackPreload: true */
      <% } %>
      'firebase/firestore')
    <% } %>

    const fireStore = firebase.firestore()
    const fireStoreObj = firebase.firestore
    inject('fireStore', fireStore)
    inject('fireStoreObj', fireStoreObj)

    if (options.services.firestore.enablePersistence) {
      try {
        fireStore.enablePersistence()
      } catch (e) {
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
    <% if (!options.services.storage.static) { %>
    await import(
      <% if (options.services.storage.chunkName) { %>
      /* webpackChunkName: "<%= options.services.storage.chunkName %>" */
      <% } %>
      <% if (options.services.storage.preload) { %>
      /* webpackPreload: true */
      <% } %>
      'firebase/storage')
    <% } %>

    const fireStorage = firebase.storage()
    const fireStorageObj = firebase.storage
    inject('fireStorage', fireStorage)
    inject('fireStorageObj', fireStorageObj)

  <% } %>

  /** --------------------------------------------------------------------------------------------- **/
  /** ---------------------------------------- FIREBASE FUNCTIONS --------------------------------- **/
  /** --------------------------------------------------------------------------------------------- **/

  <% if (options.services.functions) { %>
    <% if (!options.services.functions.static) { %>
    await import(
      <% if (options.services.functions.chunkName) { %>
      /* webpackChunkName: "<%= options.services.functions.chunkName %>" */
      <% } %>
      <% if (options.services.functions.preload) { %>
      /* webpackPreload: true */
      <% } %>
      'firebase/functions')
    <% } %>

    // If .location is undefined, default will be "us-central1"
    const fireFunc = firebase.app().functions(options.services.functions.location)
    const fireFuncObj = firebase.functions
    inject('fireFunc', fireFunc)
    inject('fireFuncObj', fireFuncObj)

  <% } %>

  /** --------------------------------------------------------------------------------------------- **/
  /** ---------------------------------------- FIREBASE MESSAGING --------------------------------- **/
  /** --------------------------------------------------------------------------------------------- **/

  <% if (options.services.messaging) { %>
  // Firebase Messaging can only be initiated on client side
  if (process.browser) {
    <% if (!options.services.messaging.static) { %>
    await import(
      <% if (options.services.messaging.chunkName) { %>
      /* webpackChunkName: "<%= options.services.messaging.chunkName %>" */
      <% } %>
      <% if (options.services.messaging.preload) { %>
      /* webpackPreload: true */
      <% } %>
      'firebase/messaging')
    <% } %>

    if (firebase.messaging.isSupported()) {
      const fireMess = firebase.messaging()
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
    <% if (!options.services.performance.static) { %>
    await import(
      <% if (options.services.performance.chunkName) { %>
      /* webpackChunkName: "<%= options.services.performance.chunkName %>" */
      <% } %>
      <% if (options.services.performance.preload) { %>
      /* webpackPreload: true */
      <% } %>
      'firebase/performance')
    <% } %>

    const firePerf = firebase.performance()
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
    <% if (!options.services.analytics.static) { %>
    await import(
      <% if (options.services.analytics.chunkName) { %>
      /* webpackChunkName: "<%= options.services.analytics.chunkName %>" */
      <% } %>
      <% if (options.services.analytics.preload) { %>
      /* webpackPreload: true */
      <% } %>
      'firebase/analytics')
    <% } %>

    const fireAnalytics = firebase.analytics()
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
    <% if (!options.services.remoteConfig.static) { %>
    await import(
      <% if (options.services.remoteConfig.chunkName) { %>
      /* webpackChunkName: "<%= options.services.remoteConfig.chunkName %>" */
      <% } %>
      <% if (options.services.remoteConfig.preload) { %>
      /* webpackPreload: true */
      <% } %>
      'firebase/remote-config')
    <% } %>

    const fireConfig = firebase.remoteConfig()
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
