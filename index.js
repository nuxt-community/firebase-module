import path from 'path'

export default function nuxtFire(moduleOptions) {
  const options = Object.assign({}, this.options.fire, moduleOptions)

  // Set environment
  let currentEnv = process.env.FIRE_ENV
  if (!options.customEnv || !currentEnv) {
    currentEnv = process.env.NODE_ENV
  }
  options.currentEnv = currentEnv

  // If in CustomEnv Mode: Check if FIRE_ENV is set.
  if (options.customEnv && !process.env.FIRE_ENV) {
    //TODO: Replace with @nuxtjs/plugin-utils error
    return console.error(
      '\x1b[31m',
      `Nuxt-Fire Error: CustomEnv mode requires FIRE_ENV to be set.`
    )
  }

  // Check if needed config is correctly set
  const configKeys = Object.keys(options.config[currentEnv] || false)

  const requiredKeys = [
    'apiKey',
    'authDomain',
    'databaseURL',
    'projectId',
    'storageBucket',
    'messagingSenderId',
    'appId'
  ]

  if (!configKeys.includes('appId')) {
    // TODO: Delete after v3.0.0
    console.error(
      '\x1b[31m',
      `Nuxt-Fire Error: Since v2.0.0 you must update your Firebase config object to include your 'appID'. See Release notes.!`
    )
    return
  }

  if (requiredKeys.some(k => !configKeys.includes(k))) {
    //TODO: Replace with @nuxtjs/plugin-utils error
    console.error(
      '\x1b[31m',
      `Nuxt-Fire Error: Missing or incomplete config for current environment '${currentEnv}'!`
    )
    return
  }

  // If 'useOnly' option is not provided, load all Firebase products
  if (!options.useOnly) {
    options.useOnly = [
      'auth',
      'firestore',
      'functions',
      'storage',
      'realtimeDb',
      'messaging',
      'performance',
      'analytics'
    ]
  }

  if (
    !configKeys.includes('measurementId') &&
    options.useOnly.includes('analytics')
  ) {
    console.warn(
      '\x1b[33m',
      `Nuxt-Fire Warning: Missing measurementId configuration value. Analytics will be non-functional.`
    )
  }

  // Add Messaging Service Worker
  if (options.initMessaging) {
    this.addTemplate({
      src: path.resolve(__dirname, 'templates/firebase-messaging-sw.js'),
      fileName: path.resolve(
        this.options.dir.static,
        'firebase-messaging-sw.js'
      ),
      options: options.initMessaging
    })
  }

  // Add Helper File
  this.addTemplate({
    src: path.resolve(__dirname, 'helpers/index.js'),
    fileName: 'nuxt-fire/helpers/index.js'
  })

  // Register initAuth plugin
  if (options.useOnly.includes('auth') && options.initAuth !== null) {
    this.addPlugin({
      src: path.resolve(__dirname, 'plugins/initAuth.js'),
      fileName: 'nuxt-fire/initAuth.js',
      options: options.initAuth,
      ssr: false
    })
  }

  // Register main nuxt-fire plugin
  this.addPlugin({
    src: path.resolve(__dirname, 'plugins/main.js'),
    fileName: 'nuxt-fire/main.js',
    ssr: true,
    options
  })
}

module.exports.meta = require('./package.json')
