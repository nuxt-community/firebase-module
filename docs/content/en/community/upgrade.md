---
title: Migration guides
description: ''
position: 99
category: Community
---

## Upgrade from v6 to v7

In v7 a major overhaul of the `auth` configuration was introduced.

### 1 - Renamings of injected services

| Before         | New (Versiom 7+)   |
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

### 3 - Removed `movePluginBeforeAuthHelper`

The helper function `movePluginBeforeAuthHelper` has been removed.

If you need to run plugins after Firebase has been initialized but before the `onAuthStateChanged()` listenr should be set up, you can now use the `manuallySubscribe = true` config and then manually setup the onAuthStateChanged() listener after your otherplugins as described [here](/service-options/auth#subscribemanually).

### 4 - ...