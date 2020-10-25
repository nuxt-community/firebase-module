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

describe('lazy', () => {
  let nuxt
  const buildDir = resolve(__dirname, '.nuxt-lazy')

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
            auth: true,
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

  test('plugin contents', async () => {
    const content = await fs.readFile(resolve(buildDir, 'firebase/index.js'), { encoding: 'utf8' })

    expect(content).toContain('fire.auth = null')
    expect(content).toContain('fire.messaging = null')

    expect(content).not.toContain('Mess')

    expect(content).toMatchSnapshot()
  })

  test('exec plugin (server)', async () => {
    const Plugin = await import(resolve(buildDir, 'firebase/index.js')).then(m => m.default || m)
    const ctx = {}
    const inject = jest.fn()

    await Plugin(ctx, inject)
    expect(inject).toHaveBeenCalledTimes(1)
    expect(ctx.$fire).toBeDefined()
    expect(ctx.$fireModule).toBeUndefined()

    expect(ctx.$fire.appReady).toBeDefined()

    // TODO: test the appReady call. Doesnt work atm due to Jest not detecting
    // a async callback in the session var. Not fully sure whats happening
    // const app = await ctx.$fire.appReady()
  })

  test('exec plugin (client)', async () => {
    process.client = true
    const Plugin = await import(resolve(buildDir, 'firebase/index.js')).then(m => m.default || m)
    const ctx = {}
    const inject = jest.fn()

    await Plugin(ctx, inject)
    expect(inject).toHaveBeenCalledTimes(1)
    expect(ctx.$fire).toBeDefined()
    expect(ctx.$fireModule).toBeUndefined()
  })
})
