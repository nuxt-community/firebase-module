<% const { serviceMapping, serviceOptions, writeImportStatement, writeInjections } = options %>

export default async function (session) {
  // Firebase Analytics can only be initiated on client side
  if (!process.client) {
    return
  }

  <%= writeImportStatement(options) %>

  const analyticsService = session.<%= serviceMapping.objectName %>()

  <% if ('collectionEnabled' in serviceOptions) { %>
  // In development we want to disable analytics collection
  analyticsService.setAnalyticsCollectionEnabled(<%= !!serviceOptions.collectionEnabled %>)
  <% } %>

  return analyticsService
}