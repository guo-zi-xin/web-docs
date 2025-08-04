# 关于this指向

### this指向的规律

1. 在函数体中， 非显式或隐式地简单调用函数时，在严格模式下， 函数内的 `this` 会
被绑定到 `undefined` 上， 在非严格模式下则会被绑定到全局对象 `window/global`上

2. 一般使用 `new` 方法调用构造函数时， 构造函数的`this`会被绑定到新创建的对象上

3. 一般通过 `call`、`apply`、`bind` 方法显式调用函数时，函数体内的 `this` 会被绑定到指定参数的对象上

4. 一般通过上下文对象调用函数时，函数体内的`this` 会被绑定到该对象上, 在更复杂的嵌套关系中， `this`指向的是最后一个调用它的对象

5. 在箭头函数中，`this` 指向是由外层(函数或全局)作用域来决定的

##### 全局环境中的`this`

```typescript
/**
 * 正常模式下 this指向的是 全局window对象
 */
function func1 ():void {
  console.log(this)
}

/**
 *  严格模式下 this指向是 undefined
 */
function func2 () :void {
  'use strict'
  console.log(this)
}

func1() // 打印 window
func2() // 打印 undefined
```

```typescript
const foo = {
  bar: 10,
  func: function () {
    console.log(this)
    console.log(this.bar)
  }
}
const func1 = foo.func
func1() // this打印出来为 window this.bar打印出来为 undefined
```

> 上述示例中的`this`结果为`window`。 虽然`func`函数 是`foo` 对象中的方法，但是在赋值给`func1`之后， 调用`func1`是在全局`window`中执行的， 所以此时的`this`指
向`window`; 如果是直接调用 `foo.func()` 那么`this`指向的是`foo`对象

##### 上下文对象中调用的`this`

```typescript
interface Student {
  name: string
  fn: () => Student
}
const student: Student = {
  name: 'Lucas',
  fn: function () {
    return this
  }
}
console.log(student.fn() === student) // 返回true
```

**当为更复杂的嵌套关系**

```typescript
/**
 * 这里嵌套了两层对象， 此时this的指向应该是最后一个调用它的对象
 */
const person = {
  name: 'Lucas',
  brother: {
    name: 'Mike',
    fn: function() {
      return this.name
    }
  }
}

console.log(person.brother.fn()) //输出Mike 
```

```typescript
const o1 = {
  text: 'o1',
  fn: function () {
    return this.text 
  }
}

const o2 = {
  text: 'o2',
  fn: function () {
    return o1.fn()
  }
}

const o3 = {
  text: 'o3',
  fn: function () {
    var fn = o1.fn
    return fn()
  }
}
/**
 * 上述第一个例子中 函数返回了this.text, 并且通过o1对象直接调用， 
 * 所以打印项为 'o1'
 * 
 * 第二个例子中， 函数返回了 o1.fn()的调用 
 * 此时已经执行完成， 结果为'o1',所以o2.fn() 打印 'o1'
 * 
 * 第三个例子中， 通过把o1.fn 赋值给 fn 变量， return 的值时 执行fn函数， 
 * 此时this指向window， window上没有text属性，所以返回undefined
 */
console.log(o1.fn()) // 'o1'
console.log(o2.fn()) // 'o1'
console.log(o3.fn()) // undefined
```

::: warning 拓展
**如果想要让console.log(o2.fn())语句输出为 o2 的处理方法**

1. 可以使用 `call`、`bind`、`apply` 修改`this`指向的方法， 将`this`指向到o2

2. 也可以通过修改o2对象中return返回的调用方式：

```typescript
const o1 = {
  text: 'o1',
  fn: function () {
    return this.text
  }
}

const o2 = {
  text: 'o2',
  fn: o1.fn
}

console.log(o2.fn()) // 此时打印o2
```

:::

##### 通过bind、call、apply 改变this指向

> **它们都是用来改变相关函数的 this 指向， 但这个`call`、`apply`是直接进行相关函数调用的；`bind`不会执行相关函数，而是返回一个函数，这个新的函数已经自动绑定了新的`this`指向，我们可以手动调用它:**

```typescript
// 1
const target = {} 
fn.call(target, 'arg1', 'arg2')

// 2 
const target = {}
fn.apply(target, ['arg1', 'arg2'])

// 3 
const target = {}
fn.bind(target, 'arg1', 'arg2')()
```

**示例**

```typescript
const foo = {
  name: 'Lucas',
  logName: function () {
    console.log(this.name)
  }
}

const bar = {
  name: 'Mike',
}

console.log(foo.logName.call(bar)) // 输出为 'Mike'
```

##### 构造函数和this

```typescript
function Foo() {
  this.bar = 'Lucas'
}

const instance = new Foo()
console.log(instance.bar) // 输出 'Lucas'
```

::: info `new`操作符的作用
 `new`操作符用于创建一个给定构造函数的实例对象

**主要的工作**

- 创建一个新的对象`obj`
- 将对象与构造函数通过原型链连接起来
- 将构造函数中的`this`绑定到新建的对象`obj`上
- 根据构造函数返回类型作为判断， 如果是原始值则被忽略，如果是返回对象， 需要正常处理

上述过程可以用如下代码表述

```typescript
var obj = {}
obj.__proto__ = Foo.prototype
Foo.call(obj)
```

:::

**如果构造函数中出现了显式 `return` 的状况，那么需要注意，其可以洗分为两种情况**

- 执行一个构造函数， 如果返回的是一个对象(复杂类型)， 则`this`指向被返回的对象

```typescript
function Foo () {
  this.user = 'Lucas'
  const o = {}
  return o
}

const instance = new Foo()
console.log(instance.user) // 输出 undefined
```

- 执行一个构造函数， 如果返回的不是一个对象(基本类型)，那么 `this`仍然指向实例

```typescript
function Foo () {
  this.user = 'Lucas'
  const o = 1
  return o
}

const instance = new Foo()
console.log(instance.user) // 输出 'Lucas'
```

##### 箭头函数中的this

> 箭头函数的`this`指向的是由其所属函数或者全局作用域决定的

```typescript
/**
 * this 出现在 setTimeout的 匿名函数中， 因此this指向window对象
 */
const foo = {
  fn: function () {
    setTimeout(function() {
      console.log(this)
    })
  }
}
console.log(foo.fn()) // 输出 window 对象

/**
 * 如果想要this指向 foo 这个对象，则可以使用箭头函数来解决
 */

const foo = {
  fn: function () {
    setTimeout(() => {
      console.log(this)
    })
  }
}
console.log(foo.fn()) // 此时this指向的 foo对象
```

### this优先级

**我们常常把通过 `call`、`bind`、`apply`、`new`对 `this`进行绑定的情况称为显示绑定；**

**根据调用关系确定`this`指向的情况称为隐式绑定**

> 显示绑定的优先级会比隐式绑定的优先级高

```typescript
function foo(a) {
  console.log(this.a)
}

const obj1 = {
  a: 1,
  foo: foo
}

const obj2 = {
  a: 2,
  foo: foo
}

obj1.foo.call(obj2) // 输出为2
obj2.foo.call(obj1) // 输出为1

/**
 * 说明 call apply 方法的优先级会更高
 */

```

```typescript
function foo (a) {
  this.a = a
}
const obj1 = {}
var bar = foo.bind(obj1)
bar(2)
console.log(obj1.a) //输出值为 2 
```

上述代码中通过`bind`函数中的`this`绑定为obj1对象。 执行bar(2)后， obj1的值为 {a: 2}, 所以输出值为2

> **当使用 bar作为构造函数时， new的优先级比bind绑定的优先级更高**

```typescript
const bar1 = new bar(3)
console.log(bar1) // 输出 3 
```

> 箭头函数的绑定无法被修改， 因此属于优先级高的一列

```typescript
function foo () {
  return a => {
    console.log(this.a)
  }
}

const obj1 = {
  a: 2
}

const obj2 = {
  a: 3
}
/**
 * 箭头函数捕获的是其外部作用域的 this 值，而不是在调用时绑定的 this 值。
 * 
 * 因此，无论如何调用 bar，它始终会打印 foo 函数所在作用域的 this.a 值，
 * 而不会受到 call 方法的影响。
 */
const bar = foo.call(obj1) 
console.log(bar) // 这一步打印结果为 foo函数体
console.log(bar.call(obj2)) // 这里打印的是 2
```

> 如果修改了foo函数为箭头函数的形式：

```typescript
var a = 123

const foo = () => a => {
  console.log(this.a)
}

const obj1 = {
  a: 2
}

const obj2 = {
  a: 3
}

var bar = foo.call(obj1)
console.log(bar.call(obj2)) // 输出为123， 因为箭头函数的this无法被修改
```

::: warning 注意

如果把上述代码中的变量a的声明换成const 则 输出结果会被改变 因为 **`const`声明的变量是不会被放在全局作用域中， 它有自己的块级作用域**

```typescript
var a = 123

const foo = () => a => {
  console.log(this.a)
}

const obj1 = {
  a: 2
}

const obj2 = {
  a: 3
}

var bar = foo.call(obj1)
console.log(bar.call(obj2)) 
/**
 *  输出为undefined， 
 * 
 * 因为箭头函数的this无法被修改, 
 * 并且 const 盛名的变量是块级作用域， 不在window全局对象中.
 */
```

:::
