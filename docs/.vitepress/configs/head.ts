import type { HeadConfig } from 'vitepress'

const isDevelopment = process.env.NODE_ENV === 'development'

export const head: HeadConfig[] = [
  ['meta', { name: 'referrer', content: 'no-referrer-when-downgrade' }],
  ['meta', { name: 'theme-color', content: '#3eaf7c' }],
  ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
  ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }],
  ['meta', { name: 'msapplication-TileColor', content: '#000000' }],
  ['meta', { name: 'msapplication-TileImage', content: '/favicon.ico' }],
  ['meta', { name: 'baidu-site-verification', content: 'codeva-Whjnr38WFE' }],

  ['link', { rel: 'icon', href: '/image/blog-logo.png', color: '#3eaf7c' }], // 需要被注入到当前页面的 HTML <head> 中的标签
  ['link', { rel: 'stylesheet', href: '/styles/index.scss' }],
  ['link', { rel: 'apple-touch-icon', sizes: '120x120', href: '/image/blog-logo.png' }],
]