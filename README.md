# 🔥 Nuxt-Fire

<p align="center"><img align="center" height="300px" src="https://nuxt-fire-demo.firebaseapp.com/logo_text.png"/></p>

<p align="center">
  <a href="https://www.npmjs.com/package/nuxt-fire"><img src="https://badgen.net/npm/dm/nuxt-fire" alt="Downloads"></a>
  <a href="https://www.npmjs.com/package/nuxt-fire"><img src="https://badgen.net/npm/v/nuxt-fire" alt="Version"></a>
  <a href="https://www.npmjs.com/package/nuxt-fire"><img src="https://badgen.net/npm/license/nuxt-fire" alt="License"></a>
 </p>
</p>

> Easily integrate Firebase into your Nuxt 2 project.

**Important:**
This module is meant for easy and quick set-up of Firebase in a Nuxt project. Due to the nature of this module, it is possibly not optimal for websites that need to be super performant and/or SEO friendly, since the module adds the Firebase services to the global scope. If you wan't your website to be more performant, you'd probably be better off by importing the services only in the files where you need them (i.e. by NOT using this module). That being said, the difference might be marginal depending on your project.

## Demo

[Demo](https://nuxt-fire-demo.firebaseapp.com/)

## Requirements

Make sure you have Nuxt and Firebase installed in your project.

```json
"dependencies": {
  "nuxt": "^2.8.1",
  "firebase": "^6.3.3"
}
```

## Install

```bash
npm i nuxt-fire
```

## Quick Setup

Add the below code to **nuxt.config.js**.

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
            appId: '<appId>'
          },
          production: {
            apiKey: '<apiKey>',
            authDomain: '<authDomain>',
            databaseURL: '<databaseURL>',
            projectId: '<projectId>',
            storageBucket: '<storageBucket>',
            messagingSenderId: '<messagingSenderId>',
            appId: '<appId>'
          }
        },
        // The following options are optional:
        useOnly: ['auth','firestore','functions','storage','realtimeDb', 'messaging', 'performance'],
        customEnv: false,
        functionsLocation: 'us-central1',
      }
    ]
  ],
```

## Usage

You can access the various Firebase products with **\$foo** in almost any context using `app.$foo` or `this.$foo`, including store actions. Make sure to replace the _foo_ with a shortcut from the table below.

Firebase products supported by nuxt-fire so far:

| Firebase Product  | Shortcut      |
| ----------------- | ------------- |
| Authentication    | \$fireAuth    |
| Realtime Database | \$fireDb      |
| Firestore         | \$fireStore   |
| Storage           | \$fireStorage |
| Functions         | \$fireFunc    |
| Messaging         | \$fireMess    |
| Performance       | \$firePerf    |

See [Firebase's official docs](https://firebase.google.com/docs/) for more usage information.

You can further access the objects like so:

| Firebase Obj         | Shortcut         |
| -------------------- | ---------------- |
| firebase.auth        | \$fireAuthObj    |
| firebase.database    | \$fireDbObj      |
| firebase.firestore   | \$fireStoreObj   |
| firebase.storage     | \$fireStorageObj |
| firebase.functions   | \$fireFuncObj    |
| firebase.messaging   | \$fireMessObj    |
| firebase.performance | \$firePerfObj    |

## Options

#### useOnly

By default, all supported Firebase products are loaded. If you only wish to load certain products (recommended!), add the `useOnly` option.

- type: `Array<string>`
- default: `['auth','firestore','functions','storage','realtimeDb', 'messaging', 'performance']`
- required: `false`

#### config[environment]

Your firebase config snippet. You can retrieve this information from your Firebase project's overview page:

`https://console.firebase.google.com/project/your-project-id/overview`

```js
{
  apiKey: '<apiKey>',
  authDomain: '<authDomain>',
  databaseURL: '<databaseURL>',
  projectId: '<projectId>',
  storageBucket: '<storageBucket>',
  messagingSenderId: '<messagingSenderId>',
  appId: '<appId>'
}
```

`config.production` gets loaded when `NODE_ENV === 'production', same applies to 'development' and any other values that you set in NODE_ENV.

#### customEnv

By default, the Firebase config will be chosen based on the NODE_ENV environment variable.

If customEnv is set to true, however, nuxt-fire will determine the environment based on the environment variable called FIRE_ENV, which you can define yourself. This gives you the flexibility to define as many different Firebase configs as you like, independent of your NODE_ENV.

- type: `Boolean`
- default: `false`
- required: `false`

_⚠️ Important:_

If you decide to turn on this option, you need to add the following code to your `nuxt.config.js` to make sure that the environment variable gets passed from server to client.

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
    appId: '<appId>'
  },
  faafaafaa: {
    //
  }
}
```

#### functionsLocation

By default, the Functions location is set to `us-central1`.
You can change the location with this option.

- type: `String`
- default: `null` (results in `us-central1`)
- required: `false`

More information [here](https://firebase.google.com/docs/functions/locations).

## Examples

Check out our [Demo](https://nuxt-fire-demo.firebaseapp.com/) or its [GitHub Repo](https://github.com/lupas/nuxt-fire-demo) for example code.

### Usage with vuexfire

This [example](https://github.com/lupas/nuxt-fire-vuexfire-example) shows how to use both vuexfire and nuxt-fire together.

## Support on Beerpay

Hey dude! Help me out for a couple of :beers:!

[![Beerpay](https://beerpay.io/lupas/nuxt-fire/badge.svg?style=beer-square)](https://beerpay.io/lupas/nuxt-fire) [![Beerpay](https://beerpay.io/lupas/nuxt-fire/make-wish.svg?style=flat-square)](https://beerpay.io/lupas/nuxt-fire?focus=wish)
