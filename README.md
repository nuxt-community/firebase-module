# 🔥 Nuxt-Fire

<p align="center"><img align="center" height="300px" src="https://nuxt-fire-demo.firebaseapp.com/logo_text.png"/></p>

<p align="center">
  <a href="https://www.npmjs.com/package/nuxt-fire"><img src="https://badgen.net/npm/dm/nuxt-fire" alt="Downloads"></a>
  <a href="https://www.npmjs.com/package/nuxt-fire"><img src="https://badgen.net/npm/v/nuxt-fire" alt="Version"></a>
  <a href="https://www.npmjs.com/package/nuxt-fire"><img src="https://badgen.net/npm/license/nuxt-fire" alt="License"></a>
 </p>
</p>

> Easily integrate Firebase into your Nuxt 2 project.

## Quick Setup

Install Nuxt-Fire via NPM or Yarn:

```bash
yarn add nuxt-fire # OR npm i nuxt-fire
```

## Quick Config
Add the following to your nuxt.config.js.

See all configuration options [here](https://nuxtfire.netlify.com/options/).

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
            messagingSenderId: '<messagingSenderId>',
            appId: '<appId>',
            measurementId: '<measurementId>'

          },
          production: {
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
      }
    ]
  ],
```

## Quick Usage
Now you can use all Firebase services with `$this.Auth`, `this.$fireStore` etc. (see list [here](https://nuxtfire.netlify.com/usage/)

```bash
yarn add nuxt-fire # OR npm i nuxt-fire
```

## Advanced Setup

We advice you to setup nuxt-fire less "quick" by e.g. use the `useOnly` option and more. Follow the documentation below:

📖 [**Read Documentation**](https://nuxtfire.netlify.com/)

## License

MIT - 2018-present Pascal Luther
