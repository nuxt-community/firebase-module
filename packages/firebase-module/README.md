# 🔥 Nuxt Firebase

<p align="center"><img align="center" height="300px" src="https://nuxt-fire-demo.firebaseapp.com/logo_text.png"/></p>

> Easily integrate Firebase into your Nuxt 2 project.

📖 [**Read Full Documentation**](https://firebase.nuxtjs.org/)  
📖 [**Visit GitHub Page**](https://github.com/nuxt-community/firebase-module)

## Quick Setup

Install the module via NPM or Yarn:

```bash
yarn @nuxtjs/firebase # OR npm i @nuxtjs/firebase
```

## Quick Config

Add the following to your nuxt.config.js.

See all configuration options [here](/guide/options/).

```js
modules: [
    [
      'firebase',
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

Now you can use all Firebase services with `$this.Auth`, `this.$fireStore`, `this.$fireMess` etc. (see list [here](https://firebase.nuxtjs.org/)).

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

MIT - Nuxt-Community - Pascal Luther
