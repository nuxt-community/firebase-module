---
title: performance
description: ''
position: 12
category: Service Options
---

<alert>
Client-only - make sure to wrap universal code in <code>if (process.client) {}</code>.
</alert>

Initializes **Firebase Performance** and makes it available via `$fire.performance` and `$fireModule.performance`.

- Type: `Boolean`
- Default: `false`

```js[nuxt.config.js]
performance: true
```

Currently, there are no advanced options available.
