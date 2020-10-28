<% const { serviceMapping, serviceOptions, writeImportStatement, writeInjections } = options %>

export default async function (session) {
  <% if (!serviceOptions.static) { %>    
  <%= writeImportStatement(options) %>
  <% } %>

  <% if (serviceOptions.location) { %>
  const functionsService = session.<%= serviceMapping.id %>('<%= serviceOptions.location %>')
  <% } else { %>
  <% /* If .location is undefined, default will be "us-central1" */ %>
  const functionsService = session.<%= serviceMapping.id %>()
  <% } %>

  <% /* Uses emulator, if emulatorPort is set. */ %>
  <% if (['string', 'number'].includes(typeof serviceOptions.emulatorPort)) { %>
  <% const emulatorHost =
  typeof serviceOptions.emulatorHost === 'string'
    ? serviceOptions.emulatorHost
    : 'http://localhost'
  %>
  functionsService.useFunctionsEmulator('<%= `${emulatorHost}` %>:<%= `${serviceOptions.emulatorPort}` %>')
  <% } %>

  return functionsService
}
