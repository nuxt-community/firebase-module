---
title: Usage
description: ''
position: 4
category: Guide
---

## General Usage

This module injects two main utilities into your context, `$fire` and `$fireModule`.

You can access these in almost any context using `app.$fire`/`app.$fireModule` or `this.$fire`/`this.$fireModule` - including store actions.

<alert>
<p><b>Understand the difference!</b></p>
While <code>$fire</code> contains the initialized service instances, <code>$fireModule</code> gives you access to the (not-initialized) <b>Firebase</b> module itself with all its static methods.
</alert>

### $fire

`$fire` gives you access to the initialized service instances:

| Firebase Service  | Shortcut           | Client/Server   |
| ----------------- | ------------------ | --------------- |
| Authentication    | $fire.auth         | Client + Server |
| Realtime Database | $fire.database     | Client + Server |
| Firestore         | $fire.firestore    | Client + Server |
| Storage           | $fire.storage      | Client + Server |
| Functions         | $fire.functions    | Client + Server |
| Messaging         | $fire.messaging    | Client-only     |
| Performance       | $fire.performance  | Client-only     |
| Analytics         | $fire.analytics    | Client-only     |
| Remote Config     | $fire.remoteConfig | Client-only     |

See [Firebase's official docs](https://firebase.google.com/docs/) for more usage information.

<alert type="warning">
Please be aware that some services are not available on server-side. In universal code, you can wrap your code in <code>if (process.client) {}</code> so it only gets executed on the client-side.
</alert>

### $fireModule

`$fireModule` gives you access to the **Firebase** modules themselves with all their static methods.

| Firebase Module       | Shortcut                 |
| --------------------- | ------------------------ |
| firebase.auth         | $fireModule.auth         |
| firebase.database     | $fireModule.database     |
| firebase.firestore    | $fireModule.firestore    |
| firebase.storage      | $fireModule.storage      |
| firebase.functions    | $fireModule.functions    |
| firebase.messaging    | $fireModule.messaging    |
| firebase.performance  | $fireModule.performance  |
| firebase.analytics    | $fireModule.analytics    |
| firebase.remoteConfig | $fireModule.remoteConfig |

## Examples

Access Firebase Authentication in a component method:

```js
export default {
  methods: {
    async createUser() {
      try {
        await this.$fire.auth.createUserWithEmailAndPassword(
          'foo@foo.foo',
          'test'
        )
      } catch (e) {
        handleError(e)
      }
    }
  }
}
```

Access Firestore and it's Object in a vuex store action:

```js
export default {
  async randomVuexAction({ commit, state, rootState }, userId) {
    const ref = this.$fire.firestore.collection('users').doc(userId)
    try {
      await exerciseRef.update({
        [`randomFoo.FooFoo`]: this.$fireModule.firestore.FieldValue.delete()
      })
    } catch (e) {
      return Promise.reject(e)
    }
  }
}
```
