const options = <%= serialize(options) %>

/** --------------------------------------------------------------------------------------------- **/
/** -------------------------------------- Local Functions -------------------------------------- **/
/** --------------------------------------------------------------------------------------------- **/

const _handleAuth = async (store, authUser) => {
  if (!authUser) {
    const { onSignOutAction, onSignOutMutation } = options

    if (onSignOutMutation) {
      store.commit(onSignOutMutation)
    }

    if (onSignOutAction) {
      await store.dispatch(onSignOutAction)
    }

    return
  }

  const { onSignInAction, onSignInMutation } = options

  const idTokenResult = await authUser.getIdTokenResult()
  const claims = idTokenResult.claims

  if (onSignInMutation) {
    store.commit(onSignInMutation, { authUser, claims })
  }

  if (onSignInAction) {
    await store.dispatch(onSignInAction, { authUser, claims })
  }
}

const _handleAuthError = async (store, error) => {
  const { onErrorMutation, onErrorAction } = options

  if (onErrorMutation) {
    store.commit(onErrorMutation, error)
  }

  if (onErrorAction) {
    await store.dispatch(onErrorAction, error)
  }
}

export default async ({ store, app }, inject) => {

  // Set up a listener, mutations and action for every onAuthStateChanged by Firebase.
  // AND runs the functions once BEFORE the root Vue.js Application is instantiated.

  const unsubscribe = await new Promise(resolve => {
    const unsubscribe = app.$fireAuth.onAuthStateChanged(async authUser => {
      try {
        await _handleAuth(store, authUser)
      } catch (e) {
        await _handleAuthError(store, e)
      }
      resolve(unsubscribe)
    })
  })

  inject('fireAuthUnsubscribe', unsubscribe)
}
