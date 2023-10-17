<template>
  <div class="loading">
    <div class="loading-center">
      <div v-for="item in animationList" :key="item" :style="item" class="circle" id="circle_animation"></div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const animationList: string[] = [
  '--bottom:0;--left:80px;--translateX: 80px; --translateY: 30px;--rotateDeg1:0deg;--rotateDeg2:180deg;',
  '--bottom:0;--left:60px;--translateX: 40px; --translateY: 30px;--rotateDeg1:0deg;--rotateDeg2:180deg;',
  '--bottom:0;--left:40px;--translateX: 0; --translateY: 30px;--rotateDeg1:0deg;--rotateDeg2:180deg;',
  '--bottom:0;--left:20px;--translateX: -40px; --translateY: 30px;--rotateDeg1:0deg;--rotateDeg2:180deg;',
  '--bottom:0;--left:0px;--translateX: -80px; --translateY: 30px;--rotateDeg1:0deg;--rotateDeg2:180deg;',
  '--bottom:0;--left:70px;--translateX: 60px; --translateY: -20px;--rotateDeg1:180deg;--rotateDeg2:180deg;',
  '--bottom:0;--left:50px;--translateX: 0; --translateY: -20px;--rotateDeg1:180deg;--rotateDeg2:180deg;',
  '--bottom:0;--left:30px;--translateX: -60px; --translateY: -20px;--rotateDeg1:180deg;--rotateDeg2:180deg;',
  '--bottom:0;--left:10px;--translateX: -100px; --translateY: -20px;--rotateDeg1:180deg;--rotateDeg2:180deg;',
  '--bottom:20px;--left:70px;--translateX: -100px; --translateY: -40px;--rotateDeg1:0deg;--rotateDeg2:180deg;',
  '--bottom:20px;--left:50px;--translateX: -60px; --translateY: -80px;--rotateDeg1:0deg;--rotateDeg2:180deg;',
  '--bottom:20px;--left:30px;--translateX: 80px; --translateY: -40px;--rotateDeg1:0deg;--rotateDeg2:180deg;',
  '--bottom:20px;--left:10px;--translateX: 80px; --translateY: -80px;--rotateDeg1:0deg;--rotateDeg2:180deg;',
  '--bottom:20px;--left:60px;--translateX: 100px; --translateY: -40px;--rotateDeg1:180deg;--rotateDeg2:180deg;',
  '--bottom:20px;--left:40px;--translateX: 0; --translateY: -40px;--rotateDeg1:180deg;--rotateDeg2:180deg;',
  '--bottom:20px;--left:20px;--translateX: -100px; --translateY: -40px;--rotateDeg1:180deg;--rotateDeg2:180deg;',
  '--bottom:40px;--left:60px;--translateX: 80px; --translateY: -60px;--rotateDeg1:0deg;--rotateDeg2:180deg;',
  '--bottom:40px;--left:40px;--translateX: 0; --translateY: -60px;--rotateDeg1:0deg;--rotateDeg2:180deg;',
  '--bottom:40px;--left:20px;--translateX: -80px; --translateY: -60px;--rotateDeg1:0deg;--rotateDeg2:180deg;',
  '--bottom:40px;--left:50px;--translateX: 40px; --translateY: -100px;--rotateDeg1:180deg;--rotateDeg2:180deg;',
  '--bottom:40px;--left:30px;--translateX: -40px; --translateY: -100px;--rotateDeg1:180deg;--rotateDeg2:180deg;',
  '--bottom:60px;--left:50px;--translateX: 100px; --translateY: -100px;--rotateDeg1:0deg;--rotateDeg2:180deg;',
  '--bottom:60px;--left:30px;--translateX: -100px; --translateY: -100px;--rotateDeg1:0deg;--rotateDeg2:180deg;',
  '--bottom:60px;--left:40px;--translateX: 0; --translateY: -80px;--rotateDeg1:180deg;--rotateDeg2:180deg;',
  '--bottom:80px;--left:40px;--translateX: 0; --translateY: -100px;--rotateDeg1:0deg;--rotateDeg2:180deg;',
]
</script>

<style lang="scss" scoped>
.loading {
  height: 300px;
  width: 100%;
  position: relative;
}

.loading-center {
  position: absolute;
  left: 50%;
  top: 50%;
  height: 100px;
  width: 100px;
  margin-top: -50px;
  margin-left: -50px;
}

.circle {
  position: absolute;
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  border-bottom: 20px solid #465EFB;
  bottom: var(--bottom);
  left: var(--left);
}

#circle_animation {
  -ms-transform: rotate(var(--rotateDeg1));
  -webkit-transform: rotate(var(--rotateDeg1));
  transform: rotate(var(--rotateDeg1));
  -webkit-animation: circle_animation 3s infinite ease-in-out;
  animation: circle_animation 3s infinite ease-in-out;
}


@-webkit-keyframes circle_animation {
  50% {
    -ms-transform: translate(var(--translateX), var(--translateY)) rotate(var(--rotateDeg2));
    -webkit-transform: translate(var(--translateX), var(--translateY)) rotate(var(--rotateDeg2));
    transform: translate(var(--translateX), var(--translateY)) rotate(var(--rotateDeg2));

  }
}

@keyframes circle_animation {
  50% {
    -ms-transform: translate(var(--translateX), var(--translateY)) rotate(var(--rotateDeg2));
    -webkit-transform: translate(var(--translateX), var(--translateY)) rotate(var(--rotateDeg2));
    transform: translate(var(--translateX), var(--translateY)) rotate(var(--rotateDeg2));
  }
}
</style>