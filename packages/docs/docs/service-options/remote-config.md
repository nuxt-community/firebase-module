# remoteConfig

::: danger Client-only

Make sure to wrap universal code in `if (process.client) {}`.

:::

Initializes **Firebase Remote Config** and makes it available via `$fire.remoteConfig` and `$fireModule.remoteConfig`.

- Type: `Boolean` or `Object`
- Default: `false`

::: code-group

```js [nuxt.config.js]
remoteConfig: {
  settings: {
    fetchTimeoutMillis: 60000, // default
    minimumFetchIntervalMillis: 43200000, // default
  },
  defaultConfig: {
    'welcome_message': 'Welcome'
  }
}
```

:::
