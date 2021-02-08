<template>
  <div class="Integral">
    <div class="ownerScore">
      <span>{{lang.ownerScore}}</span>
      <div class="ownerLiner">
        <div class="linerMark"></div>
        <div class="actLiner" :style="{width:actWidth}" :class="{min:myScore >= 1000}"></div>
        <div class="scoreNums">
          <span class="numsItem" v-for="(item,index) in ownerScore" :key="index">{{item}}</span>
        </div>
      </div>
    </div>
    <div class="totalScore">
      <span>{{lang.allScore}}</span>
      <div class="ownerLiner">
        <div class="linerMark"></div>
        <div class="actLiner" :style="{width:all_actWidth}" :class="{min:all_score >= 500000}"></div>
        <div class="scoreNums">
          <span class="numsItem" v-for="(item,index) in totalScore" :key="index">{{APP_NAME=='singnow'?item/1000:item/10000}}{{lang.wan}}</span>
        </div>
      </div>
    </div>
    <div class="linerTips" v-html="lang.integralTips">
    </div>
  </div>
</template>
<script>

import { mapState } from 'vuex'
export default {
  data() {
    return {
      // ownerScore: [1000, 8000, 10000, 20000, 50000],
      // totalScore: [500000, 1500000, 3000000, 5000000, 8000000]
    }
  },
  computed: {
    ...mapState(['myScore', 'all_score']),
    APP_NAME() {
      return APP_NAME
    },
    actWidth() {
      let arr = this.ownerScore
      for (let i = arr.length - 1; i >= 0; i--) {
        if (this.myScore >= arr[arr.length - 1]) {
          return '100%'
        } else if (this.myScore >= arr[i]) {
          let c = arr[i + 1] - arr[i]
          let t = this.myScore - arr[i]
          let a = (t / c) * 100 / 5
          return (25 * i + a) + '%'
        } else if (this.myScore < arr[0]) {
          // return this.myScore / arr[0] / 5 * 100 - 3.5 + '%'
          return '0%'
        }
      }
    },
    all_actWidth() {
      let arr = this.totalScore
      for (let i = arr.length - 1; i >= 0; i--) {
        if (this.all_score >= arr[arr.length - 1]) {
          return '100%'
        } else if (this.all_score >= arr[i]) {
          let c = arr[i + 1] - arr[i]
          let t = this.all_score - arr[i]
          let a = (t / c) * 100 / 5
          return (25 * i + a - 1.5) + '%'
        } else if (this.all_score < arr[0]) {
          // return this.all_score / arr[0] / 5 * 100 - 3.5 + '%'
          return '0%'
        }
      }
    },
    ownerScore() {
      return _lang.ownerScoreConfig
    },
    totalScore() {
      return _lang.totalScoreConfig
    }
  }
}
</script>
<style lang="scss" scoped>
.Integral {
  width: 7.05rem;
  height: 2.46rem;
  background: url(../img/integral_bg.png);
  background-size: 100% 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin: 0 auto;
  .ownerLiner {
    width: 4.27rem;
    height: 0.26rem;
    background: url(../img/liner_bg2.png);
    background-size: 100% 100%;
    position: relative;
    margin-left: 0.15rem;
    .linerMark {
      position: absolute;
      width: 100%;
      height: 100%;
      background: url(../img/linerBg.png);
      background-size: 100% 100%;
      z-index: 2;
    }
    .actLiner {
      max-width: 96%;
      position: absolute;
      z-index: 1;
      height: 0.14rem;
      background: linear-gradient(-90deg, #fffed4 0%, #ffe869 100%);
      opacity: 0.8;
      border-radius: 0.07rem;
      top: 0.06rem;
      left: 0.1rem;
      &.min {
        min-width: 1.5%;
      }
    }
    .scoreNums {
      width: 5.2rem;
      color: rgba(254, 226, 192, 1);
      display: flex;
      align-items: center;
      justify-content: space-between;
      position: absolute;
      bottom: -0.35rem;
      left: -0.3rem;
      span {
        flex: 1;
      }
    }
  }
  .ownerScore,
  .totalScore {
    margin-top: 0.3rem;
    color: rgba(255, 220, 223, 1);
    font-size: 0.22rem;
    display: flex;
    align-items: center;
    span {
      width: 1.5rem;
      text-align: center;
      white-space: nowrap;
      margin-right: 0.15rem;
    }
  }
  .linerTips {
    text-align: center;
    color: rgba(255, 198, 212, 1);
    text-align: center;
    font-size: 0.22rem;
    margin-top: 0.5rem;
  }
}
</style>
