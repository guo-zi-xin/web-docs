<template>
  <div class="content">
    <div class="g-container">
      <div v-for="item in itemList" :key="item"></div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const itemList: string[] = [...Array(32).keys()].map((item: number) => String(item))
</script>

<style lang="scss" scoped>
@use "sass:string";

$str: 'QWERTYUIOPASDFGHJKLZXCVBNMabcdefghigklmnopqrstuvwxyz123456789';
$length: str-length($str);
$size: 16;
$count: 41;

@function randomNum($max, $min: 0, $u: 1) {
  @return ($min + random($max)) * $u;
}

@function randomLinear($count) {
  $value: '';

  @for $i from 0 through ($count - 1) {
    $value: $value + randomColor() + string.unquote(" 0 #{$i * 16}px,");
  }

  @return linear-gradient(string.unquote(#{$value}) randomColor() 0 100%);
}

@function randomColor() {
  @return rgb(randomNum(255), randomNum(255), randomNum(255));
}

@function randomChar() {
  $r: random($length);
  @return str-slice($str, $r, $r);
}

@function randomChars($number) {
  $value: '';

  @if $number >0 {
    @for $i from 1 through $number {
      $value: $value + randomChar();
    }
  }

  @return $value;
}

body,
html {
  width: 100%;
  height: 100%;
  display: flex;
  background: #000;
  font-family: monospace;
}

.content {
  margin-bottom: 100px;
}

.g-container {
  position: relative;
  margin: auto;
  width: 512px;
  height: 512px;
  box-sizing: border-box;
  display: flex;
  animation: colorChange 1s steps(12) infinite;
  background-color: #000;

  div {
    position: relative;
    width: #{$size}px;
    height: 512px;
    flex-shrink: 0;

    &::before {
      content: randomChars(32);
      position: absolute;
      inset: 0;
      text-align: center;
      font-size: #{$size - 1}px;
      width: #{$size}px;
      text-align: center;
      word-break: break-all;
      line-height: #{$size}px;
      color: transparent;
    }

  }

  @for $i from 1 to $count {
    div:nth-child(#{$i}) {
      &::before {
        content: randomChars(32);
        --content1: "#{randomChars(32)}";
        --content2: "#{randomChars(32)}";
        --content3: "#{randomChars(32)}";
        --content4: "#{randomChars(32)}";
        animation: contentChange 1s infinite;
        background: randomLinear(32);
        background-clip: text;
        -webkit-background-clip: text;
      }
    }
  }
}


@keyframes colorChange {
  100% {
    filter: hue-rotate(360deg);
  }
}

@keyframes contentChange {
  20% {
    content: var(--content1);
  }

  40% {
    content: var(--content2);
  }

  60% {
    content: var(--content3);
  }

  80% {
    content: var(--content4);
  }
}
</style>