const options = <%= serialize(options) %>
const version = options.firebaseVersion
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
  firebase.initializeApp(options.config)
} 

const fireMess = firebase.messaging()

/** --------------------------------------------------------------------------------------------- **/
/** ---------------------------------------- FIREBASE MESSAGING --------------------------------- **/
/** --------------------------------------------------------------------------------------------- **/

if (options.services.messaging && options.services.messaging.fcmPublicVapidKey) {
  // Firebase Messaging can only be initiated on client side
  if (process.browser) {
    writeImportStatement('messaging')

    if (firebase.messaging.isSupported()) {
      const fireMessObj = fireMess.messaging

      if (options.services.messaging.fcmPublicVapidKey) {
        fireMess.usePublicVapidKey(options.services.messaging.fcmPublicVapidKey)
      }

      inject('fireMess', fireMess)
      inject('fireMessObj', fireMessObj)
    }
  }
} 

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.

fireMess.setBackgroundMessageHandler(function(payload) {
  console.info("SW received the message: ", payload);
  const notification = payload[options.notificationKey ? options.notificationKey : 'notification'];
 
  const notificationTitle = notification.title;
  const notificationOptionsTemplate = {
    body: notification.body,
    icon: notification.image,
    vibrate: notification.vibrate || [200, 100, 200, 100, 200, 100, 200],
    actions: [
      // First item is always taken as click action (see comment below)
      {
        title: "Visit",
        action: notification.clickPath
      }
    ]
  };
  const notificationOptions = options.notificationPayload ? options.notificationPayload : notificationOptionsTemplate
  
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
