# Vue 首页白屏问题以及解决方案

### 首页加载白屏的原因

在谈论首页白屏问题之前，先了解一下**SPA**

#### SPA

SPA(single-page application), 翻译过来就是单页面应用。 `SPA`是一种网络应用程序或者网站的模型，它通过动态重写当前页面来与用户交互，这种方法避免了页面之前切换打断用户体验，
在单页面应用中，所有有必要的代码(`HTML`、`Javascript` 和 `CSS`) 都通过单个页面的加载而检索，或者根据需要(通常是为响应用户操作)动态装在适当的资源并添加到页面， 页面在任何时间点
都不会重新加载，也不会将控制转移到其它页面。 举个例子： 一个杯子， 早上装的牛奶， 中午装的是开水， 晚上装的是茶， 我们发现，变得始终是杯子里的内容，而杯子始终是那个杯子：

![SPA图示](/svg/spa图示.svg)

> `React`、 `Vue` 都属于`SPA`

##### SPA 加载过程

- 首先是 HTML 也就是 `FP`阶段

  > FP(全称 First Paint， 翻译为 首次绘制) 是时间线上的第一个时间点，它代表浏览器第一次向屏幕传输像素的时间，也就是页面在屏幕上首次发生视觉变化的时间
  >
  > 注意： FP不包含默认背景绘制，但包含非默认的背景绘制

  ```html
  <div id="app"></div>
  ```

  > 页面在导航后首次呈现出不同于导航前内容的时间点，有一个东西回来渲染在页面上了

- 之后是静态资源 CSS、JS、 之后解析 JS， 生成 HTML， 也就是 `FCP` 阶段， CSS、JS 资源加载下来了，首次的内容绘制，有一个大结构了
  
  > FCP(全称 First Contentful Paint， 翻译为 首次内容绘制) 顾名思义，它代表浏览器第一次向屏幕绘制 内容

  > 注意： 只有首次绘制文本、图片(包含背景图)、 非白色的 `canvas` 或者 SVG 时才被算作 FCP

  ::: details FP 和 FCP的区别
    FP 和 FCP这两个指标之间的主要区别是: FP是当浏览器开始绘制内容到屏幕上时，只要在视觉上发生变化，无论是什么内容触发的视觉变化，在这一刻，这个时间点，叫做FP

    相比之下， FCP指的是浏览器首次绘制来自DOM的内容， 例如文本、图片、SVG、canvas元素等， 这个时间点叫FCP
  :::

  ```html
  <div id="app">
    <div class="header"></div>
  </div>
  ```

- 最后是 FMP， ajax请求数据之后，首次有效绘制，就是页面加载差不多了，但是可能图片还没加载出来
  
  > FMP(全称 First Meaningful Paint, 翻译为 首次有效绘制) 表示页面的 '主要内容' 开始出现在屏幕上的时间点， 它是我们测量用户加载体验的主要指标

  > FMP本质上是通过一个算法来猜测某个时间点可能是 FMP， 所以有时候不准

  > FMP原理: [捕获FMP的原理](https://github.com/berwin/Blog/issues/42)

#### 解决方案

- **预渲染**

  预渲染就是`webpack`打包的时候渲染,通过无头浏览器

  > 无头浏览器: 打包的时候，可以把index.html的内容放入浏览器，但是浏览器是空白的，然后当进入页面时直接加载这个index.html, 但没有ajax请求

  获取到预渲染的页面html内容，然后再放入index.html， 再到CDN, 直接请求html(相当于把FMP提前到了FP)，其实更像另外一种骨架屏， 少了ajax请求

  但是由于我们这么做智能添加死数据，而不能把 ajax 请求的数据渲染到页面上，如何解决呢？

  我们可以在app.vue中， 直接在script中给对应标签添加数据即可

  ```javascript
  document.querySelector('#header').html('...')
  ```

- **同构**
  
  同构渲染就是一套代码多端使用

  现在有一些框架 Next、Nuxt 类似于渲染就是 vue -> json -> vue-server-render -> html

- **SSR**

   服务端渲染也可以解决首屏加载慢这个问题， 因为服务端会把所有数据全部渲染完成在返回给客户端

   ssr => 请求 -> node -> 解析 -> 返回给客户端(带请求数据)

   但是需要解决 Node层的高并发问题

- **路由懒加载**

   可以通过 `plugin-syntax-dynamic-import` 插件

   ```javascript
    Vue.component('async-component',(resolve)=>{
     import('./AsyncComponent.js')
      .then((AsyncComponent)=>{
       resolve(AsyncComponent.default)
      })
    })
   ```

- **quicklink**

  google 开源的一个脚本插件，可以置顶浏览器在空闲的时候去指定需要加载的数据

- **使用Gzip压缩，减少文件体积,加快首屏页面打开速度**

   ***服务器需要开启gzip***

   我们可以通过使用webpack插件来实现这个功能

   ```shell
    pnpm install vite-plugin-compression --save-dev
   ```

  vite.config.js中

  ```javascript
  import ViteCompression from 'vite-plugin-compression';

  export default {
    plugins: [
      ViteCompression({
        // 配置选项，根据需要进行配置
      }),
    ],
  };
  ```

- **外链CSS、JS文件**

  很多时候我们在main.js中直接import一些ui库或者css文件啥的，以后可以在index.html，通过script外链引入，这样就不会通过我们的webpack打包

- **loading**

   首页加一个loading或许是最原始的方法了，在index.html里加一个loadingcss效果，当页面加载完成消失
