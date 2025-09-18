# 本地存储

浏览器本地存储是指浏览器提供的一种机制，允许 Web 应用程序在浏览器端存储数据，以便在用户下次访问时可以快速获取和使用这些数据。

## cookie

### cookie定义

 cookie 类型为 小型文本文件， 指某些网站为了辨别用户身份而存储在用户本地终端上的数据。是为了解决http无状态导致的问题。 Cookie 不超过4kb的小型文本数据， 它是由一个名称、一个值和其他几个用于控制cookie有效期、安全性、使用范围的可选属性组成。

 cookie 每次请求中都会被发送， 如果不使用https对其加密， 容易被csrf攻击

### cookie 使用

- 使用HTTP响应头设置cookie

```javascript
const express = require('express')
const app = express()

app.get('/',(req, res) => {
  /// maxAge 是以秒为单位
  res.cookie('username', 'John', { maxAge: 900000, httpOnly: true })
  res.send('Cookie is Set')
})

app.listen(3000, () => {
  console.log('Server is running on port 3000')
})
```

- 通过客户端设置cookie

```javascript
// 设置一个简单的Cookie
document.cookie = 'username=John'
// 设置一个带有过期时间的cookie
const now = new Date()
const time = now.getTime()
const getExpireByDay = (day) => {
  return day * 24 * 3600
}

const expireTime = time + getExpireByDay(2)
now.setTime(expireTime);
document.cookie = 'username=John;expries=' + now.toUTCString() + ";path=/";

// 设置一个带有多个属性的Cookie
document.cookie = 'username=John;expries=' + now.toUTCString() + ";path=/;domin=example.com;secure;SameSite=Strict";
```

- 设置具有各种属性的Cookie

```javascript
// 设置带有各种属性的Cookie
const setCookie = (name, value, days) => {
    let expires = "";
    if (days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "")  + expires + "; path=/; domain=example.com; secure; HttpOnly; SameSite=Strict";
}

// 调用函数设置Cookie
setCookie('username', 'JohnDoe', 7); // 7 days expiry
```

### cookie 属性

#### Express

用于设置cookie的过期时间（后端想删除cookie 设置过期时间是当前时间之前，前段再做处理）

```javascript
Expries = Wed, 21 Oct 2015 07:28:00 GMT
```

#### Max-Age

用于设置Cookie失效之前需要记过的秒数（优先级比Expries高）

```javascript
Max-Age=604800
```

#### Domain

用于指定cookie可以送达的主机名

#### Path

用于指定URL路径，这个路径必须出现在要请求的资源的路径中才可以发送Cookie首部

```javascript
Path = /docs  // /docs/web 下的资源会带Cookie首部
```

#### Secure

标记为 `Secure`的Cookie只应通过被https 协议加密过的请求发送给服务端

#### HttpOnly

布尔值 指定Cookie 不能通过Javascript访问(防止xss攻击)， 只能后端设置

#### SameSite

控制Cookie是否在跨站请求中发送，可以设置为 Strict、Lax 或 None

## LocalStorage

### LocalStorage用法

```javascript
localStorage.setItem("username", "name"); // "name"
localStorage.setItem("count", 1); // "1"
localStorage.setItem("isOnline", true); // "true"
sessionStorage.setItem("username", "name");
// user 存储时，先使用 JSON 序列化，否则保存的是[object Object]
const user = { "username": "name" };
localStorage.setItem("user", JSON.stringify(user));
sessionStorage.setItem("user", JSON.stringify(user));
```

### LocalStorage特点

#### 生命周期

 持久化的本地存储，除非手动删除数据， 否则数据不会过期； sessionStorage 会话级存储， 浏览器或者标签页关闭后会清空

#### 存储共享
