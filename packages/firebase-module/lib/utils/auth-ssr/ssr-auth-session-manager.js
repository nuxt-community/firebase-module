const logger = require('../logger')

const sessions = {
  working: false,
  queue: [],
  active: [],
}

const logins = {
  working: false,
  queue: [],
}

async function removeSession(session) {
  logger.info('deleting session: ', session.instance.name)

  const index = sessions.active.findIndex(
    (s) => s.instance.name !== session.instance.name
  )
  sessions.active.splice(index, 1)

  await session.instance.delete()
}

function enqueueSessionOperation(operation) {
  return new Promise((resolve) => {
    sessions.queue.push({
      operation,
      resolve,
    })

    dequeueSessionOperation()
  })
}

async function dequeueSessionOperation() {
  if (sessions.working) {
    return
  }
  sessions.working = true

  const item = sessions.queue.shift()

  if (!item) {
    sessions.working = false

    return
  }

  const result = await item.operation()
  item.resolve(result)

  sessions.working = false
  dequeueSessionOperation()
}

class SessionManager {
  constructor(firebase, { config, sessions: sessionConfig }) {
    this.firebase = firebase
    this.config = config
    this.lifetime = sessionConfig.sessionLifetime || 0
    this.loginDelay = sessionConfig.loginDelay || 50
  }

  getSession(name, touch = true) {
    const session = sessions.active.find((s) => s.instance.name === name)

    if (session) {
      if (session.timeout) {
        logger.debug('session retrieved, aborting removal')

        clearTimeout(session.timeout)
        session.timeout = null
      }

      if (touch) session.touched = Date.now()
    }

    return session
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

  startSession(name = '[DEFAULT]') {
    return enqueueSessionOperation(() => {
      logger.info('starting session for: ', name)

      const session = this.getSession(name)

      if (session) {
        if (name === '[DEFAULT]') return session.instance

        session.active++
        logger.debug('found existing, active sessions: ', session.active)

        return session.instance
      }

      const instance =
        this.firebase.apps.find((a) => a.name === name) ??
        this.firebase.initializeApp(this.config, name)

      sessions.active.push({
        instance,
        active: 1,
        touched: Date.now(),
      })

      logger.debug('created, active sessions: ', 1)

      return instance
    })
  }

  endSession(name = '[DEFAULT]') {
    return enqueueSessionOperation(() => {
      logger.info('ending session for: ', name)

      const session = this.getSession(name, false)

      if (!session || name === '[DEFAULT]') return

      session.active--
      logger.debug('active sessions: ', session.active)

      if (session.active < 1) {
        const logoutTimer = this.lifetime - (Date.now() - session.touched)

        logger.debug('enqueueing session removal in: ', logoutTimer)

        session.timeout = setTimeout(() => {
          enqueueSessionOperation(() => removeSession(session))
        }, logoutTimer)
      }
    })
  }

  login(name, token) {
    logger.debug('enqueueing login attempt', Date.now())

    const session = this.getSession(name)

    const auth = session.instance.auth()

    return new Promise((resolve, reject) => {
      logins.queue.push({
        promise: () => auth.signInWithCustomToken(token),
        resolve,
        reject,
      })

      this.dequeueLoginAttempts()
    })
  }

  async dequeueLoginAttempts() {
    if (logins.working) {
      return
    }
    logins.working = true

    const current = logins.queue.shift()

    if (!current) {
      logins.working = false
      return
    }

    try {
      logger.debug('attempting login: ' + Date.now())

      const { user } = await current.promise()

      current.resolve(user)
    } catch (e) {
      current.reject(e)
    }

    setTimeout(() => {
      logins.working = false
      this.dequeueLoginAttempts()
    }, this.loginDelay)
  }
}

module.exports = SessionManager
