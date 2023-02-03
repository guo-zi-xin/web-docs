# @Github: https://github.com/guo-zi-xin
# @Author: guozixin
# @Created_time: 2023-02-02 11:12:00
# LastEditors  : guozixin
# LastEditTime : 2023-02-02 11:12:00
# @Description: 部署

#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -env

# 下载yarn
# npm install yarn

# 生成静态文件
# yarn build
num run build

# 进入生成的静态文件夹dist
cd docs/.vuepress/dist

# 如果是发布到自定义域名
# echo ‘www.example.com’ > CNAME

git init 

git add -add

git commit -m 'deploy'

git push -f git@github.com:guo-zi-xin/docs.git master:gh-pages

cd -