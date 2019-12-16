module.exports = {
  title: 'Nuxt-Fire',
  description: 'Easily integrate Firebase into your Nuxt 2 project.',
  head: [
    [
      'script',
      { src: '//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js' }
    ],
    [
      'script',
      {},
      '(adsbygoogle = window.adsbygoogle || []).push({  google_ad_client: ca-pub-6032774483827005,  enable_page_level_ads: true });'
    ]
  ],
  plugins: [
    [
      '@vuepress/google-analytics',
      {
        ga: 'UA-51670945-16'
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
