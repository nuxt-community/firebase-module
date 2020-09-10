WorkboxFirebaseAuth.initializeFirebase({
  config: <%= config %><% if (messaging) { %>,
  services: ['messaging']<% } %>
})
