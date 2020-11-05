// runs the functions once BEFORE the root Vue.js Application is instantiated.
export default ({ $fireAuthStore }) => {
  return $fireAuthStore.subscribe()
}
