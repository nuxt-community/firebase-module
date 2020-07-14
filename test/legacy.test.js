const { resolve } = require('path')
const fs = require('fs-extra')
const { Nuxt, Builder } = require('nuxt')
const { injectionMapping } = require('../lib/template-utils')
const FirebaseModule = require('..')

jest.mock('firebase/app', () => ({
  apps: [
    new Proxy({}, {
      get (target, name) {
        return jest.fn(() => ({}))
      }
    })
  ],
  messaging: {
    isSupported: jest.fn()
  }
}))

describe('legacy', () => {
  let nuxt
  const buildDir = resolve(__dirname, '.nuxt-legacy')

  beforeAll(async () => {
    const config = {
      rootDir: resolve(__dirname, '..'),
      buildDir,
      srcDir: resolve(__dirname, 'fixture'),
      modules: [
        [FirebaseModule, {
          legacyMode: true,
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
            realtimeDb: true,
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

    for (const injectedName of Object.values(injectionMapping)) {
      expect(content).toContain(`'fire${injectedName}'`)
      expect(content).toContain(`'fire${injectedName}Obj'`)
    }

    expect(content).not.toContain('fire.auth')

    expect(content).toMatchSnapshot()
  })

  test('exec plugin (server)', async () => {
    const Plugin = await import(resolve(buildDir, 'firebase/index.js')).then(m => m.default || m)
    const inject = jest.fn()

    await Plugin({}, inject)
    expect(inject).toHaveBeenCalledTimes(10)
  })

  test('exec plugin (client)', async () => {
    process.client = true
    const Plugin = await import(resolve(buildDir, 'firebase/index.js')).then(m => m.default || m)
    const inject = jest.fn()

    await Plugin({}, inject)
    expect(inject).toHaveBeenCalledTimes(18)
  })
})
