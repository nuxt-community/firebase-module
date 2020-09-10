// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging()

<% if (actions) { %>
// Setup event listeners for actions provided in the config:
self.addEventListener('notificationclick', function(e) {

  const actions = <%= actions %>
  const action = actions.find(x => x.id === e.action.action)
  const notification = e.notification

  if (!action) return

  if (action.url) {
    clients.openWindow(action.url)
    notification.close()
  }
})
<% } %>
