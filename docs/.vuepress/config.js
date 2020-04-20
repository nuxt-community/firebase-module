module.exports = {
  title: 'Nuxt Firebase',
  description: 'Easily integrate Firebase into your Nuxt project.',
  plugins: [
    [
      '@vuepress/google-analytics',
      {
        ga: 'UA-51670945-16'
      }
    ]
  ],
  theme: 'carbon',
  themeConfig: {
    carbonAds: {
      serve: "CE7D62JL",
      placement: "packagesdeveoio"
    },
    heroImage: '/logo-no-text.png',
    logo: '/logo-no-text.png',
    repo: 'nuxt-community/firebase-module',

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
            '/guide/upgrade/',
            '/guide/demo/'
          ]
        }
      ],
      '/tutorials/': [
        {
          title: 'Tutorials', // required
          collapsable: false, // optional, defaults to true
          sidebarDepth: 0, // optional, defaults to 1
          children: ['/tutorials/ssr/', '/tutorials/vuexfire/', '/tutorials/typescript/']
        }
      ],
      '/more/': [
        {
          title: 'More', // required
          collapsable: false, // optional, defaults to true
          sidebarDepth: 1, // optional, defaults to 1
          children: ['/more/links/']
        }
      ]
    },
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Guide', link: '/guide/introduction/' },
      { text: 'Tutorials', link: '/tutorials/ssr/' },
      { text: 'More', link: '/more/links/' },
      { text: 'Sponsor', link: 'https://github.com/sponsors/lupas' }
    ]
  }
}
