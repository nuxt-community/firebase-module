import admin from 'firebase-admin'
import JWTDecode from 'jwt-decode'

export default async function(req, res, next) {
  const options = <%= serialize(options) %>

  if (!req.headers.authorization ) return next()

  if (!admin.apps.length) {
    admin.initializeApp(options.config)
  }

  // Parse the injected ID token from the request header.
  const authorizationHeader = req.headers.authorization || '';
  const components = authorizationHeader.split(' ');
  const idToken = components.length > 1 ? components[1] : '';

  // Get verified authUser claims from JWT
  const decodedAuthUserClaims = JWTDecode(idToken)

  const authUser = {
    // Reproduce main attributes of "official" authUser object
    uid: decodedAuthUserClaims.user_id,
    email: decodedAuthUserClaims.email,
    emailVerified: decodedAuthUserClaims.email_verified,
  }

  // Try to verify the id token:
  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken)
    const uid = decodedToken.uid  
    if (uid) {
    // If UID can be retrieved, user is officially verified.
    // Set authUser object to res so it can be accesses in nuxtServerInit with in `ctx.res`
    res.verifiedFireAuthUserClaims = decodedAuthUserClaims
    res.verifiedFireAuthUser = authUser
    } 
  } catch(e) {
    console.error(e)
  }
  
  next()
}
