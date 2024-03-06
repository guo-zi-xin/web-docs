import type { HeadConfig } from 'vitepress'

const isDevelopment = process.env.NODE_ENV === 'development'

export const head: HeadConfig[] = [
  ['link', { rel: 'icon', href: '/svg/blog-logo.svg', type:'image/svg+xml'}],
  ['link', { rel: 'icon', href: '/image/blog-logo.png', type: 'image/png'}],
  ['meta', { name: 'referrer', content: 'no-referrer-when-downgrade' }],
  ['meta', { name: 'theme-color', content: '#3eaf7c' }],
  ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
  ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }],
  ['meta', { name: 'msapplication-TileColor', content: '#000000' }],
  ['meta', { name: 'msapplication-TileImage', content: '/favicon.ico' }],
  ['link', { rel: 'stylesheet', href: '/styles/index.scss' }],
  ['link', { rel: 'apple-touch-icon', sizes: '60x60', href: '/blog-logo.png' }],
]