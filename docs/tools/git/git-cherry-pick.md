# git cherry-pick 使用

## 定义

cherry-pick: 翻译为筛选，是git版本控制系统中很重要的一个命令， 它允许你将任意分支上的某个或者某些特定提交(`commit hash`标识)的更改应用于当前所在分支，而不是进行完整分支的合并。执行
`cherry-pick`后， git 会在目标提交的更改在当前分支上重新创建一个新的提交，保持了原有提交的
内容，但生成了新的提交ID

```bash
git cherry-pick <commit-hash>  # commit hash 为提交的具体节点， 比如 61ab26
```

:::info 注意
使用 `git cherry-pick`需要注意： 需要保证工作区是干净的(没有对HEAD提交的修改)

当不清楚如何应用更改时，会发生以下情况：

1. 当前的分支和 `HEAD` 指针保持在最后一次成功提交的位置。

2. `CHERRY_PICK_HEAD` 引用被设置为 指向难以应用的修改的提交。

3. 在索引文件和工作区中， 更改应用得很干净的路径都会被更新。

4. 对于冲突的路径，索引文件最多记录三个版本，如gitmerge[1]的“TRUE MERGE”部分所述。工作树文件将包括一个冲突的描述，该描述被通常的冲突标记使用 `<<<<<<<`和 `>>>>>>>`括起来。

5. 不做其他修改。
:::

## 使用场景

- **跨分支移植补丁**

假设在开发分支上修复了一个bug， 但尚未准备好合并整个分支。这时， 可以使用`git cherry-pick <commit hash>`来将该修复提交应用到生产分支，快速解决线上问题。

- **提取特定功能**

在 分支A 上开发了一个新功能， 但由于计划安排暂时不能将其合并到主分支，若另一个 分支B 需要临时拥有这个功能， 可以通过`git cherry-pick` 将该功能转移到 分支B

- **解决冲突**

当多个开发者在不同分支上工作时， 可能在不同的上下文中解决了相同的问题。通过`git cherry-pick`， 可以将一个开发者修复的解决方案单独应用到其他分支，而无需进行复杂的合并操作。

- **同步独立更改**

即使在不同的开发路径上，也可能存在独立的、可以通用的代码的更改。 使用`git cherry-pick`， 可以迅速将这些有价值的更改推广到其他相关分支

##### 示例

**假设是master分支某个提交应用到develop分支上**

- 1. 确保已经切换到了想要应用补丁的目标分支

  ```bash
  git checkout develop

  Switched to branch 'develop'
  ```

- 2. 获取想要一只的提交哈希(`commit hash`) 这可以通过查看历史提交记录找到,
通过在命令行中使用`git log` 历史提交信息 或者简要查看历史提交信息
`git log --oneline`, 找出包含所需补丁的提交：

```bash
git log --graph --oneline # 查询提交信息

# 查询的结果示例
041cd2b feat: git cherry-pick用法更新
0cbf613 feat: 更新watch和watchEffect的区别
e360bfd fix: 修正文案错误
5772f85 config: 更新vitepress依赖版本
9f1aa0d feat 更新this指向相关
```

- 3. 执行 `git cherry-pick`命令，后面跟上你想要移植的提交哈希

```bash
git cherry-pick 041cd2b

# 之后合并冲突
Auto-merging src/App.vue

# 合并冲突后结果
[develop 55b234d] git cherry-pick用法更新
 Date: Fri Mar 8 23:46:22 2024 +0800
 1 file changed, 1 insertion(+), 1 deletion(-)
```

- 4. git 会尝试将指提交所做的所有更改应用到当前分支。 如果没有冲突， git 会自动创建一个新的提交，这个提交包含了与原始提交相同的更改，单据有新的提交哈希

```bash
# 应用develop分支前的日志如下
git log --graph --oneline
*   c8b94bb (HEAD -> develop, origin/develop) git cherry-pick用法更新
|\
| * 0cbf613 feat: 更新watch和watchEffect的区别
* | e360bfd fix: 修正文案错误
|/
 ...
 
#应用develop分支后的日志如下：
git log --graph --oneline
* 55b234d (HEAD -> develop) 更新watch和watchEffect的区别
*   c8b94bb (origin/develop) git cherry-pick用法更新
|\
| * 0cbf613 feat: 更新watch和watchEffect的区别
* | e360bfd fix: 修正文案错误
|/
...
```

- 5. 如果在应用更改时出现冲突， git会暂停`cherry-pick`的动作，并提示解决冲突

```bash
git cherry-pick 041cd2b
Auto-merging src/App.tsx
CONFLICT (content): Merge conflict in src/App.vue
error: could not apply e360bfd... 修正文案错误
hint: After resolving the conflicts, mark them with
hint: "git add/rm <pathspec>", then run
hint: "git cherry-pick --continue".
hint: You can instead skip this commit with "git cherry-pick --skip".
hint: To abort and get back to the state before "git cherry-pick",
hint: run "git cherry-pick --abort".

```

打开冲突文件， 手动编辑以解决冲突， 保存修改后， 执行

```bash
git add <conflicted-file>

```

对所有冲突文件重复上述操作。 **但是不要进行任何`commit`操作,或者会结束后续的`cherry-pick`过程， 如果进行`commit`操作，则提交内容直接应用到当前分支了**

- 6. 解决完所有冲突后， 继续完成`cherry-pick过程

```bash
git cherry-pick continue
```

- 7. 如果在解决冲突后决定不再应用次补丁， 可以取消`cherry-pick`操作

```bash
git cherry-pick --abort
```
