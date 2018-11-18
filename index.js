import path from 'path'

export default function nuxtFire(moduleOptions) {
  const options = Object.assign({}, this.options.axios, moduleOptions)

  // Don't include when config is missing
  if (
    !options.config.apiKey ||
    !options.config.authDomain ||
    !options.config.databaseURL ||
    !options.config.projectId ||
    !options.config.storageBucket ||
    !options.config.messagingSenderId
  ) {
    //TODO: Replace with @nuxtjs/plugin-utils error
    console.error('nuxtFire Error: Missing or incomplete Firebase config.')
    return
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
