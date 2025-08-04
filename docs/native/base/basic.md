# JavaScript 数据类型

**Javascript中， 数据类型分为两种类型: `基本数据类型`和`引用数据类型`**

## 区别

- **存储位置不同**

*基本数据类型*存储在`栈`中，空间小、大小固定、操作频繁 栈中存放的是对应的值

*引用数据类型*对应的值存储在`堆`中， 数据量大， 大小不固定，在栈中存放的则是指向堆内存的地址

:::info 堆与栈
**栈**: 先进后出，简易的存储，可以自动释放，一般存储的是基本数据类型

**堆**: 本身是无序的，半自动或者手动释放，如果无引用，则由垃圾回收机制进行回收
:::

- **效果不同**

**基本数据类型直接赋值后，不存在引用关系**

**引用数据类型是引用关系**

### 基本数据类型

- 基本数据类型有七种： `undefined`、`null`、`boolean`、`number`、`string`、`symbol`、`BigInt`

```typescript
// undefined
let a  // 输出 undefined

// null 特殊的指针指向空指针
a = null  // 输出 null

// Boolean
a = true // 输出 true

// Number
a = 123  // 输出123

// String
a = '123' // 输出 '123'

// Symbol Symbol声明的是一个独一无二的值，并且不可改变  ====> 全局变量冲突， 内部变量覆盖
a = Symbol('1')  // 类型为 symbol

// BigInt 可以支持任意精度正数，安全地存储和操作大数据，即便超出了number的安全证书范围(21位)
a = 900719975470991n // bigint (> 2^53-1)的整数
a = BigInt('900719975470991')

```

### 引用数据类型

- 引用数据类型有 `Object`、`Array`、`Function`

```typescript
// Object
let a = {a:1, b:2, c:3} // js对象的本质并不是直接基于类， 是基于构造函数 + 原型链的传递方式  constructor + prototype

// Array  Array本身是基于object的一个子类， 本质上是带有数字索引和对应方法(push、pop等)的对象

let a = [1,2,3]

// Function typeof操作符会返回'function' 但也是对象的一个特殊子类，是一个特殊引用类型，但是不参与存储数据， 因此没有'拷贝函数'的说法
function fun = () {}
```

- 一些其他的引用类型 `Date`、`RegExp`、`Map`、`Set`等

## 类型检测

### `typeof` 运算符

`typeof` 运算符常用于检测基本数据类型, `number`、`string`、`boolean`、`undefined`、`function`、`symbol`、`bigint` 检测函数时会返回`function`

**局限性**

- **typeof null** 返回的是 **object**(历史遗留问题)

- 无法区分数组、普通对象和其他引用类型(`Date`等)

```typescript
console.log(typeof 42) // 'number'
console.log(typeof 'hello') // 'string'
console.log(typeof true) // 'boolean'
console.log(typeof undefined) // 'undefined'
console.log(typeof Symbol(123)) // 'symbol'
console.log(typeof 123n) // 'BigInt'

// 特例
console.log(typeof NaN) // 'number'

// null 返回的操作类型是object 属于历史遗留问题
console.log(typeof null) // 'object'

console.log(typeof {a:1, b:2, c:3}) // 'object'
// 特殊引用类型 函数 返回function
console.log(typeof function fun(){}) // 'function'

console.log(typeof [1,2,3]) // 'object'

console.log(typeof new Date()) // 'object'
```

### 检测 null

通过全等号`===`来判断一个值是否为null：

```typescript
const a = null
console.log(a === null) // 返回true
```

### 检测是否为NaN

通过`isNaN()`或者`Number.isNaN()`方法来检测是否为NaN

#### 两者区别

- `isNaN`
  `isNaN`中包含了一个隐式转换：isNaN ==> 接收参数 ==> 尝试参数转换为数值类型 ==>不能被转换数值的参数 返回true
   ==> 非数字类型返回true

- `Number.isNaN()`
  `Number.isNaN()` ==> 接收参数 ==> 判断参数是否为数字 ==> 判断是否为NaN ===> 不会进行数据类型转换

```typescript
console.log(isNaN(NaN))       // true
console.log(isNaN('abc'))     // true

console.log(Number.isNaN(NaN))       // true
console.log(Number.isNaN('abc'))     // false(全局 isNaN('abc') 会返回 true)
```

### `instanceof` 运算符

- **原理**： 通过检查对象的原型链上是否包含构造函数的prototype

-**适用范围**： 检测自定义类或者内置对象 (`Date`、`RegExp`等), 不能检测基本数据类型

- **局限性**： 在多全局环境中(如 iframe中)可能失效

```typescript
const arr = [1, 2, 3]

console.log(arr instanceof Array) // true
console.log(arr instanceof Object)   // true(所有引用类型都是 Object 的实例)

const date = new Date()

console.log(date instanceof Date)    // true
```

::: warning `constructor`是否可以用来检测数据类型
`constructor` 代表的是构造函数指向的类型，虽然也可以检测数据类型，但由于可以被修改， 所以结果不一定准确

```typescript
(2).constructor === Number // true
([]).constructor === Array // true
// 声明一个构造函数
const Fn = () => {}

// 如果直接判断
fun().constructor === Fn // 返回 true 初始的构造函数的类型 
Fn.prototype = new Array()
let fun = new Fn()

fun().constructor === Array // 返回的是true 
```

:::

### `Object.prototype.toString.call()`

- 最全面的检测方法，返回`[Object Type]`类型的字符串

- 适用于所有类型

```typescript
console.log(Object.prototype.toString.call(42))        // [object Number]
console.log(Object.prototype.toString.call('hello'))  // [object String]
console.log(Object.prototype.toString.call(null))      // [object Null]
console.log(Object.prototype.toString.call(undefined)) // [object Undefined]
console.log(Object.prototype.toString.call([]))        // [object Array]
console.log(Object.prototype.toString.call(/abc/))     // [object RegExp]
console.log(Object.prototype.toString.call(new Date())) //[object Date]
```

:::danger ``Object.prototype.toString.call()`方法与`obj.tostring()`区别
为了保证toString是object上的原型方法，根据原型链知识，优先调用本对象属性，后续再往原型链上找

当对象中的某个属性和Object的属性重名时候， 使用顺序遵循原型链查找规则 具体顺序是：

- 对象自身的属性
如果对象直接拥有该属性(无论是通过赋值、构造函数，还是 `Object.defineProperty` 定义)，则直接返回。

**检测方法**：`obj.hasOwnProperty(prop)` 返回 `true`

- 原型链上的属性

如果对象自身没有该属性，则沿着原型链(`__proto__` 或 `Object.getPrototypeOf(obj)`)向上查找：

  - 先检查直接原型(如 `obj.__proto__`)

  - 然后检查原型的原型(即 `obj.__proto__.__proto__`)

  - 直到 `Object.prototype`(原型链顶端)

- Object.prototype 的默认属性

如果原型链上均未找到，且属性名与`Object.prototype` 上的属性(如 `toString`、`hasOwnProperty`)重名，则返回 `Object.prototype` 上的定义
:::

## 类型转换

### 隐式转换

当操作涉及不同类型的值时，JavaScript 会自动进行类型转换。常见场景包括：

1. **算术运算符 (`+`, `-`, `*`,`/`, `%`)**

   - `+`**(加法)** 如果任意一个操作数是字符串，则是进行拼接， 否则会尝试转换为数字再相加

    ```typescript
    console.log(1 + 2) // 3 加法运算
    console.log(1 + '2')      // '12'(字符串拼接)

    console.log(1 + true)     // 2(true → 1)
    console.log('1' + true)     // '1true' // 字符串拼接

    console.log(1 + undefined) // NaN(undefined → NaN)
    console.log('1' + undefined) // '1undefined'

    console.log(1 + null)     // 1(null → 0)
    console.log('1' + null) // '1null'

    console.log(1 + {}) // 1[object Object]
    console.log('1' + {}) // 1[object Object]

    console.log(1 + []) // '1'([] → '')
    console.log('1' + []) // '1'([] → '')

    console.log(1 + [2,3,4]) // '12,3,4' ([2,3,4] → '2,3,4')
    ```

2. **比较运算符 (`==`, `>`, `<`, `>=`, `<=`)**

    - `==` 如果是宽松相等，类型不同的时候是会进行隐式转换， 但`===`则不会转换类型

     ```typescript
      console.log(1 == "1");     // true（字符串 "1" → 数字 1）
      console.log(0 == false);   // true（false → 0）
      console.log("" == 0);      // true（"" → 0）
      console.log(null == undefined); // true（特殊规则）
     ```

    - `>`、`<`、`>=`、`<=` 如果一边是数字，另一边会被转换为数字， 如果两边都是字符串，则按字典序比较

    ```typescript
    console.log("10" > 5);     // true（"10" → 10）
    console.log("abc" > "abd");// false（按字符编码比较）
    console.log("10" > "5");   // false（字符串比较，"1" < "5"）
    ```

3. **逻辑运算符 (`&&`, `||`, `!`)**

    - `!`（逻辑非）先转换为 Boolean，再取反

    - `&&` 和 `||` 返回第一个能决定结果的原始值（不一定返回 `true`/`false`）

    ```typescript
    console.log(0 && "hi");   // 0（0 是 false，直接返回）
    console.log("" || 42);    // 42（"" 是 false，返回 42）
    ```

4. **`if`、`while` 等条件判断**

   - 任何值都会被隐式转换为 `Boolean`

### 显式转换

- Number() 将任意类型的值转换为数值
- parseInt() 将任意类型的值转换为数值
- parsefloat() 将任意类型转换为浮点数
- String() 将任意类型转换为字符串
- Boolean() 将任意类型转换为布尔值 falsely变量

> **JS对象包装类**：在 JavaScript 中，原始值（primitive values）如字符串、数字和布尔值都有对应的对象包装类
