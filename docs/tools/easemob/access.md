# 项目接入具体流程

## 环信账号

1. 登录<a href="https://easemob.com" target="_blank" style="color: #4d8dfa">环信官网</a>,  注册一个管理者账号
2. 注册成功后，点击右上角登录 ----> 登录即时通讯云, 进入console后台
3. 在环信通讯云控制台创建Appkey
![环信添加应用](/image/tools/easemob/easemob_app.png)

*环信添加应用*

## 项目集成SDK

### SDK下载与安装

[环信各平台SDK下载地址](https://www.easemob.com/download/im#Web)

本地项目使用的是uniapp + vue3 所以下载web的sdk：

```bash
# 添加依赖
npm install easemob-websdk
```

> 支持的浏览器

  - Chrome 54+
  - Firefox 10+
  - Safari 6+

> 环信SDK是支持按需导入的，为了节省应用程序体积， 推荐按需导入模块

**按需导入SDK模块**

:::warning 提示🔔

1. 只有按需导入 SDK 的方式才支持 本地会话管理功能。

2. 小程序 uniapp 不支持使用 miniCore 的集成方式。
:::

根据项目需求引入相应的功能模块。

```ts
// 引入聊天模块与类型
import websdk from "easemob-websdk/uniApp/Easemob-chat";
import type { EasemobChat, EasemobChatStatic } from "easemob-websdk/Easemob-chat";
```

### SDK初始化

**前提条件**

有效的环信即时通讯IM开发者账号和App Key

**初始化**

- 将初始化实例相关方法放在pinia中维护

```typescript
import { defineStore } from "pinia";
import websdk from "easemob-websdk/uniApp/Easemob-chat";
import type { EasemobChat, EasemobChatStatic } from "easemob-websdk/Easemob-chat";

export const useConnStore = defineStore('conn', () => {
  /** IM连接实例 */
  let conn = null as unknown as  EasemobChat.Connection;
  let sdk = websdk as EasemobChatStatic

  /** 初始化 webIM方法 */
  const initChatSDK = (config: EasemobChat.ConnectionParameters) => {
    setChatCoon(new sdk.connection(config))
    return conn
  }

  /** 设置conn实例 */
  const setChatConn = (connection: EasemobChat.Connection) => {
    conn = connection
    // conn 挂在到uni实例上 方便调用
    uni.conn = connection
  }

  /** 获取conn实例 */
  const getChatConn = (): EasemobChat.Connection => {
    if (conn) {
      return conn;
    }
    throw "conn is not initialized";
  };

  /** 获取 websdk */
  const getChatSDK = (): EasemobChatStatic => {
    if (sdk) {
      return sdk;
    }
    throw "SDK is not found";
  };

  return {
    conn,
    getChatConn,
    initChatSDK,
    getChatSDK
  }
})
```

- 连接状态事件放在全局去监听

```typescript
import pinia from "@/store";
import { useConnStore } from "@/store/conn";

const { initChatSDK, getChatConn } = useConnStore(pinia);

const APPKEY: string = "your APP key"
const URL: string = "wss:// your socket link"
const API_URL = "https:// your rest url link"
// 初始化环信SDK
initChatSDK({
  appKey: APPKEY,
  isHttpDNS: false,
  url: URL,
  apiUrl: API_URL,
});

/** 连接状态事件 */
WebIM.addEventHandler("iMInitialization", {
  onConnected: () => {
    console.log("已连接->onConnected");
  },
  onDisconnected: () => {
    console.log("已断开连接->onDisconnected");
  },
  onReconnecting: () => {
    console.log("重新连接->onReconnecting");
  },
  onOnline: () => {
    console.log("在线->onOnline");
  },
  onOffline: () => {
    console.log("离线->onOffline");
  },
});

/** 绑定demo的事件监听 */
WebIM.addEventHandler("chatRoom", {
  onTextMessage: (event) => {
    console.log(event, "我是文本消息");
  },
  onCustomMessage: (event) => {
    console.log(event, "我是自定义消息");
  },
});
```

### 登录

项目中初始化 IM SDK 后，需要先调用接口登录，才能使用IM的功能。

在登录之前， 应该先调用注册 如果之前没有注册过， 就调用新用户注册接口，如果是注册过用户，则走登录接口

#### 注册

用户注册支持以下方式

- `开放注册`

一般是在体验Demo和测试环境时使用，正式环境中不推荐使用开放注册。要使用开放注册，需要在
<a target="_blank" style="color: #4d8dfa" href="https://console.easemob.com/index">控制台</a>

的**即时通讯**---> **服务概览**的设置区域进行修改, 只有打开该开关，才能使用客户端或
<a target="_blank" style="color: #4d8dfa" href="https://doc.easemob.com/document/server-side/account_system.html#%E5%BC%80%E6%94%BE%E6%B3%A8%E5%86%8C%E5%8D%95%E4%B8%AA%E7%94%A8%E6%88%B7">
REST API</a>开放注册用户

- `授权注册`

通过环信提供的REST API注册环信用户账号，注册后保存到服务器或者保存到客户端。要使用授权注册，需要在
<a target="_blank" style="color: #4d8dfa" href="https://console.easemob.com/index">控制台</a>

的**即时通讯**---> **服务概览**的设置区域进行修改,将**用户注册**模式设置为**授权注册**。

> *授权方式*
> [授权注册单个用户](https://doc.easemob.com/document/server-side/account_system.html#%E6%8E%88%E6%9D%83%E6%B3%A8%E5%86%8C%E5%8D%95%E4%B8%AA%E7%94%A8%E6%88%B7)
>
> [批量授权注册用户](https://doc.easemob.com/document/server-side/account_system.html#%E6%89%B9%E9%87%8F%E6%8E%88%E6%9D%83%E6%B3%A8%E5%86%8C%E7%94%A8%E6%88%B7)

![环信设置注册方式](/image/tools/easemob/easemob_register.png)

#### 登录方式

- **用户ID + token** 这是一种更加安全的登录方式

  在生产环境中，为了安全考虑，你需要在你的应用服务器集成
  <a href="https://doc.easemob.com/document/server-side/easemob_app_token.html" target="_blank" style="color:#4d8dfa">
  获取 App Token API</a>
  和<a href="https://doc.easemob.com/document/server-side/easemob_user_token.html" target="_blank" style="color:#4d8dfa">
  获取用户 Token API </a>

  实现获取 Token 的业务逻辑，
  使你的用户从你的应用服务器获取 Token。SDK 会在 Token 过期时或者其有效期达到 80%（4.15.0 之前为 50%）时分别回调 `onTokenExpired` 和 `onTokenWillExpire` 通知用户更新 Token。

  ```typescript
  conn
    .open({
      user: "username",
      accessToken: "token", // 由后台集成token api 生成
    })
    .then(() => {
      console.log("login success");
    })
    .catch((reason) => {
      console.log("login fail", reason);
    });

  ```

- **用户 ID + 密码登录** 是传统的登录方式。用户 ID 和密码均由你的终端用户自行决定，密码需要符合*密码规则要求(长度不可超过 64 个字符。)*。

```typescript
conn
  .open({
    user: "username",
    pwd: "password",
  })
  .then(() => {
    console.log("login success");
  })
  .catch((reason) => {
    console.log("login fail", reason);
  });

```

### 接口调用

在调用登录接口时， 环信内部会自动调用内部token接口 用于获取其他接口请求所需要的token，
所以在调用其他登录接口时 需要检测是否登录, webIM提供了API `WebIM.isOpened()`,
用于检测是否登录了环信； 结合全局监听的*连接*、*在线*、*离线*。*重新连接* 进行连接校验工作

[Easemob SDK API Reference 地址](https://doc.easemob.com/jsdoc/index.html)

在项目中， 具体调用方式是通过*实例.要请求的方法*进行调用

eg:

```typescript
// 加入聊天室
connection.joinChatRoom({roomId: 'roomId'})
```
