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

另一方面，不受控制的组件使用refs 或其它方法在内部管理自己的状态。它们独立存储和更新其状态，而不依赖于 props 或回调。 父组件对不受控制的组件的状态的控制较少

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

### 基于类的 React 组件和函数式组件有什么区别

基于类的组件和函数组件之间的主要区别在于它们的定义方式以及它们的使用方法

React.Component基于类的组件被定义为ES6类并扩展该类。它们使用render该方法返回定义组件输出的JSX (Javascript XML) 类组件可以通过`this.state`和 `this.setState()` 访问组件生命周期方法和状态管理

```jsx
class App extends React.Component {
  state = {
    value: 0,
  }

  handleAgeChange = () => {
    this.setState({
      value: this.state.value + 1
    })
  }

  render() {
    return (
      <>
        <p>Value is {this.state.value}</p>
        <button onClick={this.handleAgeChange}>
          Increment value
        </button>
      </>
    )
  }
}
```

另一方面， 功能组件被定义为简单的JavaScript函数。它们将 props 作为参数并直接返回JSX 功能组件无权访问生命周期方法或状态。然而随着 React16.8 中 React Hooks 的引入，功能组件现在可以管理状态并使用其它功能，例如上下文当中的效果展示

```javascript
import { useState } from 'react'

const App = () => {
  const [value, setValue] = useState(0)

  const handleAgeChange = () => {
    setValue(value + 1)
  }

  return (
    <>
      <p>Value is {value}</p>
      <button onClick={handleAgeChange}>
        Increment value
      </button>
    </>
  )
}
```

一般来说，功能组件被认为更简单，更易于阅读和测试。建议尽可能使用功能组件，除非对基于类的组件有特定需求

### 组建的生命周期方法是什么

生命周期方法是一种挂接到组件生命周期不通阶段的方法，允许你在特定时间执行特定的代码。

|生命周期|功能|
|:--|:--|
|`constructor`|这是创建组件时调用的第一个方法。它用于初始化状态和绑定事件处理程序。在功能组件中，可以将钩子 `useState` 用于类似的目的|
|`render`|此方法负责渲染JSX标记并返回要在屏幕上显示的内容|
|`componentDidMount`|此方法在组件DOM中呈现后会立即调用。它通常用于初始化任务，例如 API 调用或设置事件侦听器|
|`componentDidUpdate`|当组件的 props 或状态更改时调用此方法。它允许执行副作用、根据更改更新组件或触发其它API调用|
|`componentWillUnmount`|此方法在从DOM中删除组件之前调用。它用于清理`componentDidMount`中设置的任何资源，例如删除事件侦听器或取消计时器|

某些生命周期方法(如`componentWillMount`、`componentWillReceiveProps`和 `componentWillupdate`)已经被弃用或替换为替代方法或挂钩

至于`this` 它指的是类组件的当前实例。它允许访问组件中的属性和方法。在功能组件中， 不使用 `this` 因为函数未绑定到特定实例。

### 使用 `useState` 有什么特点

useState 返回一个状态值和一个用于更新它的函数

```javascript
const [value, setValue] = useState('default')
```

在初始呈现期间，返回的状态与作为第一个参数传递的值匹配。该函数用于更新状态。它将新的状态值作为参数，并对组件的重新渲染进行排队。该函数还可以接受回调函数作为参数，该函数讲以前的状态值作为参数。

### 使用 `useEffect` 有什么特点

useEffect钩子允许在功能组件中执行副作用

突变、订阅、计时器、日志记录和其它副作用不允许在称为React 渲染阶段的功能组件的主体内出现。这可能会导致用户界面出现令人困惑的错误和不一致

相反，建议使用useEffect。 传递给 useEffect 的函数将在渲染提交到屏幕后执行，或者如果将依赖项数组作为第二个参数传递， 则每次其中一个依赖项更改时都会调用该函数

```javascript
useEffect(() => {
  console.log('Loading something')
}, [])

/**
 * 当数组中有参数时， 参数更改一次，useEffect执行一次
 */
const [value, setValue] = useState('') 
useEffect(() => {
  console.log('Loading something')
}, [value])
```

### 如何跟踪功能组件的卸载

通常 useEffect 创建需要在组件离开屏幕之前清理或重置的资源，例如订阅或计时器标识符。

为此 传递给useEffect 的函数可以返回一个清理函数，清理功能能在从用户界面中删除组件之前运行，以防止内存泄漏。此外，如果组件多次渲染，则在执行下一个小郭之前， 清除上一个效果。

```javascript
useEffect(() => {
  function handleChange(value) {
    setValue(value)
  }

  SomeAPI.undoFunction(id, handleChange)

/**
 * 这里这个return 的函数就是清理副作用的函数
 */
  return function cleanup() {
    SomeAPI.undoFunction(id, handleChange)
  }
})
```

### React 中的道具(props)是什么

Props 是从父级传递给组件的数据。 Props是固定的， 不能被更改

```javascript
// Parent component
const Parent = () => {
  const data = 'Hello World !'
  
  return (
    <div>
      <Child/>
    </div>
  )
}

// Child Component

const child = ({ data }) => {
  return <div>{ data }</div>
}

```

### 什么是State管理器，曾与哪些库相连

状态管理器是帮助管理应用程序状态的工具或库。它提供了一个集中式存储或容器，用于存储和管理可由应用程序中的不同组件访问和更新的数据

状态管理器可以解决几个问题。首先，将数据及其相关逻辑与组件分开是一种很好的做法。其次，当时用本地状态并在组件之间传递它时， 由于组件深度潜逃的可能性， 代码可能会变得复杂。通过拥有全局存储， 我们可以访问和修改来自任何组件的数据。

除了React Context， Redux通常作为状态管理库

### 在哪些状态下可以使用本地状态，何时应该使用全局状态

如果本地状态仅在一个组件中使用，并且没有后计划将其传递给其它区组建，则建议使用本地状态。本地状态也用于表示列表中单个项的组件中。

但是 如果组件分解涉及嵌套组件，并且数据在层次结构中向下传递，则最好使用全局状态。

### Redux 的 reducer 是什么，它需要哪些参数

reducer是一个纯函数，它将状态和动作作为参数。在 reducer 内部， 我们跟踪接收到的动作的类型，并根据它修改状态并返回一个新的状态对象

```javascript
export default function appReducer(state = initialStale, action) {
  // Reducer 通常会查看 action 来决定发生了什么
  switch (action.type) {
    // 基于不同的action类型做一些不同的事情
    default: 
    // 如果这个 reducer 没有匹配的action 类型，或者不关心这个action的改变， 则 返回现有的状态
    return state
  }
}
```

### 什么是 action , 如何更改Redux的状态

Action是一个简单的 JavaScript 对象， 它必须具有类型字段

```javascript
{
  type: 'SOME_TYPE'
}
```

也还可以选择天机一些数据作为载荷(payload) 为了更改状态，必须调用函数， 我们将操作传递给该函数

```javascript
{
  type: 'SOME_TYPE',
  payload:'Any Payload'
}
```

### Redux 实现了哪种模式

Redux实现了 Flux 模式 这是一种可以预测的应用程序状态管理模式，它通过引入单向数据流和应用程序状态的集中存储来帮助管理应用程序的状态。

### 简述 Flux 思想

Flux 是一种用于数据处理的编程模型，它旨在处理流式数据和大规模数据集。 Flux 提供了一种功能强大且灵活的方式来处理数据流，并允许用户进行数据转换、过滤、聚合和其他操作。 通过Flux，用户可以构建复杂的数据处理管道，处理实时的数据流或者批处理数据，并支持并行处理和分布式计算。

FLux 在数据工程和数据科学领域被广泛应用，特别是在需要处理大量数据和实时数据的场景中具有很高的实用性。

### Axios Fetch 和 Ajax区别

这三者都是用于发起网络请求的工具或技术，但他们有一些区别：

- Ajax

  - Ajax(Asyncchronous Javascrip and XML) 是一种使用 XMLHttpRequest对象与服务器进行异步通信的技术

  - Ajax可以实现在不重新加载整个页面的情况下更新部分页面内容

  - Ajax是一种基于原生JavaScript的技术， 相对来说比较底层，并且需要开发者处理一些底层逻辑细节

- Fetch

  - Fetch是现代浏览器提供的一种用于发起网络请求的API 使用Promise对象处理异步操作

  - Fetch更加简洁和现代化，提供了更有好的API来处理网络请求

  - Fetch API 相对于Ajax更加强大和灵活。支持流式数据， CORS和其他现代特性

- Axios

  - Axios是一个基于Promise的HTTP客户端，可以用于浏览器和Node.js环境

  - Axios提供了更多的功能和配置选项，如拦截器、取消请求、CSRF防护等

  - Axios兼容更多的浏览器，并提供了更好的错误处理机制。

主要区别在于他们的实现方式、功能和使用方式。 Ajax是一种基于浏览器原生功能的编程技术，而Fetch和Axios是专门的两个库，用于处理Http请求， 并提供了更丰富的功能和更简单的API。

Fetch 是浏览器原生提供的API， 而Axios则是一个第三方库， 可以在浏览器和Node.js中使用。

### React Hooks 为什么不能放在if 和 for 里

React Hooks是 React16.8版本新增的特性它可以让函数组件既有类组件的状态和生命周期管理能力。再使用 React Hooks时，需要遵循一些规则，其中一个重要的规则是不能将 Hooks放到条件判断语句、循环语句等代码块中。

这是因为React需要依赖Hook调用的顺序来却顶Hook对应的状态，如果Hook调用的顺序发生改变，可能会导致程序出现错误或不符合预期的行为。

而在 if 和 for 中， 由于他们的执行次数是动态的， 可能会导致Hook的调用顺序发生改变，从而引发问题。 例如，在某个循环中使用 useState Hook， 由于循环次数是不固定的， Hook的调用顺序也就无法确定，会导致状态更新混乱。

因此，为了确保 Hook的正确性， React需要在编译期间对Hook的调用顺序进行静态分析，从而确保每个Hooks对应状态都是稳定的。因此不能将Hook放置在条件语句和循环语句中，只能在函数组件的顶层作用域中使用Hook。

### React 组件之间的数据传递

- **Props**

最常见的一种方式是通过 props 将数据从父组件传递到子组件。父组件可以将数据作为属性传递给子组件，并且子组件可以通过`this.props`来访问这些数据。

```javascript
import React from 'react'
import ChildComponent from './ChildComponent'


```

### Diff 算法

Diff算法是一种用于比较两个数据结构(通常是树或数组)之间的差异的算法。在前端开发中，Diff算法通常用于虚拟DOM的比较和更新，以提高页面性能和响应速度

在React和其他虚拟DOM中， Diff算法的主要目标是在进行UI更新时，尽可能高效地识别需要进行实际 DOM 更新的部分，从而避免不必要的重绘和重新排版。

Diff算法的一般流程如下

1. **生成虚拟DOM树**

  首先，将当前的DOM结构抽象为虚拟DOM树，并且生成待更新的新虚拟DOM树
2. **比较两个虚拟DOM树**

  对两棵虚拟DOM树进行深度优先的便利，比较相应节点的差异
3. **标记差异**

  在比较过程中，标记处需要进行更新的节点和操作，例如插入、删除或更新。
4. **批量更新实际DOM**

  根据标记的差异，批量更新实际的DOM结构，以减少重绘和重新排版的DOM开销

Diff算法的优化和实现可以大大影响页面性能和用户体验。因此，许多前端开发框架和库都致力于改进Diff算法，以提供更高效的UI更新机制。

### 为什么虚拟 DOM 会提高性能

  虚拟DOM没有立即更新真的DOM，是先把DOM结构抽象成DOM树，通过比较两棵虚拟DOM树 找出差异，并标记需要更新节点和操作， 将DOM进行局部更新， 减少了重回和重新排版的开销

### 何为高阶组件(higher order component)？

- [高阶函数](../../frame/react/高阶函数)
