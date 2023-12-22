# JavaScript 相关

### JavaScript的语言特性

- 运行在客户端浏览器上
- 不用预编译，直接解析执行代码
- 弱类型语言，比较灵活
- 与操作系统无关，跨平台的语言
- 脚本语言
- 解释性语言

> 为什么JavaScript是弱类型语言
>
> 弱类型语言实现相对于强类型语言来说的，在强类型语言中，变量类型有很多种，比如 `int char float Boolean`,不同类型相互转换有时需要强制转换，
> 而JavaScript只有一种类型 var 为变量赋值时会自动判断类型并转换，所以是弱类型语言

### JavaScript 中的基本数据类型

- [前端数据类型](../../native/javascript/前端数据类型)

### Ajax使用

Ajax（Asynchronous JavaScript and XML）是一种使用 JavaScript 和 XML 进行异步通信的技术。它可以在不刷新整个页面的情况下，通过向服务器发送请求并获取响应数据，实现动态更新页面内容。

一个完整的AJAX请求包括以下步骤：

- 创建 `XMLHttpRequest` 对象：在 JavaScript 中，使用 `XMLHttpRequest` 对象来发起 Ajax 请求。可以通过 `new XMLHttpRequest()` 来创建该对象。
- 设置回调函数：在发送请求之前，需要设置一个回调函数来处理服务器响应。可以通过 `onreadystatechange` 属性来监听状态变化，并在状态变化时触发回调函数。
- 打开和发送请求：使用 `open()` 方法来指定请求的类型（GET 或 POST）以及请求的 URL。然后使用 `send()` 方法发送请求
- 处理响应：在回调函数中，可以通过 `readyState` 属性判断请求的状态，并通过 `status` 属性判断服务器响应的状态码。当 `readyState` 等于 *4* 并且 `status` 等于 *200* 时，
  表示请求成功，并可以通过 `responseText` 或 `responseXML` 属性获取服务器返回的数据。

- 示例

```javascript
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
      var response = xhr.responseText;
      // 处理服务器返回的数据
      console.log(response);
    }
  };
  xhr.open('GET', 'http://example.com/api/data', true);
  xhr.send();
```

##### Ajax请求返回的状态码(常用)

|状态码|含义|
|:--|:--|
|`100`|表示客户端应该继续发送请求，是临时响应，用于通知客户端，部分的请求服务器已经接受，但是客户端继续发送请求剩余部分，如果请求已经完成，就忽略这个响应|
|`200`|表示服务器已经成功接受请求，并返回客户端所请求的结果|
|`202`|表示服务器已经接受了请求，但是还没有处理，而且这个请求最终会不会处理还不确定|
|`204`|表示服务器已经成功处理了请求，但没有返回任何实体内容， 可能会返回新的头部元信息|
|`301`|客户端请求的网页已经永久移动到新位置，当链接发生变化时， 返回 301 代码告诉客户端链接的变化，客户端保存新的链接，并向新的链接发起请求，一返回请求结果|
|`403`|表示客户端请求的资源没有权限查看|
|`404`|表示请求失败， 客户端请求的资源没有找到或者不存在|
|`500`|表示服务器遇到未知错误，导致无法完成客户端当前请求|
|`502`|表示服务器请求超时|
|`503`|表是服务器由于临时的服务器过载或者维护，无法解决当前请求|

### 闭包

##### 闭包的定义

闭包可以简单理解成：定义在一个函数内部的函数， 其中一个内部函数在包含他们的外部函数之外被调用时，就会形成闭包

闭包就是函数的局部变量集合，只是这些局部变量在函数返回后会继续存在。闭包就是就是函数的“堆栈”在函数返回后并不释放，
我们也可以理解为这些函数堆栈并不在栈上分配而是在堆上分配。当在一个函数内定义另外一个函数就会产生闭包。

##### 为什么要用

匿名自执行函数： 我们知道所有的变量，如果不架上 var 关键字，则默认的会添加到全局对象的属性上去，这样的临时变量加入全局对象有很多坏处，比如
别的函数可能误用这些变量；造成全局对象过于庞大， 影响访问速度(因为变量的取值是需要从原型链上遍历的)。 除了每次使用变量都是用 var 关键字外，
我们在实际情况下经常遇到这样一种情况，即有的函数只需要执行一次，其内部变量无需维护， 就可以使用闭包

结果缓存： 我们在开发中会遇到很多情况， 设想我们有一个处理过程很耗时的函数对象，每次调用都会花费很长时间， 那么我们就需要把计算出来的值储存起来，当调用就这个函数的时候，
首先在缓存中查找，如果找不到就重新计算， 然后更新缓存并返回值，如果找到了， 直接返回查找到的值即可。 闭包正式可以做到这一点， 因为它不会释放外部的引用，从而函数内部的值得以保留。

##### 闭包的特性

- 闭包的写法一般是函数嵌套函数

- 可以访问函数外部的变量：闭包可以访问定义它的函数的参数和局部变量，甚至可以访问全局变量。

- 保存变量的状态：当函数执行完毕后，闭包仍然可以访问它所引用的变量，并且这些变量的值不会被回收。

- 可以作为参数传递：闭包可以作为参数传递给其他函数，也可以被其他函数返回。

**优点**

- 变量长期驻扎在内存中
- 避免全局变量的污染
- 存在私有成员

**缺点**

- 会造成内存泄漏

::: details 什么是内存泄漏
  内存泄漏(Memory Leak)是指程序中已经不再使用的内存没有被及时释放，导致系统的可用内存逐渐减少，最终可能导致程序崩溃。

  **产生场景**

  - *对象或变量未被正确销毁*：当一个对象或变量不再被使用时，应该及时将它们从内存中删除。如果没有正确销毁这些对象或变量，它们所占用的内存就会一直存在，造成内存泄漏。

  - *循环引用*：当两个或多个对象相互引用时，如果它们之间没有被正确断开引用关系，就会形成循环引用。这种情况下，这些对象所占用的内存就无法被垃圾回收器回收，从而导致内存泄漏。

  - *定时器未被清除*：在使用 JavaScript 定时器时，如果没有及时清除已经失效的定时器，就会导致定时器所占用的内存无法被释放，从而造成内存泄漏。

  - *闭包*

  - *脱离DOM的引用*
  
  **防止内存泄漏**

  1. 及时销毁不再使用的对象或变量，尤其是大内存占用的对象。

  2. 避免循环引用，确保对象之间的引用关系能够正确断开。

  3. 在使用定时器时，一定要记得及时清除已经失效的定时器。

  4. 使用内存分析工具来检测内存泄漏问题，及时发现和解决潜在问题。

  5. 赋值为null
:::

### 事件委托

事件委托就是利用时间冒泡，只制定一个时间处理程序，就可以管理某一些类型的所有事件。 —— 《JS高级程序设计》

事件委托，称为事件代理，是js中很常用的绑定事件的技巧，事件委托就是把原本需要绑定在子元素上的响应时间委托给父元素，让父元素担当事件监听的职务，事件委托的原理就是DOM元素的时间冒泡

##### 事件委托优点

- **提高整体运行性能**

  假如现在有有00个li标签，那个li事件都有相同的点击事件，如果使用循环遍历去触发每个li元素上的事件， 这将会不断与DOM节点进行交互，访问DOM次数越多，引起浏览器回流和重绘的次数也就越多，
  就会延长整个页面的交互时间，如果委托给父级ul标签， 我们与DOM的交互只需要交互一次，这样就大大减少DOM的交互次数， 提高性能

- **减少内存空间**
  
  每个函数都是对象，对象会占用内存，对象越多，内存占用率越大，性能也会变差，但利用事件委托，就只对它的父级进行操作，减少了调用的对象，节省了内存空间

- **动态绑定事件处理程序**
  
  由于事件委托是基于事件冒泡机制实现的，因此可以动态地添加或删除子元素，而无需重新绑定事件处理程序。

- **处理未来元素的事件**

  由于事件委托是基于父元素的事件处理程序实现的，因此可以处理未来添加到页面上的元素的事件

```javascript
  window.onload = function() {
      var oUl = document.getElementById('ul1')
      oUl.onclick = function() {
        alert('利用事件冒泡的原理，将事件委托给父元素')
      }
  }
```

##### 事件源

Event 对象提供了一个属性叫 `target`， 可以返回事件的目标节点，我们称为事件源。

但这个有兼容性：

> 标准浏览器使用 `event.target` IE浏览器使用 `event.srcElement`

### 事件冒泡

当一个元素接收到事件的时候，会把接收到事件传递给自己的父级。这种传递分为三个阶段

- 捕获阶段：从window对象传导到目标节点(从外向里)， 这个阶段不会响应任何时间
- 目标阶段：从目标节点触发
- 冒泡阶段：从目标节点传回到window对象(从里到外), 事件委托/代理就是利用事件冒泡的机制把里层需要相拥的事件绑定到外层

### 本地存储与cookie的区别

本地存储(Local Storage)和Cookie都是用于在浏览器端存储数据的两种不同的机制，主要有以下区别

- 存储容量

  Cookie的存储容量通常比较小，每个cookie的大小限制为4KB， 因为每个http请求都会携带cookie，如果过多的cookie数据，会影响请求性能

  本地存储的容量相对较大，通常可达到5MB，这使得本地存储更适合大量数据的本地保存

- 生命周期
  
  Cookie可以设置过期时间，可以使会话级的(浏览器关闭时失效)， 也可以是持久性的。Cookie还可以设置域名和路径，用于控制其在哪些请求中发送

  本地存储分为两种 `localStorage`和`sessionStorage`. `localStorage`是永久性的，除非通过代码或者浏览器设置进行删除，而`sessionStorage`存储的数据会在会话结束时失效，
  即浏览器标签关闭

- 安全性
  
  Cookie存在一些安全性问题，因为他可以被跨站脚本(XSS)攻击，也可能被窃取

  本地存储相对来说更安全，因为它不会随着HTTP请求被发送到服务器，减少了被窃取的风险，但仍然需要注意防范XSS攻击

- 用途
  
  Cookie主要用户客户端与服务端传递信息，可以在请求头中携带Cookie

  本地存储主要用户客户端本地保存数据，供同一域名下的页面之间共享

- 访问方式
  
  Cookie 通过`document.Cookie`来进行访问和设置

  本地存储通过`localSorage`和`sessionStorage`对象进行访问与设置

### ES6新特性(常用)

-  [ES6新特性](../../native/javascript/ES6新特性一)

### 数组的方法(常用)

- [常用的数组的方法](../../native/javascript/Array/常用的数组的方法)

### JSON 新增/删除键值对

- 新增键值对

```javascript
let jsonStr = {}
jsonStr.newKey = "newValue"

jsonStr["name1"] = "ming"
```

- 删除键值对

```javascript
let json = { key1: "value1", key2: "value2" };

// 直接删除键值对
delete json.key1;

// 解构赋值， newJson将是被删除后的JSON对象
let { key1, ...newJson } = json;
```

### 面向对象

面向对象是一种思想，是基于面向过程而言的，就是说面向对象是将功能等通过对象来实现，将功能封装到对象之中，让对象去实现具体的细节；

这种思想是将数据作为第一位，这是对数据一种优化，操作起来更方便，简化了过程

JS本身事没有 class 类型的， 但是每个函数都具有一个 prototype 属性， prototype指向一个对象， 当函数作为构造函数时， prototype就起到类似 class 的作用

**特点**

- 封装(隐藏对象的属性和实现细节，对外提供公共访问方式)
- 继承(提高代码复用性，继承是多态的前提)
- 多态(是父类或接口定义的引用变量可以指向子嘞或者具体实现类的实例对象)

### 普通函数与构造函数区别

1. 构造函数也是一个普通函数，创建方式和普通函数一样，但是构造函数习惯首字母大写
2. 调用方式不一样，普通函数直接调用，构造函数要用关键字 new 来调用
3. 调用时，构造函数内部会创建一个新对象，就是实例，普通函数不会创建新对象
4. 构造函数内部的this指向实例，普通函数内部的this指向调用函数的对象(如果没有调用，默认为window)
5. 构造函数默认的返回值就是创建的对象(也就是实例)，普通函数的返回值由 return 决定
6. 构造函数的函数名与类名相同

> 引申： 构造函数在被 new 的过程中 发生了什么
>
> new 内部：
>
> - 创建一个新对象
> - 使新对象的 `__proto__`指向原函数的`prototype`
> - 改变 this 指向(指向新的obj)，并执行该函数，执行结果保存起来作为 result
> - 判断执行函数的结果是不是 null 或者 undefuned， 如果是则返回之前的新对象，如果不是则返回result

> 引申：手写实现一个 new

```javascript
// 手写一个new
function myNew(fn, ...args) {
  // 创建一个空对象
  let obj = {}
  // 使空对象的隐式原型(obj对象的 __proto__)指向原函数的显式原型(函数的 prototype)
  obj.__proto__ = fn.prototype
  // this指向obj
  let result = fn.apply(obj, args)
  // 返回结果
  return result instanceof Object ? result: obj
}
```

### 原型与原型链

- [原型与原型链](../../native/javascript/原型与原型链)

### Promise

- 链接（ES6新特性二）// **待开发**

- 解决问题

  回调地狱， 代码难以维护， 常常第一个的函数的输出是第二个函数的输入这种现象；

  支持多并发请求， 获取并发请求中的数据

### async函数

Async函数其实是 generatior函数和promise的语法糖， async就是将generator函数的 `*`换为 *async* 将 *yield* 换为 *await*

函数前必须加一个 *async*， 异步操作方法前加一个 *await* 关键字, 意思就是等这个异步操作执行， 执行完成之后再往下走；

注意⚠️：await只能在async中运行， 否则会报错

当运行返回报错时候， 通过 `try/catch`语句来捕获异常

- 链接（ES6新特性二）// **待开发**

### GET 请求传参长度误区

**误区**

我们经常说 get 请求参数的大小存在限制， 而post请求的参数大小是无限制的。 实际上HTTP协议从未规定 GET/POST 的请求长度是多少， 对 GET 请求参数的限制是来源与浏览器或
web 服务器， 浏览器或者 web 服务器限制了 url 的长度， 为了明确这个概念， 我们必须再次强调以下几点：

1. HTTP 协议未规定 GET 和 POST 的长度限制
2. GET 的最大长度显示是因为浏览器和 web 服务器限制了 url 的长度； 不同的浏览器和 web 服务器， 限制的最大长度是不一样的， 如果需要支持 IE， 则最大长度为 `2083byte`,
   若只支持 Chrome 则最大长度是 `8182byte`

### GET 请求和 POST 请求在缓存方面的区别

GET 请求 一般是做查询操作， 是一个查找的过程， 可以不用每次都与数据库连接， 因此 GET 请求更适合请求缓存；

POST 请求一般是做增删改操作， 所以必须与数据库交互，所以不能使用缓存，

### 事件流

HTML 和 Javascript 的交互是通过*事件驱动*来实现的， 例如鼠标点击事件 *onclick*, 页面滚动事件 *onscroll* 等，可以向文档或者文档中的元素添加事件侦听器来预定事件。

##### 事件流定义

事件流描述的是从页面中接收事件的顺序， DOM二级事件流包括几个阶段： 事件捕获阶段、处于目标阶段、 事件冒泡阶段

- `addEventListener`
  
  `addEventListener`是 DOM二级事件新增的指定事件处理程序的操作， 这个方法接收三个参数: 要处理的事件名、作为事件处理程序的函数和一个布尔值。
  
  这个布尔值代表了什么阶段调用事件处理程序， 如果为*true*，表示是在捕获阶段调用事件处理程序， 如果是 *false*， 表示是在冒泡阶段调用事件处理程序

  > IE浏览器只支持事件冒泡

### 改变this指针的指向函数(`call`、`apply`,`bind`)区别

- [call、bind、apply函数的恶区别](../../native/javascript/call-apply-bind的区别)

### JavaScript 中 *clientHeight*、*scrollHeight*、*offsetHeight*区别

- 具体可见 [JS中的元素尺寸与布局信息](../../native/javascript/JS中的元素尺寸与布局信息)

### 拖拽功能的实现

首先是三个事件: `mousedown`、 `mousemove`、 `mouseup`, 当鼠标点击按下的时候， 需要一个tag来标记此时已经按下了， 可以执行 `mousemove`里的方法。
*clientX* 和 *clientY* 是鼠标的横纵坐标， 我们用 *offsetX* 和 *offsetY* 来标识元素的初始坐标， 移动的距离应该是 鼠标移动时的坐标 - 鼠标按下去时刻的坐标。
也就是说定位信息为: 鼠标移动的坐标 - 鼠标按下去的坐标 + 元素初始情况下的 *offsetLeft*。 还有一点需要注意，拖拽的时候是绝对定位， 改变的是绝对定位条件下的方向的值

也可以通过H5的拖放(Drag和Drop)来实现

### JavaScript的垃圾回收机制

##### 必要性
  
由于字符串、对象和数组没有固定大小， 所以当他们大小已知时，才能够对它们进行动态的存储分配。JavaScript程序每次创建字符串、数组或者对象时，解释器都必须分配内存来存储那个实体。
只要像这样动态分配了内存，最终都要释放这些内存以便它们能够被再用， 否则， JavaScript的解释器会消耗完系统中所有可用的内存，造成系统崩溃。

JavaScript不像C/C++， 它有一套自己的垃圾回收机制(Garbage Collection)。JavaScript的姐时期可以检测到何时程序不在使用一个对象了，当它确定了一个对象是无用的时候，它就知道不再需要这个对象
可以把它所占用的内存释放掉了。 例如：

```javascript
var a = 'hello world'
var b = 'hello world'
var a = b
// 这时，会释放掉'hello world' 释放内存以便在引用垃圾回收的方法： 标记清除，计数引用。
```

##### 常见的垃圾回收方式

- **标记清除**
  
  这是最常见的垃圾回收的方式，当变量进入环境时，就标记这个变量为`进入环境`， 从逻辑上来讲， 永远不能释放进入环境的变量所占用的内存，只要执行流程进入相应的环境，就可以用到它们。 当离开环境时，
  就标记离开环境。

  垃圾回收器在运行时会给存储在内存中的变量都加上标记(所有都加)， 然后去掉环境变量中的变量， 以及被环境变量中的变量所引用的变量(条件行去除标记), 删除所有被标记的变量， 删除的变量无法在
  环境变量中被访问，所以会被删除， 最后垃圾回收器完成了内存的清除工作， 并回收它们所占用的内存

- **计数引用**

  这种方法不太常见，引用计数法的意思是每个值被引用的次数, 当声明了一个变量， 并用一个引用类型的值赋值给改变量，则这个值的引用次数就为1， 相反的，如果包含了对这个值引用的变量
  又取得了另外一个值，则在原先的引用值的引用次数 减 1， 当这个值的引用次数为 0 的时候, 就会把所占的内存给回收进来，这样垃圾收集器再次运行的时候， 就会释放引用次数为 0 的这些值。

  引用计数法存在 *内存泄漏*:

  ```javascript
  function problem() {
    var obj1 = new Object();
    var obj2 = new Object();
    obj1.someOtherObject = obj2.anotherObject = obj1
  }
  ```

  在这个例子里面， obj1 和 obj2 通过各自的属性相互引用，这样的话，两个对象的引用次数为 2 在采用引用计数的策略中， 由于函数执行之后， 这两个对象都离开了作用域， 函数执行完成之后， 因为
  计数不为 0 , 这样的相互引用如果大量存在就会导致内存泄漏。

  特别是在DOM对象中， 也容易存在这种问题：

  ```javascript
  var element = document.getElementById(' ')
  var obj1 = new Object();
  obj1.element = element;
  element.someObject = obj1
  ```

  这样就不会有垃圾回收的过程

### JavaScript监听对象属性的改变

在ES5中， 我们可以通过`Object.defineProperty`来实现已有属性的监听：

```javascript
Object.defineproperty(user, 'name', (set: function(key, value){

}))
```

缺点：如果id不再user对象中， 则不能监听id的变化

在ES6中， 我们可以通过 Proxy 来实现：

```javascript
var user = new Proxy({},{
  set: function(target,key,value,receiver) {

  }
})
```

这样， 即使有属性在user中不存在， 通过user.id同样也可以这样监听这个属性的变化

### 手动实现一个 `bind` 函数

- 原理： 通过 apply 或者 call 方法来实现。

```javascript
Function.prototype.bind = function(obj, arg) {
  var arg = Array.prototype.slice.call(arguments,1);
  var context = this;
  return function (newArg) {
    arg = arg.concat(Array.prototype.slice.call(newArg))
    return context.apply(obj, arg)
  }
}
```

- 考虑原型链
  
  > 为什么考虑原型链？ 因为在 new 一个 bind ， 过程中生成新函数的时候， 必须条件就是要继承原函数原型

```javascript
Function.prototype.bind = function (obj, arg) {
  var arg = Array.prototype.slice.call(arguments,1);
  var context = this;
  var bound = function(newArg) {
    arg = arg.concat(Array.prototype.slice.call(newArg));
     return content.apply(obj, arg)
  }

  var F = function() {}
  // 这里需要组合继承
  F.prototype = context.prototype;
  bound.prototype = new F();
  return bound
}
```

### 怎么控制一次加载一张图片，加载完后再加载下一张

##### 方法1

```javascript
var obj = new Image();
obj.src = 'http://www.phpernote.com/uploadfiles/editor/201107240502201179.jpg'

obj.onload = function() {
alert(`图片的宽度为: ${obj.width}; 图片的高度为: ${obj.height}`);

document.getElementById('mypic').innnerHTML= `<img src="${this.src}"/>`;
}
```

##### 方法2

```javascript
var obj=new Image();
obj.src='http://www.phpernote.com/uploadfiles/editor/201107240502201179.jpg'

obj.onreadystatechange=function(){
  if(this.readyState=='complete') {
    alert(`图片的宽度为: ${obj.width}; 图片的高度为: ${obj.height}`);

    document.getElementById('mypic').innnerHTML= `<img src="${this.src}"/>`;
  }
}
```

```html
<div id="mypic">onloading……</div>
```

### JavaScript 对象的深度克隆

通过递归可以简单实现对象的深度克隆，但是这种方法不管是 ES6 还是 ES5 实现, 都有同样的缺陷， 就是只能实现特定的 object 的深度复制(比如数组和函数)， 不能实现包装对象`Number`、
`String`、`Boolean`以及`Date`对象、`RegExp`对象的复制

- 深度克隆

```javascript
function deepClone(obj) {
  var newObj = obj instanceof Array ? []: {};
  for (let i in obj) {
    newObj[i] = typeof obj[i] ==='object' ? deepClone(obj[i]) : obj[i]
  }
  return newObj
}
```

这种方法可以实现一般对象和数组对象的克隆，例如

```javascript
var arr = [1, 2, 3]
var newArr = deepClone(arr)
// newArr -> [1, 2, 3]

var obj = { x: 1, y: 2 }
var newObj = deepClone(obj)
// newObj -> { x: 1, y: 2 }
```

但是不能实现例如包装对象 `Number`、`String`、`Boolean`以及`Date`对象、`RegExp`对象的克隆：

```javascript
//Number 包装对象
var num=new Number(1); typeof num // 'object'
var newNum=deepClone(num);
//newNum -> {} 空对象

//String 包装对象
var str=new String("hello"); typeof str // 'object'
var newStr=deepClone(str);
//newStr-> {0:'h',1:'e',2:'l',3:'l',4:'o'};

//Boolean 包装对象
var bol=new Boolean(true); typeof bol // 'object'
var newBol=deepClone(bol);
// newBol ->{} 空对象
```

- valueOf() 函数
  
  所有对象都有 *valueOf()* 方法， *valueOf()*方法对于：如果存在任意元市值， 它就默认将对象转换为标示它的原始值， 对象是符合值，而且大多数对象无法真正表示为一个原始值，
  因此默认的 *valueOf()* 方法简单地返回对象本身， 而不是一个原始值。 数组、函数和正则表达式简单地继承了这个默认方法，调用这些类型的实例的 *valueOf()* 方法只是简单地返回这个对象本身

  对原始值或者包装类

  ```javascript
  function baseClone(base) {
    return base.valueOf()
  }
  //Number
  var num = new Number(1);
  var newNum = baseClone(num);
  //newNum->1

  //String
  var str = new String('hello');
  var newStr = baseClone(str);
  // newStr->"hello"

  //Boolean
  var bol = new Boolean(true); 
  var newBol = baseClone(bol);
  //newBol-> true
  ```

> 其实对于包装类，完全可以用 = 号来进行克隆，其实没有深度克隆一说， 这里用 *valueOf()*实现， 语法上比较符合规范

对于`Date` 类型， 因为 *valueOf()* 方法，日期定义的 *valueOf()*方法会返回它的一个内部表示： *1970年1月1日*以来的毫秒数，因此我们可以在 `Date` 的原型上定义克隆的方法：

```javascript
Date.prototype.clone = function () {
  return new Date(this.valueOf())
}

var date=new Date('2010'); 
var newDate=date.clone();
// newDate-> Fri Jan 01 2010 08:00:00 GMT+0800


// 对于正则对象 RegExp：
RegExp.prototype.clone = function() { 
  var pattern = this.valueOf();
  var flags = '';
  flags += pattern.global ? 'g' : '';

  flags += pattern.ignoreCase ? 'i' : '';

  flags += pattern.multiline ? 'm' :'';

  return new RegExp(pattern.source, flags);
};

var reg=new  RegExp('/111/'); 
var newReg=reg.clone();
//newReg-> /\/111\//
```

### JavaScript 全排列

全排列是一种对给定字符串中的字符进行重新排列的操作，生成所有可能的排列组合。

```javascript
function permutate(str) {
  var result = [];

  if (str.length > 1) {
    var left = str[0];                    // 取字符串的第一个字符作为左侧字符
    var rest = str.slice(1, str.length);  // 剩余部分作为右侧子串
    var preResult = permutate(rest);      // 对右侧子串进行全排列，递归调用 permutate 函数
    for (var i = 0; i < preResult.length; i++) {
      for (var j = 0; j < preResult[i].length; j++) {
        // 在右侧子串的每个位置插入左侧字符，生成新的排列，并加入结果数组
        var tmp = preResult[i].slice(0, j) + left + preResult[i].slice(j, preResult[i].length); 
        result.push(tmp);
      }
    }
  } else if (str.length == 1) {
    // 如果字符串长度为 1，直接返回包含该字符的数组
    return [str];
  }
  
  return result;
}

var permutations = permutate("abc");
console.log(permutations);
// 输出: [ 'abc', 'bac', 'bca', 'acb', 'cab', 'cba' ]
```

### 跨域问题

##### 为什么会出现跨域

在前后端分离的模式下，前后端的域名是不一致的， 此时就会发生跨域访问问题。在请求过程中我们想要发送/接收数据一般都是 POST/GET 请求， 所以会有跨域问题出现

跨域问题来源于 JavaScript的同源策略， 即 协议 + 主机名 + 端口号 相同，则允许互相访问。 也就是说 JavaScript只能访问和操作自己域下的资源，不能访问和操作其它域下的资源

##### 同源策略

是由 NetScape 提出的一个著名的安全策略。所谓的同源，指的是协议、域名、端口相同，浏览器处于安全方面考虑，只允许本域名下的借口交互，
不同元的客户端脚本， 在没有明确授权的情况下， 不能读写对方的资源。

### 减少页面加载时间

1. 优化压缩图片
2. 图片格式的选择(GIF:提供颜色较少，可以用在一些对颜色要求不高的地方)
3. 优化CSS(压缩合并 CSS， 如 margin-left, margin-top 合并成 margin)
4. 网址后面加斜杠(如 `www.campr.com/目录`， 会判断这个目录是什么文件类型) CDN托管
5. 标明高度与宽度(如果浏览器没有找到这两个参数， 它需要一遍下载图片一遍计算大小， 如果图片很多，浏览器会不断调整页面，这不但影响速度，也影响体验；
   当浏览器知道了宽高，即使图片无法显示，页面上也会腾出图片的空位，然后继续加载后面的内容， 从而加载时间变快了，浏览器体验也变好了)
6. 减少 HTTP 请求(合并文件 合并图片)

### this 指向

在JavaScript中， this通常指向的是我们正在执行的函数本身，或者是指向该函数所属的对象

全局this -> 指向的是window

对象中的 this -> 指向其本身

事件中的 this -> 指向事件对象

### 数组去重

1. 使用`indexOf()`/`lastIndexOf()` 方法
2. ES6的 `Set`结构 `Array.form(new Set(arr))` 或者扩展运算符 `[...new Set(arr)]`
3. 使用 `sort()` 方法排序，然后与相邻的元素比较，不同则存入新数组
4. `includes()`方法

### 深拷贝与浅拷贝

- [手写深拷贝](../../native/javascript/浅拷贝与深拷贝)

深拷贝：指针赋值，并且内容拷贝 `JSON.parse(JSON.stringify())`不仅适用于数组还适用于对象。不能拷贝*函数*，*undefined*，*symbol*。
浅拷贝：只是简单的指针赋值 数组，如果是数组，可以使用数组的一些方法实现：slice()，concat()返回一个新数组的特性实现拷贝。用扩展运算符 spread 实现数组

### For循环与Map循环有什么区别

- For循环 遍历对象自身和继承可枚举的属性，也就是说会包括那些在原型链上的属性
- Map循环方法不会对空数组进行检测， map会返回一个新数组， 不会对原数组产生影响

### 类的继承

创建类有三种方法：

- 使用 function 和 this 关键字
- 原型方法 使用 prototype 和 this 关键字
- 使用 `object.create()` 方法创建

继承有六种：

1. 原型继承
2. 借用构造函数继承
3. 组合继承
4. 原型式继承
5. 寄生式继承
6. 寄生组合式继承

- [类的继承](../../native/javascript/类的继承)  //待开发

### 同步与异步的区别/阻塞与非阻塞区别

同步(阻塞的)
异步(非阻塞)

比如：
同步，咱两在一起上班，到吃饭时间了，我去喊你一起吃饭，你很忙，我就坐着等你忙完再一起去吃饭

异步，咱两在一起上班，到吃饭时间了，我去喊你一起吃饭，你很忙，我就先自己去吃了，你忙完了再去吃饭

同步（阻塞）异步（非阻塞）这两个关注的是程序在等待调用结果时的状态

### 重绘和回流

- [重绘与回流](../../native/javascript/回流与重绘)

### HTTP HTTPS

- HTTP
  
  HTTP叫做超文本传输协议， 是互联网应用最广泛的一种网络协议

  信息是明文传输

  HTTP 基于 请求-响应 的模式

  无状态保存  无链接

- HTTPS
  
  HTTPS是由 ssl+http 协议构建的可进行加密传输，身份认证的网络协议 具有安全性的`ssl`解密传输协议, 比 HTTP 安全

  HTTP 和 HTTPS 的连接方式完全不同，端口也不同， HTTP是 *80* , HTTPS是 *443*

### 如何对网站的文件和资源进行优化

1. 文件合并(目的是减少 http 请求)
2. 文件压缩(目的是减少文件下载体积)
3. 使用 CDN 托管资源
4. 使用缓存
5. gizp 压缩网站的js和css文件
6. `meta` 标签优化(title, description, keywords)、`heading` 标签的优化 `alt`优化
7. 反向链接，网站外链优化

### 预加载与懒加载的区别

预加载是指在页面加载完成之前，提前讲所需资源下载，之后使用的时候从缓存中调用；

懒加载是延迟加载，按照一定的条件活着需求，等到满足条件的时候再加载对应资源

两者主要区别是一个提前加载， 一个迟缓甚至不加载， 懒加载对服务器前端有一定的缓解压力的作用，预加载则是会增加服务器前端的压力

### 防抖与节流

- [防抖与节流](../../native/javascript/防抖与节流) // **待开发**

### XSS 与 CSRF

- [XSS攻击与CSRF攻击](../../native/javascript/XSS攻击与CSRF攻击)
