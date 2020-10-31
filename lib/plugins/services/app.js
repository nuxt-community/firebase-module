<%= options.writeStaticImports(options) %>

export default async function createApp(config, {res}) {
  <%= (statement = options.writeImportStatement(options))
  && `const firebaseModule = ${statement}`
  %>
  const firebase = firebaseModule.default

  <% if (typeof options.sessions === 'object') { %>
  /*************************************************
  * If Firebase "Auth SSR serverLogin Option" is on
  *************************************************/
  let session
  if (process.server && res && res.locals && res.locals.user) {
    const { default: SessionManager } = await import('@nuxtjs/firebase/lib/utils/auth-ssr/ssr-auth-session-manager.js')
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
  /*****************************************************
  * Without "Auth SSR serverLogin Option" -> normal init
  *****************************************************/
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
