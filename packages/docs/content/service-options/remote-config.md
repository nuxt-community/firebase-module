---
title: remoteConfig
description: ''
position: 14
category: Service Options
---

<alert>
Client-only - make sure to wrap universal code in <code>if (process.client) {}</code>.
</alert>

Initializes **Firebase Remote Config** and makes it available via `$fire.remoteConfig` and `$fireModule.remoteConfig`.

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
