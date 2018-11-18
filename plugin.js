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
    ctx.$fireStore = fireStore
    inject('fireStore', fireStore)
  }

  if (!options.useOnly || options.useOnly.includes('realtimeDb')) {
    const fireDb = firebase.database()
    ctx.$fireDb = fireDb
    inject('fireDb', fireDb)
  }

  if (!options.useOnly || options.useOnly.includes('functions')) {
    const fireFunc = firebase.functions()
    ctx.$fireFunc = fireFunc
    inject('fireFunc', fireFunc)
  }

  if (!options.useOnly || options.useOnly.includes('storage')) {
    const fireStorage = firebase.storage()
    ctx.$fireStorage = fireStorage
    inject('fireStorage', fireStorage)
  }

  if (!options.useOnly || options.useOnly.includes('auth')) {
    const fireAuth = firebase.auth()
    ctx.$fireAuth = fireAuth
    inject('fireAuth', fireAuth)
  }

}
