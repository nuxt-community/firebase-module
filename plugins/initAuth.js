export default async ({ store, app }) => {
  const options = <%= serialize(options) %>

  // Set up a listener, mutations and action for every onAuthStateChanged by Firebase.
  // AND runs the functions once BEFORE the root Vue.js Application is instantiated.
  await (async () => {
    return await new Promise(resolve => {
      app.$fireAuth.onAuthStateChanged(async authUser => {
        if (authUser) {
          try {
            await _handleAuthSuccess(authUser)
          } catch (e) {
            await _handleAuthError(e)
            Promise.reject(e)
          }
        }
        resolve(authUser)
      })
    })
  })() // no catch needed, cannot throw

  /** --------------------------------------------------------------------------------------------- **/
  /** -------------------------------------- Local Functions -------------------------------------- **/
  /** --------------------------------------------------------------------------------------------- **/

  async function _handleAuthSuccess(authUser) {
    const onSuccessMutation = options.onSuccessMutation
    const onSuccessAction = options.onSuccessAction

    const idTokenResult = await authUser.getIdTokenResult()
    const claims = idTokenResult.claims

    if (onSuccessMutation) {
      store.commit(onSuccessMutation, { authUser, claims })
    }
    if (onSuccessAction) {
      await store.dispatch(onSuccessAction, { authUser, claims })
    }
  }

  async function _handleAuthError(error) {
    const onErrorMutation = options.onErrorMutation
    const onErrorAction = options.onErrorAction
    if (onErrorMutation) {
      store.commit(onErrorMutation, error)
    }
    if (onErrorAction) {
      await store.dispatch(onErrorAction, error)
    }
  }
}
