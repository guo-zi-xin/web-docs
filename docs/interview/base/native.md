# HTML CSS 浏览器

### 常用的图片的格式有哪些

常用的图片格式有`jpeg`、`png`、`gif`, 比较流行的是`jpeg`格式, 可以把文件压缩到最小

##### `jpeg`

  JPEG 是一种有损压缩格式,适合存储照片和复杂的图像,可以在文件大小和图像质量之间取得平衡

  *优点*:文件大小相对较小,支持高度压缩；色彩丰富,适合存储真实照片。

  *缺点*:JPEG 是有损压缩,因此会导致图像细节的损失；不支持透明度。

##### `png`
  
  PNG 是一种无损压缩格式,适合存储图标、简单图形和带有透明度的图像。

  *优点*:支持透明度、无损压缩；适合存储简单图形和带有透明背景的图像。

  *缺点*:文件大小通常比 JPEG 大；不适合存储真实照片。

##### `gif`
  
  GIF 是一种支持动画和简单图形的格式,同时也支持透明度。

  *优点*:支持动画、透明度；适合存储简单的动画图像。

  *缺点*:色彩表现不如 JPEG 和 PNG；不适合存储真实照片。

### CSS的盒模型

盒模型是一个盛放内容的容器, 它由四部分组成 元素的具体内容`content`、 内边距`padding`、边框`border`、外边距`margin`组成

设置元素的宽高只是设置了内容区域的宽高,盒子真正的宽高应该是 内容宽高 + 内填充 + 边界边框 + 外边距

和模型有两种 *标准盒模型*和*IE盒模型*, 这两者的区别主要在于宽高的包含范围:

标准盒模型的宽高指的是**内容区域`content`的宽高**, 而IE盒模型的宽高指的是**内容区`content` + 内边距`padding` + 边框`border`的宽高**

#####  标准盒模型

![标准盒模型](/svg/标准盒模型.svg)

##### IE盒模型

![标准盒模型](/svg/IE盒模型.svg)

> css3中引入了`box-sizing`属性,`box-sizing:content-box` 表示标准盒子模型,`box-sizing:border-box` 表示IE盒子模型

### 视频/音频标签的使用

##### 视频标签 `<video src=""></video>`
  
  属性:

  |属性名称|功能|
  |:--|:--|
  |`src`|需要播放的视频地址|
  |`width`|视频区域的宽度|
  |`height`|视频区域的高度|
  |`autoplay`|是否自动播放|
  |`controls`|是否显示进度条|
  |`poster`|没有播放之前现实的展位图片|
  |`loop`|是否循环播放|
  |`perload`|预加载视频(缓存); 与`autoplay`冲突|
  |`muted`|静音模式|

##### 音频标签`<audio> <source src="" type=""></source> </audio>`
  
  属性

  |属性名称|功能|
  |:--|:--|
  |`src`|需要播放的视频地址|
  |`type`|视频类型, 支持*ogg*、*mp3* *wav*|
  |`autoplay`|是否自动播放|
  |`controls`|是否显示进度条|
  |`loop`|是否循环播放|
  |`perload`|预加载视频(缓存); 与`autoplay`冲突|
  |`muted`|静音模式|

### HTML5新增的内容

- 语义化标签
- 表单类型
- 表单元素
- 表单属性
- 表单事件
- 多媒体标签

### 新增的语义化标签

优点

1. 提升可访问性
2. 利于`seo优化`
3. 结构清晰,利于维护

种类

|标签名|标签作用|
|:--|:--|
|`header`|页面头部|
|`main`|页面主要内容|
|`footer`|页面底部|
|`nav`|导航栏|
|`aside`|侧边栏|
|`article`|加载页面一块独立内容|
|`section`|英译为 部分；相当于`div`|
|`figure`|加载独立内容（上图下字）|
|`figcaption`|figure的标题|
|`Hgroup`|标题组合标签|
|`mark`|高亮显示|
|`dialog`|对话框（必须配合*open*属性）|
|`embed`|加载插件的标签|
|`video`|视频标签|
|`audio`|音频标签|

### CSS3新增特性

##### `border`边框

  |属性名称|功能|
  |:---|:---|
  |`border-radios`|添加圆角|
  |`border-shadow`|边框添加阴影 (水平位移 垂直位移 模糊半径 阴影尺寸 阴影颜色 内/外部阴影)|
  |`border-image`|设施边框图像|
  |`border-image-source`|边框图片的路径|
  |`border-image-slice`|图片边框向内偏移|
  |`border-image-width`|图片边框的宽度|
  |`border-image-outset`|边框图像区域超出边框的量|
  |`border-image-repeat`|图像边框是否平铺（repeat 平铺 round 铺满stretch 拉伸）|

##### `background`背景

  |属性名称|功能|
  |:---|:---|
  |`background-size`|背景图片尺寸|
  |`background-origin`|规定`background-position`属性相对于什么位置定位|
  |`background-clip`|规定背景的绘制区域（`padding-box`,`border-box`,`content-box`）|

##### `gradient`渐变

  |属性名称|功能|
  |:---|:---|
  |`linear-gradient`|线性渐变|
  |`radial-gradient`|径向渐变|

##### `word`文本效果
  
  |属性名称|功能|
  |:---|:---|
  |`word-break`|定义如何换行|
  |`word-wrap`|允许长的内容可以自动换行|
  |`text-overflow`|指定当文本溢出包含它的元素|
  |`text-shadow`|文字阴影（水平位移,垂直位移,模糊半径,阴影颜色）转换|

##### `transform`转换

  |属性名称|功能|
  |:---|:---|
  |`transform`|应用于 2D3D 转换,可以将元素旋转,缩放,移动,倾斜|
  |`transform-origin`|可以更改元素转换的位置,（改变 xyz 轴）|
  |`transform-style`|指定嵌套元素怎么样在三位空间中呈现|

  > 2D 转换方法: rotate 旋转 translate（x,y）指定元素在二维空间的位移 scale（n）定义缩放转换

  > 3D 转换方法:Perspective（n）为 3D 转换 translate rotate scale

##### `transition`过渡

  |属性名称|功能|
  |:---|:---|
  |`transition-proprety`|过渡属性名|
  |`transition-duration`|完成过渡效果需要花费的时间|
  |`transition-timing-function`|指定切换效果的速度|
  |`transition-delay`|指定什么时候开始切换效果|

##### `animation`动画

  |属性名称|功能|
  |:---|:---|
  |`animation-name`|为@keyframes 动画名称|
  |`animation-duration`|动画需要花费的时间|
  |`animation-timing-function`|动画如何完成一个周期|
  |`animation-delay`|动画启动前的延迟间隔|
  |`animation-iteration-count`|动画播放次数|
  |`animation-direction`|是否轮流反向播放动画|

### 清除浮动(`float`)

> 当设置浮动属性时,并且父元素没有设置高度时, 父元素会出现高度塌陷问题

1. 给父元素单独定义高度

   这个方法简单快速, 代码量少 但不利于响应式布局
2. 父级定义 `overflow:hidden; zoom:1`两个属性 其中`zoom: 1`属性是对IE6的兼容

  这个方法简单快速,代码量少,兼容性高,但是设置`overflow:hidden`之后, 超出部分会被隐藏
3. 在浮动元素后面加一个空标签并设置属性 :`clear:both; height:0; overflow:hidden`

  这个方法简单快速,代码量少,兼容性高, 但增加了新标签,不利于页面优化
4. 父级定义 `overflow:auto`

  这个方法简单快速,代码量少,兼容性高,但内部宽高超过父级时,会出现滚动条
5. 给塌陷元素添加微对象

  这个写法固定 兼容性高, 但代码比较多

  ```css
    .content{
      &:after {
        content: "1";
        clear:both;
        display:block;
        height:0;
        overflow:hidden;
        visibility: hidden
      }
    }
  ```

### 定位属性`position`

- `reactive`: 相对定位,不脱离文档流,相对于自身定位
- `absolute`: 绝对定位,脱离文档流,相对于父级定位
- `fixed`: 固定定位,脱离文档流,相对于浏览器窗口定位
- `static`: 默认值, 元素出现在正常的文档流中
- `sticky`: 粘性定位，元素先按照普通文档流进行相对定位，相对于块级元素的祖先元素定位。当超过设置的阈值之后，就会变成固定定位
- `inherit`: 表示元素会继承父级元素的定位属性

### 元素居中

##### 水平居中

1. 子父元素宽度固定,子元素设置*margin: auto* 并且子元素不能设置浮动(`float`)。否则居中失效
2. 子父元素款素固定,父元素设置*text-algin:center*; 子元素设置*display:inline-block*,并且子元素不能设置浮动, 否则居中失效

##### 垂直居中

1. 设置子元素和父元素的行高一样
2. 子元素设置为行内块,再加 *vertical-align:middle*
3. 已知父元素高度,子元素相对定位,通过 *transform:translateY(-50%)*
4. 不知道父元素高度,子绝对定位父相对定位,子元素 *top:50%*,*transform:translateY(-50%)*
5. 创建一个隐藏节点,让隐藏节点的 *height* 为剩余高度的一半
6. 给父元素 *display:table*,子元素 *display:table-cell*,*vertical-align:middle*
7. 给父元素添加伪元素
8. 弹性盒,父元素 *display:flex*,子元素 *align-self:center*

##### 水平垂直居中

1. 子元素相对于父元素绝对定位,子元素*top*、*left*设置 50%,子元素的*margin-left*和*margin-top*减去各自宽高的一半
2. 子元素相对于父元素绝对定位,子元素上下左右全为0,然后设置子元素*margin:auto*
3. 父元素设置*display:table-cell; vertical-align: middle*,子元素设置*margin:auto*
4. 子元素相对定位,子元素 *top*,*left* 值为 50%,*transform:translate(-50%,-50%)*
5. 子元素相对父元素绝对定位,子元素 *top*,*left* 值为 50%,*transform:translate(-50%,-50%)*
6. 父元素设置弹性盒:

   ```css
   .content {
    display: flex;
    justfy-content:center;
    align-item:center;
   }
   ```

##### 三栏布局方式两边固定, 中间自适应

1. *margin* 负值法：左右两栏均左浮动, 左右两栏采用负的*margin*值。中间栏被宽度为100%的浮动元素包起来
2. 自身浮动法：左栏左浮动, 右栏右浮动, 中间栏放最后
3. 绝对定位法：左右两栏采用绝对定位, 分别固定于页面的左右两侧, 中间的主体栏用左右 *margin* 值撑开距离
4. *flex* 左右固定宽 中间 *flex: 1*
5. 网格布局
6. table 布局

### 浏览器显示小于12px的文字

1. 可以添加谷歌私有属性*webkit-text-size-adjust:none*
2. 使用 *-webkit-transform:scale(0.5)*

### CSS选择器

##### 种类

|选择器|功能|
|:---|:---|
| |后代选择器|
| |元素选择器|
|`.`|类名选择器|
|`#`|id选择器|
|`*`|通配符选择器|
|空格、`>` `+`|相邻兄弟选择器|
|`~`|通用选择器|
|`a:link/visited/hover/active`|CSS2伪类选择器|
|结构伪类选择器|
|`nth-child(n)`|查找第几个子元素|
|`nth-of-type`|查找同已类型第几个|
|`only-of-type`|查找唯一类型|
|`[attr=value]`|属性选择器|
|`:root`|查找根元素html标签|
|`:empty`|查找空标签|
|目标伪类选择器(表单)||
|`:enabled`|查找可以使用的标签|
|`:disabled`|查找禁止使用的标签|
|`:checked`|查找被选中的标签|
| ||
|`:selection`|设置选中文本内容的高亮显示(只能用于背景色和文本颜色)|
|`not()`|否定伪类选择器|
|`lang`|语言伪类选择器|

##### 优先级(权重)

|选择器|权重|
|:---|:---|
|元素选择器|1|
|伪元素选择器|1|
|class选择器|10|
|伪类选择器|10|
|属性选择器|10|
|Id选择器|100|
|内联样式的权重|1000|
|包含选择器权重|包含的所有的权重之和|

##### 可继承属性

|类型|属性|
|:---|:---|
|所有元素|`visibility`和`cursor`|
|块级元素|`text-indent`和`text-align`|
|列表元素|`list-style`,`list-style-type`,`list-style-position`,`list-style-image`|
|内联元素||
|字母间距|`letter-spacing`|
|段落间距|`word-spacing`|
|行高|`line-height`|
|字体颜色|`color`|
|`font`||
|字体种类|`font-family`|
|字体大小|`font-size`|
|字体样式|`font-style`|
|字体变体|`font-variant`|
|字体粗细|`font-weight`|
|文本装饰性线条的外观|`text-decoration`|
|元素的文本大小写|`text-transform`|
|文本方向|`direction`|

### 图片加载缓慢问题

1. 图片懒加载, 在图片未可视区域加一个滚动条事件, 判断图片位置与浏览器顶端和页面的距离, 如果前者小于后者, 优先加载
2. 使用图片预加载技术, 将当前展示图片的前一张和后一张优先下载
3. 使用 `csssprite`css精灵图 或者 `svgsprite`svg精灵图

### 行内元素/块级元素

行内元素: 相邻的行内元素会排列在同一行, 不会独占一行 设置宽高无效 `span`、`a`、`br` `I` `em` `img` `input` `select` `sub` `sup` `u` `textarea`

块级元素: 会独占一行 可以设置宽高等属性 `div` `h1`-`h6` `hr` `p` `ul` `ol` `table` `address` `blockquote` `dir` `frommenu`

可变元素: 根据上下文预警决定该元素为块元素还是内联元素 `button` `del` `iframe` `ins`

### *margin*与*padding*使用场景

*margin*: 外边距 自身边框到另一个边框之间的距离

*padding*: 内边距 自身边距到自身内容之间的距离

当需要在 *border* 外侧添加空白时用 *margin*; 当需要在 *border* 内侧添加空白时用 *padding*

### `flex`属性

原理： 通过给父盒子添加 flex 属性, 来控制子盒子的位置和排列方式

|属性名|功能|
|:--|:--|
|`flex-direction`|弹性容器中子元素排列方式(主轴排列方式)|
|`flex-wrap`|设置弹性盒子的子元素超出父容器时是否换行|
|`flex-flow`|是 `flex-direction` 和 `flex-wrap` 简写形式|
|`align-item`|设置弹性盒子元素在侧轴上的对齐方式|
|`align-content`|设置行对齐|
|`justify-content`|设置弹性盒子元素在主轴上的对齐方式|

### 标签的禁用

添加*disable*属性

### `px`、`rem`、`em`区别

- `px`

  绝对长度单位, 像素 `px` 是相对于显示器屏幕分辨率来说的

- `em`

  相对长度单位, 相对于当前对象内文本的字体尺寸

  `em` 的值并不是固定的

  `em` 会继承父级元素的字体大小（参考物是父元素的 `font-size`）
  
  `em` 中所有的字体都是相对于父元素的大小决定的

- `rem`

  相对于 `html`根元素的 `font-size`

`1em` = `1rem` = `16px` 在 `body` 中加入 `font-size：62.5%` 这样直接就是原来的px数值除以10加上em就可以

> `rem`缺点； 屏幕越小的移动设备如果用了 rem 肯定文字就越小, 就会导致看文章的时候看不清

### 媒体查询

媒体查询扩展了 **media** 属性, 就是根据不同的媒体类型设置不同的css样式, 达到自适应的目的。

### 网页的三层结构

结构(`html` 或 `xhtm` 标记语言) 表现(`css` 样式表) 行为(`js`)

### DOCTYPE 作用

DOCTYPE 是 HTML5 中的文档声明, 通过它可以告诉浏览器, 使用哪一个 HTML 的版本标准来解析文档, 如果没有 DOCTYPE,  会导致
HTML文档以混杂模式出现(不仅会降低解析效率, 而且会在解析过程中产生一些难以预料的bug)

- 标准模式: 以浏览器支持的最高标准执行
- 混杂模式: 中页面是一种比较宽松的像后兼容的方式显示

### HTML5 `drag`API

|属性|功能|
|:---|:---|
|`dragstart`|事件主体是被拖放元素, 在开始拖放被拖放元素时触发|
|`darg`|事件主体是被拖放元素, 在正在拖放被拖放元素时触发|
|`dragenter`|事件主体是目标元素, 在被拖放元素进入某元素时触发|
|`dragover`|事件主体是目标元素, 在被拖放在某元素内移动时触发|
|`dragleave`|事件主体是目标元素, 在被拖放元素移出目标元素是触发|
|`drop`|事件主体是目标元素, 在目标元素完全接受被拖放元素时触发|
|`dragend`|事件主体是被拖放元素, 在整个拖放操作结束时触发|

### 浏览器性能优化 🌍

如何让页面能够更快地显示和响应， 这里分为三个阶段

- 加载阶段：发出请求到网页渲染完成的这段过程，这里影响和优化的主要是网络和 JavaScript 脚本。
- 交互阶段：页面加载完成，用户交互的这段过程，影响的主要是 JavaScript 脚本。
- 关闭阶段：关闭后的一些清理操作，影响的主要也是 JavaScript 脚本。

##### 加载阶段的优化

加载阶段能做的主要优化：

- 减少关键资源个数
  -  例如把css和js改为内联形式，关键资源比如原来有3个就减少到1个了
  -  变成非关键资源: 如果JS代码没有 DOM 操作，则可以改成 async 或者 defer； 同样的， CSS如果不是在页面构建前加载，则可以加上取消阻止显示的标志

- 降低关键资源大小
  - 压缩 CSS 和 JavaScript 资源
  - minify / gzip 压缩、webp图片压缩
  - 图片懒加载
  - 移除一些注释内容
  - 变成非关键资源

- 降低关键资源的RTT次数
  - 实现前两者的优化
  - 使用 CDN

##### 交互阶段的优化

交互阶段的优化，其实就是说 优化渲染进程中渲染帧的速度，帧的速度决定了交互的流畅性

> 大部分情况下，生成一个新的帧，是由 JavaScript 通过修改 DOM 或者 CSSOM 来触发的

- 降低请求量: 合并资源，减少 http次数
- 缓存: HTTP 协议缓存请求，离线缓存 manifest, 离线数据缓存localStorage
- 渲染: 服务端渲染

### 回流和重绘

- [回流和重绘](../../native/javascript/回流与重绘)

### 浏览器缓存机制

- [浏览器缓存](../../native/javascript/浏览器缓存)

### 浏览器输入网址到页面渲染的全过程

1. **用户输入URL**
   用户在输入URL时候，浏览器会根据URL的协议， 在这段内容上加伤协议合成合法的URL， 按下回车后，导航栏显示加载状态；

   当用户输入的是关键字的时候，浏览器会讲输入内容作为搜索条件，使用用户的默认设置的搜索引擎来进行搜索
2. **网络进程处理**
   网络进程接收到url请求后会先检查本地缓存， 如果有缓存文件，则先走缓存，没有则进行网络请求，开始**DNS解析**

   *DNS解析的详细过程*

    DNS翻译过来就是域名系统，是互联网上作为域名和IP地址相互映射的一个分布式数据库

    因为浏览器不能直接通过域名找到对应服务器的IP地址，所以需要进行DNS解析，查找到对应IP进行访问

   - 用户在浏览器中输入域名，操作系统会先检查浏览器的缓存和本地的`host`文件， 是否有这个网址记录，有的话就从记录里找到对应IP地址，完成域名解析
   - 没有的话接着使用`TCP/IP`参数设置的`DNS`服务器进行查询，如果查询的域名包含在本地配置区域资源中，则返回解析结果， 完成域名解析
   - 没有的话再接着检查本地`DNS`服务器是否缓存有该网址的记录，有的话返回解析结果，完成域名解析
   - 如果还没有，本地`DNS`服务器会发送查询豹纹到根`DNS`服务器，在根`DNS`服务器收到报文之后会返回顶级域`DNS`服务器地址，然后本地`DNS`服务器会发送查询报文到顶级域名服务器，
     顶级域名服务器收到请求后会返回权威`DNS`地址,然后本地`DNS`服务器地址再发送查询报文到权威`DNS`服务器，权威`DNS`服务器接收到请求后，返回最终的`IP`地址，完成域名解析
3. **TCP三次握手建立连接**
::: details 网络模型
  网络模型可以分为七层、四层或五层模型， 这里我们将其分为五层[^1]
  ![网络模型(五层)](/svg/网络模型.svg)

  自上而下，分为应用层、传输层、网络层、链接层和实体层(物理层), 每层都有相关的协议和功能，并且需要下一层的支持。他们的功能以及依赖关系，如下图
  ![网络传输数据包装](/svg/网络传输数据包装.svg)

  1. 应用层HTTP协议的通信请求，规定应用程序的数据格式，基于传输层TCP协议的TCP连接
  2. 传输层的TCP连接，负责传输数据包，基于网络层IP协议分配IP地址连通网络和链接层MAC地址(网卡地址)，确认接收主机
  3. 网络层的数据发送，基于连接层将实体层发出的电信号分组并且解读，通过ARP协议利用IP地址获取到MAC地址(网卡地址)
  4. 实体层(物理层)，就是电脑间链接的介质，比如光纤、电缆等等，主要负责传送0和1的电信号

  由此我们可得知Internet通信的前提必须是知道双方的IP地址和MAC地址(网卡地址，以太网的物理地址)，IP地址负责确定接收方的子网，MAC地址负责确定接收方的主机地址。
:::
::: details TCP协议
**TCP协议：** TCP协议(Transmission Control Protocol 传输控制协议)是一种面向连接的，可靠的，基于字节流的**传输层协议**

TCP协议的主要功能是当应用层向TCP层发送用于网间传输的，用8位字节表示的数据流，TCP则把数据流分割成适当长度的报文段，最大传输段大小(MISS)通常受该计算机连接的网络的数据链路层的最大
传送单元(MTU)限制。之后TCP把数据包传给IP层，由他来通过将包传送给接收端实体的TCP层。

TCP三次握手：[TCP三次握手与四次挥手](../../native/javascript/TCP三次握手与四次挥手.md)
:::
4. **发送HTTP/HTTPS请求**

 - 建立连接后就可以停过 HTTP 进行数据传输了
 - 如果使用了 HTTPS ，会在 TCP 和 HTTP 之间多添加一层协议作为加密和认证的服务， HTTPS 使用 SSL 和 TLS 协议 保证了信息的安全
 - SSL 协议的作用是认证客户端和服务端，确保数据发送到正确的客户端和服务器，加密数据防止数据中途被窃取，维护数据的完整性，确保数据在书参数过程中不被改变
 - TLS 协议的作用是在两个通信应用程序之间提供保密性和数据完整性， TLS 协议有两层协议组成 TLS 记录协议和 TLS 握手协议

5. **服务器响应请求**

   当浏览器到web服务器建立连接后，浏览器会发送一个初始的 HTTP GET请求， 请求目标通常是一个HTML文件，服务器收到请求后，将返回一个 HTTP 的响应报文，内容包括响应头和 HTML 正文

  ```xhr
  GET /index.html HTTP1.1
  ```

6. **浏览器解析渲染页面**

  浏览器接收到服务端的响应之后，开始渲染解析页面

  浏览器会处理 HTML 并且构建 DOM 树

  处理 CSS 标记并构建 CSSDOM 树

  将 DOM 树和 CSSDOM 树合并成一个渲染树

  根据渲染树来布局， 以计算每个节点的集合信息

  将各个节点渲染到屏幕上， 这样就完成了页面渲染

7. **传输完成，TCP四次挥手**

[TCP三次握手与四次挥手](../../native/javascript/TCP三次握手与四次挥手)

[^1]: ../../native/javascript/TCP四层五层与OSI七层模型区别

### 如何画一条0.5px的线

- 采用 `meta viewport`的方式

```html
<meta name="viewport" content="initial-scale=1.0, maxmum-scale=1.0, user-scalable=no"/>
```

- 采用border-image的方式
- 采用`transform:scale()`的方式

```css
.content {
  width:100px;
  height:1px;
  transform: scale(0.5)
}
```

### 关于 JS动画和CSS3动画的差异

渲染县城分为`main thread` 和 `compositor thread`, 如果css动画只改变 `transfoem` 和 `opacity`, 这时整个CSS动画得以在 `compositor trhead` 完成，
而 JS动画 则会在`main thread`执行，然后触发`compositor thread`进行下一步操作，需要特别注意的是，如果改变`transfoem` 和 `opacity`是不会layout或者paint的

区别：

- 功能涵盖方面： JS动画比CSS动画功能强大
- 实现/重构难度：难度不一， CSS动画比 JS动画更简单，
- 性能方面：JS动画在低版本浏览器下表现并不好， CSS动画可以做到自然降级
- 事件方面： CSS动画有天然提供的事件支持， JS动画则没有
- 兼容性问题： CSS动画存在兼容性问题

### 双边距重叠(外边距折叠)

多个相邻(兄弟或者父子关系)普通流的块级元素垂直方向的 *margin* 会重叠， 重叠结果为：

- 两者相邻的外边距皆为正数时： 折叠结果是比较他们两者之间较大的值。
- 两者相邻的外边距都是负数时： 折叠结果是两者绝对值的较大的值。
- 两者相邻的外边距为一正一负时： 折叠结果是两者相加的和。

