# 🔥 Nuxt-Fire

<p align="center"><img align="center" height="300px" src="https://nuxt-fire-demo.firebaseapp.com/logo_text.png"/></p>

<p align="center">
  <a href="https://www.npmjs.com/package/nuxt-fire"><img src="https://badgen.net/npm/dm/nuxt-fire" alt="Downloads"></a>
  <a href="https://www.npmjs.com/package/nuxt-fire"><img src="https://badgen.net/npm/v/nuxt-fire" alt="Version"></a>
  <a href="https://www.npmjs.com/package/nuxt-fire"><img src="https://badgen.net/npm/license/nuxt-fire" alt="License"></a>
 </p>
</p>

> Easily intergrate Firebase into your Nuxt 2 project.

## Demo

[Demo](https://nuxt-fire-demo.firebaseapp.com/)

## Requirements

Make sure you have Nuxt and Firebase installed in your project.

```json
"dependencies": {
  "nuxt": "^2.3.1",
  "firebase": "^5.5.8"
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
          apiKey: '<apiKey>',
          authDomain: '<authDomain>',
          databaseURL: '<databaseURL>',
          projectId: '<projectId>',
          storageBucket: '<storageBucket>',
          messagingSenderId: '<messagingSenderId>'
        }
      }
    ]
  ],
```

## Options

#### useOnly

By default, all supported Firebase products are loaded. If you only wish to load certain products (recommended!), add the `useOnly` option.

- type: `Array<string>`
- default: `['auth','firestore','functions','storage','realtimeDb']`
- required: `false`

#### config

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

Only applies when `NODE_ENV === 'production'`. In that case it is required.

#### devConfig

Same es `config`, but applies when `NODE_ENV === 'development'`. In that case it is required

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

See [Firebase's official docs](https://firebase.google.com/docs/) for more usage information.

### Examples

Check out the [GitHub Repo](https://github.com/lupas/nuxt-fire-demo) of our [Demo](https://nuxt-fire-demo.firebaseapp.com/) for example code.
