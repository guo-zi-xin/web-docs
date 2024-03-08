# watch 和 watchEffect的区别

![Vue侦听器](/svg/vue侦听器.svg)

## watch

**侦听一个或多个响应式数据源， 并在数据源变化时调用所给的回调函数**

> watch() 默认是懒侦听的， 即仅在侦听源发生变化时才执行回调函数

### watch参数

watch有三个参数： **侦听器的源**, **执行的回调函数**, **调整回调函数的操作**

##### 第一个参数(侦听器的源)

- 一个函数， 返回一个值
- 一个ref
- 一个响应式对象
- 或是由以上类型的值组成的数组

##### 第二个参数(发生变化时要调用的回调函数)

这个回调函数接收三个参数， **新值**、**旧值**、 **以及一个用于注册副作用清理的回调函数**， 该回调函数会在副作用下一次重新执行前调用， 可以用来清除无效的副作用，例如等待中的异步请求。

> **当侦听多个来源时， 回调函数接收两个数组，分别对应来源数组中的新值和旧值**

```javascript
watch([fooRef, barRef], ([foo, bar], [prevFoo, prevBar]) => {
  /** */
})
```

##### 第三个参数(watch属性值)

第三个参数是可选的， 是一个对象：

- **immediate**: 在侦听器创建时立即触发回调。 第一次调用时的旧值是 `undefined`
- **deep**: 如果源是对象， 强制深度遍历，以便在深层级变更时触发回调
- **flush**: 调整回调函数的刷新时机。
- **onTrack/onTrigger**: 调试侦听器的依赖

:::info **注意**

- **当直接侦听一个响应式对象时， 侦听器会自动启用深层模式：**

```javascript
const state = reactive({ count: 0 })

watch(state, () => {
  /** 深层级变更状态所触发的回调 */
})
```

- **侦听一个 getter 函数**
 当侦听一个 getter函数时， 回调只在此函数的返回值变化时才触发。 如果想让深层对象变化是， 也被侦听调用， 可以加 `{ deep: true }` 强制侦听器进入深层级模式

 ```javascript
const state = reactive({ count: 0 })

watch(() => state.count, (count, prevCount) => {
  /** ... */
}, { deep: true })
 ```

- **侦听一个ref**

```javascript
const count = ref(0)
watch(count, (count, prevCount) => {
  /* ... */
})
```

:::

## watchEffect

立即运行一个函数，同时响应式的追踪其依赖， 并在依赖更改时重新执行

### watchEffect参数

watchEffect有两个参数, 第一个参数是数据发生变化时执行的回调函数， 第二个参数是watchEffect的属性

##### 第一个参数

当监听的值发生变化时， 会自动再次执行以下回调函数

```javascript
watchEffect(() => {
  // 监听 objData.str
  console.log(objData.str)
  // 会在 props 变化时打印
  console.log(name, phone, age)
  // 木鱼 1234567 26
})

```

##### 第二个参数

第二个参数是一个可选的对象， 支持 flush 和 onTrack / onTrigger 选项， 功能和 watch 相同

```javascript
watchEffect(() => {}, {
  flush: 'post',
  onTrack(e) {
    debugger
  },
  onTrigger(e) {
    debugger
  }
})
```

#### 停止监听

```javascript
const stop = watchEffect(() => {})

// 当不再需要此侦听器时
stop()
```

:::info **注意**
watchEffect仅会在其同步执行期间， 才追综艺来。 使用异步回调时候， 只有在第一个await 之前访问的依赖才会被追踪
:::

## watch和 watchEffect

#### 区别

`watch` 和`watchEffect` 都能响应式地执行有副作用的回调。 他们之间的最要区别是追踪响应式依赖的方式：

- `watch` 只追踪明确侦听的数据源。 他不会追踪任何在回调中访问到的东西。 另外， 仅在数据源确定改
变时才会触发回调。 `watch` 会避免在发生副作用时追踪依赖， 因此， 我们能更加**精确地控制回调函数的触发时机**

- `watchEffect` 则会在副作用发生期间追踪依赖。他会在同步执行过程中， 自动追踪所有能够访问到的响应式属性。 这更方便，而且代码往往更加简洁， 但**有时其响应性依赖关系会不那么明确**

### 访问 Vue更新之后的DOM

**在vue2.x中使用nextTick， 在vue3中， watch/watchEffect 指明 flush 'post'选项即可**

```javascript
watch(source, callback, {
  flush: 'post'
})

watchEffect(callback, {
  flush: 'post'
})
```

watchEffect 有个别名， 也可以 后置刷新 watchPostEffect():

```javascript
import { watchPostEffect } from 'vue'

watchPostEffect(() => {
  /** 在Vue 更新后执行 */
})
```

## 小技巧

### 关闭监听器

手动停止一个侦听器， 请调用 watch 或 watchEffect 返回的函数

```javascript
const stopWatchEffect = watchEffect(() => {})
stopWatchEffect()


const stopWatch = watch(() => {})
stopWatch()
```

### 异步数据加载

如果需要等待一些异步数据，你可以使用条件式地侦听逻辑

```javaScript
// 需要异步请求得到的数据
const data = ref(null)

watchEffect(() => {
  if (data.value) {
    // 数据加载后执行某些操作
  }
})
```
