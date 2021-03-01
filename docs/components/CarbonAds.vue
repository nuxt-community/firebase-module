<script>
export default {
  name: 'CarbonAds',
  props: {
    caServe: {
      type: String,
      required: true
    },
    caPlacement: {
      type: String,
      required: true
    }
  },
  watch: {
    $route (to, from) {
      if (
        to.path !== from.path &&
        // Only reload if the ad has been loaded
        // otherwise it's possible that the script is appended but
        // the ads are not loaded yet. This would result in duplicated ads.
        this.$el.querySelector('#carbonads')
      ) {
        this.$el.innerHTML = ''
        this.load()
      }
    }
  },
  mounted () {
    if (process.env.NODE_ENV === 'production') {
      this.load()
    }
  },
  methods: {
    load () {
      const script = document.createElement('script')
      script.id = '_carbonads_js'
      script.src = `//cdn.carbonads.com/carbon.js?serve=${this.caServe}&placement=${this.caPlacement}`
      this.$el.appendChild(script)
    }
  },
  render (h) {
    return h('div', { class: 'carbon-ads' })
  }
}
</script>

<style>
.carbon-ads {
  margin-top: -14px;
  min-height: 150px;
  font-size: 0.75rem;
  margin-right: -1.6em;
}

.carbon-ads .carbon-img {
  float: left;
  margin-right: 1rem;
  border: 1px solid #eaecef;
}

.carbon-ads .carbon-text {
  font-weight: 400;
  margin-top: 2px;
}

.carbon-ads .carbon-poweredby {
  color: #999;
  display: block;
  margin-top: 0.5em;
}
</style>
