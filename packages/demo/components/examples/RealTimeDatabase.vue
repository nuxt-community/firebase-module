<template>
  <div>
    <ServiceTitle title="Firebase Realtime Database" />
    <div class="links">
      <Btn @click="writeToRealtimeDb()">Write to Realtime DB</Btn>
      <client-only>
        <Codeblock>
          <pre>
async writeToRealtimeDb() {
  const messageRef = this.$fire.database.ref('message')
  try {
    await messageRef.set({
      message: 'Nuxt-Fire with Firebase Realtime Database rocks!'
    })
  } catch (e) {
    alert(e)
    return
  }
  alert('Success.')
}</pre
          >
        </Codeblock>
      </client-only>
      <Btn @click="readFromRealtimeDb()">Read from Realtime DB</Btn>
      <client-only>
        <Codeblock>
          <pre>
async readFromRealtimeDb() {
  const messageRef = this.$fire.database.ref('message')
  try {
    const snapshot = await messageRef.once('value')
    alert(snapshot.val().message)
  } catch (e) {
    alert(e)
    return
  }
}</pre
          >
        </Codeblock>
      </client-only>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  methods: {
    async writeToRealtimeDb() {
      const messageRef = this.$fire.database.ref('message')
      try {
        await messageRef.set({
          message: 'Nuxt-Fire with Firebase Realtime Database rocks!',
        })
      } catch (e) {
        alert(e)
        return
      }
      alert('Success.')
    },
    async readFromRealtimeDb() {
      const messageRef = this.$fire.database.ref('message')
      try {
        const snapshot = await messageRef.once('value')
        alert(snapshot.val().message)
      } catch (e) {
        alert(e)
      }
    },
  },
})
</script>
