---
title: remoteConfig
description: ''
position: 15
category: Service Options
---

Initializes Firebase Remote Config and makes it available via `$fireConfig` and `$fireConfigObj`.

- Type: `Boolean` or `Object`
- Default: `false`

```js[nuxt.config.js]
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
