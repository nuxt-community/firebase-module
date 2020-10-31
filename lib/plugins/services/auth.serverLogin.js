import admin from 'firebase-admin'

const config = <%= serialize(options.config) %>

if (!admin.apps.length) {
  const credential = <%=
    options.credential === true
      ? 'admin.credential.applicationDefault()'
      : `admin.credential.cert(require(${serialize(options.credential)}))`
  %>

  admin.initializeApp({
    credential,
    ...config
  })
}

export default async ({ res }) => {
  if (res && res.locals && res.locals.user && res.locals.user.uid && res.locals._manager) {
    const uid = res.locals.user.uid
    const manager = res.locals._manager

    // if the user is already logged in to the session, return early
    const user = manager.getUser(uid)
    if (user) return

    try {
      // Retrieve a custom auth token from the users uid
      const customToken = await admin.auth().createCustomToken(uid)

      // attempt client sdk sign
      await manager.login(uid, customToken)
    } catch (error) {
      // @TODO: implement appropriate error handling, if at all necessary
      console.error(error)
    }
  }
}
