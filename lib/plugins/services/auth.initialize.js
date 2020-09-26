<% const { legacyMode } = options %>

// runs the functions once BEFORE the root Vue.js Application is instantiated.
export default ({ $fireAuthStore }, inject) => {

  <% if (legacyMode) { %>
  inject('fireAuthUnsubscribe', () => $fireAuthStore.unsubscribe())
  <% } %>

  return $fireAuthStore.subscribe()
}
