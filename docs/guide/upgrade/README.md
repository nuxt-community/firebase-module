# Upgrade from v3 to v4

With v4, **nuxt-fire** became an official [nuxt-community](https://github.com/nuxt-community) module. <:o)

With this, the GitHub repository as well as the NPM location package name have changed.

In addition to that, nuxt-fire was renamed to **@nuxtjs/firebase**, to make it clear that this is the official Firebase module for Nuxt.js.

To make it consistent, we also changed certain namings within the module, so when upgrading from v3 to v4, you will have to change the following in your code:

## 1 - Rename module import in nuxt.config.js

```js
// Old
modules: ['nuxt-fire'],
// New
modules: ['@nuxtjs/firebase'],
```

## 2 - Rename module options key in nuxt.config.js

Only if options are not set directly in the modules-array:

```js
// Old
fire: {
  // all the options
}
// New
firebase: {
  // all the options
}
```

## 3 - Rename types in tsconfig.json

Only if using typescript:

```json
// Old
{
  "compilerOptions": {
    "types": ["nuxt-fire"]
  }
}
// New
{
  "compilerOptions": {
    "types": ["@nuxtjs/firebase"]
  }
}
```

## 4 - Rename Helpers import path

Only if using helpers:

```js
// Old
import { **helperFunctionName** } from 'nuxt-fire/src/helpers'
// New
import { **helperFunctionName** } from '@nuxtjs/firebase/src/helpers'
```

After all these changes, don't forget to rerun `npm install` or `yarn` and restart your IDE (e.g. VSCODE), then all should be good.
