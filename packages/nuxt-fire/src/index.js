import path from 'path'
import { isEmpty } from 'lodash'

export default function nuxtFire(moduleOptions) {
  const options = Object.assign({}, this.options.fire, moduleOptions)
  const firebaseVersion = '7.3.0' // TODO: Update with each Firebase update
  const currentEnv = getCurrentEnv(options)

  options.useOnly = getFinalUseOnlyObject(options)
  validateOptions(options)

  options.config = getFinalUseConfigObject(options.config, currentEnv)
  validateConfigKeys(options, currentEnv)

  if (options.initMessaging) {
    // Add Messaging Service Worker
    this.addTemplate({
      src: path.resolve(__dirname, 'templates/firebase-messaging-sw.js'),
      fileName: path.resolve(
        this.options.dir.static,
        'firebase-messaging-sw.js'
      ),
      options: {
        firebaseVersion,
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

  if (options.useOnly.includes('auth') && !isEmpty(options.initAuth)) {
    // Register initAuth plugin
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

/**
 * Validates the options defined by the user and throws an error is something is
 * missing or wrongly set up.
 * See: https://nuxtfire.netlify.com/options/
 */
function validateOptions(options) {
  const messagingEnabled = options.useOnly.includes('messaging')
  const authEnabled = options.useOnly.includes('auth')

  if (isEmpty(options)) {
    return handleError(
      `Options are missing or empty, add at least the Firebase config parameters in your nuxt.config.js file.`
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

  if (options.initMessaging && !messagingEnabled) {
    return handleError(
      `InitMessaging option can only be enabled when 'messaging' is set in useOnly.`
    )
  }

  if (options.initAuth !== null && !authEnabled) {
    return handleError(
      `InitAuth option can only be enabled when 'auth' is set in useOnly.`
    )
  }
}

/**
 * Either gets the current environment from the FIRE_ENV env variable
 * or the NODE_ENV variable, depending on setup.
 * See: https://nuxtfire.netlify.com/options/#customenv
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
 * See: https://nuxtfire.netlify.com/options/#config
 */
function getFinalUseConfigObject(config, currentEnv) {
  if (config && config[currentEnv]) {
    return config[currentEnv]
  }
  return config
}

/**
 * If use only is missing, set "useOnly" to include all Firebase services.
 * See: https://nuxtfire.netlify.com/options/#useonly
 */
function getFinalUseOnlyObject(options) {
  // If 'useOnly' option is not provided, load all Firebase products
  if (isEmpty(options.useOnly)) {
    return [
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
  return options.useOnly
}

/**
 * Checks the Firebase config for the current environment in the nuxt.config.js file.
 * Breaks if a required key is missing.
 * See: https://nuxtfire.netlify.com/options/#config
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
  if (
    options.useOnly.includes('analytics') &&
    !configKeys.includes('measurementId')
  ) {
    return handleWarning(
      `Missing measurementId configuration value. Analytics will be non-functional.`
    )
  }
}

function handleWarning(message) {
  const color = '\x1b[33m'
  console.warn(color, `(Nuxt-Fire) ${message}`)
}

function handleError(message) {
  throw new Error(`(Nuxt-Fire) ${message}`)
}

module.exports.meta = require('./../package.json')
