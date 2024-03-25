# SourceMap(源映射) 基本信息

### 什么是Source Map

> Source Map 是一个信息文件，里面储存着位置信息。也就是说，转换后代码的每一个位置所对应的转换前的位置。有了它，出错的时候，开发着工具将直接显示原始代码，而不是转换后的代码。
>
> Source Map 解决了开发代码与实际运行代码不一致时帮助我们debug到原始开发代码的技术。

- **常见的源码转换，主要分为三种情况**

  - 压缩、减少体积
  - 多个文件合并， 减少HTTP请求数
  - 其它文件编译成JavasSript

### Source Map功能

js脚本现在变得很复杂，大部份源码需要转换才能放在浏览器中运行， 随着持续开发所带来的代码量增多，实际运行的代码与开发环境的代码不一致，导致进行debug越来越困难， Source Map就是为了解决这个问题才出现的。

### 浏览器中如何使用Source Map

- 怎么在浏览器中使用sourceMap，chrome浏览器中默认是开启了soruce Map功能。如果被关闭可以手动开启，下图所示：

![浏览器中如何设置Source Map](/image/chrome-source-map-settings.jpeg)

### Source Map 关键字

对于SourceMap而言，我们最常见的，莫过于在`webpack`的配置项devTools中进行使用, 差不多有二十来种, 但归根结底 是`eval`,`source-map`,`cheap`,`module`,`inline`,这五种关键字的组合

- [webpcak官网的devtool](https://webpack.docschina.org/configuration/devtool/#root)

![devtool中sourcemap关键字配置](/image/sourcemap.gif)

| 关键字| 含义 |
|:--|:--|
| source-map | 产生.map文件 |
| eval | 使用eval包裹模块代码 |
| cheap | 不包含`列信息`也不包含`loader`的`sourcemap`|
| module | 包含`loader`的`sourcemap`（比如 `jsx` to `js` ，`babel`的`sourcemap`）,否则无法定义源文件 |
| inline | 将.map 作为 DataURI 嵌入，不单独生成.map 文件 |

- `eval` (性能最好)

  - 生成文件：使用eval包裹模块代码，然后在末尾添加模块来源 //# sourceURL，依靠sourceURL找到原始代码的位置。

  - 错误追踪：文件名、源码行和列位置

  - 包含eval关键字的配置项不产生.map文件（eval依靠sourceURL定位原始代码，其它都是.map定位）

- `source-map`（性能最低）

  - 生成文件：产生.map文件

  - 错误追踪： 文件名、源码行和列位置

- `cheap` 不包含原始代码的列信息

  - 如果包含cheap关键字，则产生的.map文件不包含列信息。也就是说当你在浏览器中点击该代码的位置，光标只定位到行数，而不包含具体字符位置。

  - 也不包含loaders的sourcemap：如果你使用了babel等代码编译工具，定位到的代码将是经过编译的代码位置，而不是原始代码。

- `module` 包含loader的sourcemap（比如jsx to js ，babel的sourcemap）

- `inline` 将.map经过base64编码作为DataURI嵌入，不单独生成.map文件（这个配置项比较少见）

#### 各个关键字处理示例

  ```javascript
  let a = 1, b
  b = a
  ```

- 处理结果

  - `eval` 处理后输出结果

  ```javascript
  eval("var a = 1,\n    b;\nb = a;\n\n//////////////////\n// WEBPACK FOOTER\n// ./src/index.js\n// module id = 0\n
  // module chunks = 0\n\n//# sourceURL=webpack:///./src/index.js?");
  ```

  | 关键字 | 特点| 解决问题 |
  |:--|:--|:--|
  |eval|使用`eval`包裹源代码进行执行|利用字符串可缓存进行提效|

  - `source-map`处理后输出结果

  ```javascript
  //# sourceMappingURL=bundle.js.map
  ```

  |关键字|特点|
  |:--|:--|
  |source-map|定位最全， 但.map文件最大， 性能最低|

  - `Inline-source-map` 处理后结果

  ```javascript
  //# sourceMappingURL=data: ...（base64 字符串）
  ```

  |关键字|特点|解决问题|
  |:--|:--|:--|
  |inline|将map通过DataURL嵌入，不再生成.map文件|减少文件数|

  - `cheap-source-map` 处理后结果

  ```javascript
  //# sourceMappingURL=bundle.js.map
  ```

  |关键字|特点|解决问题|存在问题|
  |:--|:--|:--|:--|
  |cheap|错误信息只会定义行，不会定义列|降低文件精度，换取文件内容的缩小|对于经过Babel转化后的代码而言， 只能定义到转换后的代码的错误，不是很利于定位具体项目中的位置|

  针对cheap存在的问题， 引出下面的关键字

  - `cheap-module-source-map` 处理后的结果

  ```javascript
  //# sourceMappingURL=bundle.js.map
  ```

  |关键字|特点|解决问题|
  |:--|:--|:--|
  |module|会保留loader处理前后文件信息的映射|解决了通过`cheap`关键字导致的无法确定loader处理前源代码的问题|

- ##### `cheap`关键字示例

    ```javascript
    // # sum页面
    const sum = (a, b) => { return a + b}
    debugger
    export default sum;

    // # index页面
    import sum from './sum';
    console.log(sum);
    ```

    对于`cheap-source-map`而言，此时页面 debugger 展示源码是 es5 的代码，因为已经被 babal 转义了
    ![cheap-source-map](/image/cheap-source-map.jpeg)

    但对于`source-map`而言， 则会定位到精准代码
    ![source-map](/image/cheap-source-map.jpeg)

#### 常见配置项的对比

|devtool|构建速度|重新构建速度|生产环境|品质(quality)|
|:--|:--|:--|:--|:--|
|(none)|+++[^1]|+++|yes|打包后的代码|
|eval|+++|+++|no|生成后的代码|
|cheap-eval-source-map|+[^2]|++[^3]|no|转换后的代码(仅限行)|
|cheap-module-eval-source-map|o[^4]|++|no|原始源代码(仅限行)|
|eval-source-map|--[^5]|+|no|原始源代码|
|cheap-source-map|+|o|yes|转换过后的代码(仅限行)|
|cheap-module-source-map|o|-[^6]|yes|原始源代码(仅限行)|
|inline-cheap-source-map|+|o|no|转换后的代码(仅限行)|
|inline-cheap-module-source-map|o|-|no|原始源代码(仅限行)|
|source-map|--|--|yes|原始源代码|
|inline-source-map|--|--|no|原始源代码|
|hidden-source-map|--|--|yes|原始源代码|
|nosources-source-map|--|--|yes|无源代码内容|

[^1]: `+++ 非常快速`
[^2]: `+ 比较快`
[^3]: `++ 快速`
[^4]: `-- 慢`
[^5]: `o 中等`
[^6]: `- 比较慢`

#### 在项目中的使用

- **开发环境**

  - 我们在开发环境对SourceMap的要求是：快(`eval`), 信息全面(`module`)
  - 并且由于代码未压缩，我们并不那么在意代码咧信息(`cheap`)

  所以**开发环境**比较推荐配置: devtool:`cheap-module-eval-source-map`

- **生产环境**

  - 一般情况下，我们并不希望其它人都可以在浏览器直接看到我们未编译的源码
  - 所以我们不应该直接提供SourceMap给浏览器。但我们又需要sourceMap来定位我们的错误信息，
  - 一方面`webpack`会生成`sourcemap`文件以提供给错误收集工具， 比如sentry， 另一方面又不会给bundle文件提供注释，以避免浏览器使用，

  所以**生产环境**比较推荐配置: devtool:`hidden-source-map`
