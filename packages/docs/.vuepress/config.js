module.exports = {
  title: 'Nuxt-Fire',
  description: 'Easily integrate Firebase into your Nuxt 2 project.',
  plugins: [
    [
      '@vuepress/google-analytics',
      {
        ga: 'UA-51670945-16'
      }
    ],
    [
      'vuepress-plugin-google-adsense',
      {
        google_ad_client: 'ca-pub-6032774483827005',
        enable_page_level_ads: true
      }
    ]
  ],
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
