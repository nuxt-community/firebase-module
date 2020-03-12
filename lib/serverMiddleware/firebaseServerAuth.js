import admin from 'firebase-admin'

import firebase from 'firebase/app'
import 'firebase/auth'


export default async function(req, res, next) {
  const options = <%= serialize(options) %>

  if (!req.headers.authorization ) return next()

  // initialize admin sdk if not yet initialized
  if (!admin.apps.length) {
    admin.initializeApp({
      credential: options.credential || admin.credential.applicationDefault(),
      ...options.config
    })
  }

  // initialize client sdk if not yet initialized
  if (!firebase.apps.length) {
    firebase.initializeApp(options.config)
  }

  // Parse the injected ID token from the request header.
  const authorizationHeader = req.headers.authorization || '';
  const components = authorizationHeader.split(' ');
  const idToken = components.length > 1 ? components[1] : '';

  try {
    // Try to verify the id token, additionally checking if the token was revoked
    const decodedToken = await admin.auth().verifyIdToken(idToken, true)

    // Retrieve a custom auth token from the users uid
    const customToken = await admin.auth().createCustomToken(decodedToken.uid)

    // attempt client sdk sign in
    await firebase.auth().signInWithCustomToken(customToken)

    // Get user record
    const userRecord = await admin.auth().getUser(decodedToken.uid)
    // separate properties preserve established API
    const { customClaims, ...authUser } = userRecord

    // @TODO: deprecate either response or request object augmentation on next major version bump
    res.verifiedFireAuthUser = authUser
    res.verifiedFireAuthUserClaims = customClaims

    req.verifiedFireAuthUser = authUser
    req.verifiedFireAuthUserClaims = customClaims
  } catch(e) {
    console.error(e)
  }

  next()
}
