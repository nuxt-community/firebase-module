<% const { serviceMapping, serviceOptions, writeImportStatement, writeInjections } = options %>

export default async function (session) {
  // Firebase Remote Config can only be initiated on client side
  if (!process.client) {
    return
  }

  <%= writeImportStatement(options).toLowerCase() %>

  const remoteConfigService = session.<%= serviceMapping.objectName %>()

  <% const settings = Object.assign({}, serviceOptions.settings) %>
  remoteConfigService.settings = {
    fetchTimeoutMillis: <%= `${settings.fetchTimeoutMillis || 60000 }` %>,
    minimumFetchIntervalMillis: <%= `${settings.minimumFetchIntervalMillis || 43200000}` %>
  }

  <% if (typeof settings.defaultConfig === 'object') { %>
    remoteConfigService.defaultConfig = <%= serialize(settings.defaultConfig) %>
  <% } %>

  return remoteConfigService
}
