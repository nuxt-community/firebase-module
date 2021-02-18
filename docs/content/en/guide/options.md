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
  database: true,
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
    databaseURL: '<databaseURL>', // Optional
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

## lazy

- Type: `Boolean` or `Object`
- Default: `false`

This allows lazy loading of all Firebase services.

When set to `true`, all services are NOT loaded until you manually load them where needed. We additionally inject the following props for each activated service into the context:

| Firebase Service  | Shortcut                  |
| ----------------- | ------------------------- |
| Authentication    | $fire.authReady()         |
| Realtime Database | $fire.databaseReady()     |
| Firestore         | $fire.firestoreReady()    |
| Storage           | $fire.storageReady()      |
| Functions         | $fire.functionsReady()    |
| Messaging         | $fire.messagingReady()    |
| Performance       | $fire.performanceReady()  |
| Analytics         | $fire.analyticsReady()    |
| Remote Config     | $fire.remoteConfigReady() |

Simply call the `await this.$fire.serviceNameReady()` function before you access `this.$fire.serviceName` and the service gets dynamically loaded only when needed.

If the services was already loaded previously, the service does not get loaded a second time.

**Example:**

```js
// 1. Load the service
await this.$fire.authReady()

// 2. Use the service
await this.$fire.auth.createUserWithEmailAndPassword('foo@foo.foo','test')
```

<alert>
<p><b>Be aware</b></p>
You can either enabled lazy loading for all services or none.
</alert>

## injectModule

- Type: `Boolean` or `Object`
- Default: `true`

Whether to inject the entire [Firebase module](/guide/usage#firemodule) as `this.$fireModule` or not.

## terminateDatabasesAfterGenerate

- Type: `Boolean`
- Default: `false`

Terminates the Firebase RealTime Database and Firestore after `nuxt generate` has been run. This fixes the below warning by Nuxt and speeds up generate time:

> The command 'nuxt generate' finished but did not exit after 5s
> This is most likely not caused by a bug in Nuxt
> Make sure to cleanup all timers and listeners you or your plugins/modules start.
> Nuxt will now force exit
>
> DeprecationWarning: Starting with Nuxt version 3 this will be a fatal error 