# Usage with Typescript

The module comes with types by providing a decleration file (`index.d.ts`) within the npm package.

All you need to do is to include "@nuxtjs/firebase" in your tsconfig.json types like so:

```json
// tsconfig.json
{
  "compilerOptions": {
    "types": ["@nuxtjs/firebase"]
  }
}
```

Don't forget to restart your IDE (e.g. VSCODE) after adding the types.

Either [nuxt-fire-demo](https://github.com/lupas/nuxt-fire-demo) or [nuxt-fire-ts-demo](https://github.com/lupas/nuxt-fire-ts-demo) show working examples of nuxt-fire with Typescript.
