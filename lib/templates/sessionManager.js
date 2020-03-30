import firebase from 'firebase/app'

export default class SessionManager {
  config = null
  lifetime = 0
  loginDelay = 0

  static login = {
    working: null,
    queue: []
  }

  static sessions = []

  constructor({ config, loginDelay = 100, sessionLifetime = 0 }) {
    console.log('construct')
    this.config = config
    this.loginDelay = loginDelay
    this.lifetime = sessionLifetime
  }

  getUser(name) {
    const session = this.getSession(name)

    if (!session) {
      const error = new Error(`Missing session for user ${name}`)
      error.code = 'nuxt-firebase/missing-session'

      throw error
    }

    const auth = session.instance.auth()

    return auth.currentUser
  }

  loginWithCustomToken(name, token) {
    const session = this.getSession(name)

    const auth = session.instance.auth()

    return new Promise((resolve, reject) => {
      this.constructor.login.queue.push({
        promise: () => auth.signInWithCustomToken(token),
        resolve,
        reject
      })

      this.dequeueLoginAttempts()
    })
  }

  async dequeueLoginAttempts() {
    if (this.constructor.login.working) return
    this.constructor.login.working = true

    const current = this.constructor.login.queue.shift()

    if (!current) {
      this.constructor.login.working = false
      return
    }

    try {
      const { user } = await current.promise()

      current.resolve(user)
    } catch (e) {
      current.reject(e)
    }

    setTimeout(() => {
      this.constructor.login.working = false
      this.dequeueLoginAttempts()
    }, this.loginDelay)
  }

  getSession(name) {
    return this.constructor.sessions.find(s => s.instance.name === name)
  }

  startSession(name = '[DEFAULT]') {
    console.log('start: ', name)
    console.log(this.constructor.sessions.length)
    const session = this.getSession(name)

    if (session) {
      console.log('session found')
      if (name === '[DEFAULT]') return session.instance

      if (session.timeout) clearTimeout(session.timeout)

      session.touched = Date.now()
      session.active++

      return session.instance
    }

    const instance = firebase.apps.find(a => a.name === name) || firebase.initializeApp(this.config, name)
    this.constructor.sessions.push({
      instance,
      touched: Date.now(),
      active: 1
    })

    return instance
  }

  endSession(name = '[DEFAULT]') {
    console.log('end: ', name)
    const session = this.getSession(name)

    if (!session || name === '[DEFAULT]') return

    session.active--
    console.log('active sessions: ', session.active)

    if (session.active < 1) {
      const logoutTimer = this.lifetime - (Date.now() - session.touched)

      session.timeout = setTimeout(() => {
        this.removeSession(session)
      }, logoutTimer)
    }
  }

  async removeSession(session) {
    console.log('delete: ', session.instance.name)
    this.constructor.sessions = this.constructor.sessions.filter(s => s.instance.name !== session.instance.name)

    await session.instance.delete()
  }
}

export let manger = new SessionManager(<%= serialize(options) %>)
export default SessionManager
