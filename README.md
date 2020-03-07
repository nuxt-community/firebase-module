# 🔥 Nuxt Firebase

<p align="center"><img align="center" height="300px" src="https://firebase.nuxtjs.org/logo-text.png"/></p>

<p align="center">
  <a href="https://www.npmjs.com/package/@nuxtjs/firebase"><img src="https://badgen.net/npm/dm/@nuxtjs/firebase" alt="Downloads"></a>
  <a href="https://www.npmjs.com/package/@nuxtjs/firebase"><img src="https://badgen.net/npm/v/@nuxtjs/firebase" alt="Version"></a>
  <a href="https://www.npmjs.com/package/@nuxtjs/firebase"><img src="https://badgen.net/npm/license/@nuxtjs/firebase" alt="License"></a>
 </p>
</p>

> Easily integrate Firebase into your Nuxt project.

📖 [**Read Full Documentation**](https://firebase.nuxtjs.org/)

## Quick Setup

Make sure you have the newest versions of Nuxt and Firebase installed and setup in your project.

```bash
yarn add nuxt # OR npm i nuxt
yarn add firebase # OR npm i firebase
```

Install the module via NPM or Yarn:

```bash
yarn add @nuxtjs/firebase # OR npm i @nuxtjs/firebase
```

## Quick Config

Add the following to your nuxt.config.js.

See all configuration options [here](https://firebase.nuxtjs.org/guide/options/).

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

## Quick Usage

Now you can use all Firebase services with `$this.Auth`, `this.$fireStore`, `this.$fireMess` etc. (see list [here](https://firebase.nuxtjs.org/guide/usage/)).

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

📖 [**Read Documentation**](https://firebase.nuxtjs.org/)

## License

MIT - [Nuxt-Community](https://github.com/nuxt-community) - [Pascal Luther](https://github.com/lupas)
