# Migration guides

## Upgrade from v4 to v5

In v5 a major overhaul of the `auth` configuration was introduced.

### 1 - Rename `auth.initialize.onAuthSuccessAction` and `auth.initialize.onAuthSuccessMutation`

```js
firebase: {
  services: {
    auth: {
      // Old
      initialize: {
        onAuthSuccessMutation: 'MY_CUSTOM_MUTATION',
        onAuthSuccessAction: 'myCustomAction'
      }
      // New
      initialize: {
        onAuthStateChangedMutation: 'MY_CUSTOM_MUTATION',
        onAuthStateChangedAction: 'myCustomAction'
      }
    }
  }
}
```

### 2 - Remove `auth.initialize.onAuthErrorAction` and `auth.initialize.onAuthErrorMutation`

There is no real fail case for the listener itself, so the decision was taken to delegate error handling to the user.  
If you need error handling, please adjust your `onAuthStateChangedAction` accordingly.

```js
firebase: {
  services: {
    auth: {
      initialize: {
        // Old
        onAuthErrorMutation: 'MY_ERROR_MUTATION',
        onAuthErrorAction: 'myErrorAction'
        // New
        // both properties removed
      }
    }
  }
}
```

### 3 - Expect `authUser` and `claims` to be nullable in your mutations/actions

For users to be able to handle the signed out case of the onAuthStateChanged listener the authUser is forwarded regardless of it being defined or not.

```js
MY_CUSTOM_MUTATION: (state, { authUser, claims }) => {
  // Old
  state.user.uid = authUser.uid
  state.user.customClaim = claims.custom_claim
  // New
  if (authUser) {
    state.user.uid = authUser.uid
    state.user.customClaim = claims.custom_claim
  } else {
    // authUser = null
    // claims = null
  }
}

async myCustomAction({ commit }, { authUser, claims }) {
  // Old
  commit('SET_USER', {
    uid: authUser.uid,
    customClaim: claims.custom_claim
  })

  // New
  if (authUser) {
    commit('SET_USER', {
      uid: authUser.uid,
      customClaim: claims.custom_claim
    })
  } else {
    // authUser = null
    // claims = null
  }
}
```

### 4 - Update `ssr` implementation

In v5 the `ssr` functionality has been reworked completely.  
If you previously set up SSR by following the tutorial provided by this documentation, please consider following the updated version [here](/tutorials/ssr).

A quick summary of the necessary changes follows:

#### 1 - Move the `ssr` key out of the `initialize` configuration

```js
firebase: {
  services: {
    auth: {
      initialize: {
        // Old
        ssr: true
      }
      // New
      ssr: true
    }
  }
}
```

#### 2 - Use the `@nuxtjs/pwa` module to register the service worker

The previous tutorial featured a manual registration of the service worker in a store action/mutation.

While you technically can keep this implementation, it is recommended to use the `@nuxtjs/pwa` module as it provides a lot of useful functionality for PWAs and `@nuxtjs/firebase` might provide automatic registration via its workbox module in the future.

For now do it manually

In `nuxt.config.js`

```js
module.exports = {
  modules: [
    // ...
    '@nuxtjs/pwa',
    '@nuxtjs/firebase'
  ],

  firebase: {
    // see above
  }

  pwa: {
    // disable the modules you don't need
    meta: false,
    icon: false,
    // if you omit a module key form configuration sensible defaults will be applied
    // manifest: false,

    workbox: {
      importScripts: [
        // ...
        '/firebase-auth-sw.js'
      ],
      // by default the workbox module will not install the service worker in dev environment to avoid conflicts with HMR
      // only set this true for testing and remember to always clear your browser cache in development
      dev: false
    }
  }
}
```

#### 3 - Update your `nuxtServerInit` action

The authenticated user is no longer passed as `res.verifiedFireAuthUser`.  
Use `res.locals.user`

The authenticated users claims are no longer passed as `res.verifiedFireAuthUserClaims`.  
Use `res.locals.user.allClaims`

```js
async nuxtServerInit({ dispatch }, { res }) => {
  if (res) {
    await dispatch('onAuthSuccessAction', {
      // Old
      authUser: res.verifiedFireAuthUser,
      claims: res.verifiedFireAuthUserClaims,
      // New
      authUser: (res.locals && res.locals.user),
      claims: (res.locals && res.locals.user && res.locals.user.allClaims)
    })
  }
}
```

## Upgrade from v3 to v4

With v4, **nuxt-fire** became an official [nuxt-community](https://github.com/nuxt-community) module. <:o)

With this, the GitHub repository as well as the NPM location package name have changed.

In addition to that, nuxt-fire was renamed to **@nuxtjs/firebase**, to make it clear that this is the official Firebase module for Nuxt.js.

To make it consistent, we also changed certain namings within the module, so when upgrading from v3 to v4, you will have to change the following in your code:

### 1 - Rename module import in nuxt.config.js

```js
// Old
modules: ['nuxt-fire'],
// New
modules: ['@nuxtjs/firebase'],
```

### 2 - Rename module options key in nuxt.config.js

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

### 3 - Rename types in tsconfig.json

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

### 4 - Rename Helpers import path

Only if using helpers:

```js
// Old
import { **helperFunctionName** } from 'nuxt-fire/src/helpers'
// New
import { **helperFunctionName** } from '@nuxtjs/firebase/src/helpers'
```

After all these changes, don't forget to rerun `npm install` or `yarn` and restart your IDE (e.g. VSCODE), then all should be good.
