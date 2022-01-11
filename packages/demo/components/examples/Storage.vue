<template>
  <div>
    <ServiceTitle title="Firebase Storage" />
    <div class="links">
      <Btn @click="uploadFile()">Upload File</Btn>
      <client-only>
        <Codeblock>
          <pre>
async uploadFile() {
  const storageRef = this.$fire.storage.ref().child('message.txt')
  const message = 'Nuxt-Fire with Firebase Storage rocks!'
  try {
    const snapshot = await storageRef.putString(message)
    alert('File uploaded.')
  } catch (e) {
    alert(e.message)
  }
}
      </pre
          >
        </Codeblock>
      </client-only>
      <Btn @click="getFileUrl()">Get File URL</Btn>
      <client-only>
        <Codeblock>
          <pre>
async getFileUrl() {
  const storageRef = this.$fire.storage.ref().child('message.txt')
  try {
    const url = await storageRef.getDownloadURL()
    alert(`The file can be found here: ${url}`)
  } catch (e) {
    alert(e.message)
  }
}
      </pre
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
    async uploadFile() {
      const storageRef = this.$fire.storage.ref().child('message.txt')
      const message = 'Nuxt-Fire with Firebase Storage rocks!'
      try {
        const snapshot = await storageRef.putString(message)
        alert('File uploaded.')
      } catch (e: any) {
        alert(e.message)
      }
    },
    async getFileUrl() {
      const storageRef = this.$fire.storage.ref().child('message.txt')
      try {
        const url = await storageRef.getDownloadURL()
        alert(`The file can be found here: ${url}`)
      } catch (e: any) {
        alert(e.message)
      }
    },
  },
})
</script>
