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

## Storage

### Storage用法

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

### Storage特点

#### 生命周期

 持久化的本地存储，除非手动删除数据， 否则数据不会过期； sessionStorage 会话级存储， 浏览器或者标签页关闭后会清空

#### 存储共享

  存储的信息在同一域下是共享的，只要页面的 协议、域名、端口一致（即相同的 origin），Storage 就会天然共享。

#### 小存储容量

  Storage 存储的大小是比较小的， 大概是 <span style="color: red">5M</span> 左右， 不同浏览器厂商大小不同 本质上是对字符串的读取，如果存储内容比较多的话会消耗内存空间，会导致页面比较卡

::: details 手写LocalStorage时效性封装

```javascript
class LocalStorageWithExpiry {
  constructor(prefix = 'ls_') {
    this.prefix = prefix
  }

  /*
   * 获取带前缀的完整键名
   */
  getKey (key) {
    return `${this.prefix}${key}`
  }

  /**
   * 存储数据 (支持设置过期时间，单位:秒)
   */
  setItem(key, value, expiresInSeconds = null) {
    try {
      const fullKey = this.getKey(key);

      const item = {
        value,
        expiresAt: expiresInSeconds !== null ? Date.now() + (expiresInSeconds * 1000) : null
      };
      localStorage.setItem(fullKey, JSON.stringify(item));
      return true;
    } catch (error) {
      console.error('Failed to set localStorage item:', error);
      return false
    }
  }

  /**
   * 获取数据
   */
  getItem(key) {
    try {
      const fullKey = this.getKey(key);
      const itemStr = localStorage.getItem(fullKey);

      if (!itemStr) return null;

      const item = JSON.parse(itemStr)
      // 检查是否过期
      if (item.expiresAt !== null && Date.now() > item.expiresAt) {
        localStorage.removeItem(fullKey);
        return null;
      }
      return item.value;
    } catch (error) {
      console.error('Failed to get localStorage item:', error);
      return null;
    }
  }

  /**
   * 移除数据
   */
  removeItem(key) {
    try {
      const fullKey = this.getKey(key);
      localStorage.removeItem(fullKey);
      return true;
    } catch (error) {
      console.error('Failed to remove localStorage item:', error);
      return false
    }
  }

  /**
   * 清空所有带此前缀的存储
   */
  clearAll() {
    try {
      const keysToRemove = [];

      // 收集所有需要删除的键
      for (let k = 0; k < localStorage.length; k++) {
        const key = localStorage.key(k);
        if(key.startWith(this.prefix)) {
          keysToRemove.push(key)
        }
      }

      // 删除收集的键
      keysToRemove.forEach(key => localStorage.removeItem(key));
      return true
    } catch (error) {
      console.error('Failed to clear loacalStorage items:', error);
      return false
    }
  }
}

// 使用示例
const storage = new LocalStorageWithExpiry();

// 存储一个5秒后国旗的数据
storage.setItem('user', { name: 'John' }, 5);

// 获取数据
console.log(storage.getItem('user')); // 5秒内会返回 { name: 'John' }, 5秒后返回 null

// 存储一个永不过期的数据
storage.setItem('config', { theme: 'dark' });

// 移除特定数据
storage.removeItem('config');

// 清空所有通过该实例存储的数据
storage.clearAll();
```

:::

## IndexDB

IndexDB 是一种低级API， 用于客户端存储大量结构化的数据(包括JSON、 文件/blobs)。该API使用索引来实现对该数据的高性能搜索

### 使用方法

```javascript
// idb-keyval 的库帮忙处理
import { get, set } from 'idb-keyval'
set('hello', 'world')
get('hello').then(value => {
  console.log(value)
})
```

## Cookie、LocalStorage, sessionStorage区别

#### 存储大小

- **cookie** : 4KB

- **LocalStorage**: 5MB

- **SessionStorage**: 5MB

#### 有效时间

- **cookie** : 过期时间之内一直有效(Expires, Max-Age)

- **LocalStorage**: 持久有效

- **SessionStorage**: 浏览器窗口关闭会自动删除

#### 交互方式

- **cookie** : cookie 的数据会自动传送到服务器， 服务端也可以写cookie到客户端

- **LocalStorage**: 只能本地保存

- **SessionStorage**: 只能本地保存

#### 应用场景

- **cookie** : 标记用户与跟踪用户行为的情况， 推荐使用cookie

- **LocalStorage**: 长期保存在本地的数据(令牌), 推荐使用localStorage

- **SessionStorage**: 敏感账号一次性登录， 推荐使用 SessionStorage

- **indexDB** : 存储大量数据的情况、 在线文档(富文本编辑器)保存编辑历史的情况， 推荐使用indexDB
