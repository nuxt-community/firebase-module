import path from 'path'

export default function nuxtFire(moduleOptions) {
  const options = Object.assign({}, this.options.fire, moduleOptions)

  // Don't include when config is missing
  if (
    process.env.NODE_ENV === 'production' &&
    (!options.config ||
      !options.config.apiKey ||
      !options.config.authDomain ||
      !options.config.databaseURL ||
      !options.config.projectId ||
      !options.config.storageBucket ||
      !options.config.messagingSenderId)
  ) {
    //TODO: Replace with @nuxtjs/plugin-utils error
    console.error('nuxtFire Error: Missing or incomplete Firebase config.')
    return
  }

  // Don't include when devConfig is missing
  if (
    process.env.NODE_ENV === 'development' &&
    (!options.devConfig ||
      !options.devConfig.apiKey ||
      !options.devConfig.authDomain ||
      !options.devConfig.databaseURL ||
      !options.devConfig.projectId ||
      !options.devConfig.storageBucket ||
      !options.devConfig.messagingSenderId)
  ) {
    //TODO: Replace with @nuxtjs/plugin-utils error
    console.error('nuxtFire Error: Missing or incomplete Firebase devConfig.')
    return
  }

  // If 'useOnly' option is not provided, load all Firebase products
  if (!options.useOnly) {
    options.useOnly = [
      'auth',
      'firestore',
      'functions',
      'storage',
      'realtimeDb'
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
