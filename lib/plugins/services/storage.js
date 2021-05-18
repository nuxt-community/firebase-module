<% const { serviceMapping, serviceOptions, writeImportStatement, writeInjections } = options %>

export default async function (session) {
  <% if (!serviceOptions.static) { %>    
  <%= writeImportStatement(options) %>
  <% } %>

  const storageService = session.<%= serviceMapping.id %>()

  <% /* Uses emulator, if emulatorPort is set. */ %>
  <% if (['string', 'number'].includes(typeof serviceOptions.emulatorPort)) { %>
  <% const emulatorHost =
  typeof serviceOptions.emulatorHost === 'string'
    ? serviceOptions.emulatorHost
    : 'localhost'
  %>
  storageService.useEmulator('<%= `${emulatorHost}` %>', <%= `${serviceOptions.emulatorPort}` %>)
  <% } %>

  return storageService
}
