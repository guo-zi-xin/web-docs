<template>
  <div class="container">
    <div v-for="(item, index) in itemList" :key="item" :class="item" :style="`--d:${index + 1}`"></div>
  </div>
</template>

<script lang="ts" setup>
const itemList: string[] = [...Array(9).keys()].map((item: number) => 'square')
</script>

<style lang="scss" scoped>
.container {
  margin: 100px auto;
  height: 150px;
  width: 150px;
  padding: 30px;
  border-radius: 15px;
  display: flex;
  flex-wrap: wrap;
  box-shadow: 0 12px 20px 6px rgb(104 112 118 / 0.2);
  // 转换的子元素保留3D转换
  transform-style: preserve-3d;
  transform: rotateX(45deg) rotateZ(45deg);
}

.square {
  height: 30px;
  width: 30px;
  border: 1px solid red;
  background-color: rgb(207, 52, 40);
  position: relative;
  transform-style: preserve-3d;
  transform: translateZ(30px);
  box-shadow: 90px 90px 15px rgba(0, 0, 0, 0.2);
  animation: beating 1s infinite;
  animation-delay: calc(0.05s * var(--d));
}

.square:hover {
  cursor: pointer;
  // 亮度
  filter: brightness(2.1);
}

.square:after,
.square:before {
  content: "";
  position: absolute;
  height: 30px;
  width: 30px;
  left: 0;
  top: 0;
}

.square:before {
  background-color: rgb(56, 35, 35);
  transform: rotateY(-90deg);
  transform-origin: right center;
}

.square:after {
  background-color: rgb(80, 39, 36);
  transform: rotateX(90deg);
  transform-origin: right bottom;
}

@keyframes beating {
  50% {
    transform: translateZ(calc(30px / 2));
  }
}</style>