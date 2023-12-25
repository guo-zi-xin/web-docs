# Vue生命周期

vue2 的生命周期与 vue3 的声明是有所区别的，

vue2 的生命周期主要是：

- beforeCreate
- created
- beforeMount
- mounted
- beforeupdate
- updated
- beforeDestroy
- Destroyed

而在 vue3 中， 在 vue2 的基础上做了一些改变， 主要是针对最后两个生命周期：

- beforeDestroy -> beforeunmount
- Destroyed -> Unmounted

另外， `options API` 和 `composition API` 在生命周期上也有一些小的不同：

`conposition API` 提供了 setup 函数作为入口函数， 替换了 `beforeCreate` 和 `created` 这两个生命周期钩子, 并且`setup()`在两者之间执行。

所以在实际开发中， 我们可以简单地把 `setup` 理解为 `created` 来使用

### Vue2

|生命周期钩子|描述|
|:--|:--|
|beforeCreate|组件实例被创建之初|
|createed|组件实例已被完全创建|
|beforeMount|组件挂载之前|
|mounted|组件挂载到实例上去之后|
|beforeUpdate|组件数据发生变化，更新之前|
|update|组件数据更新之后|
|beforeDestroy|组件实例销毁之前|
|destroy|组件实例销毁之后|
|activated|keep-alive 缓存的组件激活时|
|deactivated|keep-alive 缓存的组件停用时调用|
|errorCaptured|捕获一个来自子孙组件的错误时被调用|

![vue2生命周期](/svg/vue2生命周期.svg)

##### 具体分析

- **beforeCreate -> created**
  
  初始化 vue 实例，进行数据观测

- **created**

  完成数据观测，属性和方法的运算，`watch`、`event`事件回调的配置

  可调用 `methods`中的方法，访问和修改data数据触发响应式渲染 `dom` 可通过 `computed` 和 `watch` 完成数据计算

  此时 `vm.$el` 并没有被创建

- **created -> beforeMount**

  判断是否存在 `el` 选项， 若不存在则停止编译，直到调用 `vm.$mount(el)` 才会继续编译

  优先级： `render` > `template` > `outerHTML`

  `vm.el` 获取到的是挂载`DOM`的

- **beforeMount**

  在此阶段可获取到`vm.el`

  此阶段`vm.el`虽已完成DOM初始化， 但并未挂载在`el`选项上

- **beforeMount -> mounted**

  此阶段`vm.el`完成挂载，`vm.$el`生成的`DOM`替换了`el`选项所对应的`DOM`

- **mounted**

  此阶段`vm.el`完成挂载与渲染，此刻打印`vm.$el` 发现之前的挂载点及内容已被替换成新的DOM

- **beforeUpdate**

  更新的数据必须是被渲染在模版上的(`el`、`template`、`render`之一)

  此时 `view` 层还未更新

  若在`beforeUpdate` 中再次修改数据，不会再次触发更新方法

- **updated**

  完成 `view`层更新

  若在`update`中再次修改数据，会再次触发更新方法(`beforeUpdate`, `updated`)

- **beforeDestroy**

  实例被销毁前调用，此时实例属性与方法仍可访问

- **destroyed**
  
  完全销毁一个实例，可清理它与其他实例的连接，接棒他的全部指令以及事件监听器

  并不能清除DOM， 仅仅销毁实例

##### 题外话：数据请求在created和mouted的区别

`created`是在组件实例一旦创建完成的时候立刻调用，这时候页面`dom`节点并未生成；

`mounted`是在页面`dom`节点渲染完毕之后就立刻执行的。触发时机上`created`是比`mounted`要更早的，

两者的相同点：

都能拿到实例对象的属性和方法。 讨论这个问题本质就是触发的时机，放在`mounted`中的请求有可能导致页面闪动（因为此时页面`dom`结构已经生成），但如果在页面加载前完成请求，则不会出现此情况。
建议对页面内容的改动放在`created`生命周期当中。

### Vue3

在 Vue3 中， 除了 `setup()`替代了 `created` 和 `beforeCreate` 之外，

`beforeMount` 和 `mounted` 函数被替换成了 `onBeforeMount` 和 `onMounted`；

`beforeUpdate` 和 `update` 被替换为 `onBeforeUpdate` 和 `onUpdate`;  

`beforeDestroy`和 `destroyed`被替换为 `beforeUnmount` 和 `unmounted`。

这些钩子函数的执行顺序与vue2的版本相同，但有所不同的是，在vue3中，他们是使用ES6类定义的。

|生命周期钩子|描述|
|:--|:--|
|setup|替代了vue2中的 `created` 和 `beforeCreate`的作用|
|onBeforeMount|组件挂载之前|
|onMounted|组件挂载到实例上去之后|
|onBeforeUpdate|组件数据发生变化，更新之前|
|onUpdate|组件数据更新之后|
|beforeUnmount|组件实例卸载之前|
|unmounted|组件实例卸载之后|
|activated|keep-alive 缓存的组件激活时|
|deactivated|keep-alive 缓存的组件停用时调用|
|errorCaptured|捕获一个来自子孙组件的错误时被调用|

![vue生命周期](/svg/vue生命周期.svg)
