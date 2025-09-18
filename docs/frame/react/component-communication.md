# React 组件间的通信

### 父组件调用子组件

⽗组件调⽤⼦组件⽅法
使⽤`useImperativeHandle`调⽤⼦组件⽅法。

```javascript
import { useImperativeHandle, useRef, useState } from 'react'
/**
 * ⼦组件
 */
const ChildrenComponent = (props: any) => {
const [count, setCount] = useState(0);
 useImperativeHandle(props.childrenRef, ()=>({
  handleClick: () => setCount(c => c+1),
  handleDelete: () =>setCount(c =>c > 0 ? c-1 : 0),
 }))
 return (
    <div>count {count}</div>
 )
}

/**
 * ⽗组件
 */
function App() {
 const childrenRef = useRef();
 return (
 <>
 <div onClick = {() => childrenRef.current.handleClick()}></div>

 <div onClick = {() => childrenRef.current.handleDelete()}></div>
 <ChildrenComponent childrenRef = {childrenRef}/>
 </>
 )
}

export default App
```

父组件与子组件的加载顺序

::: danger 加载顺序

- 父子组件初始化

父组件 `constructor`
父组件 `getDerivedStateFromProps`
父组件 `render`
子组件 `constructor`
子组件 `getDerivedStateFromProps`
子组件 `render`
子组件 `componentDidMount`
父组件 `componentDidMount`

- 子组件修改自身state

子组件 `getDeriverStateFromProps`
子组件 `shouldComponentUpdate`
子组件 `render`
子组件 `getSnapShotBeforeUpdate`
子组件 `componentDidUpdate`

- 父组件修改props

父组件 `getDerivedStateFromProps`
父组件 `shouldComponentUpdate`
父组件 `render`
子组件 `getDerivedStateFromProps`
子组件 `shouleComponentUpdate`
子组件 `render`
子组件 `getSnapShotBeforeUpdate`
子组件 `getSnapShotBeforeUpdate`
子组件 `componentDidUpdate`
父组件 `conponentDidUpdate`

- 卸载子组件

父组件 getDerivedStateFromProps
父组件 shouldComponentUpdate
父组件 render
父组件 getSnapShotBeforeUpdate
子组件 componentWillUnmount
父组件 componentDidUpdate
:::
