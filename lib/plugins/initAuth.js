export default async ({ store, app }, inject) => {

  // Sets up a listener, mutations and action for every onAuthStateChanged by Firebase.
  // AND runs the functions once BEFORE the root Vue.js Application is instantiated.

  const unsubscribe = await new Promise(resolve => {
    const unsubscribe = app.$fireAuth.onAuthStateChanged(async authUser => {
      const claims = authUser ? (await authUser.getIdTokenResult(true)).claims : null

      <% if (options.onAuthStateChangedMutation) { %>
      store.commit(<%= serialize(options.onAuthStateChangedMutation) %>, { authUser, claims })
      <% } %>

      <% if (options.onAuthStateChangedAction) { %>
      await store.dispatch(<%= serialize(options.onAuthStateChangedAction) %>, { authUser, claims })
      <% } %>

      resolve(unsubscribe)
    })
  })

  inject('fireAuthUnsubscribe', unsubscribe)
}
