# JS中的offsetWidth、offsetHeight、clientWidth、clientHeight

**offsetWidth：代表了元素的宽度，包括边框和填充，但不是边距；**

**offsetHeight：代表了元素的高度，包括边框和填充，但不是边距；**

**offsetTop：代表了返回元素的上外缘距离最近采用定位父元素内壁的距离，如果父元素中没有采用定位的，则是获取上外边缘距离文档内壁的距离。**

**offsetLeft：此属性和offsetTop的原理是一样的，只不过方位不同。**

**scrollTop：设置或获取位于对象最顶端和窗口中可见内容的最顶端之间的距离;**

**scrollLeft：设置或获取位于对象左边界和窗口中目前可见内容的最左端之间的距离；**

**scrollWidth：返回元素的宽度（包括元素宽度、内边距和溢出尺寸，不包括边框和外边距），无溢出的情况，与clientWidth相同;**

**scrollHeigh：返回元素的高度（包括元素高度、内边距和溢出尺寸，不包括边框和外边距），无溢出的情况，与clientHeight相同；**

**style.width：返回元素的宽度（包括元素宽度，不包括内边距、边框和外边距）；**

**style.height：返回元素的高度（包括元素高度，不包括内边距、边框和外边距）；**

**clientWidth：返回元素的宽度（包括元素宽度、内边距，不包括边框和外边距）；**

**clientHeight：返回元素的高度（包括元素高度、内边距，不包括边框和外边距）；**

## 当鼠标事件发生时

**clientX：鼠标相对于浏览器（这里说的是浏览器的有效区域）左上角x轴的坐标；  不随滚动条滚动而改变；**

**clientY： 鼠标相对于浏览器（这里说的是浏览器的有效区域）左上角y轴的坐标；  不随滚动条滚动而改变；**

**pageX：鼠标相对于浏览器（这里说的是浏览器的有效区域）左上角x轴的坐标；  随滚动条滚动而改变；**

**pageY：鼠标相对于浏览器（这里说的是浏览器的有效区域）左上角y轴的坐标；  随滚动条滚动而改变；**

**screenX：鼠标相对于显示器屏幕左上角x轴的坐标；**

**screenY：鼠标相对于显示器屏幕左上角y轴的坐标；**  

**offsetX：鼠标相对于事件源左上角X轴的坐标;**

**offsetY：鼠标相对于事件源左上角Y轴的坐标;**

### 网页部分

**网页可见区域宽： document.body.clientWidth;**

**网页可见区域高： document.body.clientHeight;**

**网页可见区域宽： document.body.offsetWidth (包括边线的宽);**

**网页可见区域高： document.body.offsetHeight (包括边线的宽);**

**网页正文全文宽： document.body.scrollWidth;**

**网页正文全文高：document.body.scrollHeight;**

**网页被卷去的高： document.body.scrollTop;**

**网页被卷去的左： document.body.scrollLeft;**

**网页正文部分上： window.screenTop;**

**网页正文部分左： window.screenLeft;**

**屏幕分辨率的高： window.screen.height;**

**屏幕分辨率的宽： window.screen.width;**

**屏幕可用工作区高度： window.screen.availHeight;**

**屏幕可用工作区宽度：window.screen.availWidth;**
![image.png](https://any-cross-1252921383.cos.ap-hongkong.myqcloud.com/test-image/js-size.png)
