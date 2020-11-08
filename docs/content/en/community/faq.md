---
title: FAQ
description: ''
position: 99
category: Community
---

Create an [issue](https://github.com/nuxt-community/firebase-module/issues) if you have a question and we might add it to the FAQ.

## Firestore: Using "array-contains" or "array-contains-any" does not work

If you are using `array-contains` or `array-contains-any` you might run into the followig error:

> Function Query.where() called with invalid data. Unsupported field value: a custom Array object


This issue is not coming from this module but is specific to using Firebase together with Nuxt. You can get rid of this error message by setting `runInNewContext` to `false` like so:


```js[nuxt.config.js]
// Add this to your nuxt.config.js
render: {
  bundleRenderer: {
    runInNewContext: false
  }
},
```

## How to add Firebase Polyfills?

If you want to add Firebase polyfills, you need to ceate a plugin and import the required polyfills like so:

1. Creating `/plugins/polyfills.js` containing:
    ```js
    // Import all polyfills
    import '@firebase/polyfill';

    // Import specific polyfills:
    import '@firebase/polyfill/node_modules/core-js/features/object/values';
    ```

2. Add to your nuxt.config.js:

    ```js
    plugins: [
    { src: '~plugins/polyfills', mode: 'client' },
    ],
    ```

> References:  
> [Issue #307](https://github.com/nuxt-community/firebase-module/issues/307)  
> [Stack Overflow Question](https://stackoverflow.com/questions/62308061/nuxt-firebase-ie-11-object-doesnt-support-property-or-method-values/64062207#64062207)


## How to use this module in SSR mode together with Strapi?

For Strapi to work together with this module, you need to ignore the Strapi API routes by adding them to the [ignorePaths](https://firebase.nuxtjs.org/service-options/auth#ignorepaths) config like so:

```js
auth: {
    ssr: {
        // ...
        ignorePaths: [ '/api/'] // or /^api\//
    }
}
```

> References:  
> [Issue #292](https://github.com/nuxt-community/firebase-module/issues/292)

## Nuxt Generate warns with "Nuxt Generate finished but did not exit"

This warning happens because either Firestore or the RealtimeDb are not terminated at the end of Nuxt Generate.

To get rid of this warning, you can terminate the services by extending the `generate:done` hook in your `nuxt.config.js` like so:

```js[nuxt.config.js]
hooks: {
  generate: {
    async done(builder) {
      const appModule = await import('./.nuxt/firebase/app.js')
      const { session } = await appModule.default(
        builder.options.firebase.config,
        {
          res: null,
        }
      )
      try {
        session.database().goOffline()
      } catch (e) { }
      try {
        session.firestore().terminate()
      } catch (e) { }
    },
  },
},
```

> References:  
> [Issue #93](https://github.com/nuxt-community/firebase-module/issues/93)