const functions = require('firebase-functions')
const admin = require('firebase-admin')
admin.initializeApp()
const messaging = admin.messaging()

exports.testFunction = functions.https.onCall(() => {
  console.info('Test Function triggered')
  return { message: "Yeaaahh it's working!" }
})

exports.sendTestPushMessage = functions.https.onCall(async (data) => {
  // As defined in https://firebase.google.com/docs/reference/fcm/rest/v1/projects.messages
  const image =
    'https://avatars2.githubusercontent.com/u/4020037?s=460&u=c5f9c131d565202d8e530295b130239edd25768d&v=4'
  const message = {
    name: 'testPushMessage',
    data: {},
    notification: {
      title: `Test Push Message`,
      body: 'If you get this, it worked.',
      image,
    },
    android: {},
    webpush: {
      notification: {
        // Adds the image to the push notificationm
        icon: image,
        // Adds actions to the push notification
        actions: [
          {
            action: 'goToLupasGithub',
            title: 'Github: lupas',
            icon: '',
          },
          {
            action: 'goToModuleGithub',
            title: 'Firebase Module',
            icon: '',
          },
        ],
      },
      fcm_options: {
        // Adds a link to be opened when clicked on the push notification
        link: 'https://nuxt-fire-demo.herokuapp.com/',
      },
    },
    apns: {
      fcm_options: {},
    },
    fcm_options: {},
    token: data.token,
  }
  try {
    await messaging.send(message)
  } catch (e) {
    console.error(`Did not work to send a message to token ${message.token}`)
    console.error(e)
  }
})
