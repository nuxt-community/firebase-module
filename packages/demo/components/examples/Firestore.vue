<template>
  <div>
    <ServiceTitle title="Firebase Firestore" />
    <div class="links">
      <Btn @click="writeToFirestore()">Write to Firestore</Btn>
      <client-only>
        <Codeblock>
          <pre>
async writeToFirestore() {
  const messageRef = this.$fire.firestore.collection('message').doc('message')
  try {
    await messageRef.set({
      message: 'Nuxt-Fire with Firestore rocks!'
    })
  } catch (e) {
  alert(e)
  return
  }
  alert('Success.')
}
      </pre
          >
        </Codeblock>
      </client-only>
      <Btn @click="readFromFirestore()">Read from Firestore</Btn>
      <client-only>
        <Codeblock>
          <pre>
async readFromFirestore() {
  const messageRef = this.$fire.firestore.collection('message').doc('message')
  try {
    const messageDoc = await messageRef.get()
    alert(messageDoc.data().message)
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
    async writeToFirestore() {
      const messageRef = this.$fire.firestore
        .collection('message')
        .doc('message')
      try {
        await messageRef.set({
          message: 'Nuxt-Fire with Firestore rocks!',
        })
      } catch (e) {
        alert(e)
        return
      }
      alert('Success.')
    },
    async readFromFirestore() {
      const messageRef = this.$fire.firestore
        .collection('message')
        .doc('message')
      try {
        const snapshot = await messageRef.get()
        const doc = snapshot.data()
        if (!doc) {
          alert('Document does not exist.')
          return
        }
        alert(doc.message)
      } catch (e) {
        alert(e)
      }
    },
  },
})
</script>
