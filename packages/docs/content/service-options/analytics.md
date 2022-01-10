---
title: analytics
description: ''
position: 13
category: Service Options
---

<alert>
Client-only - make sure to wrap universal code in <code>if (process.client) {}</code>.
</alert>

Initializes **Firebase Analytics** and makes it available via `$fire.analytics` and `$fireModule.analytics`.

- Type: `Boolean` or `Object`
- Default: `false`

```js[nuxt.config.js]
analytics: {
  collectionEnabled: true // default
}
```

## collectionEnabled

Allows to disable analytics collection. Usefull to disable analytics in development mode or before fullfillment of legal obligation.

Can be enabled back via `$fireAnalytics.setAnalyticsCollectionEnabled(true)`.
