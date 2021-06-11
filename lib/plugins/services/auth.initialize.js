// runs the functions once BEFORE the root Vue.js Application is instantiated.
export default ({ $fireAuthStore }) => {
  // Can only be initiated on client side
  if (!process.client) {
    return
  }

  return $fireAuthStore.subscribe()
}
