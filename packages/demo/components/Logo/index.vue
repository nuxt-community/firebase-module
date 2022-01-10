<template>
  <div class="LogoWrapper">
    <FirebaseLogo class="FirebaseLogo" />
    <NuxtLogo class="NuxtLogo" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import FirebaseLogo from './FirebaseLogo.vue'
import NuxtLogo from './NuxtLogo.vue'

export default Vue.extend({
  components: {
    FirebaseLogo,
    NuxtLogo
  }
})
</script>

<style>
.LogoWrapper {
  display: inline-block;
  position: relative;
  overflow: hidden;
  width: 245px;
}

.FirebaseLogo {
  position: absolute;
  top: -50px;
  right: -80px;
  animation: goleft 0.5s linear forwards 2s;
}

@keyframes goleft {
  100% {
    right: 10px;
    top: 20px;
  }
}
</style>
