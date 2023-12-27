# Vue

### vue的核心

Vue是一套构建用户界面的渐进式、自底向上增量开发的 MVVM 模型的框架， vue的核心只关注视图层

##### 核心思想

- 数据驱动(视图内容随着数据的改变而改变)
- 组件话(可以增加代码复用性、可维护性、可测试性，提高了开发效率， 方便重复使用， 体现了高内聚低耦合)

::: details MVVM模型
**定义**

MVVM(Model-View-ViewModel)是一种前端设计模式，它将应用程序分为三个部分：模型(Model)、视图(View)和视图模型(ViewModel)。 这种设计模式有助于实现前端应用程序的解耦和可维护性

**基本概念**

- 模型(Model): 模型是应用程序的数据部分，包含了应用程序的数据和业务逻辑，模型通常通过AJAX请求与后端交互，以获取或更新数据
- 视图(View): 视图是用户界面的一部分，负则呈现模型数据，视图通常是用 HTML 和 CSS 编写的，可以使用模版引擎来渲染动态数据。
- 视图模型(ViewModel): ViewModel是链接模型和视图的桥梁，它负责将模型数据映射到视图上，并将用户的交互事件传递给模型。 ViewModel可以使用数据绑定来自动更新视图，当模型数据发生改变时
  视图自动更新

在 MVVM 中， 最重要的部分是数据绑定和双向数据绑定

*数据绑定* 是指将视图中的元素绑定到模型数据的过程，当模型数据发生变化时， 视图将自动更新

*双向数据绑定* 是指同时将视图中的元素绑定到模型数据，并将模型数据绑定到视图中的元素，当视图或模型中的数据发生变化时，另一部分将自动更新

**MVVM优点**

1. *关注点分离*: MVVM模式通过明确的分层将数据、用户界面和业务逻辑分离开来。这有助于提高代码可维护性和可测试性，使开发人员更容易地修改、扩展和维护不同的部分
2. *代码重用*: VIewModel 可以根据不同的视图需求进行调整，从而实现业务逻辑的重用。这允许在不同的视图之间共享共同的ViewModel
3. *团队协作*: MVVM模式的分层结构可以使不同的团队成员在不同层次上独立工作，减少了彼此的依赖性
4. *可维护性*: 由于数据逻辑与展示逻辑分开，所以对逻辑的修改和调试不影响用户界面的呈现
5. *数据绑定*: MVVM模式通常具有双向数据绑定的功能，使视图与数据保持同步，从而实现了更实时的用户体验
6. *响应式编程*: MVVM模式通常设计响应式编程范式，使数据的变化能够自动传播到相关的视图中

**MVVM缺点**

1. *复杂性*: MVVM模式引入了额外的层次和概念，可能会增加项目的初始学习成本，特别是对于初学者来说
2. *性能*: 在某些情况下，MVVM模式可能引入额外的性能开销，特别是实现数据绑定和观察者模式时。虽然现在前端框架会优化这些问题，但仍然需要注意这些问题
3. *过度工程*: 在小型应用中， 采用 MVVM 模式可能会导致过度设计，增加不必要的复杂性
4. *状态管理*: 在一些复杂的应用中，随着视图和数据逻辑的增加，可能会涉及到复杂的状态管理问题，如果不恰当地管理好状态，可能会导致应用变得难以理解和维护
:::

### Vue中的单项数据流

父级 prop 的更新都会向下流动到子组件中，每次父组件发生更新，子组件所有的 prop 都会刷新为最新的值

数据从父组件传递给子组件，只能单向绑定，子组件内部不能直接修改父组件传递过来的数据，(可以使用 data 和 computed 解决)

### Vue中常用的修饰符

|修饰符|功能|
|:---|:---|
|修饰符||
|`.lazy`|改变后触发，光标离开 input 输入框的时候值才会改变|
|`.number`|将输出字符串转化为 number 类型|
|`.trim`|自动过滤用户输入的首尾空格|
|事件修饰符||
|`.stop`|阻止点击事件冒泡，相当于原生中`event.stopPropagation()`|
|`.prevent`|防止执行预设的行为, 相当于原生中的`event.preventDefault()`|
|`.captrue`|添加事件侦听器时使用事件捕获模式，就是谁有该事件修饰符，就先触发谁|
|`.self`|只会触发自己范围内的事件，不包括子元素|
|`.once`|只执行一次|
|`.passive`|一般触摸事件的修饰符，常用于改善移动端设备的滚屏性能|
|键盘修饰符||
|`.enter`|回车键|
|`.delete`|捕获 Delete 和 Backspace 两个键位|
|`.tab`|制表键|
|`.esc`|返回键|
|`.space`|空格键|
|`.up`/`.down`/`.left`/`.right`|向上/下/左/右|
|系统按键修饰符||
|`.ctrl`/`.alt`/`.shift`/`.meta`|按下对应键位触发|

### `v-text`、`{{}}`、`v-html`区别

##### `{{}}`

模版插值`{{}}` 将数据解析成纯文本，并不能显示输出 html

##### `v-text`

`v-text` 指令操作网页元素的恶纯文本内容，与 `{{}}`等价， 只是 `v-text`叫指令， `{{}}`叫模版插值 `{{}}`是它的另一种写法

`v-text`将数据解析成纯文本，不能输出真正的 html ， 与模版插值`{{}}`区别是在页面加载时不显示双花括号

##### `v-html`

`v-html`可以渲染输出 html

### `v-on`是否可以绑定多个方法

可以的， 如果绑定多个事件，可以使用键值对形式：事件类型: 事件名；

如果绑定的是多个相同事件， 直接使用逗号分隔就可以

### Vue `v-for`循环中 `key`的作用

设置的 `key` 是保证唯一性， Vue在执行时，会对节点进行检查，如果没有key值，那么vue检查到这里有 DOM 节点，就会对内容清空并赋新值，如果有 `key` 存在，那么会对新老节点进行对比，比较两者
`key` 是否相同，进行调换位置或删除操作

### 计算属性(`computed`)

计算属性是用来声明式地描述一个值依赖了其他的值，当它依赖的这个值发生改变时，就更新 DOM

当在模版中把数据绑定到一个计算属性上时， Vue会在它依赖的任何值导致该计算属性改变时更新 DOM

每个计算属性都包括一个 getter 和 setter， 读取时触发 getter ， 修改时触发 setter

### Vue中跳转路由的方式

Vue中路由跳转的方式有两种，分别是 声明式 和 编程式

用 js 方式进行跳转的叫做编程式导航 `this.$router.push()`

用 router-link 进行跳转的叫声明式 router-view 路由出口， 路由模版显示的位置

**路由中name的作用**

在 router-link 中使用 name 导航到对应路由

使用 name 导航的同时，给子路由传递参数

### Vue 跨域解决方案

1. 后台更改`header`
2. 使用 `http-proxy-middleware` (配置代理服务器的中间件)

### Vue 生命周期

- [vue生命周期](../../frame/vue/vue生命周期)

### Vue 路由的实现

vue路由有三种模式，分别是 `hash`、`history`、`abstract`

- `hash`:  使用 URL的 hash值来做路由，支持所有浏览器，包括不支持 HTML5 History API的浏览器
- `history`: 依赖 HTML5 History API和服务器配置
- `abstract`: 支持所有 Javascript运行环境，如 Node.js服务器端。如果发现没有浏览器的API，路由强制进入这个模式

##### 基本原理

useRouter() 中的 push 和 replace 是手动调用内部路径切换方法 transitionTo，go、back、 forward 方法实际调用的是 window.history.go(), 以及浏览器的前进后退会触发相应的监听事件
然后调用 transitionTo， 之后更新路由， 触发 `<router-view>` 的重新渲染

- `hash` 模式是优先监听 popstate 事件，不行就降级为 hashchange 事件， `history` 模式监听 popstate 事件
- history.pushState() 和 history.replaceState() 修改浏览器历史栈后 url 改变但不会刷新页面， 不会触发 popstate 事件
- window.location.hash = '#/b' 修改 hash 不会刷新页面，会触发 hashchange 事件， hash的改变会自动添加到浏览器历史记录中

### Vue 路由模式 hash 和 history

##### hash

hash 模式是用 `createWebHashHistory()` 创建的

```javascript
import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    // ...
  ]
})
```

hash 模式在内部传递的实际URL之前使用了一个哈希字符(`#`)，

由于这部分 URL 从未被发送到服务器，所以它不需要在服务器里面进行任何特殊处理，对后端没啥影响

改变Hash值不会重新加载页面，因为浏览器可以通过`onHashChange()`事件监听Hash的辩护，从而实现前端路由切换

浏览器支持度友好，包括低版本IE浏览器，已经成为SPA标配

**原理**: Hash模式的主要原理是`onhashchange`事件，无需向后端发起请求，浏览器可以监听哈希值的变化，并按照规则加载相应的代码，同时，
Hash值的变化会被浏览器记录，实现页面的前进和后退功能

不过，**它在SEO中的确有不好的影响**

##### history

history就是 HTML5模式， 使用`createWebHistory()`创建 HTML5 模式，推荐使用这个模式

```javascript
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history:createWebHistory(),
  routes: [
    // ...
  ]
})
```

History模式的URL中没有`#`号，采用传统的路由分发模式，即用户输入 URL 时， 服务器接收请求并解析 URL， 然后进行相应的逻辑处理

当使用这种模式时， 会导致一个问题，由于我们是一个单页的客户端应用，如果没有适当的服务器配置，用户在浏览器中直接访问没有配置的路由时，会返回404

**API**: history模式使用 History API， 包括 `pushState()`和 `replaceState()`方法用于修改历史状态，以及 `forward()`、`back()`、`go()` 方法用于切换历史状态

##### 两者区别

- History模式优势

  `pushState()` 设置的新URL可以与当前URL同源的URL，而 Hash只能修改`#`的部分

  可以设置与当前URL一样的新的URL，将记录添加到栈中

  可以通过`stateObject`参数添加任意类型的数据到记录中，而Hash只能添加短字符串

  可以额外设置title属性供后续使用

- URL处理
  
  在Hash模式下，仅Hash符号之前的URL会被包含在请求中，后端如果没有覆盖所有路由，也不会返回404错误

### Vue 路由传参的两种方式，params 和 query方式与区别

##### 路由参数(params)

路由参数通常用于标识性的信息，如资源ID、用户ID等，他们直接包含在路由的路径中，这些参数作为路径的一部分，提供了对特定资源的访问

```javascript
// 路由定义
{
  path: '/user/:id'
  component: UseProfile
}
```

在页面中调用：

```javascript
router.push({path: '/user/123'})
```

**优点**

直观， 路由参数直接体现在url中，用户可以直接看到传递的信息

**缺点**

有限性，路由参数通常只能传递有限数量的信息，因为他们必须以路径的一部分存在

##### 查询参数(query)

查询参数适合用于传递非标识性信息，如筛选条件、搜索关键字、分页信息等，他们不包含在路由的路径中，而是作为键值对附加到URL后面

```javascript
// 导航到搜索页面并传递查询参数
router.push({ path: '/search', query: { q: 'vue', category: 'framework' } });
```

**优点**

查询参数可以传递多个键值对，因此更灵活，适用于各种场景。

查询参数式可选的，因此可以选择何时传递它们

**缺点**

查询参数不像路由参数那么直观，因为他们不包含在路径中，用户不容易传递信息

##### 何时使用

- **params**

  标识性信息：当需要传递标识性信息，如用户ID，帖子ID等，使用路由参数更合适

  确保信息直接可见：如果希望用户能够在URL中看到传递的信息，使用路由参数

- **query**

  非标识性信息：当需要传递筛选条件、搜索关键字、分页信息等非标识性信息时，查询参数更合适

  灵活性: 如果需要传递多个键值对或灵活地控制何时传递参数、使用查询参数

  非必要信息: 查询参数通常用于传递可选信息，不影响访问资源的关键性标识

### Vue 数据绑定的几种方式

##### 插值(interpolation)

插值是最基本的数据绑定方式之一，使用双大括号`{{}}`将变量插入到模版中

```vue
<script lang="ts" setup>
import { ref } from 'vue'

const message = ref<string>('hello world')
</script>

<template>
  <p>{{message}}</p>
</template>
```

##### 绑定属性(Binding Attributes)

使用 `v-bind` 指令可以将一个变量的值绑定到HTML元素属性上

```vue
<script lang="ts" setup>
import { ref } from 'vue'

const url = ref<string>('www.baidu.com')
</script>

<template>
  <div>
    <a v-bind:href="url">点击跳转</a>
  </div>
</template>
```

##### 动态类绑定(Dynamic Class Binding)

使用`v-bind:class`可以根据条件动态绑定类名

```vue
<script lang="ts" setup>
import { ref } from 'vue'

const isActive = ref<boolean>(false)
const hasError = ref<boolean>(false)
</script>

<template>
  <div v-bind:class="{'active': isActive, 'text-danger': hasError}">类名</div>
</template>

<style lang="scss" scoped>
.active {
  display: inline-block;
}
.text-danger {
  color: red
}
</style>
```

也可以使用数组语法

```vue
<script lang="ts" setup>
import { ref } from 'vue'

const isActive = ref<boolean>(false)
const hasError = ref<boolean>(false)
</script>

<template>
  <div v-bind:class="[isActive ? 'active': '', hasError ? 'text-danger' : '']">类名</div>
</template>

<style lang="scss" scoped>
.active {
  display: inline-block;
}
.text-danger {
  color: red
}
</style>
```

##### 动态样式绑定(Dynamic Style Binding)

使用 `v-bind:style` 可以根据条件动态绑定样式

```vue
<script lang="ts" setup>
import { ref } from 'vue'
const activeColor = ref<string>('red')
const fontSize = ref<number>(14)
</script>

<template>
  <div>
    <p v-bind:style="'color': activeColor; 'fontSize': fontSize + 'px'">样式信息</p>
  </div>
</template>
```

也可以使用对象语法

```vue
<script lang="ts" setup>
import { ref } from 'vue'

const activeColor = ref<string>('red')
const fontSize = ref<number>(14)
</script>

<template>
  <div :style="{ 'color': activeColor, 'font-size': fontSize + 'px' }">样式信息</div>
</template>
```

##### 表单输入绑定(Form input Binding)

使用`v-model` 可以实现表单输入和数据的双向绑定

```vue
<script lang="ts" setup>
import { ref } from 'vue'

const message = ref<string>('')
</script>

<template>
<form>
  <input v-model="message"/>
</form>
</template>
```

##### 事件绑定(Event Binding)

使用 `v-on` 可以将 DOM 事件绑定到 Vue 实例中的方法。

```vue
<script lang="ts" setup>
  const doSomething = ():void => {
    console.log('do something')
  }
</script>

<template>
  <button v-on:click="doSomething">Click me</button>
</template>
```

也可以使用缩写形式

```vue
<script lang="ts" setup>
  const doSomething = ():void => {
    console.log('do something')
  }
</script>

<template>
  <button @click="doSomething">Click me</button>
</template>
```

### Vue 的路由钩子函数/路由守卫有哪些

##### 全局路由钩子()

``

### Vue-cli 中如何自定义指令

### Vue 中指令

- [vue常用指令](../../frame/vue/vue指令)

### Vue 如何定义一个过滤器

### 对 Vue 中 keep-alive 的理解

- [keepalive](../../frame/vue/keepAlive)

### 如何让组件中的 css 在当前组件生效 (vue中 scoped 功能)

### Vue中的Data为什么是函数

### Vue双向绑定原理

### Vue组件传值

### 如果一个组件在多个项目中使用怎么办

### Vue 插槽

### Vue中的watch

### 计算属性与watch的区别

### MVVM与MVC的区别

### Vue 首屏加载慢的原因，怎么解决的，白屏时间怎么检测，怎么解决白屏问题

### Vue中 Route 与 router 区别

### Vue 路由懒加载（按需加载路由）

### v-for 与 v-if 优先级

### vue 在 created 和 mounted 这两个生命周期中请求数据有什么区别呢？

### 说说你对 proxy 的理解

### Vue3.0 是如何变得更快的？（底层，源码）

### Vuex

![Vuex](/svg/Vuex数据流向.svg)

Vuex 是一个专门为vue.js应用程序开发的状态管理模式，通过创建一个集中的数据存储，方便程序中的所有组件进行访问，是Vue的状态管理工具

Vuex有五个属性 *state* *getters* *mutations* *actions* *modules*

- *state*

  数据源存放地， 对应一般 vue 对象的 data， *state* 里存放的数据是响应式的， *state* 数据发生改变，对应这个数据的组件也会发生改变

- *getters*
  
  *getters* 相当于 store 的计算属性， 主要是对 *state* 中数据的过滤

- *mutations*
  
  *mutations* 放置了所有的处理数据逻辑的方法， 当触发事件想改变 *state* 数据的时候使用 *mutations*， 调用时添加一个参数 就是 *mutations* 的载荷

- *actions*
  
  *actions* 异步操作数据， 但是通过 *mutations*来操作，通过 *dispatch* 触发， *actions* 也支持载荷

- *modules*
  
  为了解决 *store*对象过于臃肿的问题， 将 *store* 分割成 *modules* 模块

### Vuex 怎么请求异步数据

### Vuex 中 action 如何提交给 mutation 的

### vuex 的优势
