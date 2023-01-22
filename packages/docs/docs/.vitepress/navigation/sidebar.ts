import {DefaultTheme} from 'vitepress'

const sidebar: DefaultTheme.Sidebar = {
  '/': [
    {
      text: 'Guide',
      items: [
        {
          text: 'Introduction',
          link: '/guide/',
        },
        {
          text: 'Getting Started',
          link: '/guide/getting-started',
        },
        {
          text: 'Options',
          link: '/guide/options',
        },
        {
          text: 'Usage',
          link: '/guide/usage',
        },
      ],
    },
    {
      text: 'Service Options',
      items: [
        {
          text: '(All Services)',
          link: '/service-options/all-services',
        },
        {
          text: 'appCheck',
          link: '/service-options/app-check',
        },
        {
          text: 'auth',
          link: '/service-options/auth',
        },
        {
          text: 'firestore',
          link: '/service-options/firestore',
        },
        {
          text: 'database',
          link: '/service-options/database',
        },
        {
          text: 'storage',
          link: '/service-options/storage',
        },
        {
          text: 'functions',
          link: '/service-options/functions',
        },
        {
          text: 'performance',
          link: '/service-options/performance',
        },
        {
          text: 'analytics',
          link: '/service-options/analytics',
        },
        {
          text: 'messaging',
          link: '/service-options/messaging',
        },
        {
          text: 'remote-config',
          link: '/service-options/remote-config',
        },
      ],
    },
    {
      text: 'Tutorials',
      items: [
        {
          text: 'Firebase Auth with SSR',
          link: '/tutorials/ssr',
        },
        {
          text: 'Usage with vuexfire',
          link: '/tutorials/vuexfire',
        },
        {
          text: 'Usage with Typescript',
          link: '/tutorials/typescript',
        },
      ],
    },
    {
      text: 'Community',
      items: [
        {
          text: 'Demo',
          link: '/community/demo',
        },
        {
          text: 'Links',
          link: '/community/links',
        },
        {
          text: 'FAQ',
          link: '/community/faq',
        },
      ],
    },
  ],
}

export default sidebar
