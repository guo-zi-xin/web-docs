# JS模块化

---

**JavaScript的 `ESM` `AMD` `UMD` `CJS`**

- **`ESM`**

> ​**ESM代表ES模块，是Javascript提出的实现一个标准模块的系统方案。类似:**

```javascript
  import React from 'react'
  import Vue from 'vue'
```

或者

```javascript
  import {foo, bar} from './myLib'
  ···
  export default function () {
    // your Funciton
  }
  export const function1() {...}
  export const function2() {...}
```

- 在很多现代浏览器可以使用

- 它兼具两方面的优点：具有`CJS`的简单语法和`AMD`的异步;

- 得益于ES6的静态模块结构，可以进行`Tree Shaking`;

- `ESM`允许像`Rollup` 这样的打包器，删除不必要的代码，减少代码包可以获得更快的加载;

**可以在HTML中调用， 只要如下:**

```javascript
  <script type="module">
    import {func1} from 'my-lib'
    func1()
  </script>
```

- **`CJS`**

  - CJS是CommonJS的缩写，经常是这么使用

  ```javascript
    // importing(导入)
    const doSomething = require('./doSomething.js')
    
    // exporting(导出)
    module.exports = function doSomething(n) {
      // do something
    }
  ```

  - CJS是同步导入模块

    - 可以从node_modules中引入一个库或者从本地目录引入一个文件，例如

      ```javascript
        const myLocalModule = require('./some/local/file.js')
        // 或者
        var React = require('react')
      ```

    都会生效

  - 当CJS导入时，他会给你一个导入对象的副本

  - CJS不能在浏览器中工作，他必须经过转换和打包

- **`AMD`**

**AMD代表异步模块定义，例如:**

  ```javascript
  define(['dep1','dep2'], function(dep1, dep2) {
    // Define the module value by returning a value
    return function() {}
  })
  ```

  或者

  ```javascript
  define(function(require) {
    var dep1 = require('dep1')
    dep2 = require('dep2')
    return function () {}
  })
  ```

- AMD是异步（asynchronously）导入模块的（因此得名

- 一开始被提议的时候，AMD是为前端而做的（而CJS是后端

- AMD语法不如CJS直观

- **`UMD`**（Universal Module Definition）

**通用模块定义**

- 在前端和后端都适用（“通用”因此而得名）
- 与CJS或AMD不同， UMD更像是一种配置多个模块系统的模式
- 当使用Rollup/webpack之类的打包器时， UMD通常用作备用模块
