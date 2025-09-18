# Keep-Alive

**定义**
keepAlive是一个内置组件，它的功能是在多个组件间动态切换时缓存被移除的组件实例，即使被包含的组件保留状态，或者避免重新渲染。

**用法**
`keep-alive`用法

```vue
<!-- 被keep-alive包含的组件会被缓存 -->
<template>
  <keep-alive>
    <component />
  </keep-alive>
</template>
```

被`keep-alive`包含的组件不会被再次初始化，也就意味着**不会重走生命周期函数**

但有时候希望缓存的组件能够再次进行渲染，针对这个问题， 在`Vue`中， 被`keep-alive`包含的组件， 会多出两个生命周期钩子:`activated`和`deactivated`

- `activated`: 当`keep-alive`包含的组件再次渲染的时候触发
- `deactivated`: 当`keep-alive` 包含的组件销毁的时候触发

**参数**
`keep-alive`参数类型：

```typescript
interface KeepAliveProps {
  /**
   * 如果指定，则只有与 `include` 名称
   * 匹配的组件才会被缓存。
   */
  include?: MatchPattern
  /**
   * 任何名称与 `exclude`
   * 匹配的组件都不会被缓存。
   */
  exclude?: MatchPattern
  /**
   * 最多可以缓存多少组件实例。
   */
  max?: number | string
}

type MatchPattern = string | RegExp | (string | RegExp)[]
```

keepAlive支持传入三个可选参数， 分别是 `include`、`exclude`、`max`

`keepAlive` 默认会缓存内部的所有组件实例, 但是可以通过 `include` 和 `exclude` 来定制该行为

- `include`
  支持传入 字符串、数组或者正则表达式， 名称匹配的组件**会被缓存**

```vue
<!-- 字符串 -->
<template>
  <keep-alive include="Child1,Child2">
    <component :is="componentName"></component>
  </keep-alive>
</template>

<!-- 正则 -->
<template>
  <keep-alive :include="/Child1|Child2/">
    <component :is="componentName"></component>
  </keep-alive>
</template>

<!-- 数组 -->
<template>
  <keep-alive :include="['Child1', 'Child2']">
    <component :is="componentName"></component>
  </keep-alive>
</template>
```

- `exclude`
  支持传入 字符串、数组、或者正则表达式， 名称匹配的组件则**不会被缓存**
  
```vue
<!-- 字符串 -->
<template>
  <keep-alive exclude="Child1,Child2">
    <component :is="componentName"></component>
  </keep-alive>
</template>

<!-- 正则 -->
<template>
  <keep-alive :exclude="/Child1|Child2/">
    <component :is="componentName"></component>
  </keep-alive>
</template>

<!-- 数组 -->
<template>
  <keep-alive :exclude="['Child1', 'Child2']">
    <component :is="componentName"></component>
  </keep-alive>
</template>

```

- `max`
  只支持传入数字， 表示最大支持缓存页面个数

```vue
<template>
  <keep-alive :max="5">
    <component :is="componentName"></component>
  </keep-alive>
</template>
```

**原理**
 `keep-alive`组件的实现原理是将被缓存的组件实例存储到一个缓存对象中，当需要重新渲染这个组件时，会从缓存中获取到之前的实例， 并将其重新挂载在DOM上。

从`Vue`的渲染看`keep-alive`的渲染

![Vue的渲染](/svg/keep-alive渲染.svg)

`Vue`的渲染是从图中`render`阶段开始的

但keep-alive的渲染是在patch阶段(构建组件树(虚拟DOM树)， 并将`VNode`转换成真正`DOM`节点的过程）

首次加载被包裹组件时，`vnode.componentInstance`的值是`undefined` 因为`keep-alive`组件作为父组件，它的render函数会优先于被包裹的组件先执行，后面逻辑不执行；

再次访问被包裹组件时， `vnode.componentInstance`的值就是已经缓存的组件的实例，之后会把上一次的DOM插入到父元素中

![keep-alive组件渲染流程](/svg/keep-alive渲染流程.svg)

## 引用

[vue3中keepalive源码](https://github.com/vuejs/core/blob/main/packages/runtime-core/src/components/KeepAlive.ts)
