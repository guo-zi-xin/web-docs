#!/usr/bin/env sh

# @Github: https://github.com/guo-zi-xin
# @Author: guozixin
# @Created_time: 2023-02-02 11:12:00
# LastEditors  : guozixin
# LastEditTime : 2023-02-02 11:12:00
# @Description: 部署


# 确保脚本抛出遇到的错误
set -e

# 生成静态文件
yarn build

# 进入生成的静态文件夹dist
cd docs/.vuepress/dist

git init 

git add -A

git commit -m 'deploy'

git push -f git@github.com:guo-zi-xin/docs.git master:gh-pages

cd -