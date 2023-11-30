<script lang="ts" setup>
const liList: Array<number> = [...Array(10).keys()]
</script>

<template>
  <div class="box">
    <ul class="layout-content-background">
      <li v-for="item in liList" :key="item"></li>
    </ul>
  </div>
</template>
<style lang="scss" scoped>
$number-of-items: 10;

.box {
  width: 600px;
  height: 600px;
  overflow: hidden;
  position: relative;
}

.layout-content-background {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  background: #4e54c8;
  overflow: hidden;
}

.layout-content-background li {
  position: absolute;
  display: block;
  list-style: none;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  background: rgba(255, 255, 255, 0.2);
  animation: animate 19s linear infinite;

  @for $i from 0 through $number-of-items {
    $index: $i + 1;

    &:nth-child(#{$index}) {
      // 设置每个子元素的样式
      left: random(100) + 1%;
      width: random(20) + 20px;
      height: random(20) + 20px;
      bottom: - (random(20) + 20px);
      animation-delay: $i * 1s;
    }
  }
}


@keyframes move {
  100% {
    transform: translate3d(0, 0, 1px) rotate(360deg);
  }
}

@keyframes animate {
  0% {
    transform: translateY(0) rotate(0deg);
    opacity: 1;
    border-radius: 0;
  }

  100% {
    transform: translateY(-1000px) rotate(720deg);
    opacity: 0;
    border-radius: 50%;
  }
}
</style>