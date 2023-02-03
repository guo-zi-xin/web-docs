const moment = require('moment')
const sidebarRouter = require('./config/index')

module.exports = {
  // 网站的一些基本配置
  host: 'localhost', // ip
  port: '1119', //端口号
  // base:配置部署站点的基础路径
  base: '/web-docs/',
  title: '首页', // 网站的标题
  description: '生活不可能像你想象得那么好，但也不会像你想象得那么糟。我觉得人的脆弱和坚强都超乎自己的想象。有时，我可能脆弱得一句话就泪流满面，有时，也发现自己咬着牙走了很长的路。',
  // description: `If you don't keep moving, you'll quickly fall behind.`,  // 网站的描述，它将会以 <meta> 标签渲染到当前页面的 HTML 中。
  head: [
    ['link', { rel: 'icon', href: '/logo.jpg' }] // 需要被注入到当前页面的 HTML <head> 中的标签
  ],
  // base: '/web_accumulate/',  // 部署到GitHub相关的配置
  markdown: {
    lineNumbers: true  // 代码块显示符号
  },
  /** 设置主题 */
  theme: 'reco',
  // theme: 'vdoing',
  themeConfig: {
    sidebarDepth: 2,  // e'b 将同时提取markdown中的h2和h3标题， 显示在侧边栏上
    lastUpdated: '最后更新时间', // 文档更新时间：每个文件git最后提交的时间
    /** 导航栏配置 */
    // 如果不想用导航栏, 可以设置themeConfig的 navbar 属性 设置为false后就不会出现导航栏了
    // navbar: false,
    nav: [  
      {
        text: '前端积累', 
        link: '/accumulate/JS/'  //内部链接 以docs为根目录
      },
      {
        text: '前端算法', 
        link: '/algorithm/'
      },
      // {
      //   text: '博客', 
      //   link: 'https://www.baidu.com/'
      // },
      {
        text: 'GitHub', 
        items: [
          {
            text: 'GitHub地址', 
            link: 'https://github.com/guo-zi-xin/'
          },

        ]
      }
    ],

    /** 侧边栏配置 */
    sidebar: sidebarRouter,

    /** 侧边栏的子标题 移到右侧 */
    subSidebar: 'auto',

  },

  /** 多语言 */
   locales: {
    '/': {
      lang: 'zh-CN',
    },
   },
  /** 一些插件 */
  plugins: [
    // 自定义时间插件
    [
      '@vuepress/last-updated',
      {
        transformer: (timestamp, lang) => {
          // 需要安装moment
          moment.locale(lang)
          return moment(timestamp).format('YYYY-MM-DD HH:mm:ss')
        }
      }
    ]
  ],
     // 处理路径问题
     markdown: {
      extendMarkdown: md => {
          md.set({breaks: true})
          md.use(require("markdown-it-disable-url-encode"), "./")
      }
  }
}