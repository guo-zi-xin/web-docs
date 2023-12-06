# Keep-Alive

**定义**

keepAlive是一个内置组件，它的功能是在多个组件间动态切换时缓存被移除的组件实例

**参数**

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
  <keep-alive include="/Child1|Child2/">
    <component :is="componentName"></component>
  </keep-alive>
</template>

<!-- 数组 -->
<template>
  <keep-alive include="['Child1', 'Child2']">
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
  <keep-alive exclude="/Child1|Child2/">
    <component :is="componentName"></component>
  </keep-alive>
</template>

<!-- 数组 -->
<template>
  <keep-alive exclude="['Child1', 'Child2']">
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

### 引用

[vue3中keepalive源码](https://github.com/vuejs/core/blob/main/packages/runtime-core/src/components/KeepAlive.ts)