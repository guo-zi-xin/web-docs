# React相关

### 常用的React Hook

- **useState**

  用于管理功能组件中的状态

- **useEffect**

  用于在功能组件中执行副作用，例如获取数据或订阅事件

- **useContext**

  用于访问功能组件中React 上下文的值

- **useRef**

  用于创建对跨渲染保留的元素或值的可变引用

- **useCallback**

  缓存回调函数，避免在每次渲染时都创建新的回调函数实例

  当回调函数作为prop传递给子组件时，使用 useCallback可以确保子组件在依赖项未变化时不会因为接收到新的函数引起不必要的重新渲染。

  在某些情况下，可以配合 useMemo 使用， 将计算逻辑和函数绑定在一起，从而在依赖项不变时只计算一次

- **useMemo**

  用于缓存计算值，类似于 useCallback，但是它缓存的是普通数值而不是回调函数

- **useReducer**

  用于使用reducer函数的管理状态，类似于Redux的工作方式

- **useLayoutEffect**

  类似于 useEffect 但效果在所有DOM突变后同步运行

这些Hook提供了强大的工具，用于管理状态，处理副作用和重新编辑 React功能组件中的逻辑。

### 什么是虚拟DOM

虚拟DOM是React中的一个概念， 其中创建了实际DOM(文档对象模型)的轻量级虚拟表示。 它是一种用于优化web应用程序性能的编程技术。

当对React组件的数据火状态进行更改时， 虚拟DOM会更新，而不是直接操作真实的DOM。然后， 虚拟DOM计算组件先前状态和更新状态之间的差异，称为'差异'过程

一旦确定了差异，React就会有效地只更新真实DOM的必要部分以反映这些变化。这种方法最大限度的减少了实际DOM操作次数， 并提高了应用程序的整体性能。

通过使用虚拟DOM， React提供了一种创建动态和交互式用户界面的方法，同时确保最佳效率和渲染速度。

### Vue 与 react 区别

**相同点：**
都支持服务器渲染
都有虚拟 dom，组件化开发，通过 props 参数进行父子组件数据的传递，都实现 webcomponent 规范
都是数据驱动视图
都有状态管理，react 有 redux，vue 有 vuex
都有支持 native的方案 react 有 react native vue 有 weex

**不同点：**
react 严格上只针对 mvc 的 view 层，vue 是 mvvm 模式
虚拟 dom 不一样，vue 会跟踪每一个组件的依赖关系，不需要重新渲染整个 dom 组件树，而 react 不同，当应用的状态被改变时，全部组件都会重新渲染，所以 react 中用 shouldcomponentupdate 这个生命周期的钩子函数来控制
组件写法不一样 ，react 是 jsx 和 inline style ，就是把 html 和 css 全写进 js 中，vue 则是 html，css ，js 在同一个文件
数据绑定不一样，vue 实现了数据双向绑定，react 数据流动是单向的在 react 中，state 对象需要用 setstate 方法更新状态，在 vue 中，state对象不是必须的，数据由 data 属性在 vue 对象中管理

### 受控组件和非受控组件的区别

受控组件的与非受控组件之间的区别在于它们如何管理和更新其状态。

受控组件是状态通过React控制的组件， 组件接收其当前值并通过props来更新它。当值更改时，它还会触发回调函数。这意味着组件不存储自己的内部状态。 相反， 父组件管理该值并将其向下传递到受控组件。

```tsx
import { useState } from 'react'

const App = ():React.FC => {
  const [value, setValue] = useState<string>('')
}

return (
  <div>
    <h3>Controlled Component</h3>
    <input name='name' value={name} onChange={e => setValue(e.target.value)}>
    <button onClick={() => console.log(value)}>Get Value</button>
  </div>
)
```

另一方面，不受控制的组件使用refs 或其他方法在内部管理自己的状态。它们独立存储和更新其状态，而不依赖于 props 或回调。 父组件对不受控制的组件的状态的控制较少

```jsx
import { useRef } from 'react'

const App = (): React:FC => {
  const inputRef = useRef(null)

  return (
    <div className='App'>
      <h3>Uncontrolled Conponent</h3>
      <input type='text' 
      name='name' ref={ inputRef }/>
      <button onClick={() => console.log(inputRef.current.value)}>Get Value</button>
    </div>
  )
} 
```

### React 组件之间的数据传递

### diff 算法

### 对 React 组件的理解

### 调用 setState 之后发生了什么

### react 生命周期函数

### 为什么虚拟 dom 会提高性能

### (组件的)状态(state)和属性(props)之间有何不同

### shouldComponentUpdate 是做什么的

### react diff 原理

### 何为受控组件

### React 中构建组件的方式

### 简述 flux 思想

### React 脚手架

### 应该在 React 组件的何处发起 Ajax 请求

### 何为高阶组件(higher order component)？

## 其他

### Typescript 是什么

### Typescript 与 javascript 的优势

### Webpack 与 gulp 区别

### 请简述 webpack 中的 loaders 与 plugin 的区别

### 怎么提升页面性能？性能优化有哪些

### Node 使用来做什么的

### 说一下 webpack 的打包原理

### Commonjs ES6 模块区别

### Git 如何使用/常用指令有哪些

### 你的项目比较小为什么还是用 vue 全家桶

### 什么是 cors

### 说一下对 websocked 的理解

### 后台传递过来的数据是那些

### 谈谈 Ajax，fetch，axios 的区别

### fetch VS ajax VS axios
