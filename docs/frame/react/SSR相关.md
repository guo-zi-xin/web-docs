# SSR相关

### 对于SSR的理解

- **对SEO友好**

  爬虫获取到的是已经异步执行完成后得到的有数据的HTML

- **所有模板、图片资源都存储在服务器端**

- **一个HTML 返回所有数据**

- **减少HTTP请求**

- **响应快、用户体验好、首屏渲染快**

  首屏渲染是Node发送过来的字符串， 并不依赖与js文件了， 这就会使用户更快地看到页面的内容。
  尤其是针对大型单页应用， 打包后文件体积比较大， 普通客户端渲染加载所有所需文件的时间较长，
  首页就会有一个很长的加载时间。

### SSR的局限

1. 服务端压力大: 正常是通过客户端去渲染、现在统一到服务端Node去做。 尤其是遇到高并发访问的情况， 会大量占用服务端CPU资源
2. 开发条件受限: 在服务端渲染中只会执行到`componentDidMount`之前的生命周期， 因此有些第三方库会受到影响。
