# Getting Started

## Requirements

Make sure you have the newest versions of Nuxt and Firebase installed and setup in your project.

```bash
yarn add nuxt # OR npm i nuxt
yarn add firebase # OR npm i firebase
```

## Install

Install Nuxt-Fire via NPM or Yarn.

```bash
yarn add nuxt-fire # OR npm i nuxt-fire
```

## Configure

Add the below code to your **nuxt.config.js** modules array and adjust it according to your needs.

Visit the [config section](/config) for a detailed overview about each configuration.

### Simple Configuration

```js
modules: [
    [
      'nuxt-fire',
      {
        config: {
          apiKey: '<apiKey>',
          authDomain: '<authDomain>',
          databaseURL: '<databaseURL>',
          projectId: '<projectId>',
          storageBucket: '<storageBucket>',
          messagingSenderId: '<messagingSenderId>',
          appId: '<appId>',
          measurementId: '<measurementId>'
        }
      }
    ]
  ],
```

### Advanced Configuration

```js
modules: [
    [
      'nuxt-fire',
      {
        // Required:
        config: {
          apiKey: '<apiKey>',
          authDomain: '<authDomain>',
          databaseURL: '<databaseURL>',
          projectId: '<projectId>',
          storageBucket: '<storageBucket>',
          messagingSenderId: '<messagingSenderId>',
          appId: '<appId>',
          measurementId: '<measurementId>'
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
        // Experimental Features - use with caution:
        initAuth: null,
        initMessaging: false
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
