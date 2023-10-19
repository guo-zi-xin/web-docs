# CSS一些加载样式

<script setup>
import {
  Spinner,
  TurnOverCSS,
  ScaleCSS,
  CubeRotation,
  DotRoate,
  ScaleLoading,
  GradientRotate,
  CircleLoading,
  Diverge,
  RotationContraction,
  Contraction,
  Moving,
  RiceRotate,
  MusicDance,
  TriangleBloom,
  } from './components'
</script>

## 动画效果一

<Spinner/>

- HTML

```html
<div class="spinner">
  <div class="rect1"></div>
  <div class="rect2"></div>
  <div class="rect3"></div>
  <div class="rect4"></div>
  <div class="rect5"></div>
</div>
```

- CSS

```css
.spinner {
  margin: 50px auto;
  width: 50px;
  height: 60px;
  text-align: center;
  font-size: 10px;
}

.spinner>div {
  background-color: #465EFB;
  height: 100%;
  width: 6px;
  display: inline-block;
  margin: 0 1px;
  -webkit-animation: stretchdelay 1.2s infinite ease-in-out;
  animation: stretchdelay 1.2s infinite ease-in-out;
}

.spinner .rect2 {
  -webkit-animation-delay: -1.1s;
  animation-delay: -1.1s;
}

.spinner .rect3 {
  -webkit-animation-delay: -1.0s;
  animation-delay: -1.0s;
}

.spinner .rect4 {
  -webkit-animation-delay: -0.9s;
  animation-delay: -0.9s;
}

.spinner .rect5 {
  -webkit-animation-delay: -0.8s;
  animation-delay: -0.8s;
}

@-webkit-keyframes stretchdelay {

  0%,
  40%,
  100% {
    -webkit-transform: scaleY(0.4)
  }

  20% {
    -webkit-transform: scaleY(1.0)
  }
}

@keyframes stretchdelay {

  0%,
  40%,
  100% {
    transform: scaleY(0.4);
    -webkit-transform: scaleY(0.4);
  }

  20% {
    transform: scaleY(1.0);
    -webkit-transform: scaleY(1.0);
  }
}
```

## 动画效果二

<TurnOverCSS/>

- HTML

```html
  <div class="turn-over"></div>
```

- CSS

```css
.turn-over {
  width: 60px;
  height: 60px;
  background-color: #465EFB;
 
  margin: 50px auto;
  -webkit-animation: rotateplane 1.2s infinite ease-in-out;
  animation: rotateplane 1.2s infinite ease-in-out;
}
 
@-webkit-keyframes rotateplane {
  0% { -webkit-transform: perspective(120px) }
  50% { -webkit-transform: perspective(120px) rotateY(180deg) }
  100% { -webkit-transform: perspective(120px) rotateY(180deg)  rotateX(180deg) }
}
 
@keyframes rotateplane {
  0% {
    transform: perspective(120px) rotateX(0deg) rotateY(0deg);
    -webkit-transform: perspective(120px) rotateX(0deg) rotateY(0deg)
  } 50% {
    transform: perspective(120px) rotateX(-180.1deg) rotateY(0deg);
    -webkit-transform: perspective(120px) rotateX(-180.1deg) rotateY(0deg)
  } 100% {
    transform: perspective(120px) rotateX(-180deg) rotateY(-179.9deg);
    -webkit-transform: perspective(120px) rotateX(-180deg) rotateY(-179.9deg);
  }
}
```

## 动画效果三

<ScaleCSS/>

- HTML

```html
  <div class="scale-style">
    <div class="double-bounce1"></div>
    <div class="double-bounce2"></div>
  </div>
```

- CSS

```css
.scale-style {
  width: 60px;
  height: 60px;
 
  position: relative;
  margin: 100px auto;
}
 
.double-bounce1, .double-bounce2 {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background-color: #465EFB;
  opacity: 0.6;
  position: absolute;
  top: 0;
  left: 0;
   
  -webkit-animation: bounce 2.0s infinite ease-in-out;
  animation: bounce 2.0s infinite ease-in-out;
}
 
.double-bounce2 {
  -webkit-animation-delay: -1.0s;
  animation-delay: -1.0s;
}
 
@-webkit-keyframes bounce {
  0%, 100% { -webkit-transform: scale(0.0) }
  50% { -webkit-transform: scale(1.0) }
}
 
@keyframes bounce {
  0%, 100% {
    transform: scale(0.0);
    -webkit-transform: scale(0.0);
  } 50% {
    transform: scale(1.0);
    -webkit-transform: scale(1.0);
  }
}
```

## 动画效果四

<CubeRotation/>

- HTML

```html
  <div class="cube-roate">
    <div class="cube1"></div>
    <div class="cube2"></div>
  </div>
```

- CSS

```css
.cube-roate {
  margin: 100px auto;
  width: 32px;
  height: 32px;
  position: relative;
}
 
.cube1, .cube2 {
  background-color: #465EFB;
  width: 30px;
  height: 30px;
  position: absolute;
  top: 0;
  left: 0;
   
  -webkit-animation: cubemove 1.8s infinite ease-in-out;
  animation: cubemove 1.8s infinite ease-in-out;
}
 
.cube2 {
  -webkit-animation-delay: -0.9s;
  animation-delay: -0.9s;
}
 
@-webkit-keyframes cubemove {
  25% { -webkit-transform: translateX(42px) rotate(-90deg) scale(0.5) }
  50% { -webkit-transform: translateX(42px) translateY(42px) rotate(-180deg) }
  75% { -webkit-transform: translateX(0px) translateY(42px) rotate(-270deg) scale(0.5) }
  100% { -webkit-transform: rotate(-360deg) }
}
 
@keyframes cubemove {
  25% {
    transform: translateX(42px) rotate(-90deg) scale(0.5);
    -webkit-transform: translateX(42px) rotate(-90deg) scale(0.5);
  } 50% {
    transform: translateX(42px) translateY(42px) rotate(-179deg);
    -webkit-transform: translateX(42px) translateY(42px) rotate(-179deg);
  } 50.1% {
    transform: translateX(42px) translateY(42px) rotate(-180deg);
    -webkit-transform: translateX(42px) translateY(42px) rotate(-180deg);
  } 75% {
    transform: translateX(0px) translateY(42px) rotate(-270deg) scale(0.5);
    -webkit-transform: translateX(0px) translateY(42px) rotate(-270deg) scale(0.5);
  } 100% {
    transform: rotate(-360deg);
    -webkit-transform: rotate(-360deg);
  }
}
```

## 动画效果五

<DotRoate/>

- HTML

```html
  <div class="dot-rotate">
    <div class="dot1"></div>
    <div class="dot2"></div>
  </div>
```

- CSS

```css
.dot-rotate {
  margin: 100px auto;
  width: 90px;
  height: 90px;
  position: relative;
  text-align: center;
   
  -webkit-animation: rotate 2.0s infinite linear;
  animation: rotate 2.0s infinite linear;
}
 
.dot1, .dot2 {
  width: 60%;
  height: 60%;
  display: inline-block;
  position: absolute;
  top: 0;
  background-color: #465EFB;
  border-radius: 100%;
   
  -webkit-animation: bounce 2.0s infinite ease-in-out;
  animation: bounce 2.0s infinite ease-in-out;
}
 
.dot2 {
  top: auto;
  bottom: 0px;
  -webkit-animation-delay: -1.0s;
  animation-delay: -1.0s;
}
 
@-webkit-keyframes rotate { 100% { -webkit-transform: rotate(360deg) }}
@keyframes rotate { 100% { transform: rotate(360deg); -webkit-transform: rotate(360deg) }}
 
@-webkit-keyframes bounce {
  0%, 100% { -webkit-transform: scale(0.0) }
  50% { -webkit-transform: scale(1.0) }
}
 
@keyframes bounce {
  0%, 100% {
    transform: scale(0.0);
    -webkit-transform: scale(0.0);
  } 50% {
    transform: scale(1.0);
    -webkit-transform: scale(1.0);
  }
}
```

## 动画效果六

<ScaleLoading/>

- HTML

```html
  <div class="scale-loading">
    <div class="bounce1"></div>
    <div class="bounce2"></div>
    <div class="bounce3"></div>
  </div>
```

- CSS

```css
.scale-loading {
  margin: 100px auto 0;
  width: 150px;
  text-align: center;
}
 
.scale-loading > div {
  width: 30px;
  height: 30px;
  background-color: #465EFB;
 
  border-radius: 100%;
  display: inline-block;
  -webkit-animation: bouncedelay 1.4s infinite ease-in-out;
  animation: bouncedelay 1.4s infinite ease-in-out;
  /* Prevent first frame from flickering when animation starts */
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
}
 
.scale-loading .bounce1 {
  -webkit-animation-delay: -0.32s;
  animation-delay: -0.32s;
}
 
.scale-loading .bounce2 {
  -webkit-animation-delay: -0.16s;
  animation-delay: -0.16s;
}
 
@-webkit-keyframes bouncedelay {
  0%, 80%, 100% { -webkit-transform: scale(0.0) }
  40% { -webkit-transform: scale(1.0) }
}
 
@keyframes bouncedelay {
  0%, 80%, 100% {
    transform: scale(0.0);
    -webkit-transform: scale(0.0);
  } 40% {
    transform: scale(1.0);
    -webkit-transform: scale(1.0);
  }
}

```

## 动画效果七

<GradientRotate/>

- HTML

```html
  <div class="gradient-rotate"></div>
```

- CSS

```css
.gradient-rotate {
  width: 40px;
  height: 40px;
  margin: 100px auto;
  background-color: #465EFB;
 
  border-radius: 100%; 
  -webkit-animation: scaleout 1.0s infinite ease-in-out;
  animation: scaleout 1.0s infinite ease-in-out;
}
 
@-webkit-keyframes scaleout {
  0% { -webkit-transform: scale(0.0) }
  100% {
    -webkit-transform: scale(1.0);
    opacity: 0;
  }
}
 
@keyframes scaleout {
  0% {
    transform: scale(0.0);
    -webkit-transform: scale(0.0);
  } 100% {
    transform: scale(1.0);
    -webkit-transform: scale(1.0);
    opacity: 0;
  }
}
```

## 动画效果八

<CircleLoading/>

- HTML

```html
<div class="circle">
    <div class="circle-container container1">
      <div class="circle1"></div>
      <div class="circle2"></div>
      <div class="circle3"></div>
      <div class="circle4"></div>
    </div>
    <div class="circle-container container2">
      <div class="circle1"></div>
      <div class="circle2"></div>
      <div class="circle3"></div>
      <div class="circle4"></div>
    </div>
    <div class="circle-container container3">
      <div class="circle1"></div>
      <div class="circle2"></div>
      <div class="circle3"></div>
      <div class="circle4"></div>
    </div>
  </div>
```

- CSS

```css
.circle {
  margin: 100px auto;
  width: 20px;
  height: 20px;
  position: relative;
}
 
.container1 > div, .container2 > div, .container3 > div {
  width: 6px;
  height: 6px;
  background-color: #465EFB;
 
  border-radius: 100%;
  position: absolute;
  -webkit-animation: bouncedelay 1.2s infinite ease-in-out;
  animation: bouncedelay 1.2s infinite ease-in-out;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
}
 
.circle .circle-container {
  position: absolute;
  width: 100%;
  height: 100%;
}
 
.container2 {
  -webkit-transform: rotateZ(45deg);
  transform: rotateZ(45deg);
}
 
.container3 {
  -webkit-transform: rotateZ(90deg);
  transform: rotateZ(90deg);
}
 
.circle1 { top: 0; left: 0; }
.circle2 { top: 0; right: 0; }
.circle3 { right: 0; bottom: 0; }
.circle4 { left: 0; bottom: 0; }
 
.container2 .circle1 {
  -webkit-animation-delay: -1.1s;
  animation-delay: -1.1s;
}
 
.container3 .circle1 {
  -webkit-animation-delay: -1.0s;
  animation-delay: -1.0s;
}
 
.container1 .circle2 {
  -webkit-animation-delay: -0.9s;
  animation-delay: -0.9s;
}
 
.container2 .circle2 {
  -webkit-animation-delay: -0.8s;
  animation-delay: -0.8s;
}
 
.container3 .circle2 {
  -webkit-animation-delay: -0.7s;
  animation-delay: -0.7s;
}
 
.container1 .circle3 {
  -webkit-animation-delay: -0.6s;
  animation-delay: -0.6s;
}
 
.container2 .circle3 {
  -webkit-animation-delay: -0.5s;
  animation-delay: -0.5s;
}
 
.container3 .circle3 {
  -webkit-animation-delay: -0.4s;
  animation-delay: -0.4s;
}
 
.container1 .circle4 {
  -webkit-animation-delay: -0.3s;
  animation-delay: -0.3s;
}
 
.container2 .circle4 {
  -webkit-animation-delay: -0.2s;
  animation-delay: -0.2s;
}
 
.container3 .circle4 {
  -webkit-animation-delay: -0.1s;
  animation-delay: -0.1s;
}
 
@-webkit-keyframes bouncedelay {
  0%, 80%, 100% { -webkit-transform: scale(0.0) }
  40% { -webkit-transform: scale(1.0) }
}
 
@keyframes bouncedelay {
  0%, 80%, 100% {
    transform: scale(0.0);
    -webkit-transform: scale(0.0);
  } 40% {
    transform: scale(1.0);
    -webkit-transform: scale(1.0);
  }
}
```

## 动画样式九

<Diverge/>

- HTML

```vue
<template>
  <div class="loading">
    <div class="loading-center">
      <div class="circle" id="circle_animation" v-for="item in animationList" :key="item" :style="item"></div>
      <div class="circle" id="circle_big"></div>
    </div>
  </div>
</template>
```

- JS

```typeScript
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

```

- CSS

```css

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
```

## 动画效果十

<RotationContraction/>

- HTML

```vue
<template>
  <div calss="loading">
    <div class="loading-center">
      <div v-for="item in animationList" :key="item" class="circle" id="circle_animation" :style="item"></div>
    </div>
  </div>
</template>
```

- JS

```typeScript
  const animationList:string[] = [
    '--translateFX: 90px; --translateSX: 180px;',
    '--translateFX: -90px; --translateSX: -180px;float:right;',
  ]
```

- CSS

```css
.loading {
  background-color: #465EFB;
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
```

## 动画效果11 旋转收缩

<Contraction/>

- HTML

```vue
<template>
  <div class="loading">
    <div class="loading-center">
      <div v-for="item in animationList" :key="item" class="circle" id="circle_animation" :style="item"></div>
    </div>
  </div>
</template>
```

- JS

```typeScript
const animationList: string[] = [
  '--translateX: 20px; --translateY: 20px;',
  '--translateX: -20px; --translateY: 20px;',
  '--translateX: 20px; --translateY: -20px;',
  '--translateX: -20px; --translateY: -20px;',
]
```

- CSS

```css
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
```

## 动画效果12 动态位置

<Moving/>

- HTML

```vue
<template>
  <div class="loading">
    <div class="loading-center">
      <div v-for="item in animationList" :key="item" id="circle_animation" class="circle" :style="item"></div>
    </div>
  </div>
</template>
```

- JS

```typeScript
const animationList: string[] = [
  '--delay:0s;',
  '--delay: -.4s;left:20px;',
  '--delay: -.8s;left:40px;',
  '--delay: -1.2s;left:60px;',
  '--delay: -1.6s;left:80px;',
]
```

- CSS

```css
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
```

## 动画效果13

<RiceRotate/>

- HTML

```vue
<template>
  <div class="loading">
    <div class="loading-center">
      <div v-for="item in animationList" :key="item" :style="item" class="circle" id="circle_animation"></div>
    </div>
  </div>
</template>
```

- JS

```typescript
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
```

- CSS

```css
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
```

## 动画效果14

<MusicDance/>

- HTML

```vue
<template>
  <div class="loading">
    <div class="loading-center">
      <div v-for="item in animationList" :key="item" :style="item" class="circle" id="circle_animation"></div>
    </div>
  </div>
</template>
```

- JS

```typescript
const animationList: string[] = [...Array(10).keys()].map((item: number) => {
  if (item ===10) {
    return 'margin-right:0px;'
  } else {
    return `-webkit-animation-delay:${item / 10}s;animation-delay:${item / 10}s;`
  }
})
```

- CSS

```css
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
```

## 动画效果15

<TriangleBloom/>

- HTML

```vue
<template>
  <div class="loading">
    <div class="loading-center">
      <div v-for="item in animationList" :key="item" :style="item" class="circle" id="circle_animation"></div>
    </div>
  </div>
</template>

```

- JS

```typescript
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
```

- CSS

```css
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
```
