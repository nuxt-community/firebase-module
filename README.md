# Nuxt-Fire

> Easily intergrate Firebase into your Nuxt 2 project.

## Demo

https://github.com/lupas/nuxt-fire-demo

## Requirements

Make sure to have Nuxt 2+ installed:

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

You can access the various Firebase services with **\$foo** in almost any context using `app.$foo` or `this.$foo` (Including store actions).

#### Usage

Services supported by nuxt-fire so far:

| Firebase Service  | Shortcut        |
| ----------------- | --------------- |
| Authentication    | \$fireAuth      |
| RealTime Database | \$fireDb        |
| Firestore         | \$fireStore     |
| Storage           | \$fireStorage   |
| Functions         | \$fireFunctions |

See [Firebase's official docs](https://firebase.google.com/docs/) for more usage information.

### Examples

(tbd)

Check out the [Demo](https://github.com/lupas/nuxt-fire-demo) project for example code.
