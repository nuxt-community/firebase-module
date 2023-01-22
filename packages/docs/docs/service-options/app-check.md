# appCheck

::: danger Client-only

Make sure to wrap universal code in `if (process.client) {}`.

:::

Initializes **Firebase App Check** and makes it available via `$fire.appCheck` and `$fireModule.appCheck`.

- Type: `Boolean` or `Object`
- Default: `false`

::: code-group

```js [nuxt.config.js]
appCheck: {
  debugToken: false, // default
}
```

:::
