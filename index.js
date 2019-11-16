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
    return handleError(`CustomEnv mode requires FIRE_ENV to be set.`)
  }

  // If config is setup within an environment object, use that.
  if (options.config[currentEnv]) {
    options.config = options.config[currentEnv]
  }

  // Check if needed config is correctly set
  const configKeys = Object.keys(options.config || false)

  const requiredKeys = [
    'apiKey',
    'authDomain',
    'databaseURL',
    'projectId',
    'storageBucket',
    'messagingSenderId',
    'appId'
    // measurementId - not a must
  ]

  if (requiredKeys.some((k) => !configKeys.includes(k))) {
    handleError(
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
    handleWarning(
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
      options: {
        firebaseVersion: '7.3.0',
        messagingSenderId: options.config.messagingSenderId,
        onFirebaseHosting: false // TODO: Add as option
      }
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

function handleWarning(message) {
  const color = '\x1b[33m'
  console.warn(color, `Nuxt-Fire Warning: ${message}`)
}

function handleError(message) {
  const color = '\x1b[31m'
  console.error(color, `Nuxt-Fire Error: ${message}`)
}

module.exports.meta = require('./package.json')
