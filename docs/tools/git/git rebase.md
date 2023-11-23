# git rebase

### git rebase能够将分叉的分支重新合并，下面主要介绍它的两个使用场景

#### 场景一：本地与远端同一分支提交历史不一致

> 方式一

多个人在同一个分支上协作时，出现冲突是很正常的，比如现在有一个项目由我和A一同开发。

我在修复了一个bug以后准备提交

```shell
HowiedeiMac:ganlin howie$ git add models/paper.go
HowiedeiMac:ganlin howie$ git commit -m 'fix a bug'
[master 8b76654] fix a bug
 1 file changed, 3 insertions(+), 3 deletions(-)

```

现在准备推送到远端

```shell
HowiedeiMac:ganlin howie$ git push origin master
To https://gitee.com/greenhn/ganlin.git
 ! [rejected]        master -> master (fetch first)
error: failed to push some refs to 'https://gitee.com/greenhn/ganlin.git'
hint: Updates were rejected because the remote contains work that you do
hint: not have locally. This is usually caused by another repository pushing
hint: to the same ref. You may want to first integrate the remote changes
hint: (e.g., 'git pull ...') before pushing again.
hint: See the 'Note about fast-forwards' in 'git push --help' for details.

```

push失败了，说明A在我之前已经提交了，我本地master分支的提交历史已经落后远端了，需要先pull一下，与远端同步后才能push

```shell
HowiedeiMac:ganlin howie$ git pull
remote: Enumerating objects: 14, done.
remote: Counting objects: 100% (14/14), done.
remote: Compressing objects: 100% (8/8), done.
remote: Total 8 (delta 6), reused 0 (delta 0)
Unpacking objects: 100% (8/8), done.
From https://gitee.com/greenhn/ganlin
   a1bc60a..b91f711  master     -> origin/master
Merge made by the 'recursive' strategy.
 controllers/deal_local_data.go | 14 +++++++++++---
 controllers/rtu_interface.go   |  8 ++++----
 models/instrument_type.go      |  3 +++
 models/rtu_interface.go        |  3 +++
 4 files changed, 21 insertions(+), 7 deletions(-)

```

pull成功，现在使用git log看下一提交历史：

```shell
HowiedeiMac:ganlin howie$ git log --oneline --graph
*   f63ecbf (HEAD -> master) Merge branch 'master' of https://gitee.com/greenhn/ganlin
|\  
| * b91f711 (origin/master, origin/HEAD) 修正bug，优化内置通道配置
* | 8b76654 fix a bug
|/  
* a1bc60a 完善日报接口
* 9f73b5e 增加内置通道设置功能
* a0d464e ...

```

竟然分叉了！由于我本地master的提交历史和远端的master分支的提交历史不一致，所以git为我进行了自动合并，然后生成了一个新的提交历史（`f63ecbf Merge branch 'master' of`）

对于部分强迫症来说这个不能接受的，不想看到分叉。

这个时候用`git rebase`就可以解决

```shell
HowiedeiMac:ganlin howie$ git rebase
First, rewinding head to replay your work on top of it...
Applying: fix a bug

```

现在再查看一下提交历史：

```shell
HowiedeiMac:ganlin howie$ git log --oneline --graph
* 2e2b995 (HEAD -> master) fix a bug
* b91f711 (origin/master, origin/HEAD) 修正bug，优化内置通道配置
* a1bc60a 完善日报接口
* 9f73b5e 增加内置通道设置功能
* a0d464e ...

```

完美解决，现在再push推送到远端：

```shell
HowiedeiMac:ganlin howie$ git push origin master
Enumerating objects: 7, done.
Counting objects: 100% (7/7), done.
Delta compression using up to 4 threads
Compressing objects: 100% (4/4), done.
Writing objects: 100% (4/4), 394 bytes | 394.00 KiB/s, done.
Total 4 (delta 3), reused 0 (delta 0)
remote: Powered By Gitee.com
To https://gitee.com/greenhn/ganlin.git
   b91f711..2e2b995  master -> master

```

再次查看提交历史

```shell
HowiedeiMac:ganlin howie$ git lg --oneline --graph
* 2e2b995 (HEAD -> master, origin/master, origin/HEAD) fix a bug
* b91f711 修正bug，优化内置通道配置
* a1bc60a 完善日报接口
* 9f73b5e 增加内置通道设置功能
* a0d464e ...

```

现在远端master，远端head，本地master全部统一，问题解决。

> 方式二

直接执行：
`git pull --rebase`
效果与上面是一致的，也是最近才发现，推荐使用

#### 场景二：不同分支之间的合并

由于老板突发奇想，要求开发一个新的功能。

先创建一个分支用于开发新功能：

`git checkout -b feature`

```shell
HowiedeiMac:hello howie$ git checkout -b feature
Switched to a new branch 'feature'
HowiedeiMac:hello howie$ git branch
* feature
  master

```

接下来修改newFunc.go，增加新的功能,并且保存提交

`vim newFunc.go`

`git add newFunc.go`

`git commit -m 'add new func'`

现在查看一下提交

```shell
HowiedeiMac:hello howie$ git log --oneline --graph
* 4f58ab8 (HEAD -> feature) add new func
* 94c134b (master) init base

HowiedeiMac:hello howie$ git branch
* feature
  master

```

现在新功能开发完毕，需要将它合并的主分支中。

> 先尝试通过merge合并：

首先切换到master分支

`git checkout master`

```shell
HowiedeiMac:hello howie$ git checkout master
Switched to branch 'master'
Your branch is up to date with 'origin/master'.

```

直接合并feature分支

`git merge feature`

```shell
HowiedeiMac:hello howie$ git merge feature
Auto-merging newFunc.go
CONFLICT (content): Merge conflict in newFunc.go
Automatic merge failed; fix conflicts and then commit the result.

```

竟然失败了，说明我两个分支之前的版本已经不同步了，需要手动合并冲突，再提交：

先查看冲突文件：`git status`

```shell
HowiedeiMac:hello howie$ git status
On branch master
Your branch is ahead of 'origin/master' by 7 commits.
  (use "git push" to publish your local commits)

You have unmerged paths.
  (fix conflicts and run "git commit")
  (use "git merge --abort" to abort the merge)

Unmerged paths:
  (use "git add <file>..." to mark resolution)

        both modified:   newFunc.go

```

打开文件，进行修改

原文件：

```shell
func NewFunc() {
    // [!code --]
    fmt.Println("add new func")  // [!code ++]
}

```

修改后：

```shell
func NewFunc() {
    fmt.Println("add new func")
}

```

现在通过add添加，然后commit提交

```shell
HowiedeiMac:hello howie$ git add newFunc.go

HowiedeiMac:hello howie$ git commit -m 'merge master and feature'
[master 562ec58] merge master and feature

```

现在在查看一下分支提交历史：

```shell
HowiedeiMac:hello howie$ git log --oneline --graph
*   562ec58 (HEAD -> master) merge master and feature
|\  
| * 4f58ab8 (feature) add new func
* | 0e80f97 do something
|/  
* 94c134b init base

```

虽然合并成功，但是Master已经保存了合并历史，出现开叉了！对于强迫症患者来说肯定是不能接受的。

> 通过rebase合并分支：

现在将版本退回到合并前,也就是回退一个版本

`git reset --hard head^`

```shell
HowiedeiMac:hello howie$ git reset --hard head^
HEAD is now at 0e80f97 do something

HowiedeiMac:hello howie$ git log --oneline --graph
* 0e80f97 (HEAD -> master) do something
* 94c134b init base

```

退回去了，现在是位于master分支的`init base`提交这里。

先切换回feature分支：

```shell
HowiedeiMac:hello howie$ git checkout feature
Switched to branch 'feature'

```

在feature分支上执行: `git rebase master`

这句命令的意识是：以master为基础，将feature分支上的修改增加到master分支上，并生成新的版本。

```shell
HowiedeiMac:hello howie$ git rebase master
First, rewinding head to replay your work on top of it...
Applying: add new func
Using index info to reconstruct a base tree...
M       newFunc.go
Falling back to patching base and 3-way merge...
Auto-merging newFunc.go
CONFLICT (content): Merge conflict in newFunc.go
error: Failed to merge in the changes.
Patch failed at 0001 add new func
hint: Use 'git am --show-current-patch' to see the failed patch

Resolve all conflicts manually, mark them as resolved with
"git add/rm <conflicted_files>", then run "git rebase --continue".
You can instead skip this commit: run "git rebase --skip".
To abort and get back to the state before "git rebase", run "git rebase --abort".

```

失败了，原因很简单，两个分支修改个同一个文件，产生了冲突。所以先需要解决冲突：

打开冲突的文件，解决冲突

原文件：

```shell
func NewFunc() {
    // [!code --]
    fmt.Println("add new func")  // [!code ++]
}

```

修改后：

```shell
func NewFunc() {
    fmt.Println("add new func")
}

```

现在通过add添加

```shell
HowiedeiMac:hello howie$ git add newFunc.go

```

现在是重点，之前的rebase其实只是完成了一半，由于出现冲突而终止，现在冲突解决，可以通过`git rebase —continue`继续完成之前的rebase操作。

```shell
HowiedeiMac:hello howie$ git rebase --continue
Applying: add new func

```

rebase完成，再查看一下提交历史：

```shell
HowiedeiMac:hello howie$ git log --oneline --graph
* b2593e6 (HEAD -> feature) add new func
* 0e80f97 (master) do something
* 94c134b init base

```

提交记录已经是一条完美的直线。现在切换到主分支master，将feather分支上的提交合并过来。

`git checkout master`

`git merge feature`

```shell
HowiedeiMac:hello howie$ git checkout master
Switched to branch 'master'
Your branch is ahead of 'origin/master' by 7 commits.
  (use "git push" to publish your local commits)

HowiedeiMac:hello howie$ git merge feature
Updating 0e80f97..b2593e6
Fast-forward
 newFunc.go | 1 +
 1 file changed, 1 insertion(+)

```

再次查看一下提交历史：

```shell
HowiedeiMac:hello howie$ git log --oneline --graph
* b2593e6 (HEAD -> master, feature) add new func
* 0e80f97 do something
* 94c134b init base

```

问题解决，master上也是一条直线了。

最后收个尾，删除掉feature分支：

```shell
HowiedeiMac:hello howie$ git branch -d feature
Deleted branch feature (was b2593e6).
```
