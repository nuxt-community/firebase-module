---
title: Firebase Auth with SSR
description: ''
position: 16
category: Tutorials
---

This module provides an option for the easy setup of **server-side authentication** as described in [this article](https://firebase.google.com/docs/auth/web/service-worker-sessions) of the official Documentation.

<alert type="info">
<p><b>Please Note:</b></p>
<p>This <u>does not authenticate the Firebase Client SDK on the server</u>. While you will be able to know if a user is logged in or not and have access to its simplified properties, you <u>won't be able to do authenticated calls</u> on server-side.</p><br>
<p>This means that all calls on server-side (e.g. fetching data via Firestore in fetch-hooks), which are protected by security rules, will still fail with <i>insufficient privileges.</i></p>
<br>
<p>Reason for this is that the Firebase JS SDK is a client-side library that is not built for authenticating multiple users. See steps 4 and 5 for an <b>experimental</b> approach to solve this issue.</p>
</alert>

## Step 0 - Install Dependencies

Install `firebase-admin` and `@nuxtjs/pwa`:

<code-group>
  <code-block label="Yarn" active>

  ```bash
  yarn add firebase-admin @nuxtjs/pwa
  ```

  </code-block>
  <code-block label="NPM">

  ```bash
  npm install firebase-admin @nuxtjs/pwa
  ```

  </code-block>
</code-group>

## Step 1 - Enable SSR functionality and configure workbox to include the auth service worker

Use the [auth.ssr option](/service-options/auth#ssr).

In `nuxt.config.js`:

```js[nuxt.config.js]
module.exports = {
  // ...
  modules: [
    // ...
    '@nuxtjs/pwa',
    '@nuxtjs/firebase'
  ],
  firebase: {
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
      dev: process.env.NODE_ENV === 'development',
    }
  }
},
```

## Step 2 - Setup Mutations and/or Actions to handle User authentication

If you don't rely on a full `firebase.User` object you can reuse the client action/mutation configured for [`auth.initialize`](/service-options/auth#initialize).  
See [Step 3](#step-3---retrieve-the-server-user) to verify if required properties are present.

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

<alert type="warning">

**Be aware**

The server user object is not a full `firebase.User`, since it is reproduced from the user claims, it provides only the following properties:

- `uid`: The users uid
- `email`: The users email
- `emailVerified`: If the email was verified
- `displayName`: The users display name
- `allClaims`: All claims from the [admin.auth.DecodedIdToken](https://firebase.google.com/docs/reference/admin/node/admin.auth.DecodedIdToken)
- `idToken`: The current idToken

</alert>

```js
// Store action called nuxtServerInit:
async nuxtServerInit({ dispatch, commit }, { res }) {
  if (res && res.locals && res.locals.user) {
    const { allClaims: claims, idToken: token, ...authUser } = res.locals.user

    await dispatch('onAuthStateChangedAction', {
      authUser,
      claims,
      token
    })

    // or

    commit('ON_AUTH_STATE_CHANGED_MUTATION', { authUser, claims, token })
  }
}
```

That's it. You receive a server-verified authUser object and can do with it whatever you want in nuxtServerInit.

## Step 4 - (Experimental) Authorize the admin SDK

<experimental-alert></experimental-alert>

If you [authorize the admin SDK](/service-options/auth#firebase-admin-authorization) the authUser will be augmented to a full [`admin.auth.UserRecord`](https://firebase.google.com/docs/reference/admin/node/admin.auth.UserRecord) with an additional `allClaims` property.

## Step 5 - (Experimental) Enable server side client SDK login

<experimental-alert></experimental-alert>

If you need client SDK services for hydration on page load you can enable this feature in the [options](/service-options/auth#server-side-firebase-client-sdk-login).
