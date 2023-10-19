<template>
  <div class="loading">
    <div class="loading-center">
      <div v-for="item in animationList" :key="item" class="circle" id="circle_animation" :style="item"></div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  const animationList = [
    '--translateFX: 90px; --translateSX: 180px;',
    '--translateFX: -90px; --translateSX: -180px;float:right;',
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
  height: 50px;
  width: 200px;
  margin-top: -25px;
  margin-left: -100px;
}

.circle {
  width: 20px;
  height: 20px;
  background-color: #465EFB;
  float: left;
  margin-top: 15px;
  -moz-border-radius: 50% 50% 50% 50%;
  -webkit-border-radius: 50% 50% 50% 50%;
  border-radius: 50% 50% 50% 50%;
}


#circle_animation {
  -webkit-animation: circle_animation 2s infinite;
  animation: circle_animation 2s infinite;
}


@-webkit-keyframes circle_animation {
  25% {
    -ms-transform: translate(var(--translateFX), 0) scale(2);
    -webkit-transform: translate(var(--translateFX), 0) scale(2);
    transform: translate(var(--translateFX), 0) scale(2);
  }

  50% {
    -ms-transform: translate(var(--translateSX), 0) scale(1);
    -webkit-transform: translate(var(--translateSX), 0) scale(1);
    transform: translate(var(--translateSX), 0) scale(1);
  }

  75% {
    -ms-transform: translate(var(--translateFX), 0) scale(2);
    -webkit-transform: translate(var(--translateFX), 0) scale(2);
    transform: translate(var(--translateFX), 0) scale(2);
  }
}

@keyframes circle_animation {
  25% {
    -ms-transform: translate(var(--translateFX), 0) scale(2);
    -webkit-transform: translate(var(--translateFX), 0) scale(2);
    transform: translate(var(--translateFX), 0) scale(2);
  }

  50% {
    -ms-transform: translate(var(--translateSX), 0) scale(1);
    -webkit-transform: translate(var(--translateSX), 0) scale(1);
    transform: translate(var(--translateSX), 0) scale(1);
  }

  75% {
    -ms-transform: translate(var(--translateFX), 0) scale(2);
    -webkit-transform: translate(var(--translateFX), 0) scale(2);
    transform: translate(var(--translateFX), 0) scale(2);
  }
}
</style>