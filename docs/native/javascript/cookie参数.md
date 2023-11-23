# Cookie (document.cookie)

`cookie`是直接存储在浏览器的一小串数据， 它们是`HTTP`协议的一部分，由 [RFC 6265][1] 规范定义。

`Cookie` 通常是由Web服务器使用响应`Set-Cookie`HTTP-header设置的。然后浏览器使用`Cookie` HTTP-header 将它们自动添加到（几乎）每个对相同域的请求中。

最常见的用处就是用于身份验证：

1. 登录后 服务器在响应中使用 Set-Cookie HTTP-header 来设置具有唯一“会话标识符（session identifier）”的 cookie。

2. 下次当请求北方送到同一个域时，浏览器会使用`Cookie`HTTP-header通过网络发送cookie。

3. 所以服务器知道是谁发起了请求。

我们还可以使用`document.cookie`属性从浏览器访问cookie。

## 从document.cookie中读取

你的浏览器是否存储了本网站的任何cookie？ 让我们来看看：

```javascript
// 在javascript.info 我们使用谷歌分析来统计，
// 所以应该存一些cookie
console.log(document.cookie)
```

> `document.cookie`的值是由`name=value`组成，以`;`分隔， 每一个都是独立的cookie。

为了找到一个特定的cookie， 我们可以以`;`分隔，将`document.cookie`分开， 然后找到对应名字， 我们可以使用正则表达式或者函数数组来实现。

- 正则表达式

```javascript
function parseCookies(cookieString) {
  const cookies = {};
  const cookieArray = cookieString.split(';');

  for (let i = 0; i < cookieArray.length; i++) {
    const cookieItem = cookieArray[i];
    const match = cookieItem.match(/^\s*([^=]+)=(.*)$/);
    if (match) {
      var key = match[1];
      var value = decodeURIComponent(match[2]);
      cookies[key] = value;
    }
  }

  return cookies;
}

// 示例用法
var cookieString = document.cookie;
var parsedCookies = parseCookies(cookieString);
console.log(parsedCookies);

```

- 函数数组

```javascript
function parseCookies(cookieString) {
  const cookies = {};
  const cookieArray = cookieString.split(';');
  cookieArray.forEach(function(cookie) {
    const cookieTrimmed = cookie.trim();
    const cookieParts = cookieTrimmed.split('=');
    const key = decodeURIComponent(cookieParts[0]);
    const value = decodeURIComponent(cookieParts[1]);
    cookies[key] = value;
  });

  return cookies;
}

// 示例用法
var cookieString = document.cookie;
var parsedCookies = parseCookies(cookieString);
console.log(parsedCookies);
```

## 写入document.cookie

我们可以写入`document.cookie`。但这不是一个数据属性， 他是一个[访问器][2]。对其的赋值操作会被特殊处理。

**对于`document.cookie`的写入操作只会更新其中提到的cookie，而不会涉及其他cookie。**

例如： 此调用设置了一个名为`user`并且值为`John`的cookie

```javascript
document.cookie = "user=John"; // 只会更新名称为 user 的 cookie
alert(document.cookie); // 展示所有 cookie
```

如果你运行了上面这段代码， 你会看到多个cookie。这是因为`document.cookie`操作不是重写整个所有的cookie， 他只设置代码中提到的cookie `user`。

从技术上讲，cookie的名称和值可以是任意字符。 为了保持有效的格式， 他们应该使用内建的`encodeURIComponent`函数对其进行转义：

```javascript
// 特殊字符（空格）， 需要编码
let name = 'my name'
let value = 'John Smith'

// 将cookie编码为 my%20name=John%20Smith
document.cookie = encodeURIComponent(name) + '=' + encodeURIComponent(value);
console.log(document.cookie); // ...; my%20name=John%20Smith
```

- 限制

> - encodeURIComponent 编码后的 name=value 对，大小不能超过 4KB。因此，我们不能在一个 cookie 中保存大的东西。
> - 每个域的 cookie 总数不得超过 20+ 左右，具体限制取决于浏览器。

Cookie有几个选项，其中很多都很重要，应该设置它
选项在被列在key=value之后，以`；`分隔，像这样

> ```html  document.cookie = "user=John; path=/; expires=Tue, 19 Jan 2038 03:14:07 GMT"```

### path

- `path=/mypath`

url路径前缀必须是绝对路径。他使得该路径下的页面可以访问该cookie。默认为当前路径。
如果一个cookie带有`path=/mypath`设置， 那么该cookie在`admin`和`/admin/something`下都是可见的， 但是在`/home`或`/adminpage`下不可见。
通常， 我们应该将`path`设置为根目录： `path=/`, 以使cookie对此网站所有页面可见。

### domain

- `domain=site.com`
domain控制了可访问cookie的域。但是在实际中，有一些限制。 我们无法设置任何域。
**无法从另一个二级域访问cookie，因此`other.com`永远不会收到在`site.com`设置的cookie**
这是一项安全限制，为了允许我们将敏感数据存储在应该仅在一个站点上可用的cookie中。
默认情况下，cookie只有在设置的域下才能被访问到。
请注意， 在默认情况下，cookie也不会共享给子域， 例如`forum.site.com`。

```javascript
// 如果我们在site.com网站上设置了cookie...
document.cookie = 'user=Jhon'

//....在forum.site.com 域名下， 我们无法访问它
console.log(document.cookie) // 没有user
```

但这是可以设置的，如果我们想允许像`forum.site.com`这样的子域在`site.com`上设置cookie， 也是可以实现的。
为此， 当在`site.com`设置cookie时，我们应该明确地将`domain`选项设置为根域：`domain=site.com`，那么， 所有子域都可以访问到这样的cookie。
例如：

```javascript
// 在site.com
// 使cookie可以被在任何子域 *.site.com 访问
document.cookie= 'user=John;domain=site.com'

// 之后 在forum.site.com 
console.log(document.cookie) // 有cookie user=John
```

出于历史原因， `domain=.site.com`（`site.com`前面有一个点符号）也以相同的方式工作， 允许从子域访问cookie。 这是一种旧的表示方式， 如果我们需要支持非常旧的浏览器， 那么应该使用它。

**总结一下， 通过domain选项的设置，可以实现允许在子域访问cookie。**

### expires  max-age

默认情况下， 如果一个cookie没有设置这两个参数中的任何一个， 那么在关闭浏览器后，他就会消失。此类cookie被称为“session cookie”。

为了让cookie在关闭浏览器后仍然存在， 我们可以设置`expires`或 `max-age`选项中的一个。

- `expires=Tue, 19 Jan 2038 03:14:07 GMT`
cooke的国旗时间定义了浏览器会自动清除该cookie的时间。
日期必须完全采用GMT时区的这种格式。我们可以使用`date.toUTCString`来获取它。 例如我们可以将cookie设置为一天后过期。

```javascript
// 当前时间+1天
let date = new Date(Date.now()+ 86400e3);
date = date.toUTCString();
document.cookie='user=John;expries'+ date;
```

如果我们将`expries`设置为过去的时间，则cookie将会被删除。

- `max-age=3600`
它是`expries`的替代选项，指明了cookie的过期时间距离当前时间的秒数。
如果将其设置为0或者负数， 则cookie会被删除：

```javascript
// cookie 会在一小时后失效
document.cookie='user=John;max-age=3600';

// 删除cookie（让他立即过期）
document.cookie = 'user=John;max-age=0'
```

### secure

- `secure`
cookiey应该只能被通过https传输。

[1]: https://datatracker.ietf.org/doc/html/rfc6265
[2]:https://zh.javascript.info/property-accessors
