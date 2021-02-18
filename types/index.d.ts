import { ServerResponse } from 'http'
import { Vue } from 'vue/types/vue'
import { NuxtAppOptions, Configuration } from '@nuxt/types'
import { NuxtConfiguration } from '@nuxt/vue-app'
import { ServiceAccount } from 'firebase-admin'

import firebase from 'firebase'
import { auth } from 'firebase-admin'

/***********************************
 * Module Config
************************************/
export interface FirebaseConfiguration {
  apiKey: string
  authDomain: string
  databaseURL?: string
  projectId: string
  storageBucket: string
  messagingSenderId: string
  appId: string
  measurementId: string
}

interface ServiceConfig {
  static?: boolean
  preload?: boolean
  chunkName?: string
}

interface messagingAction {
  action: string
  url?: string
}

export interface AuthServiceConfig extends ServiceConfig {
  persistence?: firebase.auth.Auth.Persistence

  initialize?: {
    onAuthStateChangedMutation?: string
    onAuthStateChangedAction?: string
    onIdTokenChangedMutation?: string
    onIdTokenChangedAction?: string
    subscribeManually?: boolean
  }

  ssr?:
    | boolean
    | {
        credential: string | ServiceAccount | true
        serverLogin?:
          | boolean
          | {
              sessionLifetime?: number
              loginDelay?: number
            }
        ignorePaths?: (string | RegExp)[]
      }

  emulatorPort?: number
  emulatorHost?: string
  disableEmulatorWarnings?: boolean
}

export interface FirestoreServiceConfig extends ServiceConfig {
  memoryOnly?: boolean
  enablePersistence?:
    | boolean
    | {
        synchronizeTabs: boolean
      }
  emulatorPort?: number
  emulatorHost?: string
  settings?: firebase.firestore.Settings
}

export interface FunctionsServiceConfig extends ServiceConfig {
  location?: string
  emulatorPort?: number
  emulatorHost?: string
}

export interface StorageServiceConfig extends ServiceConfig {}

export interface DatabaseServiceConfig extends ServiceConfig {
  emulatorPort?: number
  emulatorHost?: string
}

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
  actions?: messagingAction[],
  fcmPublicVapidKey?: string,
  inject?: string
}

export interface PerformanceServiceConfig extends ServiceConfig {}

export interface AnalyticsServiceConfig extends ServiceConfig {
  collectionEnabled?: boolean
}

export interface RemoteConfigServiceConfig extends ServiceConfig {
  settings?: {
    fetchTimeoutMillis?: number
    minimumFetchIntervalMillis?: number
  }
  defaultConfig?: Record<string, string>
}

export interface FirebaseModuleConfiguration {
  injectModule?: boolean,
  lazy?: boolean,
  config:
    | {
        [envKey: string]: FirebaseConfiguration
      }
    | FirebaseConfiguration
  services: {
    auth?: boolean | AuthServiceConfig
    firestore?: boolean | FirestoreServiceConfig
    functions?: boolean | FunctionsServiceConfig
    storage?: boolean | StorageServiceConfig
    database?: boolean | DatabaseServiceConfig
    messaging?: boolean | MessagingServiceConfig
    performance?: boolean | PerformanceServiceConfig
    analytics?: boolean | AnalyticsServiceConfig
    remoteConfig?: boolean | RemoteConfigServiceConfig
  }
  customEnv?: boolean
  onFirebaseHosting?: boolean | object
  terminateDatabasesAfterGenerate?: boolean
}

/***********************************
 * Injections
************************************/


interface ReadyFunction {
  (): void;
}

interface NuxtFireInstance {
  auth: firebase.auth.Auth
  authReady: ReadyFunction
  database: firebase.database.Database
  databaseReady: ReadyFunction
  firestore: firebase.firestore.Firestore
  firestoreReady: ReadyFunction
  functions: firebase.functions.Functions
  functionsReady: ReadyFunction
  storage: firebase.storage.Storage
  storageReady: ReadyFunction
  messaging: firebase.messaging.Messaging
  messagingReady: ReadyFunction
  performance: firebase.performance.Performance
  performanceReady: ReadyFunction
  analytics: firebase.analytics.Analytics
  analyticsReady: ReadyFunction
  remoteConfig: firebase.remoteConfig.RemoteConfig
  remoteConfigReady: ReadyFunction
}

declare module '@nuxt/vue-app' {
  interface NuxtConfiguration {
    firebase?: FirebaseModuleConfiguration
  }
  interface Context {
    $fireModule: typeof firebase
    $fire: NuxtFireInstance
  }
  interface NuxtAppOptions {
    $fireModule: typeof firebase
    $fire: NuxtFireInstance
  }
}

declare module '@nuxt/types' {
  interface Context {
    $fireModule: typeof firebase
    $fire: NuxtFireInstance
  }

  interface NuxtAppOptions {
    $fireModule: typeof firebase
    $fire: NuxtFireInstance
  }

  interface Configuration {
    firebase?: FirebaseModuleConfiguration
  }
}

declare module 'vue/types/vue' {
  interface Vue {
    $fireModule: typeof firebase
    $fire: NuxtFireInstance
  }
}

declare module '@nuxt/vue-app' {
  interface NuxtAppOptions {
     $fireModule: typeof firebase
     $fire: NuxtFireInstance
  }
}

declare module 'vuex/types/index' {
  interface Store<S> {
     $fireModule: typeof firebase
     $fire: NuxtFireInstance
  }
}

/***********************************
 * Misc
************************************/

export type FireAuthServerUser = Omit<
  auth.UserRecord,
  'disabled' | 'metadata' | 'providerData'
> &
  Partial<Pick<auth.UserRecord, 'disabled' | 'metadata' | 'providerData'>> & {
    allClaims: auth.DecodedIdToken,
    idToken: string
  }

declare module 'http' {
  interface ServerResponse {
    locals: Record<'user', FireAuthServerUser> & Record<string, any>
  }
}
