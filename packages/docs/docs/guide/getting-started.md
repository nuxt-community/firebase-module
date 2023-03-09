# Getting Started

## Requirements

Make sure you are using Nuxt 2 and have Firebase v8 installed in your project.

::: code-group

```bash [yarn]
yarn add firebase@^8
```

```bash [npm]
npm install firebase@^8
```

:::

::: danger IMPORTANT - Nuxt 3 not supported!

This module was written for **Nuxt 2** and does currently not support Nuxt 3. There are currently **no plans** to support Nuxt 3 in the near future in this module. However, you can take a look at VueFire Nuxt module for Nuxt 3 support

:::

## Install

Install the module via NPM or Yarn.

::: code-group

```bash [yarn]
yarn add @nuxtjs/firebase
```

```bash [npm]
npm install @nuxtjs/firebase
```

:::

## Configure

Add the below code to your **nuxt.config.js** modules array and adjust it according to your needs.

Visit the [config section](/guide/options#config) for a detailed overview about each configuration.

### Example Configuration

::: code-group

```js [nuxt.config.js]
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

:::

See list of all available services [here](/guide/options#services).

You can also separate the config from the module array by using the **firebase** object:

::: code-group

```js [nuxt.config.js]
modules: ['@nuxtjs/firebase'],

firebase: {
   // options
}
```

:::
