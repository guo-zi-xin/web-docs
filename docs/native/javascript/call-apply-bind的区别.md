# JS中call apply bind 的区分

---
在原生js中会有三个很常见的函数，`call`,`apply`,`bind`

他们的作用就是改变当前函数的`this`指针，

但是细微来说他们还是有不同的:
`call` `apply` 改变函数的指向的同时 立即进行调用;
`bind` 则是在函数进行调用之前，就强行给变了`this`的指向（进行前）,它的效果是返回一个函数（只是给变了`this`指向）;
举个栗子:

```javascript
var obj = {
    name:"张三",
    fn:function(){
        console.log(this.name);
    }
}
obj.fn(); //张三
//这里能打印是因为这里的指向是指向这个obj对象的 
//此时 再看一个例子:
var obj = {
    name:"张三",
    fn:function(){
        console.log(this.name);
    }
}
var a = obj.fn;
a(); //undefined
//我们只是想打印obj里边的fn 这个时候就应该用我们的call了
var obj = {
    name:'张三',
    fn:function(){
        console.log(this.name);
    }
}
var a = obj.fn;
a.call(obj); //此时打印的是'张三'
// 这是因为 通过call函数将a的指向变成了obj这个对象 所以 他会执行函数 并且打印出name的值;
```

* call方法还可以传入多个参数

```javascript
var obj = {
    name:"张三",
    fn:function(){
        console.log(this.name);
    }
}
var a = obj.fn;
a.call(obj,1,2,3); //此时打印的是'张三'
```

**call与apply函数的差别 就是后面传入的参数格式不同;**

**call传入的是每个单纯的元素 而apply传入的是一个数组;**

```javascript
var obj = {
    name:"张三",
    fn:function(){
        console.log(this.name);
    }
}
var a = obj.fn;
a.apply(obj,[10,5,9]); //此时打印的是'张三'
//注 亦可以var arr = [10,5,9,7] 传入的时候直接传入arr
//a.apply(obj,arr) 
```

**需要注意的是:**注意如果`call`和`apply`的第一个参数写的是`null`，那么`this`指向的是`window对象`;

接下来是`bind`
bind函数也是改变this指向的 但是不会立即调用

```javascript
var obj = {
    name:"张三",
 
}
function count (x,y) {
  return x + y + this.name;
}
console.log(count.bind(obj))//此时打印的是 函数体,没有被调用
```

![bind.png](/image/console.png)

```javascript
console.log(count.bind(obj)(5,2))//打印出来的是'7张三'
```

同样`bind`也可以有多个参数，并且参数可以执行的时候再次添加，但是要注意的是，参数是按照形参的顺序进行的;

## 总结

  `call`和`apply`都是改变上下文中的`this`并立即执行这个函数，`bind`方法可以让对应的函数想什么时候调就什么时候调用，并且可以将参数在执行的时候添加，这是它们的区别，根据自己的实际情况来选择使用.
