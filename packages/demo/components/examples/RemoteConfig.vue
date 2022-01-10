<template>
  <div>
    <ServiceTitle title="Firebase RemoteConfig" />
    <div class="links">
      <Btn @click="readRemoteConfig()">Reads Remote Config</Btn>
      <client-only>
        <Codeblock>
          <pre>
async readRemoteConfig() {
  try {
    await this.$fire.remoteConfig.fetchAndActivate();
  } catch (e) {
  alert(e);
  return;
  }
  const exampleMessage = await this.$fire.remoteConfig.getValue("exampleMessage");
  alert(
  `Success. Read RemoteConfig parameter 'exampleMessage' is: ${exampleMessage._value}`
  );
}
</pre
          >
        </Codeblock>
      </client-only>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  methods: {
    async readRemoteConfig() {
      try {
        await this.$fire.remoteConfig.fetchAndActivate()
      } catch (e) {
        alert(e)
        return
      }
      console.info(this.$fire.remoteConfig)
      const exampleMessage: any = await this.$fire.remoteConfig.getValue(
        'exampleMessage'
      )
      alert(
        `Success. Read RemoteConfig parameter 'exampleMessage' is: ${exampleMessage._value}`
      )
    },
  },
})
</script>
