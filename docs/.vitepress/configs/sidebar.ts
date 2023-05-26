import type { DefaultTheme } from 'vitepress'

export const sidebar: DefaultTheme.Config['sidebar'] = [
  {
    text: '先前导言', 
    link: '/guide/home',
  },
  {
    text: 'git相关',
    link: '/page/git/index',
    items: [
      { text: 'git初始化', link: '/pages/git/git-init' },
      { text: 'git stash常用命令', link: '/pages/git/git stash的用法总结' },
      { text: 'git pull与git fetch的区别', link: '/pages/git/git pull 与git fetch区别' },
      { text: 'git rebase', link: '/pages/git/git rebase' },

    ],
    collapsed: false
  },
  {
    text: 'JS相关',
    link: '/page/javascript/index',
    items: [
      { text: '变量的提升', link: '/pages/javascript/变量的提升' },
      { text: '回流与重绘', link: '/pages/javascript/回流与重绘' },
      { text: 'call bind apply的区别', link: '/pages/javascript/call apply bind 区别' },
      { text: 'offsetSize', link: '/pages/javascript/js-size' },
      { text: '模块化', link: '/pages/javascript/js模块化' },
      { text: 'moment使用', link: '/pages/javascript/moment使用' },
    ],
    collapsed: false
  },
  {
    text: 'CSS',
    link: '/page/css/index',
    items: [
      { text: 'git初始化', link: '/pages/git/git-init' },
      { text: 'git stash常用命令', link: '/pages/git/git stash的用法总结' },
      { text: 'git pull与git fetch的区别', link: '/pages/git/git pull 与git fetch区别' },
      { text: 'git rebase', link: '/pages/git/git rebase' },

    ],
    collapsed: false
  },
  {
    text: 'Node',
    link: '/page/node/index',
    items: [
      { text: 'Node简介', link: '/pages/node/node简介' },
    ]
  },
  {
    text: '微信小程序相关',
    link: '/page/weapp/index',
    items: [
      { text: '微信小程序人脸识别问题', link: '/pages/weapp/微信小程序人脸识别问题' }
    ],
    collapsed: false
  },
  {
    text: '前端算法相关',
    link: '/page/algorithm/index',
    items: [
      { text: '寻找首位不重复字符索引', link: '/pages/algorithm/find-last-index' }
    ],
  }
]