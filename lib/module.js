const { resolve } = require('path')
const firebase = require('firebase/app')
const logger = require('./logger')

module.exports = function (moduleOptions) {
  const options = Object.assign({}, this.options.firebase, moduleOptions)
  const firebaseVersion = firebase.SDK_VERSION
  const currentEnv = getCurrentEnv(options)

  validateOptions(options)

  options.config = getFinalUseConfigObject(options.config, currentEnv)
  validateConfigKeys(options, currentEnv)

  const messaging = options.services.messaging
  if (messaging && messaging.createServiceWorker) {
    // Add Messaging Service Worker
    this.addTemplate({
      src: resolve(__dirname, 'templates/firebase-messaging-sw.js'),
      fileName: resolve(
        this.options.srcDir,
        this.options.dir.static,
        'firebase-messaging-sw.js'
      ),
      options: {
        firebaseVersion,
        config: options.config,
        onFirebaseHosting: options.onFirebaseHosting || false
      }
    })
  }

  const auth = options.services.auth
  if (auth && !isEmpty(auth.initialize)) {
    // Register initAuth plugin
    this.addPlugin({
      src: resolve(__dirname, 'plugins/initAuth.js'),
      fileName: 'firebase-module/initAuth.js',
      options: auth.initialize,
      ssr: false
    })
  }

  let credential

  if (auth && auth.ssr) {
    const ssrConfig = typeof auth.ssr !== 'object' ? {} : auth.ssr

    options.sessions = false

    // Resolve credential setting
    credential =
      typeof ssrConfig.credential === 'string'
        ? this.nuxt.resolver.resolveAlias(ssrConfig.credential)
        : ssrConfig.credential || false

    // Add Service-Worker
    this.addTemplate({
      src: resolve(__dirname, 'templates/firebase-auth-sw.js'),
      fileName: resolve(
        this.options.srcDir,
        this.options.dir.static,
        'firebase-auth-sw.js'
      ),
      options: {
        firebaseVersion,
        config: options.config,
        onFirebaseHosting: options.onFirebaseHosting || false,
        ignorePaths: [
          '/__webpack_hmr',
          '/_loading',
          this.options.build.publicPath,
          ...(ssrConfig.ignorePaths || [])
        ]
      }
    })

    if (ssrConfig.serverLogin && credential) {
      options.sessions =
        typeof ssrConfig.serverLogin !== 'object' ? {} : ssrConfig.serverLogin

      this.addPlugin({
        src: resolve(__dirname, 'plugins/serverLogin.js'),
        fileName: 'firebase-module/serverLogin.js',
        mode: 'server',
        options: {
          credential,
          config: options.config
        }
      })

      const sessionLifetime = options.sessions.sessionLifetime || 0
      this.nuxt.hook('render:routeDone', async (_, __, { res }) => {
        if (res && res.locals && res.locals._session) {
          const session = res.locals._session
          const manager = res.locals._manager

          if (manager) {
            manager.endSession(session.name)

            return
          }

          // fallback if session manager was not passed (SHOULD NOT HAPPEN)
          const elapsed = Date.now() - session.options._created
          if (elapsed >= sessionLifetime) {
            try {
              await session.delete()
            } catch (error) {
              logger.error('App deletion failed: ' + error.code)
            }
          }
        }
      })
    }
  }

  // Register main firebase-module plugin
  this.addPlugin({
    src: resolve(__dirname, 'plugins/main.js'),
    fileName: 'firebase-module/main.js',
    ssr: true,
    options
  })

  if (auth && auth.ssr) {
    // add ssrAuth plugin last
    // so res object is augmented for other plugins of this module
    this.addPlugin({
      src: resolve(__dirname, 'plugins/ssrAuth.js'),
      fileName: 'firebase-module/ssrAuth.js',
      mode: 'server',
      options: {
        credential,
        config: options.config
      }
    })
  }
}

/**
 * Validates the options defined by the user and throws an error is something is
 * missing or wrongly set up.
 * See: https://firebase.nuxtjs.org/guide/options/
 */
function validateOptions (options) {
  if (isEmpty(options)) {
    return logger.error(
      'Options are missing or empty, add at least the Firebase config parameters in your nuxt.config.js file.'
    )
  }

  if (isEmpty(options.services)) {
    return logger.error(
      `The 'services' option is missing or empty, make sure to define it properly.
      See: https://firebase.nuxtjs.org/getting-started/#configure`
    )
  }

  if (isEmpty(options.config)) {
    return logger.error(
      'Firebase config not set properly in nuxt.config.js, config object is missing.'
    )
  }

  if (options.customEnv && !process.env.FIRE_ENV) {
    return logger.error(
      'CustomEnv mode requires process.env.FIRE_ENV variable to be set.'
    )
  }
}

/**
 * Either gets the current environment from the FIRE_ENV env variable
 * or the NODE_ENV variable, depending on setup.
 * See: https://firebase.nuxtjs.org/guide/options/#customenv
 */
function getCurrentEnv (options) {
  if (options.customEnv) {
    return process.env.FIRE_ENV
  }
  return process.env.NODE_ENV
}

/**
 * If config is setup within an environment object that is equal to the current environment
 * we set that as the new options.config.
 * Otherwise, we expect the keys to be set directly in options.config already.
 * See: https://firebase.nuxtjs.org/guide/options/#config
 */
function getFinalUseConfigObject (config, currentEnv) {
  if (config && config[currentEnv]) {
    return config[currentEnv]
  }
  return config
}

/**
 * Checks the Firebase config for the current environment in the nuxt.config.js file.
 * Breaks if a required key is missing.
 * See: https://firebase.nuxtjs.org/guide/options/#config
 */
function validateConfigKeys (options, currentEnv) {
  const configKeys = Object.keys(options.config || false)

  const requiredKeys = [
    'apiKey',
    'authDomain',
    'databaseURL',
    'projectId',
    'storageBucket',
    'messagingSenderId',
    'appId'
    // 'measurementId' - not a must without Analytics, we throw a warning below
    // 'fcmPublicVapidKey' - not required
  ]

  // If one of the required keys is missing, throw an error:
  if (requiredKeys.some(k => !configKeys.includes(k))) {
    return logger.error(
      `Missing or incomplete config for current environment '${currentEnv}'!`
    )
  }

  // Only if Analytics is enabled and the measurementId key is missing, throw an error.
  if (options.analytics && !configKeys.includes('measurementId')) {
    return logger.warn(
      'Missing measurementId configuration value. Analytics will be non-functional.'
    )
  }
}

function isEmpty (val) {
  return val == null || !(Object.keys(val) || val).length
}

module.exports.meta = require('../package.json')
