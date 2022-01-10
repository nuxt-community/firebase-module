<% const { serviceMapping, serviceOptions, writeImportStatement, writeInjections } = options %>

export default async function (session) {
  <% if (!serviceOptions.static) { %>    
  <%= writeImportStatement(options) %>
  <% } %>

  const firestoreService = session.<%= serviceMapping.id %>()

  <% if (typeof serviceOptions.settings === 'object') { %>
    firestoreService.settings(<%= serialize(serviceOptions.settings) %>)
  <% } %>

  <% /* Uses emulator, if emulatorPort is set. */ %>
  <% if (['string', 'number'].includes(typeof serviceOptions.emulatorPort)) { %>
  <% const emulatorHost =
  typeof serviceOptions.emulatorHost === 'string'
    ? serviceOptions.emulatorHost
    : 'localhost'
  %>
  // If statement fixes Issue #390, only runs useEmulator when not yet called (relevant on server) 
  if (process.client || firestoreService._delegate._settings.host === 'firestore.googleapis.com') {
    firestoreService.useEmulator('<%= `${emulatorHost}` %>', <%= `${serviceOptions.emulatorPort}` %>)
  }
  <% } %>

  <% if (serviceOptions.enablePersistence) { %>
  // persistence should only be enabled client side
  if (process.client) {
    try {
      <% const enablePersistence = Object.assign({}, serviceOptions.enablePersistence) %>
      await firestoreService.enablePersistence(<%= serialize(enablePersistence) %>)
    } catch (err) {
      if (err.code == 'failed-precondition') {
        console.warn('[@nuxtjs/firebase]: Firestore Persistence not enabled. Multiple tabs open, persistence can only be enabled in one tab at a a time.')
      } else if (err.code == 'unimplemented') {
        console.info('[@nuxtjs/firebase]: Firestore Persistence not enabled. The current browser does not support all of the features required to enable persistence.')
      }
    }
  }
  <% } %>

  return firestoreService
}
