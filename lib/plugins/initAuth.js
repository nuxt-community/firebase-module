const options = <%= serialize(options) %>

const { onAuthStateChangedAction, onAuthStateChangedMutation } = options

export default async ({ store, app }, inject) => {

  // Set up a listener, mutations and action for every onAuthStateChanged by Firebase.
  // AND runs the functions once BEFORE the root Vue.js Application is instantiated.

  const unsubscribe = await new Promise(resolve => {
    const unsubscribe = app.$fireAuth.onAuthStateChanged(async authUser => {
      const claims = authUser ? (await authUser.getIdTokenResult()).claims : null

      if (onAuthStateChangedMutation) {
        store.commit(onStateChangedMutation, { authUser, claims })
      }

      if (onAuthStateChangedAction) {
        await store.dispatch(onAuthStateChangedAction, { authUser, claims })
      }

      resolve(unsubscribe)
    })
  })

  inject('fireAuthUnsubscribe', unsubscribe)
}
