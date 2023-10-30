# JS下载文件

---

- **a标签直接下载**

```javascript
data = data.replace(/\\/g, '/');
var aLink = document.createElement('a');
aLink.download = data.split('/')[data.split('/').length - 1];
aLink.href = data;
aLink.click();
```

- **文件跨域后下载（a标签直接打开文件）**

```javascript
/**
 * 获取页面文件名
 * @param url 文件url
 */
function downloadUrlFile (url) {
  url = url.replace(/\\/g, '/');
  const xhr = new XMLHttpRequest();
  xhr.open('GET', url, true);
  xhr.responseType = 'blob';
  //xhr.setRequestHeader('Authorization', 'Basic a2VybWl0Omtlcm1pdA==');
  xhr.onload = () => {
    if (xhr.status === 200) {
      // 获取文件blob数据并保存
      var fileName = getFileName(url);
      saveAs(xhr.response, fileName);
    }
  };

  xhr.send();
}

/**
 * URL方式保存文件到本地
 * @param data 文件的blob数据
 * @param name 文件名
 */
function saveAs (data, name) {
  var urlObject = window.URL || window.webkitURL || window;
  var export_blob = new Blob([data]);
  var save_link = document.createElementNS('http://www.w3.org/1999/xhtml', 'a')
  save_link.href = urlObject.createObjectURL(export_blob);
  save_link.download = name;
  save_link.click();
}

/**
 * 根据文件url获取文件名
 * @param url 文件url
 */
function getFileName (url) {
  var num = url.lastIndexOf('/') + 1
  var fileName = url.substring(num)
  //把参数和文件名分割开
  fileName = decodeURI(fileName.split("?")[0]);
  return fileName;
}
```
