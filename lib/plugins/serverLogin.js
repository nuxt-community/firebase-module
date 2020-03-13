import admin from 'firebase-admin'

const options = <%= serialize(options) %>

if (!admin.apps.length) {
  const credential = options.credential
    ? admin.credential.cert(options.credential)
    : admin.credential.applicationDefault()

  admin.initializeApp({
    credential,
    ...options.config
  })
}

export default async ({ res, app }) => {
  if (process.server && res && res.verifiedFireAuthUser) {
    const { uid } = res.verifiedFireAuthUser

    // Retrieve a custom auth token from the users uid
    const customToken = await admin.auth().createCustomToken(uid)

    // attempt client sdk sign in
    await app.$fireAuth.signInWithCustomToken(customToken)
  }
}
