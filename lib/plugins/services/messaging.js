<% const { service, serviceOptions, writeImportStatement, writeInjections } = options %>

export default async function (session, firebase) {
  // Firebase Messaging can only be initiated on client side
  if (!process.client) {
    return
  }

  <%= writeImportStatement(options) %>

  if (firebase.messaging.isSupported()) {
    const <%= service %> = session.<%= service %>()

    <% if (serviceOptions.fcmPublicVapidKey) { %>
    <%= service %>.usePublicVapidKey(<%= serialize(serviceOptions.fcmPublicVapidKey) %>)
    <% } %>

    return <%= service %>
  }
}
