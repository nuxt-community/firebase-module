---
title: Migration guides
description: ''
position: 99
category: Community
---

## Migrate from v6 to v7

In v7 a major overhaul of the `auth` configuration was introduced.

### 1 - Renamings of injected services

| Before         | New (Version 7+)   |
| -------------- | ------------------ |
| $fireAuth      | $fire.auth         |
| $fireDb        | $fire.database     |
| $fireStore     | $fire.firestore    |
| $fireStorage   | $fire.storage      |
| $fireFunc      | $fire.functions    |
| $fireMess      | $fire.messaging    |
| $firePerf      | $fire.performance  |
| $fireAnalytics | $fire.analytics    |
| $fireConfig    | $fire.remoteConfig |

### 2 - Renaming of module/object

| Before            | New (Versiom 7+)   |
| ----------------- | ------------------ |
| $fireAuthObj      | $firebase.auth         |
| $fireDbObj        | $firebase.database     |
| $fireStoreObj     | $firebase.firestore    |
| $fireStorageObj   | $firebase.storage      |
| $fireFuncObj      | $firebase.functions    |
| $fireMessObj      | $firebase.messaging    |
| $firePerfObj      | $firebase.performance  |
| $fireAnalyticsObj | $firebase.analytics    |
| $fireConfigObj    | $firebase.remoteConfig |

### 3 - Renamed `realtimeDb` to `database`

To stick to the Firebase naming convention and keep things simple, we renamed the key for the Realtime Database service configuration from `realtimeDb` to `database`.

```js[nuxt.config.js]
// Old
services: {
    realtimeDb: true
}
// New
services: {
    database: true
}
```

### 4 - Removed `movePluginBeforeAuthHelper`

The helper function `movePluginBeforeAuthHelper` has been removed.

If you need to run certain plugins AFTER Firebase has been initialized but BEFORE the `onAuthStateChanged()` listener is set up, you can now use the `manuallySubscribe: true` config and then manually subscribe the `onAuthStateChanged()` listener after your other plugins are initialized as described [here](/service-options/auth#subscribemanually).

### 5 - ...