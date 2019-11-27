import firebase from 'firebase'
import Vue from 'vue'

/* This file simply imports the needed types from firebase and forwards them */
declare module 'vue/types/vue' {
  interface Vue {
    $fireStore: firebase.firestore.Firestore
    $fireDb: firebase.database.Database
    $fireFunc: firebase.functions.Functions
    $fireStorage: firebase.storage.Storage
    $fireAuth: firebase.auth.Auth
    $fireMess: firebase.messaging.Messaging
    $fireAnalytics: firebase.analytics.Analytics
    $firePerf: firebase.performance.Performance
    $fireConfig: firebase.remoteConfig.RemoteConfig
  }
}

declare module '@nuxt/vue-app' {
  interface NuxtAppOptions {
    $fireStore: firebase.firestore.Firestore
    $fireDb: firebase.database.Database
    $fireFunc: firebase.functions.Functions
    $fireStorage: firebase.storage.Storage
    $fireAuth: firebase.auth.Auth
    $fireMess: firebase.messaging.Messaging
    $fireAnalytics: firebase.analytics.Analytics
    $firePerf: firebase.performance.Performance
    $fireConfig: firebase.remoteConfig.RemoteConfig
  }
}

declare module '@nuxt/types' {
  interface NuxtAppOptions {
    $fireStore: firebase.firestore.Firestore
    $fireDb: firebase.database.Database
    $fireFunc: firebase.functions.Functions
    $fireStorage: firebase.storage.Storage
    $fireAuth: firebase.auth.Auth
    $fireMess: firebase.messaging.Messaging
    $fireAnalytics: firebase.analytics.Analytics
    $firePerf: firebase.performance.Performance
    $fireConfig: firebase.remoteConfig.RemoteConfig
  }
}

declare module 'vuex/types' {
  interface Store<S> {
    $fireStore: firebase.firestore.Firestore
    $fireDb: firebase.database.Database
    $fireFunc: firebase.functions.Functions
    $fireStorage: firebase.storage.Storage
    $fireAuth: firebase.auth.Auth
    $fireMess: firebase.messaging.Messaging
    $fireAnalytics: firebase.analytics.Analytics
    $firePerf: firebase.performance.Performance
    $fireConfig: firebase.remoteConfig.RemoteConfig
  }
}
