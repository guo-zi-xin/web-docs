#

## 背景

本地安装了git,同时github也已经申请了账号，想通过git把github上别人的代码clone到本地。

### 操作步骤

**1.在自己电脑创建本地仓库**
**第一步，** 打开git bash,找一个存放所有git项目的目录。假设git的目录叫**gitRepo**。

**第二步**，为你要拉取的github项目创建项目文件夹，在gitRepo目录下输入命令：

```shell
mkdir firstPro
```

然后输入命令：

```shell
cd firstPro
```

**2.git初始化设置、仓库的初始化以及绑定SSH秘钥**
**第一步，** 初始化git仓库。（当前git bash所在目录路径为gitRepo/firstPro）输入命令：

```shell
git init
```

此时，会看见本地电脑的目录下会有 *==.git==* 文件夹。
**第二步，** 在第一次安装git之后需要初始github的配置信息。所以接下来要初始化你的github信息。输入命令：

```shell
git config --global user.name <your github username>
```

然后再输入命令：

```shell
git config --global user.email <your github email>
```

> * 这里说明一下，尖括号里输入的是你的github账号，第二个尖括号输入的是与你github绑定的电子邮箱。

**第三步，** 现在需要将你的电脑和github账号通过SSHkey绑定。输入命令：
`cd ~/.ssh`  (如果输入命令后无法进入，则说明还没有在本地机器上绑定你自己github账户的公钥，那么就需要下边的ssh-keygen命令进行绑定)
输入命令：（`cd ~/.ssh`命令如果失效，跳过该命令）

```shell
ls
```

看ssh文件夹下有没有`id_rsa`、`id_rsa.pub` 这两个文件，如果没有那么就需要绑定ssh key。因此，需要输入命令：

```shell
ssh-keygen -t rsa -C <your github username>
```

ssh-keygen -t rsa -C "your github username"
然后一直回车就会提示rsa保存成功。这样在.ssh目录就会生成两个文件，即`id_rsa`、`id_rsa.pub`。
第四步，输入命令：

```shell
cat id_rsa.pub
```

然后复制里边的信息，在网页登录github账号，点击个人头像，进入*setting*,然后选择`ssh and GPG key`,在页面里添加`ssh key`。添加成功之后，在git里输入命令：

```shell
ssh git@github.com
```

验证是否连接成功。如果提示成功，那么就可以把自己github远程仓库的代码clone到本地了。

**3.fork别人的github项目，然后clone项目到本地**
注意：如果你想clone别人的github项目到本地，那么需要通过github先fork别人的项目到自己的github仓库中。
fork完之后，进入自己的本地的git项目仓库（firsPro）,输入命令：

```shell
git clone githubrepository,
```

githubrepository输入的是github上fork完项目之后，点击`clone or download`时，复制的那个ssh的项目地址。
这样就初始化完成， 并且可以自由fork项目了。
