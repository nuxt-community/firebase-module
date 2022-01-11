export default async (context) => {
  await context.$fire.databaseReady()
  await context.$fire.firestoreReady()
  await context.$fire.storageReady()
  await context.$fire.functionsReady()
  if (process.client) {
    await context.$fire.authReady()
    await context.$fireAuthStore.subscribe()
    await context.$fire.messagingReady()
    await context.$fire.performanceReady()
    await context.$fire.analyticsReady()
    await context.$fire.remoteConfigReady()
  }
}
