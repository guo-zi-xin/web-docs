# ES6新特性(一)(常用)

 ES是ECMAScript的缩写， 也就是JavaScript的标准化规范，ECMAScript是一种由 Ecma 国际组织制定的脚本语言标准，它定义了Javascript的语法、类型、操作符、对象和函数等基本组件
 ES6是ECMAScript的第六个版本(2015年发布)，引入了许多新的语言特性和改进，像箭头函数，模版字面量，解构赋值等

### 声明方式 `let`、`const`

##### let

  let 关键字用于声明一个块级作用域的变量。与 var 关键字的区别在于 let 声明的变量只在其所在的块级作用域中有效，而不会被提升到函数作用域。这意味着在使用 let 声明的变量之前
  必须先进行声明, 否则会抛出错误 `ReferenceError`

##### const

  const 关键字是用于声明一个常量，其值在声明后不能再被改变。 const 声明的变量也是块级作用域的，与 let 类似， 但值不可变

```javascript
if (true) {
  let x = 10; //块级作用域
  const y = 20； //常量 块级作用域
  console.log(x) // 10
  console.log(y) // 20
  x = 15 // 正常运行
  y = 10 // 报错 Assignment to constant variable
}
console.log(x) // 报错 x is not defined
console.log(y) // 报错 y is not defined
```

### 变量的解构赋值

##### 数组的解构
  
  ES6 允许按照一定的模式，从数组和对象中提取值，对变量进行赋值， 这个过程被称为解构(Destructuring)

**基本用法**

```javascript
// ES6 之前赋值的写法
let a = 1;
let b = 2;
let c = 3;

///////////////
// ES6 可以写成这种形式
let [a, b, c] = [1, 2, 3]
```

上面这种写法属于“模式匹配”，只要等号两边的数据格式相同，左边的变量就会被赋予对应的值

```javascript
let [foo, [[bar], [bar2]]] = [1, [[2], [3]]]
foo  // 1
bar  // 2
bar2 // 3

let [, , third] = ['foo', 'bar', 'bar2']
third // 'bar2'

let [x, , y] = [1, 2, 3]
x // 1
y // 3

let [head, ...tail] = [1, 2, 3, 4]
head // 1
tail // [2, 3, 4]

let [x, y, ...z] = ['a']
x // 'a'
y // undefined
z // []

let [foo] = []
foo // undefined
let [bar, foo] = [3]
bar // 3
foo // undefined 
```

还有一种情况是不完全解构， 即等号左边的模式，只匹配一部分等号右边的数组：

```javascript
let [x, y] = [1, 2, 3]
x // 1
y // 2

let [a, [b], d] = [1, [2, 3], 4]
a // 1
b // 2
d // 4
```

如果等号的右边不是数组(或者严格地说 不是可遍历的结构)， 那么将会报错

```javascript
// 报错
let [foo] = 1
let [foo] = false
let [foo] = NaN
let [foo] = undefined
let [foo] = null
let [foo] = {}
```

对于数据结构具有 Iterator 接口， 那么都可以采用数组的形式进行解构赋值

```javascript
let [x, y, z] = new Set(['a', 'b', 'c'])
x // 'a'
y // 'b'
z // 'c'

// 这个generator函数是为了生成斐波那契数列
function* fibs() {
  let a = 0;
  let b = 1;
  while(true) {
    yield a;
    [a, b] = [b, a + b]
  }
}

let [first, second, third, fourth, fifth, sixth] = fibs()
sixth // 5
```

**默认值**

解构赋值允许指定默认值

```javascript
let [foo = true] = []
foo // true

let [x, y = 'b'] = ['a'] 
x // 'a'
y // 'b'

let [x, y = 'b'] = ['a', undefined]
x // 'a'
y // 'b'
```

> 注意⚠️：ES6内部使用严格相等运算符(`===`)来判断一个位置是否有值。所以，只有当一个数组成员严格等于`undefined`，默认值才会生效

```javascript
let [x = 1] = [undefined]
x // 1

let [x = 1] = [null]
x // null
```

##### 对象的解构

> 对象的解构与数组有一个重要的不同，数组的元素是按次序排列的，变量的取值由它们的位置决定； 而对象的属性没有次序，变量必须与属性同名，才能取到正确的值

```javascript
let { bar, foo } = { foo: '这是foo', bar: '这是bar'}
foo // '这是foo'
bar // '这是bar'

// 如果解构失败，变量的值等于
let { bar2 } = { foo: '这是foo', bar: '这是bar'}
bar2 // undefined
```

如果变量名与属性名不一致， 则必须写成下面这样

```javascript
let { foo: baz } = { foo: '这是foo', bar: '这是bar'}
baz // '这是foo'

let obj = { first: 'hello', last: 'world' }
let { first: f, last: l } = obj
f // hello
l // world
```

与数组一样， 解构也可以用于嵌套结构的对象

```javascript
let obj = {
  p: ['hello', { y: 'world'}]
}
let { p: [x, { y }] } = obj
x // 'hello'
y // 'world'
// 此时的p是模式，不是变量， 如果想要p也作为变量赋值， 可以写成下面这样 
let { p, p: [x, { y }] } = obj
x // 'hello'
y // 'world'
p // ['hello', { y: 'world' }]
```

**嵌套赋值**

```javascript
let obj = {};
let arr = [];

({ foo: obj.prop, bar: arr[0] } = { foo: 123, bar: true })
obj // { prop: 123 }
arr // [true]

// 如果解构模式是嵌套的对象，而且子对象所在的父属性不存在，那么将会报错

let { foo: { bar } } = { baz: 'baz' } // 报错
```

对象的解构赋值可以取到继承的属性

```javascript
const obj1 = {};
const obj2 = { foo: 'bar' }
Object.setPrototypeOf(obj1, obj2)

const { foo } = obj1
foo // 'bar'
```

**默认值**

对象的解构也能指定默认值, 默认值生效的条件是 对象的属性值严格等于`undefined`

```javascript
var { x = 3 } = {}
x // 3

var { x, y = 5 } = { x = 1 }
x // 1
y // 5

var { x: y = 3 } = {}
y // 3

var { x: y = 3 } = { x = 5 }
y // 5

var { message: msg = 'Something wen wrong' } = {}
msg // 'Something wen wrong'
```

::: danger 注意

1. 如果要将一个已经声明的变量用于解构赋值，需要注意不能把花括号写在行首， 否则会报错

   ```javascript
    let x;
    { x } = { x = 1 }
    // 报错 SyntaxError： syntax error
    ```

    因为Javascript会将`{ x }`理解成一个代码块，从而发生语法错误， 正确写法应该是

    ```javascript
    let x;
    ({ x } = { x = 1 })
    ```

2. 解构赋值允许等号左边的模式之中，不放置任何变量名。 因此 可以写出非常古怪的赋值表达式, 但没有实际意义

    ```javascript
    ({} = [true, false]);
    ({} = 'abc');
    ({} = []);
    ```

3. 由于数组本质是特殊的对象， 因此可以对数组进行对象属性的解构

   ```javascript
   let arr = [1, 2, 3]
   let { 0: first, [arr.length - 1]: last } = arr
   first // 1
   last // 3
   ```

:::

##### 字符串的解构

字符串也可以解构赋值， 这是因为在解构字符串的时候， 字符串被转化成了一个类数组对象

```javascript
const [a, b, c, d, e] = 'hello'
a // 'h'
b // 'e'
c // 'l'
d // 'l'
e // 'o'

// 类数组都具有length属性， 因此还可以对这个属性进行解构赋值
let { length: len } = 'hello'
len // 5
```

##### 数值与布尔值的解构

解构赋值时候， 如果等号右边是数值和布尔值， 则先会转换为对象

```javascript
let { toString: s } = 123
s === Number.prototype.toString // true

let {toString: s} = true
s === Boolean.prototype.toString // true
```

##### 函数的参数的解构

```javascript
function add ([x, y]) {
  return x + y
}
add([1, 2]) // 3
```

上述示例中， 函数 add 的参数表面上是一个数组，但在传入参数的那一刻， 数组参数就被解构成变量 x 和 y 对于函数内部的代码来说， 它们能感受到参数就是 x 和 y

类似数组的map方法的参数也可以被解构

```javascript
const arr = [[1, 2], [3, 4]]
const result = arr.map(([a, b]) => a + b)
result // [1, 3]
```

**默认值**

函数参数的解构也可以使用默认值

```javascript
function move({x = 0, y = 0 } = {}) {
  return [x, y]
}

move({ x: 3, y: 8 }) // [3, 8]
move({ x: 3 }) // [3, 0]
move({}) // [0, 0]
move() // [0, 0]
```

:::warning 注意，下面的写法会有不一样的结果

```javascript
function move({ x, y } = { x: 0, y: 0 }) {
  return [x, y]
}
move({ x: 3, y: 8 }) // [3, 8]
move({ x: 3 }) // [3, undefined]
move({}) // [undefined, undefined]
move() // [0, 0]
```

:::

### 函数参数默认值

ES6 中， 我们可以在函数参数中设置默认值，这意味着如果调用函数的时候没有为参数提供有效值，它们将会使用默认值， 这对简化函数调用和处理缺少参数时的情况有用

```javascript
function greet(name = 'world') {
  console.log(`hello, ${name}!`)
}
greet() // 'hello, world!'
greet('hhh') // 'hello, hhh!'
```

参数变量是默认声明的， 所以不能用 `let`或 `const`再次声明

```javascript
function greet(name = 'world') {
  let name = 'name' // 报错 error
  const name = 2 // 报错 error
}
```

> 引申: 使用函数默认值时， 函数不能有同名参数

```javascript
// 正常运行
function foo(x,x,y) {
  // ...
}

// 报错 SyntaxError: Duplicate parameter name not allowed in this context
function foo(x, x, y = 1) {
  // ...
}
```

另外， 还有一个比较容易忽略的地方是，参数值默认是不穿值的，而是每次重新计算默认值表达式的值，也就是说， 参数默认值是惰性求值的

```javascript
let x = 99
function foo(p = x + 1) {
  console.log(p)
}
foo() // 100 

x = 100 
foo() 101

```

### 箭头函数

- 箭头函数具有简洁的语法，清晰的上下文，继承外部作用域的arguments等特点， 适合简化代码，避免this指向问题和明确的参数处理， 但不适合构造函数和需要自己this值的场景

```javascript
// 箭头函数示例
const add = (a, b) => a + b
console.log(add(2, 3)) // 5

//函数表达式示例 

const multiply = function(a, b) {
  return a * b
}
console.log(multiply(2, 3)) // 6
```

##### 使用注意点

1. 箭头函数没有自己的`this`对象
2. 不可以当作构造函数，也就是说， 不可以对箭头函数使用`new`指令， 否则会抛出错误
3. 不可以使用`arguments`对象， 该对象在函数体内不存在， 如果要用， 可以用 rest 参数代替
4. 不可以使用 yield 命令，因此箭头函数不能用作 Generator 函数

##### 箭头函数与普通函数的区别

- 箭头函数是匿名函数，不能作为构造函数， 不能使用new
- 箭头函数不能绑定 arguments，要用 rest 参数 解决
- 箭头函数没有原型属性
- 箭头函数的 this 永远是指向其上下文的 this
- 箭头函数不能绑定 this， 会捕获其所在的上下文的this的值，最为自己的this的值

### 模版字符串

模版字符串是ES6中引入的一种新的字符串语法，它允许字符串中插入变量或者表达式，而不需要使用字符串拼接符号。模版字符串使用反引号 `` 包围，并使用 **${}** 语法来插入变量或者表达式

在 **${}** 语法中， 我们可以放置任何有效的Javascript表达式， 这些表达式的值将被插入到字符串中

```javascript
const name = 'world'
console.log(`hello, ${name}!`) // 'hello, world!'

//插入dom标签
const parent = document.querySelector('.parent');
const content = '这是一个div标签'
const templateString = `<div>${content}</div>`;
parent.innerHTML = templateString;
```

### 扩展操作符

扩展操作符用于展开可迭代对象(数组、字符串等)，好比 rest 参数的逆运算，将其元素逐个展开，以便于在函数调用、数组字面量、对象字面量中使用

使用扩展操作符时， 需要在展开的可迭代对象前面加上三个点(...)

::: details 函数 rest 参数
ES6中引入 rest 参数(形式为`...变量名`)，用于获取函数的多余参数，这样就不需要使用 arguments 对象了。

rest参数搭配的变量是一个数组， 该变量将对于的参数放入到数组中

```javascript
// 这个示例的含义是表示一个求和函数，利用rest参数，可以向该函数传入任意数目的参数
function add (...values) {
  let sum = 0
  for (let val of values) {
    sum += val
  }
  return sum
}
add(2, 5, 3) // 10
```

- rest 参数代替 arguments 变量

  arguments 对象不是数组， 而是一个类数组的对象，所以为了使用数组的方法， 必须使用 Array.form() 先将其转为数组。

  rest 参数则是一个真正的数组， 可以直接使用数组特有的方法

```javascript
// arguments 变量的写法
function sortNumbers() {
  return Array.form(arguments).sort()
}

// rest 参数的写法

const sortNumbers = (...numbers) => numbers.sort()
```

> :bangbang:  rest参数之后不能再有其它参数(rest 只能是最后一个参数)， 否则会报错
>
> 函数的`length`属性， 不包括rest参数
:::

##### 展开数组

```javascript
const arr1 = [1, 2, 3]
const arr2 = [...arr1, 4, 5] // [1, 2, 3, 4, 5]
```

##### 传递参数给函数

```javascript

function sum(a, b, c) {
  return a + b + c
}
const numbers = [1, 2, 3]
const result = sum(...numbers) // 6
```

##### 浅拷贝数组或对象

```javascript
const arr1 = [1, 2, 3]
const arr2 = [...arr1] // [1, 2, 3]

const obj1 = { name: 'Alex', age: 20 }
const obj2 = {...obj1}  // { name: 'Alex', age: 20 }
```

### 对象字面量简化

ES6引入了一种更简洁的方式来定义对象字面量，即ES6对象字面量语法。它提供了一种更方便的方法来定义和初始化对象属性。它是ES6中一个非常方便的特性，可以提高代码的可读性和可维护性。

##### 属性的简介表示法

ES6中， 可以使用更简洁的语法来定义对象字面量， 还可以直接在对象字面量中定义方法，而不需要使用`function`关键字

```javascript
const name = 'Alex'
const age = 18
const obj = { name, age, fun() {console.log(this.name, this.age)}}
```

##### 属性名表达式

Javascript中 定义对象的属性， 有两种方法

```javascript
// 方法一
obj.foo = true

// 方法二(ES6)
obj['a' + 'bc'] = 123
```

ES6 允许字面量定义对象时， 用方法二(表达式)作为对抗的属性名，即吧表达式放在方括号内

```javascript
let propKey = 'foo'

let obj = { [propKey]: true, ['a' + 'bc']: 123 }

let lastWorld = 'last world'
const aa = { 'first world': 'hello', [lastWorld]: 'world' }

aa['first world'] // 'hello'
aa[lastWorld] // 'world'
aa['last world'] // 'world'
```

表达式还可以用方法名

```javascript
let obj = { 
  ['h' + 'ello']() {
    return 'hi'
  }
}
obj.hello() // 'hi'
```

> 注意
>
> 1. 属性名表达式与简洁表示法，不能同时使用，会报错
> 2. 属性名表达式如果是一个对象，默认情况下会自动将对象转为字符串`[object Object]`

```javascript
const foo = 'bar'
const bar = 'abc'
const baz = { [foo] } // 报错

const foos = 'bar'
const baz = { [foo]: 'abc' } // 正常运行

// 属性名表达式为对象
const keyA = { a: 1 };
const keyB = { b: 2 };
const myObject = {
  [keyA]: 'valueA',
  [keyB]: 'valueB'
}
myObject // Object类型， 返回 { [object Object]: 'valueB'}
```

### 类

ES6引入了类（class）的概念，使得面向对象的编程变得更加直观和易于理解。类是一种蓝图或模板，用于创建具有相同属性和方法的对象

```javascript
class Book {
  constructor(title, author) {
    this.title = title;
    this.author = author
  }
  getSummary() {
    return `书名:${this.title}, 作者:${this.author}`
  }
}

// 创建 Book类的实例
const book1 = new Book('三体', '刘慈欣')
console.log(book1.getSummary()) // 书名:三体, 作者:刘慈欣
```

### 模块化

- 模块化是一种组织和管理JavaScript代码的方法，它将代码拆分为独立的模块，每个模块都有自己的作用域和功能。这种方法有助于提高代码的可维护性、可重用性和可扩展性。

- 在ES6之前，JavaScript并没有原生的模块化支持。开发人员通常使用一些第三方库或模式来实现模块化，例如CommonJS和AMD。

- 然而，ES6引入了原生的模块化系统，通过import和export关键字来实现。下面是一个示例：

```javascript
  // utils.js
  // 导出一个常量
  export const PI = 3.14;
  // 导出一个函数
  export const area = (r) => PI * r ** 2

  // main.js
  // 导入常量和函数
  import { PI, area } from './utils.js';
  console.log(PI,area(3));//3.14 28.26
```
