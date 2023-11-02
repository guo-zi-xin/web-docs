# git rebase 合并commit

## 使用背景

一个repo通常是由一个team中的多个人共同维护，如果需要增加新feature，那么就是一个feature分支了。由于开发中各种修改，本feature分支多次commit。最后提交master后，会看到乱七八糟的所有增量修改历史。其实对别人来说，我们的改动应该就是增加或者删除，给别人看开发过程的增量反而太乱。于是我们可以将feature分支的提交合并后然后再merge到主干这样看起来就清爽多了。

### rebase 简介

  `git rebase`是Git中用于将一个分支的提交应用到另一个分支上的命令。它主要作用是将一个分支上的修改“衍合”(rebase) 到另一个分支上， 使得目标分支上的提交历史变得整洁和线性。

  ::: danger
  ⚠️ 不要通过rebase对任何已经提交到公共仓库中的commit进行修改（个人分支除外）
  :::

### 操作步骤

  假设我们做了一下三个commit，想把前两个提交也就是 `commit 7131a52`和 `commit 0d11e74`合并到`commit a2406db`中， 合并成一个提交:

  ![log信息](/image/log信息.png)

  ::: tip
  如果使用 `git log`可以按下`s`向下翻看`log`

  `git log   --oneline` 可以一行展现
  :::

  我们使用命令：

  ```shell
  git rebase -i  [startpoint] [endpoint]
  ```

  其中 `-i`的意思是 `--interractive`, 即弹出交互式页面让用户编辑完成合并操作；

  `[startpoint]`和 `[endpoint]`则指定了一个编辑的区间， `[endpoint]`是可选的， 如果不指定，则该区间默认终点是当前分支HEAD所指向的commit(注：该区间指定的是一个前开后闭的区间), 针对与我们之前创建的提交, 具体执行以下命令:

  ```shell
  git rebase -i 77663d6
  ```
  
  或者

  ```shell
  git rebase -i HEAD~3 
  ```
  
  执行完命令后， 我们可以看到终端变成如下界面：
  
  ![rebase操作](/image/rebase操作.png)

  其中， commands表示了可以进行的指令的类型：

- `p`: 即为 `pick`， 表示保留这一个commitID
- `r`: 即为 `reword`, 表示保留着一个commitID， 但是需要修改commit的注释
- `e`: 即为 `edit`, 表示保留这一个commitID， 但是要停止rebase操作来进行这次提交的修改(即修改变更的代码与commit与注释)
- `s`: 即为 `squash`, 表示将这个commitID与前一个commitID合并
- `f`: 即为 `fixup`, 表示将这个commitID与前一个commitID合并， 但是不保留该提交的注释信息
- `x`: 即为 `exec`, 表示执行shell命令
- `d`: 即为 `drop`, 表示丢弃这条commitID

  根据我们的需求， 我们需要讲第二三次提交合并到第一次提交上去， 最终只形成一个提交

  ::: info 提交信息
    > pick a2406db feat(test):第一次提交  \
    > s 0d11e74 feat(test):第二次提交  \
    > s 7131a52 feat(test):第三次提交
  :::
  编辑后 输入wq保存退出， 会得到如下页面：
  ![rebase squash](/image/rebase合并操作界面.png)

  在这里，我们需要进入编辑状态， 删掉或者注释掉第二次提交和第三次提交的信息， 这样最终只留下了第一次提交, 输入wq命令保存

  ![rebase squash](/image/rebase最终提交.png)

  通过`git log`查看一下最终的提交信息：

  ![git log提交信息](/image/rebase的log信息.png)

  可以看到， 现在只留下第一次提交的信息了, 之后就可以正常合并到主分支上了.
