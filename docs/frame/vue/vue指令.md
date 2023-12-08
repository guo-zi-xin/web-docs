# Vue 指令

### 定义

  vue指令（`Directives`）是一种特殊的标记，用于在模板中以声明式的方式将某些行为应用到`DOM`上。指令以 `v-` 开头，后面跟着指令的名称，例如 `v-bind`、`v-if` 等。Vue.js提供了一些内置的指令，同时也允许开发者自定义指令。

  指令attribute的期望值是一个Javascript表达式（除了极少数个例外， 例如`v-for`、`v-on`和`v-slot`。一个指令的任务是在其表达式的值变化时对DOM进行响应式更新， 例如：

  ```vue
    <p v-if="seen">Nou you see me</p>
  ```

- **参数`Arguments`**

某些指令有时候需要一个“参数”， 在指令名后通过一个冒号隔开作为标识。例如用`v-bind`指令来响应式地更新一个HTML的attribute：

```vue
  <a v-bind:href="url">...</a>
  <!-- 简写 -->
  <a :href="url">...</a>
```

这里的`href`就是一个参数，它告诉`v-bind`指令将表达式`url`的值绑定到元素的`href`attribute上，在简写中，参数前的一切（例如`v-bind`）都会被忽略为一个`:`字符。

另一个例子是`v-on`指令，它将监听DOM事件：

```vue
  <a v-on:click="doSomething">...</a>

  <!-- 简写 -->
  <a @click="doSomething">...</a>
```

这里的参数是要监听的事件名称：`click`. `v-on`有一个相应的缩写，即`@`字符。

- **动态参数**

同样在指令参数上也可以使用一个Javascript的表达式，需要包含在一个方括号内：

```vue
  <a v-bind:[attributeName]="url">...</a>

  <!-- 简写 -->
  <a :[attributeName]="url">...</a>
```

这里的`attributeName` 会作为一个Javascript的表达式被动态执行,计算得到的值会被用作最终的参数。举例来说，如果你的足见实例有一个数据属性`attributeName`，其值为`"href"`，那么这个绑定就等价于`v-bind:href`。

相似地， 还可以将一个函数绑定到动态事件名称上：

```vue
 <a v-on:[eventName]="doSonething">...</a>

 <!-- 简写 -->
 <a @[eventName]="doSomething">...</a>
```

在此示例中，当`eventName`的值是`“focus”`时， `v-on:[eventName]`就等价于`v-on:focus`。

- *动态参数的限制*

  动态参数中的表达式的值应该是一个字符串， 或者`null`，特殊值`null`意为显式移除该绑定。其他非字符串的值会触发警告。

- *动态参数语法限制*

  动态参数表达式因为某些自负的缘故有一些语法限制，比如`空格`与`引号` 在HTML attribute 名称中都是不合法的， 例如下面的示例：

  ```vue
    <!-- 这会触发一个编译器警告 -->
    <a :['foo' + bar]="value">...</a>
  ```

  如果需要传入动态的复杂参数， 推荐使用vue的**计算属性**。

  当使用  DOM 内嵌模版（直接写在HTML文件里的模版）时， 需要避免在名称中使用大写字母， 因为浏览器会强制将其转换为小写：

  ```vue
    <a :[someAttr]="value">...</a>
  ```

  上面的例子将会在 DOM 的内嵌模版中转换为`:[someattr]`。 如果组件中拥有“someAttr”属性而非 “someattr”， 这段代码将不会工作。 但文件内的模版不受此限制。

- **修饰符（Modifiers）**

  修饰符是以点开头的特殊后缀， 表明指令需要以一些特殊的方式被绑定。 例如`.prevent`修饰符会告知`v-on`指令对触发的事件调用 `event.preventDefault()`:

  ```vue
    <form @submit.prevent="onSubmit">...</form>
  ```

### 常见的vue指令

![常见vue指令](/image/vue基本指令.png)

#### **`v-show`/`v-if`**

**`v-show`与 `v-if`的区别**

- `v-if`

  `v-if`是‘真实’的条件渲染， 因为他确保了在切换时， 条件区块内的事件监听和子组件都会被销毁与重建。

  `v-if`是**惰性**的， 如果初次渲染时条件值为**false**， 那么它不会做任何事，条件区块只有当条件首次变为true才会被渲染

    是基于表达式的真假性，来条件性地渲染元素或者模版片段。

    当`v-if`元素被触发， 元素及其所包含的指令/组件都会销毁或重构， 如果初始条件是假， 那么其内部的内容根本不会被渲染。

- `v-show`

  `v-show` 是无论初始条件如何，它都会被渲染， 只有CSS `display`会被切换。

  是基于表达式的真假性， 来改变元素的可见性。

  `v-show` 通过设置内联样式的`display`CSS属性来触发工作， 当元素可见时将使用初始的`display`的值。

::: warning 总结
  `v-if`有更高的切换开销，而`v-show`有更高的初始渲染开销。 因此， 如果需要频繁的切换，则使用`v-show`较好； 如果在运行时绑定条件很少改变，则`v-if`更合适。
:::

#### **`v-for`**

  基于原始数据多次渲染元素或模板块。

- **期望绑定值类型:** `Array | Object | Number | String | Iterable`

指令值必须使用特殊语法`alias in expression`为正在迭代的元素提供一个别名：

```vue
<div v-for="item in items">{{item.text}}</div>
```

或者 也可以为索引指定别名（如果是对象， 则是键值）:

```vue
<div v-for="(item, index) in items"></div>
<div v-for="(value, key) in object"></div>
<div v-for="(value, name, index) in object"></div>
```

`v-for`的默认方式是尝试就地更新元素而不移动他们，要强制其重新排序元素，则需要使用特殊attribute `key`来提供一个排序提示：

```vue
<div v-for="item in items" :key="item.id">{{item.text}}</div>
```

::: danger `v-for`与`v-if`优先级
  当`v-for`与`v-if`同时使用时， `v-if`比 `v-for`的优先级更高。 并且不推荐在同一元素上使用这两个指令， 因为同时使用时会抛出一个错误：

  ```vue
  <template>
    <ul>
      <li v-for="user in users" v-if="user.isActive" :key="user.id">
        {{ user.name }}
      </li>
    </ul>
  </template>
  ```

  上述示例中，会抛出一个错误， 因为`v-if`会先被执行， 而`v-if`的条件表达式中的`user`此时不存在。

  这个问题可以通过迭代计算属性来解决：

  ```vue
    <script lang="ts" setup>
      onComputed(()=> {
        activeUsers() {
          return this.users.filter(user => user.isActive)
        }
      })
    </script>
    <template>
      <ul>
        <li v-for="user in activeUsers" :key="user.id">
          {{ user.name }}
        </li>
      </ul>
    </template>
  ```

  或者使用`<template>`标签添加`v-for`来包装`<li>`元素：

  ```vue
  <template>
    <ul>
      <template v-for="user in users" :key="user.id">
        <li v-if="user.isActive">
          {{ user.name }}
        </li>
      </template>
    </ul>
  </template>
  ```

:::

#### **`v-bind`**

动态地绑定一个或多个attribute， 也可以是组件的prop参数。

- 修饰符

  - `.camel` 将短横线命名的attribute变更为驼峰式命名
  - `.prop` 强制绑定为DOM property
  - `.attr` 强制绑定为DOM Attribute

- 用途
  当用于绑定`class`或`style`attribute,`v-bind`支持额外的值类型， 如数组或者对象。

  在处理绑定时， Vue会默认利用`in`操作服来检查该元素上是否定义了和绑定了key同名的DOM property。 如果存在同名的 property， 则Vue会将它作为DOM property的赋值， 而不是作为attribute设置。

  当用于组件props绑定时， 所绑定的props必须在子组件中已被正确声明。

  当不带参数使用时， 可以用于绑定一个包含了多个 attribute名称-绑定值 对的对象。

  ```vue
    <template>
    <!-- 绑定 attribute -->
    <img v-bind:src="imageSrc" />

    <!-- 动态 attribute 名 -->
    <button v-bind:[key]="value"></button>

    <!-- 缩写 -->
    <img :src="imageSrc" />

    <!-- 缩写形式的动态 attribute 名 -->
    <button :[key]="value"></button>

    <!-- 内联字符串拼接 -->
    <img :src="'/path/to/images/' + fileName" />

    <!-- class 绑定 -->
    <div :class="{ red: isRed }"></div>
    <div :class="[classA, classB]"></div>
    <div :class="[classA, { classB: isB, classC: isC }]"></div>

    <!-- style 绑定 -->
    <div :style="{ fontSize: size + 'px' }"></div>
    <div :style="[styleObjectA, styleObjectB]"></div>

    <!-- 绑定对象形式的 attribute -->
    <div v-bind="{ id: someProp, 'other-attr': otherProp }"></div>

    <!-- prop 绑定。“prop” 必须在子组件中已声明。 -->
    <MyComponent :prop="someThing" />

    <!-- 传递子父组件共有的 prop -->
    <MyComponent v-bind="$props" />

    <!-- XLink -->
    <svg><a :xlink:special="foo"></a></svg>
  </template>
  ```

  `.prop`修饰符也有专门缩写：

  ```vue
  <div :someProperty.prop="someObject"></div>

  <!-- 等同于 -->
  <div .someProperty="someObject"></div>
  ```

  当在 DOM 内模板使用 `.camel` 修饰符，可以驼峰化`v-bind` attribute 的名称，例如 SVG `viewBox` attribute：

  ```vue
  <svg :view-box.camel="viewBox"></svg>
  ```

#### **`v-model`**

  用于在表单控件或者组件上创建双向数据绑定.

- 修饰符

  - `.lazy` 监听`change`事件而不是`input`
  - `.number`将输入合法字符串转为数字
  - `.trim` 移除输入内容两端空格

  ```vue
  <template>
    <input v-model="message" placeholder="编辑我">
    <p>消息是: {{ message }}</p>
  </template>

  <script lang="ts" setup>
    const message = ref('')
  </script>
  ```

#### **`v-on`**

  指令用于监听 DOM 事件。

- 修饰符

  - `.stop` 调用 `event.stopPropagation()`
  - `.prevent` 调用 `evemt.preventDefault()`
  - `.capture` 在捕获模式中调用事件监听器
  - `.self` 只有事件从元素本身发出菜触发处理函数
  - `.{keyAlias}` 只在某些案件下触发处理函数
  - `.once` 最多触发一次处理函数
  - `.left` 只在鼠标左键事件触发处理函数
  - `.right` 只在鼠标右键事件触发处理函数
  - `.middle` 只在鼠标中键事件触发处理函数
  - `.passive` 通过 `{passive: true}`附加一个DOM事件

  事件类型由参数来指定。表达式可以是一个方法名， 一个内联升明，如果有修饰符可以省略

  当用于普通元素， 只监听原生DOM事件， 当用于自定义元素组件， 则监听子组件出发的自定义事件

  当监听原生DOM事件时， 方法接收原生事件作为唯一参数。如果使用内联声明， 生命可以访问一个特殊的`$event`变量：`v-on:click="handle('ok', $event)"`。

  `v-on`还支持绑定不带参数的事件/监听器的对象。 请注意，**当使用对象语法时， 不支持任何修饰符**。

```vue
<template>
  <!-- 方法处理函数 -->
  <button v-on:click="doThis"></button>

  <!-- 动态事件 -->
  <button v-on:[event]="doThis"></button>

  <!-- 内联声明 -->
  <button v-on:click="doThat('hello', $event)"></button>

  <!-- 缩写 -->
  <button @click="doThis"></button>

  <!-- 使用缩写的动态事件 -->
  <button @[event]="doThis"></button>

  <!-- 停止传播 -->
  <button @click.stop="doThis"></button>

  <!-- 阻止默认事件 -->
  <button @click.prevent="doThis"></button>

  <!-- 不带表达式地阻止默认事件 -->
  <form @submit.prevent></form>

  <!-- 链式调用修饰符 -->
  <button @click.stop.prevent="doThis"></button>

  <!-- 按键用于 keyAlias 修饰符-->
  <input @keyup.enter="onEnter" />

  <!-- 点击事件将最多触发一次 -->
  <button v-on:click.once="doThis"></button>

  <!-- 对象语法 -->
  <button v-on="{ mousedown: doThis, mouseup: doThat }"></button>
</template>

```

监听子组件的自定义事件（当子组件的‘my-event’）被触发，处理函数将被调用：

```vue
<template>
  <MyComponent @my-event="handleThis" />

  <!-- 内联声明 -->
  <MyComponent @my-event="handleThis(123, $event)" />
</template>
```
