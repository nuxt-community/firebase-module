import firebase from 'firebase/app'
<%= options.useOnly.includes('firestore') ? "import 'firebase/firestore'" : "" %>
<%= options.useOnly.includes('functions') ? "import 'firebase/functions'" : "" %>
<%= options.useOnly.includes('realtimeDb') ? "import 'firebase/database'" : "" %>
<%= options.useOnly.includes('storage') ? "import 'firebase/storage'" : "" %>
<%= options.useOnly.includes('auth') ? "import 'firebase/auth'" : "" %>
<%= options.useOnly.includes('messaging') ? "import 'firebase/messaging'" : "" %>
<%= options.useOnly.includes('performance') ? "import 'firebase/performance'" : "" %>

export default (ctx, inject) => {
  
  const options = <%= serialize(options) %>

  // Don't include when Firebase is already initialized
  if (!firebase.apps.length) {
    firebase.initializeApp(options.config[options.currentEnv])
  }

  if (options.useOnly.includes('firestore')) {
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
    const fireAuthObj = firebase.auth
    inject('fireAuth', fireAuth)
    inject('fireAuthObj', fireAuthObj)
  }

  // Firebase Messaging can only be initiated on client side
  if (process.browser && options.useOnly.includes('messaging')) {
    const fireMess = firebase.messaging()
    inject('fireMess', fireMess)
  }

  if(process.browser && options.useOnly.includes('performance')){
    const perf = firebase.performance()
    inject('perf', perf)
  }

}
