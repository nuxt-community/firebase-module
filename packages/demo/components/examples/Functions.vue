<template>
  <div>
    <ServiceTitle title="Firebase Functions" />
    <div class="links">
      <Btn :loading="loading" @click="callTestFunction()"
        >Call Test Function</Btn
      >
      <p class="mt-1">Might take some seconds.</p>
      <client-only>
        <Codeblock>
          <pre>
async callTestFunction() {
  try {
    const res = await this.$fire.functions.httpsCallable('testFunction')()
    alert(res.data)
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
  data: () => ({
    loading: false,
  }),
  methods: {
    async callTestFunction() {
      this.loading = true
      try {
        const res = await this.$fire.functions.httpsCallable('testFunction')()
        alert(res.data.message)
      } catch (e) {
        alert(e)
      } finally {
        this.loading = false
      }
    },
  },
})
</script>
