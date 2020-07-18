<% const { service, serviceOptions, writeImportStatement, writeInjections } = options %>

export default async function (session, firebase, { store }, inject) {
  <%= writeImportStatement(options) %>

  const service = session.<%= service %>()

  <% if (serviceOptions.persistence) { %>
  // persistence should only be enabled client side
  if (process.client) {
    const persistence = firebase.auth.Auth.Persistence.<%=
      serviceOptions.persistence === 'session'
        ? 'SESSION'
        : serviceOptions.persistence === 'none'
          ? 'NONE'
          : 'LOCAL'
    %>
    try {
      await fireAuth.setPersistence(persistence)
    } catch (err) {
      if (err.code === 'auth/invalid-persistence-type') {
        console.warn(`[@nuxtjs/firebase]: Invalid persistence type '${persistence}' provided`)
      } else if (err.code === 'auth/unsupported-persistence-type') {
        console.warn(`[@nuxtjs/firebase]: Persistence type '${persistence}' is not supported in this environment.`)
      }
    }
  }
  <% } %>

  <% if (serviceOptions.initialize) { %>
  // Sets up a listener, mutations and action for every onAuthStateChanged by Firebase.
  const fireAuthStore = {
    unsubscribe() {
      if (this.off) {
        this.off()
        delete this.off
      }
    },
    subscribe() {
      if (this.off) {
        // already subscribed
        return
      }

      return new Promise(resolve => {
        this.off = service.onAuthStateChanged(async authUser => {
          const claims = authUser ? (await authUser.getIdTokenResult(true)).claims : null

          <% if (typeof options.onAuthStateChangedMutation === 'string') { %>
          store.commit(<%= serialize(options.onAuthStateChangedMutation) %>, { authUser, claims })
          <% } %>

          <% if (typeof options.onAuthStateChangedAction === 'string') { %>
          await store.dispatch(<%= serialize(options.onAuthStateChangedAction) %>, { authUser, claims })
          <% } %>

          resolve()
        })
      })
    }
  }

  inject('fireAuthStore', fireAuthStore)
  <% } %>

  return service
}
