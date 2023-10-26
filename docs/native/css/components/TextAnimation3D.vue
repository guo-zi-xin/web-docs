<template>
  <div class="perspective">
    <div class="container">
      <div v-for="d in panelList" :key="d" class="g-panel">
        <div v-for="item in itemList" :key="item"></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const itemList: string[] = [...Array(32).keys()].map((item: number) => String(item))
const panelList: string[] = [...Array(6).keys()].map((item: number) => String(item))

</script>

<style lang="scss" scoped>
$str: '◁▣▤▥▦▧♂♀♥☻►◄▧▨♦！@~￥%…&*（）—+【】「」《》，。？、QWERTYUIOPASDFGHJKLZXCVBNMabcdefghigklmnopqrstuvwxyz123456789';
$length: str-length($str);
$size: 16;
$count: 41;

@function randomNum($max, $min: 0, $u: 1) {
    @return ($min + random($max)) * $u;
}

@function randomLinear() {    
    @return linear-gradient(
        randomColor() 0 25px, randomColor() 0 50px, randomColor() 0 75px, randomColor() 0 100px,
        randomColor() 0 125px, randomColor() 0 150px, randomColor() 0 175px, randomColor() 0 200px,
        randomColor() 0 225px, randomColor() 0 250px, randomColor() 0 275px, randomColor() 0 300px,
        randomColor() 0 325px, randomColor() 0 350px, randomColor() 0 375px, randomColor() 0 400px,
        randomColor() 0 425px, randomColor() 0 450px, randomColor() 0 475px, randomColor() 0 500px,
        randomColor() 0 525px, randomColor() 0 550px, randomColor() 0 575px, randomColor() 0 600px,
        randomColor() 0 625px, randomColor() 0 650px, randomColor() 0 675px, randomColor() 0 700px,
        randomColor() 0 725px, randomColor() 0 750px, randomColor() 0 775px, randomColor() 0 800px,
        randomColor() 0 825px, randomColor() 0 850px, randomColor() 0 875px, randomColor() 0 900px,
        randomColor() 0 925px, randomColor() 0 950px, randomColor() 0 975px, randomColor() 0 1000px,
        randomColor() 0 1025px, randomColor() 0 1050px, randomColor() 0 1075px, randomColor() 0 1100px,
        randomColor() 0 1125px, randomColor() 0 1150px, randomColor() 0 1175px, randomColor() 0 1200px,
        randomColor() 0 1225px, randomColor() 0 1250px, randomColor() 0 1275px, randomColor() 0 1300px,
        randomColor() 0 1325px, randomColor() 0 1350px, randomColor() 0 1375px, randomColor() 0 1400px,
        randomColor() 0 1425px, randomColor() 0 1450px, randomColor() 0 1475px, randomColor() 0 1500px,
        randomColor() 0 1525px, randomColor() 0 1550px, randomColor() 0 1575px, randomColor() 0 1600px,
        randomColor() 0 1625px, randomColor() 0 1650px, randomColor() 0 1675px, randomColor() 0 1700px,
        randomColor() 0 1725px, randomColor() 0 1750px, randomColor() 0 1775px, randomColor() 0 1800px,
        randomColor() 0 1825px, randomColor() 0 1850px, randomColor() 0 1875px, randomColor() 0 1900px,
        randomColor() 0 1925px, randomColor() 0 1950px, randomColor() 0 1975px, randomColor() 0 2000px,
    );
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

    @if $number > 0 {
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

.g-panel {
    position: relative;
    width: 512px;
    height: 512px;
    box-sizing: border-box;
    display: flex;
    animation: colorChange 1s steps(12) infinite;
    
    div {
        position: relative;
        width: #{$size}px;
        height: 512px;
        flex-shrink: 0;
        
        &::before {
            content: randomChars(80);
            position: absolute;
            inset: 0;
            text-align: center;
            font-size: #{$size - 1}px;
            width: #{$size}px;
            text-align: center;
            word-break: break-all;
            overflow: hidden;
            line-height: #{$size}px;
            color: transparent;
            background: randomLinear();
            background-clip: text;
            -webkit-background-clip: text;
        }
        
    }
    
    
    @for $i from 1 to $count {
        div:nth-child(#{$i}) {
            &::before {
                content: randomChars(80);
                --content1: "#{randomChars(80)}";
                --content2: "#{randomChars(80)}";
                --content3: "#{randomChars(80)}";
                --content4: "#{randomChars(80)}";
                animation: contentChange 1s infinite;
                background: randomLinear();
                -webkit-background-clip: text;
                background-clip: text;
            }
        }
    }
}


@keyframes colorChange {
    100% {
        filter: hue-rotate(360deg);
    }
}
@keyframes scaleChange {
    100% {
        transform: scale(1.2);
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

.perspective {
	margin: auto;
	transform-style: preserve-3d;
	perspective: 300px;
}

.container {
	width: 800px;
	height: 800px;
	transform-style: preserve-3d;
  transform: translateY(-100px) translateZ(200px) rotateX(30deg)
}

.g-panel {
    position: absolute;
    width: 800px;
    height: 800px;
    inset: 0;
    box-shadow: inset 0 0 50px 20px #170437;
}

@for $i from 1 through 5 {
    .g-panel:nth-child(#{$i}) {
        height: 1200px;
        background: rgba(0,0,0, 1);
        transform: rotateY(($i * 90deg)) translateZ(400px);
    }
}

.g-panel:nth-child(5) {
    width: 800px;
    height: 800px;
    background: rgba(0,0,0, 1);
    transform: rotateX(90deg) translateZ(400px); 
    animation: falldown 8s infinite alternate,
        colorChange 1s steps(12) infinite;
    
    &::before {
        animation: contentChange 1s infinite;
    }
}

@keyframes rotate {
	0% {
		transform: rotateY(0deg);
	}
	100% {
		transform: rotateY(-720deg);
	}
}

@keyframes falldown {
    100% {
        transform: rotateX(90deg) translateZ(100px); 
    }
}
</style>