<template>
  <div>
    <div>
      <ServiceTitle title="Firebase Messaging" />

      <Btn :disabled="listenersStarted" @click="startListeners"
        >Start Listeners</Btn
      >
      <Btn
        :disabled="permissionGranted || !listenersStarted"
        class="mb-1"
        @click="requestPermission"
      >
        Request Permission
      </Btn>
      <Btn
        :disabled="!listenersStarted || !permissionGranted || idToken !== ''"
        :loading="loading"
        class="mb-1"
        @click="getIdToken"
      >
        Get ID Token
      </Btn>
      <Btn :disabled="idToken === ''" class="mb-1" @click="sendTestMessage">
        Send Test Push Message
      </Btn>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  data() {
    return {
      listenersStarted: false,
      permissionGranted: false,
      idToken: '',
      loading: false,
    }
  },
  methods: {
    async requestPermission() {
      try {
        const permission = await Notification.requestPermission()
        this.permissionGranted = permission === 'granted'
      } catch (e) {
        console.error(e)
      }
    },
    async getIdToken() {
      this.loading = true
      let currentToken
      try {
        currentToken = await this.$fire.messaging.getToken()
      } catch (e) {
        console.error('An error occurred while retrieving token. ', e)
        this.idToken = ''
        this.loading = false
      }

      if (currentToken) {
        this.idToken = currentToken
      } else {
        // Show permission request.
        console.info(
          'No Instance ID token available. Request permission to generate one.'
        )
        // Show permission UI.
        // updateUIForPushPermissionRequired();
        this.idToken = ''
      }
      alert(`The id token is: ${this.idToken}`)
      this.loading = false
    },
    startListeners() {
      this.startOnMessageListener()

      this.listenersStarted = true
    },
    startOnMessageListener() {
      this.$fire.messaging.onMessage((payload: any) => {
        console.info('Message received. ', payload)
      })
    },

    sendTestMessage() {
      try {
        setTimeout(() => {
          // wait 5 seconds so you have time to switch away from the page to test the service-worker
          this.$fire.functions.httpsCallable('sendTestPushMessage')({
            token: this.idToken,
          })
        }, 5000)
      } catch (e) {
        alert(e)
      }
    },
  },
})
</script>
