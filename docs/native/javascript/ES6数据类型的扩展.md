# ES6 数据类型的扩展

### 字符串类型的扩展

##### 模版字符串

**使用反引号(`)包裹的字符串, 支持多行文本和嵌入表达式**

```javascript
const name = 'world'
const str = `hello ${name}`
const str1 = `hello ${name ? 'world' : ''}`

console.log(str) // hello world
console.log(str) // hello world
```

##### 模版标签函数

**允许定义自定义的字符串处理函数,以处理模版字符串**

```javascript
const customTag = (strings, ...values) => {
  console.log(strings); // ['Hello, ', '!']
  console.log(values);  // ['World']

  return strings[0] + values[0].toUpperCase() + strings[1];
}

const name = 'world'
const result = customTag(`hello, ${name}!`)

console.log(result) // hello WORLD!
```

##### `String.prototype.includes()`

**判断字符串是否包含指定字符, 返回布尔值**

```javascript
const str = 'hello world'

console.log(str.includes('world')) // true
console.log(str.includes('foo')) // false
```

##### `String.prototype.startWith()`/`String.prototype.endWith()`

**判断字符串是否以指定的字符开始/结束, 返回布尔值**

```javascript
const str = 'hello world'

// 开始
console.log(str.startWith('hello')) // true
console.log(str.startWith('foo')) // false

// 结束
console.log(str.endWith('world')) // true
console.log(str.endWith('foo')) // false
```

##### `String.propotype.repeat()`

**将字符串指定次数，返回新的字符串**

```javascript
const str = 'hello world'

console.log(str.repeat(2)) // 'hello worldhello world'
```

##### `String.prototype.fromCodePoint()`

**根据给定的码点创建一个字符串，它可以将一个或者多个码点转换为相应的字符**

```javascript
console.log(String.formCodePoint(65)) // A
console.log(String.formCodePoint(97, 98, 99)) // abc
```

##### `String.prototype.raw()`

**用于获取一个模版字符串的原始字符串形式，忽略其中的转义字符**

```javascript
const path = 'C:\\Users\\hhh\\Documents\\file.txt'

console.log(String.raw(`The file is located at ${path}`))
// The file is located at C:\Users\hhh\Documents\file.txt
```

##### `String.prototype.codePointAt()`

**用于返回指定位置的字符的码点**

```javascript
const str = 'abc'

console.log(str.codePointAt(0)) // 97
console.log(str.codePointAt(1)) // 98
console.log(str.codePointAt(2)) // 99
```

##### `String.prototype.normalize()`

**用于将字符串的`Unicode` 标准化形式，它主要用于处理 `Unicode` 字符串的表达形式**

```javascript
const str = 'c\u0327'

console.log(str.normalize()) // c
```

### 数组类型的扩展

##### 扩展运算符(`...`)

**扩展运算符类似 rest 参数的逆运算， 将一个数组转为用逗号分隔的参数序列**

```javascript
console.log(...[1, 2, 3])
// 1 2 3

console.log(1, ...[2, 3, 4], 5)
// 1, 2, 3, 4, 5

[...document.querySelectorAll('div')]
// [<div>, <div>, <div>] 代表标签下的所有元素
```

**该运算符主要用于函数调用**

```javascript
// 可以扩展函数参数
const push = (arr, ...items) => {
  arr.push(...items)
}

const add = (x, y) => {
  return x + y
}

const numbers = [1, 2]
// 可以在调用时扩展实际传入的参数
add(...numbers)
```

**扩展运算符后面还可以放置表达式**

```javascript
const arr = [ ...(x > 0 ? ['a'] : []), 'b']

// 如果扩展运算符后面是一个空数组，则不会有任何效果
[...[], 1] // [1]
```

:::warning 注意
只有在函数调用时， 扩展运算符才能放在圆括号中，否则会报错

```javascript
(...[1, 2])
// Uncaught SyntaxErrot: Unexpected number

console.log((...[1, 2]))
// Uncaught SyntaxError: Unexpected number

console.log(...[1, 2]) // 1 2
```

:::

**替代函数的 apply() 方法**

由于扩展运算符可以展开数组，所以不再需要`apply()` 方法转为函数的参数了

```javascript
// ES5 写法
function fun(x, y, z) {
  // ...
}

var args = [0, 1, 2]
fun.apply(null, args)

// ES6 写法
const func = (x, y, z) => {
  // ...
}

let args = [0, 1, 2]
func(...args)
```

:::info 扩展运算符的应用

- 下面是扩展运算符取代 `apply()` 方法的一个实际的例子， 应用 `Math.max()` 方法， 简化求出一个数组最大元素的写法

```javascript
// ES5 写法
Math.max.apply(null, [14, 3, 17])

// ES6 写法
Math.max(...[14, 3, 17])

// 两者都等同于
Math.max(14, 3, 17)
```

- 通过`push()`函数，将一个数组添加到另一个数组的尾部

```javascript
// ES5 写法
var arr1 = [0, 1, 2]
var arr2 = [3, 4, 5]
Array.prototype.push.apply(arr1, arr2)

//ES6 写法
let arr1 = [0, 1, 2]
let arr2 = [3, 4, 5]
arr1.push(...arr2)
```

:::

##### `Array.prototype.from`

**该方法用于将两类对象转为真正的数组：类似数组的对象（array-like object）和可遍历（iterable）的对象（包括 ES6 新增的数据结构 Set 和 Map）**

```javascript
const arrayLike = { 0: 'a', 1: 'b', 2: 'c', length: 3 }
const arr = Array.from(arrayLike)
console.log(arr) // ['a', 'b', 'c']
```

**该方法还可以接收第二个参数，作用类似于数组的`map()` 方法， 用来对每个元素进行处理，将处理后的值放入返回的数组**

```javascript
Array.from(arrayLike, x => x * x)
// 等同于
Array.from(arrayLike).map(x => x * x)

Array.from([1, 2, 3], (x) => x * x)
// [1, 4, 9]
```

##### `Array.prototype.of`

**根据传入的参数创建一个新数组**

```javascript
const arr = Array.of(1, 2, 3)
console.log(arr) // [1, 2, 3]
```

:::details `Array()`与 `Array.of()` 区别
`Array.of()`方法的主要目的，是弥补数组构造函数`Array()`的不足。 因为参数个数不同，会导致`Array()`的行为有差异

```javascript
Array() // []
Array(3) // [空值, 空值, 空值]
Array(3, 11, 8) // [3, 11, 8]
```

上面代码中，`Array()` 方法没有参数、一个参数、三个参数时， 返回的结果不一样， 只有当参数不少于两个时，`Array()`才会返回由参数组成的新数组，参数只有一个正整数时，实际上是指定数组的长度

`Array.of*()` 基本上可以用来替代`Array()` 或 `new Array()`, 并且不存在由于参数不同而导致的重载。它的行为非常统一

```javascript
Array.of() // []
Array.of(undefined) // [undefined]
Array.of(1) // [1]
Array.of(1, 2) // [1, 2]
```

:::

##### `Array.prototype.find()`、`Array.prototype.findIndex()`

**`find()` 方法 返回数组中满足条件的第一个元素**

**`findIndex()`方法 返回数组中满足条件的第一个元素的索引**

```javascript
// find
const arr = [1, 2, 3, 4, 5]
const found = arr.find(e => e > 3)
console.log(found) // 4

// findIndex
const arr = [1, 2, 3, 4, 5]
const found = arr.find(e => e > 3)
console.log(found) // 3
```

##### `Array.prototype.fill()`

**使用固定值填充一个数组中从起始索引（默认为 0）到终止索引（默认为 array.length）内的全部元素**

```javascript
const arr = [1, 2, 3, 4, 5]
// 使用 0 填充 从下标为1到下标为3的区间
arr.fill(0, 1, 3)
console.log(arr) // [1, 0, 0, 4, 5]
```

##### `Array.prototype.copyWithin()`

**用于将数组中的一部分元素复制到指定位置，覆盖原有的元素**

```javascript
const arr = [1, 2, 3, 4, 5]
arr.copyWithin(0, 3) // 将索引为3及其之后的元素复制到索引为0的位置
console.log(arr); // 输出：[4, 5, 3, 4, 5]
```

##### `Array.prototype.keys()`、`Array.prototype.values()`、`Array.prototype.entries()`

ES6 提供三个新的方法——`entries()`，`keys()`和`values()`——用于遍历数组。它们都返回一个遍历器对象, 可以用for...of循环进行遍历，
唯一的区别是`keys()`是对键名的遍历、`values()`是对键值的遍历，`entries()`是对键值对的遍历

```javascript
for (let index of ['a', 'b'].keys()) {
  console.log(index)
}
// 0
// 1

for (let elem of ['a', 'b'].values()) {
  console.log(elem);
}
// 'a'
// 'b'

for (let [index, elem] of ['a', 'b'].entries()) {
 console.log(index, elem);
}
// 0 "a"
// 1 "b"
```

**数组空位**

ES6中对待数组空位的方式有所改变。空位指的是数组中某个位置没有任何值，例如`[1, , 3]`中的第二个元素是个空位，
在ES6之前，对待数组空位的方式是跳过它们，不进行任何操作。但在ES6中，空位被视为`undefined`的值。例如，使用ES6的数组方法时，空位会被当作`undefined`处理。

### 对象类型的扩展

##### 属性的简洁表示法

**ES6 允许在大括号里面，直接写入变量和函数，作为对象的属性和方法，这样的书写更加简洁**

```javascript
const foo = 'bar'
const baz = { foo }
console.log(baz) // { foo: 'bar' }

// 等同于 
const baz = { foo: foo }
```

**除了属性简写，方法也可以简写**

```javascript
const o = {
  method() {
    return 'hello'
  }
}

// 等同于
const o = {
  method: function() {
    return 'hello'
  }
}
```

##### 属性名表达式

Javascript 定义对象的属性， 有两种方法

```javascript
// 方法一
obj.foo = true

// 方法二
obj['a' + 'bc'] = 123
```

但是，如果使用字面量方式定义对象（使用大括号），在 ES5 中只能使用方法一（标识符）定义属性。

```javascript
var obj = {
  foo: true,
  abc: 123
};
```

ES6中 对象定义属性名的方式也有了变化, ES6 允许字面量定义对象时，用方法二（表达式）作为对象的属性名，即把表达式放在方括号内。

```javascript
let propKey = 'foo'

let obj = {
  [propKey]: true,
  ['a' + 'bc']: 123
}
```

##### `Object.is(value1, value2)`

**用于比较两个值是否相同**

与"==="操作符的行为类似，但有两个区别：一是Object.is(NaN, NaN)返回true，而"==="操作符返回false；二是Object.is(+0, -0)返回false，而"==="操作符返回true。

```javascript
console.log(Object.is(1, 1)); // true
console.log(Object.is(NaN, NaN)); // true
console.log(Object.is(+0, -0)); // false
```

##### `Object.assign(target, ...sources)`

**将一个或多个源对象的属性复制到目标对象中。它返回目标对象。如果多个源对象具有相同的属性，则后面的对象的属性将覆盖前面的对象的属性**

```javascript
const target = { a: 1, b: 2 };
const source = { b: 3, c: 4 };
const result = Object.assign(target, source);
console.log(result); // { a: 1, b: 3, c: 4 }
```

##### `Object.getPrototypeOf(obj)`

用于获取对象的原型。它返回指定对象的原型。

```javascript
const obj = {};
const prototype = Object.getPrototypeOf(obj);
console.log(prototype); // {}
```

##### `Object.setPrototypeOf(obj, prototype)`

用于设置对象的原型。它将指定对象的原型设置为另一个对象或null。

```javascript
const obj = {};
const prototype = { a: 1 };
Object.setPrototypeOf(obj, prototype);
console.log(obj.a); // 1
```

### 正则的扩展

##### `RegExp构造函数的扩展`

在ES6之前，RegExp构造函数不允许使用第二个参数添加修饰符。在ES6中，如果RegExp构造函数第一个参数是一个正则对象，那么可以使用第二个参数指定修饰符。
而且，返回的正则表达式会忽略原有的正则表达式的修饰符，只使用新指定的修饰符

```javascript
console.log(new RegExp(/abc/ig, 'i').flags);// "i"
```

##### `Flags属性`

用于返回正则表达式的修饰符

```javascript
const regex = /abc/gi;
console.log(regex.flags); // "gi"
```

##### `u修饰符`

用于处理大于`\uFFFF`的Unicode字符。

```javascript
console.log(/^\S$/.test('𠮷'));// false
console.log(/^\S$/u.test('𠮷'));// true
```

##### `y修饰符`

也称为“粘连”修饰符，用于指定只从目标字符串的当前位置开始匹配

```javascript
const regex = /abc/y;
console.log(regex.exec("abcabc")); // [ 'abc', index: 0, input: 'abcabc', groups: undefined ]
console.log(regex.exec("abcabc")); // [ 'abc', index: 3, input: 'abcabc', groups: undefined ] 因为第二次匹配从上一次匹配的结束位置开始
console.log(regex.exec("abcabc")); // null 
```

##### `RegExp.prototype.sticky`/`RegExp.prototype.unicode`

表示是否有y修饰符/表示是否有u修饰符

```javascript
console.log(/hello\d/y.sticky);//true
console.log(/hello\d/u.unicode);//true
```

##### 正则方法调用变更

字符串对象的`match()`、`replace()`、`search()`、`split()`内部调用转为调用RegExp实例对应的`RegExp.prototype[Symbol.方法]`

### 函数类型的扩展

##### 基本用法

ES6 之前，不能直接为函数的参数指定默认值，只能采用变通的方法。

```javascript
function func(x, y) {
  y = y || 'World';
  console.log(x, y);
}

func('Hello') // Hello World
func('Hello', 'China') // Hello China
func('Hello', '') // Hello World
```

ES6 允许为函数的参数设置默认值，即直接写在参数定义的后面

```javascript
const func = (x, y = 'world') => {
console.log(x, y)
}

func('Hello') // Hello World
func('Hello', 'China') // Hello China
func('Hello', '') // Hello
```

> 注意: 参数变量是默认声明的， 所以不能使用`let`或`const`再次声明

### 运算符的扩展

##### ES6 新增了一个指数运算符(`**`)

```javascript
2 ** 2 // 4
2 ** 3 // 8
```

这个运算符的一个特点是右结合，而不是常见的左结合。多个指数运算符连用时，是从最右边开始计算的。

```javascript
2 ** 3 ** 2  // 相当于 2 ** (3 ** 2)

```
