<template>
  <div>
    <ServiceTitle title="Firebase Performance" />
    <div class="links">
      <Btn @click="checkPerformance()">{{
        traceStarted ? 'In Progress' : 'Start Trace'
      }}</Btn>
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
    checkPerformance() {
      const trace = this.$fire.performance.trace('testTrace')
      trace.start()
      this.traceStarted = true
      console.info('Firebase Performance Trace Start')
      const ctx = this
      setTimeout(function () {
        for (let step = 0; step < 100; step++) {
          // Runs x times
        }
        trace.stop()
        console.info('Firebase Performance Trace Stop')
        ctx.traceStarted = false
      }, 2000)
    },
  },
})
</script>
