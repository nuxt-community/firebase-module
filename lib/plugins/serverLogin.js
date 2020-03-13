import admin from 'firebase-admin'

const options = <%= serialize(options) %>

if (!admin.apps.length) {
  const credential = typeof options.credential === 'string'
    ? admin.credential.cert(options.credential)
    : admin.credential.applicationDefault()

  admin.initializeApp({
    credential,
    ...options.config
  })
}

export default async ({ res, app }) => {
  if (res && res.locals && res.locals.user && res.locals.user.uid) {
    // Retrieve a custom auth token from the users uid
    const customToken = await admin.auth().createCustomToken(res.locals.user.uid)

    // attempt client sdk sign in
    await app.$fireAuth.signInWithCustomToken(customToken)
  }
}
