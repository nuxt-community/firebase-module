# 🔥 Nuxt-Fire

<p align="center"><img align="center" height="300px" src="https://nuxt-fire-demo.firebaseapp.com/logo_text.png"/></p>

<p align="center">
  <a href="https://www.npmjs.com/package/nuxt-fire"><img src="https://badgen.net/npm/dm/nuxt-fire" alt="Downloads"></a>
  <a href="https://www.npmjs.com/package/nuxt-fire"><img src="https://badgen.net/npm/v/nuxt-fire" alt="Version"></a>
  <a href="https://www.npmjs.com/package/nuxt-fire"><img src="https://badgen.net/npm/license/nuxt-fire" alt="License"></a>
 </p>
</p>

> Easily integrate Firebase into your Nuxt 2 project.

📖 [**Read Full Documentation**](https://nuxtfire.netlify.com/)

## Quick Setup

Install Nuxt-Fire via NPM or Yarn:

```bash
yarn add nuxt-fire # OR npm i nuxt-fire
```

## Quick Config

Add the following to your nuxt.config.js.

See all configuration options [here](https://nuxtfire.netlify.com/guide/options/).

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
        },
        services: {
          auth: true // Just as example. Can be any other service.
        }
      }
    ]
  ],
```

## Quick Usage

Now you can use all Firebase services with `$this.Auth`, `this.$fireStore`, `this.$fireMess` etc. (see list [here](https://nuxtfire.netlify.com/usage/)).

Example:

```js
try {
  await this.$fireAuth.createUserWithEmailAndPassword('foo@foo.foo', 'test')
} catch (e) {
  handleError(e)
}
```

## Advanced Setup

There is much more options to this simple setup, check out our full documentation below:

📖 [**Read Documentation**](https://nuxtfire.netlify.com/)

## License

MIT - 2018-present Pascal Luther
