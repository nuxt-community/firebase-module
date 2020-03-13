import { ServerResponse, IncomingMessage } from 'http'
import { Vue } from 'vue/types/vue'
import { NuxtAppOptions, Configuration } from '@nuxt/types'
import { NuxtConfiguration } from '@nuxt/vue-app'

import firebase from 'firebase'
import { auth } from 'firebase-admin'

/* This file simply imports the needed types from firebase and forwards them */
declare module 'vue/types/vue' {
  interface Vue {
    $fireStore: firebase.firestore.Firestore
    $fireStoreObj: typeof firebase.firestore
    $fireDb: firebase.database.Database
    $fireDbObj: typeof firebase.database
    $fireFunc: firebase.functions.Functions
    $fireFuncObj: typeof firebase.functions
    $fireStorage: firebase.storage.Storage
    $fireStorageObj: typeof firebase.storage
    $fireAuth: firebase.auth.Auth
    $fireAuthObj: typeof firebase.auth
    $fireMess: firebase.messaging.Messaging
    $fireMessObj: typeof firebase.messaging
    $fireAnalytics: firebase.analytics.Analytics
    $fireAnalyticsObj: typeof firebase.analytics
    $firePerf: firebase.performance.Performance
    $firePerfObj: typeof firebase.performance
    $fireConfig: firebase.remoteConfig.RemoteConfig
    $fireConfigObj: typeof firebase.remoteConfig
  }
}

export interface FirebaseConfiguration {
  apiKey: string
  authDomain: string
  databaseURL: string
  projectId: string
  storageBucket: string
  messagingSenderId: string
  appId: string
  measurementId: string
  fcmPublicVapidKey?: string
}

interface ServiceConfig {
  static?: boolean
  preload?: boolean
  chunkName?: string
}

export interface AuthServiceConfig extends ServiceConfig {
  initialize?:
    | {
        onSuccessMutation?: string
        onSuccessAction?: string
        onErrorMutation?: string
        onErrorAction?: string
        ssr?:
          | boolean
          | {
              credential: string
              serverLogin: boolean
            }
      }
    | boolean
}

export interface StoreServiceConfig extends ServiceConfig {
  enablePersistence?:
    | boolean
    | {
        synchronizeTabs: boolean
      }
  settings?: firebase.firestore.Settings
}

export interface FunctionsServiceConfig extends ServiceConfig {
  location?: string
  emulatorPort?: number
}

export interface StorageServiceConfig extends ServiceConfig {}

export interface DatabaseServiceConfig extends ServiceConfig {}

export interface MessagingServiceConfig extends ServiceConfig {
  createServiceWorker?:
    | boolean
    | {
        notification: {
          title: string
          body: string
          image: string
          vibrate: number[]
          clickPath: string
        }
      }
}

export interface PerformanceServiceConfig extends ServiceConfig {}

export interface AnalyticsServiceConfig extends ServiceConfig {}

export interface RemoteConfigServiceConfig extends ServiceConfig {
  settings?: {
    fetchTimeoutMillis?: number
    minimumFetchIntervalMillis?: number
  }
  defaultConfig?: Record<string, string>
}

export interface FirebaseModuleConfiguration {
  config:
    | {
        [envKey: string]: FirebaseConfiguration
      }
    | FirebaseConfiguration
  services: {
    auth?: boolean | AuthServiceConfig
    firestore?: boolean | StoreServiceConfig
    functions?: boolean | FunctionsServiceConfig
    storage?: boolean | StorageServiceConfig
    realtimeDb?: boolean | DatabaseServiceConfig
    messaging?: boolean | MessagingServiceConfig
    performance?: boolean | PerformanceServiceConfig
    analytics?: boolean | AnalyticsServiceConfig
    remoteConfig?: boolean | RemoteConfigServiceConfig
  }
  customEnv?: boolean
  onFirebaseHosting?: boolean | object
}

declare module '@nuxt/vue-app' {
  interface NuxtConfiguration {
    firebase?: FirebaseModuleConfiguration
  }

  interface NuxtAppOptions {
    $fireStore: firebase.firestore.Firestore
    $fireStoreObj: typeof firebase.firestore
    $fireDb: firebase.database.Database
    $fireDbObj: typeof firebase.database
    $fireFunc: firebase.functions.Functions
    $fireFuncObj: typeof firebase.functions
    $fireStorage: firebase.storage.Storage
    $fireStorageObj: typeof firebase.storage
    $fireAuth: firebase.auth.Auth
    $fireAuthObj: typeof firebase.auth
    $fireMess: firebase.messaging.Messaging
    $fireMessObj: typeof firebase.messaging
    $fireAnalytics: firebase.analytics.Analytics
    $fireAnalyticsObj: typeof firebase.analytics
    $firePerf: firebase.performance.Performance
    $firePerfObj: typeof firebase.performance
    $fireConfig: firebase.remoteConfig.RemoteConfig
    $fireConfigObj: typeof firebase.remoteConfig
  }
}

// Nuxt 2.9+
declare module '@nuxt/types' {
  interface Configuration {
    firebase?: FirebaseModuleConfiguration
  }

  interface NuxtAppOptions {
    $fireStore: firebase.firestore.Firestore
    $fireStoreObj: typeof firebase.firestore
    $fireDb: firebase.database.Database
    $fireDbObj: typeof firebase.database
    $fireFunc: firebase.functions.Functions
    $fireFuncObj: typeof firebase.functions
    $fireStorage: firebase.storage.Storage
    $fireStorageObj: typeof firebase.storage
    $fireAuth: firebase.auth.Auth
    $fireAuthObj: typeof firebase.auth
    $fireMess: firebase.messaging.Messaging
    $fireMessObj: typeof firebase.messaging
    $fireAnalytics: firebase.analytics.Analytics
    $fireAnalyticsObj: typeof firebase.analytics
    $firePerf: firebase.performance.Performance
    $firePerfObj: typeof firebase.performance
    $fireConfig: firebase.remoteConfig.RemoteConfig
    $fireConfigObj: typeof firebase.remoteConfig
  }
}

declare module 'vuex/types/index' {
  interface Store<S> {
    readonly $fireStore: firebase.firestore.Firestore
    $fireStoreObj: typeof firebase.firestore
    $fireDb: firebase.database.Database
    $fireDbObj: typeof firebase.database
    $fireFunc: firebase.functions.Functions
    $fireFuncObj: typeof firebase.functions
    $fireStorage: firebase.storage.Storage
    $fireStorageObj: typeof firebase.storage
    $fireAuth: firebase.auth.Auth
    $fireAuthObj: typeof firebase.auth
    $fireMess: firebase.messaging.Messaging
    $fireMessObj: typeof firebase.messaging
    $fireAnalytics: firebase.analytics.Analytics
    $fireAnalyticsObj: typeof firebase.analytics
    $firePerf: firebase.performance.Performance
    $firePerfObj: typeof firebase.performance
    $fireConfig: firebase.remoteConfig.RemoteConfig
    $fireConfigObj: typeof firebase.remoteConfig
  }
}

declare module 'http' {
  interface ServerResponse {
    verifiedFireAuthUser?: Omit<auth.UserRecord, 'customClaims'>
    verifiedFireAuthUserClaims?: auth.UserRecord['customClaims']
  }

  interface IncomingMessage {
    verifiedFireAuthUser?: Omit<auth.UserRecord, 'customClaims'>
    verifiedFireAuthUserClaims?: auth.UserRecord['customClaims']
  }
}
