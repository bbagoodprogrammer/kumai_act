<template>
  <div class="place">
    <div class="mouse"><img :style="{transform:'translate3d(0,'+translateY+'rem,0) scale3d('+scaleY+','+scaleY+',1)'}" :src="mouseImg"></div>
    <div v-if="isSupportedTouch" @touchstart="hit" class="hit"></div>
    <div v-else @click="hit" class="hit"></div>
  </div>
</template>

<script>
import c from '../config/game';
import { isSupportedTouch } from '../utils';

const mouseImages = [
  require('../img/gray_mouse.png'),
  require('../img/yellow_mouse.png'),
  require('../img/gray_mouse_hit.png'),
  require('../img/yellow_mouse_hit.png'),
];

export default {
  props: ['place'],
  data() {
    return {
      translateY: 0,
      speed: 0,
      clicked: false,

      tickTimer: null,
      stayTimer: null,
    };
  },
  computed: {
    isSupportedTouch() {
      return isSupportedTouch;
    },
    mouseImg() {
      return mouseImages[this.place.type];
    },
    scaleY() {
      return Math.max(.8, Math.abs(this.translateY) * 0.56);
    },
    scaleX() {
      return this.place.rand > .5 ? this.scaleY : this.scaleY * -1;
    },
  },
  watch: {
    translateY(newY) {
      if (newY == c.MIN_TRANSLATE_Y) {
        this.stayTimer = setTimeout(() => {
          clearTimeout(this.stayTimer);
          this.speed = c.SPEED;
        }, c.STAY_TIME);
      }
    },
    place(info) {
      if (info.running) {
        this.speed = c.SPEED * -1;
      }
    },
  },
  mounted() {
    this.startTimer()
  },
  destroyed() {
    this.stopTimer();
  },
  methods: {
    startTimer() {
      this.tickTimer = setInterval(this.tick, c.TICK_TIME);
    },
    stopTimer() {
      clearInterval(this.tickTimer);
      clearTimeout(this.stayTimer);
    },
    tick() {
      const newTranslateY = Math.min(0, Math.max(c.MIN_TRANSLATE_Y, this.translateY + this.speed));
      this.translateY = newTranslateY;
      if (newTranslateY == 0) {
        clearTimeout(this.stayTimer);
        this.speed = 0;
        this.clicked = false;
        this.$emit('reset', this.place);
      }
    },
    hit() {
      if (this.clicked) {
        return;
      }

      this.clicked = true;
      this.place.$el = this.$el;
      if (this.place.running) {
        clearTimeout(this.stayTimer);
        this.speed = 0;
        setTimeout(() => {
          this.speed = c.SPEED;
        }, c.HIT_STAY_TIME);
      }
      this.$emit('hit', this.place);
    },
  },
}
</script>

<style lang="scss">
.place {
  width: 1.47rem;
  height: 1.47rem;
  position: relative;
  background: url("../img/place.png") center bottom no-repeat;
  background-size: 100% auto;
  margin: 0 0.09rem;
  .mouse,
  .hit {
    position: absolute;
    width: 1.47rem;
    left: 0;
    bottom: 0.14rem;
    border-radius: 2rem;
    overflow: hidden;
  }
  .mouse {
    img {
      width: 100%;
      position: relative;
      bottom: -1.8rem;
    }
  }
  .hit {
    height: 1.47rem;
    cursor: pointer;
    user-select: none;
  }
}
</style>