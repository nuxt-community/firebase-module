<% const { service, serviceOptions, writeImportStatement, writeInjections } = options %>

export default async function (session) {
  // Firebase Remote Config can only be initiated on client side
  if (!process.client) {
    return
  }

  <%= writeImportStatement(options).toLowerCase() %>

  const <%= service %> = session.<%= service %>()

  <% const settings = Object.assign({}, serviceOptions.settings) %>
  <%= service %>.settings = {
    fetchTimeoutMillis: <%= `${settings.fetchTimeoutMillis || 60000 }` %>,
    minimumFetchIntervalMillis: <%= `${settings.minimumFetchIntervalMillis || 43200000}` %>
  }

  <% if (typeof settings.defaultConfig === 'object') { %>
  <%= service %>.defaultConfig = <%= serialize(settings.defaultConfig) %>
  <% } %>

  return <%= service %>
}
