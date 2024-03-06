import{_ as a,o as e,c as t,a8 as r}from"./chunks/framework.Qf1t7Yq5.js";const p=JSON.parse('{"title":"React相关","description":"","frontmatter":{},"headers":[],"relativePath":"interview/frame/react.md","filePath":"interview/frame/react.md","lastUpdated":1703237926000}'),o={name:"interview/frame/react.md"},h=r('<h1 id="react相关" tabindex="-1">React相关 <a class="header-anchor" href="#react相关" aria-label="Permalink to &quot;React相关&quot;">​</a></h1><h3 id="fetch-vs-ajax-vs-axios" tabindex="-1">fetch VS ajax VS axios <a class="header-anchor" href="#fetch-vs-ajax-vs-axios" aria-label="Permalink to &quot;fetch VS ajax VS axios&quot;">​</a></h3><h3 id="react-事件处理-修改-this-指向" tabindex="-1">React 事件处理---修改 this 指向 <a class="header-anchor" href="#react-事件处理-修改-this-指向" aria-label="Permalink to &quot;React 事件处理---修改 this 指向&quot;">​</a></h3><h3 id="请简述你对-react-的理解" tabindex="-1">请简述你对 react 的理解 <a class="header-anchor" href="#请简述你对-react-的理解" aria-label="Permalink to &quot;请简述你对 react 的理解&quot;">​</a></h3><h3 id="react-组件之间的数据传递" tabindex="-1">react 组件之间的数据传递 <a class="header-anchor" href="#react-组件之间的数据传递" aria-label="Permalink to &quot;react 组件之间的数据传递&quot;">​</a></h3><h3 id="vue-与-react-区别" tabindex="-1">Vue 与 react 区别 <a class="header-anchor" href="#vue-与-react-区别" aria-label="Permalink to &quot;Vue 与 react 区别&quot;">​</a></h3><p>相同点： 都支持服务器渲染 都有虚拟 dom，组件化开发，通过 props 参数进行父子组件数据的传递，都实现 webcomponent 规范 都是数据驱动视图 都有状态管理，react 有 redux，vue 有 vuex 都有支持 native’的方案 react 有 react native vue 有 weex 不同点： react 严格上只针对 mvc 的 view 层，vue 是 mvvm 模式 虚拟 dom 不一样，vue 会跟踪每一个组件的依赖关系，不需要重新渲染整个 dom 组件树，而 react 不同，当应用的状态被改变时，全部组件都会重新渲染，所以 react 中用 shouldcomponentupdate 这个生命周期的钩子函数来控制 组件写法不一样 ，react 是 jsx 和 inline style ，就是把 html 和 css 全写进 js 中，vue 则是 html，css ，js 在同一个文件 数据绑定不一样，vue 实现了数据双向绑定，react 数据流动是单向的在 react 中，state 对象需要用 setstate 方法更新状态，在 vue 中，state对象不是必须的，数据由 data 属性在 vue 对象中管理</p><h3 id="请简述虚拟-dom-与-diff-算法" tabindex="-1">请简述虚拟 dom 与 diff 算法 <a class="header-anchor" href="#请简述虚拟-dom-与-diff-算法" aria-label="Permalink to &quot;请简述虚拟 dom 与 diff 算法&quot;">​</a></h3><h3 id="对-react-组件的理解" tabindex="-1">对 React 组件的理解 <a class="header-anchor" href="#对-react-组件的理解" aria-label="Permalink to &quot;对 React 组件的理解&quot;">​</a></h3><h3 id="调用-setstate-之后发生了什么" tabindex="-1">调用 setState 之后发生了什么 <a class="header-anchor" href="#调用-setstate-之后发生了什么" aria-label="Permalink to &quot;调用 setState 之后发生了什么&quot;">​</a></h3><h3 id="react-生命周期函数" tabindex="-1">react 生命周期函数 <a class="header-anchor" href="#react-生命周期函数" aria-label="Permalink to &quot;react 生命周期函数&quot;">​</a></h3><h3 id="为什么虚拟-dom-会提高性能" tabindex="-1">为什么虚拟 dom 会提高性能 <a class="header-anchor" href="#为什么虚拟-dom-会提高性能" aria-label="Permalink to &quot;为什么虚拟 dom 会提高性能&quot;">​</a></h3><h3 id="组件的-状态-state-和属性-props-之间有何不同" tabindex="-1">(组件的)状态(state)和属性(props)之间有何不同 <a class="header-anchor" href="#组件的-状态-state-和属性-props-之间有何不同" aria-label="Permalink to &quot;(组件的)状态(state)和属性(props)之间有何不同&quot;">​</a></h3><h3 id="shouldcomponentupdate-是做什么的" tabindex="-1">shouldComponentUpdate 是做什么的 <a class="header-anchor" href="#shouldcomponentupdate-是做什么的" aria-label="Permalink to &quot;shouldComponentUpdate 是做什么的&quot;">​</a></h3><h3 id="react-diff-原理" tabindex="-1">react diff 原理 <a class="header-anchor" href="#react-diff-原理" aria-label="Permalink to &quot;react diff 原理&quot;">​</a></h3><h3 id="何为受控组件" tabindex="-1">何为受控组件 <a class="header-anchor" href="#何为受控组件" aria-label="Permalink to &quot;何为受控组件&quot;">​</a></h3><h3 id="react-中构建组件的方式" tabindex="-1">React 中构建组件的方式 <a class="header-anchor" href="#react-中构建组件的方式" aria-label="Permalink to &quot;React 中构建组件的方式&quot;">​</a></h3><h3 id="简述-flux-思想" tabindex="-1">简述 flux 思想 <a class="header-anchor" href="#简述-flux-思想" aria-label="Permalink to &quot;简述 flux 思想&quot;">​</a></h3><h3 id="react-脚手架" tabindex="-1">React 脚手架 <a class="header-anchor" href="#react-脚手架" aria-label="Permalink to &quot;React 脚手架&quot;">​</a></h3><h3 id="应该在-react-组件的何处发起-ajax-请求" tabindex="-1">应该在 React 组件的何处发起 Ajax 请求 <a class="header-anchor" href="#应该在-react-组件的何处发起-ajax-请求" aria-label="Permalink to &quot;应该在 React 组件的何处发起 Ajax 请求&quot;">​</a></h3><h3 id="何为高阶组件-higher-order-component" tabindex="-1">何为高阶组件(higher order component)？ <a class="header-anchor" href="#何为高阶组件-higher-order-component" aria-label="Permalink to &quot;何为高阶组件(higher order component)？&quot;">​</a></h3><h2 id="其他" tabindex="-1">其他 <a class="header-anchor" href="#其他" aria-label="Permalink to &quot;其他&quot;">​</a></h2><h3 id="typescript-是什么" tabindex="-1">Typescript 是什么 <a class="header-anchor" href="#typescript-是什么" aria-label="Permalink to &quot;Typescript 是什么&quot;">​</a></h3><h3 id="typescript-与-javascript-的优势" tabindex="-1">Typescript 与 javascript 的优势 <a class="header-anchor" href="#typescript-与-javascript-的优势" aria-label="Permalink to &quot;Typescript 与 javascript 的优势&quot;">​</a></h3><h3 id="webpack-与-gulp-区别" tabindex="-1">Webpack 与 gulp 区别 <a class="header-anchor" href="#webpack-与-gulp-区别" aria-label="Permalink to &quot;Webpack 与 gulp 区别&quot;">​</a></h3><h3 id="请简述-webpack-中的-loaders-与-plugin-的区别" tabindex="-1">请简述 webpack 中的 loaders 与 plugin 的区别 <a class="header-anchor" href="#请简述-webpack-中的-loaders-与-plugin-的区别" aria-label="Permalink to &quot;请简述 webpack 中的 loaders 与 plugin 的区别&quot;">​</a></h3><h3 id="怎么提升页面性能-性能优化有哪些" tabindex="-1">怎么提升页面性能？性能优化有哪些 <a class="header-anchor" href="#怎么提升页面性能-性能优化有哪些" aria-label="Permalink to &quot;怎么提升页面性能？性能优化有哪些&quot;">​</a></h3><h3 id="node-使用来做什么的" tabindex="-1">Node 使用来做什么的 <a class="header-anchor" href="#node-使用来做什么的" aria-label="Permalink to &quot;Node 使用来做什么的&quot;">​</a></h3><h3 id="说一下-webpack-的打包原理" tabindex="-1">说一下 webpack 的打包原理 <a class="header-anchor" href="#说一下-webpack-的打包原理" aria-label="Permalink to &quot;说一下 webpack 的打包原理&quot;">​</a></h3><h3 id="commonjs-es6-模块区别" tabindex="-1">Commonjs ES6 模块区别 <a class="header-anchor" href="#commonjs-es6-模块区别" aria-label="Permalink to &quot;Commonjs ES6 模块区别&quot;">​</a></h3><h3 id="git-如何使用-常用指令有哪些" tabindex="-1">Git 如何使用/常用指令有哪些 <a class="header-anchor" href="#git-如何使用-常用指令有哪些" aria-label="Permalink to &quot;Git 如何使用/常用指令有哪些&quot;">​</a></h3><h3 id="你的项目比较小为什么还是用-vue-全家桶" tabindex="-1">你的项目比较小为什么还是用 vue 全家桶 <a class="header-anchor" href="#你的项目比较小为什么还是用-vue-全家桶" aria-label="Permalink to &quot;你的项目比较小为什么还是用 vue 全家桶&quot;">​</a></h3><h3 id="什么是-cors" tabindex="-1">什么是 cors <a class="header-anchor" href="#什么是-cors" aria-label="Permalink to &quot;什么是 cors&quot;">​</a></h3><h3 id="说一下对-websocked-的理解" tabindex="-1">说一下对 websocked 的理解 <a class="header-anchor" href="#说一下对-websocked-的理解" aria-label="Permalink to &quot;说一下对 websocked 的理解&quot;">​</a></h3><h3 id="后台传递过来的数据是那些" tabindex="-1">后台传递过来的数据是那些 <a class="header-anchor" href="#后台传递过来的数据是那些" aria-label="Permalink to &quot;后台传递过来的数据是那些&quot;">​</a></h3><h3 id="谈谈-ajax-fetch-axios-的区别" tabindex="-1">谈谈 Ajax，fetch，axios 的区别 <a class="header-anchor" href="#谈谈-ajax-fetch-axios-的区别" aria-label="Permalink to &quot;谈谈 Ajax，fetch，axios 的区别&quot;">​</a></h3>',36),i=[h];function c(l,s,d,n,u,b){return e(),t("div",null,i)}const f=a(o,[["render",c]]);export{p as __pageData,f as default};
