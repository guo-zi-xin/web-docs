# 炫目动画

<script setup>
  import { DazzlingCss } from './components'
</script>

<DazzlingCss/>

#### 代码实现

```vue
  <template>
    <div class="partial-container">
      <div class="container">
        <span class="text">我的胃来食</span>
      </div>
    </div>
  </template>

  <style lang="scss" scoped>
  .partial-container {
    width: 700px;
    height: 145px;
    background: #000;
    margin: 100px auto;
  }

  .container {
    text-align: center;
    height: 100%;
    background-color: #000;
    filter: contrast(30);
  }

  .text {
    font-size: 100px;
    display: inline-block;
    padding-top: 50px;
    color: #fff;
    letter-spacing: -100px;
    animation: showup 2s linear forwards;
    /* animation-iteration-count 指定动画循环次数 */
    animation-iteration-count: infinite;
    /* animation-direction 使动画来回运动 */
    animation-direction: alternate;
  }

  @keyframes showup {
    0% {
      filter: blur(10px);
    }

    100% {
      letter-spacing: 10px;
      filter: blur(2px);
    }
  }
  </style>
```
