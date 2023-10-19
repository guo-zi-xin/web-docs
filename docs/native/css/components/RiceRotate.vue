<template>
  <div class="loading">
    <div class="loading-center">
      <div v-for="item in animationList" :key="item" :style="item" class="circle" id="circle_animation"></div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const animationList: string[] = [
  '--top:19px;left:19px;--delay:0s;',
  '--top:0px;left:65px;--delay:0.1s;',
  '--top:19px;left:111px;--delay:0.2s;',
  '--top:65px;left:130px;--delay:0.3s;',
  '--top:111px;left:111px;--delay:0.4s;',
  '--top:130px;left:65px;--delay:0.5s;',
  '--top:111px;left:19px;--delay:0.6s;',
  '--top:65px;left:0px;--delay:0.7s;',
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
  height: 150px;
  width: 150px;
  margin-top: -75px;
  margin-left: -75px;
  -moz-border-radius: 50% 50% 50% 50%;
  -webkit-border-radius: 50% 50% 50% 50%;
  border-radius: 50% 50% 50% 50%;

}

.circle {
  width: 20px;
  height: 20px;
  background-color: #465EFB;
  position: absolute;
  -moz-border-radius: 50% 50% 50% 50%;
  -webkit-border-radius: 50% 50% 50% 50%;
  border-radius: 50% 50% 50% 50%;
  -webkit-animation: animate 0.8s infinite;
  animation: animate 0.8s infinite;
}

#circle_animation {
  top: var(--top);
  left: var(--left);
  -webkit-animation-delay: var(--delay);
  animation-delay: var(--delay);
}

@-webkit-keyframes animate {

  25% {
    -ms-transform: scale(1.5);
    -webkit-transform: scale(1.5);
    transform: scale(1.5);
  }

  75% {
    -ms-transform: scale(0);
    -webkit-transform: scale(0);
    transform: scale(0);
  }
}

@keyframes animate {
  50% {
    -ms-transform: scale(1.5, 1.5);
    -webkit-transform: scale(1.5, 1.5);
    transform: scale(1.5, 1.5);
  }

  100% {
    -ms-transform: scale(1, 1);
    -webkit-transform: scale(1, 1);
    transform: scale(1, 1);
  }
}
</style>