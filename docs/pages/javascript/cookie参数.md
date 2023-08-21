# Cookie (document.cookie)

cookie是直接存储在浏览器的一小串数据， 它们是`HTTP`协议的一部分，由 [RFC 6265](https://datatracker.ietf.org/doc/html/rfc6265) 规范定义。

Cookie 通常是由Web服务器使用响应`Set-Cookie`HTTP-header设置的。然后浏览器使用`Cookie` HTTP-header 将它们自动添加到（几乎）每个对相同域的请求中。

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

我们可以写入`document.cookie`。但这不是一个数据属性， 他是一个[访问器](https://zh.javascript.info/property-accessors)。对其的赋值操作会被特殊处理。

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

> 限制

> - encodeURIComponent 编码后的 name=value 对，大小不能超过 4KB。因此，我们不能在一个 cookie 中保存大的东西。
> - 每个域的 cookie 总数不得超过 20+ 左右，具体限制取决于浏览器。