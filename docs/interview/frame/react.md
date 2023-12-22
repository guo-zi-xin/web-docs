# React相关

### fetch VS ajax VS axios

### React 事件处理---修改 this 指向

### 请简述你对 react 的理解

### react 组件之间的数据传递

### Vue 与 react 区别

相同点：
都支持服务器渲染
都有虚拟 dom，组件化开发，通过 props 参数进行父子组件数据的传递，都实现 webcomponent 规范
都是数据驱动视图
都有状态管理，react 有 redux，vue 有 vuex
都有支持 native’的方案 react 有 react native vue 有 weex
不同点：
react 严格上只针对 mvc 的 view 层，vue 是 mvvm 模式
虚拟 dom 不一样，vue 会跟踪每一个组件的依赖关系，不需要重新渲染整个 dom 组件树，而 react 不同，当应用的状态被改变时，全部组件都会重新渲染，所以 react 中用 shouldcomponentupdate 这个生命周期的钩子函数来控制
组件写法不一样 ，react 是 jsx 和 inline style ，就是把 html 和 css 全写进 js 中，vue 则是 html，css ，js 在同一个文件
数据绑定不一样，vue 实现了数据双向绑定，react 数据流动是单向的在 react 中，state 对象需要用 setstate 方法更新状态，在 vue 中，state对象不是必须的，数据由 data 属性在 vue 对象中管理

### 请简述虚拟 dom 与 diff 算法

### 对 React 组件的理解

### 调用 setState 之后发生了什么

### react 生命周期函数

### 为什么虚拟 dom 会提高性能

### (组件的)状态(state)和属性(props)之间有何不同

### shouldComponentUpdate 是做什么的

### react diff 原理

### 何为受控组件

### React 中构建组件的方式

### 简述 flux 思想

### React 脚手架

### 应该在 React 组件的何处发起 Ajax 请求

### 何为高阶组件(higher order component)？

## 其他

### Typescript 是什么

### Typescript 与 javascript 的优势

### Webpack 与 gulp 区别

### 请简述 webpack 中的 loaders 与 plugin 的区别

### 怎么提升页面性能？性能优化有哪些

### Node 使用来做什么的

### 说一下 webpack 的打包原理

### Commonjs ES6 模块区别

### Git 如何使用/常用指令有哪些

### 你的项目比较小为什么还是用 vue 全家桶

### 什么是 cors

### 说一下对 websocked 的理解

### 后台传递过来的数据是那些

### 谈谈 Ajax，fetch，axios 的区别
