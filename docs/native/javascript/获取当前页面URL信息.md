# 获取当前页面URL信息

 **假设当前页完整地址是：`https://www.example.com:8080/path/to/page.html?id=2&age=18`**

- 获取当前窗口的Url

```typescript
const url:string = window.location.href;
//输出：https://www.example.com:8080/path/to/page.html
```

- 获取当前窗口的主机名+ 端口(`host`)

```typescript
const host:string = window.location.host;
//输出：www.example.com:8080
```

- 获取当前窗口的主机名(`hostname`)

```typescript
const hostname:string = window.location.hostname;
//输出：www.example.com
```

- 获取当前窗口的端口(`port`)

```typescript
const port:string = window.location.port;
//输出：8080
```

- 获取当前窗口的路径(`pathname`)

```typescript
const pathname:string = window.location.pathname;
//输出：/path/to/page.html
```

- 获取当前窗口的源信息(`origin`)

```typescript
const origin:string = window.location.origin;
//输出：https://www.example.com:8080
```

- 获取当前窗口的协议(`protocol`)

```typescript
const protocol:string = window.location.protocol;
//输出：http:
```

- 获取当前文档的URL

```typescript
const urls:string = document.URL;
//输出：https://www.example.com:8080/path/to/page.html
```

- 获取参数

```typescript
const search = window.location.search;
//输出：?id=2&age=18
```

**分隔`url`中的参数**

```Javascript
const search = window.location.search;
const age = getSearchString('age', search); //结果：18
const id = getSearchString('id', search); //结果：2
//key(需要检索的键） url（传入的需要分割的url地址，例：?id=2&age=18）
  const getSearchStr = (key: string, url: string): string => {
    let str = url;
    str = str.substring(1, str.length); // 获取URL中?之后的字符（去掉第一位的问号）
    // 以&分隔字符串，获得类似name=xiaoli这样的元素数组
    const arr = str.split("&");
    const obj = new Object();

    // 将每一个数组元素以=分隔并赋给obj对象 
    for (let i = 0; i < arr.length; i++) {
      const tmp_arr = arr[i].split("=");
      obj[decodeURIComponent(tmp_arr[0])] = decodeURIComponent(tmp_arr[1]);
    }
    return obj[key];
  }
  getSearchStr('id', str)
```

**获取`url`参数对象**

```typescript
const parseQueryParams = (urlStr:string):{ [key: string]: string } => {
    const params = {};
    const queryStartIndex = urlStr.indexOf('?');
    if (queryStartIndex > -1) {
        const queryString = urlStr.slice(queryStartIndex + 1);
        const pairs = queryString.split('&');
        for (const pair of pairs) {
            const [key, value] = pair.split('=');
            params[decodeURIComponent(key)] = decodeURIComponent(value);
        }
    }
    return params;
};
parseQueryParams(str)
···
