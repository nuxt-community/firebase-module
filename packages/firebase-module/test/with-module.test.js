const { resolve } = require('path')
const fs = require('fs-extra')
const { Nuxt, Builder } = require('nuxt')
const FirebaseModule = require('..')

jest.mock('firebase/compat/app', () => ({
  apps: [
    new Proxy(
      {},
      {
        get(target, name) {
          return jest.fn(() => ({}))
        },
      }
    ),
  ],
  messaging: {
    isSupported: jest.fn(),
  },
}))

describe('with-module', () => {
  let nuxt
  const buildDir = resolve(__dirname, '.nuxt-with-module')

  beforeAll(async () => {
    const config = {
      rootDir: resolve(__dirname, '..'),
      buildDir,
      srcDir: resolve(__dirname, 'fixture'),
      modules: [
        [
          FirebaseModule,
          {
            injectModule: true,
            config: {
              // REQUIRED: Official config for firebase.initializeApp(config):
              apiKey: '<apiKey>',
              authDomain: '<authDomain>',
              databaseURL: '<databaseURL>',
              projectId: '<projectId>',
              storageBucket: '<storageBucket>',
              messagingSenderId: '<messagingSenderId>',
              appId: '<appId>',
              measurementId: '<measurementId>',
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
              storage: true,
            },
          },
        ],
      ],
    }
    config.dev = false

    nuxt = new Nuxt(config)
    const BundleBuilder = { build: (_) => _ }
    const builder = new Builder(nuxt, BundleBuilder)
    await builder.build()
  }, 60000)

  afterAll(async () => {
    await nuxt.close()
  })

  test('plugin contents', async () => {
    const content = await fs.readFile(resolve(buildDir, 'firebase/index.js'), {
      encoding: 'utf8',
    })

    expect(content).toContain('auth,')
    expect(content).toContain('messaging,')
    expect(content).toContain('firebase')

    expect(content).not.toContain('Mess')

    expect(content).toMatchSnapshot()
  })

  test('exec plugin (server)', async () => {
    process.server = true
    process.client = false
    const Plugin = await import(resolve(buildDir, 'firebase/index.js')).then(
      (m) => m.default || m
    )
    const ctx = {}
    const inject = jest.fn()

    await Plugin(ctx, inject)
    expect(inject).toHaveBeenCalledTimes(2)
    expect(ctx.$fire).toBeDefined()
    expect(ctx.$fireModule).toBeDefined()
  })

  test('exec plugin (client)', async () => {
    process.server = false
    process.client = true
    const Plugin = await import(resolve(buildDir, 'firebase/index.js')).then(
      (m) => m.default || m
    )
    const ctx = {}
    const inject = jest.fn()

    await Plugin(ctx, inject)
    expect(inject).toHaveBeenCalledTimes(2)
    expect(ctx.$fire).toBeDefined()
    expect(ctx.$fireModule).toBeDefined()
  })
})
