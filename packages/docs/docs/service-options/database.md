# database

Initializes **Firebase Realtime Database** and makes it available via `$fire.database` and `$fireModule.database`.

- Type: `Boolean` or `Object`
- Default: `false`

::: code-group

```js [nuxt.config.js]
database: {
  emulatorPort: 9000,
  emulatorHost: 'localhost',
}
```

:::

## emulatorPort

- Type: `Integer`
- Default: `null`

Sets up `useEmulator("localhost", EMULATOR_PORT)` to point to a RealtimeDatabase emulator running locally.

More information in the official Firebase [Emulator Docs](https://firebase.google.com/docs/emulator-suite/connect_rtdb).

::: info
To not use the emulator in production you can do the following:

```js
emulatorPort: process.env.NODE_ENV === 'development' ? 9000 : undefined
```

:::

## emulatorHost

- Type: `String`
- Default: `localhost`,

Changes the host used for the emulator. Only applies if the emulatorPort is set.
