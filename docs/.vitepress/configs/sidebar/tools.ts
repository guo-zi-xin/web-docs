// 工具集合
export const ToolsBar = [
  // GIT
  {
    text: 'Git',
    items: [
      { text: 'git初始化', link: '/tools/git/git-init' },
      {
        text: 'git 常用操作',
        link: '/tools/git/git-usage',
      },
      { text: 'git stash常用命令', link: '/tools/git/git-stash' },
      {
        text: 'git-pull与git-fetch的区别',
        link: '/tools/git/git-pull-vs-fetch',
      },
      { text: 'git rebase', link: '/tools/git/git-rebase' },
      {
        text: 'git 删除分支同步到git仓库',
        link: '/tools/git/git-delete-branch-sync',
      },
      {
        text: 'git rebase合并commit',
        link: '/tools/git/git-rebase-merge-commit',
      },
      {
        text: 'git cherry-pick使用',
        link: '/tools/git/git-cherry-pick',
      },
    ],
    collapsed: false,
  },

  // Build
  {
    text: '打包构建 📦',
    items: [
      {
        text: '什么是SourceMap',
        link: '/tools/build/sourcemap',
      },
      {
        text: '什么是AST',
        link: '/tools/build/AST',
      },
    ],
    collapsed: false,
  },
  // CSS
  {
    text: 'CSS工具🔧',
    items: [
      {
        text: 'UnoCss',
        link: '/tools/css/unocss',
      },
    ],
    collapsed: false,
  },
  {
    text: '图片工具🔧',
    items: [
      // {
      //   text: '图片压缩工具',
      //   link: '/tools/image/image-compress',
      // },
    ],
    collapsed: false,
  },
  // 环信即时通讯工具
  {
    text: "环信即时通讯工具IM 🔗",
    items: [
      {
        text: "环信即时通讯IM工具",
        link: "/tools/easemob/index",
      },
      {
        text: "环信即时通讯工具项目接入",
        link: "/tools/easemob/access",
      },
    ],
    collapsed: false,
  },
  

]
