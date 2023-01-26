import {defineConfig, DefaultTheme} from 'vitepress'
import {version} from '../../package.json'
import {
  twitter,
  github,
  headTitle,
  headDescription,
  ogImage,
  ogUrl,
} from './meta'
import sidebar from './navigation/sidebar'

export default defineConfig({
  lang: 'en-US',
  title: headTitle,
  description: headDescription,
  appearance: 'dark',
  head: [
    ['meta', {name: 'theme-color', content: '#ffe183'}],
    ['link', {rel: 'icon', href: '/icon.png', type: 'image/png'}],
    [
      'link',
      {
        rel: 'alternate icon',
        href: '/favicon.ico',
        type: 'image/png',
        sizes: '16x16',
      },
    ],
    [
      'meta',
      {
        name: 'author',
        content: `Pascal Luther`,
      },
    ],
    [
      'meta',
      {
        name: 'keywords',
        content: 'nuxt, nuxtjs, firebase',
      },
    ],
    ['meta', {property: 'og:title', content: headTitle}],
    ['meta', {property: 'og:description', content: headDescription}],
    ['meta', {property: 'og:url', content: ogUrl}],
    ['meta', {property: 'og:image', content: ogImage}],
    ['meta', {name: 'twitter:title', content: headTitle}],
    ['meta', {name: 'twitter:description', content: headDescription}],
    ['link', {rel: 'mask-icon', href: '/icon.png', color: '#ffffff'}],
    [
      'link',
      {
        rel: 'apple-touch-icon',
        href: '/apple-touch-icon.png',
        sizes: '180x180',
      },
    ],
  ],

  themeConfig: {
    logo: '/icon.png',

    outline: [2, 3],

    socialLinks: [
      {icon: 'twitter', link: twitter},
      {icon: 'github', link: github},
    ],

    footer: {
      copyright: 'Copyright © 2019-PRESENT Pascal Luther',
    },

    algolia: {
      appId: '9F70EYJ2LK',
      apiKey: 'cd73e0a7b95c19e2671582328e8c4c29',
      indexName: 'nuxtjs_firebase',
    },

    carbonAds: {
      code: 'CE7D62JL',
      placement: 'firebasenuxtjsorg',
    },

    nav: [
      {text: 'Guide', link: '/guide/'},
      {
        text: `v${version}`,
        items: [
          {
            text: 'Release Notes',
            link: 'https://github.com/nuxt-community/firebase-module/releases',
          },
        ],
      },
    ],

    sidebar: sidebar,
  },
})
