<template>
  <div class="loading">
    <div class="loading-center">
      <div v-for="item in animationList" :key="item" :style="item" class="circle" id="circle_animation"></div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const animationList: string[] = [...Array(10).keys()].map((item: number) => {
  if (item === 10) {
    return 'margin-right:0px;'
  } else {
    return `-webkit-animation-delay:${item / 10}s;animation-delay:${item / 10}s;`
  }
})
console.log(animationList)
</script>

<style  lang="scss" scoped>
.loading {
  height: 300px;
  width: 100%;
  position: relative;
}

.loading-center {
  position: absolute;
  left: 50%;
  top: 50%;
  height: 50px;
  width: 150px;
  margin-top: -25px;
  margin-left: -75px;

}

.circle {
  width: 8px;
  height: 50px;
  margin-right: 5px;
  background-color: #465EFB;
  -webkit-animation: animate 1s infinite;
  animation: animate 1s infinite;
  float: left;
}

@-webkit-keyframes animate {

  50% {
    -ms-transform: scaleY(0);
    -webkit-transform: scaleY(0);
    transform: scaleY(0);
  }
}

@keyframes animate {
  50% {
    -ms-transform: scaleY(0);
    -webkit-transform: scaleY(0);
    transform: scaleY(0);
  }
}
</style>