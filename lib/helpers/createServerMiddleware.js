const admin = require('firebase-admin')
const logger = require('../logger')

const simulateUserRecord = ({ uid, email, email_verified: emailVerified, name: displayName }) => ({
  uid,
  email,
  emailVerified,
  displayName
})

module.exports = function (options) {
  // initialize admin sdk if not yet initialized
  if (!admin.apps.length) {
    if (options.credential) {
      const credential =
        typeof options.credential === 'boolean'
          ? admin.credential.applicationDefault()
          : admin.credential.cert(options.credential)

      admin.initializeApp({
        credential,
        ...options.config
      })
    } else {
      admin.initializeApp(options.config)
    }
  }

  return async (req, res, next) => {
    if (!req.headers.authorization) {
      return next()
    }

    // Parse the injected ID token from the request header.
    const authorizationHeader = req.headers.authorization || ''
    const components = authorizationHeader.split(' ')
    const idToken = components.length > 1 ? components[1] : ''

    try {
      // Try to verify the id token, additionally checking if the token was revoked
      const decodedToken = await admin.auth().verifyIdToken(idToken)

      if (decodedToken.uid) {
        const authUser = options.credential
          ? await admin.auth().getUser(decodedToken.uid)
          : simulateUserRecord(decodedToken)

        res.locals = {
          ...res.locals,
          user: {
            ...authUser,
            allClaims: decodedToken
          }
        }
      }
    } catch (e) {
      logger.error(e)
    }

    next()
  }
}
