// 工具集合
export const ToolsBar = [
  // GIT
  {
    text: 'Git',
    items: [
      { text: 'git初始化', link: '/tools/git/git-init' },
      {
        text: 'git 常用操作',
        link: '/tools/git/git 常用操作',
      },
      { text: 'git stash常用命令', link: '/tools/git/git stash的用法总结' },
      {
        text: 'git pull与git fetch的区别',
        link: '/tools/git/git pull 与git fetch区别',
      },
      { text: 'git rebase', link: '/tools/git/git rebase' },
      {
        text: 'git 删除分支同步到git仓库',
        link: '/tools/git/git 删除分支同步到git仓库',
      },
      {
        text: 'git rebase合并commit',
        link: '/tools/git/git rebase合并commit',
      },
    ],
    collapsed: false,
  },

  // Build
  {
    text: '打包构建',
    items: [
      {
        text: '什么是SourceMap',
        link: '/tools/build/什么是SourceMap',
      },
      {
        text: '什么是AST',
        link: '/tools/build/什么是AST',
      },
      
    ],
    collapsed: false,
  },
]
