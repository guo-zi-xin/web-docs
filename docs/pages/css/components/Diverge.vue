<template>
  <div class="loading">
    <div class="loading-center">
      <div class="circle" id="circle_animation" v-for="item in animationList" :key="item" :style="item"></div>
      <div class="circle" id="circle_big"></div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const animationList:string[] = [
  '--delay: 0.2s; --translateX: -65px; --translateY: -65px;',
  '--delay: 0.3s; --translateX: 0px; --translateY: -65px;',
  '--delay: 0.4s; --translateX: 65px; --translateY: -65px;',
  '--delay: 0.5s; --translateX: 65px; --translateY: 0px;',
  '--delay: 0.6s; --translateX: 65px; --translateY: 65px;',
  '--delay: 0.7s; --translateX: 0px; --translateY: 65px;',
  '--delay: 0.8s; --translateX: -65px; --translateY: 65px;',
  '--delay: 0.9s; --translateX: -65px; --translateY: 0px;',
]

</script>

<style lang="scss" scoped>
.loading {
  background-color: #fff;
  height: 300px;
  width: 100%;
  position: relative;
}

.loading-center {
  position: absolute;
  left: 50%;
  top: 50%;
  height: 150px;
  width: 150px;
  margin-top: -75px;
  margin-left: -75px;
  -ms-transform: rotate(45deg);
  -webkit-transform: rotate(45deg);
  transform: rotate(45deg);
}

.circle {
  width: 20px;
  height: 20px;
  background-color: #465EFB;
  position: absolute;
  left: 65px;
  top: 65px;
  -moz-border-radius: 50% 50% 50% 50%;
  -webkit-border-radius: 50% 50% 50% 50%;
  border-radius: 50% 50% 50% 50%;
}

.circle:nth-child(2n + 0) {
  margin-right: 0px;
}

#circle_animation {
  -webkit-animation: circle_animation 2s infinite;
  animation: circle_animation 2s infinite;
  -webkit-animation-delay: var(--delay);
  animation-delay: var(--delay);
}

#circle_big {
  position: absolute;
  width: 50px;
  height: 50px;
  left: 50px;
  top: 50px;
  -webkit-animation: circle_big 2s infinite;
  animation: circle_big 2s infinite;
  -webkit-animation-delay: 0.5s;
  animation-delay: 0.5s;
}

@-webkit-keyframes circle_big {
  50% {
    -webkit-transform: scale(0.5);
  }
}

@keyframes circle_big {
  50% {
    transform: scale(0.5);
    -webkit-transform: scale(0.5);
  }
}

@-webkit-keyframes circle_animation {
  50% {
    -webkit-transform: translate(var(--translateX), var(--translateY));
  }
}

@keyframes circle_animation {
  50% {
    transform: translate(var(--translateX), var(--translateY));
    -webkit-transform: translate(var(--translateX), var(--translateY));
  }
}
</style>