<% if (options.onFirebaseHosting) { %>
// Only works on Firebase hosting!
importScripts('/__/firebase/<%= options.firebaseVersion %>/firebase-app.js')
importScripts('/__/firebase/<%= options.firebaseVersion %>/firebase-messaging.js')
importScripts('/__/firebase/init.js')
<% } else { %>
importScripts(
  'https://www.gstatic.com/firebasejs/<%= options.firebaseVersion %>/firebase-app.js'
)
importScripts(
  'https://www.gstatic.com/firebasejs/<%= options.firebaseVersion %>/firebase-messaging.js'
)
firebase.initializeApp(<%= serialize(options.config) %>)
<% } %>

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging()

messaging.setBackgroundMessageHandler(function(payload) {
  console.info("SW received the message: ", payload)
  const notification = payload.<%= options.notificationKey || 'notification' %>

  const notificationTitle = notification.title
  const notificationOptions = {
    body: notification.body,
    icon: notification.image,
    vibrate: notification.vibrate || [200, 100, 200, 100, 200, 100, 200],
    actions: notification.actions || [
      // First item is always taken as click action (see comment below)
      {
        title: "Visit",
        action: notification.clickPath
      }
    ]
  }
  return self.registration.showNotification(
    notificationTitle,
    notificationOptions
  )
})

self.addEventListener('notificationclick', function(e) {
  const notification = e.notification
  // MARK 1 -> always takes first item
  const clickAction = notification.actions[0].action
  const action = e.action
  if (action === 'close') {
    notification.close()
  } else {
    clients.openWindow(clickAction)
    notification.close()
  }
})
