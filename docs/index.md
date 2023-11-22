---
layout: home
layoutClass: 'm-home-layout'

hero:
  name: 我的胃来食
  text: 一些问题的收录
  tagline: 不积硅步，无以至千里；不积小流，无以成江海。
  image:
    src: /image/logo.jpg
    alt: 网站的 logo 图片
  actions:
    - theme: brand
      text: 快速开始
      link: /guide/home
    - theme: alt
      text: 在 github 上查看
      link: https://github.com/guo-zi-xin/web-docs/
features:
  - icon: ⚡️
    title: 积累
    details: 积累是成功的基石，坚持是实现梦想的动力
  - icon: 🖖
    title: 尝试
    details: 勇敢尝试，收获无限可能。
  - icon: 🛠️
    title: 持续更新
    details: 希望可以保持持续更新
---
<!-- markdownlint-disable MD033 -->
<!-- markdownlint-disable MD041 -->
<style>
/*爱的魔力转圈圈*/
.m-home-layout .image-src {
  border-radius: 50%;
  overflow: hidden;
}
.m-home-layout .image-src:hover {
  transform: translate(-50%, -50%) rotate(666turn);
  transition: transform 59s 1s cubic-bezier(0.3, 0, 0.8, 1);
}

.m-home-layout .details small {
  opacity: 0.8;
}

.m-home-layout .item:last-child .details {
  display: flex;
  justify-content: flex-end;
  align-items: end;
}
</style>
