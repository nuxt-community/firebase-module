# Firebase Auth in SSR/Universal Mode

<Badge text="EXPERIMENTAL" type="warn"/>
This module provides an option for the easy setup of **server-side authentication** as described in [this article](https://firebase.google.com/docs/auth/web/service-worker-sessions) of the official Documentation.

### Step 0 - Install Dependencies

In addition to @nuxtjs/firebase, install these two dependencies:

```bash
yarn add firebase-admin # OR npm i firebase-admin
yarn add jwt-decode # OR npm i jwt-decode
```

### Step 1 - Initialize Firebase Auth

Use the [auth.initialize option](/guide/options/#auth) with at least `onSuccessAction` defined and set `ssr = true`. Make sure to create the respective action & mutation to save the authUser to the state.

```js
// In the module config in nuxt.config.js:
auth: {
  initialize: {
    onSuccessAction: 'handleSuccessfulAuthentication',
    ssr: true
  }
},
```

Set up your action like so to (1) register the service worker and (2) commit the authUser:

```js
handleSuccessfulAuthentication({ commit }, { authUser }) {
  // Install servicerWorker if supported on sign-in/sign-up page.
  if (process.browser && 'serviceWorker' in navigator) {
    navigator.serviceWorker.register('/firebase-auth-sw.js', { scope: '/' })
  }
  commit('SET_AUTH_USER', { authUser })
},
```

Your mutation can look like so:

```js
SET_AUTH_USER(state, { authUser }) {
  state.authUser = {
    uid: authUser.uid,
    email: authUser.email
  }
}
```

### Step 2 - Retrieve the server-verified authUser

In the nuxtServerInit action in your vuex store you can now access `verifiedFireAuthUser` and `verifiedFireAuthUserClaims` via the `res` object as shown below. This server verified authUser can now be used, e.g. by saving it in the store.

```js
// Store action called nuxtServerInit:
nuxtServerInit({ commit }, ctx) {
  const ssrVerifiedAuthUser = ctx.res.verifiedFireAuthUser
  const ssrVerifiedAuthUserClaims = ctx.res.verifiedFireAuthUserClaims
  if (ssrVerifiedAuthUser && ssrVerifiedAuthUserClaims) {
    commit('SET_AUTH_USER', {
      authUser: ssrVerifiedAuthUser,
      claims: ssrVerifiedAuthUserClaims
    })
  }
}
```

::: warning Be aware
The `verifiedFireAuthUser` is not a full `authUser` object, since it is reproduced from the user claims, it contains only the following three main attributes of the authUser object:

```js
const verifiedFireAuthUser = {
  // Reproduce main attributes of "official" authUser object
  uid: decodedAuthUserClaims.user_id,
  email: decodedAuthUserClaims.email,
  emailVerified: decodedAuthUserClaims.email_verified
}
```

:::

That's it. You receive a server-verified authUser object and can do with it whatever you want in nuxtServerInit.
