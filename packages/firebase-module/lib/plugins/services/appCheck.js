<% const { serviceMapping, serviceOptions, writeImportStatement, writeInjections } = options %>

export default async function (session) {
  // Can only be initiated on client side
  if (!process.client) { 
    return
  }

  <% if (!serviceOptions.static) { %>    
    <%= writeImportStatement(options) %>
  <% } %>
  
  <% /* Uses debug config, if debug token option is set. */ %>
  <% if (serviceOptions.debugToken) { %>
    self.FIREBASE_APPCHECK_DEBUG_TOKEN = <%= serviceOptions.debugToken %>
  <% } %>
  
  const appCheckService = session.<%= serviceMapping.id %>()

  return appCheckService
}
