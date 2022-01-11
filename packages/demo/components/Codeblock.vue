<template>
  <div>
    <div class="prism">
      <pre
        class="line-numbers"
        :class="`language-${lang}`"
      ><code><slot></slot></code></pre>
    </div>
  </div>
</template>

<script>
/* eslint-disable no-template-curly-in-string */
/* eslint-disable no-undef */

import Prism from 'prismjs'
import 'prismjs/themes/prism-tomorrow.css'

export default {
  props: {
    lang: {
      type: String,
      default: 'js',
    },
  },
  mounted() {
    Prism.highlightAll()
  },
}
</script>

<style scoped></style>
