# React一些相关

### React 和 Vue的区别

1. vue是双向绑定， react是单向数据流
2. 在vue中我们组合不同功能的方式是通过Composition API、mixin、Provide/inject  而React中我们通过HOC(Higher Order Commponent) 高阶组件来执行
3. React是JSX渲染模板， Vue是通过拓展HTML语法进行渲染。

### React 设计思想

- **组件化**

每个组件都符合开放 - 封闭原则， 封闭是针对渲染工作流来说，指的是组件内部的状态都由自身维护，只处理内部渲染逻辑； 开放是针对组件通信来说，指的是不同组件可以通过props(单向数据流)进行数据交互。

- **数据驱动视图**

UI=(data)
渲染界面不应该直接操作dom， 而是通过修改数据 state 或 props， 数据驱动视图更新

- **虚拟DOM**

由浏览器的渲染流水线可知 DOM 操作是一个非常昂贵的操作，很耗费性能， 所以就有了虚拟DOM， 虚拟DOM是对真实DOM的映射， React通过新旧DOM的对比得到需要更新的部分DOM， 实现数据的增量更新

### React生命周期

在16.8 hooks版本之前， React的生命周期分为组件挂载阶段、组件更新阶段、组件卸载阶段

- 挂载

`constructor`

`componentWillMount`(React17版本中被移除)

`render`

`componentDidMount`

- 更新

`componentWillReceiveProps` (React17版本中被移除)

`shouldComponentUpdate`

`componentWillUpdate` (React17版本中被移除)

`render`

`componentWillUnmount`

- 卸载

`componentWillUnmount`

在16.8版本引入Hooks之后， 它提供了一种新的方式来使用状态和其他 React 特性而无需编写类组件。 Hooks并没有完全取代生命周期的方法， 但是可以在函数组件中完成类似的功能。 常用的hooks有： `useState`、`useEffect`、`useContext`等

### React Hooks与 React Class的区别

1. Hooks更加简洁，并且更贴合原生js写法
2. 业务代码更加聚合
3. 逻辑代码方便复用

### React的严格模式

React的严格模式是在组件外层设置`React.scrictMode`标签，可以设置到根节点组件外层， 这样可以全局生效。

> React的严格模式检查仅在开发模式下运行， 它们并不会影响生产构建。

```javascript
import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

ReactDOM.render(
  <React.StriceMode>
    <App/>
  </React.StriceMode>,
   document.getElementById('root')
)
```

##### 严格模式优点

- 识别不安全的生命周期
- 关于使用过时字符串 ref API 的警告
- 关于使用废弃的 findDOMNode 方法的警告
- 检测意外的副作用
- 检测过时的 context API
- 未来的 React 版本将添加更多的额外功能

### React 中页面重新加载怎么保留数据

这个问题就涉及到了**数据持久化**， 主要有以下几种实现方式：

- **Redux**
   将页面数据储存在*Redux*中， 在页面重新加载时去获取Redux中的数据

- **data.js**
   使用*webpack*构建的项目, 可以创建一个文件， data.js将数据保存在data中， 跳转页面后获取

- **sessionStorage**
  存入*sessionStorage*初始化时查询， 有数据就加载， 无数据就是初始化状态

- **History API**
  使用`pushState`函数可以支持临时储存

- **zustand**
  轻量级状态管理包，不到1kb

### JSX与JS的区别

*JSX* 是React的语法糖，他允许在html中写js并且不能被浏览器识别， 需要通过webpack、babel之类的变异工具转换为js文件执行

*JS*可以被打包工具直接编译不需要额外的转换， *JSX*需要`babel`编译转换为浏览器识别语言

*JSX*是JS语法扩展允许在html中写js， js是原生写法需要通过script标签引入

##### React中必须要使用 JSX吗？

React中不强制使用*JSX*。 当不想在构建环境中配置有关*JSX*编译时候， 不在React中使用*JSX*会更加方便，
每个JSX元素只是调用 React.CreateElement(component, props, ...,children)的语法糖。 因此使用JSX可以完成的任何事情都可以通过原生JS来完成。

### React 处理错误边界(Error Boundaries)

错误边界是一种React组件， 它能够不过并处理子组件中任何位置出现Javascript的错误，并渲染备用UI， 而不是使整个组件数崩溃。错误边界在生产环境中非常有用，可以防止程序因错误而崩溃，同事还可以帮助开发者定位到错误

```typescript
import React, { useState, useEffect, } from 'react'

const ErrorBoundary = ({ children }) => {
  const [hasError, setHasError] = useState<boolean>(false)

  useEffect(() => {
    const errorHandler = (error) => {
      console.error('Error caught by ErrorBoundary', error)
      setHasError(true)
    };

    // 捕获全局错误
    window.addEventListener('error', errorHandler),

    return () => {
      window.removeEventListener('error', errorHandler)
    }
  }, [])

  if (hasError) {
    return <h1>'Something went wrong.'</h1>
  }
  return children
}

export default ErrorBoundary;
```

### React 组件为什么要大写

因为JSX语法无法被浏览器所识别， 需要使用Babel去转换为浏览器识别的js， 此时就会有个依据去判断是原生DOM标签还是React组件， 这个依据就是标签的首字母。

如果标签的首字母是小写就会被认为是原生标签， 反之就是React组件

### React.Fragment

React中组件是不允许返回多个节点的， 要想解决这个问题就需要套一层div标签， 但是这样会多增加一个节点，
所以在`16.0`版本之后， 官方推出了**Fragment**的概念， 能够让一个组件返回多个元素。

React.Fragment 等价于 一个空标签 `< ></ >`

> **两者的区别就是 React.Fragment可以使用key，但是空标签不可以**

### 受控组件、非受控组件

- 受控组件就是组组件的改变受控于数据的变化， 数据变了页面也就变了。 受控组件更合适，数据驱动是React的核心。

  当需要在React组件中访问、修改或验证表单元素的值时， 应该使用受控组件。

  适用于需要对表单元素的值进行实时操作和处理的情况。

- 非受控组件不是通过数据控制页面，而是直接通过DOM本身管理。

  当需要快速地继承已有的HTML表单元素或访问DOM元素时， 可以考虑使用非受控组件。

  适用于简单的表单场景或需要直接操作DOM元素的值得情况。
