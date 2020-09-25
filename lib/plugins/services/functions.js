<% const { service, serviceOptions, writeImportStatement, writeInjections } = options %>

export default async function (session) {
  <%= writeImportStatement(options) %>

  <% /* If .location is undefined, default will be "us-central1" */ %>
  const functionsService = session.<%= service %>('<%= serviceOptions.location || '' %>')

  <% /* Uses emulator, if emulatorPort is set. */ %>
  <% if (['string', 'number'].includes(typeof serviceOptions.emulatorPort)) { %>
  functionsService.useFunctionsEmulator('http://localhost:<%= `${serviceOptions.emulatorPort}` %>')
  <% } %>

  return functionsService
}
