<template>
  <div>
    <clientOnly>
      <AutoAds />
    </clientOnly>
    <ParentLayout>
      <template #sidebar-top>
        <!--<SidebarTopAds /> -->
      </template>
      <template #page-bottom>
        <!--<PageBottomAds />-->
      </template>
    </ParentLayout>
  </div>
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
