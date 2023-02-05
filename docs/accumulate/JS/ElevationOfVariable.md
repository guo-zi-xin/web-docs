```
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>我的大葱油饼</title>
    <style></style>
</head>
<body>
</body>
<script>
    var x = 5 ;
    console.log(x) // 此时打印出来的是5;

     var a='hello world';
     var a;
     console.log(a); //你以为打印的是undefined? 错! 打印的是'hello world'

</script>
</html>
```
再来看一个例子:
```
console.log(a); //现在你以为他会报错? 不存在的! 打印undefined!
var a='hello world';
```
此时, 就有一个疑问, 怎么会是这样? 
不应该报错吗? 
经查阅 此时涉及到变量的提升
JavaScript 中，函数及变量的声明都将被提升到函数的最顶部。
JavaScript 中，变量可以在使用后声明，也就是变量可以先使用再声明。
也就是说, 当你声明一个变量时 变量先会提升到最顶端 默认为undefined;
      第一个例子中 我们先声明了a; var a = 'hello world'; 此时提升到顶部的是
  a = undefined ;
第二次 var 的 a 也会提升到顶部 也为undefined , 之下的 才是a = 'hello world'; 所以此时打印的是'hello world';
     第二个例子中也是如此, 先提升到顶部 为undefined 再去给a赋值 赋值结果为'hello world' 所以打印的是'hello world',
  实际的运行结果为
    var a = undefined;
    a   ='hello world';
    console.log(a);
介绍完变量就应该介绍函数的变量的提升了;
首先先看一个例子:
```
var a = 1;
function fn() {
    console.log(a); //这个a会打印1吗? 不会! 打印出来undefined!
    var a = 1;
    console.log(a); //此时的a才会打印1
}
fn();
console.log(a);//这个a 也会打印1
```
   为什么会这样呢?
    由于函数的局部作用域的问题 ,全局变量访问不到函数内部的变量 所以会打印undefined; 就拿这个例子来说, 由于在下面var了一个变量a = 1; 但是由于变量的提升, 他会先赋值为undefined, 并且提升到函数体内部的顶端, 也就是说此时的a为undefined, 虽然全局作用域里边已经声明了变量a ,但是由于函数体内部的变量的提升 , 从先后顺序来讲, 他会现访问到全局的作用域里的a = 1, 在函数体内部又重新给a赋值了undefined, 所以第一个打印的是undefined; 第二次打印出来一个1, 完全是因为在函数体内部声明了一个变量a = 1, 直接打印就会打印出1; 至于函数体外边的console.log(a), 那就更简单了, 由于在全局已经声明了变量a ,所以在全局作用域中打印出来的就是1.
  
还有一个例子:
```
fn();
var a = 1;
console.log(a);//这个打印1
function fn() {
    a = 2;
   console.log(a); //这个a打印2
}
console.log(a); //这个a打印1
```
  我们来简单分析一下: 
    首先 第一个打印项 由于全局声明好了a = 1; 所以第一个a打印就为1 ;
虽然在声明变量的前边调用了函数 但是通过变量的提升 后面的值会覆盖前面的 最后一个刚好是a = 1 所以打印结果为1;
    第二个打印项打印出2 是因为在函数体内, 将2 赋值给了变量 a 由于变量a在全局中已经声明了 所以不会报错 并且打印结果为2;
    至于第三个打印项么, 就是简单的变量的提升了, 由于全局中a最终的值为1; 所以打印结果也为1.怎么样 是不是很神奇?
总之, 变量的提升就是无论作用域中的声明出现在什么地方，都将在代码本身被执行前首先进行处理，可以将这个过程形象地想象成所有的声明（变量和函数）都会被“移动”到各自作用域的最顶端，这个过程被称为提升.