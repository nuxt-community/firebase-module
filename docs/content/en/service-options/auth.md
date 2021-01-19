---
title: auth
description: ''
position: 7
category: Service Options
---

Initializes **Firebase Authentication** and makes it available via `$fire.auth` and `$fireModule.auth`.

- Type: `Boolean` or `Object`
- Default: `false`

```js[nuxt.config.js]
auth: {
  persistence: 'local', // default
  initialize: {
    onAuthStateChangedMutation: 'ON_AUTH_STATE_CHANGED_MUTATION',
    onAuthStateChangedAction: 'onAuthStateChangedAction',
    subscribeManually: false
  },
  ssr: false, // default
  emulatorPort: 9099,
  emulatorHost: 'http://localhost',
}
```

## persistence

Set firebase auth persistence, see [here](https://firebase.google.com/docs/auth/web/auth-state-persistence).

## initialize

This sets up an `onAuthStateChanged()` and/or `onIdTokenChanged()` listener and hooks them up to the vuex store.

Just add a mutation/action to your vuex store ([as seen below](#onauthstatechangedmutation)) that handles what to do with the authUser object (e.g. save it to the state or get user data from FireStore) and then define the name of the action/mutation in the `firebase.services.auth.initialize` configuration as above.

<alert type="info">You can also use namespaces for your store actions/mutations like so: `onAuthStateChangedAction: 'namespaceName/actionName'`.</alert>

When `onAuthStateChanged()` or `onIdTokenChanged()` get triggered by Firebase, the defined mutation/action will be called with the `authUser` and `claims` attributes as [as seen below](#onauthstatechangedmutation)

To unsubscribe from both listeners simply call the `$fireAuthStore.unsubscribe()` function.

<alert type="warning">This does not work in *lazy-mode*, since auth is not initialized. If you want to use this option in lazy-mode, call the *authReady()* function in a separate plugin.</alert>

### onAuthStateChangedMutation

```js
ON_AUTH_STATE_CHANGED_MUTATION: (state, { authUser, claims }) => {
  if (!authUser) {
    // claims = null
    // perform logout operations
  } else {
    // Do something with the authUser and the claims object...
  }
}
```

<alert type="warning">

Do not save the `authUser` directly to the store, since this will save an object reference to the state which gets directly updated by Firebase Auth periodically and therefore throws a `vuex` error if `strict != false`.

```js
export const mutations = {
  ON_AUTH_STATE_CHANGED_MUTATION: (state, { authUser, claims }) => {
    // Don't do this:
    state.user = authUser

    // Do this:
    const { uid, email, emailVerified } = authUser
    state.user = { uid, email, emailVerified }
  }
}
```
</alert>

### onAuthStateChangedAction

```js
onAuthStateChangedAction: (ctx, { authUser, claims }) => {
  if (!authUser) {
    // claims = null
    // Perform logout operations
  } else {
    // Do something with the authUser and the claims object...
  }
}
```

### onIdTokenChangedAction

Same as `onAuthStateChangedAction`, but also gets triggered when the idToken changes (e.g. expires).

<alert type="warning">
The Firebase SDK automatically refreshed your id token, so this option shall only be used if you use the idToken for custom authentication scenarios.
</alert>

### onIdTokenChangedMutation

Same as `onAuthStateChangedMutation`, but also gets triggered when the idToken changes (e.g. expires).

<alert type="warning">
The Firebase SDK automatically refreshed your id token, so this option shall only be used if you use the idToken for custom authentication scenarios.
</alert>
### subscribeManually

By settings `subscribeManually: true`, the `onAuthStateChanged()` listener won't be set up until you call it manually:

```js
// e.g. in a seperate Plugin
this.$fireAuthStore.subscribe()
```

This is needed in case you need to start other plugins *after* Firebase is initialized but *before* `onAuthStateChanged()` is set up.

<alert>
<p><b>Example:</b></p>
<p>For example with the Sentry module, you migth want to set some user-related information in Sentry each time <code>onAuthStateChanged</code> is triggered. In that case, Sentry needs to be setup before <code>onAuthStateChanged()</code>.</p><br>You can achieve this by manually calling <code>this.$fireAuthStore.subscribe()</code> after Sentry has been initialized.
</alert>



## ssr

This sets up SSR ready functionality with minimal effort.

If `ssr = true`, the module generates a service worker that refreshes the Firebase Auth idToken and sends it with each request to the server if the user is logged in, as described [here](https://firebase.google.com/docs/auth/web/service-worker-sessions).

The option further adds a plugin that checks on server side if the token is valid and then injects a simplified [`admin.auth.UserRecord`](https://firebase.google.com/docs/reference/admin/node/admin.auth.UserRecord) into the context variable `res.locals.user`.

The simplified user record contains the following properties:

- `uid`: The users uid
- `email`: The users email
- `emailVerified`: If the email was verified
- `displayName`: The users display name
- `allClaims`: All claims from the [admin.auth.DecodedIdToken](https://firebase.google.com/docs/reference/admin/node/admin.auth.DecodedIdToken)

The injected user can be used by context aware life cycle hooks on the server side (e.g. the store action `nuxtServerInit`).

A tutorial on how to set this up can be found [here](/tutorials/ssr).

<alert type="info">
<p><b>Please Note:</b></p>
<p>This <u>does not authenticate the Firebase Client SDK on the server</u>. While you will be able to know if a user is logged in or not and have access to its simplified properties, you <u>won't be able to do authenticated calls</u> on server-side.</p><br>
<p>This means that all calls on server-side (e.g. fetching data via Firestore in fetch-hooks), which are protected by security rules, will still fail with <i>insufficient privileges.</i></p>
<br>
<p>Reason for this is that the Firebase JS SDK is a client-side library that is not built for authenticating multiple users. See the <nuxt-link to="/service-options/auth#serverlogin">serverLogin</nuxt-link> option for an <b>experimental</b> approach to solve this issue.</p>
</alert>

### ignorePaths

The service worker session automatically ignores external resources, static files and HMR calls.
If you need to ignore additional routes, define them here.

```js[nuxt.config.js]
auth: {
  ssr: {
    ignorePaths: [
      '/admin', // path is ignored if url.pathname.startsWith('/admin')
      /^api/ // path is ignored if url.pathname without the leading slash (/) matches the RegExp
    ]
  }
}
```

### credential

<experimental-alert></experimental-alert>

Enables Firebase admin authorization.

```js[nuxt.config.js]
auth: {
  ssr: {
    // retrieved credentials from GOOGLE_APPLICATION_CREDENTIALS env variable
    credential: true

    // provide the path to the service account file
    // CAREFUL - don't deploy to publicly accessible location!
    credential: '/absolute/path/to/serviceAccount.json'

    // nuxt aliases are supported
    credential: '~/assets/serviceAccount.json'
  }
}
```

If you want additional information on the user the module can inject a full [`admin.auth.UserRecord`](https://firebase.google.com/docs/reference/admin/node/admin.auth.UserRecord) into the `ctx.res.locals.user` property.

The `allClaims` property is set in addition to the default user record properties.

To enable this you can authorize the firebase admin by [generating a service account key](https://firebase.google.com/docs/admin/setup#initialize-sdk) and link to it with this configuration.

<alert type="danger">

**NEVER deploy your service account key to a publicly accessible location**

The service account key file is highly sensitive as it grants full access to your firebase project.

In production always prefer providing the path to the key file through the `GOOGLE_APPLICATION_CREDENTIALS` environment variable (`auth.ssr.credential = true`) and store the key file in a location which is not exposed by your webserver.

</alert>

### serverLogin

<experimental-alert></experimental-alert>

Enables server side Firebase client SDK login.

```js[nuxt.config.js]
auth: {
  ssr: {
    // Set 'credential' as described above.

    serverLogin: true
    // or
    serverLogin: {
      // Takes a duration in milliseconds
      sessionLifetime: 0 // default (session is kept only for the duration of the request)
      // Takes a duration in milliseconds
      loginDelay: 50 // default (20 queries per second = minimum recommended delay)
    }
  }
}
```

Once you have properly setup the admin sdk via the [credential option](#credential) you can enable server side login to use firebase services on the server, e.g. to perform store hydration on page load.

Simply set `auth.ssr.serverLogin = true`.

The module creates a separate firebase app/session for every authenticated user to avoid authorization context leakage.

You can configure the session lifetime with `auth.ssr.serverLogin.sessionLifetime`  



<alert type="warning">

**Programmatic server implementation**

If you are using an external server implementation to start nuxt programmatically:

- The `@nuxtjs/firebase` module has to be included in your server package (`yarn add @nuxtjs/firebase`).
- Make sure to initialize the nuxt build outside of the server request callback for session management to work properly:

  ```js
  import express from 'express'
  import { Nuxt } from 'nuxt'

  const server = express()

  // do this outside of the server callback so the nuxt build is kept in memory
  const nuxt = new Nuxt({
    dev: false,
    buildDir: '.nuxt'
  })

  server.use(async (req, res, next) => {
    // this will resolve immediately after the first render
    await nuxt.ready()

    nuxt.render(req, res, next)
  })
  ```

</alert>

<alert type="danger">

**Do not use this feature for high traffic sites**

This module provides this feature to facilitate data hydration in SSR calls.

However, the client SDK is not intended for use on a server.

Authentication is rate limited by IP for security reasons by Firebase. The base limit is 20 QPS / IP (as of March 2020) and a couple dozen logins per user per 10 minutes, but it’s subject to change as needed, without notice by Firebase.

Try to reduce the need for SSR by providing pre-rendered pages ([`nuxt generate`](https://nuxtjs.org/guide#static-generated-pre-rendering-)) through static hosting and only fall back on SSR for authenticated and dynamic routes.

If you run into rate limiting issues try adjusting the `serverLogin.loginDelay` configuration.

</alert>

<alert type="danger">

**Do not use the Client SDK in API Operations**

If you have an API which is served over Nuxt SSR:

1. Please ensure it does not use `firebase` client sdk functionality (e.g. `auth`, `firestore`, `storage`, ...).  
   Instead use the corresponding functionality of a fully authenticated `firebase-admin` instance.
2. Add the API base path (e.g. `'/api/'`) to the [`auth.ssr.ignorePaths`](#ignorepaths) configuration.

</alert>

## emulatorPort

- Type: `Integer`
- Default: `null`

Sets up `useEmulator("http://localhost:EMULATOR_PORT")` to point to an Authentication emulator running locally instead of the production one.

More information in the official Firebase [Guide to connect your app to the Authentication Emulator](https://firebase.google.com/docs/emulator-suite/connect_auth).

<alert type="info">
To not use the emulator in production you can do the following:

<code>emulatorPort: process.env.NODE_ENV === 'development' ? 9099 : undefined</code>

</alert>

## emulatorHost

- Type: `String`
- Default: `http://localhost`,

Changes the host used for the Authentication emulator. Only applies if the emulatorPort is set.

## disableEmulatorWarnings

- Type: `Boolean`
- Default: false

Disables the auth emulators warning messages, see [here](https://github.com/firebase/firebase-tools/issues/2773).