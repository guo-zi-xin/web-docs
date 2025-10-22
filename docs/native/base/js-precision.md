# JS 精度

### 场景复现

```javascript
0.1 + 0.2 === 0.3 // false
```

1/3 是个无限循环，计算机存储后再取出时就会出现精度丢失问题

### 计算原理

JS内部计算都是以<span style="color: red">二进制</span>进行的

#### 整数部分

**整数部分是 除 2 取余 + 逆序排列**

![整数二进制](/svg/native/整数二进制.svg)

#### 小数部分

**小数部分是 乘 2 取整 + 顺序排序**

![小数二进制](/svg/native/小数二进制.svg)

### Number类型存储

**Number类型使用<span style="color: red">IEE754</span> 标准 <span style="color: red">64位</span>存储**

- *双精度浮点数(double)*

  - 为每个树脂分配<span style="color: red">64位</span>存储空间，以<span style="color: red">科学计数法</span>的方法存储

  - 科学计数法： 1.xxxxxxx * 2 ^ n

#### IEEE 753 标准64位存储

![IEEE754标准64位存储](/svg/native/标准64位存储.svg)

#### 0.1的存储

![0.1存储](/svg/native/小数的存储.svg)

#### 0.1 + 0.2过程

![0.1+0.2过程](/svg/native/相加过程.svg)

### 解决方案

**parseFloat(num.toPrecision)**
理论上用有限的空间来存储无限的小数是不可能保证精确的，但是我们可以处理一下得到期望的结果。

当拿到1.400000000001 这样的数据要展示时，建议使用toPrecision凑整并parseFloat转成数字后再显示，如下

```javascript
parseFloat(1.4.toPrecision(12)) === 1.4  // true
```
