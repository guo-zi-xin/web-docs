# JS解析URL参数

---

- 方法一

```javascript
let url = "https: //zhidao.baidu.com/question/1768422895052400180.html?fr=iks&word=slice&ie=gbk";

// 提取url中的解析字符串
function UrlParamHash(url) {
  const params = []
  let h = ''
  const hash = url.slice(url.indexOf("?") + 1).split('&');
  for (let i = 0; i < hash.length; i++) {
    h = hash[i].split("="); 
    params[h[0]] = h[1];
  }
  return params;
}
const params = UrlParamHash(url);

// 获取其中某一个参数
const id = decodeURI(params['unit']);
```

- 方法二

```javascript
// 解析url字符串参数
const url = "https: //zhidao.baidu.com/question/1768422895052400180.html?fr=iks&word=slice&ie=gbk";
const url = location.href;
const n1 = url.length; //地址的总长度
const n2 = url.indexOf("="); //取得=号的位置
const id = decodeURI(url.substr(n2 + 1, n1 - n2)); //从=号后面的内容
```

- 方法三

```javascript
//获取url中的参数
//name-查询的变量名
  function getUrlParam(name) {
  const reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
  const r = window.location.search.substr(1).match(reg); //匹配目标参数
  if (r != null)
  {return decodeURIComponent(r[2]); }
  return null; //返回参数值
}
```
