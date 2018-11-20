import firebase from 'firebase/app'
<%= options.useOnly.includes('firestore') ? "import 'firebase/firestore'" : "" %>
<%= options.useOnly.includes('functions') ? "import 'firebase/functions'" : "" %>
<%= options.useOnly.includes('realtimeDb') ? "import 'firebase/database'" : "" %>
<%= options.useOnly.includes('storage') ? "import 'firebase/storage'" : "" %>
<%= options.useOnly.includes('auth') ? "import 'firebase/auth'" : "" %>

export default (ctx, inject) => {
  
  const options = <%= serialize(options) %>

  // Don't include when Firebase is already initialized
  if (!firebase.apps.length) {
    firebase.initializeApp(options.config[options.currentEnv])
  }

  if (options.useOnly.includes('firestore')) {
    // Next line is needed, but only temporary due to changes in Firebase JS SDK
    // see https://firebase.google.com/support/release-notes/js  -> Version 4.13.0
    firebase.firestore().settings({ timestampsInSnapshots: true })
    const fireStore = firebase.firestore()
    inject('fireStore', fireStore)
  }

  if (options.useOnly.includes('realtimeDb')) {
    const fireDb = firebase.database()
    inject('fireDb', fireDb)
  }

  if (options.useOnly.includes('functions')) {
    const fireFunc = firebase.functions()
    inject('fireFunc', fireFunc)
  }

  if (options.useOnly.includes('storage')) {
    const fireStorage = firebase.storage()
    inject('fireStorage', fireStorage)
  }

  if (options.useOnly.includes('auth')) {
    const fireAuth = firebase.auth()
    inject('fireAuth', fireAuth)
  }

}
