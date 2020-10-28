---
title: FAQ
description: ''
position: 99
category: Community
---

Create an [issue](https://github.com/nuxt-community/firebase-module/issues) if you have a question and we might add it to the FAQ.

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
> [Issue #292](https://github.com/nuxt-community/firebase-module/issues/292)  
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