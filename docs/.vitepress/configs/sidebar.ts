import type { DefaultTheme } from "vitepress";

export const sidebar: DefaultTheme.Config["sidebar"] = [
  {
    text: "先前导言",
    link: "/guide/home",
  },

  // Git
  {
    text: "Git",
    // link: "/pages/git/index",
    items: [
      { text: "git初始化", link: "/pages/git/git-init" },
      { text: "git stash常用命令", link: "/pages/git/git stash的用法总结" },
      {
        text: "git pull与git fetch的区别",
        link: "/pages/git/git pull 与git fetch区别",
      },
      { text: "git rebase", link: "/pages/git/git rebase" },
      {
        text: "git 删除分支同步到git仓库",
        link: "/pages/git/git 删除分支同步到git仓库",
      },
    ],
    collapsed: true,
  },

  // JavaScript
  {
    text: "JavaScript",
    // link: "/pages/javascript/index",
    items: [
      { text: "变量的提升", link: "/pages/javascript/变量的提升" },
      { text: "回流与重绘", link: "/pages/javascript/回流与重绘" },
      {
        text: "call bind apply的区别",
        link: "/pages/javascript/call apply bind 区别",
      },
      { text: "offsetSize", link: "/pages/javascript/js-size" },
      { text: "模块化", link: "/pages/javascript/js模块化" },
      { text: "moment使用", link: "/pages/javascript/moment使用" },
      {
        text: "获取当前页面地址路径",
        link: "/pages/javascript/获取当前页面地址路径",
      },
      { text: "eslint常见配置", link: "/pages/javascript/eslint常见配置" },
      { text: "JS解析URL参数", link: "/pages/javascript/JS解析URL参数" },
      { text: "JS跨域下载文件", link: "/pages/javascript/JS跨域下载文件" },
    ],
    collapsed: true,
  },

  // CSS
  {
    text: "CSS",
    // link: "/pages/css/index",
    items: [
      { text: "CSS权重规则", link: "/pages/css/css权重规则" },
      { text: "css一些加载样式", link: "/pages/css/css一些加载样式" },
      { text: "css跳动方块", link: "/pages/css/css跳动方块" },
      { text: "box-shadow一些示例", link: "/pages/css/css-box-shdow" },

      
    ],
    collapsed: true,
  },
  // Node
  {
    text: "Node",
    // link: "/pages/node/index",
    items: [{ text: "Node简介", link: "/pages/node/node简介" }],
    collapsed: true,
  },

  // TypeSccript
  {
    text: "Typescript",
    // link: "/pages/typescript/index",
    items: [{ text: "TypeScript推荐文档", link: "/pages/typescript/推荐文档" }],
    collapsed: true,
  },

  // 小程序
  {
    text: "微信小程序相关",
    // link: "/pages/weapp/index",
    items: [
      {
        text: "微信小程序人脸识别问题",
        link: "/pages/weapp/微信小程序人脸识别问题",
      },
    ],
    collapsed: true,
  },

  // 算法
  {
    text: "常见的前端算法问题",
    // link: "/pages/algorithm/index",
    items: [
      {
        text: "寻找首位不重复字符索引",
        link: "/pages/algorithm/find-last-index",
      },
      {
        text: "计数器",
        link: "/pages/algorithm/计数器",
      },
    ],
    collapsed: true,
  },

  // 打包构建
  {
    text: "打包构建",
    // link: "/pages/build/index",
    items: [
      {
        text: "什么是SourceMap",
        link: "/pages/build/什么是SourceMap",
      },
    ],
    collapsed: true,
  },
  // {
  //   text: "面试相关",
  // //   link: "/pages/interview/index",
  //   items: [
  //     { text: "231012", link: "/pages/interview/231012" },
  //     { text: "练习", link: "/pages/interview/html/231012.html" },
  //   ],
  // },
];
