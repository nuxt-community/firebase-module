const options = <%= serialize(options) %>
const version = options.firebaseVersion
const messagingSenderId = options.messagingSenderId
const onFirebaseHosting = options.onFirebaseHosting

if (onFirebaseHosting) {
  // Only works on Firebase hosting!
  importScripts('/__/firebase/' + version + '/firebase-app.js')
  importScripts('/__/firebase/' + version + '/firebase-messaging.js')
  importScripts('/__/firebase/init.js')
}
else {
  importScripts(
    'https://www.gstatic.com/firebasejs/' + version + '/firebase-app.js'
  )
  importScripts(
    'https://www.gstatic.com/firebasejs/' + version + '/firebase-messaging.js'
  )
  firebase.initializeApp({
    messagingSenderId: messagingSenderId
  })
} 

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging()

messaging.setBackgroundMessageHandler(function(payload) {
  const data = payload.data
  const notificationTitle = data.title
  const notificationOptions = {
    body: data.message,
    icon: data.iconPath,
    vibrate: [200, 100, 200, 100, 200, 100, 200],
    actions: [
      // See MARK 1 -> First item is always taken as click action
      {
        title: 'Visit',
        action: data.clickPath
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
