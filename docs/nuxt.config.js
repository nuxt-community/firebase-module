import theme from 'content-theme-docs-with-slots'

export default theme({
  loading: { color: '#FFA000' },
  buildModules: [
    // https://github.com/bdrtsky/nuxt-ackee
    'nuxt-ackee'
  ],
  ackee: {
    server: 'https://ackee.nuxtjs.com',
    domainId: '6abbd929-404a-41f4-b647-fae6f4f8131b',
    detailed: true
  }
})
