<template>
  <div>
    <ServiceTitle title="Vuex Store" />
    <p class="mb-2">
      Tests if fireXXX objects can be accessed in a vuex store action.
    </p>
    <div class="links">
      <Btn @click="checkVuexStore()">Test Vuex Store</Btn>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  data() {
    return {
      traceStarted: false,
    }
  },
  methods: {
    checkVuexStore() {
      this.$store.dispatch('checkVuexStore')
    },
  },
})
</script>
