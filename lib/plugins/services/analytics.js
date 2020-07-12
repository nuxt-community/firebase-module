<% const { service, serviceOptions, writeImportStatement, writeInjections } = options %>

export default async function (session) {
  // Firebase Analytics can only be initiated on client side
  if (!process.client) {
    return
  }

  <%= writeImportStatement(options) %>

  const <%= service %> = session.<%= service %>()

  <% if ('collectionEnabled' in serviceOptions) { %>
  // In development we want to disable analytics collection
  fireAnalytics.setAnalyticsCollectionEnabled(<%= !!serviceOptions.collectionEnabled %>)
  <% } %>

  return <%= service %>
}
