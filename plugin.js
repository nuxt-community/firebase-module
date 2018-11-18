import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/functions'
import 'firebase/storage'
import 'firebase/auth'

export default function({ app }, inject) {
  
  const options = <%= serialize(options) %>

  // Don't include when Firebase is already initialized
  if (!firebase.apps.length) {
    firebase.initializeApp(options.config)
  }

  console.log(options.use)

  let _fireStore, _fireFunc, _fireStorage, _fireAuth
  if (options.use.includes('firestore')) {
    firebase.firestore().settings({ timestampsInSnapshots: true })
    _fireStore = firebase.firestore()
    inject('fireStore', _fireStore)
  }

  if (options.use.includes('functions')) {
    _fireFunc = firebase.functions()
    inject('fireFunc', _fireFunc)
  }

  if (options.use.includes('storage')) {
    _fireStorage = firebase.storage()
    inject('fireStorage', _fireStorage)
  }

  if (options.use.includes('auth')) {
    const _fireAuth = firebase.auth()
    inject('fireAuth', _fireAuth)
  }
}
