---
title: Usage with Typescript
description: ''
position: 18
category: Tutorials
---

The module comes with types by providing a decleration file (`index.d.ts`) within the npm package.

All you need to do is to include "@nuxtjs/firebase" in your tsconfig.json types like so:

```json[tsconfig.json]
{
  "compilerOptions": {
    "types": [
      "node",
      "@nuxt/types",
      // ...
      "@nuxtjs/firebase"
    ]
  }
}
```

Don't forget to restart your IDE (e.g. VSCODE) after adding the types.

[nuxt-fire-demo](https://github.com/lupas/nuxt-fire-demo) shows working examples of nuxt-fire with Typescript.
