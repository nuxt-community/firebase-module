---
title: analytics
description: ''
position: 14
category: Service Options
---

Initializes Firebase Analytics and makes it available via `$fireAnalytics` and `$fireAnalyticsObj`.

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
