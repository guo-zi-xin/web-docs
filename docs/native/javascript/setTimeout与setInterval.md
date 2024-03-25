# setTimeout与setInterval区别

定义：**在JavaScript中，setTimeout和setInterval是两个用于执行延迟操作或定期执行代码的函数**

### setTimeout

全局的 `setTimeout()` 方法设置一个定时器，一旦定时器到期，就会执行一个函数或指定的代码片段。

- 语法：`setTimeout(function, delay)`
- 作用：在指定的延迟时间（以毫秒为单位）后执行传入的函数。只执行一次。
- 用法：

  ```javascript
  // 示例：延迟一秒后执行
  setTimeout(function() {
    console.log('这将在一秒后执行。');
  }, 1000);
  ```

  `setTimeout`接收两个参数，第一个是要执行的函数，第二个是延迟的时间。上述示例中，函数将在延迟一秒后执行。这是一个常用于执行一次性延迟操作的函数

### setInterval

`setInterval()` 方法重复调用一个函数或执行一个代码片段，在每次调用之间具有固定的时间间隔。

- 语法：`setInterval(function, delay)`
- 作用：以指定的时间间隔（以毫秒为单位）重复执行传入的函数
- 用法：

  ```javascript
  // 示例：每隔一秒执行一次
  setInterval(function() {
    console.log('这将每隔一秒执行一次。');
  }, 1000);
  ```

  `setInterval` 也接受两个参数，第一个是要执行的函数，第二个是执行之间的时间间隔，在上述示例中，函数将每隔一秒执行一次。`setInterval`适用于需要重复执行的定时任务，直到被清除或者页面被卸载

### 精度问题

尽管`setTimeout`与`setInterval`是Javascript中常用的定时器函数，但它们在执行上存在一些精度方面的问题。

- **Javascript是单线程执行：** Javascript是单线程执行的，意味着所有任务都在同一个执行队列中，如果队列中已有任务，那么定时任务的执行可能会受到延迟。
- **最小延迟时间：** 浏览器和Node.js环境通常将`setTimeout`和`setinterval`的最小延迟时间设定为4毫秒(具体取决于浏览器或者环境)
- **累计误差：** 由于定时器的执行会受到事件循环机制和系统资源的影响，定时器的实际执行时间可能会有一些偏差，特别是在长时间运行的定时器中，累计实际误差可能导致定时器执行时间的不确定性。

### 取消调度

`setTimeout` 和 `setInterval` 都可以通过 `clearTimeout` 和 `clearInterval` 方法来取消之前设置的定时器

### 利用setTimeout实现一个setInterval

```typescript
  const setIntervalFunctional = (callback: () => void, delay: number):void => {
    let intervalId: number | null = null;

    const intervalFunction = ():void => {
        callback();
        intervalId = setTimeout(intervalFunction, delay);
    }

    intervalFunction(); // 启动第一次
  }

// 示例使用
const stopInterval = setIntervalFunctional(() => {
    console.log("Functional Interval callback executed");
}, 1000);

// 模拟执行 5 次后停止
setTimeout(() => {
    stopInterval();
    console.log("Functional Interval simulation stopped");
}, 5000);

```

### requestAnimationFrame

`window.requestAnimationFrame()` 告诉浏览器——你希望执行一个动画，并且要求浏览器在下次重绘之前调用指定的回调函数更新动画。该方法需要传入一个回调函数作为参数，该回调函数会在浏览器下一次重绘之前执行。

- 语法： `requestAnimationFrame(callback)`
- 作用： 在浏览器下一次重绘之前执行指定的回调函数，确保动画在适当的时机更新，同时也能够有效地减少功耗和提高性能。
- 用法：
  
```javascript
let startTime;
const animate = (timestamp) => {
  if (!startTime) {
    startTime = timestamp
  }
  const progress = timestamp - startTime;

  //  执行动画操作，例如移动元素
  const element = document.getElementById('some-element-you-want-to-animate')
  element.style.transform = `translateX(${progress * 0.1}px)`

  // 设置动画执行总时间
  if (progress < 2000) {
    requestAnimationFrame(anmiate)
  }
}
// 启动动画
requestAnimationFrame(animate);
```

### 对比

- `requestAnimationFrame`通常比`setTimeout`和`setinterval`更精准， 因为它与浏览器的重绘同步
- `requestAnimationFrame`可以更好的利用浏览器的优化，避免不必要的绘制
- `requestAnimationFrame`更适合与动画， 因为它能够自动适应浏览器的刷新率，并在每一帧中执行
