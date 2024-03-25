# Vue 双向绑定原理

### 单向绑定

单向绑定非常简单， 就是把 `Model`绑定到`View`, 当我们用`JavaScript` 代码更新`Model`时， `View`就会自动更新，但改变 `View` 时候,不会影响到`Model`

### 双向绑定

双向绑定就是在单向绑定的基础上， 通过修改视图`View`, `Model`也会更新, 例如在用户填写表单时， `View`的状态被更新， 如果此时可以自动更新`Model`的状态，那么就相当于我们把
`Model`和 `View`做了双向绑定，关系如图：

![双向绑定关系](/svg/双向绑定关系.svg)

#### 双向绑定原理

双向数据绑定由三部分组成

- 数据层(Model): 应用的数据以及业务逻辑
- 视图层(View): 应用的展示效果，各类UI组件
- 业务逻辑层(ViewModel): 框架封装的核心，它负责将数据与视图关联起来

核心是通过业务逻辑层(ViewModel)来进行关联数据与视图

##### ViewModel

 ViewModel的主要职责：

 - 数据变化后更新视图
 - 视图变化后更新数据

还有两个主要部分组成

- 监听器(Observer): 对所有数据的属性进行监听
- 解析器(Compiler): 对每个元素节点的指令进行扫描跟解析，根据指令模版替换数据，以及绑定相应的更新函数

#### 实现

以 Vue 为例，先看看双向绑定的流程：

1. `new Vue()` 首先执行初始化，对data执行响应化处理，这个过程发生在监听器`Observer`中
2. 同时对模版执行编译，找到其中动态绑定的数据，从 data 中获取数据并初始化视图，这个过程发生在解析器`Compile`中
3. 同时定义一个更新函数`Watcher`， 将来对应数据变化`Watcher`会更新函数
4. 由于 data 的某个 key 在一个视图中可能出现多次，所以每个 key 都需要一个管家 `Dep` 来管理多个 `Watcher`
5. 将来 data 中数据一旦发生变化， 会首先找到对应的 `Dep`, 通知所有`Watcher`执行更新函数

![双向绑定原理](/svg/双向绑定原理.svg)

#### 代码实现

先来一个构造函数，执行初始化，对 data 执行响应化处理

```javascript
class Vue {
  constructor(options) {
    this.$options = options
    this.$data = options.data

    // 对 data 选项做响应式处理

    observe(this.$data)

    // 代理 data 到 vm 上
    proxy(this)

    // 执行编译
    new Compile(options.el, this)
  }
}
```

对 data 选项执行响应具体化操作

```javascript
function observe(obj) {
  if (typeof obj !== 'object' || obj = null) {
    return
  }

  new Observer(obj)
}

class Observer {
  constructor(value) {
    this.value = value
    this.walk(value)
  }

  walk(obj) {
    Object.keys(obj).forEach((key) => {
      defineReactive(obj, key, obj[key])
    })
  }
}
```

##### 编译 Compile

对每个元素节点的指令进行扫描跟解析，根据指令模版替换数据，以及绑定相应的更新函数

![COmpile结构](/svg/compile结构.svg)

```javascript
class Compile {
  constructor(el, vm) {
    this.$vm = vm
    this.$el = document.querySelector(el) // 获取DOM
    if (this.$el) {
      this.compile(this.$el)
    }
  }

  compile(el) {
    const childNodes = el.childNodes;
    // 遍历子元素
    Array.from(childNodes).forEach((node) => {
      // 判断是否为节点
      if (this.isElement(node)) {
        console.log(`编译元素${node.nodeName}`)
      } else if (this.isInterpolation(node)) {
        // 判断是否为插值文本
        console.log(`编译插值文本${node.textCOntent}`)
      }
      // 判断是否有子元素
      if (node.childNodes && node.childNodes.length > 0) {
        // 对元素进行递归遍历
        this.compile(node)
      }
    });
  }
  isElement(node) {
    return node.nodeType === 1
  }
  isInterpolation(node) {
    return node.nodeType === 3 && /\{\{(.*)\}\}/.test(node.textContent)
  }
}
```

##### 依赖收集

视图中会用到 data 中某 key 这称为依赖，同一个 key 可能会出现多次，每次都需要收集出来用一个 `Watcher`来维护它们， 此过程称为依赖收集 多个`Watcher`需要一个 `Dep` 来管理，需要更新时由`Dep` 统一通知

![依赖收集](/svg/依赖收集.svg)

**实现思路**

1. `defineReactive`时为每一个`key`创建一个`Dep`实例
2. 初始化视图时读取某个`key`, 例如`name1`, 创建一个 `watcher1`
3. 由于触发`name1`的`getter`方法，便将`watcher1`添加到`name1`对应的Dep中
4. 当`name1`更新，`setter`触发时，便可通过对应`Dep`通知管理所有`Watcher`更新

```javascript
// 负责更新视图
class Watcher {
  constructor(vm, key, updater) {
    this.vm = vm
    this.key = key
    this.updateFn = updater

    // 创建实例时，把当前实例指定到 Dep.target静态属性上
    Dep.target = this
    // 读一下key，触发get
    vm[key]
    // 置空
    Dep.target = null
  }

  // 未来执行dom更新函数，由dep调用
  update() {
    this.updateFn.call(this.vm, this.vm[this.key])
  }
}
```

声明Dep

```javascript
class Dep {
  constructor () {
    this.deps = [] //依赖管理
  }
  addDep(dep) {
    this.deps.push(dep)
  }
  notify() {
    this.deps.forEach((dep) => dep.update())
  }
}
```

创建`watcher`时触发getter

```javascript
class Watcher {
  constructor(vm, key, updateFn) {
    Dep.target = this;
    this.vm[this.key];
    Dep.target = null
  }
}
```

依赖收集， 创建Dep实例

```javascript
function defineReactive(obj, key, val) {
  this.observe(val)
  const dep = new Dep()
  Object.defineProperty(obj, key, {
    get() {
      Dep.target && dep.addDep(Dep.target) // Dep.target也就是Watcher实例
      return val
    },
    set(newVal) {
      if (newVal === val) return;
      dep.notify(); // 通知dep执行更新方法
    }
  })
}
```

## 来源

[vue双向绑定](https://vue3js.cn/interview/vue/bind.html#%E4%BA%8C%E3%80%81%E5%8F%8C%E5%90%91%E7%BB%91%E5%AE%9A%E7%9A%84%E5%8E%9F%E7%90%86%E6%98%AF%E4%BB%80%E4%B9%88)
