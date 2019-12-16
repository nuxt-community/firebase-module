export default async({ app }) => {
  const options = <%= serialize(options) %>

  try {
    await app.$fireStore.enablePersistence(options)
  } catch (err) {
    if (err.code == 'failed-precondition') {
      console.info(
        'Firestore Persistence not enabled. Multiple tabs open, persistence can only be enabled in one tab at a a time.'
      )
    } else if (err.code == 'unimplemented') {
      console.info(
        'Firestore Persistence not enabled. The current browser does not support all of the features required to enable persistence.'
      )
    }
  }
}