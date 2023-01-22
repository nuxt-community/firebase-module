# performance

::: danger Client-only

Make sure to wrap universal code in `if (process.client) {}`.

:::

Initializes **Firebase Performance** and makes it available via `$fire.performance` and `$fireModule.performance`.

- Type: `Boolean`
- Default: `false`

::: code-group

```js [nuxt.config.js]
performance: true
```

:::

Currently, there are no advanced options available.
