# Nuxt-Fire

> Easily intergrate Firebase into your Nuxt 2 project.

## Demo

tbd

## Requirements

Make sure to have these dependencies installed:

- Nuxt.js >= 2.x

## Install

```bash
npm i nuxt-fire
```

## Usage

Add the below code to **nuxt.config.js**.

```js
modules: [
    [
      'nuxt-fire',
      {
        use: ['auth, firestore'],
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

## Usage

You can access the various Firebase services with **\$foo** in almost any context using `app.$goo` or `this.$foo` (Including store actions).

#### Usage

Services supported by nuxt-fire so far:
| Service | Shortcut |
|---|---|---|---|---|
| Authentication | $fireAuth |
| RealTime Database  |$fireDb |
| Firestore | $fireStore |
| Storage  |$fireStorage |
| Functions | \$fireFunctions |

See [Firebase's official docs](https://firebase.google.com/docs/) for more usage information.

#### Examples

tbd
