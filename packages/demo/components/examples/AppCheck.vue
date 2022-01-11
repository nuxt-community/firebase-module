<template>
  <div>
    <ServiceTitle title="Firebase AppCheck" />
    <div class="links">
      <Btn @click="appCheck()">Activate AppCheck</Btn>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  methods: {
    appCheck() {
      if (process.client) {
        this.$fire.appCheck.activate('RECAPTCHA V3 SITE KEY')
      }
    },
  },
})
</script>
