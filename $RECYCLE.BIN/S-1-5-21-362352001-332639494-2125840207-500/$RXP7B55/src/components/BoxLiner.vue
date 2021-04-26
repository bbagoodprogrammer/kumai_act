<template>
  <div class="boxLiner">
    <div class="scorll" ref="scorll" @click="scorllClick()">
      <div class="boxs">
        <div class="liner" :style="{width:linerWidth}">
          <span class="actLiner" :style="{width:actLinerWidth}"></span>
        </div>
        <div class="boxItem" v-for="(item,index) in list" :key="index">
          <div class="boxImg">
            <img :src="require(`../assets/img/boxImg/box_${item.lv}.png`)" alt="">
            <span class="lamp" :class="{act:lv>=item.lv}"></span>
            <i class="lock" v-if="lv<item.lv"></i>
          </div>
          <div class="lv">Lv.{{item.lv}}</div>
          <div class="score">{{item.score}}</div>
        </div>
      </div>
    </div>
    <span class="pre" @click="rollLeft()"></span>
    <span class="next" @click="rollRight()"></span>
  </div>
</template>
<script>
export default {
  data() {
    return {
      boxItemWidth: 0,
      index: 1,
      timer: null
    }
  },
  props: ['list', 'lv', 'score'],
  computed: {
    linerWidth() {
      return this.list.length * 1.71 - 1.2 + 'rem'
    },
    actLinerWidth() {
      const maxScore = this.list[this.list.length - 1].score
      const minScore = this.list[0].score
      for (let i = this.list.length - 1; i >= 0; i--) {
        if (this.score >= maxScore) {
          return "100%"
        } else if (this.score < minScore) {
          return "0%"
        } else if (this.score >= this.list[i].score) {
          if (i == 0) {
            let c = this.list[i + 1].score - this.list[i].score
            let t = this.score - this.list[i].score
            let a = (t / c) * 100 / 6
            return a + '%'
          } else {
            let c = this.list[i + 1].score - this.list[i].score
            let t = this.score - this.list[i].score
            let a = (t / c) * 100 / 8
            return (12.5 * i + a) + 0.4 + '%'
          }

        }
      }
    }
  },
  mounted() {
    setTimeout(() => {
      this.boxItemWidth = document.getElementsByClassName('boxItem')[0].clientWidth
      this.$refs.scorll.scrollTo(this.boxItemWidth * (5 - (this.lv - 1)), 0)
    }, 0)
  },
  methods: {
    rollLeft() {
      if (this.index > 0) {
        this.index--
        this.rollAmi('left')
      }
    },
    rollRight() {
      if (this.index < this.list.length - 4) {
        this.index++
        this.rollAmi('right')
      }
    },
    rollAmi(t) {
      clearInterval(this.timer)
      let scorllEnd = this.boxItemWidth * this.index
      let scorllLeft = this.$refs.scorll.scrollLeft
      let c = scorllEnd - scorllLeft + 20
      this.timer = setInterval(() => {
        scorllLeft = this.$refs.scorll.scrollLeft
        this.$refs.scorll.scrollTo(scorllLeft + (c / 6), 0)
        c -= c / 6
        if ((t == 'left' && c > -1) || (t == 'right' && c < 1)) {
          clearInterval(this.timer)
        }
      }, 25)
    },
    scorllClick() {
      clearInterval(this.timer)
    }
  }
}
</script>
<style lang="scss">
.boxLiner {
  width: 7.5rem;
  height: 2.32rem;
  background: url(../assets/img/boxBg.png) center bottom no-repeat;
  background-size: 100% 1.96rem;
  margin: 2rem 0;
  overflow: hidden;
  position: relative;
  direction: rtl;
  .scorll {
    width: 6.7rem;
    height: 2.2rem;
    margin: 0 auto;
    overflow-x: scroll;
    padding-top: 0.36rem;
    .boxs {
      display: inline-block;
      position: relative;
      white-space: nowrap;
      .liner {
        // width: 100%;
        height: 0.17rem;
        background: RGBA(129, 8, 216, 1);
        position: absolute;
        border-radius: 0.8rem;
        top: 0.3rem;
        left: 0.5rem;
        .actLiner {
          display: block;
          height: 0.17rem;
          border-radius: 0.4rem;
          position: absolute;
          right: 0;
          top: 0;
          background: url(../assets/img/boxImg/actLiner.png);
          background-size: auto 100%;
        }
      }
      .boxItem {
        display: inline-block;
        width: 1.72rem;
        height: 1.5rem;
        position: relative;
        z-index: 5;
        .boxImg {
          width: 1.56rem;
          height: 1.54rem;
          position: relative;
          top: -0.36rem;
          margin: 0 auto;
          img {
            width: 1rem;
            height: 1rem;
            position: absolute;
            left: 0.26rem;
          }
          .lamp {
            display: block;
            width: 100%;
            height: 100%;
            background: url(../assets/img/boxImg/lamp.png);
            background-size: 100% 100%;
            position: absolute;
            &.act {
              background: url(../assets/img/boxImg/lamp_act.png);
              background-size: 100% 100%;
            }
          }
          .lock {
            display: block;
            width: 0.3rem;
            height: 0.32rem;
            background: url(../assets/img/boxImg/lock.png);
            background-size: 100% 100%;
            position: absolute;
            top: 0.84rem;
            left: 0.6rem;
          }
        }
        .lv {
          width: 100%;
          text-align: center;
          font-weight: 500;
          position: absolute;
          z-index: 10;
          top: 0.8rem;
        }
        .score {
          width: 100%;
          text-align: center;
          font-weight: 500;
          color: rgba(255, 247, 159, 1);
          position: absolute;
          top: 1.1rem;
        }
      }
    }
  }
  .pre {
    display: block;
    width: 0.32rem;
    height: 0.45rem;
    background: url(../assets/img/boxImg/pre.png);
    background-size: 100% 100%;
    position: absolute;
    left: 0.1rem;
    top: 0.43rem;
  }
  .next {
    display: block;
    width: 0.32rem;
    height: 0.45rem;
    background: url(../assets/img/boxImg/next.png);
    background-size: 100% 100%;
    position: absolute;
    right: 0.1rem;
    top: 0.43rem;
  }
}
</style>
