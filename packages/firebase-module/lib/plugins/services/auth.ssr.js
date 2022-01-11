import admin from 'firebase-admin'

const config = <%= serialize(options.config) %>

const simulateUserRecord = ({
  uid,
  email,
  email_verified: emailVerified,
  name: displayName
}) => ({
  uid,
  email,
  emailVerified,
  displayName
})

if (!admin.apps.length) {
  <% if (options.credential) { %>
    const credential = <%=
    options.credential === true
      ? 'admin.credential.applicationDefault()'
      : `admin.credential.cert(require(${serialize(options.credential)}))`
  %>
  
  admin.initializeApp({
    credential,
    ...config
  })
  <% } else { %>
  admin.initializeApp(config)
  <% } %>
}

export default async ({ req, res }) => {
  if (!req || !req.headers.authorization) {
    return
  }

  // Parse the injected ID token from the request header.
  const authorizationHeader = req.headers.authorization || ''
  const components = authorizationHeader.split(' ')
  const idToken = components.length > 1 ? components[1] : ''

  try {
    // Try to verify the id token, additionally checking if the token was revoked
    const decodedToken = await admin.auth().verifyIdToken(idToken)

    if (decodedToken.uid) {
      const authUser = <%=
        options.credential
          ? 'await admin.auth().getUser(decodedToken.uid)'
          : 'simulateUserRecord(decodedToken)'
      %>

      res.locals = {
        ...res.locals,
        user: {
          ...authUser,
					allClaims: decodedToken,
					idToken,
        }
      }
    }
  } catch (e) {
    console.error(e)
  }
}
