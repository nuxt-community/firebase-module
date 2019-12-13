<template>
  <ParentLayout>
    <template #sidebar-top>
      <!--<SidebarTopAds /> -->
    </template>
    <template #page-bottom>
      <!--<PageBottomAds />-->
    </template>
  </ParentLayout>
</template>

<script>
import Vue from 'vue'
import AutoAdsense from 'vue-google-adsense/dist/InFeedAdsense.min.js'

export default {
  name: 'Layout',
  components: {
    ParentLayout: () => import('@parent-theme/layouts/Layout.vue')
    //SidebarTopAds: () => import('@theme/components/SidebarTopAds')
  },
  beforeMount() {
    Vue.use(require('vue-script2'))
    Vue.use(AutoAdsense, { adClient: 'ca-pub-6032774483827005' })
  }
}
</script>
