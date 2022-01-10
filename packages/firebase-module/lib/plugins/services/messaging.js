<% const { serviceMapping, serviceOptions, writeImportStatement, writeInjections } = options %>

export default async function (session, firebase) {
  // Can only be initiated on client side
  if (!process.client) { 
    return
  }

  <% if (!serviceOptions.static) { %>    
  <%= writeImportStatement(options) %>
  <% } %>

  if (firebase.messaging.isSupported()) {
    const messagingService = session.<%= serviceMapping.id %>()

    <% if (serviceOptions.fcmPublicVapidKey) { %>
    messagingService.getToken({vapidKey: <%= serialize(serviceOptions.fcmPublicVapidKey) %>})
    <% } %>

    return messagingService
  }
}
