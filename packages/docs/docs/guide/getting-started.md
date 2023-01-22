# Getting Started

## Requirements

Make sure you are using the newest version of Nuxt and have Firebase installed in your project.

::: code-group

```bash [yarn]
yarn add firebase@^8
```

```bash [npm]
npm install firebase@^8
```

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
