---
title: messaging
description: ''
position: 13
category: Service Options
---

<alert>
Client-only - make sure to wrap universal code in <code>if (process.client) {}</code>.
</alert>

Initializes **Firebase Messaging** and makes it available via `$fire.messaging` and `$fireModule.messaging`.
Message payload is expected as defined by Firebase [here](https://firebase.google.com/docs/reference/fcm/rest/v1/projects.messages#WebpushConfig).

- Type: `Boolean` or `Object`
- Default: `false`

```js[nuxt.config.js]
messaging: {
  createServiceWorker: false,
  actions: [
    {
      action: 'randomName',
      url: 'randomUrl'
    }
  ],
  fcmPublicVapidKey: '<publicVapidKey>' // OPTIONAL : Sets vapid key for FCM after initialization
}
```

## createServiceWorker

- Type: `Boolean` or `Object`
- Default: `false`

Setting the **createServiceWorker** flag to true automatically creates a service worker called `firebase-messaging-sw.js` in your static folder. The service worker is fully configured for FCM with the newest Firebase scripts.

## actions

> Only works if `createServiceWorker === true`

An array of actions for which a `notificationClick` handler should be registered in the service worker that opens the defined url for the specific action sent by the payload.

```js
{
  action: 'randomName',
  url: 'randomUrl'
}
```

Make sure to define the action in your payload like so:

```js
const message = {
    // ...
    "webpush": {
      "notification": {
        "actions": [
          {
            action: "randomName",
            title: "Go to URL"
          }
        ]
      },
    },
    // ...
}
await messaging.send(message)
```

## inject

> Only works if `createServiceWorker === true`

Injects a string (or an entire code snippet) at the end of the messaging service worker. This allows you to extend the service worker to your liking.

#### Simple example: 

```js[nuxt.config.js]
...
inject: 'console.log("This is the end of the service worker.")',
...
```

#### Advanced example: 

```js[nuxt.config.js]
const fs = require('fs')
...
inject: fs.readFileSync('./javascriptFileWithCodeToBeInjected.js', 'utf8'),
...
```

## fcmPublicVapidKey

Allows FCM to use the VAPID key credential when sending message requests to different push services, see more [here](https://firebase.google.com/docs/cloud-messaging/js/client).
