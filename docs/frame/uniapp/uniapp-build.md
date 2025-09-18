# uni-app 打包流程

### 背景

在当前移动应用开发的大环境下，`uni-app` 作为一种使用 ***Vue.js*** 开发多平台应用的框架，为开发者提供了快速构建跨平台应用的能力。

### 准备环境

NodeJs： [NodeJS官网](https://nodejs.org/en)
HBuilderX： [HBuilderX官网](https://www.dcloud.io/hbuilderx.html)
JDK(Java Development Kit): [JDK下载地址](https://www.oracle.com/java/technologies/downloads/)

:::warning
**如果想要实现本地版离线打包， 还需要安装安卓的环境：**

离线打包需要安装以下工具：

Android Studio 下载地址： [Android Studio官网](https://developer.android.google.cn/studio?hl=zh-cn)

App离线SDK下载：[最新平台安卓离线版SDK](https://nativesupport.dcloud.net.cn/AppDocs/download/android.html)

> **非特殊情况下，非专业的安卓开发人员，真的不建议使用离线打包。 不建议离线打包**
:::

### 创建应用

1. 在 HBuilderX 中新建新的uni-app项目或打开已有的项目
2. 输入项目的名称和存放路径，并选择合适的模版
3. 点击“创建”来生成项目文件

![HbuilderX创建项目](/image/uni-app新建项目.png)

### 生成签名证书

生成 Android 平台签名证书（.keystore）是用于对应用进行数字签名以确保应用的安全性和完整性。下面是一个简单的 Android 平台签名证书生成指南：

#### 步骤一： 安装SDK(Java Development Kit)

1. 访问 Oracle 网站， 并下载适合自己的操作系统的JDK安装程序
2. 执行安装程序， 并按照提示进行安装

#### 步骤二: 打开终端或命令提示符

1. Windows上 按下`win`+ `R` 输入 `cmd`, 然后回车键打开命令提示符
2. Mac上， 打开'应用程序'> '实用工具' > '终端' 或者其他安装的终端软件(例如`iTerm2`)

#### 步骤三：导航到 JDK的bin目录

在终端或命令提示符中，使用以下命令导航到你安装的 JDK 的 bin 目录。根据你的 JDK 版本和安装路径可能有所不同，以下命令仅供参考。

```bash
# JDK文件名要看安装的JDK版本
cd C:\Program Files\Java\jdk1.8.0_221\bin  // Windows示例路径
cd /Library/Java/JavaVirtualMachines/jdk1.8.0_221.jdk/Contents/Home/bin  // Mac示例路径
```

#### 步骤四：生成签名证书

在终端或命令提示符中，使用以下命令生成签名证书（.keystore 文件）。根据你的需求和项目要求，可以根据需要修改命令中的参数。

```bash
keytool -genkey -v -keystore my-release-key.keystore -alias my-release-key -keyalg RSA -keysize 2048 -validity 10000

```

- `keytool`： Java 自带的工具，用于管理密钥和证书。

-  `-genkey`： 表示生成一个新的密钥对。

- `-v`： 表示启用详细模式（verbose），会输出更多的详细信息。

-  `-keystore my-release-key.keystore`
  - 指定生成的密钥库文件名为 my-release-key.keystore。 可以自行修改
  -  这是一个存储私钥和公钥的文件。

-  `-alias my-release-key`： 为密钥对指定一个别名，方便之后引用。

-  `-keyalg RSA`：指定密钥的算法为 RSA（加密算法的一种）。

-  `-keysize 2048`： 指定密钥的长度为 2048 位（确保足够的安全性）。

-  `-validity 10000`： 指定证书的有效期为 10,000 天（约 27 年）。

#### 步骤五：按照提示填写证书信息

生成签名证书的命令会提示你填写一些证书信息，如证书拥有者的姓名、组织单位名称、城市、州/省、国家等。根据实际情况填写这些信息。

##### 设置密钥库口令

1. 密钥裤口令用于下一次命令行访问密钥是输入的口令

    ![密钥库口令](/image/创建密钥.png)

2. 输入密钥口令后，点击回车，会依次出现诸如姓名、公司、组织等问题，按要求填写即可

    ![密钥信息填写](/image/密钥信息填写.png)

3. 信息确认无误后，输入`y`确认并回车 之后会自动在当前文件的路径下(即jdk文件下的 `/Contents/Home/bin`)生成我们需要的签名证书; 应用打包时需要手动上传一份证书，建议复制一份到常用文件夹中

#### 步骤六：设置密码

生成签名证书时，需要设置一个密码以保护证书的安全性。请记住这个密码，它将用于以后对应用进行签名和更新。

#### 步骤七：妥善保存证书文件

确认生成的签名证书 生成签名证书后，会在当前目录下生成一个名为 my-release-key.keystore 的文件。请确保将这个文件妥善保存，并备份好。

生成签名证书后，你就可以使用它对你的 Android 应用进行签名了。在打包应用时，通过引用签名证书，可以验证应用的身份和完整性。

> 请注意，签名证书是非常重要的，请妥善保管好它，并谨慎分享证书文件和相关密码，以免引发安全问题。

### 配置应用

#### 配置应用基础信息

在基础配置页签， 填写应用名称、应用描述、应用版本以及应用版本号等基本信息

![UniApp基础配置](/image/uniapp基础配置.png)

> 说明：
>
> 应用版本名称为一个字符串，例如：1.0.0，通常代表同一个应用不同的版本名称；
>
> 应用版本号是一个 number 类型的数字，通常从 1 开始依次累加，从根本上用来区别不同版本，主要用来版本更新覆盖等。

#### 配置应用图标

主要是用来配置应用在桌面上的图标显示， 这里需要配置不同分辨率的图标，主要是为了在不同屏幕分辨率的手机下避免失真效果

![uni-app图标配置](/image/uniapp图标配置.png)

> **小技巧**
>
> 这里可以让 UI同学 出一张大分辨率尺寸的图片，利用 HBuilderX 工具一键生成所需要的各种不同分辨率的图片，如上图所示，自动生成图标功能，方便快捷。

#### 配置应用模块

应用模块主要会涉及到一些真机的能力，比如：使用照相机、蓝牙、相册、定位等功能，也可以配置一些 uniapp 已经支持的第三方插件配置，比如：第三方地图（高德、百度等）、第三方分享、友盟统计等。如下图所示进行按需选择。

![uniapp应用模块配置](/image/uniapp应用模块配置.png)

目前在 uni-app 中所涉及的 Android 模块配置模块及三方 SDK 主要有以下几个，均可以在 HBuilderX 中进行选择配置

- Geolocation (定位)
- Push (消息推送)
- Share (分享)
- Oauth (登录鉴权)
- Map (地图)
- Payment (支付)
- Speech (语音输入)
- Statistic (统计)
- FacialRecognitionVerify (实人认证)
- uni-AD
- Android X5 Webview (腾讯 TBS)

:::warning
不过需要注意的是，如果没有使用某一些模块功能，请不要勾选，因为你每选择一个模块，将会增大你的应用体积。切记要按需选择。
:::

#### 配置应用权限

在 App 权限一栏中，根据应用的需求，勾选对应的权限，通常有一些所必要的权限，下面我进行列举，其他的按照应用内所设计的权限进行添加即可。

1. `<uses-feature android:name="android.hardware.camera"/>`
  
    指定了应用需要使用相机功能。用于在应用中拍摄照片、录制视频或进行其他与相机相关的操作。

2. `<uses-feature android:name="android.hardware.camera.autofocus"/>`

    指定了应用需要使用相机的自动对焦功能。用于在应用中实现相机对焦功能，以确保拍摄的照片或视频清晰。

3. `<uses-permission:name="android.permission.CAMERA"/>`

    允许应用访问设备的相机。用于应用在运行时获取相机的访问权限，可以进行拍摄、录制等操作。

4. `<uses-permission android:name="android.permission.FLASHLIGHT"/>`

    允许应用控制设备的闪光灯。用于应用在需要时打开和关闭设备的闪光灯。

5. `<uses-permission android:name="android.permission.INTERNET"/>`

    允许应用访问互联网。用于应用在需要联网的功能中实现数据的传输和获取。

6. `<uses-permission android:name="android.permission.MOUNT_UNMOUNT_FILESYSTEMS"/>`

    允许应用挂载和卸载文件系统。用于应用在需要读取和写入外部存储设备（如 SD 卡）时进行相关操作。

7. `<uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE"/>`

    允许应用向外部存储设备写入数据。用于应用在需要保存文件到外部存储设备时进行相关操作。

8. `<uses-permission android:name="android.permission.WRITE_SETTINGS"/>`

    允许应用修改系统设置。用于应用在需要修改设备设置（如音量、显示亮度等）时进行相关操作。

这些权限在安卓应用开发中常见且常用，根据应用的实际需求，可以在清单文件（manifest.json）中声明和使用这些权限。确保应用以正确、安全的方式使用这些功能和资源，例如相机、闪光灯、互联网访问、外部存储等。

请注意，在 Android 6.0（API 级别 23）及以上版本，部分权限属于危险权限（Dangerous Permissions）。
用户在安装应用时需要授予这些权限，否则应用将无法正常使用对应的功能。在使用这些权限时，应遵循 Android 官方的权限管理原则。

### 真机调试

在打包引用之前，我们首先要经过真机测试，保证所要打包的代码在真机环境下运行没有问题，才可以启动打包程序，可以采用以下步骤进行连接安卓手机进行真机调试

1. 首先通过 USB 连接安卓手机，并打开开发者选项，允许 USB 调试开关打开
2. 选择运行到 Android App 基座即可选择你在上一步连接电脑的安卓手机，确认运行就可以了

> 说明：如果在这个地方检测不到你的真机设备，说明手机和电脑通过 USB 未真正连接成功，
>
>通常的解决方案是下载一个 360 手机助手、豌豆荚、应用宝等第三方应用，这些应用会安装一些必备的驱动，从侧面解决你的连接调试问题。

![运行到基座](/image/运行到基座.png)

真机调试主要是测试你的代码运行情况，避免频繁使用云打包带来的延时、效率低下的问题。避免编写一行代码几秒钟，打包一次 5 分钟的尴尬境地，大幅度的降低了开发效率。

**真机运行常见问题**

[HbuildX真机运行常见问题](https://uniapp.dcloud.net.cn/tutorial/run/run-app-faq.html)

在平常开发时， 我们也可以使用上面安装的`Android Studio`软件作为模拟设备进行调试

在`Android Studio`上打开项目， 选择手机模拟器， 这样当运行到Android基座时， HBuilderX会检测到`Android Studio`的基座 之后可以进行实时同步调试

[HBuilderX模拟器安装指南](https://uniapp.dcloud.net.cn/tutorial/run/installSimulator.html#android)

### 云打包

#### 1. 发行

打开 HBuilderX 的工具栏点击工具栏参数界面的 **“发行”** 按钮，可以看到有如下的菜单提供选择，下面分别对 App 发行的选项进行说明：

![云打包选项](/image/uniapp云打包选项.png)

##### 原生 App - 云打包

这个功能是我们接下来要使用的重点功能，主要用来打包 App 的配置项，包括 Android 配置和 iOS 配置，接下来会进行详细的说明

##### 原生 App - 查看云打包状态

很简单，这个功能主要是用来发布云打包请求之后，查看目前所请求的云打包状态，是否打包成功，如下图展示

![云打包状态](/image/云打包状态.png)

##### 原生 App - 本地打包

这个功能主要是生成本地打包 App 资源，然后配合 Android Studio 进行离线打包。

![本地打包](/image/本地打包.png)

运行该指令，主要会将你的项目生成 一个 **www** 的文件夹，这是 App 离线 资源，主要包含以下内容。

![www文件夹](/image/www文件夹.png)

这种方式，如果想要深入了解的话，请参考以下链接：

[App 离线打包](https://nativesupport.dcloud.net.cn/AppDocs/usesdk/android.html)

##### 原生 App - 制作应用 wgt 包

这个功能其实很有用，其主要生成 H5 的资源包，主要用于应用热更新，解决频繁的整包更新。如果你的应用使用了热更新方案，那么这个你将会时常用到。

#### 2. 云打包

点击 `“原生 App - 云打包”` 按钮，HBuilderX 将打开打包配置界面，主要填写好下面几个参数，即可实现云打包。主要填写的相关信息如下：

- Android 包名
- 证书的相关信息（上文中我们已经生成了相关证书）
  - 证书文件
  - 证书别名
  - 证书密码
- 选择传统打包或快速安心打包
  - 主要区别在于是否上传证书及代码

![云打包状态](/image/云打包页面.png)

### 总结一些坑

#### 上线 Google Play 应用市场

1. 确保将 HBulider X 升级到 **3.2.15+**版本，否则 App 将会出现问题
2. App 提交云端打包时请勾选“**GooglePlay(AAB)**”渠道，生成`.aab` 格式的应用
3. 不能直接下载 `apk` 方式安装应用，需引导用户到 **Google Play** 安装
4. 不能存在动态加载代码行为
5. “App 常用其它设置”中需要将 `targetSdkVersion` 设置值大于等于 **30**
6. 务必在 **Android11** 设备上进行测试，确保应用所有功能可以正常运行
7. 不能包含安装应用权限，在 App 权限配置中不要勾选 `android.permission.INSTALL_PACKAGES`、`android.permission.REQUEST_INSTALL_PACKAGES` 权限

#### 应用市场隐私审核不通过

目前不管是上架任何的应用市场，在首次安装应用或更新高版本的应用时，必须首要弹出应用隐私弹窗，用户进行阅读和同意，其次会检测应用获取的隐私条目和隐私政策是否匹配，不匹配也会被拒绝

#### 不要频繁的使用云打包

DCloud 官方为了节流，做了一些打包次数的限制，官方说明：打包不是为了测试应用，而是为了发布应用。所以频繁的打包超出一定限制后，当天会禁止你再次打包。

为了解决这个问题，你可以“制作自定义调试基座”，然后运行到手机，使用自定义基座运行调试，如下图所示：

![制作自定义基座](/image/制作自定义基座.png)

- 搜索自定义基座

![选择自定义基座](/image/搜索自定义基座.png)

## 引用

[超详细uni-app打包流程](https://juejin.cn/post/7296317316206411787)
