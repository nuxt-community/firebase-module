const { resolve } = require('path')
const fs = require('fs-extra')
const { Nuxt, Builder } = require('nuxt')
const FirebaseModule = require('..')

jest.mock('firebase/app', () => {
  const { getProxyMock } = require('proxy-mock-js')
  const spyFn = (name, fn) => jest.fn(fn)
  const session = getProxyMock({}, 'firebaseSession', spyFn)

  /* const session = new Proxy({}, {
    get(target, name) {
      return jest.fn(() => ({}))
    }
  }) */

  return {
    apps: [session],
    messaging: {
      isSupported: jest.fn()
    }
  }
})

describe('lazy-init-auth', () => {
  let nuxt
  const buildDir = resolve(__dirname, '.nuxt-lazy-init-auth')

  beforeAll(async () => {
    const config = {
      rootDir: resolve(__dirname, '..'),
      buildDir,
      srcDir: resolve(__dirname, 'fixture'),
      modules: [
        [FirebaseModule, {
          injectModule: false,
          lazy: true,
          config: {
            // REQUIRED: Official config for firebase.initializeApp(config):
            apiKey: '<apiKey>',
            authDomain: '<authDomain>',
            databaseURL: '<databaseURL>',
            projectId: '<projectId>',
            storageBucket: '<storageBucket>',
            messagingSenderId: '<messagingSenderId>',
            appId: '<appId>',
            measurementId: '<measurementId>'
          },
          services: {
            analytics: true,
            auth: {
              initialize: {
                onAuthStateChangedAction: 'onAuthStateChanged'
              }
            },
            firestore: true,
            functions: true,
            messaging: true,
            performance: true,
            database: true,
            remoteConfig: true,
            storage: true
          }
        }]
      ]
    }
    config.dev = false

    nuxt = new Nuxt(config)
    const BundleBuilder = { build: _ => _ }
    const builder = new Builder(nuxt, BundleBuilder)
    await builder.build()
  }, 60000)

  afterAll(async () => {
    await nuxt.close()
  })

  test('init auth plugin exist', async () => {
    const content = await fs.readFile(resolve(buildDir, 'firebase/service.auth.initialize.js'), { encoding: 'utf8' })
    expect(content).toMatchSnapshot()
  })
})
