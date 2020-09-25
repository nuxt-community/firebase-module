<% const { serviceMapping, serviceOptions, writeImportStatement, writeInjections } = options %>

export default async function (session) {
  <%= writeImportStatement(options) %>

  <% if (serviceOptions.location) { %>
  const functionsService = session.<%= serviceMapping.objectName %>('<%= serviceOptions.location %>')
  <% } else { %>
  <% /* If .location is undefined, default will be "us-central1" */ %>
  const functionsService = session.<%= serviceMapping.objectName %>()
  <% } %>

  <% /* Uses emulator, if emulatorPort is set. */ %>
  <% if (['string', 'number'].includes(typeof serviceOptions.emulatorPort)) { %>
  functionsService.useFunctionsEmulator('http://localhost:<%= `${serviceOptions.emulatorPort}` %>')
  <% } %>

  return functionsService
}
