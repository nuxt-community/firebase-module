import path from 'path'
import { isEmpty } from 'lodash'

export default function nuxtFire(moduleOptions) {
  const options = Object.assign({}, this.options.firebase, moduleOptions)
  const firebaseVersion = '7.9.1' // TODO: Update with each Firebase update
  const currentEnv = getCurrentEnv(options)

  validateOptions(options)

  options.config = getFinalUseConfigObject(options.config, currentEnv)
  validateConfigKeys(options, currentEnv)

  const messaging = options.services.messaging
  if (messaging && messaging.createServiceWorker) {
    // Add Messaging Service Worker
    this.addTemplate({
      src: path.resolve(__dirname, 'templates/firebase-messaging-sw.js'),
      fileName: path.resolve(
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
      src: path.resolve(__dirname, 'plugins/initAuth.js'),
      fileName: 'firebase-module/initAuth.js',
      options: auth.initialize,
      ssr: false
    })

    if (auth.initialize.ssr) {
      // Add serverMiddleware
      const fileName = 'firebase-module/firebaseServerAuth.js'
      this.addTemplate({
        src: path.resolve(__dirname, 'serverMiddleware/firebaseServerAuth.js'),
        fileName: fileName,
        options,
        ssr: true
      })
      this.addServerMiddleware(path.join(this.options.buildDir, fileName))
      // Add Service-Worker
      this.addTemplate({
        src: path.resolve(__dirname, 'templates/firebase-auth-sw.js'),
        fileName: path.resolve(
          this.options.srcDir,
          this.options.dir.static,
          'firebase-auth-sw.js'
        ),
        options: {
          firebaseVersion,
          config: options.config,
          onFirebaseHosting: options.onFirebaseHosting || false
        }
      })
    }
  }

  // Register main firebase-module plugin
  this.addPlugin({
    src: path.resolve(__dirname, 'plugins/main.js'),
    fileName: 'firebase-module/main.js',
    ssr: true,
    options
  })
}

/**
 * Validates the options defined by the user and throws an error is something is
 * missing or wrongly set up.
 * See: https://firebase.nuxtjs.org/guide/options/
 */
function validateOptions(options) {
  if (isEmpty(options)) {
    return handleError(
      `Options are missing or empty, add at least the Firebase config parameters in your nuxt.config.js file.`
    )
  }

  if (isEmpty(options.services)) {
    return handleError(
      `The 'services' option is missing or empty, make sure to define it properly.
      See: https://firebase.nuxtjs.org/getting-started/#configure
      `
    )
  }

  if (isEmpty(options.config)) {
    return handleError(
      `Firebase config not set properly in nuxt.config.js, config object is missing.`
    )
  }

  if (options.customEnv && !process.env.FIRE_ENV) {
    return handleError(
      `CustomEnv mode requires process.env.FIRE_ENV variable to be set.`
    )
  }
}

/**
 * Either gets the current environment from the FIRE_ENV env variable
 * or the NODE_ENV variable, depending on setup.
 * See: https://firebase.nuxtjs.org/guide/options/#customenv
 */
function getCurrentEnv(options) {
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
function getFinalUseConfigObject(config, currentEnv) {
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
function validateConfigKeys(options, currentEnv) {
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
  if (requiredKeys.some((k) => !configKeys.includes(k))) {
    return handleError(
      `Missing or incomplete config for current environment '${currentEnv}'!`
    )
  }

  // Only if Analytics is enabled and the measurementId key is missing, throw an error.
  if (options.analytics && !configKeys.includes('measurementId')) {
    return handleWarning(
      `Missing measurementId configuration value. Analytics will be non-functional.`
    )
  }
}

function handleWarning(message) {
  const color = '\x1b[33m'
  console.warn(color, `(Firebase-Module) ${message}`)
}

function handleError(message) {
  // TODO: Delete warning by the end of 2019
  handleWarning(
    `Firebase-Module 3.0.0 introduced a new layout of the configuration for this module. Check out the Changelogs to see what changed and reconfigure your options accordingly.
    See: https://github.com/@nuxtjs/firebase/releases/tag/v3.0.0`
  )
  throw new Error(`(Firebase-Module) ${message}`)
}

module.exports.meta = require('../package.json')
