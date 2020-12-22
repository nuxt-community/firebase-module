<% const { serviceMapping, serviceOptions, writeImportStatement } = options %>

export default async function (session, firebase, ctx, inject) {
  // Can only be initiated on client side
  if (!process.client) { 
    return
  }

  <% if (!serviceOptions.static) { %>    
  <%= writeImportStatement(options) %>
  <% } %>
  const authService = session.<%= serviceMapping.id %>()

  <% /* Uses emulator, if emulatorPort is set. */ %>
  <% if (['string', 'number'].includes(typeof serviceOptions.emulatorPort)) { %>
  <% const emulatorHost =
  typeof serviceOptions.emulatorHost === 'string'
    ? serviceOptions.emulatorHost
    : 'http://localhost'
  %>
  authService.useEmulator('<%= `${emulatorHost}` %>:<%= `${serviceOptions.emulatorPort}` %>'<% if (serviceOptions.disableEmulatorWarnings) { %><%= `, { disableWarnings: true }` %><% } %>)
  <% } %>

  <% if (serviceOptions.persistence) { %>
    if (process.client) {
    const persistence = firebase.auth.Auth.Persistence.<%=
      serviceOptions.persistence === 'session'
        ? 'SESSION'
        : serviceOptions.persistence === 'none'
          ? 'NONE'
          : 'LOCAL'
    %>
    try {
      await authService.setPersistence(persistence)
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
        this.off = authService.onAuthStateChanged(async authUser => {
          const claims = authUser ? (await authUser.getIdTokenResult(true)).claims : null

          <% if (typeof serviceOptions.initialize.onAuthStateChangedMutation === 'string') { %>
            ctx.store.commit(<%= serialize(serviceOptions.initialize.onAuthStateChangedMutation) %>, { authUser, claims })
          <% } %>

          <% if (typeof serviceOptions.initialize.onAuthStateChangedAction === 'string') { %>
          await ctx.store.dispatch(<%= serialize(serviceOptions.initialize.onAuthStateChangedAction) %>, { authUser, claims })
          <% } %>

          resolve()
        })
      })
    }
  }
  inject('fireAuthStore', fireAuthStore)
  <% } %>

  return authService
}
