# Options

## config <Badge text="REQUIRED" type="tip"/>

Your firebase config snippet and other Firebase specific parameters. You can retrieve this information from your Firebase project's overview page:

`https://console.firebase.google.com/project/<your-project-id>/overview`

```js
config: {
  // REQUIRED: Official config for firebase.initializeApp(config):
  apiKey: '<apiKey>',
  authDomain: '<authDomain>',
  databaseURL: '<databaseURL>',
  projectId: '<projectId>',
  storageBucket: '<storageBucket>',
  messagingSenderId: '<messagingSenderId>',
  appId: '<appId>',
  measurementId: '<measurementId>',
  // OPTIONAL: Additional config for other services:
  fcmPublicVapidKey: '<publicVapidKey>' // Sets vapid key for FCM after initialization
}
```

::: tip
Can be defined **per NODE_ENV environment** if put in child-objects `config.production` and `config.development`, meaning that e.g. `config.production` gets loaded when `NODE_ENV === 'production'`.

You can also specify multiple custom environments as mentioned in the [customEnv](/options/#customenv) option below.
:::

## customEnv

- Type: `Boolean`
- Default: `false`

By default, the Firebase config will be chosen either directly from the **config-object** or from a **child-object named after the current NODE_ENV environment variable**.

If set to `true`, however, nuxt-fire will determine the environment based on the environment variable called `FIRE_ENV`, which you can define yourself. This gives you the flexibility to define as many different Firebase configs as you like, independent of your NODE_ENV.

::: warning
If you decide to turn on this option, you need to define `process.env.FIRE_ENV` in your code and additionally add the following code to your `nuxt.config.js` to make sure that the environment variable gets passed from server to client.
:::

```js
env: {
  FIRE_ENV: process.env.FIRE_ENV
}
```

After that, you can set FIRE_ENV to anything you like...

```js
// package.json
"scripts": {
  "serveFoo": "FIRE_ENV=foofoofoo nuxt",
  "serveFaa": "FIRE_ENV=faafaafaa nuxt",
}
```

And then add your config to the nuxt-fire options:

```js
// nuxt.config.js
// within nuxt-fire config
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

## services <Badge text="REQUIRED" type="tip"/>

By default, **NO** Firebase products are initialized. To initialize a specific service, set its services flag to `true` or create a child object and name the key after the service.

Available services:

```js
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

```js
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

::: warning Be aware
Only applies if `static === false`.
:::

#### chunkName

Be default, the dynamically imported services are named `vendors.firebase-${serviceName}.js` in development mode, and `[id]` in production mode (`process.env.NODE_ENV === 'production'`). If you want to change this behaviour, you can do so with this option.

::: warning Be aware
Only applies if `static === false`.
:::

### auth

Initializes Firebase Authentication and makes it available via `$fireAuth` and `$fireAuthObj`.

- Type: `Boolean` or `Object`
- Default: `false`

```js
auth: true

// or

auth: {
  initialize: {
    onSuccessMutation: 'ON_SUCCESS_MUTATION',
    onSuccessAction: null,
    onErrorMutation: null,
    onErrorAction: 'onErrorAction',
    ssr: false // default
  }
}
```

#### initialize <Badge text="EXPERIMENTAL" type="warn"/>

This sets up SSR-ready `onAuthStateChanged()` without any effort.

Just add a mutation/action to your vuex store that handles what to do with the authUser object (e.g. save it to the state or get user data from FireStore) and then define the name of the action/mutation in the initAuth configuration as below

When onAuthStateChanged() gets triggered by Firebase, the defined mutations/actions will be called either on success or error with the `authUser`, `claims` or `error` attributes seen below:

##### onSuccessMutation / onSuccessAction / onErrorMutation / onErrorAction

```js
ON_SUCCESS_MUTATION: (state, { authUser, claims }) => {
  // Do something with the authUser and the claims object...
}

onSuccessAction: (ctx, { authUser, claims }) => {
  // Do something with the authUser and the claims object...
}

ON_ERROR_MUTATION: (state, error) => {
  // Hanlde an auth error in a mutation...
}

onErrorAction: (ctx, error) => {
  // Hanlde an auth error in an action...
}
```

::: warning
Do not save `authUser` directly to the store, since this will save an object reference to the state which gets directly updated by Firebase Auth periodically and therefore throws a `vuex` error if `strict != false`.

```js
export const mutations = {
  onSuccessMutation: (state, { authUser, claims }) => {
    // Don't do this:
    state.user = authUser
    // Do this:
    state.user.id = authUser.uid
    state.user.email = authUser.email
  }
}
```

:::

##### ssr <Badge text="EXPERIMENTAL" type="warn"/>

If `ssr = true`, nuxt-fire generates a service worker that refreshes the Firebase Auth idToken and sends it with each request to the server if the user is logged in, as described [here](https://firebase.google.com/docs/auth/web/service-worker-sessions)

The option further adds a serverMiddleware that checks on server side if the token is valid and then returns the validated authUser object via `ctx.res.verifiedFireAuthUser` to the `nuxtServerInit` action.

A tutorial on how to set this up can be found [here](/tutorials/#firebase-auth-in-ssr-universal-mode).

### firestore

Initializes Firebase Firestore and makes it available via `$fireStore` and `$fireStoreObj`.

- Type: `Boolean` or `Object`
- Default: `false`

```js
firestore: true

// or

firestore: {
  static: false, // default
  preload: false, // default
  chunkName: process.env.NODE_ENV !== 'production' ? 'firebase-auth' : '[id]', // default
  enablePersistence: true
}
```

#### enablePersistence

Enables persistence in web apps.

- Type: `Boolean`
- Default: `false`

More information [here](https://firebase.google.com/docs/firestore/manage-data/enable-offline).

### functions

Initializes Firebase Functions and makes it available via `$fireFunc` and `$fireFuncObj`.

- Type: `Boolean` or `Object`
- Default: `false`

```js
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

```js
storage: true
```

### realtimeDb

Initializes Firebase Realtime Database and makes it available via `$fireDb` and `$fireDbObj`.

- Type: `Boolean` or `Object`
- Default: `false`

```js
realtimeDb: true
```

### messaging

Initializes Firebase Messaging and makes it available via `$fireMess` and `$fireMessObj`.

- Type: `Boolean` or `Object`
- Default: `false`

```js
messaging: true

// or

messaging: {
  createServiceWorker: false,
  onFirebaseHosting: false
}
```

#### createServiceWorker <Badge text="EXPERIMENTAL" type="warn"/>

- Type: `Boolean` or `Object`
- Default: `false`

Setting the **createServiceWorker** flag to true automatically creates a service worker called `firebase-messaging-sw.js` in your static folder. The service worker is fully configured for FCM with the newest Firebase scripts.

##### Notification Payload

In the same way the [Notification Composer](https://console.firebase.google.com/project/nuxt-fire-demo/notification/compose) does, we expect the notification format payload be named **notification** and can contain the following config:

```js
notification: {
  title: "FCM Message",
  body: "This is a message from FCM",
  image: '<imageUrl>',
  vibrate: [200, 100, 200, 100, 200, 100, 200],
  clickPath: '<egYourWebsiteUrl>'
}
```

#### onFirebaseHosting

- Type: `Boolean` or `Object`
- Default: `false`

If your application is hosted on Firebase hosting, you can enable this flag in order to load the newest Firebase scripts in the service worker directly from there instead of www.gstatic.com.

### performance

Initializes Firebase Performance and makes it available via `$firePerf` and `$firePerfObj`.

- Type: `Boolean` or `Object`
- Default: `false`

```js
performance: true
```

### analytics

Initializes Firebase Storage and makes it available via `$fireAnalytics` and `$fireAnalyticsObj`.

- Type: `Boolean` or `Object`
- Default: `false`

```js
analytics: true
```

### remoteConfig

Initializes Firebase Storage and makes it available via `$fireConfig` and `$fireConfigObj`.

- Type: `Boolean` or `Object`
- Default: `false`

```js
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
