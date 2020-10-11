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

| Firebase Product  | Shortcut           |
| ----------------- | ------------------ |
| Authentication    | $fire.auth         |
| Realtime Database | $fire.database     |
| Firestore         | $fire.firestore    |
| Storage           | $fire.storage      |
| Functions         | $fire.functions    |
| Messaging         | $fire.messaging    |
| Performance       | $fire.performance  |
| Analytics         | $fire.analytics    |
| Remote Config     | $fire.remoteConfig |

See [Firebase's official docs](https://firebase.google.com/docs/) for more usage information.

### $fireModule

`$fireModule` gives you access to the **Firebase** modules themselves with all their static methods.

| Firebase Obj          | Shortcut               |
| --------------------- | ---------------------- |
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
