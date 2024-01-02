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

::: details MVVM与MVC的区别
`MVC`是*Model*-*View*-*Controller*的简写。即模型-视图-控制器。M和V指的意思和MVVM中的M和V意思一样。C即Controller指的是页面业务逻辑，
使用MVC的目的就是将M和V的代码分离。MVC是单向通信。也就是View跟Model，必须通过Controller来承上启下。

**两者区别**

MVC和MVVM其实区别并不大，都是一种设计思想， MVC和MVVM的区别并不是VM完全取代了C，只是在MVC的基础上增加了一层VM，不过是弱化了C的概念

ViewModel存在目的在于抽离Controller中展示的业务逻辑，而不是替代Controller，其它视图操作业务等还是应该放在Controller中实现，
也就是说MVVM实现的是业务逻辑组件的重用，使开发更高效，结构更清晰，增加代码的复用性。
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

---

##### `{ { } }`

模版插值`{ { } }` 将数据解析成纯文本，并不能显示输出 html

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

##### 全局路由钩子(Global Before Guards)

`beforeEach(to. from, next)` 在路由改变前触发，常用于全局的身份验证检查等

```javascript
const router = createRouter({ ... })

router.beforeEach((to, from, next) => {
  if (to.path === '/login') return next();
  //获取token
  const tokenStr = window.sessionStorage.getItem('token')
  if (!tokenStr) return next('/login')
  next()
})

```

##### 路由独享守卫(Per-Route Guards)

`beforeEnter(to, from, next)`：在某个路由独享的守卫。

##### 组件内守卫(In-Component Guards)

`beforeRouteEnter(to, from, next)`：在路由进入的时候，但是在组件渲染之前被调用。

`beforeRouteUpdate(to, from, next)`：在当前路由改变，但是该组件被复用时调用。

`beforeRouteLeave(to, from, next)`：导航离开该组件的对应路由时调用。

接收三个参数：

to: Route 对象，表示要进入的目标路由。

from: Route 对象，表示当前导航正要离开的路由。

next: 一个函数，用于进入下一个钩子。

`beforeResolve(to, from, mext)` 在导航被确认之前，也就是所有组件的`beforeRouterEnter` 被调用之后触发

在这些守卫中，通过调用 next 方法，可以控制路由导航的行为：

调用 `next()` 表示继续导航。

调用 `next(false)` 中止当前的导航。

调用 `next('/')` 或 `next({ path: '/' })` 重定向到一个不同的地址。

调用 `next(error)` 将会把导航终止，并把错误传递给 `router.onError` 注册过的回调。

```javascript
import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const router = new VueRouter({
  routes: [
    {
      path: '/home',
      component: Home
    },
    {
      path: '/dashboard',
      component: Dashboard
    },
    // ...其他路由配置
  ]
});

router.beforeEach((to, from, next) => {
  // 在进入每个路由前进行身份验证等操作
  if (to.path === '/dashboard' && !auth.isAuthenticated()) {
    next('/login'); // 未登录时重定向到登录页
  } else {
    next(); // 继续导航
  }
});

export default router;

```

### Vue 中如何自定义指令

vue中， 除了内置的一些列指令(如`v-model`和 `v-show`)之外， 还可以注册自定义的指令(Custom Directives)

自定义指令主要是为了重用涉及普通元素的底层DOM访问逻辑

##### 组成

一个自定义指令是由一个包含类似组件生命周期钩子的对象来定义，钩子函数会接收到指令所绑定元素作为其参数

```vue
<script setup lang="ts">
  // 在模版中启用 v-focus
  const vFocus = (
    mounted: (el) => el.focus()
  )
</script>

<template>
  <input v-focus/>
</template>
```

在`<script setup>`中，任何以`v`开头的驼峰事命名的变量都可以被用作一个自定义指令，但在没有使用`<script setup>`的情况下，自定义指令需要通过`directive` 选项注册

也可以注册到全局

```javascript
const app = createApp({})

// 使 v-focus在所有组件中都可用
app.directive('focus', {
  // ...
})
```

::: info TIP
只有当所需功能智能通过直接的 DOM 操作来实现时候，才应该使用自定义指令，其他情况下应该尽可能使用`v-bind`等内置指令来声明式地使用模版，这样更高效，也对服务端渲染更加友好
:::

### Vue 中指令

- [vue常用指令](../../frame/vue/vue指令)

### Vue 如何定义一个过滤器

:::danger 注意
  Vue3中， 过滤器这一概念已经被移除了，vue3变更为组合式API(Composition API)后, 移除了一些vue2中不太推荐使用的特性，包括全局过滤器, 官方建议用方法调用或计算属性替换自定义过滤器
:::

Vue 允许自定义过滤器，可被用于一些常见的文本格式化，过滤器可以用在两个地方，双花括号插值和 v-bind表达式， 过滤器应该被添加在Javascript表达式的尾部，由`管道`符号`'|'`表示

##### 注册过滤器方式

- **全局注册**

```javascript
 // Vue.filter() 注册一个自定义过滤器，它接收两个参数：过滤器 ID 和过滤器函数。过滤器函数以值为参数，返回
 // 转换后的值
 Vue .filter( 'reverse' , function (value) { 
   return value.split( '' ).reverse().join( '' )    
 })
     
 // 这样我们就可以在全局使用reverse过滤器了
 <span v-text = "message | reverse"></span>
```

- **局部注册**

```javascript
// 首先在共用文件里写好一个过滤方法，然后引入你的共用文件
  import util from '@/libs/util.methods'

  // 在你的页面代码里添加过滤器
  filters: {
    'filtersName': function (value) {
      // return你的共用过滤方法
      return util.YourFilterName(value)
    }
}
```

然后在 HTML 代码里面就可以使用管道符来调用这个过滤器了

```vue
<template>
  <div>{{ item.deviceGroupId | filtersName }}</div>
</template>
```

### 对 Vue 中 keep-alive 的理解

- [keepalive](../../frame/vue/keepAlive)

### Vue双向绑定原理

- [双向绑定](../../frame/vue/双向绑定原理)

### Vue组件传值

#### 父组件传递给子组件

- `引用组件` - `注册组件` - `使用组件` - `传递数据`

- 通过 自定义属性名="属性值" 的形式传递数据

##### setup 函数版本

**父组件**

```vue
<script lang="ts">
  import { reactive, toRefs } from 'vue'; // 引入声明依赖
  import child from '@components/child.vue'

  export default {
    name: 'AboutView',
    // 注册组件
    componsnet: { child },
    setup() {
      const data = reactive({
        text: '文字',
        list: [1, 2, 3, 4, 5]
      })

      return {
        // 解构输出
        ...toRefs(data)
      }
    }
  }
</script>

<template>
  <div class="box">
    <!-- 使用组件，通过： 自定义属性名="属性值"的形式传递 -->
    <child :text="text" :list="list"/>
  </div>
</template>

<style scoped lang="scss"></style>
```

**子组件**

- props接收父组件传递过来的数据， 是一个对象， 但是不要直接去找操作修改props的值
- type属性定义接收的数据类型
- default属性设置默认值， 在当前属性没有值传入时调用
- props也可以定义为 `props:['text', 'list']`
- 为了开启 对props类型的推导， 必须使用`defineComponent`

```vue
<script lang="ts">
  import { defineComponent } from 'vue' // 引入自动提示函数

  export default defineComponent({
    name: 'child',
    props: {
      text: {
        type: String,
        default: '默认展示'
      },
      list: {
        type: Array<number>,
        default: []
      }
    },

    // props 是一个对象，包含父组件传递给子组件的所有数据
    // context： 上下文，包括 attrs、emit、slots
    setup(props, context) {
      console.log(props.text, props.list)
    }
  })
</script>

<template>
  <div class="box">
    <div>{{ text }}</div>
    <div v-for="item in list" :key="item">{{ item }}</div>
  </div>
</template>

<style scoped lang="scss"></style>
```

##### setup标签版本

setup标签版本传递数据的方法还是跟函数版本一致，只是写法上有所不同：

**父组件**

```vue
<script setup lang="ts">
import { reactive, toRefs } from 'vue' // 引入
import assembly from '@/components/assembly.vue'

type IReactive = {
  list: number[],
  text: string
}

const data = reactive<IReactive>({
  text: '文本',
  list: [1, 2, 3, 4, 5]
})

const { text, list } = toRefs(data)
</script>

<template>
  <div class="box">
    <assembly :text="text", :list="list"/>
  </div>
</template>

<style scoped lang="scss"></style>
```

**子组件**

- 子组件接受通过`defineProps()` 接收父组件传递的值
- `type` 属性定义接受的数据类型
- `default`属性设置默认值，在当前属性没有值传入时调用
- 可通过`{ }`进行解构

```vue
<script setup lang="ts">
  import { defineProps } from 'vue'
  type IProps = {
    text: string,
    list: Array<number>
  }
  // 通过定义变量的接收或解构数据进行使用 接收的值可直接在 setup 语法糖中直接使用

// 直接使用变量
/*   const props = defineProps<IProps>({
    text: {
      type: String,
      default: '默认展示'
    },
    list: {
      type: Array,
      default: []
    }
  }) */

  // 直接解构参数

  const { list, text } = defineProps<IProps>({
    text: {
      type: String,
      default: '默认展示'
    },
    list: {
      type: Array,
      default: []
    }
  })

  console.log(text, list)
</script>

<template>
  <div class="box">
    <div>{{ text }}</div>
    <div v-for="item in list" :key="item">{{ item }}</div>
  </div>
</template>

<style scoped lang="scss"></style>
```

#### 子组件传递给父组件参数

##### setup函数 子组件传参版本

**子组件传值**

- setup函数中 context 的 emit 用于传递事件给父组件
- 第一个参数要为传递的参数名，第二个参数为传递的值

```vue
<script lang="ts">
  import { reactive, defineComponentt } from 'vue'
  interface IReactive {
    text: string
  }
  export default defineComponent({
    name: 'child',
    setup(props, context) {
      const data = reactive({
        text: '文本'
      })
    
      const transferParents = () => {
        context.emit('transfer', data.text)
      }
      return {
        transferParents,
      }
    }
  })
</script>
<template>
  <div class="nox">
    <buttom @click="transferParents">点击传值给父组件</buttom>
  </div>
</template>
```

**父组件接收**

- `引入组件` - `注册组件` - `定义事件` - `接收并使用传递的值`
- 父组件中使用自定义时间接收，自定义事件名称必须与子组件传递的一致(即登号前面名称一致)
- 等号后面的事件名称可自行定义
- 事件中通过默认参数接收使用子组件传递的值
- setup函数中的时间必须`return`输出才能使用

```vue
<script lang="ts">
import { reactive, toRefs } from 'vue'
import child from '@/components/child.vue'
interface IReactive {
  content: string
}
export default {
  name: 'AboutView',
  components: { child },
  setup() {
    // ...
    const data = reactive<IReactive>({
      content: ''
    })

    const takeOverChild = (event): void => {
      // 通过默认参数接收使用子组件的值
      console.log(event);
      data.content = event
    }

    return {
      ...toRefs(data),
      takeOverChild
    }
  }
}
</script>
<template>
  <div class="box">
    <!-- 父组件中使用自定义事件来进行接收，自定义事件名称必须与子组件传递的一致(即等号前面的属性名一致) -->
    <!-- 等号后面的属性值可以自定义 -->
    <child @transferparents="takeOverChild"/>
    <div>{{content}}</div>
  </div>
</template>
```

##### setup标签 子组件传参版本

**子组件**

```vue
<script setup lang="ts">
  import { reactive, defineEmits } from 'vue'
  interface IReactive {
    text : string
  }
  interface IEmits {}

  const emits = defineEmits<IEmits>()
  const data = reactive<IReactive>({
    text: '文本'
  })

  const transferParents = () => {
    emits('transferParents', data.text)
  }
</script>

<template>
  <div class="box">
    <button @click="transferParents">点击传值给父组件</button>
  </div>
</template>
```

**父组件接收**

- `引入组件` —— `定义事件` —— `接收并使用传递的值`
- 父组件中使用自定义事件接收，自定义事件名称必须与子组件传递的一致(即等号前面名称)
- 等号后面的事件名称可自行定义
- 事件中通过默认参数接收使用子组件传递的值
- setup语法糖中组件引入后使用，无需注册

```vue
<script lang="ts" setup>
import { reactive, toRefs } from 'vue'
import assembly from '@/components/assembly.vue'
interface IReactive {
  content: string
}

const data = reactive<IReactive>({
  content: ''
})

const takeOverChild = (event): void => {
  console.log(event);
  data.content = event
}

const { text } = toRefs(data)
</script>

<template>
  <div class="box">
    <!-- 父组件中使用自定义事件来进行接收，自定义事件名称必须与子组件传递的一致(即等号前面的属性名一致) -->
    <!-- 等号后面的属性值可以自定义 -->
    <child @transferparents="takeOverChild"/>
    <div>{{content}}</div>
  </div>
</template>
```

### Vue 插槽(slot)

简单来说就是子组件中的提供给父组件使用的一个`坑位`，用`<slot></slot>`表示， 父组件可以在这个坑位中填充任何模版代码，然后子组件中`<slot></slot>`就会被替换成这些内容：

```vue
<script lang="ts" setup>
import child from './Child.vue'
</script>

<template>
  <div>
    <Child>Hello world</Child>
  </div>
</template>
```

**子组件**

```vue
<template>
  <div>
    <p>1</p>
    <slot/>
    <p>2</p>
  </div>
</template>
```

子组件中的 `<slot/>` 就是父组件放在子组件中的内容 `Hello world`，当然可以放入任何内容，例如变量：

**父组件**

```vue
<script setup lang="ts">
  import { ref } from 'vue'
  import Child from './Child.vue'

  const msg = ref<string>('Hello world')
</script>
<template>
  <div>
    <Child>{{ msg }}</Child>
  </div>
</template>
```

这个效果跟上面示例的结果是一样的

::: info TIP

- **插槽**: 插槽在父子组件关系中放置在子组件中，插槽的内容是被在父组件中调用时传递过来的

- **插槽内容**: 插槽内容是在父组件中调用子组件时，具体要传递给子组件的值， 一般是放在子组件标签里面的

:::

##### 默认内容

在父组件中没有提供任何`插槽内容`的时候， 我们是可以为子组件的插槽指定默认内容的， 比如:

**子组件**

```vue
<template>
  <div>
    <slot>我是设置的默认内容</slot>
  </div>
</template>
```

**父组件**

```vue
<script lang="ts" setup>
  import Child from './Child.vue'
</script>

<template>
  <div>
    <!-- 如果不传值，那么最终结果就是展示子组件设置的默认内容 -->
    <Child></Child>
    <!-- 如果传值， 就是展示传入的内容 -->
    <Child>Hello world</Child>
  </div>
</template>
```

##### 具名插槽

很多时候一个插槽满足不了需求， 需要多个插槽，于是就有了具名插槽， 比如带有`name`属性的插槽`<slot name="test"/>`, 没有提供`name`的插槽 `<slot/>` 就被隐式地命名为 *default*。

在父组件中，我们可以使用添加了 `v-slot: xxx`(可简写为`#xxx`)指令的`template` 元素， 这个元素会将目标插槽的名字传递下去匹配对应插槽。例如:

**子组件**

```vue
<template>
  <div>
    <div>
      <slot name="monkey"/>
    </div>
    <div>
      <slot name="orange"/>
    </div>
    <div>
      <slot name="apple"/>
    </div>

  </div>
</template>
```

**父组件**

```vue
<script setup lang="ts">
import Child from './Child.vue'
</script>
<template>
  <div>
    <Child>
      <!-- #monkey 是 v-slot:monkey的缩写 -->
      <template #monkey>一只吗喽</template>

      <template #orange>敖润之子</template>

      <template #apple>小小苹果</template>
    </Child>
  </div>
</template>
```

> 具名插槽的顺序是不限制的，只需要写好模版命好名字，它就会自动去到它所对应的位置

##### 动态插槽

动态插槽就是插槽名变成了变量的形式，我们可以随时修改这个变量从而展示不同的效果。它的写法是`v-slot:[变量名]` 或者缩写为 `#[变量名]`

**父组件**

```vue
<script lang="ts" setup>
import { ref } from 'vue'
import Child from './Child.vue'

const slotName = ref<string>('monkey')
const orange = ref<string>('orange')
const apple = ref<string>('apple')
</script>
<template>
  <div>
    <Child>
      <!-- 等同于 #monkey -->
      <template #[slotName]>你不懂吗喽</template>

      <template #[orange]>西海龙王敖润之子</template>

      <template #[apple]>one more thing</template>
    </Child>
  </div>
</template>
```

##### 作用域插槽

插槽也可以像组件传递 props 那样， 在`slot`标签绑定属性从而传递给父组件中的`插槽内容`

**子组件**

```vue
<template>
  <div>
    <slot personName="malou" age="18"></slot>
  </div>
</template>
```

**父组件**

```vue
<script lang="ts" setup>
  import Child from './Child.vue'
</script>

<template>
  <div>
    <Child v-slot="slotProps">
      My Name is {{ slotProps.personName }} and I am {{ slotProps.age }} years old this year
    </Child>
  </div>
</template>

<!-- 也可以通过解构来获取数据 -->

<template>
  <div>
    <Child v-slot="{ personName, age }">
      My Name is {{ personName }} and I am {{ age }} years old this year
    </Child>
  </div>
</template>
```

:::warning 注意
作用域插槽不能绑定 `name` 属性，因为绑定了 `name` 成了具名插槽了。 同样具名插槽的`name`属性也不会传递给 `插槽内容`， 这种在父组件作用域中获取到了子组件作用域中的变量，可以认为作用域插槽
延伸了子组件数据的作用范围，所以这类能够借搜参数的插槽就被称为作用域插槽
:::

##### 具名作用域插槽

具名作用域插槽接收参数的方式是通过`template`的标签的指令`v-slot`的值获取的

```vue
<!-- 父组件 -->
<template>
  <div>
    <Child>
      <template #bigTurnip="bigTurnipProps">
        {{ bigTurnipProps.message }}
      </template>
    </Child>
  </div>
</template>
<script setup>
import Child from './Child.vue'
</script>

<!-- 子组件Child.vue -->

<template>
    <div>
        <!-- 大萝卜 -->
        <div>
            <slot name="bigTurnip" message="我是萝北"></slot>
        </div>
    </div>
</template>
```

### Vue watch

vue watch 用于侦听一个或者多个响应式数据源，并在数据源变化时调用所给的回调函数

##### 类型

```typescript
// 侦听单个来源
function watch<T>(
  source: WatchSource<T>,
  callback: WatchCallback<T>,
  options?: WatchOptions
): StopHandle

// 侦听多个值
function watch<T>(
  sources: WatchSource<T>[],
  callback: WatchCallback<T[]>,
  options?: WatchOptions
): StopHandle

type WatchCallback<T> = (
  value: T,
  oldValue: T
  onCleanup: (cleanupFn: () => void ) => void
) => void

type WatchSource<T> = 
| Ref<T>  // ref
| (() => T)  // getter
| T extends object
? T
: never //响应式对象

interface Watchoptions extends WatchEffectOptions = {
  immediate?: boolean // 默认值为false
  deep?: boolean //米哦认知为false
  flush?: 'pre' | 'post' | 'sync' // 默认值为pre
  onTrack?: (event: DebuggerEvent) => void
  onTrigger?: (event: DebuggerEvent) => void
}
```

##### 详细信息

`watch()` 默认是懒侦听的， 即仅在侦听起源发生变化时才执行回调函数

第一个参数是侦听器的源，这个源来自以下几种

- 一个函数，返回一个值
- 一个ref
- 一个响应式对象
- ...或者是由以上类型的值组成的数组

第二个参数是在发生变化时要调用的回调函数，这个回调函数接收三个参数：新值、旧值、以及一个用于注册副作用清理的回调函数， 该回调函数会在副作用下一次重新执行前调用，可以用来清除无效的副作用
例如等待中的异步请求

当侦听多个来源时，回调函数接收两个数组，分别对应来源数组中的新值和旧值

第三个参数是可选的，是一个对象，支持下面这些选项

- **immediate** : 在侦听器创建时立即触发回调，第一次调用时旧值是 `undefined`
- **deep**: 如果源是对象，强制深度遍历，以便在深层级变更时触发回调
- **flush**: 吊证回调函数的刷新时机
- **onTrack/onTrigger**: 调试侦听器的依赖

##### 示例

- **侦听一个 getter 函数**

```javascript
const state = reactive({ count: 0 })
watch(
  () => state.count,
  (value,preValue) => {
    /* ... */
  }
)
```

- **侦听一个ref**

```javascript
const count = ref(0)
watch(count, (value, preValue) => {
  /* ... */
})
```

- **侦听多个来源时，回调函数接收两个数组，分别对应来源数组中的新值和旧值**

```javascript
watch([fooRef, barRef], ([foo, bar], [preFoo, preBar]) => {
  /* ... */
})
```

- **深度遍历**

当使用getter函数作为源时，回调只在此函数的返回值变化时才会触发，如果想让回调在深层级变更时也能触发，你需要使用(`deep: true`) 强制侦听器进入深层级模式，在深层级模式时，如果回调函数
由于深层级的变更而被触发， 那么新值和旧值将会是同一个对象

```javascript
const state = reactive({ count: 0 })
watch(
  () => state,
  (newValue, oldValue) => {
    // newValue === oldValue
  },
  {
    deep: true
  }
)
```

- **当直接侦听一个响应式对象时，侦听器会自动启用深层模式**

```javascript
const state = reactive({ count: 0 })
watch(state, () => {
  /* 深层级变更状态所触发的回调 */
})
```

- **调试选项与刷新时机**

```javascript
watch(source, callback, {
  flush: 'post',
  onTrack(event) {
    debugger
  }
  onTrigger(event) {
    debugger
  }
})
```

- **停止侦听器**

```javascript
const stop = watch(source, callback)

// 当已不再需要该侦听器时
stop()
```

- **副作用清理**

```javascript
watch(id, async (newId, oldId, onCleanup) => {
  const { response, cancel } = doAsyncWork(newId)
  // 当 `id` 变化时候， cancel将被调用
  // 取消之前的未完成的请求
  onCleanup(cancel)
  data.value = await response
})
```

### 计算属性与watch的区别

`watch` 和 `computed` 都是 vue2/vue3中用于监听数据变化的属性

- **功能**: computed 是计算属性，适用于派生值的场景，它会缓存计算结果，只有在依赖的响应式数据变化时才重新计算； watch 是监听一个值的变化而执行对应的回调，
  适用于需要在数据变化时执行异步或复杂操作的场景

- **是否调用缓存**: computed 函数所依赖的属性不变的时候会调用缓存， watch 每次监听的值发生变化时都会调用回调

- **是否调用return**: computed 必须有， watch 可以没有

- **使用场景**: computed 当一个属性受多个属性影响的时候， 例如购物车商品结算；watch 一条数据影响多条数据的时候， 例如搜索框

- **是否支持异步**: computed 函数不能有异步 watch 可以

### Vue 首屏加载慢的原因，怎么解决的，白屏时间怎么检测，怎么解决白屏问题

- [首页白屏](../../frame/vue/首页白屏)

### Vue中 Route 与 router 区别

### Vue 路由懒加载（按需加载路由）

### vue 在 created 和 mounted 这两个生命周期中请求数据的区别

###  proxy

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
