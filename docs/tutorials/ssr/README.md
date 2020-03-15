# Firebase Auth in SSR/Universal Mode

This module provides an option for the easy setup of **server-side authentication** as described in [this article](https://firebase.google.com/docs/auth/web/service-worker-sessions) of the official Documentation.

## Step 0 - Install Dependencies

Install `firebase-admin` and `@nuxtjs/pwa`:

```bash
yarn add firebase-admin @nuxtjs/pwa # OR npm i firebase-admin @nuxtjs/pwa
```

## Step 1 - Enable SSR functionality and configure workbox to include the auth service worker

Use the [auth.ssr option](/guide/options/#ssr).

In `nuxt.config.js`:

```js
module.exports = {
  // ...
  modules: [
    // ...
    '@nuxtjs/pwa',
    '@nuxtjs/firebase'
  ],
  firebase {
    // ...
    services: {
      auth: {
        ssr: true
      }
      // ...
    }
  },
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
},
```

## Step 2 - Setup Mutations and/or Actions to handle User authentication

If you don't rely on a full `firebase.User` object you can reuse the client action/mutation configured for [`auth.initialize`](/guide/options/#initialize).  
See [Step 3](#step-3-retrieve-the-server-user) to verify if required properties are present.

Example action:

```js
async onAuthStateChangedAction({ commit, dispatch }, { authUser, claims }) {
  if (!authUser) {
    await dispatch('cleanupAction')

    return
  }

  // you can request additional fields if they are optional (e.g. photoURL)
  const { uid, email, emailVerified, displayName, photoURL } = authUser

  commit('SET_USER', {
    uid,
    email,
    emailVerified,
    displayName,
    photoURL, // results in photoURL being undefined for server auth
    // use custom claims to control access (see https://firebase.google.com/docs/auth/admin/custom-claims)
    isAdmin: claims.custom_claim
  })
}
```

Example mutation:

```js
ON_AUTH_STATE_CHANGED_MUTATION(state, { authUser, claims }) {
  // you can request additional fields if they are optional (e.g. photoURL)
  const { uid, email, emailVerified, displayName, photoURL } = authUser
  
  state.authUser = {
    uid,
    displayName,
    email,
    emailVerified,
    photoURL: photoURL || null, // results in photoURL being null for server auth
    // use custom claims to control access (see https://firebase.google.com/docs/auth/admin/custom-claims)
    isAdmin: claims.custom_claim
  }
}
```

## Step 3 - Retrieve the server user

In the nuxtServerInit action in your vuex store you can now access the authUser under the `res.locals.user` property as shown below.  

::: warning Be aware
The server user object is not a full `firebase.User`, since it is reproduced from the user claims, it provides only the following properties:

- `uid`: The users uid
- `email`: The users email
- `emailVerified`: If the email was verified
- `displayName`: The users display name
- `allClaims`: All claims from the [admin.auth.DecodedIdToken](https://firebase.google.com/docs/reference/admin/node/admin.auth.DecodedIdToken)

:::

```js
// Store action called nuxtServerInit:
async nuxtServerInit({ dispatch, commit }, { res }) {
  if (res && res.locals && res.locals.user) {
    const { allClaims: claims, ...authUser } = res.locals.user

    await dispatch('onAuthStateChangedAction', {
      authUser,
      claims
    })

    // or

    commit('ON_AUTH_STATE_CHANGED_MUTATION', { authUser, claims })
  }
}
```

That's it. You receive a server-verified authUser object and can do with it whatever you want in nuxtServerInit.

## Step 4 - (Optional) Authorize the admin SDK

If you [authorize the admin SDK](/guide/options#firebase-admin-authorization) the authUser will be augmented to a full [`admin.auth.UserRecord`](https://firebase.google.com/docs/reference/admin/node/admin.auth.UserRecord) with an additional `allClaims` property.

## Step 5 - (Optional) Enable server side client SDK login

<Badge text="EXPERIMENTAL" type="error"/>

If you need client SDK services for hydration on page load you can enable this feature in the [options](/guide/options/#server-side-firebase-client-sdk-login).
