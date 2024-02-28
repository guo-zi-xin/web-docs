# Array.reduce 方法的使用场景

### 功能

`Array.prototype.reduce` 方法泛用性很强, 这个方法功能主要是对数组中每个元素执
行一个提供的reducer函数， 每一次运行reducer函数会将先前的结果作为参数传入，最后
将其结果汇总为单个返回值

第一次执行回调函数时， 不存在'上一次计算结果'。 如果需要回调函数从数组索引为0的
元素开始执行，则需要传入初始值。 否则，**数组索引为0的元素将被作为初始值，迭代器将从第二个元素开始执行(即索引为1的位置而不是索引0的位置开始)**

### 参数值

**reduce**方法主要接收两个参数， 一个是执行操作的回调函数， 一个初始值(可选)。

##### 回调函数

回调函数是数组中每个元素执行的函数， 其返回值将作为下一次调用回调函数时的 `accumulator` 参数。对于最后一次调用， 返回值将作为reducd方法的返回值， 这个回调函数支持传入四个参数：

- **accumulator**

  上一次调用 回调函数的结果。 在第一次调用时， 如果指定了 `initialValue`, 则为指定的`initialValue`, 否则为Array[0]的值

- **currentValue**

  当前元素的值。在第一次调用时，如果指定了 `initialValue`， 则为Array[0]的值， 否则为Array[1]

- **currentIndex**

参数`currentValue`在数组中的索引的位置。，如果指定了 `initialValue` 则为 0，否则为 1

- **array**

调用了reduce方法的原数组本身。

##### initialValue

第一次调用回调函数初始化 `accumulator`的值。 如果指定了 `initialValue`， 则回调函数从数组中第一个元素`currentValue`开始执行。 如果没有 `initialValue`， 则 `accumulator`初始
化为数组中的第一个值， 回调函数从数组中的第二个值作为`currentValue`开始执行。在这种情况下，在这种情况下，如果数组为空（没有第一个值可以作为 `accumulator` 返回），则会抛出错误。

### 使用场景

##### 一维数组求和

```typescript
const arr: number[] = [0, 1, 2, 3];
// acc: 表示的是累加器 accumulator
// cur： 表示的是当前元素
const sum = arr.reduce((acc, cur) => {
  return acc + cur
}, 0)
console.log(sum) // 输出 6 
```

##### 累加对象数组里的值

`reduce`方法不仅可以求纯数字数组的和， 针对对象数组里的值也可以求和

```typescript
type Item = {x : number }
const initValue = 0;
const arr: Item[] = [ { x: 1 }, { x: 2 }, { x: 3 } ];
const sum = arr.reduce((acc, cur) => {
  return acc + cur.x
}, initValue)
console.log(sum) // 输出为6
```

##### 展平嵌套数组

```typescript
const arr: [number, number] = [[0, 1], [2, 3], [4, 5]]
const sum = arr.reduce((acc, cur) => {
  return acc.concat(cur)
},[])
console.log(sum) // 输出结果为 [0, 1, 2, 3, 4, 5]
```

##### 统计对象中值出现的次数

```typescript
const names: string[] = ['陈大', '李二', '张三', '朱四', '王五', '张三']
const countNames = names.reduce((acc, cur) => {
  const counts:number = acc[cur] ?? 0 // 判断累加器的结果中是否有未记录的名称key
  return {
    ...acc,
    [cur]: counts + 1
  }
}, {}) // 通过传入一个空对象，表示累加器通过对象操作来控制名称key出现的次数
console.log(countNames) // 输出值为 { '陈大': 1, '李二': 1, '张三': 2, '朱四': 1, '王五': 1 }

// 第二种写法， 只是实现方法不同

const countNames = names.reduce((acc, cur) => {
  if (cur in acc) {
    acc[cur]++
  } else {
    acc[cur] = 1
  }
}, {})
console.log(countNames) // 输出值为 { '陈大': 1, '李二': 1, '张三': 2, '朱四': 1, '王五': 1 }
```

##### 按属性对对象进行分组

```typescript
type Item = { name: string, age: number }
const objArr: Item[] = [
  { name: 'Alice', age: 21 },
  { name: 'Max', age: 20 },
  { name: 'Jane', age: 20 },
]
const groupBy = (arr, prop) => {
  return arr.reduce((acc, cur) => {
    const key = cur[prop]
    const curGroup = acc[key] ?? []
    return { ...acc, [key]: [...curGroup, cur] }
  }, {})
}

const groupePeople = groupBy(objArr, 'age')
console.log(groupePeople)
// 输出结果为 
// {
//   20: [
//     { name: 'Max', age: 20 },
//     { name: 'Jane', age: 20 }
//   ],
//   21: [
//     { name: 'Alice', age: 21 }
//   ]
// }

// 第二种写法
const groupBy = (arr, prop) => {
  return arr.reduce((acc, cur) => {
    const key = cur[prop]
    if (!acc[key]) {
      acc[key] = []
    }
    acc[key].push(cur)
    return acc
  }, {})
}

const groupePeople = groupBy(objArr, 'age')
console.log(groupePeople)
// 输出结果为 
// {
//   20: [
//     { name: 'Max', age: 20 },
//     { name: 'Jane', age: 20 }
//   ],
//   21: [
//     { name: 'Alice', age: 21 }
//   ]
// }
```

##### 使用扩展运算符和 `initialValue` 连接包含在对象数组中的数组

```typescript
type Item = {
  name: string;
  books: string[];
  age: number
}
const friends:Item[] = [
  {
    name: 'Anna',
    books: ['Bible', 'harry Potter'],
    age: 21
  },
  {
    name: 'Bob',
    books: ['War and Sapce', 'Romeo and Juliet']
    age: 26
  },
  {
    name: 'Alice',
    books: ['The lord of the Rings', 'The Shining'],
    age: 18
  }
]
const allBooks = friends.reduce((acc, cur) => {
  return [...acc, ...cur.books]
}, ['Alphabet'])
console.log(allBooks) 
// 输出结果为
// ['Alphabet', 'Bible', 'Harry Potter', 'War and Space', 'Romeo and Juliet', 'The Lord of the Rings', 'The Shining']
```

##### 数组去重

:::info 备注
可以使用 `Set` 和 `Array.from()`来实现同样的效果， 如`const arr = Array.from(new Set(myArray))`, 并且性能更好。
:::

```typescript
const myArray: string[] =  ['a', 'b', 'a', 'b', 'c', 'e', 'e', 'c', 'd', 'd', 'd', 'd']
const myArr = myArray.reduce((acc, crr) => {
  if (!acc.includes(cur)) {
    return [...acc, cur]
  }
  return acc
}, [])
console.log(myArr) // 输出结果为 ['a', 'b', 'c', 'd']

//第二种实现方式
const myArr = myArray.reduce((acc, cur) => {
  if (acc.length === 0 || acc[acc.length - 1] !== cur) {
    acc.push(cur)
  }
  return acc
}, [])
console.log(myArr) // 输出结果为 ['a', 'b', 'c', 'd']
```

##### 使用 reduce() 来替代 .filer().map()

> 使用`.filter()` 和 `.map()`会遍历数组两次，但是可以使用`reduce()`只遍历一次并实现相同的效果， 从而更高效 (如果你喜欢使用`for`循环， 你可以再遍历一次时使用`forEach()`进行过滤和映射)

```typescript
const arr: number[] = [-5, 6, 2, 0]
const newArr = arr.reduce((acc, cur)=> {
  if(cur > 0) {
    const doubled = cur * 2
    return [...acc, doubled]
  }
  return acc
}, [])

console.log(newArr) // 输出为[12, 4]
```

##### 按顺序运行promise

```typescript
/**
 * 链接一系列 Promise 处理程序。
 *
 * @param {array} arr——一个 Promise 处理程序列表，每个处理程序接收前一个处理程序解决的结果并返回另一个 Promise。
 * @param {*} input——开始调用 Promise 链的初始值
 * @return {Object}——由一系列 Promise 链接而成的 Promise
 */
function runPromiseInSequence(arr, input) {
  return arr.reduce(
    (acc, curFunc) => acc.then(curFunc),
    Promise.resolve(input),
  );
}

// Promise 函数 1
function p1(a) {
  return new Promise((resolve, reject) => {
    resolve(a * 5);
  });
}

// Promise 函数 2
function p2(a) {
  return new Promise((resolve, reject) => {
    resolve(a * 2);
  });
}

// 函数 3——将由 `.then()` 包装在已解决的 Promise 中
function f3(a) {
  return a * 3;
}

// Promise 函数 4
function p4(a) {
  return new Promise((resolve, reject) => {
    resolve(a * 4);
  });
}
 
const promiseArr = [p1, p2, f3, p4];
runPromiseInSequence(promiseArr, 10).then(console.log); // 1200

```

:::warning 注意
> 这个方法与`promise.all`相似， 但并不完全相同，

`promise.all`方法主要侧重于多个`promise`并行执行, 并在所有 Promise 都成功时才返回结果;

这个方法则侧重于按顺序执行`Promise`操作, 并允许处理程序之间的传递结果
:::

##### 在稀疏数组中使用reduce

> `reduce()`会跳过稀疏数组中缺失的元素， 但不会跳过`undefined` 值

```typescript
console.log([1, 2, , 4].reduce((acc, cur) => acc + cur)) // 输出为7
console.log([1, 2, undefined, 4].reduce((acc, cur) => acc + cur)) // 输出为NaN
```

##### 非数组对象上调用reduce

> `reduce()`方法读取`this`的`length` 属性， 然后访问每个整数索引

```typescript
const arrLike = {
  length: 3,
  0: 2,
  1: 3,
  2: 4
}

console.log(Array.prototype.reduce.call(arrLike, (x, y) => x + y)) // 输出结果为9
```

##### 功能性函数管道

```typescript
// 组合使用的构建块
const double = (x) => 2 * x;
const triple = (x) => 3 * x;
const quadruple = (x) => 4 * x;

// 函数组合，实现管道功能
const pipe =
  (...functions) =>
  (initialValue) =>
    functions.reduce((acc, fn) => fn(acc), initialValue);

// 组合的函数，实现特定值的乘法
const multiply6 = pipe(double, triple);
const multiply9 = pipe(triple, triple);
const multiply16 = pipe(quadruple, quadruple);
const multiply24 = pipe(double, triple, quadruple);

// 用例
multiply6(6); // 36
multiply9(9); // 81
multiply16(16); // 256
multiply24(10); // 240
```
