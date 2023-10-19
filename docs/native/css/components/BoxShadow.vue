<template>
  <div class="box"></div>
</template>

<style lang="scss" scoped>

.box{
  margin: 100px auto;
  width: 200px;
  height: 200px;
  border-radius: 50%;
  border: none;
  animation: redBall 6s linear infinite;
  background-color: aqua;
  box-shadow: 0 0 20px #fff,20px 0 80px #f0f,-20px 0 80px #0ff,inset 0 0 50px #fff,inset 200px 0 80px #f0f;
}
@keyframes redBall{
  0%{
    box-shadow: 0 0 20px #fff,20px 0 80px #f0f,-20px 0 80px #0ff,inset 0 0 50px #fff,inset -200px 0 80px #f0f;
  }
  50%{
    box-shadow: 0 0 20px #fff,20px 0 80px #f0f,-20px 0 80px #0ff,inset 0 0 50px #fff,inset 0px 0 80px #f0f;
  }
  100%{
    box-shadow: 0 0 20px #fff,20px 0 80px #f0f,-20px 0 80px #0ff,inset 0 0 50px #fff,inset 200px 0 80px #f0f,inset 10px 0 80px #0ff;
  }
}

</style>