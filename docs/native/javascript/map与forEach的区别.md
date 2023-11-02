# Array.map与Array.forEach的区别

## 定义

- `Array.map`: `map()` 方法创建一个新数组，这个新数组由原数组中的每个元素都调用一次提供的函数后的返回值组成。

  **语法**

  ```typescript
  map(callbackFn)
  map(callbackFn, thisArg)
  ```

  **参数**
  `callbackFn`: 为数组中的每个元素执行的函数， 它的返回值作为一个元素被添加为新数组中，该函数被调用时将传入以下参数：
  > `element`: 数组中当前正在处理的元素  \
  > `index`: 正在处理的元素的索引  \
  > `array`: 调用了`map()`数组本身

  **返回值**
   一个新数组，每个元素都是回调函数的返回值

- `Array.forEach`: `forEach()` 方法对数组的每个元素执行一次给定的函数。

  **语法**

  ```typescript
  forEach(callbackFn)
  forEach(callbackFn, thisArg)
  ```

  **参数**
  `callbackFn`: 为数组中每个元素执行的函数。并会丢弃它的返回值。该函数被调用时将传入以下参数：
  > `element`: 数组中当前正在处理的元素  \
  > `index`: 正在处理的元素的索引  \
  > `array`: 调用了`map()`数组本身

  **返回值**
   `undefined`

  简单来说`map`是返回一个新的数组， 而`forEach`不会返回值(实际上返回了`undefined`)

### 简单实现

- `map`

  ```javascript
  function myMap(array, callback) {
    const result  = [];
    for (let i = 0; i < array.length;  i++) {
      result.push(callback(array[i]), i array)
    }
    return result
  }

  ```

- `forEach`

  ```javascript
    function myForEach(array, callback) {
      for (let i = 0; i < array.length; i++) {
        callback(array[i], i array)
      }
    }
  ```

  ::: warning 简单对比
    `forEach`和`map`的实现原理类似， 它们都是通过遍历数组，对数组的每个元素执行特定的函数， 区别主要在于处理函数返回值的方式不同。 `forEach`忽略函数的返回值， 而`map`则将函数的返回值收集到一个新数组中
  :::
  