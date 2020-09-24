---
title: Options
description: ''
position: 3
category: Guide
---

## config

<badge>REQUIRED</badge>

Your firebase config snippet and other Firebase specific parameters. You can retrieve this information from your Firebase project's overview page:

`https://console.firebase.google.com/project/<your-project-id>/overview`

```js[nuxt.config.js]
config: {
  // REQUIRED: Official config for firebase.initializeApp(config):
  apiKey: '<apiKey>',
  authDomain: '<authDomain>',
  databaseURL: '<databaseURL>',
  projectId: '<projectId>',
  storageBucket: '<storageBucket>',
  messagingSenderId: '<messagingSenderId>',
  appId: '<appId>',
  measurementId: '<measurementId>'
}
```

<alert type="info">

Can be defined **per NODE_ENV environment** if put in child-objects `config.production` and `config.development`, meaning that e.g. `config.production` gets loaded when `NODE_ENV === 'production'`.

You can also specify multiple custom environments as mentioned in the [customEnv](/guide/options#customenv) option below.

</alert>

## services

<badge>REQUIRED</badge>

By default, **NO** Firebase products are initialized. To initialize a specific service, set its services flag to `true` or create a child object and name the key after the service.

Available services:

```js[nuxt.config.js]
services: {
  auth: true,
  firestore: true,
  functions: true,
  storage: true,
  realtimeDb: true,
  messaging: true,
  performance: true,
  analytics: true,
  remoteConfig: true
}
```

Each service has advanced options that you can configure. See the **service options** section for more details.

## customEnv

- Type: `Boolean`
- Default: `false`

By default, the Firebase config will be chosen either directly from the **config-object** or from a **child-object named after the current NODE_ENV environment variable**.

If set to `true`, however, the module will determine the environment based on the environment variable called `FIRE_ENV`, which you can define yourself. This gives you the flexibility to define as many different Firebase configs as you like, independent of your NODE_ENV.

<alert type="warning">

If you decide to turn on this option, you need to define `process.env.FIRE_ENV` in your code and additionally add the following code to your `nuxt.config.js` to make sure that the environment variable gets passed from server to client.

</alert>

```js[nuxt.config.js]
env: {
  FIRE_ENV: process.env.FIRE_ENV
}
```

After that, you can set FIRE_ENV to anything you like...

```js[package.json]
"scripts": {
  "serveFoo": "FIRE_ENV=foofoofoo nuxt",
  "serveFaa": "FIRE_ENV=faafaafaa nuxt",
}
```

And then add your config to the module options:

```js[nuxt.config.js]
// within the module's config
config: {
  foofoofoo: {
    apiKey: '<apiKey>',
    authDomain: '<authDomain>',
    databaseURL: '<databaseURL>',
    projectId: '<projectId>',
    storageBucket: '<storageBucket>',
    messagingSenderId: '<messagingSenderId>',
    appId: '<appId>',
    measurementId: '<measurementId>'
  },
  faafaafaa: {
    //
  }
}
```

## onFirebaseHosting

- Type: `Boolean` or `Object`
- Default: `false`

If your application is hosted on Firebase hosting, you can enable this flag in order to load the newest Firebase scripts in the service workers directly from there instead of www.gstatic.com.


