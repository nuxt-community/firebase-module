<% const { serviceMapping, serviceOptions, writeImportStatement } = options %>

<% const hasOnAuthStateChangedMutation = (serviceOptions.initialize && typeof serviceOptions.initialize.onAuthStateChangedMutation === 'string') %>
<% const hasOnAuthStateChangedAction = (serviceOptions.initialize && typeof serviceOptions.initialize.onAuthStateChangedAction === 'string') %>
<% const hasOnAuthStateChanged = (hasOnAuthStateChangedMutation || hasOnAuthStateChangedAction) %>
<% const onIdTokenChangedMutation = (serviceOptions.initialize && typeof serviceOptions.initialize.onIdTokenChangedMutation === 'string') %>
<% const onIdTokenChangedAction = (serviceOptions.initialize && typeof serviceOptions.initialize.onIdTokenChangedAction === 'string') %> 
<% const hasIdTokenChanged = (onIdTokenChangedMutation || onIdTokenChangedAction) %>

export default async function (session, firebase, ctx, inject) {
  
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
      if (this.unsubscribeAuthStateListener) {
        this.unsubscribeAuthStateListener()
        delete this.unsubscribeAuthStateListener
      }
      if (this.unsubscribeIdTokenListener) {
        this.unsubscribeIdTokenListener()
        delete this.unsubscribeIdTokenListener
      }
    },
    subscribe() {
      const promises = []
      <% if (hasOnAuthStateChanged && !this.unsubscribeAuthStateListener) { %>
      promises.push(new Promise(resolve => {
        this.unsubscribeAuthStateListener = authService.onAuthStateChanged(async authUser => {
          const claims = authUser ? (await authUser.getIdTokenResult(true)).claims : null

          <% if (hasOnAuthStateChangedMutation) { %>
          ctx.store.commit(<%= serialize(serviceOptions.initialize.onAuthStateChangedMutation) %>, { authUser, claims })
          <% } %>

          <% if (hasOnAuthStateChangedAction) { %>
          await ctx.store.dispatch(<%= serialize(serviceOptions.initialize.onAuthStateChangedAction) %>, { authUser, claims })
          <% } %>

          resolve()
        })
      }))
      <% } %>

      <% if (hasIdTokenChanged && !this.unsubscribeIdTokenListener) { %>
      promises.push(new Promise(resolve => {
        this.unsubscribeIdTokenListener = authService.onIdTokenChanged(async authUser => {
          const claims = authUser ? (await authUser.getIdTokenResult(true)).claims : null

          <% if (onIdTokenChangedMutation) { %>
          ctx.store.commit(<%= serialize(serviceOptions.initialize.onIdTokenChangedMutation) %>, { authUser, claims })
          <% } %>

          <% if (onIdTokenChangedAction) { %>
          await ctx.store.dispatch(<%= serialize(serviceOptions.initialize.onIdTokenChangedAction) %>, { authUser, claims })
          <% } %>

          resolve()
        })
      }))
      <% } %>
      return Promise.all(promises)
    }
  }
  inject('fireAuthStore', fireAuthStore)
  <% } %>

  return authService
}
