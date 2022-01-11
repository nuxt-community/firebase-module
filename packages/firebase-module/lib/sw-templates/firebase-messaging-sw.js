<% if (options.loadFromFirebaseHosting) { %>
    // Only works on Firebase hosting & not on localhost!
    importScripts('/__/firebase/<%= options.firebaseVersion %>/firebase-app-compat.js')
    importScripts('/__/firebase/<%= options.firebaseVersion %>/firebase-messaging-compat.js')
    importScripts('/__/firebase/init.js')
    <% } else { %>
    importScripts(
      'https://www.gstatic.com/firebasejs/<%= options.firebaseVersion %>/firebase-app-compat.js'
    )
    importScripts(
      'https://www.gstatic.com/firebasejs/<%= options.firebaseVersion %>/firebase-messaging-compat.js'
    )
    firebase.initializeApp(<%= serialize(options.config) %>)
    <% } %>
    
    // Retrieve an instance of Firebase Messaging so that it can handle background
    // messages.
    const messaging = firebase.messaging()
    
    <% if (options.actions) { %>
    // Setup event listeners for actions provided in the config:
    self.addEventListener('notificationclick', function(e) {
    
      const actions = <%= serialize(options.actions) %>
      const action = actions.find(x => x.action === e.action)
      const notification = e.notification
    
      if (!action) return
    
      if (action.url) {
        clients.openWindow(action.url)
        notification.close()
      }
    })
    <% } %>
    
    <% if (options.inject) { %>
    <%= options.inject %>
    <% } %>