<% const { service, serviceOptions, writeImportStatement, writeInjections } = options %>

export default async function (session) {
  <%= writeImportStatement(options) %>

  const <%= service %> = session.<%= service %>()

  <% if (typeof serviceOptions.settings === 'object') { %>
  <%= service %>.settings(<%= serialize(serviceOptions.settings) %>)
  <% } %>

  <% if (serviceOptions.enablePersistence) { %>
  // persistence should only be enabled client side
  if (process.client) {
    try {
      <% const enablePersistence = Object.assign({}, serviceOptions.enablePersistence) %>
      await <%= service %>.enablePersistence(<%= serialize(enablePersistence) %>)
    } catch (err) {
      if (err.code == 'failed-precondition') {
        console.warn('[@nuxtjs/firebase]: Firestore Persistence not enabled. Multiple tabs open, persistence can only be enabled in one tab at a a time.')
      } else if (err.code == 'unimplemented') {
        console.info('[@nuxtjs/firebase]: Firestore Persistence not enabled. The current browser does not support all of the features required to enable persistence.')
      }
    }
  }
  <% } %>

  return <%= service %>
}
