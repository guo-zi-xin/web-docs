# uni-app unipush指南

**UniPush 是 DCloud 联合个推公司推出的集成型统一推送服务，是所有uni-app开发者首选的推送服务**

有两个版本：

- 2.0版新版文档地址：
[unipush2.0接入](https://uniapp.dcloud.net.cn/unipush-v2.html)

- 1.0老板本文档地址

[unipush1.0接入](https://uniapp.dcloud.net.cn/unipush-v1.html)

目前项目中是接入了**2.0**版本，此文章主要讨论`uni-push2.0`版本的接入

### 应用场景

以下功能可以用uni-push 实现

- 用户消息通知

  当 APP 用户相关状态或者系统功能状态变化时（如用户订单通知、交易提醒、物流通知、升级提醒、社交互动提醒等），可对用户进行及时告知，或者促使用户完成特定操作。

- 离线语音播报
它也是一种用户消息推送，实现原理其实是自定义通知提醒铃声

- 营销促活通知
在日常营销推广、促销活动等场景下（如双11大促、产品上新、重要资讯等），APP可对目标用户进行定向通知栏消息+应用内消息推送，吸引用户参与活动，提升日活。

- 基于uniCloud的IM、聊天、客服、棋牌游戏交互等

例如：DCloud基于uni-push2开发并开源了uni-im详情:

[uni-im](https://doc.dcloud.net.cn/uniCloud/uni-im.html)

另外棋牌游戏等，需要客户端被动接收消息的需求都可以用uni-push实现。

### 准备工作

#### 开通`uni-push2.0`服务

前往`DCLOUD`开发者中心， 找到`uniPush` -> `2.0` -> 应用信息， 按照要求开通服务

![开通uni-push2.0](/image/开通unipush2.0.png)

- 关联服务空间说明

::: tip
uni-push2.0需要开发者开通uniCloud。不管您的业务服务器是否使用uniCloud，但实现推送，就要使用uniCloud服务器。

- 如果您的后台业务使用uniCloud开发，那理解比较简单

- 如果您的后台业务没有使用uniCloud，那么也需要在uni-app项目中创建uniCloud环境。在uniCloud中写推送逻辑，暴露一个接口，再由业务后端调用这个推送接口

:::

开通之后， 就可以看到如下界面

![消息推送页面](/image/消息推送页面.png)

厂商推送界面

![Android厂商离线推送](/image/消息推送厂商配置.png)

默认推送是在应用启动并联网之后才能收到的，如果想在应用没有启动不联网的时候也能推送，那就需要配置各个厂商设置，而且这些厂商会要求你的软件必须在其应用商店上架才行

![厂商配置](/image/厂商具体配置.png)

#### 客户端配置

##### `manifest.json`

找到项目中的 `manifest.json` 文件， 在HBuilderX中打开，找到**安卓/IOS模块配置**， 然后勾选 `uniPush2.0`*在线推送*和*离线推送*

![uni-push推送](/image/uni-push配置.png)

### 什么是Push？

push，指服务器主动向客户端发送消息的技术。无需客户端持续轮询服务器，即可获得即时数据。

当客户端在线时，push通过socket协议实现。当客户端离线时，服务器找不到客户端，开发者无法自己实现推送，只能依托手机操作系统、小程序底层提供的离线消息推送，调用指定的手机厂商或小程序厂商的服务器接口来发送消息。

所以一个push系统需要3部分协作：开发者的业务服务器 + 专业push服务器 + 开发者的客户端应用。

其主要流程是：

1. 开发者的业务服务器向专业push服务器发送指令，告知需要向哪些客户端发送什么样的消息
2. 专业push服务器再向客户端发送消息
3. 若手机应用在线，直接收到push；若不在线，手机用户在操作系统的通知栏中看到push消息，点击后呼起客户端应用，客户端代码可以接收响应获得消息；如果是小程序的话，则是在微信消息里看到订阅消息，点击后呼起小程序并拿到启动参数.

由于手机厂商众多，他们各自都有不同的推送服务，包括Apple、google（仅能在海外使用）、华为、小米、oppo、vivo、魅族，以及还有一些没有专业推送服务的中小手机品牌。他们对App后台耗电都有查杀机制，除了微信等大应用，普通应用很难常驻后台。

DCloud与个推（A股上市公司每日互动）深度合作，为uni-app的开发者提供了比传统方案便利甚多的统一推送方案`uni-push2`，利用云端一体的优势，同时提供基于uniCloud的push服务器和基于uni-app的push客户端，两者高效协同，极大的简化了push的使用。

如下图所示： 首先开发者的uniCloud应用服务器向uni-push服务器发送push消息，然后

- 如果客户端应用在线，客户端通过socket直接收到push在线消息
- 客户端应用不联网时，`uni-push`服务器根据客户端类型，把push消息发给某个手机厂商的push服务器或小程序的订阅消息服务器；然后厂商push通道会把这条消息发到手机的通知栏或微信的订阅消息里；手机用户点击通知栏消息或小程序订阅消息后，启动App或小程序，客户端才能收到离线消息。

![uni-push推送流程](/svg/uni-push推送流程.svg)

### 在线推送

在勾选`unipush`后, 因为修改了manifest.json的配置， **一定要进行一次云打包**(打自定义调试基座和正式包都可以)后才会生效

#### 客户端代码

要实现推送， 首先需要 首先需要拿到一个客户端的唯一标识，使用`uni.getPushClientId`API

[uni.getPushClientId API](https://uniapp.dcloud.net.cn/api/plugins/push.html#getpushclientid)

```javascript
onLaunch() {
   uni.getPushClientId({
        success: (res) => {
            let push_clientid = res.cid
            console.log('客户端推送标识:', push_clientid)
            // 保存在全局，可以在进入app登录账号后调用一次接口将设备id传给后端
            this.$options.globalData.pushClientId = push_clientid
            // 一进来就掉一次接口把push_clientid传给后端
            this.$setPushClientId(push_clientid).then(res => {
                console.log('[ set pushClientId res ] >', res)
            })
        },
        fail(err) {
            console.log(err)
        }
    })
}
```

推送消息如果要接收，可以通过调用 `uni.onPushMessage`API来进行推送消息的获取

[uni.onPushMessage API](https://uniapp.dcloud.net.cn/api/plugins/push。html#onpushmessage)

```javascript
onLaunch() {
  // ... 
  uni.onPushMessage(res => {
      console.log("收到推送消息：", res) //监听推送消息
      uni.createPushMessage({
          title: res.data.title,
          content: res.data.content,
          payload: res.data.payload
      })
  })
}
```

#### 客户端使用自定义基座调试

客户端需要使用自定义基座进行云打包才能正常调试，进入 uni-app，依次进入 运行 → 运行到手机或模拟器 → 制作自定义调试基座 → 打包

![推送打包](/image/推送打包.png)

具体可参考官方教程：

- [自定义基座](https://uniapp.dcloud.net.cn/tutorial/run/run-app.html#customplayground)

- [使用云端证书(服务器生成的证书)](https://ask.dcloud.net.cn/article/35985#server)

然后使用自定义基座启动 app，将 app 的通知权限和悬浮通知权限打开

##### 推送消息

在 开发者中心 → uniPush → 2.0 → 消息推送 中填写推送信息：

![消息推送页面](/image/消息推送页面.png)

- 点击 预览 → 确定

这时候手机上就可以收到通知了

- APP顶部弹窗

  ![手机通知1](/image/手机通知1.png)

- 状态栏提示

  ![手机通知2](/image/手机通知2.png)

#### 服务端代码

1. 鼠标点击项目根目录，依次执行

    ![创建开发环境](/image/部署云函数.png)

2. 在uniCloud开发者平台上新建一个云服务空间

    [云服务空间](https://unicloud.dcloud.net.cn/)

    ![新建云服务空间](/image/新建云服务空间.png)

3. 根据提示选择自己需要的服务空间

    ![云服务空间新购](/image/服务空间新购.png)

4. 创建完成后，返回HBuilderX 此时就可以开始进行关联

5. 然后右键点击uniCloud目录，选择刚开始创建的云服务空间

    ![创建云服务空间](/image/云服务空间.png)

6. 在cloudfunctions目录右击，新建云函数/云对象，命名为uni-push，会创建一个uni-push目录

    ![创建云函数](/image/选择模版.png)

7. 右击uni-push目录，点击 管理公共模块或扩展库依赖，选择uni-cloud-push

    ![选择扩展库](/image/选择推送服务.png)

8. 右击database目录，新建DB Schema，创建这三张表:`opendb-tempdata`,`opendb-device`,`uni-id-device`，也就是json文件，直接输入并选择相应的模板。

    ![选择DB](/image/dbschema-opendb.png)

    选择 `uni-id-device`
    ![选择uni-id-device](/image/dbschema-uni-id.png)

9. 创建好表之后, 修改之前创建的uni-push的云函数：

    - 修改index.js

    ```javascript
    'use strict';
    const uniPush = uniCloud.getPushManager({appId:"__UNI__XXXX"}) //注意这里需要传入你的应用appId
    exports.main = async (event, context) => {
      console.log('event ===> ', event)
      console.log('context ===> ', context)
      // 所有要传的参数，都在业务服务器调用此接口时传入
      const data = JSON.parse(event.body || '{}')
      console.log('params ===> ', data)
      return await uniPush.sendMessage(data)
    };
    ```

    - 修改package.json

    ```json
    {
      "name": "uni-push",
      "dependencies": {},
      "main": "index.js",
      "extensions": {
        "uni-cloud-push": {}
      }
    }
    ```

    [uniCloud sendMessage方法及参数](https://doc.dcloud.net.cn/uniCloud/uni-cloud-push/api.html)

10. 右键点击 uni-push 目录 点击上传部署， 部署完成后就可以在线调用

    ::: tip
      在客户端调用云函数
      在开发具体项目中，通过`uniCloud.callFunction`进行调用，unicloud是uniapp中调用云函数方法，其中name为云函数名称注意：这个是必填项！，data为传输参数编码base64编码，success为结果，跟axios请求方法类似，简洁明了

      ```javascript
      uniCloud.callFunction({
          name:'uni-push',
          data:{
            // 需要传给云函数的参数
          },
          /* 成功回调 */
          success:res=>{
            console.log(res)
          }
      })
      ```

    :::

11. 如果想在外部调用， 可以将云函数url化， 登入云函数控制台, 点击进入服务空间详情后 进行操作

    [云函数控制台](https://unicloud.dcloud.net.cn/)

    ![云函数](/image/云函数详情.png)

    - 点击云函数详情， 进入详情界面

    路径可以自己定义，需要符合设置规则

    ![云函数url化](/image/云函数url化.png)

12. postman测试一下接口

    ![postman测试接口](/image/postman测试接口.png)

    - 没问题的话，客户端将会打印`“console.log("收到推送消息：", xxx)”`，这一步最好是使用真机，运行到App基座，使用自定义调试基座运行，会在HBuilderX控制台打印。

::: warning
 云函数调用`uniPush.sendMessageAPI`时, 有cids参数来设置推送给目标用户， 如果不传该参数， 则会向所有用户推送消息，并且十分钟内消息内容不可重复， 否则会报错

 ![报错信息](/image/postman报错信息.png)
:::

### 离线推送

- APP离线时，客户端收到通知会自动在通知栏创建消息，实现离线推送需要配置厂商参数。

苹果需要专用的推送证书， 参考证书链接

[ios证书链接](https://blog.csdn.net/xinTianou123/article/details/128186017)

![ios推送](/image/ios配置推送.png)

- 安卓需要在各厂商开发者后台获取参数

[厂商推送配置链接参考](https://docs.getui.com/getui/mobile/vendor/vendor_open/)

<font color="red">注意: 安卓需要退出app后，在任务管理器彻底清除进程，才会走离线推送</font>

#### 离线推送角标问题

- android、iOS设置角标:

[plus设置角标数量](https://www.html5plus.org/doc/zh_cn/runtime.html?from_wecom=1#plus.runtime.setBadgeNumber)

- 鸿蒙（(HarmonyOS Next)）设置角标：

 `uni.setAppBadgeNumber(n: number)`

[云函数api](https://uniapp.dcloud.net.cn/uniCloud/uni-cloud-push/api.html#uni-cloud-push)

#### 厂商推送限制

各大厂商推送是有限制的， 消息也会分为不同的消息类型;

通常将消息分为重要等级和普通等级，且不同厂商对消息分类的名称各有不同，比如重要消息一般分类为：重要、系统、私信、服务与通讯类，普通消息一般分类为：普通、运营、公信、营销资讯类。

APP开发者可根据自身应用的通知场景，将消息分为重要和普通消息两大类，以实现不同级别的消息推送。

[厂商推送限额说明](https://docs.getui.com/getui/mobile/vendor/qps/)
