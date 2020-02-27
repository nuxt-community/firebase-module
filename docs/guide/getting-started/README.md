# Getting Started

## Requirements

Make sure you have the newest versions of Nuxt and Firebase installed and setup in your project.

```bash
yarn add nuxt # OR npm i nuxt
yarn add firebase # OR npm i firebase
```

## Install

Install the module via NPM or Yarn.

```bash
yarn add @nuxtjs/firebase # OR npm i @nuxtjs/firebase
```

## Configure

Add the below code to your **nuxt.config.js** modules array and adjust it according to your needs.

Visit the [config section](/guide/options/#config) for a detailed overview about each configuration.

### Simple Configuration

```js
modules: [
    [
      '@nuxtjs/firebase',
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
        },
        services: {
          auth: true // Just as example. Can be any other service.
        }
      }
    ]
  ],
```

See list of available services [here](/guide/options/#services).

### Full Configuration

If you want to use every little configuration option there is, refer to the example below.

```js
modules: [
    [
      '@nuxtjs/firebase',
      {
        config: {
          production: {
            apiKey: '<apiKey>',
            authDomain: '<authDomain>',
            databaseURL: '<databaseURL>',
            projectId: '<projectId>',
            storageBucket: '<storageBucket>',
            messagingSenderId: '<messagingSenderId>',
            appId: '<appId>',
            measurementId: '<measurementId>'
          },
          development: {
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
        customEnv: false,
        onFirebaseHosting: false,
        services: {
          auth: {
            // Experimental Feature, use with caution.
            initialize: {
              onSuccessMutation: "SET_AUTH_USER",
              onSuccessAction: null,
              onErrorMutation: null,
              onErrorAction: "handleAuthError",
              ssr: false // Default
            }
          },
          firestore: true,
          functions: {
            location: 'us-central1', // Default
            emulatorPort: 12345
          },
          storage: true,
          realtimeDb: true,
          performance: true,
          analytics: true,
          remoteConfig: {
            settings: {
              fetchTimeoutMillis: 60000, // Default
              minimumFetchIntervalMillis: 43200000 // Default
            },
            defaultConfig: {
              welcome_message: "Welcome"
            }
          },
          messaging: {
            createServiceWorker: true
          }
        }
      }
    ]
  ],
```

You can also separate the config from the module array by using the **firebase** object:

```js
modules: ['@nuxtjs/firebase'],

firebase: {
// options
}
```
