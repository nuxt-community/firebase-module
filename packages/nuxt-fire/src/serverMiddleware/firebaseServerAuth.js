import admin from 'firebase-admin'
import { parseFirebaseAuthCookie } from 'nuxt-fire/src/helpers'

export default async function(req, res, next) {
  const options = <%= serialize(options) %>

  if (!req.headers.cookie) return next()

  if (!admin.apps.length) {
    admin.initializeApp(options.config)
  }

  const { idToken, authUser } = parseFirebaseAuthCookie({ req })
  if (!idToken) {
    return next()
  }

  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken)
    const uid = decodedToken.uid  
    if (uid) {
    // If UID can be retrieved, user is officially verified.
    // Set authUser object to res so it can be accesses in nuxtServerInit with in `ctx.res`
    res.verifiedFireAuthUser = authUser
  }
  } catch (e) {
    console.error(e)
  }
  
  next()
}
