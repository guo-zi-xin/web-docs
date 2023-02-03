## 回流（reflow）
#### 回流（reflow）: 当render树（渲染树）中的一部分或者全部因为大小边距等引起结构变化 而需要重建的过程叫做回流；
## 重绘（repaint）
#### 重绘（repaint）:当render 树中的一些元素需要更新属性，而这些属性只是影响元素的外观，风格，而不会影响布局的，比如background-color。则就叫称为重绘。
#### 每个页面至少需要一次回流，就是在页面第一次加载的时候。在回流的时候，浏览器会使渲染树中受到影响的部分失效，并重新构造这部分渲染树，完成回流后，浏览器会重新绘制受影响的部分到屏幕中，该过程成为重绘。
注意：回流一定会引起重绘， 重绘不一定会引起回流；而且每个页面都至少需要一次回流，就是页面第一次开始加载的时候。
***可能会有人问， 什么是render树？在了解render数之前 我们先了解一下浏览器在页面加载完成后到页面显示的中间过程***：
- 首先将得到的代码解析生成dom树，这个dom树里边包括了所有的HTML的标签 包括display：none 还有js动态添加的元素等；
- 浏览器把所有的样式解析成样式结构体；
- 在dom树和样式结构体组合后构建成render树 （不包括display：none，head节点，因为这些节点不会用于呈现，而且不会影响呈现 所以不再render树中； 但会包括visibility：hidden的节点）；

- 一旦render tree构建完毕后，浏览器就可以根据render 树来绘制页面了。

![rander流程](https://any-cross-1252921383.cos.ap-hongkong.myqcloud.com/test-image/reflux-%20redraw.jpg)

### render树
  render树的节点叫做渲染器； 渲染器在文档解析和dom树创建之后创建，会计算dom节点的样式信息；
如果说元素设置成了display：none或者元素的子孙元素继承了display：none的属性，那么元素的render树则不会被创建， 节点的子类display属性决定该节点创建怎样的渲染器。
#### 引起回流和重绘的原因是页面布局和几何属性发生了改变。
### 何时触发回流和重绘

- **repaint重绘：**
reflow回流必定引起repaint重绘，重绘可以单独触发
背景色、颜色、字体改变（注意：字体大小发生变化时，会触发回流）

- **reflow回流**：
页面第一次渲染（初始化）
DOM树变化（如：增删节点）
Render树变化（如：padding改变）
浏览器窗口resize
当你查询布局信息，包括offsetLeft、offsetTop、offsetWidth、offsetHeight、 scrollTop/Left/Width/Height、clientTop/Left/Width/Height、调用了getComputedStyle()或者IE的currentStyle时，浏览器为了返回最新值，会触发回流。

## 性能优化
- 尽量避免改变布局属性。如width, height, left, top。
- 除了transforms 或者 opacity属性都会引起重绘，做动画的时候要注意， - 尽量使用这两个属性；
- 使用Flexbox。
- 避免多次读取部分布局属性（同上）
- 将复杂的节点元素脱离文档流，降低回流成本

### css
- 减少选择器的复杂性。
- 避免逐个修改节点样式，尽量一次性修改，减少style修改所影响元素的数量,使用cssText来替代要多次修改的style属性.

### js

我们也知道回流的花销也不小，如果每句JS操作都去回流重绘的话，浏览器可能就会受不了。所以很多浏览器都会优化这些操作，浏览器会维护1个队列，把所有会引起回流、重绘的操作放入这个队列，等队列中的操作到了一定的数量或者到了一定的时间间隔，浏览器就会flush队列，进行一个批处理。这样就会让多次的回流、重绘变成一次回流重绘。
