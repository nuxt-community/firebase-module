---
title: firestore
description: ''
position: 8
category: Service Options
---

Initializes **Firebase Firestore** and makes it available via `$fire.firestore` and `$fireModule.firestore`.

- Type: `Boolean` or `Object`
- Default: `false`

```js[nuxt.config.js]
firestore: {
  memoryOnly: false, // default
  chunkName: process.env.NODE_ENV !== 'production' ? 'firebase-auth' : '[id]', // default
  enablePersistence: true,
  emulatorPort: 8080,
  emulatorHost: 'localhost',
  settings: {
    // Firestore Settings - currently only works in SPA mode
  }
}
```

## memoryOnly

With this flag set to true, the *memory-only* build is loaded as mentioned [here](https://firebase.google.com/support/release-notes/js#version_7130_-_march_26_2020).

- Type: `Boolean` or `Object`
- Default: `false`

## enablePersistence

Enables persistence in web apps.

- Type: `Boolean` or `Object`
- Default: `false`

```js[nuxt.config.js]
firestore: {
  // ...
  enablePersistence: true
}

// or

firestore: {
  // ...
  enablePersistence: {
    /**
     * Whether to synchronize the in-memory state of multiple tabs. Setting this
     * to 'true' in all open tabs enables shared access to local persistence,
     * shared execution of queries and latency-compensated local document updates
     * across all connected instances.
     *
     * To enable this mode, `synchronizeTabs:true` needs to be set globally in all
     * active tabs. If omitted or set to 'false', `enablePersistence()` will fail
     * in all but the first tab.
     */
    synchronizeTabs: true
  }
}
```

More information [here](https://firebase.google.com/docs/firestore/manage-data/enable-offline).

## emulatorPort

- Type: `Integer`
- Default: `null`

Sets up `useEmulator("localhost", EMULATOR_PORT)` to point to a Firestore emulator running locally.

More information in the official Firebase [Emulator Docs](https://firebase.google.com/docs/emulator-suite/connect_firestore).

<alert type="info">
To not use the emulator in production you can do the following:

<code>emulatorPort: process.env.NODE_ENV === 'development' ? 8080 : undefined</code>

</alert>

## emulatorHost

- Type: `String`
- Default: `localhost`,

Changes the host used for the emulator. Only applies if the emulatorPort is set.

## settings

Adds settings to your Firebase initialization, e.g. `host` or `ssl`.
See more [here](https://firebase.google.com/docs/reference/js/firebase.firestore.Settings).

<alert type="warning">

**Important**

When using settings() in Universal mode (see [this issue](https://github.com/nuxt-community/firebase-module/issues/116)), you need to set `runInNewContext` to `false` in your nuxt.config.js like so:

```js[nuxt.config.js]
// Add this to your nuxt.config.js
render: {
  bundleRenderer: {
    runInNewContext: false
  }
},
```

</alert>
