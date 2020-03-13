const admin = require('firebase-admin')
const logger = require('../logger')

const simulateUserRecord = ({
  iss,
  aud,
  sub,
  exp,
  user_id: _,
  iat,
  auth_time: authTime,
  uid,
  name: displayName,
  email,
  email_verified: emailVerified,
  firebase: { sign_in_provider: providerId, tenant: tenantId },
  ...customClaims
}) => {
  return {
    uid,
    email,
    emailVerified,
    displayName,
    disabled: false,
    metadata: {
      lastSingInTime: new Date(authTime).toISOString(),
      creationTime: '',
      toJSON () {
        return JSON.stringify(this)
      }
    },
    providerData: [
      {
        uid,
        displayName,
        email,
        phoneNumber: '',
        photoURL: '',
        providerId,
        toJSON () {
          return JSON.stringify(this)
        }
      }
    ],
    customClaims,
    tokensValidAfterTime: new Date(iat).toISOString(),
    tenantId,
    toJSON () {
      return JSON.stringify(this)
    }
  }
}

module.exports = function (options) {
  return async (req, res, next) => {
    if (!req.headers.authorization) {
      return next()
    }

    // initialize admin sdk if not yet initialized
    if (!admin.apps.length) {
      if (options.credential) {
        const credential =
          typeof options.credential === 'string'
            ? admin.credential.cert(options.credential)
            : admin.credential.applicationDefault()

        admin.initializeApp({
          credential,
          ...options.config
        })
      } else {
        admin.initializeApp(options.config)
      }
    }

    // Parse the injected ID token from the request header.
    const authorizationHeader = req.headers.authorization || ''
    const components = authorizationHeader.split(' ')
    const idToken = components.length > 1 ? components[1] : ''

    try {
      // Try to verify the id token, additionally checking if the token was revoked
      const decodedToken = await admin.auth().verifyIdToken(idToken)

      if (decodedToken.uid) {
        const user = options.credential
          ? await admin.auth().getUser(decodedToken.uid)
          : simulateUserRecord(decodedToken)

        res.locals = {
          ...res.locals,
          user
        }
      }
    } catch (e) {
      logger.error(e)
    }

    next()
  }
}
