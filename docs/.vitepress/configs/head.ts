import type { HeadConfig } from 'vitepress'

const base = process.env.APP_BASE_PATH || '/web-docs/'

export const head: HeadConfig[] = [
  ['link', { rel: 'icon', href: `${base}image/blog-logo.png`, type:'image/svg+xml'}],
  ['link', { rel: 'icon', href: `${base}image/blog-logo.png`, type: 'image/png'}],
  ['meta', { name: 'referrer', content: 'no-referrer-when-downgrade' }],
  ['meta', { name: 'theme-color', content: '#3eaf7c' }],
  ['meta', { name: 'mobile-web-app-capable', content: 'yes' }],
  ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }],
  ['meta', { name: 'msapplication-TileColor', content: '#000000' }],
  ['meta', { name: 'msapplication-TileImage', content: '/web-docs/favicon.ico' }],
  ['link', { rel: 'stylesheet', href: '/web-docs/theme/styles/index.scss' }],
  ['link', { rel: 'apple-touch-icon', sizes: '60x60', href: '/image/blog-logo.png' }],
]