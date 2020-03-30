import admin from 'firebase-admin'

import { manager } from './sessionManager'

if (!admin.apps.length) {
  const credential = <%=
    typeof options.credential === 'boolean'
      ? 'admin.credential.applicationDefault()'
      : `admin.credential.cert(${serialize(options.credential)})`
  %>

  admin.initializeApp({
    credential,
    ...manager.config
  })
}

export default async ({ res }) => {
  if (res && res.locals && res.locals.user && res.locals.user.uid) {
    const uid = res.locals.user.uid

    const user = manager.getUser(uid)
    if (user) return

    try {
      // Retrieve a custom auth token from the users uid
      const customToken = await admin.auth().createCustomToken(uid)

      // attempt client sdk sign
      await manager.loginWithCustomToken(uid, customToken)
    } catch (error) {
      // @TODO: implement appropriate error handling, if at all necessary
      console.log(error)
    }
  }
}
