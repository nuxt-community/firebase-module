# Getting Started

## Requirements

Make sure you have the newest versions of Nuxt and Firebase installed and setup in your project.

```bash
yarn add nuxt # OR npm i nuxt
yarn add firebase # OR npm i firebase
```

## How to install

Install Nuxt-Fire via NPM or Yarn.

```bash
yarn add nuxt-fire # OR npm i nuxt-fire
```

## How to configure

Add the below code to your **nuxt.config.js** modules array and adjust it according to your needs.

Visit the [config section](/config) for a detailed overview about each configuration.

```js
modules: [
    [
      'nuxt-fire',
      {
        // Required:
        config: {
          development: {
            apiKey: '<apiKey>',
            authDomain: '<authDomain>',
            databaseURL: '<databaseURL>',
            projectId: '<projectId>',
            storageBucket: '<storageBucket>',
            messagingSenderId: '<messagingSenderId>',
            appId: '<appId>',
            measurementId: '<measurementId>'

          },
          production: {
            apiKey: '<apiKey>',
            authDomain: '<authDomain>',
            databaseURL: '<databaseURL>',
            projectId: '<projectId>',
            storageBucket: '<storageBucket>',
            messagingSenderId: '<messagingSenderId>',
            appId: '<appId>',
            measurementId: '<measurementId>'
          }
        },
        // The following options are optional:
        useOnly: ['auth','firestore','functions','storage','realtimeDb', 'messaging', 'performance', 'analytics', 'remoteConfig'],
        customEnv: false,
        functionsLocation: 'us-central1',
        remoteConfig: {
          settings: {
            fetchTimeoutMillis: 60000,
            minimumFetchIntervalMillis: 43200000,
          },
          defaultConfig: {
            'welcome_message': 'Welcome'
          }
        },
        initAuth: null
      }
    ]
  ],
```

You can also separate the config from the module array by using the **fire** object:

```js
modules: ['nuxt-fire'],

fire: {
// options
}
```
