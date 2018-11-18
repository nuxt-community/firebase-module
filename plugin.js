import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/functions'
import 'firebase/database'
import 'firebase/storage'
import 'firebase/auth'

export default (ctx, inject) => {
  
  const options = <%= serialize(options) %>

  // Don't include when Firebase is already initialized
  if (!firebase.apps.length) {
    if (process.env.NODE_ENV === 'production') {
      firebase.initializeApp(options.config)
    } else {
      firebase.initializeApp(options.devConfig)
    }
  }

  if (!options.useOnly || options.useOnly.includes('firestore')) {
    firebase.firestore().settings({ timestampsInSnapshots: true })
    const fireStore = firebase.firestore()
    inject('fireStore', fireStore)
  }

  if (!options.useOnly || options.useOnly.includes('realtimeDb')) {
    const fireDb = firebase.database()
    inject('fireDb', fireDb)
  }

  if (!options.useOnly || options.useOnly.includes('functions')) {
    const fireFunc = firebase.functions()
    inject('fireFunc', fireFunc)
  }

  if (!options.useOnly || options.useOnly.includes('storage')) {
    const fireStorage = firebase.storage()
    inject('fireStorage', fireStorage)
  }

  if (!options.useOnly || options.useOnly.includes('auth')) {
    const fireAuth = firebase.auth()
    inject('fireAuth', fireAuth)
  }

}
