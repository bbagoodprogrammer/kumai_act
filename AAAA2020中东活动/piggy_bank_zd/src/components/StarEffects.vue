<template>
  <div class="starEffects" :class="{rig:index == 1}">
    <span>
      <img src="../assets/img/ani1.png" alt="">
    </span>
    <span>
      <img src="../assets/img/ani2.png" alt="">
    </span>
    <span>
      <img src="../assets/img/ani1.png" alt="">
    </span>
    <span>
      <img src="../assets/img/ani2.png" alt="">
    </span>
    <span>
      <img src="../assets/img/ani1.png" alt=""> </span>
    <span>
      <img src="../assets/img/ani2.png" alt=""> </span>
    <span>
      <img src="../assets/img/ani1.png" alt=""> </span>
    <span>
      <img src="../assets/img/ani2.png" alt="">
    </span>
    <span>
      <img src="../assets/img/ani1.png" alt="">
    </span>
    <span>
      <img src="../assets/img/ani2.png" alt="">
    </span>
    <span>
      <img src="../assets/img/ani1.png" alt="">
    </span>
    <span>
      <img src="../assets/img/ani2.png" alt="">
    </span>
    <span>
      <img src="../assets/img/ani1.png" alt="">
    </span>
    <span>
      <img src="../assets/img/ani2.png" alt="">
    </span>
    <span>
      <img src="../assets/img/ani1.png" alt="">
    </span>
    <span>
      <img src="../assets/img/ani2.png" alt="">
    </span>
    <span>
      <img src="../assets/img/ani1.png" alt="">
    </span>
    <span>
      <img src="../assets/img/ani2.png" alt="">
    </span>
    <span>
      <img src="../assets/img/ani1.png" alt="">
    </span>
    <span>
      <img src="../assets/img/ani2.png" alt="">
    </span>
  </div>
</template>

<script>
/*
<button @click="getStar">Get one star</button>
<StarEffects :stop="stop" />

export default {
    data() {
        return {
            stop: false,
        };
    },
    methods: {
        getStar() {
            this.stop = true;
            setTimeout(() => {
                alert('You got one star', () => {
                    this.stop = false;
                });
            }, 2000);
        }
    },
    components: {
        StarEffects,
    },
};
*/

const updateTick = 25; //每25毫秒更新一次，即40帧
const fireTick = 300; //每秒发射一个新的星星
const moveTick = 5; //每帧移动的距离（单位：像素）
let moveRoundTime = 1000; //从下到上移动一圈用时

function getRand(start, end) {
  const len = end - start;
  return start + Math.random() * len;
}
function getIntRand(start, end) {
  const len = end - start;
  return start + Math.round(Math.random() * len);
}

export default {
  props: ['stop', 'index'],
  data() {
    return {
      nodes: [],
      width: 0,
      height: 0,
      updateTimer: null,
      fireTimer: null,
      lightNode: null,
    };
  },
  // watch: {
  //   stop(newValue) {
  //     if (newValue === true) {
  //       clearInterval(this.updateTimer);
  //       clearInterval(this.fireTimer);

  //       const offset = 20; //主要用于过滤抓取到顶部贴近边缘显示不完整的星星（底部因为本身是从0开始的，几乎不用设置offset）
  //       const nodes = this.nodes.filter(node => node.active && node.bottom < this.height - offset);
  //       const lightIndex = getIntRand(0, nodes.length - 1);
  //       for (let i = 0; i < nodes.length; i++) {
  //         const node = nodes[i];
  //         if (lightIndex == i) {
  //           node.style.opacity = 1;
  //           node.className = 'light';
  //           this.lightNode = node;
  //         } else {
  //           node.style.opacity = .2;
  //         }
  //       }
  //     } else {
  //       if (this.lightNode) {
  //         //摘得星星从天空中消失
  //         this.lightNode.className = '';
  //         this.lightNode.style.bottom = '-10000px';
  //         this.recovery(this.lightNode);
  //       }

  //       this.updateTimer = setInterval(this.update, updateTick);
  //       this.fireTimer = setInterval(this.fire, fireTick);
  //     }
  //   },
  // },
  mounted() {
    this.nodes = Array.prototype.slice.call(this.$el.getElementsByTagName('span'));
    setTimeout(() => {
      this.width = this.$el.clientWidth;
      this.height = this.$el.clientHeight;
      moveRoundTime = this.height / (1000 / updateTick * moveTick) * 1000;
    }, 0);
    // requestAnimationFrame(this.update)
    this.updateTimer = setInterval(this.update, updateTick);
    this.fireTimer = setInterval(this.fire, fireTick);

    document.addEventListener('visibilitychange', this.visibilityChange);
  },
  destroyed() {
    this.destroy();
  },
  methods: {
    fire() {
      const nodes = this.nodes.filter(node => node.active !== true);
      if (nodes.length === 0) {
        return false;
      }

      const node = nodes[getIntRand(0, nodes.length - 1)];

      const scale = getRand(1.2, 1.5);
      const angle = getRand(0, 360);
      node.scale = scale
      node.angle = angle
      node.style.transform = `scale(${scale}) rotate(${angle}deg)`;

      const initLeft = this.width / 2 - node.clientWidth / 2;
      const initBottom = 0;
      const initDirection = getRand(-.2, .2); //决定左右移动速度（向上移动是每帧moveTick像素）
      node.left = initLeft;
      node.bottom = initBottom;
      node.direction = initDirection;
      node.style.left = initLeft + 'px';
      node.style.bottom = initBottom + 'px';

      node.opacity = .2;
      node.style.opacity = .2;

      node.active = true;
    },
    recovery(node) {
      node.active = false;
      node.opacity = 0;
    },
    update() {
      for (let i = 0; i < this.nodes.length; i++) {
        const node = this.nodes[i];
        if (node.active) {
          const nodeWidth = node.clientWidth;

          node.opacity += 1 / (moveRoundTime / updateTick) * 2;
          node.style.opacity = node.opacity;

          node.scale += 1 / (moveRoundTime / updateTick);
          node.angle += 100 / (moveRoundTime / updateTick);
          node.style.transform = `scale(${node.scale}) rotate(${node.angle}deg`;

          node.left += moveTick * node.direction;
          // 控制到边界反转方向
          // if (node.left <= nodeWidth || node.left >= this.width) {
          //     node.direction *= -1;
          // }
          node.style.left = node.left + 'px';

          node.bottom += moveTick;
          node.style.bottom = node.bottom + 'px';

          if (node.bottom > this.height + 10) {
            this.recovery(node);
          }
        }
      }
      // requestAnimationFrame(this.update)
    },
    visibilityChange() {
      if (document.hidden) {
        clearInterval(this.updateTimer);
        clearInterval(this.fireTimer);
      } else {
        this.updateTimer = setInterval(this.update, updateTick);
        this.fireTimer = setInterval(this.fire, fireTick);
      }
    },
    destroy() {
      clearInterval(this.updateTimer);
      clearInterval(this.fireTimer);
      document.removeEventListener('visibilitychange', this.visibilityChange);
    },
  },
}
</script>

<style lang="scss">
@keyframes starAnimation {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
.starEffects {
  width: 2rem;
  height: 4.5rem;
  position: relative;
  pointer-events: none;
  overflow: hidden;
  // border: 0.01rem solid #ccc;
  transform: rotate(150deg);
  position: absolute;
  left: 0.8rem;
  top: -1.5rem;
  &.rig {
    left: 4.7rem;
    top: -1.5rem;
    transform: rotate(210deg);
  }
  span {
    position: absolute;
    // opacity: 0;
    transition: opacity 0.3s;
    -webkit-user-select: none;
    user-select: none;
    img {
      width: 0.7rem;
      height: 0.7rem;
      transform: scale(0.4);
    }
    &.light {
      animation: starAnimation 0.5s linear infinite alternate;
    }
  }
}
</style>