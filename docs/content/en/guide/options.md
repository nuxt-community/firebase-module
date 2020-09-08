---
title: Options
description: ''
position: 3
category: Guide
---

## config

<badge>REQUIRED</badge>

Your firebase config snippet and other Firebase specific parameters. You can retrieve this information from your Firebase project's overview page:

`https://console.firebase.google.com/project/<your-project-id>/overview`

```js[nuxt.config.js]
config: {
  // REQUIRED: Official config for firebase.initializeApp(config):
  apiKey: '<apiKey>',
  authDomain: '<authDomain>',
  databaseURL: '<databaseURL>',
  projectId: '<projectId>',
  storageBucket: '<storageBucket>',
  messagingSenderId: '<messagingSenderId>',
  appId: '<appId>',
  measurementId: '<measurementId>'
}
```

<alert type="info">

Can be defined **per NODE_ENV environment** if put in child-objects `config.production` and `config.development`, meaning that e.g. `config.production` gets loaded when `NODE_ENV === 'production'`.

You can also specify multiple custom environments as mentioned in the [customEnv](/guide/options/#customenv) option below.

</alert>

## customEnv

- Type: `Boolean`
- Default: `false`

By default, the Firebase config will be chosen either directly from the **config-object** or from a **child-object named after the current NODE_ENV environment variable**.

If set to `true`, however, the module will determine the environment based on the environment variable called `FIRE_ENV`, which you can define yourself. This gives you the flexibility to define as many different Firebase configs as you like, independent of your NODE_ENV.

<alert type="warning">

If you decide to turn on this option, you need to define `process.env.FIRE_ENV` in your code and additionally add the following code to your `nuxt.config.js` to make sure that the environment variable gets passed from server to client.

</alert>

```js[nuxt.config.js]
env: {
  FIRE_ENV: process.env.FIRE_ENV
}
```

After that, you can set FIRE_ENV to anything you like...

```js[package.json]
"scripts": {
  "serveFoo": "FIRE_ENV=foofoofoo nuxt",
  "serveFaa": "FIRE_ENV=faafaafaa nuxt",
}
```

And then add your config to the module options:

```js[nuxt.config.js]
// within the module's config
config: {
  foofoofoo: {
    apiKey: '<apiKey>',
    authDomain: '<authDomain>',
    databaseURL: '<databaseURL>',
    projectId: '<projectId>',
    storageBucket: '<storageBucket>',
    messagingSenderId: '<messagingSenderId>',
    appId: '<appId>',
    measurementId: '<measurementId>'
  },
  faafaafaa: {
    //
  }
}
```

## onFirebaseHosting

- Type: `Boolean` or `Object`
- Default: `false`

If your application is hosted on Firebase hosting, you can enable this flag in order to load the newest Firebase scripts in the service workers directly from there instead of www.gstatic.com.

## services

<badge>REQUIRED</badge>

By default, **NO** Firebase products are initialized. To initialize a specific service, set its services flag to `true` or create a child object and name the key after the service.

Available services:

```js[nuxt.config.js]
services: {
  auth: true,
  firestore: true,
  functions: true,
  storage: true,
  realtimeDb: true,
  messaging: true,
  performance: true,
  analytics: true,
  remoteConfig: true
}
```

### ALL SERVICES

All services mentioned below can have the following options:

```js[nuxt.config.js]
[serviceName]: {
  static: false, // default
  preload: false, // default
  chunkName: process.env.NODE_ENV !== 'production' ? `firebase-${serviceName}` : '[id]' // default
}
```

#### static

By default, each service gets imported dynamically, which splits them into separate chunks. If `static = true` however, we import them statically, so the services are bundled into `vendors.app.js`.

```js
// static: false (default)
await import 'firebase/auth'
// static: true
import 'firebase/auth'
```

#### preload

Preloads dynamically loaded services. More information [here](https://webpack.js.org/guides/code-splitting/#prefetchingpreloading-modules).

<alert type="warning">

**Be aware**

Only applies if `static === false`.

</alert>

#### chunkName

By default, the dynamically imported services are named `vendors.firebase-${serviceName}.js` in development mode, and `[id]` in production mode (`process.env.NODE_ENV === 'production'`). If you want to change this behaviour, you can do so with this option.

<alert type="warning">

**Be aware**

Only applies if `static === false`.

</alert>

### auth

Initializes Firebase Authentication and makes it available via `$fireAuth` and `$fireAuthObj`.

- Type: `Boolean` or `Object`
- Default: `false`

```js[nuxt.config.js]
auth: true

// or

auth: {
  persistence: 'local', // default

  // it is recommended to configure either a mutation or action but you can set both
  initialize: {
    onAuthStateChangedMutation: 'ON_AUTH_STATE_CHANGED_MUTATION',
    // onAuthStateChangedAction: 'onAuthStateChangedAction'
  },

  ssr: false // default
}
```

#### persistence

Set [firebase auth persistence](https://firebase.google.com/docs/auth/web/auth-state-persistence)

#### initialize

This sets up an `onAuthStateChanged()` listener and hooks it up to the vuex store.

Just add a mutation/action to your vuex store ([as seen below](#onauthstatechangedmutation-onauthstatechangedaction)) that handles what to do with the authUser object (e.g. save it to the state or get user data from FireStore) and then define the name of the action/mutation in the `firebase.services.auth.initialize` configuration as above.

When onAuthStateChanged() gets triggered by Firebase, the defined mutation/action will be called with the `authUser` and `claims` attributes as [as seen below](#onauthstatechangedmutation-onauthstatechangedaction)

To unsubscribe from the listener simply call the `$fireAuthUnsubscribe()` function which is provided as a [combined inject](https://nuxtjs.org/guide/plugins#combined-inject).

##### onAuthStateChangedMutation / onAuthStateChangedAction

```js
ON_AUTH_STATE_CHANGED_MUTATION: (state, { authUser, claims }) => {
  if (!authUser) {
    // claims = null

    // perform logout operations
  } else {
    // Do something with the authUser and the claims object...
  }
}

onAuthStateChangedAction: (ctx, { authUser, claims }) => {
  if (!authUser) {
    // claims = null

    // Perform logout operations
  } else {
    // Do something with the authUser and the claims object...
  }
}
```

<alert type="warning">

Do not save `authUser` directly to the store, since this will save an object reference to the state which gets directly updated by Firebase Auth periodically and therefore throws a `vuex` error if `strict != false`.

```js
export const mutations = {
  ON_AUTH_STATE_CHANGED_MUTATION: (state, { authUser, claims }) => {
    // Don't do this:
    state.user = authUser

    // Do this:
    state.user.id = authUser.uid
    state.user.email = authUser.email
    state.user.emailVerified = authUser.emailVerified

    // Or this:
    const { uid, email, emailVerified } = authUser
    state.user = { uid, email, emailVerified }
  }
}
```

</alert>

#### ssr

This sets up SSR ready functionality with minimal effort.

If `ssr = true`, the module generates a service worker that refreshes the Firebase Auth idToken and sends it with each request to the server if the user is logged in, as described [here](https://firebase.google.com/docs/auth/web/service-worker-sessions)

The option further adds a plugin that checks on server side if the token is valid and then injects a simplified [`admin.auth.UserRecord`](https://firebase.google.com/docs/reference/admin/node/admin.auth.UserRecord) into the context variable `res.locals.user`.

The simplified user record contains the following properties:

- `uid`: The users uid
- `email`: The users email
- `emailVerified`: If the email was verified
- `displayName`: The users display name
- `allClaims`: All claims from the [admin.auth.DecodedIdToken](https://firebase.google.com/docs/reference/admin/node/admin.auth.DecodedIdToken)

The injected user can be used by context aware life cycle hooks on the server side (e.g. the store action `nuxtServerInit`).

A tutorial on how to set this up can be found [here](/tutorials/ssr/#firebase-auth-in-ssr-universal-mode).

##### Firebase admin authorization

If you want additional information on the user the module can inject a full [`admin.auth.UserRecord`](https://firebase.google.com/docs/reference/admin/node/admin.auth.UserRecord) into the `ctx.res.locals.user` property.

The `allClaims` property is set in addition to the default user record properties.

To enable this you can authorize the firebase admin by [generating a service account key](https://firebase.google.com/docs/admin/setup#initialize-sdk) and linking to it with the following configuration:

<alert type="danger">

**NEVER deploy your service account key to a publicly accessible location**

The service account key file is highly sensitive as it grants full access to your firebase project.

In production always prefer providing the path to the key file through the `GOOGLE_APPLICATION_CREDENTIALS` environment variable (`auth.ssr.credential = true`) and store the key file in a location which is not exposed by your webserver.

</alert>

```js[nuxt.config.js]
auth: {
  ssr: {
    // provide the path to the service account file
    credential: '/absolute/path/to/serviceAccount.json'

    // nuxt aliases are supported
    credential: '~/assets/serviceAccount.json'

    // if this is set to true the credential will be retrieved from GOOGLE_APPLICATION_CREDENTIALS environment variable
    credential: true

    // The service worker session automatically ignores external resources, static files and HMR calls
    // If you need to ignore additional routes, define them here
    ignorePaths: [
      '/admin', // path is ignored if url.pathname.startsWith('/admin')
      /^api/ // path is ignored if url.pathname without the leading slash (/) matches the RegExp
    ]
  }
}
```

##### Server side Firebase client SDK login <badge type="warning">EXPERIMENTAL</badge>

Once you have [properly setup the admin sdk](#firebase-admin-authorization) you can enable server side login to use firebase services on the server, e.g. to perform store hydration on page load.

Simply set `auth.ssr.serverLogin = true`.

The module creates a separate firebase app/session for every authenticated user to avoid authorization context leakage.  
You can configure session lifetime with `auth.ssr.serverLogin.sessionLifetime`  

```js[nuxt.config.js]
auth: {
  ssr: {
    // see above

    serverLogin: true
    // or
    serverLogin: {
      // Takes a duration in milliseconds
      sessionLifetime: 0 // default (session is kept only for the duration of the request)
      // Takes a duration in milliseconds
      loginDelay: 50 // default (20 queries per second = minimum recommended delay)
    }
  }
}
```

<alert type="warning">

**Programmatic server implementation**

If you are using an external server implementation to start nuxt programmatically:

- The `@nuxtjs/firebase` module has to be included in your server package (`yarn add @nuxtjs/firebase`).
- Make sure to initialize the nuxt build outside of the server request callback for session management to work properly:

  ```js
  import express from 'express'
  import { Nuxt } from 'nuxt'

  const server = express()

  // do this outside of the server callback so the nuxt build is kept in memory
  const nuxt = new Nuxt({
    dev: false,
    buildDir: '.nuxt'
  })

  server.use(async (req, res, next) => {
    // this will resolve immediately after the first render
    await nuxt.ready()

    nuxt.render(req, res, next)
  })
  ```

</alert>

<alert type="danger">

**Do not use this feature for high traffic sites**

This module provides this feature to facilitate data hydration in SSR calls.

However, the client SDK is not intended for use on a server.

Authentication is rate limited by IP for security reasons. The base limit is 20 QPS / IP (as of March 2020) and a couple dozen logins per user per 10 minutes, but it’s subject to change as needed, without notice by Firebase.

Try to reduce the need for SSR by providing pre-rendered pages ([`nuxt generate`](https://nuxtjs.org/guide#static-generated-pre-rendering-)) through static hosting and only fall back on SSR for authenticated and dynamic routes.

If you run into rate limiting issues try adjusting the `auth.ssr.serverLogin.loginDelay` configuration.

DO NOT USE THE CLIENT SDK IN API OPERATIONS.

If you have an API which is served over nuxt ssr:

1. Please ensure it does not use `firebase` client sdk functionality (e.g. `auth`, `firestore`, `storage`, ...).  
   Instead use the corresponding functionality of a fully authenticated `firebase-admin` instance.
2. Add the API base path to the `auth.ssr.ignorePaths` configuration.
   e.g.:

   ```js[nuxt.config.js]
   auth: {
     ssr: {
       // ...
       ignorePaths: [
         '/api/',
         // or
         /^api\//
       ]
     }
   }
   ```

</alert>

### firestore

Initializes Firebase Firestore and makes it available via `$fireStore` and `$fireStoreObj`.

- Type: `Boolean` or `Object`
- Default: `false`

```js[nuxt.config.js]
firestore: true

// or

firestore: {
  memoryOnly: false, // default
  static: false, // default
  preload: false, // default
  chunkName: process.env.NODE_ENV !== 'production' ? 'firebase-auth' : '[id]', // default
  enablePersistence: true,
  settings: {
    // Firestore Settings - currently only works in SPA mode
  }
}
```

#### memoryOnly

With this flag set to true, the *memory-onl* build is loaded as mentioned [here](https://firebase.google.com/support/release-notes/js#version_7130_-_march_26_2020)

- Type: `Boolean` or `Object`
- Default: `false`

#### enablePersistence

Enables persistence in web apps.

- Type: `Boolean` or `Object`
- Default: `false`

```js[nuxt.config.js]
firestore: {
  // ...
  enablePersistence: true
}

// or

firestore: {
  // ...
  enablePersistence: {
    /**
     * Whether to synchronize the in-memory state of multiple tabs. Setting this
     * to 'true' in all open tabs enables shared access to local persistence,
     * shared execution of queries and latency-compensated local document updates
     * across all connected instances.
     *
     * To enable this mode, `synchronizeTabs:true` needs to be set globally in all
     * active tabs. If omitted or set to 'false', `enablePersistence()` will fail
     * in all but the first tab.
     */
    synchronizeTabs: true
  }
}
```

More information [here](https://firebase.google.com/docs/firestore/manage-data/enable-offline).

#### settings

Adds settings to your Firebase initialization, e.g. `host` or `ssl`.
See more [here](https://firebase.google.com/docs/reference/js/firebase.firestore.Settings).

<alert type="warning">

**Important**

When using settings() in Universal mode (see [this issue](https://github.com/nuxt-community/firebase-module/issues/116)), you need to set `runInNewContext` to `false` in your nuxt.config.js like so:

```js[nuxt.config.js]
// Add this to your nuxt.config.js
render: {
  bundleRenderer: {
    runInNewContext: false
  }
},
```

</alert>

### functions

Initializes Firebase Functions and makes it available via `$fireFunc` and `$fireFuncObj`.

- Type: `Boolean` or `Object`
- Default: `false`

```js[nuxt.config.js]
functions: true

// or

functions: {
  location: 'us-central1',
  emulatorPort: 12345
}
```

#### location

- Type: `String`
- Default: `us-central1`

More information [here](https://firebase.google.com/docs/functions/locations).

#### emulatorPort

- Type: `Integer`
- Default: `null`

Sets up `useFunctionsEmulator("http://localhost:EMULATOR_PORT")` to point to a Cloud Functions emulator running locally instead of the productive one.

More information in the official Firebase [API Docs](<https://firebase.google.com/docs/reference/android/com/google/firebase/functions/FirebaseFunctions.html#useFunctionsEmulator(java.lang.String)>) and [Functions Docs](https://firebase.google.com/docs/functions/local-emulator).

### storage

Initializes Firebase Storage and makes it available via `$fireStorage` and `$fireStorageObj`.

- Type: `Boolean` or `Object`
- Default: `false`

```js[nuxt.config.js]
storage: true
```

### realtimeDb

Initializes Firebase Realtime Database and makes it available via `$fireDb` and `$fireDbObj`.

- Type: `Boolean` or `Object`
- Default: `false`

```js[nuxt.config.js]
realtimeDb: true
```

### messaging

Initializes Firebase Messaging and makes it available via `$fireMess` and `$fireMessObj`.
Message payload is expected as defined by Firebase [here](https://firebase.google.com/docs/reference/fcm/rest/v1/projects.messages#WebpushConfig).

- Type: `Boolean` or `Object`
- Default: `false`

```js[nuxt.config.js]
messaging: true

// or

messaging: {
  createServiceWorker: false,
  actions: [
    {
      action: 'randomName',
      url: 'randomUrl'
    }
  ]
  fcmPublicVapidKey: '<publicVapidKey>' // OPTIONAL : Sets vapid key for FCM after initialization
}
```

#### createServiceWorker

- Type: `Boolean` or `Object`
- Default: `false`

Setting the **createServiceWorker** flag to true automatically creates a service worker called `firebase-messaging-sw.js` in your static folder. The service worker is fully configured for FCM with the newest Firebase scripts.

#### actions

> Only works if `createServiceWorker === true`

An array of actions for which a `notificationClick` handler should be registered in the service worker that opens the defined url for the specific action sent by the payload.

```js
{
  action: 'randomName',
  url: 'randomUrl'
}
```

Make sure to define the action in your payload like so:

```js
const message = {
    // ...
    "webpush": {
      "notification": {
        "actions": [
          {
            action: "randomName",
            title: "Go to URL"
          }
        ]
      },
    },
    // ...
}
await messaging.send(message)
```

#### fcmPublicVapidKey

Allows FCM to use the VAPID key credential when sending message requests to different push services, see more [here](https://firebase.google.com/docs/cloud-messaging/js/client).

### performance

Initializes Firebase Performance and makes it available via `$firePerf` and `$firePerfObj`.

- Type: `Boolean` or `Object`
- Default: `false`

```js[nuxt.config.js]
performance: true
```

### analytics

Initializes Firebase Analytics and makes it available via `$fireAnalytics` and `$fireAnalyticsObj`.

- Type: `Boolean` or `Object`
- Default: `false`

```js[nuxt.config.js]
analytics: true

// or

analytics: {
  collectionEnabled: true, // default
}
```

#### collectionEnabled

Allows to disable analytics collection. Usefull to disable analytics in development mode or before fullfillment of legal obligation.

Can be enabled back by `$fireAnalytics.setAnalyticsCollectionEnabled(true)`

### remoteConfig

Initializes Firebase Remote Config and makes it available via `$fireConfig` and `$fireConfigObj`.

- Type: `Boolean` or `Object`
- Default: `false`

```js[nuxt.config.js]
remoteConfig: true

// or

remoteConfig: {
  settings: {
    fetchTimeoutMillis: 60000, // default
    minimumFetchIntervalMillis: 43200000, // default
  },
  defaultConfig: {
    'welcome_message': 'Welcome'
  }
}
```
