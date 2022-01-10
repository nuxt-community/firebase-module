---
title: app-check
description: ''
position: 13
category: Service Options
---

<alert>
Client-only - make sure to wrap universal code in <code>if (process.client) {}</code>.
</alert>

Initializes **Firebase App Check** and makes it available via `$fire.appCheck` and `$fireModule.appCheck`.

- Type: `Boolean` or `Object`
- Default: `false`

```js[nuxt.config.js]
appCheck: {
  debugToken: false, // default
}
```