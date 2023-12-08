<script setup lang="ts">
import { ref } from 'vue'
// const reader = new FileReader();
const reader = {} as any;
const img = new Image();

const imageWidth = ref<string>('') // 图片宽度
const imageHeight = ref<string>('') // 图片高度
const imageType = ref<'jpeg' | 'png'>('jpeg') // 图片类型
const imageTypeOptions = ref<string[]>(['jpeg', 'png']) // 图片类型
const imageOnline = ref<string>('') // 在线图片地址
const imageQuality = ref<string>('80') // 图片质量百分比
const myCanvas = ref<HTMLCanvasElement | null>(null);
const myFile = ref<HTMLInputElement | null>(null);
const myImgDisplay = ref<HTMLImageElement | null>(null);
const myImgSize = ref<HTMLParagraphElement | null>(null);
const myImgOriginWeight = ref<HTMLParagraphElement | null>(null);
const myImgNowWeight = ref<HTMLParagraphElement | null>(null);
const imgParamMap = new Map<string, string>([
  ['width', imageWidth.value],
  ['height', imageHeight.value],
  ['quality', imageQuality.value]
]);
// 开启图片地址跨域
img.setAttribute('crossOrigin', 'Anonymous');
const canvas = myCanvas.value!;
if (canvas) { const context = canvas.getContext('2d') }

const eleLink = document.createElement('a');
eleLink.style.display = 'none';

// 图片质量百分比与图片大小的转换
const updateImage = (type, event?) => {
  if (canvas) {
    imgParamMap.set(type, event?.target.value)
    let targetWidth = 0;
    let targetHeight = 0;
    const customWidth = +imageWidth.value;
    const customHeight = +imageHeight.value;
    console.log(customWidth, customHeight)
    //  判断宽高填写的四种情况
    if (customWidth && customHeight) {
      targetWidth = customWidth;
      targetHeight = customHeight;
    } else if (customWidth && !customHeight) {
      targetWidth = customWidth;
      targetHeight = Math.round(targetWidth * (+imageHeight.value / +imageWidth.value));
    } else if (!customWidth && customHeight) {
      targetHeight = customHeight;
      targetWidth = Math.round(targetHeight * (+imageHeight.value / +imageWidth.value));
    } else {
      targetWidth = +imageWidth.value;
      targetHeight = +imageHeight.value
    }
    // canvas对图片进行缩放
    canvas.width = targetWidth;
    canvas.height = targetHeight;
    const context = canvas.getContext('2d');
    // 清除画布
    context && context.clearRect(0, 0, targetWidth, targetHeight);
    // 图片压缩
    context && context.drawImage(img, 0, 0, targetWidth, targetHeight);
    // 存储图片base64链接
    if (imageType.value === 'png') {
      eleLink.href = canvas.toDataURL('image/png');
    } else {
      eleLink.href = canvas.toDataURL('image/jpeg', +imageQuality.value / 100);
    }
    // 存储下载文件名，清晰度
    eleLink.download = `${targetWidth}_${targetHeight}`;
    // 清楚当前文件的路径值，避免不能上传同一张图片的问题
    myFile.value = '' as any;
    // 图片预览
    // @ts-ignore
    myImgDisplay.value.setAttribute('src', eleLink.href);
    // 图片信息展示
    const imgInfo = `图片尺寸：${targetWidth} * ${targetHeight} （长 * 宽）(单位：像素)`;
    // @ts-ignore
    myImgSize.value.innerHTML = imgInfo;
    // @ts-ignore
    myImgNowWeight.value.innerHTML = `压缩后大小：${(getFileSize(eleLink.href) / 1024).toFixed(2)}KB`;
    console.log(document.getElementsByClassName('img-details'))
    document.getElementsByClassName('img-details')[0].classList.remove('hidden');
    document.getElementsByClassName('img-preview')[0].classList.remove('hidden');
  }

}

// 图片类型
const clarityWeightChange = (event) => {
  imageType.value = event.target.value
}

// 上传图片
const showFileUpload = () => {
  myFile.value?.click()
}
// 获取图片原始尺寸
img.onload = (image) => {
  console.log(image)
  // @ts-ignore
  imageWidth.value = image.path[0].width;
  // @ts-ignore
  imageHeight.value = image.path[0].height;
};

// 获取在线图片
const getOnlineImage = (): void => {
  img.src = imageOnline.value;
}

// 文件base64化，以便获知图片原始尺寸
reader.onload = function (e) {
  img.src = e.target?.result as string;
};

// 读取原始文件信息
myFile.value && myFile.value.addEventListener('change', (event: any) => {
  console.log(event)
  reader.readAsDataURL(event.target.files[0]);
  const fileInfo = event.target.files[0];
  if (myImgOriginWeight.value) myImgOriginWeight.value.innerHTML = `压缩前大小：${(fileInfo.size / 1024).toFixed(2)}KB`;
});
// 根据base64计算文件体积
const getFileSize = (base64Url) => {
  //  编码原理
  // 要求把3个8位字节（3*8=24）转化为4个6位的字节（4*6=24），之后在6位的前面补两个0，形成8位一个字节的形式。 如果剩下的字符不足3个字节，用0填充，输出字符使用’=’，因此编码后输出的文本末尾可能会出现1或2个’=’
  //  去掉无用头部信息（data:image/png;base64,）
  let baseStr = base64Url.substring(base64Url.indexOf('base64,') + 'base64,'.length);
  // 去掉”=“
  baseStr = baseStr.replace(/=/gi, '');
  // 进行计算
  const strLen = baseStr.length;
  return strLen - (strLen / 8) * 2
}

// 下载图片
const downloadImage = (): void => {
  // 触发点击
  document.body.appendChild(eleLink);
  eleLink.click();
  // 然后移除
  document.body.removeChild(eleLink);
}
</script>

<template>
  <div class="compression">
    <div class="wrapper">
      <div class="size-options">
        <p class="sub-title">图片自定义宽高</p>
        <ul>
          <li class="m-b-10">
            <span>宽度：</span>
            <input v-model="imageWidth" class="input-text" type="text" id="custom-width" placeholder="默认值为图片原始尺寸"
              @change="updateImage('width', $event)">
          </li>
          <li>
            <span>高度：</span>
            <input v-model="imageHeight" class="input-text" type="text" id="custom-height" placeholder="默认值为图片原始尺寸"
              @change="updateImage('height', $event)">
          </li>
        </ul>
      </div>
      <div class="clarity-options">
        <p class="sub-title">导出选项</p>
        <ul>
          <li>
            <span v-for="item in imageTypeOptions" :key="item">
              <input name="fileType" type="radio" :value="item" @change="clarityWeightChange">
              <label class="radio-label">{{ item }}</label>
            </span>
          </li>
          <li class="file-type-option" v-if="imageType === 'jpeg'">
            <span>图形质量：</span>
            <input type="range" name="points" min="1" max="100" id="clarity" :value="imageQuality"
              @change="updateImage('quality', $event)" />
          </li>
        </ul>
      </div>
      <input class="hidden" type="file" id="file" ref="myFile">
      <button class="btn m-b-10" @click="showFileUpload()">上传图片</button>
      <div>
        <span>在线图片：</span>
        <input v-model="imageOnline" class="input-text" type="url" placeholder="在线图片地址" @change="getOnlineImage">
      </div>
      <div class="display">
        <div class="img-details hidden">
          <p>图片信息：</p>
          <p class="indent-2" id="img-size" ref="myImgSize"></p>
          <p class="indent-2" id="img-origin-weight" ref="myImgOriginWeight"></p>
          <p class="indent-2" id="img-now-weight" ref="myImgNowWeight"></p>
          <canvas id="canvas" ref="myCanvas"></canvas>
        </div>
      </div>
    </div>
    <div class="instruction">
      <h4>脱机版图片压缩：使用说明</h4>
      <p class="tips">
        1.选择图片质量，<strong>注意：只有JPG格式可以调整图片质量，PNG格式无法调整</strong>
      </p>
      <div class="img-preview hidden">
        <button class="btn" @click="downloadImage()">下载图片</button>
        <p>预览：</p>
        <img id="img-display" src="" alt="" ref="myImgDisplay">
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.compression {
  width: 700px;
  height: 700px;

  ul {
    list-style-type: none;
    margin: 10px 0 0 0;
    padding: 0;
  }

  .hidden {
    display: none !important;
  }

  .wrapper {
    margin: 20px 10px 20px 10px;
    display: inline-block;
    width: 400px;
  }

  .size-options,
  .clarity-options {
    display: block;
    width: 260px;
    padding: 10px 10px;
    border: 1px solid #ebedf0;
    border-radius: 5px;
    margin-bottom: 10px;
  }

  .input-text {
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    font-variant: tabular-nums;
    line-height: 1.5;
    list-style: none;
    -webkit-font-feature-settings: 'tnum';
    font-feature-settings: 'tnum';
    position: relative;
    display: inline-block;
    height: 28px;
    padding: 4px 11px;
    color: rgba(0, 0, 0, 0.65);
    font-size: 14px;
    line-height: 32px;
    line-height: 1.5 \9;
    background-color: #fff;
    background-image: none;
    border: 1px solid #d9d9d9;
    border-radius: 4px;
    -webkit-transition: all .3s;
    transition: all .3s;
  }

  .input-text:hover {
    border-color: #40a9ff;
    border-right-width: 1px !important;
  }

  .btn {
    line-height: 1.5;
    display: inline-block;
    position: relative;
    font-weight: 400;
    white-space: nowrap;
    text-align: center;
    background-image: none;
    border: 1px solid transparent;
    -webkit-box-shadow: 0 2px 0 rgba(0, 0, 0, 0.015);
    box-shadow: 0 2px 0 rgba(0, 0, 0, 0.015);
    cursor: pointer;
    -webkit-transition: all .3s cubic-bezier(.645, .045, .355, 1);
    transition: all .3s cubic-bezier(.645, .045, .355, 1);
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    -ms-touch-action: manipulation;
    touch-action: manipulation;
    height: 32px;
    padding: 0 15px;
    font-size: 14px;
    border-radius: 4px;
    color: rgba(0, 0, 0, 0.65);
    background-color: #fff;
    border-color: #d9d9d9;
  }

  .indent-2 {
    text-indent: 2rem;
  }

  .m-b-10 {
    margin-bottom: 10px;
  }

  .instruction {
    display: inline-block;
    width: 400px;
  }

  strong {
    color: brown;
  }

  #canvas {
    display: none;
  }

  .sub-title {
    margin: 0px 0 15px 0;
    text-align: center;
  }
}
</style>