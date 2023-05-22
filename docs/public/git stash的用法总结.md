# git stash

## `git stash` 命令的作用是将更改存储在一个临时区域中，使得该工作目录变成一个干净的工作状态， 从而可以去执行其他操作

### `git stash` 常用使用场景

- 正在进行一些工作，但需要在不更改当前分支或提交任何更改的情况下切换到另一个分支或者进行其他操作。
- 想要推送某个分支但又不想包含当前所有的更改，而只想把某些更改推送到远程仓库
- 想要在多个分支之间进行代码重构或实验性开发时，但又不想创建新的分支来存储每个实验性更改，可以使用 `git stash` 保存当前的更改，然后在不同的分支之间应用更改。

### 常用的 `git stash`命令

#### 1. `git stash`

直接保存其实是执行了命令 `git stash save "保存时的描述"`命令 只是要保存的描述为空。 执行存储时，添加备注，方便查找，只有 `git stash` 也要可以的，但查找时不方便识别。

#### 2. `git stash list`

`git stash list` 用于查看执行stash操作的存储列表, 列表格式类似于下面这种格式：

```shell
$ git stash list
stash@{0}: WIP on master: e695606 which version checked in?
```

#### 3. `git stash show`

显示做了哪些改动，默认show第一个存储,如果要显示其他存贮，后面加 `stash@{$num}`，比如查看第二个stash详情： `git stash show stash@{1}`

#### 4. `git stash show -p`

显示第一个存储的改动，如果想显示其他存存储，命令：`git stash show  stash@{$num}  -p` ，比如第二个：`git stash show  stash@{1}  -p`

#### 5.`git stash apply`

应用某个存储,但不会把存储从存储列表中删除，默认使用第一个存储,即 `stash@{0}`，如果要使用其他个，`git stash apply stash@{$num}`， 比如第二个：`git stash apply stash@{1}`

#### 6. `git stash pop`

命令恢复之前缓存的工作目录，将缓存堆栈中的对应 `stash`删除，并将对应修改应用到当前的工作目录下,默认为第一个 `stash`,即 `stash@{0}`，如果要应用并删除其他 `stash`，命令：`git stash pop stash@{$num}` ，比如应用并删除第二个：`git stash pop stash@{1}`

#### 7. `git stash drop  stash@{$num}`

丢弃stash@{$num}存储，从列表中删除这个存储

#### 8. `git stash clear`

删除所有缓存的stash

> 注意：说明:新增的文件，直接执行stash是不会被存储的
>
> ![git stash 不保存新建文件](git-stash-1.jpg "git stash 不保存新文件")

这个文件还在，说明没有被存起来。说白了就是没有在git 版本控制中的文件，是不能被 `git stash`存起来的。

那要怎么办呢，这个文件我也想存起来，很明显，先执行下 `git add` 加到git版本控制中，然后再 `git stash`就可以了，如下：

![1684753035449](image/gitstash的用法总结/1684753035449.png)
