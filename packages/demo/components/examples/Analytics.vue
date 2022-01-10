<template>
  <div>
    <ServiceTitle title="Firebase Analytics" />
    <div class="links">
      <Btn @click="logEvent()">Log Event</Btn>
      <client-only>
        <Codeblock>
          <pre>
async logEvent() {
  try {
    await this.$fire.analytics.logEvent('analytics_button_clicked')
  } catch (e) {
    alert(e)
  }
}
    </pre
          >
        </Codeblock>
      </client-only>
      <p class="mt-1">This will log an event in Firebase Analytics.</p>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  methods: {
    async logEvent() {
      try {
        await this.$fire.analytics.logEvent('analytics_button_clicked')
        alert("Event 'analytics_button_clicked' logged to Google Analytics")
      } catch (e) {
        alert(e)
      }
    },
  },
})
</script>
