# 学习AngularJS 1.x

### Learning AngularJS 1.x

本书是我在学习和应用AngularJS 1.x 的过程中的资料梳理。希望能对大家学习AngularJS有一定帮助。

```txt
如果您在阅读过程中，有任何疑问或者发现错误，可联系：
作者： Harry<harry@andtoo.net>
微信： hharry
```

### 本书地址

本书使用GitBook和GitHub托管。

GitBook地址：[hairui219/learning_angular](https://www.gitbook.com/book/hairui219/learning_angular/details)

GitHub地址：[hairui219/learning_angular](https://github.com/hairui219/learning_angular)

### 章节目录

- [简介](introduction)
- [环境的准备](chapter01)
- [项目的创建和配置](chapter02)
- [AngularJS的第一步](chapter03)
- [学习和使用AngularJS](chapter04)
  - [基本表达式](chapter04_1)
  - [AngularJS初始化 ng-app](chapter04_2)
  - [控制器 ng-controller](chapter04_3)
  - [数据绑定 data-binding](chapter04_4)
  - [条件判断 ng-if / ng-show / ng-hide](chapter04_5)
  - [重复语句 ng-repeat](chapter04_6)
  - [过滤器 filter](chapter04_7)
  - [样式选择器 ng-class/ng-style](chapter04_8)
  - [下拉列表选项 ng-options](chapter04_9)
  - [引入ng-include和模板ng-template](chapter04_10)
  - [本章总结](chapter04_summary)

- [深入学习AngularJS - Directive](chapter05)
  - [制作一个自定义的Directive](chapter05_1)
  - [Directive的命名和使用规则](chapter05_2)
  - [让Directive支持传入数据](chapter05_3)
  - [使用templateUrl获取模板](chapter05_4)
  - [让Directive动起来`link()`](chapter05_5)
  - [把Directive变为一个容器`transclude`](chapter05_6)
  - [Directive之间互相通讯](chapter05_7)
  - [本章总结](chapter05_summary)

### 本书的读者

本书会介绍如何应用AngularJS，但是本书不会涉及到JavaScript语法以及HTML和CSS的布局模式。因此，本书对读者有一定的前置技术要求：

1. 您需要知道和理解HTML和CSS布局的方法
2. 您需要知道JavaScript的基本语法
3. （推荐）您知道一些Node.js的使用方法
4. （推荐）您知道控制台命令如何使用

如果您需要对以上某方面内容入门，我向您推荐[W3School网站](http://www.w3school.com.cn/index.html)。您可以在这个网站上快速的了解相关的知识。

另外，在JavaScript方面，如果您有一定的PHP经验，我向您推荐这本书（如果您没有PHP经验，这本书也可以阅读）：

- JavaScript for PHP Developers (中文版) - Stoyan Stefanov 著 - 李强 译

这本书只有141页（定价28元，网站还有折扣），阅读起来非常轻松，如果您有编程经验，一个下午就可掌握JavaScript的基本语法和用法（同时也可能学会PHP的语法）。

> 京东特价优惠时我购买了几十本与JavaScript相关的书籍，这本是我认为最靠谱的入门书。

### 我应用AngularJS的方法

在进行前端开发的工作之前，我担任过几年的移动互联网产品经理，设计了几款应用（参与了一小部分的开发工作）。之后我改做应用和手机游戏的后端开发（主要使用PHP）。

在这几年的工作经验中，我形成了一套app的构建思路。因此，在制作网站前端时，我也希望采用类似的方法（我不喜欢直接在php代码中直接嵌入html模板的方案，那样做感觉上比较混乱，难以管理。

因此，我将AngularJS作为一个类似于app的载体，当网站代码在客户端载入完成后，再通过api请求获取数据。

#### 这样做的好处

这样实现后，我认为主要有以下几个方面的好处：

1. 数据通过API(https)获取，过程并不向用户开放，起到了隐蔽后端服务器的效果
2. 可以对API的访问限制和安全性进行更完善的设计实现
3. 前端网站托管在阿里云的OSS上（以静态网站的方式部署），这样页面部分不再占用服务器的流量和空间
4. 便于之后的扩展，前端网站可以使用阿里云的CDN直接进行访问加速；后端在使用API模式通讯的情况下，本来就可以极大的提高负载能力（网络带宽优化），如果需要扩展，可以提高机器配置或者增加机器数量。

幸运的是，**AngularJS推荐这么做**。

### 为什么选择AngularJS 1.x

对于选择AngularJS，业(zhi)界(hu)其实有一个调侃的说法：

> 写Java的写不来JavaScript的用AngularJS

虽然这个说法比较武断，但是其中也体现出来一个明显的信息，**如果你之前有Java或其它后端语言的编程经验，AngularJS是让你快速上手Web前端开发的很好的选择**。至少对我而言是如此。

### 我选择AngularJS的历程

> 以下内容部分读者可能会感到有些偏激，但是这是对我（一个拥有一些其它编程经验的前端入门者）的心路记录。

2015年初，在准备通过完全的Web方式实现一个B/S模式的企业服务网站之后，我开始进行技术方面的准备。在此之前，我只有Android客户端和PHP服务端的工作经验。另外，我对web的基本开发技能使用过一些，掌握了HTML+CSS的一些应用技巧。JavaScript的语法和基本特性方面也通过Node.js在工作中的应用熟悉了。

但是，在网站前端技术准备过程中，我发现我对DOM的操作一窍不通。即使是购买了若干本入门的书籍，通过阅读书籍，我知道了如何通过document.getElementById('xxx')或者jQuery的$('xxx')来获取元素和填入代码之类的工作。但学会基本的语法之后，我仍然是对于具体如何操作DOM来实现具体的功能完全没有头绪。这是一种什么感觉呢？就像是在读大学时学习C/C++/Java语言，我们可以手工的去实现一些基本的算法或数据结构。但是学完了之后，我们可以直接使用C/C++或Java制作基于Windows的客户端程序了吗？一点也不。学习DOM入门给我的感觉与之一模一样。

因为当时并不知道还有JavaScript框架这种东西存在，我去网上搜索教程时也是一头雾水。因此，我想了一个笨办法，直接在一个国外的网站上购买了一套后台管理系统界面的模板。浏览了下源代码之后，我发现源码提供了两套版本，一套完全基于jQuery+BootStrap的版本，和一套基于AngularJS的版本。两个版本的界面布局一模一样，但是基于AngularJS的版本提供了一些如单页应用（在同一个界面直接刷新部分界面而不是整页刷新）的特性。

然后便是一系列的在网上搜索了解AngularJS的过程，看完它基本的Tutorial（PhoneCat）之后，我马上被它的特性震惊了。因为，

1. AngularJS的整个结构体系非常符合我的思路
2. 双向绑定的特性实在是太和我胃口了，这让我完全不用再操心DOM

因为这两点特性，我义无反顾的加入了使用AngularJS的大军。

> 题外话：

> 国外网站购买的这种模板，都是由专业的前端人员开发，提供的功能都非常丰富完整。另外，它们对管理工具的使用也很正规（使用bower或其它工具来管理第三方库等），代码结构和注释也非常完善。

> 对我而言，这笔投资绝对物有所值（当时花费了我19美金）。

接下来我所做的事情，就是拿着这个模板的代码，修改html和增加controller/service，调整ui-router的配置，最终完成了网站的第一个版本。花的时间大约是2个月出头（前端+后端+部署调试，开发工作全部由我一人完成）。

从今天来看，我的做法完全不符合AngularJS的最佳实践。虽然我未在网站中使用jQuery等类库，但是我也同样没有使用AngularJS推荐使用的directive方式（完全没有使用，这也是我准备在更深入的学习AngularJS和重新构建网站的第二版的主要原因）。

但是，不管怎么说，我把东西做出来了，而且整个网站是可用的，从程序结构上也是可维护和修改的。

### 为什么写这本书

由于业务需要，我准备重新制作网站的v2版本。在这个版本中，会有很多新的功能需求（功能扩大非常多）。因此，完全重构整个网站是可以接受的。另外，我之前只是误打误撞的制作出来一个"可用"的网站，为了使用更地道的方式制作这个新版网站，我现在正在重新学习AngularJS。

写这本书，一方面是为了记录学到的AngularJS的技术，便于我日后查询；另一方面也是为了给自己一点压力，让自己沉下心来掌握这门技术。

我在AngularJS方面也是一名菜鸟，虽然我会尽力保证信息的正确性，但也还请您在阅读的过程中批判的接收信息。如果有何问题，请通过邮件或微信联系我（联系地址在此页面上方）。

### 另：为什么没有选择Angular 2

其实在重构时，我优先的选择是Angular 2 & TypeScript。因为它引入了很多新的特性，比如应用了最新的ES标准，大量优化了Angular工作的效率等等。

但是，下面3个原因导致了我放弃了Angular 2作为新版本网站的技术选择。

1. 我自认为是一个比较追求新技术的人，但是当我测试Angular 2时，发现我电脑上安装的Chrome v44版本无法运行，当我下载更新到v47后才能正常运行（官网介绍v46以上才支持es6）。
2. 新版本Angular 2抛弃了controller/service，完全用directive，这点与我的技术构想不符。
3. 即使在我评估Angular 2时已经是beta版本，但是官网仍然推荐不要将其用于生产环境。

我的网站运行的是对公业务，且对合作方使用的浏览器有一定的影响能力，但是我没有信心让所有客户都安装上Chrome的最新版本。

与我技术构想不符则是对我本人来说更重要的一个原因，因为我无法认同Angular 2的优化方向。同时，根据我的工作经验来看，这样革命性的优化通常是内部一群理念不合的人另起炉灶，结果可能喜忧参半，不一定会最终成功。

TypeScript的引入我不好评价，但是强类型定义和模型化并不太符合我的业务模式（api一次性获取界面需要的所有数据，这些数据已经在服务端进行好了类型定义和完整性处理，本地主要是实现对CRUD的调用）。

综上，我放弃了在新版本的网站中应用Angular 2技术，而选择继续使用AngularJS 1.x。

## 版权声明 LICENSE

```text
署名-非商业性使用 4.0 国际
版权所有 (c) 2016 Harry<harry@andtoo.net>
本作品采用知识共享 署名-非商业性使用 4.0 国际 许可协议进行许可。访问
http://creativecommons.org/licenses/by-nc/4.0/ 查看该许可协议。

Attribution-NonCommercial 4.0 International (CC BY-NC 4.0)
Copyright (c) 2016 Harry<harry@andtoo.net>
This work is licensed under the Creative Commons Attribution-NonCommercial 4.0
International License. To view a copy of this license, visit
http://creativecommons.org/licenses/by-nc/4.0/.
```
