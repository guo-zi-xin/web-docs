# 虚拟DOM与Diff算法

**虚拟DOM相当于是在JS和 真实的DOM之间加了一个缓存， 利用DOM Diff算法避免了没有必要的DOM操作， 从而提高性能。**

### 结构对比

`React.createElement`和 `document.createElement`

虚拟DOM是一个对象， 而真实的DOM是DOM结构(断点看到真实DOM中挂载了很对属性和方法。我们并不需要去关心
这些属性和方法， 都是默认的， 因为标准就这么设计的的😂)
所以从结构上来说虚拟DOM比真实的DOM轻量很多

### 流程对比

传统Web应用， 数据的变化会实时地更新到用户界面中， 于是每次数据微小的变化都会引起DOM的重新渲染

在虚拟DOM中， 是将所有的操作聚集在一块计算出所有变化后统一更新一次虚拟DOM

### 什么是虚拟DOM

虚拟DOM是一个对象， 这个对象是由真实的DOM转化而来:

```html
<div className="Index">
  <div>我是我的胃来食</div>
  <ul>
    <li>React</li>
    <li>Vue</li>
  </ul>
</div>
```

转化后

```javascript
const virtualDom =  {
  type: 'div',
  props: { class: 'Index' }
  children: [
    {
      type: 'div',
      children: '我是我的胃来食'
    },
    {
      type: 'ul'
      children: [
        {
          type: 'li'
          children: 'React'
        },
        {
          type: 'li',
          children: 'Vue'
        }
      ]
    }
  ]
}
```

::: info 注

- type: 表示实际的标签
- props: 表示标签内部的属性(除去Key 和 ref, 会形成单独的key名)
- children: 表示节点内容， 依次循环

:::

### 虚拟DOM的优势

##### 虚拟DOM可以提高效率，开发时不必关注DOM， 只关注业务逻辑

性能提升(牢记浏览器在处理DOM时很慢， 处理JS时很快)， 并且虚拟DOM感受到变化的时候是通过局部更新而非整体，从而减少非常多的DOM操作， 所以性能会比真实的DOM操作提升不少

::: info ⛔
虚拟DOM的优势其实是在于它的diff算法和批量处理策略， 将所有的DOM 手机起来， 一起去改变真是的DOM， 但在首次渲染上，虚拟DOM会多了一层计算， 消耗一些性能， 所以有可能会比HTML慢一点。
虚拟DOM知识规划了一个最短路径， 但是还是得真是的DOM去走
:::

##### 超强的兼容性

具有浏览器的兼容和跨平台的兼容

- React基于虚拟DOM实现了一套自己的事件机制，并且模拟了事件冒泡和捕获的过程， 采取事件代理批量更新等方法，从而磨平各个浏览器事件兼容性问题

- 对于跨平台React和 React Native 都是根据虚拟DOM画出响应平台的UI层， 只不过不同平台的画法不太一样
