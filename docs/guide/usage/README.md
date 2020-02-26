# Usage

## General Usage

You can access the various Firebase products with **\$foo** in almost any context using `app.$foo` or `this.$foo`, including store actions. Make sure to replace the _foo_ with a shortcut from the table below.

Firebase products supported by this module so far:

| Firebase Product  | Shortcut        |
| ----------------- | --------------- |
| Authentication    | \$fireAuth      |
| Realtime Database | \$fireDb        |
| Firestore         | \$fireStore     |
| Storage           | \$fireStorage   |
| Functions         | \$fireFunc      |
| Messaging         | \$fireMess      |
| Performance       | \$firePerf      |
| Analytics         | \$fireAnalytics |
| Remote Config     | \$fireConfig    |

See [Firebase's official docs](https://firebase.google.com/docs/) for more usage information.

You can further access the objects like so:

| Firebase Obj          | Shortcut           |
| --------------------- | ------------------ |
| firebase.auth         | \$fireAuthObj      |
| firebase.database     | \$fireDbObj        |
| firebase.firestore    | \$fireStoreObj     |
| firebase.storage      | \$fireStorageObj   |
| firebase.functions    | \$fireFuncObj      |
| firebase.messaging    | \$fireMessObj      |
| firebase.performance  | \$firePerfObj      |
| firebase.analytics    | \$fireAnalyticsObj |
| firebase.remoteConfig | \$fireConfigObj    |

## Examples

Access Firebase Authentication in a component method:

```js
export default {
  methods: {
    async createUser() {
      try {
        await this.$fireAuth.createUserWithEmailAndPassword(
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
    const ref = this.$fireStore.collection('users').doc(userId)
    try {
      await exerciseRef.update({
        [`randomFoo.FooFoo`]: this.$fireStoreObj.FieldValue.delete()
      })
    } catch (e) {
      return Promise.reject(e)
    }
  }
}
```
