<template>
  <div></div>
</template>

<script>
import Vue from 'vue'
import AutoAdsense from 'vue-google-adsense/dist/AutoAdsense.min.js'

export default {
  beforeMount() {
    Vue.use(require('vue-script2'))
    Vue.use(AutoAdsense, { adClient: 'ca-pub-6032774483827005' })
  }
}
</script>
