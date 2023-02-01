module.exports = {
  // 网站的一些基本配置
  host: 'localhost', // ip
  port: '1119', //端口号
  // base:配置部署站点的基础路径
  title: '个人的积累记录', // 网站的标题
  description: `If you don't keep moving, you'll quickly fall behind.`,  // 网站的描述，它将会以 <meta> 标签渲染到当前页面的 HTML 中。
  head: [
    ['link', { rel: 'icon', href: '/logo.jpg' }] // 需要被注入到当前页面的 HTML <head> 中的标签
  ],
  // base: '/web_accumulate/',  // 部署到GitHub相关的配置
  markdown: {
    lineNumbers: true  // 代码块显示符号
  },
  themeConfig: {
    sidebarDepth: 2,  // e'b 将同时提取markdown中的h2和h3标题， 显示在侧边栏上
    lastUpdated: '最后更新时间', // 文档更新时间：每个文件git最后提交的时间
    /** 导航栏配置 */
    // 如果不想用导航栏, 可以设置themeConfig的 navbar 属性 设置为false后就不会出现导航栏了
    // navbar: false,
    nav: [  
      {
        text: '前端积累', 
        link: '/accumulate/'  //内部链接 以docs为根目录
      },
      {
        text: '前端算法', 
        link: '/algorithm/'
      },
      {
        text: '博客', 
        link: 'https://www.baidu.com/'
      },
      {
        text: 'GitHub', 
        items: [
          {
            text: 'GitHub地址', 
            link: 'https://github.com/guo-zi-xin/'
          },
          // {
          //   text: '算法仓库', 
          //   link: 'https://github.com/guo-zi-xin/docs/'
          // }
        ]
      }
    ],
    /** 侧边栏配置 */
    sidebar: {
      '/guide/': [
        '/guide/',
        {
          title: '先前导言',
          children: [
            '/gudie/README.md',
          ]
        }
      ],
      // 侧边栏使用的是docs文件夹下accumulate文件夹文档中的md文件 书写的位置
      '/accumulate/': [
        '/accumulate/',
        {
          title: '前端积累',
          children: [
            '/accumulate/JS/README.md',
          ]
        }
      ],
      '/algorithm/': [
        '/algorithm/',
        {
          title: '前端算法',
          children: [
            '/algorithm/README.md',
          ]
        }
      ]
    }
  },
  /** 一些插件 */
  plugins: [
    // 自定义时间插件
    [
      '@vuepress/last-updated',
      {
        transformer: (timestamp, lang) => {
          // 需要安装moment
          const moment = require('moment')
          moment.locale(lang)
          return moment(timestamp).format('YYYY-MM-DD HH:mm:ss')
        }
      }
    ]
  ]
}