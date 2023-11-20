import type { DefaultTheme } from 'vitepress'

export const nav: DefaultTheme.Config['nav'] = [
  { text: '首页', link: '/' },
  { text: '先前导言', link: '/guide/home', },
  {
    text: '前端',
    items: [
      {
        text: '原生',
        link: '/native/javascript/index',
      },
      {
        text: '工具',
        link: '/tools/git/index',
      },
      {
        text: '框架',
        link: '/frame/vue/index',
      },
    ]
  },
  {
    text: '算法相关',
    items: [
      {
        text: '算法题',
        link: '/algorithm/index',
      },
      {
        text: '数据结构',
        link: '/structure/index',
      },
    ]
  },
]
