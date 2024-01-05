# ES6新特性(二)(常用)

### proxy

proxy 用于修改某些操作的默认行为，等同于在语言层面做出修改，所以属于一种 *元编程(meta programming)*, 即对编程语言进行编程

proxy可以理解成， 在目标对象之前架设一层拦截，外界对该对象进行访问，都必须先通过这层拦截，因此提供了一种机制，可以对外界的访问进行过滤和改写。proxy这个词的原意是代理，用在这里表示由它
来代理某些操作， 可以翻译为 '代理器'

```javascript
let obj = new Proxy({}, {
  get(target, propKey, receiver) {
    console.log(`getting ${propkey}`)
    return Reflect.get(target, propKey, receiver)
  },
  set(target, propKey, value, receiver) {
    console.log(`setting ${propKey}`)
    return Reflect.set(target, propKey, value, receiver)
  }
})
```

上面代码对一个空对象假设了一层拦截，重定义了属性的读取(`get`) 和设置(`set`)行为， 运行结果为

```javascript
obj.count = 1
// setting count!

++obj.count
// getting count
// setting count
// 2
```

上面代码说明 Proxy实际上重载(overload)了点运算符， 即用自己的定义覆盖了语言的原始定义

ES6 原生提供 Proxy 构造函数， 用来生成 Proxy 实例

```javascript
var proxy = new Proxy(target, handler);
```

- 示例

```javascript
var proxy = new proxy({}, {
  get(target, propKey) {
    return 35
  }
})

proxy.time // 35
proxy.name // 35
proxy.title // 35
```

上面这段代码中，作为构造函数， Proxy 接收两个参数， 第一个参数是需要代理的目标对象(上例是一个空对象)， 即如果没有 Proxy 的介入， 操作原来要访问的就是这个对象；

第二个参数是一个配置对象， 对于每一个被代理的操作，需要提供一个对应的处理函数，该函数将拦截对应的操作， 如上面代码中的 `get` 方法, 用来拦截对目标对象属性的访问请求。

`get` 方法的两个参数分别是目标对象和要访问的属性， 可以看到， 由于拦截器函数总是返回 `35`,  所以访问任何属性都会得到 `35`

::: info 注意
要使得 Proxy 起作用，必须针对 Proxy 实例(上例是 proxy 对象) 进行操作， 而不是针对目标对象(上例是空对象)进行操作

如果 handler 没有设置任何拦截， 那就等同于直接通向原对象

```javascript
var target = ()
var handler = ()
var proxy = new Proxy(target, handler)

proxy.a = 'b'
target.a // 'b'
```

上面代码中， handler 是一个空对象，没有任何拦截效果， 访问 proxy 就等同于 访问 target

一个技巧是将 Proxy 对象， 设置到 object.proxy 属性， 从而可以在 object 上调用

```javascript
var object = { proxy: new Proxy(target, handler) } 
```

Proxy 实例也可以作为其他对象的原型对象

```javascript
var proxy = new Proxy({}, {
  get(target, propKey) {
    return 35
  }
})

let obj = Object.create(proxy)
obj.time // 35
```

上面代码中， proxy 对象是 obj 对象的原型， obj对象本身没有time属性，所以根据原型链， 会在 proxy 对象上读取该属性，导致被拦截
:::

同一个拦截器函数，可以设置拦截多个操作

```javascript
var handler = {

  // 对其属性进行访问时
  get(target, name) {
    if (name === 'prototype') {
      return Object.prototype
    }
    return `Hello, ${name}`
  },

  // 当被作为函数调用时
  apply(target, thisBinding,args) {
    return args[0]
  },
  
  // 当被用作构造函数实例化时
  construct(target, args) {
    return { value: args[1] }
  }
};

var fproxy = new Proxy(function(x, y) {
  return x + y
}, handler)

fproxy(1, 2) // 1  由于被当作函数调用， 所以返回传入的第一个值
new fpaoxy(1, 2) // { value: 2 } 通过 new 操作符被用作构造函数调用， 返回一个对象， 对象的key为value 值为第二个传入的值
fproxy.prototype === Object.prototype // true 访问fproxy上的属性， proxy拦截后判断属性名等于 prototype 修改为返回   Object.prototype 所以为 true
fproxy.foo === "Hello, foo" // true  访问fproxy上的属性， proxy拦截后修改为返回 'Hello, foo'
```

#### Proxy handler 支持的拦截操作

|操作|功能|返回值|
|:--|:--|:--|
|`get(target, propKey, receiver)`|拦截对象属性的读取，比如 `proxy.foo`或 `proxy['foo']`|-｜
|`set(target, propKey, value, receiver)`|拦截对象属性的设置，比如 `proxy.foo = v` 或 `proxy['foo'] = v`|boolean|
|`has(target,propKey)`|拦截`propKey in proxy`的操作|boolean|
|`deleteProperty(target, propKey)`| 拦截 `delete proxy[propKey]`的操作|boolean|
|`ownKeys(target)`|拦截 `Object.getOwnPropertyNames(proxy)`、`Object.getOwnPropertySymbols(proxy)`、`Object.keys(proxy)`、
`for...in`循环， 该方法返回目标对象所有自身的属性的属性名， 而`Object.keys()`的返回结果仅包括目标对象自身的可遍历属性|Array|
|`getOwnPropertyDescriptor(target, propKey)`|拦截`Object.getOwnPropertyDescriptor(proxy, propKey)`|属性的描述对象|
|`defineProperty(target, propKey, propDesc)`|拦截 `Object.defineProperty(proxy, propKey, propDesc)`、
`Object.defineProperties(proxy, propDescs)`|boolean|
|`preventExtensions(target)`|拦截`Object.preventExtensions(proxy)`|boolean|
|`getPrototypeOf(target)`|拦截`Object.getPrototypeOf(proxy)`|object|
|`isExtensible(target)`|拦截`Object.isExtensible(proxy)`|boolean|
|`setPrototypeOf(target, proto)`|拦截`Object.setPrototypeOf(proxy, proto)`, 如果目标对象是函数，那么还有两种额外操作可拦截|boolean|
|`apply(target, object, args)`|拦截 Proxy 实例作为函数调用的操作，比如`proxy(...args)`、`proxy.call(object, ...args)`、`proxy.apply(...)`|-|
|`construct(target, args)`|拦截 Proxy 实例作为构造函数调用的操作, 比如new proxy(...args)|-|

#### Proxy 实例的方法(常用)

##### get()

get 方法用于拦截某个属性的读取操作，可以接收三个函数，依次为目标对象、属性名和proxy实例本身(严格地说，是操作行为所针对的对象)，其中最后一个参数可选

- 示例

```javascript
var person = {
  name: '张三'
};

let proxy = new Proxy(person, {
  get(target, propKey) {
    if (propKey in target) {
      return target[propKey]
    } else {
      throw new referenceError(`Prop name \ ${propKey} \ does not exist`)
    }
  }
})
```

上面代码标识， 如果访问目标对象不存在的属性，会抛出一个错误。如果没有这个拦截函数，访问不存在的属性， 只会返回`undefined`

**get 方法可以被继承**

```javascript
let proto = new Proxy({}, {
  get(target, propertyKey, receiver) {
    console.log(`GET ${propertyKey}`)
    return target[propertyKey]
  }
})

let obj = Object.create(proto)
obj.foo // 'GET foo'
```

上面代码中， 拦截操作定义在 Prototype 对象上面， 所以如果读取 obj 对象 继承属性时，拦截就会生效。

- 实现数组读取负数的索引
  
```javascript
function createArray(...elements) {
  let handler = {
    get(target, propKey,receiver) {
      let index = Number(propKey)
      if (index < 0) {
        propKey = String(target.length + index)
      }
      return Reflect.get(target, propKey,receiver)
    }
  }

  let target = []
  target.push(...elements)
  return new Proxy(target, handler)
}
let arr = createArray('a', 'b', 'c')
arr[-1] // 'c'
```

- 实现链式操作

```javascript
var pipe = function (value) {
  var funcStack = []
  var oproxy = new Proxy({}, {
    get: function(pipeObject, fnname) {
      if (fnName === 'get') {
        return funcStack.reduce(function(val, fn) {
          return fn(val)
        }, value)
      }
      funcStack.push(window[fnName])
      return oproxy
    }
  })

  return oproxy
}

var double = n => n * 2
var pow = n => n * n
var reversetInt = n => n.toString().split('').reverse().join('') || 0

pipe(3).double.pow.reverseInt.get
```

##### set()

set 方法用来拦截某个属性的赋值操作, 可以接受四个参数，依次为目标对象、属性名、属性值和 Proxy 实例本身，其中最后一个参数可选

嘉定 Person 对象有一个 age 属性， 该属性应该是一个不大于 200 的整数， 那么可以使用 Proxy 保证 age 的属性值符合要求

```javascript
let validator = {
  set(obj, prop, value) {
    if (prop === 'age') {
      if (!Number.isInteger(value)) {
        throw new TypeError('The age is not an integer')
      }
      if (value > 200) {
        throw new RangeError('The age seems invalid')
      }
    }

    // 对满足条件的 age 属性以及其他属性， 直接保存
    obj[prop] = value
    return true
  }
}

let person = new Proxy({}, validator)

person.age = 100
person.age  // 100
person.age = 'young' // 报错 The age is not an integer
person.age = 300 // 报错  The age seems invalid
```

上面代码中， 由于设置了存值函数 set, 任何不符合要求的 age 属性赋值， 都会抛出一个错误，这是数据验证的一种实现方法。 利用 set 方法， 还可以数据绑定，
即每当对象发生变化时候， 会自动更新 DOM

有时候我们会在对象上面设置内部属性， 属性名的第一个字符使用下划线开头，表示这些属性不应该被外部使用。结合 get 和 set 方法， 就可以做到防止这些内部属性被外部读写

```javascript
const handler = {
  get(target, key) {
    invariant(key, 'get')
    return target[key]
  },

  set(target,key, value) {
    invariant(key, 'set')
    target[key] = value
    return true
  }
}

function invariant(key, action) {
  if (key[0] === '_') {
    throw new Error(`Invalid attempt to ${action} private '${key}' property`)
  }
}

const target = {}
const proxy = new Proxy(target, handler)
proxy._prop
// Error: Invalid attempt to get private '_prop' property

proxy._prop = 'c'
// Error: Invalid attempt to set private '_prop' property
```

上面代码中，只要读写的属性名的第一个字符是下划线，一律报错，从而达到禁止读写内部属性的目的

- set 方法传入四个参数

```javascript
const handler = {
  set(obj, prop, value, receiver) {
    obj[prop] = receiver
    return true
  }
}

const proxy = new Proxy({}, handler)
proxy.foo = 'bar';
 proxy.foo === proxy // true
```

上面示例中，set 方法的第四个参数 receiver， 指的是原始的操作行为所在的那个对象， 一般情况下是 proxy 实例本身

```javascript
const handler = {
  ser(obj, prop, value, receiver) {
    obj[prop] = receiver
    return true
  }
}

const proxy = new Proxy({}, handler)
const myObj = {}
Object.setPrototypeOf(myObj, proxy)

myObj.foo = 'bar'
myObj.foo === myObj // true
```

上面代码中， 设置 myObj.foo 属性的值时， myObj 并没有 foo 属性， 因此引擎会到 myObj 的原型链去找 foo 属性。myObj的原型对象 proxy 是一个 Proxy 实例，设置它的 foo 属性会触发
set 方法。 这时，第四个参数 receiver 就是指向原始赋值行为所在的对象 myObj

:::warning 注意: 如果目标对象自身的某个属性不可写， 那么 set 方法将不起作用

```javascript
const obj = {};

Object.defineProperty(obj, 'foo', {
  value: 'bar',
  writable: false
})

const handler = {
  set(obj, prop, value, receiver) {
    obj[prop] = 'baz'
    return true
  }
}

const proxy = new Proxy(obj, handler)
proxy.foo = 'baz'
proxy.foo // 'bar'
```

> set 代理应当返回一个 布尔值，严格模式下， set 代理如果没有返回 true ， 就会报错

```javascript
'use strict'

const handler = {
  set(obj, prop, value, receiver) {
    obj[prop] = receiver
    // 无论有没有下面这一行， 都会报错
    return false
  }
}

const proxy = new Proxy({}, handler)
proxy.foo = 'bar'
// TypeError: 'set' on proxy: trap returned falsish for property 'foo'
```

:::

##### apply()

apply 方法拦截函数的调用、`call` 、`apply` 操作

apply 方法可以接受三个参数， 分别是目标对象、目标对象的上下文对象(this)和 目标对象的参数数组

```javascript
var handler = {
  apply(target, ctx, args) {
    return Reflect.apply(...arguments)
  }
}
```

- 示例

```javascript
var target = function () { return 'I am a target' }

var handler = {
  apply() {
    return 'I am the proxy'
  }
}

var p = new Proxy(target, handler)

p() // 'I am the proxy'
```

上面代码中， `p` 是 Proxy 的实例， 当它作为函数调用时(`p()`)， 就会被 apply 方法拦截， 返回一个字符串

- 通过 `call`、 `apply` 函数调用

```javascript
var twice = {
  apply(target, ctx, args) {
    return Reflect.apply(...arguments) * 2
  }
}

function sum (left, right) {
  return left + right
}

var proxy = new Proxy(sum, twice)

proxy(1, 2) // 6

proxy.call(null, 5, 6) // 22
proxy.apply(null, [7, 8]) //30
```

**直接调用 `Reflect.apply` 方法， 也会被拦截**

```javascript
Reflect.apply(proxy, null, [9, 10]) // 38
```

### Reflect

`Reflect` 是ES6 中操作对象而提供的新API, 是为了解决在ES6之前使用对象的操作存在一些不一致和不直观的地方，有时会抛出错误的问题

**基本特点**

- 将 `Object` 对象的一些明显属于语言内部的方法， (比如 `Object.defineProperty`), 放到 `Reflect`对象上。 现阶段， 某些方法同时在 `Object` 和 `Reflect` 对象上部署，
  未来的新方法将只部署在 `Reflect` 对象上， 也就是说 从 `Reflect`对象上可以拿到语言内部的方法

- 修改某些 `Object` 方法的返回结果， 让其不会抛出错误， 变得合理。 比如 `Object.defineProperty(obj, name, desc)` 在无法定义属性时， 会抛出一个错误,
  而`Reflect.defineProperty(obj, name, desc)` 则会返回 `false`

```javascript
// 老写法
try {
  Object.defineProperty(target, property, attributes)
  // success
} catch (e) {
  // failure
}

// 新写法
if (Reflect.defineProperty(target, property, attributes)) {
  // success
} else {
  // failure
}
```

- 让 `Object` 操作都变成函数行为。 某些 `Object` 是 命令式， 比如 `name in obj` 和 `delete obj[name]`, 而 `Reflect.has(obj, name)` 和
  `Object.deleteProperty(obj, name)`让操作变成了函数行为

```javascript
// 老写法 
'assign' in Object // true

// 新写法
Reflect.has(Object, 'assign') // true
```

- `Reflect` 对象的方法与 `Proxy` 方法一一对应， 只要是 `Proxy` 对象的方法， 就能在 `Reflect` 对象上找到对应的方法。 这就让 `Proxy` 对象可以方便地调用对应 `Reflect` 方法，
  完成默认行为，作为修改行为的基础，也就是说 *不管`Proxy`怎么修改默认行为，你总可以在 `Reflect`上 获取默认行为。*

```javascript
Proxy(target, {
  set(target, name, value, receiver) {
    var success = Reflect.set(target, name, value, receiver)
    if (success) {
      console.log(`property ${name} on ${target} set to ${value}`)
    }
    return success
  }
})
```

上面代码中， `Proxy`方法拦截 `target` 对象的属性赋值行为。它采用 `Reflect.set` 方法将值赋值给对象的属性，确保完成原有的行为，然后再部署额外的功能

- 示例

```javascript
var longgedObj = new Proxy(obj, {
  get(target, name) {
    console.log('get', target, name)
    return Reflect.get(target, name)
  },
  deleteProperty(target, name) {
    console.log(`delete ${name}`)
    return Reflect.deleteProperty(target, name)
  },
  has(target, name) {
    console.log(`has ${name}`)
    return Reflect.has(target, name)
  }
})
```

上面代码中， 每一个 `Proxy` 对象的拦截操作(`get`、`delete`、`has`), 内部调用对应的 `Reflect` 方法， 保证原生行为能够正常执行。 添加的工作， 就是将每一个操作输出一行日志

有了`Reflect` 对象以后， 很多操作会更易读

```javascript
// 老写法
Function.prototype.apply.call(Math.floor, undefined, [1.75]) // 1

// 新写法

Reflect.apply(Math.floor, undefined, [1.75]) // 1
```

#### 常用方法

- `Reflect.apply(target, thisArg, args)` 调用一个函数，并传入指定的参数

- `Reflect.construct(target, argumentsList)` 用于创建一个类的实例对象

- `Reflect.get(target, propKey, receiver)` 获取对象的属性值

- `Reflect.set(target, propKey, value, receiver)` 设置对象的属性值

- `Reflect.deleteProperty(target, propKey)` 删除对象的属性

- `Reflect.defineProperty(target, propKey, attributes)` 定义对象的属性

#### 利用 `Reflect` 和 `Proxy` 实现一个观察者模式

```javascript
// 创建一个观察者对象

class Observer {
  constructor () {
    this.listeners = new Set()
  }

  // 添加观察者
  subscribe(listener) {
    this.listeners.add(listener)
  }

  // 移除观察者
  unsubscribe(listener) {
    this.listeners.delete(listener)
  }

  // 通知观察者
  notify(data) {
    this.listeners.forEach((listener) => listener(data))
  }
}

// 创建一个被观察的对象

class Observable {
  constructor() {
    this.data = new Proxy({}, {
      set(target, key, value) {
        Reflect.set(target, key, value)
        this.notifyObservers(key, value)
        return true
      }
    })

    this.observer = new Observer()
  }

  // 设置观察者
  addObserver(listener) {
    this.observer.subscribe(listener)
  }

  // 移除观察者
  removeObserver(listener) {
    this.observer.unsubscribe(listener)
  }

  // 通知观察者
  notifyObservers(key, value) {
    this.observer.notify({ key, value })
  }
}

// 创建观察者
const observer1 = (data) => {
  console.log(`Observer 1: ${data.key} has been updated to ${data.value}`)
}

const observer2 = (data) => {
  console.log(`Observer 2: ${data.key} has been updated to ${data.value}`)
}

// 创建被观察者对象
const observable = new Observable();

// 添加观察者
observalbe.addObserver(observer1)
observable.addobserver(observer2)

// 移除观察者
observable.removeObserver(observer2)

// 修改被观察者对象的数据
observable.data.name = 'John'

// 输出
// Observer 1: name has been updated to John
// Observer 2: name has been updated to John
// Observer 1: age has been updated to 25
// Observer 2: age has been updated to 25
// Observer 1: name has been updated to Jane
```

### Symbol

在 ES6 之前对象属性名都是字符串，这容易造成属性名的冲突。 ES6 引入了一种新的原始数据类型 `Symbol`, 表示独一无二的值。 它属于 JavaScript 语言的原生数据类型之一

`Symbol` 是一种独一无二且不可修改的数据类型， 可以用作对象属性的唯一标识符，它被设计用于创建对象属性的私有成员或者用作常量

使用 `Symbol()` 函数可以创建一个 Symbol， 每次调用 `Symbol()` 函数都返回一个全新且不相等的 Symbol

```javascript
const mySymbol1 = Symbol()
const mySymbol2 = Symbol('hhh')
console.log(typeof mySymbol1) // symbol
console.log(mySymbol2.toString()) // Symbol(hhh)
console.log(mySymbol2 == Symbol('hhh')) // false
```

Symbol 可以作为对象的属性名来定义对象的私有成员

```javascript
const obj = {}

const privateMember = Symbol()
obj[privateMember] = '私有成员'

console.log(obj[privateMember]) // '私有成员'
```

可以通过 `Object.getOwnPropertySymbols()` 方法获取对象的所有 Symbol 属性

```javascript
const symbols = Object.getOwnPropertySymbols(obj);
console.log(symbols) // [Symbol()]
console.log(obj[symbols[0]]) // '私有成员'
```

### Map/WeakMap、Set/WeakSet 数据结构

#### Map

Map是一种键值对的集合(**Hash结构**)， 它类似于对象， 但有一些不同之处。 Map的键可以是任意类型的值，包括对象和函数，而对象只能使用字符串作为键。此外， Map键值对是有序的，
插入的顺序决定了键值对的顺序

##### 方法

|方法|功能|
|:--|:--|
|``get()`|返回键值对|
|`set()`|添加键值对， 返回实例|
|`delete()`|删除键值对，返回布尔值|
|`has()`|检查键值对，返回布尔值|
|`clear()`|清除所有成员|
|`keys()`|返回以键遍历器的对象|
|`values()`|返回以值遍历器的对象|
|`entries()`|返回以键和值为遍历器的对象|
|`forEach()`|使用回调函数遍历每个成员|

```javascript
// 创建一个空的 Map
let map = new Map()

// 添加键值对
map.set('name', 'John')
map.set('age', 30)

// 获取值
console.log(map.get('name'))

// 检查是否包含某个键
console.log(map.has('age'))

// 删除键值对
map.delete('age')

// 返回长度
console.log(map.size) // 1
```

#### WeekMap

WeakMap 也是一种键值对的集合，但是**只接受对象**作为键，不接受其他类型的数据

WeakMap中的键是弱引用的，这意味着如果键对象都没有其他引用， 会被垃圾回收机制回收，并且对应的键值对也会对 WeakMap 中自动移除

##### 应用

- 存储 DOM 节点： DOM节点被移除时自动释放此成员键，不用担心这些节点从文档移除时会引发内存泄漏

- 部署私有属性: 内部属性是实例的弱引用，删除实例时它们也会随之消失，不会造成内存泄漏

##### WeakMap 方法

|方法|功能|
|:--|:--|
|`get()`| 返回键值对 |
|`set()`| 添加键值对，返回实例 |
|`delete()`| 删除键值对， 返回布尔值|
|`has()`|检查键值对，返回布尔值|

#### Set

Set 是一种不重复值的集合， 类似于数组，但是他的值是唯一的， 不会重复。 Set可以存储任意类型的值，报苦熬原始类型和对象

##### Set 方法

|方法|功能|
|`add()`|添加值， 返回实例|
|`delete()`| 删除值， 返回布尔值|
|`has()`|检查值，返回布尔值|
|`clear()`|清除所有成员|
|`keys()`|返回以属性值为遍历器的对象|
|`values()`|返回以属性值为遍历器的对象|
|`entries()`|返回以属性值和属性值为遍历器的对象|
|`forEach()`|使用回调函数遍历每个成员|

```javascript
// 创建一个 Set
let set = new Set()

// 添加值
set.add(1)
set.add(2)
set.add(2)
set.add(3)

// 检查是否包含某个值
console.log(set.has(2)) // true

// 删除值
set.delete(3)

// 返回实例成员总数
console.log(set.size) // 2
```

#### WeakSet

WeakSet 是一种弱引用集合，它只能存储对象类型的值，并且这些对象是弱引用的，这意味着如果一个对象在 WeakSet 中没有任何其他引用， 那么这个对象将会被垃圾回收机制回收，
由于 WeakSet 的成员是弱引用， 因此无法迭代， 也无法获取其中的大小或者清空它

##### WeakSet应用

- 储存DOM节点：DOM节点被移除时自动释放此成员键，不用担心这些节点从文档移除时会引发内存泄漏

- 临时存放一组对象或存放跟对象绑定的信息：只要这些对象在外部消失，它在WeakSet结构中的引用就会自动被垃圾回收

##### WeakSet  方法

|方法|功能|
|`add()`|添加值， 返回实例|
|`delete()`| 删除值， 返回布尔值|
|`has()`|检查值，返回布尔值|

### 迭代器(Iterator) 和 for...of循环

#### 迭代器(Iterator)

迭代器(Iterator) 是一种迭代机制，为各种不同的数据结构提供统一的访问机制，任何数据结构只要内部有 Iterator 接口， 就可以完成依次迭代操作

##### 迭代器功能

- 为各种数据结构提供一个统一的、简便的访问接口
- 使得数据结构成员能够按照某种次序排列
- 为ES6 创造了一种新的遍历命令 `for...of`循环， Iterator 接口主要提供`for...of`消费

##### 遍历过程

1. 创建一个指针对象， 指向当前数据结构的起始位置。也就是说，遍历器对象本质上 就是一个**指针对象**
2. 第一次调用指针对象的 `next` 方法， 可以将指针指向数据结构的第一个成员
3. 第二次调用指针对象的 `next` 方法， 指针就指向数据结构的第二个成员
4. 不断调用指针对象的 `next` 方法，直到它只想数据结构的结束位置

每一次调用`next` 方法， 都会返回数据结构的当前成员的信息。具体来说， 就是返回一个包含`value` 和 `done` 两个属性的对象。
其中， `value` 属性是当前成员的值，`done` 属性是一个布尔值，表示是否遍历结束

```javascript
const makeIterator = (array) => {
  let nextIndex = 0;
  return {
    next() {
      nextIndex < array.length ? 
      { value: array[nextindex++], done: false } :
      { value: undefined, done: true }
    }
  }
}

var it = makeIterator(['a', 'b'])

it.next() // { value: 'a', done: false}
it.next() // { value: 'a', done: false}
it.next() // { value: undefined, done: true}
```

对于遍历器对象来说， `done: false` 和 `value:undefined` 属性都是可以省略的， 因此上面的 `makeIterator` 函数可以简写下面的形式

```javascript
const makeIterator = (array) => {
  let nextIndex = 0
  return {
    next() {
      return nextIndex < array.length ?
      { value: array[nextIndex++]} : { done: true }
    }
  }
} 
```

由于 Iterator 只是把接口规格加到数据结构之上， 所以， 遍历器与它所遍历的那个数据结构，实际是分开的， 完全可以写出没有对应数据结构的遍历器对象， 或者用遍历器对象模拟出数据结构。

```javascript
const idMaker = () => {
  let index = 0
  return {
    next() {
      return { value: index++, done: false }
    }
  }
}

let it = idMaker()

it.next().value // 0
it.next().value // 1
it.next().value // 2
// ...
```

上面的示例中 遍历器生成函数 `idMaker`, 返回一个遍历器对象(即指针对象)。 但是并没有对应的数据结构，或者说， 遍历器对象自己描述了一个数据结构出来

如果使用 Typescript 写法， 遍历器接口(Iterable)、指针对象(Iterator) 和 `next` 方法返回值的规格可以描述如下

```typescript
interface Iterable {
  [Symbol.iterator]() : Iterator
}

interface Iterator {
  next(value?: any) : IterationResult
}

interface IterationResult {
  value: any,
  done: boolean
}
```

##### 原生具备 Iterator 接口的数据结构

- Array
- Map
- Set
- String
- TypedArray
- 函数的 arguments 对象
- NodeList对象

##### 迭代器对象方法

|`next()`| 下一步操作， 返回 `{ value, done }`(必须部署)|
|`return()`|`for-of`提前退出调用， 返回 `{ done: true }`|
|`throw()`| 不使用， 配合 `Generator函数`使用|

##### 使用场合

- **解构赋值**

对数组和 Set 结构进行解构赋值时， 会默认使用 `Symbol.iterator` 方法

```javascript
let set = new Set().add('a').add('b').add('c')

let [x, y] = set
// x = 'a' y = 'b'

let [first, ...rest] = set
// forst = 'a', rest = ['b', 'c']
```

- **扩展运算符**

扩展运算符(...) 也会调用默认的 Iterator 接口

```javascript
let str = 'hello'
[...str] // ['h', 'e', 'l', 'l', 'o']

let arr = ['b', 'c']
['a', ...arr, 'd']
// ['a', 'b', 'c', 'd']
```

上面代码的扩展运算符内部就调用 Iterator 接口。

实际上，这提供了一种简便机制，可以将任何部署了 Iterator 接口的数据结构，转为数组。也就是说，只要某个数据结构部署了 Iterator 接口，就可以对它使用扩展运算符，将其转为数组。

```javascript
let arr = [...iterable]
```

- **yield**

`yield` 后面跟的是一个可遍历的结构，它会调用该结构的遍历器接口

> `yield` 后面跟着一个星号表示这个yield也是可迭代的 可以被遍历

```javascript
let generator = function* () {
  yield 1
  yield* [2, 3, 4]
  yield 5
}

let iterator = generator();

iterator.next() // { value: 1, done: false }
iterator.next() // { value: 2, done: false }
iterator.next() // { value: 3, done: false }
iterator.next() // { value: 4, done: false }
iterator.next() // { value: 5, done: false }
iterator.next() // { value: undefined, done: true }
```

- **其他场合**

由于数组的遍历会调用遍历器接口，所以任何接受数组作为参数的场合，其实都调用了遍历器接口

  - for...of
  - Array.form()
  - Map(), Set(), WeakMap(), WeakSet(), (比如 `new Map([['a', 1], ['b', 2]])`)
  - Promise.all()
  - Promise.race()

#### for...of 循环

for...of 循环用于遍历可迭代对象(例如数组、字符串、Set、Map 等)， 它会迭代对象的每个元素并执行指定的代码块

- **循环遍历数组**

```javascript
let arr = [1, 2, 3, 4]

for(let element of arr) {
  console.log(element)
}
// 输出
// 1
// 2
// 3
// 4
```

- **遍历字符串**

```javascript
let str = 'Hello'
for (let char of str) {
  console.log(char)
}

// 输出
// H
// e 
// l
// l
// o
```

- **遍历Set和Map的元素**

```javascript
let set = new Set([1, 2, 3])

for(let value of set) {
  console.log(value)
}
// 输出 
// 1
// 2
// 3

let map = new Map([
  ['name', 'John'],
  ['age', 30]
])

for (let [key, value] of map) {
  console.log(key, value)
}
// 输出
// name John
// age 30
```

### 生成器(Generator)

Gererator 函数在语法上， 可以把它理解成一个状态及， 内部封装了多个状态

执行 Generator 函数会返回一个遍历器对象， 也就是说 Generator函数除了状态机，还是一个遍历器独享生成函数，返回的遍历器对象， 可以依次遍历 Generator 函数内部的每一个状态

#### 特征

- function 关键字与函数名之间有一个星号
- 函数体内部使用 `yield` 表达式， 定义不同的内部状态

```javascript
function* handleGenerator() {
  yield 'hello'
  yield 'world'
  return 'ending'
}
var hw = handleGenerator()
console.log(hw.next());// { value: 'hello', done: false }
console.log(hw.next());// { value: 'world', done: false }
console.log(hw.next());// { value: 'ending', done: true }
console.log(hw.next());// { value: undefined, done: true }
```
