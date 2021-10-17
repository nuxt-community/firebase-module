<% const { serviceMapping, serviceOptions, writeImportStatement, writeInjections } = options %>

export default async function (session) {
  // Can only be initiated on client side
  if (!process.client) { 
    return
  }

  <% if (!serviceOptions.static) { %>    
  <%= writeImportStatement(options) %>
  <% } %>

  const performanceService = session.<%= serviceMapping.id %>()
  return performanceService
}
