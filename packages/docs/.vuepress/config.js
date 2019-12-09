module.exports = {
  title: 'Nuxt-Fire',
  description: 'Nuxt Fire is cooool',
  themeConfig: {
    heroImage: '/logo-no-text.png',
    logo: '/logo-no-text.png',
    repo: 'lupas/nuxt-fire',
    sidebar: [
      '/introduction/',
      '/getting-started/',
      '/options/',
      '/usage/',
      '/helpers/',
      '/advanced/',
      '/demo/'
    ],
    sidebarDepth: 2,
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Guide', link: '/introduction/' },
      { text: 'Sponsor', link: 'https://github.com/sponsors/lupas' }
    ]
  }
}
