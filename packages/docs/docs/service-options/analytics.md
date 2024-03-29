# analytics

::: danger Client-only

Make sure to wrap universal code in `if (process.client) {}`.

:::

Initializes **Firebase Analytics** and makes it available via `$fire.analytics` and `$fireModule.analytics`.

- Type: `Boolean` or `Object`
- Default: `false`

::: code-group

```js [nuxt.config.js]
analytics: {
  collectionEnabled: true // default
}
```

:::

## collectionEnabled

Allows to disable analytics collection. Usefull to disable analytics in development mode or before fullfillment of legal obligation.

Can be enabled back via `$fireAnalytics.setAnalyticsCollectionEnabled(true)`.
