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
      'performance'
    ]
  }

  // Register plugin
  this.addPlugin({
    src: path.resolve(__dirname, 'plugin.js'),
    fileName: 'nuxt-fire.js',
    ssr: true,
    options
  })
}

module.exports.meta = require('./package.json')
