---
title: (All Services)
description: ''
position: 6
category: Service Options
---

All services have the following options:

```js[nuxt.config.js]
[serviceName]: {
  static: false, // default
  preload: false, // default
  chunkName: process.env.NODE_ENV !== 'production' ? `firebase-${serviceName}` : '[id]' // default
}
```

## static

By default, each service gets imported dynamically, which splits them into separate chunks. If `static = true` however, we import them statically, so the services are bundled into `vendors.app.js`.

```js
// static: false (default)
await import 'firebase/auth'
// static: true
import 'firebase/auth'
```

## preload

Preloads dynamically loaded services. More information [here](https://webpack.js.org/guides/code-splitting/#prefetchingpreloading-modules).

<alert type="warning">

**Be aware**

Only applies if `static === false`.

</alert>

## chunkName

By default, the dynamically imported services are named `vendors.firebase-${serviceName}.js` in development mode, and `[id]` in production mode (`process.env.NODE_ENV === 'production'`). If you want to change this behaviour, you can do so with this option.

<alert type="warning">

**Be aware**

Only applies if `static === false`.

</alert>