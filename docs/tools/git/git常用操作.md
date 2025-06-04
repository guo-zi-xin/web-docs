# git常用操作

### 工作流程

![git工作流程](/image/git%20工作区.png)

## `git log`

```bash
# 基本日志查看
git log
# 单行简洁显示
git log --oneline
# 图形化分支历史
git log --graph --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset' --abbrev-commit
# 查看特定文件的修改历史
git log -p src/utils.js
```
