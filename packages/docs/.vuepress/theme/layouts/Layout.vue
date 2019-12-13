<template>
  <ParentLayout>
    <template #sidebar-top>
      <clientOnly>
        <AutoAds />
      </clientOnly>
      <!--<SidebarTopAds /> -->
    </template>
    <template #page-bottom>
      <!--<PageBottomAds />-->
    </template>
  </ParentLayout>
</template>

<script>
export default {
  name: 'Layout',
  components: {
    ParentLayout: () => import('@parent-theme/layouts/Layout.vue'),
    AutoAds: () => import('@theme/components/AutoAds')
  }
}
</script>
