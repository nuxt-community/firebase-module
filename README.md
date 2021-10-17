<p align="center">
  <img src="./docs/static/preview.png" alt="nuxt-firebase logo">
</p>

[![](https://david-dm.org/nuxt-community/firebase-module/status.svg?style=flat-square)](https://david-dm.org/nuxt-community/i18n-module)
[![](https://snyk.io/test/github/nuxt-community/firebase-module/badge.svg?style=flat-square)](https://snyk.io/test/github/nuxt-community/firebase-module)
[![](https://img.shields.io/npm/v/@nuxtjs/firebase/latest.svg?style=flat-square)](https://npmjs.com/package/@nuxtjs/firebase)
[![](https://img.shields.io/npm/dt/@nuxtjs/firebase.svg?style=flat-square)](https://npmjs.com/package/@nuxtjs/firebase)

> Easily integrate Firebase into your Nuxt project.

## IMPORTANT!

> ### ⚠️ **Consider the Firebase Version ⚠️**:
>
> - @nuxtjs/firebase v7 only support Firebase up to v8
> - If you want to use Firbase v9 (in compat syntax), use [v8.0.0-beta.0](https://www.npmjs.com/package/@nuxtjs/firebase/v/8.0.0-beta.0). Be aware that this version is still in beta.

> ### ℹ️ **Modular Mode (Firebase v9+) ℹ️**:
>
> This module was written for the Firebase Javascript SDK v8 and prior. It does not support the new modular syntax from Firebase v9+.
>
> - **Compat Mode:** If you want to work with Firebase v9 in [compat mode](https://firebase.google.com/docs/web/modular-upgrade#update_imports_to_v9_compat), check out [v8.0.0-beta.0](https://www.npmjs.com/package/@nuxtjs/firebase/v/8.0.0-beta.0).
>
> - **Modular Mode:** If you plan to use the new modular mode of Version 9, we advise you to implement Firebase manually as described in the following [medium article](https://lupas.medium.com/firebase-9-beta-nuxt-js-981cf3dac910).
>
> It is currently unclear when, and if, this module will support the new modular mode. See [discussion](https://github.com/nuxt-community/firebase-module/issues/573).

## Links

- 📘 [Documentation](https://firebase.nuxtjs.org/)
- 🔖 [Release notes](https://github.com/nuxt-community/firebase-module/releases)
- 👥 [Community](https://discord.nuxtjs.org/)

## Quick Setup

Make sure you are using the newest version of Nuxt and have Firebase >8.0.0 installed in your project.

```bash
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

Now you can use all Firebase services with `this.$fire.auth`, `this.$fire.firestore`, `this.$fire.messaging` etc. (see list [here](https://firebase.nuxtjs.org/guide/usage/)).

Example:

```js
try {
  await this.$fire.auth.createUserWithEmailAndPassword('foo@foo.foo', 'test')
} catch (e) {
  handleError(e)
}
```

## Guidelines for issues & feature requests

- Use the GitHub issue search — check if the issue or feature request has already been reported.
- Check if the issue has been fixed — try to reproduce it using the latest master or development branch in the repository.
- Isolate the problem — create a reduced test case and a live example.

A good issue shouldn't leave others needing to chase you up for more information. Please **try to be as detailed as possible** in your report. What is your environment? What steps will reproduce the issue? What versions are you using? What would you expect to be the outcome? All these details will help people to fix any potential bugs.

If you have difficulties that are most likely not bugs or if you just have a simple questions, please ask them in the [Nuxt Discord server](https://discord.nuxtjs.org) instead.

If you're issue does not suffice these guidelinses, it migt be closed immediately.

## License

MIT - [Nuxt-Community](https://github.com/nuxt-community) - [Pascal Luther](https://github.com/lupas)
