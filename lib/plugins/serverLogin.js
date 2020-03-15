import admin from 'firebase-admin'

const options = <%= serialize(options) %>

if (!admin.apps.length) {
  const credential = typeof options.credential === 'boolean'
    ? admin.credential.applicationDefault()
    : admin.credential.cert(options.credential)

  admin.initializeApp({
    credential,
    ...options.config
  })
}

export default async ({ res, app }) => {
  if (res && res.locals && res.locals.user && res.locals.user.uid) {
    if (app.$fireAuth.currentUser) {
      if (app.$fireAuth.currentUser.uid === res.locals.user.uid) {
        return
      }

      // probably unnecessary as we create a separate firebase session per user,
      // but it's good to be safe :)
      await app.$fireAuth.signOut()
    }

    // Retrieve a custom auth token from the users uid
    const customToken = await admin.auth().createCustomToken(res.locals.user.uid)

    // attempt client sdk sign in
    try {
      await app.$fireAuth.signInWithCustomToken(customToken)
    } catch (error) {
      // @TODO: implement appropriate error handling, if at all necessary
    }
  }
}
