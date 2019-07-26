import firebase from 'firebase/app'
<%= options.useOnly.includes('auth') ? "import 'firebase/auth'" : "" %>
<%= options.useOnly.includes('realtimeDb') ? "import 'firebase/database'" : "" %>
<%= options.useOnly.includes('firestore') ? "import 'firebase/firestore'" : "" %>
<%= options.useOnly.includes('storage') ? "import 'firebase/storage'" : "" %>
<%= options.useOnly.includes('functions') ? "import 'firebase/functions'" : "" %>
<%= options.useOnly.includes('messaging') ? "import 'firebase/messaging'" : "" %>
<%= options.useOnly.includes('performance') ? "import 'firebase/performance'" : "" %>

export default (ctx, inject) => {
  
  const options = <%= serialize(options) %>

  // Don't include when Firebase is already initialized
  if (!firebase.apps.length) {
    firebase.initializeApp(options.config[options.currentEnv])
  }

  if (options.useOnly.includes('auth')) {
    const fireAuth = firebase.auth()
    const fireAuthObj = firebase.auth
    inject('fireAuth', fireAuth)
    inject('fireAuthObj', fireAuthObj)
  }

  if (options.useOnly.includes('realtimeDb')) {
    const fireDb = firebase.database()
    const fireDbObj = firebase.database
    inject('fireDb', fireDb)
    inject('fireDbObj', fireDbObj)
  }

  if (options.useOnly.includes('firestore')) {
    const fireStore = firebase.firestore()
    const fireStoreObj = firebase.firestore
    inject('fireStore', fireStore)
    inject('fireStoreObj', fireStoreObj)
  }

  if (options.useOnly.includes('storage')) {
    const fireStorage = firebase.storage()
    const fireStorageObj = firebase.storage
    inject('fireStorage', fireStorage)
    inject('fireStorageObj', fireStorageObj)
  }

  if (options.useOnly.includes('functions')) {
    const fireFunc = firebase.app().functions(options.functionsLocation)
    const fireFuncObj = firebase.functions
    inject('fireFunc', fireFunc)
    inject('fireFuncObj', fireFuncObj)
  }

  // Firebase Messaging can only be initiated on client side
  if (process.browser && options.useOnly.includes('messaging')) {
    const fireMess = firebase.messaging()
    const fireMessObj = firebase.messaging
    inject('fireMess', fireMess)
    inject('fireMessObj', fireMessObj)
  }

  // Firebase Performance can only be initiated on client side
  if(process.browser && options.useOnly.includes('performance')){
    const firePerf = firebase.performance()
    const firePerfObj = firebase.performance
    inject('firePerf', firePerf)
    inject('firePerfObj', firePerfObj)
  }

}
