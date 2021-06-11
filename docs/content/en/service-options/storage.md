---
title: storage
description: ''
position: 10
category: Service Options
---

Initializes **Firebase Storage** and makes it available via `$fire.storage` and `$fireModule.storage`.

- Type: `Boolean`
- Default: `false`

```js[nuxt.config.js]
storage: {
  emulatorPort: 9199,
  emulatorHost: 'localhost',
}
```

## emulatorPort

- Type: `Integer`
- Default: `null`

Sets up `useEmulator("localhost:EMULATOR_PORT")` to point to an Storage emulator running locally instead of the production one.

More information in the official Firebase [Guide to connect your app to the Cloud Storage Emulator](https://firebase.google.com/docs/emulator-suite/connect_storage).

<alert type="info">
To not use the emulator in production you can do the following:

<code>emulatorPort: process.env.NODE_ENV === 'development' ? 9199 : undefined</code>

</alert>

## emulatorHost

- Type: `String`
- Default: `localhost`,

Changes the host used for the Storage emulator. Only applies if the emulatorPort is set.
