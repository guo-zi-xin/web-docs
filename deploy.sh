# @Github: https://github.com/guo-zi-xin
# @Author: guozixin
# @Created_time: 2023-02-02 11:12:00
# LastEditors  : guozixin
# LastEditTime : 2023-02-02 11:12:00
# @Description: 部署

!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -env

# 下载yarn
echo "npm install yarn ..."
npm install yarn

# 生成静态文件
echo "yarn build ..."
yarn build

# 进入生成的静态文件夹dist
cd docs/.vuepress/dist

# 如果是发布到自定义域名

# echo ‘www.example.com’ > CNAME

git init 

git add -add

git commit -m 'deploy'

# 如果有发布到https://<USERNAME>.github.io  USERNAME 是你的用户名
# git push -f git@github.com:guo-zi-xin/guo-zi-xin.github.io.git.master

# 如果发布到 https://<USERNAME>.github.io/<REPO>  REPO=github上的项目
git push -f git@github.com:guo-zi-xin/docs.git master:master

cd -

echo '根目录'

ls

git add .

git commit -m $1

echo 'commit2'

git push origin master:master # 推到github上

echo '大功告成'