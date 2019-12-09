module.exports = {
  title: 'Nuxt-Fire',
  description: 'Nuxt Fire is cooool',
  themeConfig: {
    heroImage: '/logo-no-text.png',
    logo: '/logo-no-text.png',
    repo: 'lupas/nuxt-fire',

    sidebar: {
      '/guide/': [
        {
          title: 'Guide', // required
          collapsable: false, // optional, defaults to true
          sidebarDepth: 3, // optional, defaults to 1
          children: [
            '/guide/introduction/',
            '/guide/getting-started/',
            '/guide/options/',
            '/guide/usage/',
            '/guide/helpers/',
            '/guide/demo/'
          ]
        }
      ],
      '/tutorials/': [
        {
          title: 'Tutorials', // required
          collapsable: false, // optional, defaults to true
          sidebarDepth: 2, // optional, defaults to 1
          children: ['/tutorials/ssr/', '/tutorials/vuexfire/']
        }
      ]
    },
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Guide', link: '/guide/introduction/' },
      { text: 'Tutorials', link: '/tutorials/ssr/' },
      { text: 'Sponsor', link: 'https://github.com/sponsors/lupas' }
    ]
  }
}
