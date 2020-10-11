<% const { serviceMapping, serviceOptions, writeImportStatement, writeInjections } = options %>

export default async function (session, firebase) {
  // Firebase Messaging can only be initiated on client side
  if (!process.client) {
    return
  }

  <%= writeImportStatement(options) %>

  if (firebase.messaging.isSupported()) {
    const messagingService = session.<%= serviceMapping.id %>()

    <% if (serviceOptions.fcmPublicVapidKey) { %>
    messagingService.usePublicVapidKey(<%= serialize(serviceOptions.fcmPublicVapidKey) %>)
    <% } %>

    return messagingService
  }
}
