import FirebaseModule from '../..'

export default {
  rootDir: __dirname,
  render: {
    resourceHints: false
  },
  modules: [
    FirebaseModule
  ],
  firebase: {
    lazy: true,
    injectModule: true,
    config: {
      // REQUIRED: Official config for firebase.initializeApp(config):
      apiKey: '<apiKey>',
      authDomain: '<authDomain>',
      databaseURL: 'https://test.firebaseio.com',
      projectId: '<projectId>',
      storageBucket: '<storageBucket>',
      messagingSenderId: '<messagingSenderId>',
      appId: '<appId>',
      measurementId: '<measurementId>'
    },
    services: {
      auth: true,
      database: true,
      messaging: true,
      analytics: true,
      remoteConfig: true
    }
  }
}
