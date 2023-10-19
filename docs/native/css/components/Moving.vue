<template>
  <div class="loading">
    <div class="loading-center">
      <div v-for="item in animationList" :key="item" id="circle_animation" :style="item" class="circle"></div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const animationList: string[] = [
  '--delay:0s;',
  '--delay: -.4s;left:20px;',
  '--delay: -.8s;left:40px;',
  '--delay: -1.2s;left:60px;',
  '--delay: -1.6s;left:80px;',
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
  height: 20px;
  width: 100px;
  margin-top: -10px;
  margin-left: -50px;

}

.circle {
  width: 20px;
  height: 20px;
  background-color: #465EFB;
  -moz-border-radius: 50% 50% 50% 50%;
  -webkit-border-radius: 50% 50% 50% 50%;
  border-radius: 50% 50% 50% 50%;
  margin-right: 20px;
  margin-bottom: 20px;
  position: absolute;
}

#circle_animation {
  -webkit-animation: circle 2s linear infinite;
  animation: circle 2s linear infinite var(--delay);
}



@-webkit-keyframes circle {
  0% {
    left: 100px;
    top: 0
  }

  80% {
    left: 0;
    top: 0;
  }

  85% {
    left: 0;
    top: -20px;
    width: 20px;
    height: 20px;
  }

  90% {
    width: 40px;
    height: 15px;
  }

  95% {
    left: 100px;
    top: -20px;
    width: 20px;
    height: 20px;
  }

  100% {
    left: 100px;
    top: 0;
  }

}

@keyframes circle {
  0% {
    left: 100px;
    top: 0
  }

  80% {
    left: 0;
    top: 0;
  }

  85% {
    left: 0;
    top: -20px;
    width: 20px;
    height: 20px;
  }

  90% {
    width: 40px;
    height: 15px;
  }

  95% {
    left: 100px;
    top: -20px;
    width: 20px;
    height: 20px;
  }

  100% {
    left: 100px;
    top: 0;
  }
}
</style>