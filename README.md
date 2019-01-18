# 🔥 Nuxt-Fire

<p align="center"><img align="center" height="300px" src="https://nuxt-fire-demo.firebaseapp.com/logo_text.png"/></p>

<p align="center">
  <a href="https://www.npmjs.com/package/nuxt-fire"><img src="https://badgen.net/npm/dm/nuxt-fire" alt="Downloads"></a>
  <a href="https://www.npmjs.com/package/nuxt-fire"><img src="https://badgen.net/npm/v/nuxt-fire" alt="Version"></a>
  <a href="https://www.npmjs.com/package/nuxt-fire"><img src="https://badgen.net/npm/license/nuxt-fire" alt="License"></a>
 </p>
</p>

> Easily integrate Firebase into your Nuxt 2 project.

## Demo

[Demo](https://nuxt-fire-demo.firebaseapp.com/)

## Requirements

Make sure you have Nuxt and Firebase installed in your project.

```json
"dependencies": {
  "nuxt": "^2.3.4",
  "firebase": "^5.8.0"
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
        config: {
          development: {
            apiKey: '<apiKey>',
            authDomain: '<authDomain>',
            databaseURL: '<databaseURL>',
            projectId: '<projectId>',
            storageBucket: '<storageBucket>',
            messagingSenderId: '<messagingSenderId>'
          },
          production: {
            apiKey: '<apiKey>',
            authDomain: '<authDomain>',
            databaseURL: '<databaseURL>',
            projectId: '<projectId>',
            storageBucket: '<storageBucket>',
            messagingSenderId: '<messagingSenderId>'
          }
        }
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

See [Firebase's official docs](https://firebase.google.com/docs/) for more usage information.

## Options

#### useOnly

By default, all supported Firebase products are loaded. If you only wish to load certain products (recommended!), add the `useOnly` option.

- type: `Array<string>`
- default: `['auth','firestore','functions','storage','realtimeDb', 'messaging']`
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
  messagingSenderId: '<messagingSenderId>'
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
    messagingSenderId: '<messagingSenderId>'
  },
  faafaafaa: {
    //
  }
}
```

## Examples

Check out our [Demo](https://nuxt-fire-demo.firebaseapp.com/) or its [GitHub Repo](https://github.com/lupas/nuxt-fire-demo) for example code.
