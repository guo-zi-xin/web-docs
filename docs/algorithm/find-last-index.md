---
title: 寻找首位不重复字符索引
date: 2023-02-01 18:22:29
permalink: /pages/350219/
categories:
  - algorithm
tags:
  - 
---
# 寻找首位不重复字符索引
```
   // 给定一个字符串，找到它的第一个不重复的字符，并返回它的索引。如果不存在，则返回 -1。
    let str1 = 'leetcode'
    // 返回 0
    let str2 = "loveleetcode"
    // 返回 2
    const firstUniqChar = function (str) {
        const map = {}
        for (let i of str) {
            map[i] = (map[i] || 0) + 1
        }
        for (let k = 0; k < str.length; k++)if (map[str[k]] === 1)  return k
        return -1
    }
    console.log(firstUniqChar(str2))

    function ddd(){
            // ES6 语法
            let src = 'https://images.mfcad.com/tuzhi/2018/01/02/1514874025342.png@!big-water';
            var canvas = document.createElement('canvas');
            var img = document.createElement('img');
            img.onload = function(e) {
                canvas.width = img.width;
                canvas.height = img.height;
                var context = canvas.getContext('2d');
                context.drawImage(img, 0, 0, img.width, img.height);
                canvas.getContext('2d').drawImage(img, 0, 0, img.width, img.height);
                canvas.toBlob((blob)=>{
                    let link = document.createElement('a');
                link.href = window.URL.createObjectURL(blob);
                link.download = '1';
                link.click();
            }, "");
            }
            img.setAttribute("crossOrigin",'Anonymous');
            img.src = src;
        }
        // ddd()
```