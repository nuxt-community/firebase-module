const admin = require('firebase-admin')
const logger = require('../logger')

module.exports = function (options) {
  return async (req, res, next) => {
    if (!req.headers.authorization) { return next() }

    const credential = options.credential
      ? admin.credential.cert(options.credential)
      : admin.credential.applicationDefault()

    // initialize admin sdk if not yet initialized
    if (!admin.apps.length) {
      admin.initializeApp({
        credential,
        ...options.config
      })
    }

    // Parse the injected ID token from the request header.
    const authorizationHeader = req.headers.authorization || ''
    const components = authorizationHeader.split(' ')
    const idToken = components.length > 1 ? components[1] : ''

    try {
      // Try to verify the id token, additionally checking if the token was revoked
      const decodedToken = await admin.auth().verifyIdToken(idToken, true)

      // Get user record
      const userRecord = await admin.auth().getUser(decodedToken.uid)

      // separate properties preserve established API
      const { customClaims, ...authUser } = userRecord

      // @TODO: deprecate either response or request object augmentation on next major version bump
      res.verifiedFireAuthUser = authUser
      res.verifiedFireAuthUserClaims = customClaims

      req.verifiedFireAuthUser = authUser
      req.verifiedFireAuthUserClaims = customClaims
    } catch (e) {
      logger('token verification failed:', e)
    }

    next()
  }
}
