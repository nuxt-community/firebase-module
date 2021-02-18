---
title: Getting Started
description: ''
position: 2
category: Guide
---

## Requirements

Make sure you are using the newest version of Nuxt and have Firebase installed in your project.

<code-group>
  <code-block label="Yarn" active>

  ```bash
  yarn add firebase
  ```

  </code-block>
  <code-block label="NPM">

  ```bash
  npm install firebase
  ```

  </code-block>
</code-group>

## Install

Install the module via NPM or Yarn.

<code-group>
  <code-block label="Yarn" active>

  ```bash
  yarn add @nuxtjs/firebase
  ```

  </code-block>
  <code-block label="NPM">

  ```bash
  npm install @nuxtjs/firebase
  ```

  </code-block>
</code-group>

## Configure

Add the below code to your **nuxt.config.js** modules array and adjust it according to your needs.

Visit the [config section](/guide/options#config) for a detailed overview about each configuration.

### Example Configuration

```js[nuxt.config.js]
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

See list of all available services [here](/guide/options#services).

You can also separate the config from the module array by using the **firebase** object:

```js[nuxt.config.js]
modules: ['@nuxtjs/firebase'],

firebase: {
   // options
}
```
