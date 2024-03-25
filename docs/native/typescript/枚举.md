# 枚举(Enums)

**枚举是 TypeScript 中一种特殊的数据类型，允许我们为一组数值设定友好的名字。枚举的定义使用 `enum` 关键字**

- **枚举类型被用于取值被限定在一定范围内的取值， 例如 一周只有七天， 颜色限定在红绿蓝等**

### 基本用法

```typescript
  enum Direction {Up = 1, Down, Left, Right,}
```

在这个例子中，我们定义了一个名为 Direction 的枚举，它有四个成员：Up、Down、Left 和 Right。Up 的初始值为 1，其余成员的值会自动递增。

我们也可以不设置初始值， 则枚举的成员将以0开始依次递增

枚举值被赋予从0开始递增的数字，同时也可以通过枚举值来进行反向映射

```typescript
  enum Direction { Up, Down, Left,Right }
  conssole.log(Direction['Up'] === 0) // true
  conssole.log(Direction['Down'] === 1) // true
  conssole.log(Direction['Left'] === 2) // true
  conssole.log(Direction['Right'] === 3) // true

  // 反向映射
  conssole.log(Direction[0] === 'Up') // true
  conssole.log(Direction[1] === 'Down') // true
  conssole.log(Direction[2] === 'Left') // true
  conssole.log(Direction[3] === 'Right') // true
```

实际上上述例子会被编译成下面这种格式

```javascript
  var Direction;
  (function (Direction) {
      Direction[Direction["Up"] = 0] = "Up";
      Direction[Direction["Down"] = 1] = "Down";
      Direction[Direction["Left"] = 2] = "Left";
      Direction[Direction["Right"] = 3] = "Right";
  })(Direction || (Direction = {}));
```

### 手动赋值

枚举是可以手动赋值的，  并且未手动赋值的枚举值会随着上一项的赋值递增

```typescript
  enum Direction { Up  = 3, Down = 2, Left,Right }
  conssole.log(Direction['Up'] === 3) // true
  conssole.log(Direction['Down'] === 2) // true
  conssole.log(Direction['Left'] === 3) // true
  conssole.log(Direction['Right'] === 4) // true
```

上述示例中， 我们可以发现 如果枚举默认递增的值与手动赋值的值重复时， Typescript是注意不到这一点的， 编译结果是这样

```javascript
  var Direction;
  (function (Direction) {
      Direction[Direction["Up"] = 3] = "Up";
      Direction[Direction["Down"] = 2] = "Down";
      Direction[Direction["Left"] = 3] = "Left";
      Direction[Direction["Right"] = 4] = "Right";
  })(Direction || (Direction = {}));
```

从编译结果我们可以看出来 枚举值递增到`3`时与前面`Up`的值重复了， 导致`Direction["Up"]`先是`3` 然后 `Direction["Left"]`也是`3`，所以在赋值时， 最好不要出现这种情况， 以免发生不必要的错误

- 手动赋值可以不是数字， 这个时候需要通过类型断言来跳过tsc的类型检查编译出来的js仍是可用的)

```typescript
  enum Direction { Up, Down, Left,Right = <string>'S' }
```

 编译结果

```javascript
  var Direction;
  (function (Direction) {
      Direction[Direction["Up"] = 3] = "Up";
      Direction[Direction["Down"] = 2] = "Down";
      Direction[Direction["Left"] = 3] = "Left";
      Direction[Direction["Right"] = 'S'] = "Right";
  })(Direction || (Direction = {}));
```

> 当然， 手动赋值也可以是`小数`或`负数`，但后续未赋值的枚举值的步长仍为`1`进行递增

```typescript
  enum Direction { Up = 66, Down = 1.5, Left,Right }
  conssole.log(Direction['Up'] === 6) // true
  conssole.log(Direction['Down'] === 1.5) // true
  conssole.log(Direction['Left'] === 2.5) // true
  conssole.log(Direction['Right'] === 3.5) // true
```

### 常数项和计算所得项

枚举的项有两种类型`常数项`和`计算所得项`， 上述示例都是为常数项的枚举值， 我们也可以向枚举中添加计算的方式来设置`计算所得项`的枚举

```typescript
  enum Color { Red, Blue, Green = 'green'.length }
```

上述示例中，`'green'.length`就是一个计算所得项。

> ⚠ 上面的例子不会报错，**但是如果紧接在计算所得项后面的是未手动赋值的项，那么它就会因为无法获得初始值而报错**

![赋值项之后是未赋值的枚举项的报错](/image/enum-error-1.png)

- 常数项和计算所得项的完整定义，引用自[中文手册 - 枚举](https://www.typescriptlang.org/docs/handbook/enums.html)：

当满足以下条件时，枚举成员被当作是常数：

- 不具有初始化函数并且之前的枚举成员是常数。在这种情况下，当前枚举成员的值为上一个枚举成员的值加 1。但第一个枚举元素是个例外。如果它没有初始化方法，那么它的初始值为 0。
- 枚举成员使用常数枚举表达式初始化。常数枚举表达式是 TypeScript 表达式的子集，它可以在编译阶段求值。当一个表达式满足下面条件之一时，它就是一个常数枚举表达式：
  - 数字字面量
  - 引用之前定义的常数枚举成员（可以是在不同的枚举类型中定义的）如果这个成员是在同一个枚举类型中定义的，可以使用非限定名来引用
  - 带括号的常数枚举表达式
  - `+`, `-`, `~` 一元运算符应用于常数枚举表达式
  - `+`,`-`, `*`, `/`, `%`, `<<`, `>>`, `>>>`, `&`, `|`, `^` 二元运算符，常数枚举表达式做为其一个操作对象。若常数枚举表达式求值后为 NaN 或 Infinity，则会在编译阶段报错

所有其它情况的枚举成员被当作是需要计算得出的值。

### 常数枚举

常数枚举是使用 const enum 定义的枚举类型

```typescript
  const enum Directions {
      Up,
      Down,
      Left,
      Right
  }

  let directions = [Directions.Up, Directions.Down, Directions.Left, Directions.Right];
```

常数枚举与普通枚举的区别是，它会在编译阶段被删除，并且不能包含计算成员。

上面例子编译结果是

```javascript
var directions = [0 /* Up */, 1 /* Down */, 2 /* Left */, 3 /* Right */];
```

假如包含了计算成员，则会在编译阶段报错：

```javascript
const enum Color {Red, Green, Blue = "blue".length};

// index.ts(1,38): error TS2474: In 'const' enum declarations member initializer must be constant expression.
```

![赋值计算项编译报错](/image/enum-error-2.png)

::: info 常量枚举与枚举的区别

- 声明差异
  - **常量枚举**通过`const enum`进行声明，**枚举**则通过`enum`来声明

- 编译结果差异
  
  - **常量枚举**在编译时会被删除，并且不能包含计算成员。 **枚举**在编译时会生成真实的 JavaScript 对象，同时在运行时也会存在对应的对象实体

- 使用场景差异
  
  - **常量枚举**比普通**枚举**有着更高的性能和更少的内存占用， 但由于其特性限制，**常量枚举**适用于一些特定的场景，如在需要大量枚举且不需要在运行时访问枚举对象的情况下使用。
  - **普通枚举**则更灵活，可以包含计算成员和常量成员，适用于其它更加灵活的场景。

:::

### 外部枚举

外部枚举是使用 declare enum 定义的枚举类型：

```typescript
declare enum Directions {
    Up,
    Down,
    Left,
    Right
}

let directions = [Directions.Up, Directions.Down, Directions.Left, Directions.Right];
```

declare 定义的类型只会用于编译时的检查，编译结果中会被删除。

上面例子编译结果是

```javascript
var directions = [Directions.Up, Directions.Down, Directions.Left, Directions.Right];
```

外部枚举与声明语句一样，常出现在声明文件中。

同时使用`declare`和`const`也是可以的

```typescript
declare const enum Directions {
    Up,
    Down,
    Left,
    Right
}

let directions = [Directions.Up, Directions.Down, Directions.Left, Directions.Right];
```

编译结果

```javascript
var directions = [0 /* Up */, 1 /* Down */, 2 /* Left */, 3 /* Right */];
```
