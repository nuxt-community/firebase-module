<% const { service, serviceOptions, writeImportStatement, writeInjections } = options %>

export default async function (session, firebase) {
  <%= writeImportStatement(options) %>

  const <%= service %> = session.<%= service %>()

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

  return <%= service %>
}
