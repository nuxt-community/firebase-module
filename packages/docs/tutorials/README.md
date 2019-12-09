# Tutorials

## Firebase Auth in SSR/Universal Mode <Badge text="EXPERIMENTAL" type="warn"/>

The nuxt-fire plugin provides an option for the easy setup of **server-side authentication** via as described in [this article](https://firebase.google.com/docs/auth/web/service-worker-sessions) of the official Documentation.

#### Step 0 - Install Dependencies

In addition to nuxt-fire, install these two dependencies:

```bash
yarn add firebase-admin # OR npm i firebase-admin
yarn add jwt-decode # OR npm i jwt-decode
```

#### Step 1 - Initialize Firebase Auth

Use the [auth.initialize option](/options/#auth) with at least `onSuccessAction` defined and set `ssr = true`. Make sure to create the respective action & mutation to save the authUser to the state.

```js
// In the nuxt.config.js nuxt-fire settings:
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

#### Step 2 - Retrieve the server-verified authUser

In the nuxtServerInit action in your vuex store you can now access the `verifiedFireAuthUser` via the `res` object as shown below. This server verified authUser can now be used, e.g. by saving it in the store.

```js
// Store action called nuxtServerInit:
nuxtServerInit({ commit }, ctx) {
  const ssrVerifiedAuthUser = ctx.res.verifiedFireAuthUser
  if (ssrVerifiedAuthUser) {
    commit('SET_AUTH_USER', {
      authUser: ssrVerifiedAuthUser
    })
  }
}
```

That's it. You receive a server-verified authUser object and can do with it whatever you want in nuxtServerInit.

## Usage with vuexfire

This [example](https://github.com/lupas/nuxt-fire-vuexfire-example) shows how to use both vuexfire and nuxt-fire together, working with SSR.
