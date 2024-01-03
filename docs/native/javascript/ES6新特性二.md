# ES6新特性二(常用)

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

#### Reflect

ES6 中操作对象而提供的新API 若需要在 Proxy 内部调用对象的默认行为， 建议使用 Reflect

**基本特点**

- 只要 Proxy 对象具有的代理的方法， Reflect对象全部具有，以静态方法的形式存在
- 修改某些 Object 方法的返回结果， 让其变得更合理(定义不存在属性行为的时候不报错而是返回 false)
- 让 Object 操作都变成函数行为

#### Proxy 实例的方法

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