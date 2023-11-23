# AST（Abstract Syntax Tree）抽象语法树

### 定义

在计算机科学中，**抽象语法树**（Abstract Syntax Tree，AST），或简称语法树（Syntax tree），是源代码语法结构的一种抽象表示。它以树状的形式表现编程语言的语法结构，树上的每个节点都表示源代码中的一种结构。之所以说语法是 **“抽象”** 的，是因为这里的语法并不会表示出真实语法中出现的每个细节。比如，嵌套括号被隐含在树的结构中，并没有以节点的形式呈现；而类似于 `if-condition-then` 这样的条件跳转语句，可以使用带有三个分支的节点来表示。

### 应用

  AST(抽象语法树)在代码语法的检查、代码风格的检查、代码的格式化、代码的高亮、代码错误提示、代码自动补全等等场景均有广泛的应用

- 打包编译：`webpack`、`rollup`、`babel`等

- 代码风格检查：`JSLint`、`JSHint`、`Prettier`

- 错误提示与高亮: `IDE`的错误提示、格式化、高亮、自动补全等

- 代码混淆压缩：`UglifyJS2`

- 多端开发框架：`Mpvue`、`Taro`等

---

- 示例(来源于一个ast转换网站 **[astexplorer.net](https://astexplorer.net/)**)

  ```javascript
    const transSyntax = (aa) => {
      console.log(aa)
    }
    transSyntax('111')
  ```
  
  转换成`JSON`后

  ```JSON
  {
    "type": "Program",
    "start": 0,
    "end": 68,
    "body": [
      {
        "type": "VariableDeclaration",
        "start": 0,
        "end": 49,
        "declarations": [
          {
            "type": "VariableDeclarator",
            "start": 6,
            "end": 49,
            "id": {
              "type": "Identifier",
              "start": 6,
              "end": 17,
              "name": "transSyntax"
            },
            "init": {
              "type": "ArrowFunctionExpression",
              "start": 20,
              "end": 49,
              "id": null,
              "expression": false,
              "generator": false,
              "async": false,
              "params": [
                {
                  "type": "Identifier",
                  "start": 21,
                  "end": 23,
                  "name": "aa"
                }
              ],
              "body": {
                "type": "BlockStatement",
                "start": 28,
                "end": 49,
                "body": [
                  {
                    "type": "ExpressionStatement",
                    "start": 32,
                    "end": 47,
                    "expression": {
                      "type": "CallExpression",
                      "start": 32,
                      "end": 47,
                      "callee": {
                        "type": "MemberExpression",
                        "start": 32,
                        "end": 43,
                        "object": {
                          "type": "Identifier",
                          "start": 32,
                          "end": 39,
                          "name": "console"
                        },
                        "property": {
                          "type": "Identifier",
                          "start": 40,
                          "end": 43,
                          "name": "log"
                        },
                        "computed": false,
                        "optional": false
                      },
                      "arguments": [
                        {
                          "type": "Identifier",
                          "start": 44,
                          "end": 46,
                          "name": "aa"
                        }
                      ],
                      "optional": false
                    }
                  }
                ]
              }
            }
          }
        ],
        "kind": "const"
      },
      {
        "type": "ExpressionStatement",
        "start": 50,
        "end": 68,
        "expression": {
          "type": "CallExpression",
          "start": 50,
          "end": 68,
          "callee": {
            "type": "Identifier",
            "start": 50,
            "end": 61,
            "name": "transSyntax"
          },
          "arguments": [
            {
              "type": "Literal",
              "start": 62,
              "end": 67,
              "value": "111",
              "raw": "'111'"
            }
          ],
          "optional": false
        }
      }
    ],
    "sourceType": "module"
  }
  ```

### 整体流程

- 一个完整的编译过程可以分为三个步骤：

  - **Parsing(解析过程)**: 这个过程要经`词法分析`、`语法分析`、`构建AST`（**抽象语法树**）一系列操作;
  - **Transformation（转化过程）**: 这个过程就是将上一步解析后的内容，按照编译器指定的规则进行处理，`形成一个新的表现形式`;
  - **Code Generation（代码生成）**: 将上一步处理好的内容`转化为新的代码`;

![整体流程](/image/整体流程.png)

### 编译原理

  首先来看下浏览器的编译原理如下，可以看出来浏览器对js的编译和解释都需要源代码通过 **词法分析**和 **语法分析**转换成AST

  ![编译原理](/image/编译原理.png)

  `词法分析`：是计算机科学中将字符序列转换为单词（`Token`）序列的过程。进行词法分析的程序或者函数叫作**词法分析器**（**Lexical analyzer**，简称**Lexer**），也叫**扫描器**（**Scanner**）。
  其作用是将一行行的源码拆解成一个个 `token`。所谓 `token`，指的是语法上不可能再分的、最小的单个字符或字符串。

  `语法分析`：`词法分析`是编译过程的一个逻辑阶段。`语法分析`的任务是在`词法分析`的基础上将单词序列组合成各类语法短语，如 **“程序”**，**“语句”**，**“表达式”**等等.`语法分析程序`判断源程序在结构上是否正确.
  其作用是将上一步生成的 token 数据，根据语法规则转为 AST。同时也会去验证语法，语法有错的话会抛出语法错误。
