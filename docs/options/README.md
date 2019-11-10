# Options

## useOnly

By default, all supported Firebase products are loaded. If you only wish to load certain products (recommended!), add the `useOnly` option.

- type: `Array<string>`
- default: `['auth','firestore','functions','storage','realtimeDb', 'messaging', 'performance', 'analytics', 'remoteConfig']`
- required: `false`

## config[environment]

Your firebase config snippet. You can retrieve this information from your Firebase project's overview page:

`https://console.firebase.google.com/project/<your-project-id>/overview`

```js
{
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

`config.production` gets loaded when `NODE_ENV === 'production', same applies to 'development' and any other values that you set in NODE_ENV.

## customEnv

By default, the Firebase config will be chosen based on the NODE_ENV environment variable.

If customEnv is set to true, however, nuxt-fire will determine the environment based on the environment variable called FIRE_ENV, which you can define yourself. This gives you the flexibility to define as many different Firebase configs as you like, independent of your NODE_ENV.

- type: `Boolean`
- default: `false`
- required: `false`

::: warning
If you decide to turn on this option, you need to add the following code to your `nuxt.config.js` to make sure that the environment variable gets passed from server to client.
:::

```js
env: {
  FIRE_ENV: process.env.FIRE_ENV
}
```

After that, you can set FIRE_ENV to anything you like...

```js
"scripts": {
  "serveFoo": "FIRE_ENV=foofoofoo nuxt",
  "serveFaa": "FIRE_ENV=faafaafaa nuxt",
}
```

And then add your config to the nuxt-fire options in your `nuxt.config.js`:

```js
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

## functionsLocation

By default, the Functions location is set to `us-central1`.
You can change the location with this option.

- type: `String`
- default: `null` (results in `us-central1`)
- required: `false`

More information [here](https://firebase.google.com/docs/functions/locations).

## remoteConfig

You can customize how remoteConfig should be initialized with the following settings:

```js
{
  settings: {
    fetchTimeoutMillis: 60000,
    minimumFetchIntervalMillis: 43200000,
  },
  defaultConfig: {
    'welcome_message': 'Welcome'
  }
}
```

## initAuth (EXPERIMENTAL)

::: warning
This feature has not been fully tested for all cases, use it with care. It might get changed completely in future updates. If you have any issues with the initAuth feature please let us know [here](https://github.com/lupas/nuxt-fire/issues/53) and help us improve it.
:::

Set up SSR-ready onAuthStateChanged() without any effort.

Just add a mutation/action to your vuex store that handles what to do with the authUser object (e.g. save it to the state or get user data from FireStore) and then define the name of the action/mutation in the initAuth configuration as below:

```js
initAuth: {
  onSuccessMutation: 'SET_AUTH_USER',
  onSuccessAction: null,
  onErrorMutation: null,
  onErrorAction: 'handleAuthError'
}
```

When onAuthStateChanged() gets triggered by Firebase, the mutations/actions defined above will be called either on success or error with the following attributes:

**onSuccessMutation & onSuccessAction:**  
({ authUser, claims })

**onErrorMutation & onErrorAction:**  
(error)
