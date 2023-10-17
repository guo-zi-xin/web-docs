<template>
  <div class="loading">
    <div class="loading-center">
      <div v-for="item in animationList" :key="item" class="circle" id="circle_animation" :style="item"></div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const animationList: string[] = [
  '--translateX: 20px; --translateY: 20px;',
  '--translateX: -20px; --translateY: 20px;',
  '--translateX: 20px; --translateY: -20px;',
  '--translateX: -20px; --translateY: -20px;',
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
  height: 60px;
  width: 60px;
  margin-top: -30px;
  margin-left: -30px;
  -webkit-animation: loading-center 1s infinite;
  animation: loading-center 1s infinite;
}

.circle {
  width: 20px;
  height: 20px;
  background-color: #465EFB;
  float: left;
  -moz-border-radius: 50% 50% 50% 50%;
  -webkit-border-radius: 50% 50% 50% 50%;
  border-radius: 50% 50% 50% 50%;
  margin-right: 20px;
  margin-bottom: 20px;
}

.circle:nth-child(2n+0) {
  margin-right: 0px;
}

#circle_animation {
  -webkit-animation: circle_animation 1s infinite;
  animation: circle_animation 1s infinite;
}


@-webkit-keyframes loading-center {
  100% {
    -ms-transform: rotate(360deg);
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }

}

@keyframes loading-center {
  100% {
    -ms-transform: rotate(360deg);
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}

@-webkit-keyframes circle_animation {
  50% {
    -ms-transform: translate(var(--translateX), var(--translateY));
    -webkit-transform: translate(var(--translateX), var(--translateY));
    transform: translate(var(--translateX), var(--translateY));
  }
}

@keyframes circle_animation {
  50% {
    -ms-transform: translate(var(--translateX), var(--translateY));
    -webkit-transform: translate(var(--translateX), var(--translateY));
    transform: translate(var(--translateX), var(--translateY));
  }
}
</style>