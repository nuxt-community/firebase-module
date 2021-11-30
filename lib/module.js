const { resolve } = require('path')
const firebase = require('firebase/compat/app')
const logger = require('./utils/logger')
const templateUtils = require('./utils/template-utils')

const r = (...path) => resolve(__dirname, ...path)

module.exports = function (moduleOptions) {
  const defaultOptions = {
    injectModule: true,
  }

  const options = Object.assign(
    defaultOptions,
    this.options.firebase,
    moduleOptions
  )
  const currentEnv = getCurrentEnv(options)

  validateOptions(options)

  options.config = getFinalUseConfigObject(options.config, currentEnv)
  validateConfigKeys(options, currentEnv)

  // Assign some defaults
  options.services.app = Object.assign({ static: false }, options.services.app)
  for (const service in options.services) {
    if (options.services[service] === true) {
      // If a service is enabled always set an object
      // so we dont have to bother about this in the
      // service templates
      options.services[service] = {}
    }
  }

  loadMessaging.call(this, options)
  const loadAuthPlugin = loadAuth.call(this, options)

  const enabledServices = []
  for (const serviceMapping of Object.values(templateUtils.serviceMappings)) {
    // Note: app is always set, see defaults above
    const serviceOptions = options.services[serviceMapping.id]
    if (!serviceOptions) {
      continue
    }

    this.addTemplate({
      src: r(`plugins/services/${serviceMapping.id}.js`),
      fileName: `firebase/${serviceMapping.id === 'app' ? '' : 'service.'}${
        serviceMapping.id
      }.js`,
      options: {
        ...options,
        ...templateUtils,
        serviceMapping,
        serviceOptions,
      },
    })

    if (serviceMapping.id !== 'app') {
      enabledServices.push(serviceMapping)
    }
  }

  // Register main firebase-module plugin
  this.addPlugin({
    src: r('plugins/main.js'),
    fileName: 'firebase/index.js',
    options: {
      ...options,
      ...templateUtils,
      enabledServices,
    },
  })

  // add ssrAuth plugin last
  // so res object is augmented for other plugins of this module
  loadAuthPlugin()

  // Terminate Database after Nuxt Generate
  if (options.terminateDatabasesAfterGenerate) {
    terminateDatabasesInGenerateHooks(this)
  }
}

/**
 * Helper function to add service-worker templates
 */
function addServiceWorker(
  { config, onFirebaseHosting = false },
  templateFile,
  templateOptions = {}
) {
  // Add Service Worker Template
  this.addTemplate({
    src: r(`sw-templates/${templateFile}`),
    fileName: resolve(
      this.options.srcDir,
      this.options.dir.static,
      templateFile
    ),
    options: {
      firebaseVersion: firebase.SDK_VERSION,
      config,
      loadFromFirebaseHosting:
        process.env.NODE_ENV === 'production' ? onFirebaseHosting : false,
      ...templateOptions,
    },
  })
}

/**
 * Adds the messaging service worker template if needed
 */
function loadMessaging(options) {
  const { messaging } = options.services
  if (!messaging || !messaging.createServiceWorker) {
    return
  }

  addServiceWorker.call(this, options, 'firebase-messaging-sw.js', {
    actions: messaging.actions,
    inject: messaging.inject,
  })
}

/**
 * Handles server side authentication & client side auth initialization
 */
function loadAuth(options) {
  const { auth } = options.services
  const noop = (_) => _

  if (!auth) {
    return noop
  }

  if (!isEmpty(auth.initialize)) {
    // Register initAuth plugin
    if (options.lazy || auth.initialize.subscribeManually) {
      this.addTemplate({
        src: r('plugins/services/auth.initialize.js'),
        fileName: 'firebase/service.auth.initialize.js',
      })
    } else {
      this.addPlugin({
        src: r('plugins/services/auth.initialize.js'),
        fileName: 'firebase/service.auth.initialize.js',
      })
    }
  }

  // Early return when ssr auth is not needed
  if (!auth.ssr) {
    return noop
  }

  const ssrConfig = Object.assign({}, auth.ssr)
  options.sessions = false

  // Resolve credential setting
  const credential =
    typeof ssrConfig.credential === 'string'
      ? this.nuxt.resolver.resolveAlias(ssrConfig.credential)
      : ssrConfig.credential || false

  // Add Service-Worker
  addServiceWorker.call(this, options, 'firebase-auth-sw.js', {
    authOptions: options.services.auth,
    ignorePaths: [
      '/__webpack_hmr',
      '/_loading',
      this.options.build.publicPath,
      ...(ssrConfig.ignorePaths || []),
    ],
  })

  if (ssrConfig.serverLogin && credential) {
    options.sessions = Object.assign({}, ssrConfig.serverLogin)

    this.addPlugin({
      src: r('plugins/services/auth.serverLogin.js'),
      fileName: 'firebase/service.auth.serverLogin-server.js',
      mode: 'server',
      options: {
        credential,
        config: options.config,
      },
    })

    const sessionLifetime = options.sessions.sessionLifetime || 0

    this.nuxt.hook('render:routeDone', async (_, __, { res }) => {
      if (!res || !res.locals || !res.locals._session) {
        return
      }

      const { _session: session, _manager: manager } = res.locals

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
    })
  }

  return () => {
    this.addPlugin({
      src: r('plugins/services/auth.ssr.js'),
      fileName: 'firebase/service.auth.ssr-server.js',
      mode: 'server',
      options: {
        credential,
        config: options.config,
      },
    })
  }
}

/**
 * Validates the options defined by the user and throws an error is something is
 * missing or wrongly set up.
 * See: https://firebase.nuxtjs.org/guide/options/
 */
function validateOptions(options) {
  if (isEmpty(options)) {
    return logger.error(
      'Options are missing or empty, add at least the Firebase config parameters in your nuxt.config.js file.'
    )
  }

  if (isEmpty(options.services)) {
    return logger.error(
      `The 'services' option is missing or empty, make sure to define it properly.
      See: https://firebase.nuxtjs.org/guide/getting-started#configure`
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
    // 'databaseURL', // legacy, only available in old projects
    'projectId',
    'storageBucket',
    'messagingSenderId',
    'appId',
    // 'measurementId' - not a must without Analytics, we throw a warning below
  ]

  // If one of the required keys is missing, throw an error:
  if (requiredKeys.some((k) => !configKeys.includes(k))) {
    const missingKey =
      requiredKeys[requiredKeys.findIndex((k) => !configKeys.includes(k))]
    return logger.error(
      `Missing or incomplete config for current environment '${currentEnv}': key '${missingKey}' is required!`
    )
  }

  // Only if Analytics is enabled and the measurementId key is missing, throw an error.
  if (options.analytics && !configKeys.includes('measurementId')) {
    return logger.warn(
      'Missing measurementId configuration value. Analytics will be non-functional.'
    )
  }
}

/**
 * This makes sure nuxt generate does finish without running into a timeout issue.
 * Might be able to remove this at some point (e.g. with Nuxt 3)
 * See https://github.com/nuxt-community/firebase-module/issues/93
 */
function terminateDatabasesInGenerateHooks(ctx) {
  ctx.nuxt.hook('generate:before', async (generator) => {
    const { default: firebase } = await import('firebase/compat/app')
    await import('firebase/compat/database')
    await import('firebase/compat/firestore')

    if (!firebase.apps.length) {
      firebase.initializeApp(generator.options.firebase.config)
    }

    generator.$fire = firebase.apps[0]
  })
  ctx.nuxt.hook('generate:done', async ({ $fire }) => {
    // Terminate Databases
    try {
      await $fire.database().goOffline()
      console.info('RealTime Database manually terminated.')
    } catch (e) {}
    try {
      await $fire.firestore().terminate()
      console.info('Firestore manually terminated.')
    } catch (e) {}
  })
}

function isEmpty(val) {
  return val == null || !(Object.keys(val) || val).length
}

module.exports.meta = require('../package.json')
