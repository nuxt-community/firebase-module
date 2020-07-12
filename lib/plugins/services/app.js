<%= options.writeStaticImports(options) %>

export default async function createApp(config) {
  <%= (stmt = options.writeImportStatement(options))
  && `const firebase = ${stmt}`
  %>

  <% if (typeof options.sessions === 'object') { %>
  let session
  if (process.server && res && res.locals && res.locals.user) {
    const { default: SessionManager } = await import('@nuxtjs/firebase/lib/services/SessionManager')
    const manager = new SessionManager(firebase, {
      config,
      sessions: <%= serialize(options.sessions) %>
    })
    // Resolve the firebase app corresponding to the server user
    session = await manager.startSession(res.locals.user.uid)
    res.locals._session = session
    res.locals._manager = manager
  } else {
    session = firebase.apps.find(a => a.name === '[DEFAULT]') || firebase.initializeApp(config)
  }
  <% } else { %>
  if (!firebase.apps.length) {
    firebase.initializeApp(config)
  }
  const session = firebase.apps[0]
  <% } %>

  return {
    firebase,
    session
  }
}
