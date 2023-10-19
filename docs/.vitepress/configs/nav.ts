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
    ]  
  },
  {
    text: '算法相关', 
    link: '/algorithm/', 
  },

]
