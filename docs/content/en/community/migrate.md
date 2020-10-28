---
title: Migration guides
description: ''
position: 98
category: Community
---

<img src="/version7.png" class="light-img" width="1280" height="640" alt="" />
<img src="/version7-dark.png" class="dark-img" width="1280" height="640" alt=""/>

## Migrate from v6 to v7

In v7 we introduce a major overhaul of how you access the individual Firebase services.

Reason for the renamings is to reduce confusion by sticking to the official naming convention of Firebase.

### 1 - Install Firebase JS SDK v8+

Nuxtjs/Firebase v7 now requires the Firebase JS SDK greather than v8.0.0 installed. Make sure to update your dependencies accordingly.

### 2 - Renamings of injected services

Search your entire project and replace all $fireFoo injections according to the table:

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

### 3 - Renaming of Firebase module/object

Search your entire project and replace all $fireFooObj injections according to the table:

| Before            | New (Versiom 7+)         |
| ----------------- | ------------------------ |
| $fireAuthObj      | $fireModule.auth         |
| $fireDbObj        | $fireModule.database     |
| $fireStoreObj     | $fireModule.firestore    |
| $fireStorageObj   | $fireModule.storage      |
| $fireFuncObj      | $fireModule.functions    |
| $fireMessObj      | $fireModule.messaging    |
| $firePerfObj      | $fireModule.performance  |
| $fireAnalyticsObj | $fireModule.analytics    |
| $fireConfigObj    | $fireModule.remoteConfig |

### 4 - Renamed `realtimeDb` to `database`

To stick to the Firebase naming convention we renamed the key for the Realtime Database service configuration from `realtimeDb` to `database`.

If you were using the RealtimeDb, rename this in your `nuxt.config.js`:

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

### 5 - Removed `movePluginBeforeAuthHelper`

The helper function `movePluginBeforeAuthHelper` has been removed.

If you need to run certain plugins AFTER Firebase has been initialized but BEFORE the `onAuthStateChanged()` listener is set up, you can now use the `subscribeManually: true` config and then manually subscribe the `onAuthStateChanged()` listener after your other plugins are initialized, as described [here](/service-options/auth#subscribemanually).

### 6 - Fixed `defaultConfig` option in RemoteConfig

Before v7.0.0, the [defaultConfig](/service-options/remote-config) option did not work if implemented as documented and needed to be set as a child of the `settings` object.

This has been fixed and the `defaultConfig` now needs to be defined as documented as a child of the `remote-config` object.

See [issue 281](https://github.com/nuxt-community/firebase-module/issues/281).