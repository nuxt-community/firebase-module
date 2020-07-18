// runs the functions once BEFORE the root Vue.js Application is instantiated.
export default ({ $fireAuthStore }, inject) => {
  <% if (options.legacyMode) { %>
  inject('fireAuthUnsubscribe', () => $fireAuthStore.unsubscribe())
  <% } %>

  return $fireAuthStore.subscribe()
}
