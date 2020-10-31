<template>
  <h1>Works!</h1>
</template>

<script>
export default {
  async mounted () {
    const app = await this.$fire.appReady()
    console.info('app ready', app) // eslint-disable-line no-console
  }
}
</script>
