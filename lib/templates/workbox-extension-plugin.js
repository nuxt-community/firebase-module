WorkboxFirebaseAuth.initializeFirebase({
  config: <%= serialize(options.config) %><% if (options.messaging) { %>,
  services: ['messaging']<% } %>
})
