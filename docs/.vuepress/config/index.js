const accumulateChildren = require('./accumulate/index')
const algorithmChildren = require('./algorithm/index')
const codeBlackChildren = require('./codeBlack/index')

module.exports = [
  {
    title: '欢迎学习',
    path: '/guide/',
  },

  {
    title: '前端积累',
    path: '/accumulate/',
    collapsable: true,
    children: accumulateChildren
  },

  {
    title: '前端算法',
    path: '/algorithm/',
    collapsable: true,
    children: algorithmChildren
  },

  {
    title: '代码块',
    path: '/codeBlack/',
    collapsable: true,
    children: codeBlackChildren
  }
]