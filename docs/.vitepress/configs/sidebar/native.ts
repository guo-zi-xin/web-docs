export const NativeBar = [
  // Javascript基础
  {
    text: 'Javascript基础',
    items: [
      { text: '数据类型', link: '/native/base/basic.md'},
      { text: '变量的提升', link: '/native/base/variables' },
      { text: '关于this指向', link: '/native/base/this' },
      { text: '异步编程', link: '/native/base/async' },
      { text: '回流与重绘', link: '/native/base/reflow-repaint' },
      { text: 'call bind apply的区别', link: '/native/base/call-apply-bind' },
      { text: '原型与原型链', link: '/native/base/prototype-chain' },
      { text: '本地存储', link: '/native/base/local-storage' },
      { text: 'JS精度', link: '/native/base/js-precision'}
    ],
    collapsed: false,
  },
  // JavaScript
  {
    text: 'JavaScript',
    items: [
      { text: 'JS中的元素尺寸与布局信息', link: '/native/javascript/element-size-layout' },
      { text: 'JS模块化', link: '/native/javascript/module' },
      { text: '获取当前页面URL信息', link: '/native/javascript/page-url' },
      { text: 'eslint常见配置', link: '/native/javascript/eslint-config' },
      { text: 'JS解析URL参数', link: '/native/javascript/parse-url' },
      { text: 'JS下载文件', link: '/native/javascript/download-file' },
      { text: 'cookie参数', link: '/native/javascript/cookie' },
      {
        text: '数组相关',
        items: [
          { text: '常用的数组的方法', link: '/native/javascript/array-methods' },
          { text: 'Array.map与Array.forEach的区别', link: '/native/javascript/map-vs-foreach' },
          { text: 'Array.reduce方法的使用场景', link: '/native/javascript/reduce-usage' },
        ],
        collapsed: false,
      },
      {
        text: 'setTimeout与setInterval', link: '/native/javascript/settimeout-vs-setinterval'
      },
      { text: '浏览器缓存', link: '/native/javascript/browser-cache' },
      { text: 'TCP三次握手与四次挥手', link: '/native/javascript/tcp-handshake-wave' },
      { text: 'TCP四层五层与OSI七层模型区别', link: '/native/javascript/tcp-osi-model' },
      { text: '防抖与节流', link: '/native/javascript/debounce-throttle' },
      { text: 'XSS攻击与CSRF攻击', link: '/native/javascript/xss-csrf' },
      { text: '浅拷贝与深拷贝', link: '/native/javascript/shallow-deep-copy' },
      { text: 'ES6新特性(一)', link: '/native/javascript/es6-features-1' },
      { text: 'ES6新特性(二)', link: '/native/javascript/es6-features-2' },
      { text: 'ES6扩展', link: '/native/javascript/es6-extend' },
      { text: '类的继承', link: '/native/javascript/class-inherit' },
      {
        text: '常用工具',
        items: [
          { text: 'moment使用', link: '/native/javascript/moment' },
        ],
        collapsed: false
      },
    ],
    collapsed: false,
  },

  // CSS
  {
    text: 'CSS',
    items: [
      { text: 'CSS权重规则', link: '/native/css/css-specificity' },
      { text: 'css一些加载样式', link: '/native/css/css-loading-styles' },
      { text: 'css跳动方块', link: '/native/css/css-bounce-box' },
      { text: 'box-shadow一些示例', link: '/native/css/css-box-shadow' },
      // { text: '3D数字动画', link: '/native/css/animate-3d' },
      { text: '炫目动画', link: '/native/css/css-fancy-animate' },
      { text: 'css背景动画', link: '/native/css/css-bg-animate' },
    ],
    collapsed: false,
  },

  // Node
  {
    text: 'Node',
    items: [{ text: 'Node简介', link: '/native/node/intro' }],
    collapsed: false,
  },

  // TypeSccript
  {
    text: 'Typescript',
    items: [
      { text: 'TypeScript推荐文档', link: '/native/typescript/docs' },
      { text: 'TypeScript泛型', link: '/native/typescript/generic' },
      { text: 'TypeScript枚举', link: '/native/typescript/enum' },
      { text: 'TypeScript高级类型', link: '/native/typescript/advanced-type' },
      { text: 'Typescript常用类型工具', link: '/native/typescript/type-utils' },
    ],
    collapsed: false,
  },

  // 小程序
  {
    text: '微信小程序相关',
    items: [
      {
        text: '微信小程序人脸识别问题',
        link: '/native/weapp/face-recognition',
      },
    ],
    collapsed: false,
  },
];