<template>
  <div class="timeDown">
    <div class="time">
      <div class="timeDown" v-if="actStatus == 1">
        活動還有:{{surplusTime.day}}天{{surplusTime.hour}}時{{surplusTime.minute}}分{{surplusTime.second}}秒
      </div>

    </div>
    <div class="nums">
      <span v-for="(item,index) in numStr" :key="index">
        <i :class="[{zi:index== 0 && prize<10000},'num' + item]"></i>
      </span>
      <i class="liner"></i>
    </div>
    <div class="timeTips">
      獎池初始值為3000金幣 <br />每成功推薦一個人獎池增加10金幣，獎池10000金幣封頂
    </div>
  </div>
</template>
<script>

import downTime from "../utils/downTime"
import { mapState } from "vuex"

export default {
  data() {
    return {
      surplusTime: {},
    }
  },
  computed: {
    ...mapState(['actStatus', 'ctime', 'etime', 'prize']),
    numStr() {
      if (this.prize < 10000) {
        return `0${this.prize}`.split('')
      }
      return this.prize.toString().split('')
    }
  },
  watch: {
    actStatus(val) {
      if (val == 1) {
        console.log(this.etime - this.ctime)
        this.downTimeGo('time', this.etime - this.ctime)
      }
    }
  },
  created() {

  },
  methods: {
    downTimeGo(timeName, val) {
      clearInterval(this.timer)
      if (!downTime(timeName)) {
        downTime(timeName, val);
      }
      this.surplusTime = downTime(timeName);
      this.timer = setInterval(() => {
        this.surplusTime = downTime(timeName);
        if (this.surplusTime.end) {
          clearInterval(this.timer)
        }
      }, 1000)
    },
  }
}
</script>
<style lang="scss">
.timeDown {
  width: 7.5rem;
  height: 3.27rem;
  background: url(../assets/img/timeBg.png);
  background-size: 100% 100%;
  position: relative;
  .time {
    height: 0.6rem;
    line-height: 0.6rem;
    text-align: center;
    font-size: 0.28rem;
    text-shadow: rgba(16, 20, 77, 1) 0.02rem 0 0,
      rgba(16, 20, 77, 1) 0 0.02rem 0, rgba(16, 20, 77, 1) -0.02rem 0 0,
      rgba(16, 20, 77, 1) 0 -0.02rem 0;
  }
  .nums {
    height: 1.3rem;
    padding: 0 0.41rem;
    margin-top: 0.3rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: relative;
    span {
      flex: 1;
      font-size: 0.8rem;
      font-weight: bold;
      text-align: center;
      display: flex;
      align-items: center;
      justify-content: center;
      i {
        display: block;
        width: 0.57rem;
        height: 0.81rem;
        &.num0 {
          background: url(../assets/img/nums/0.png);
          background-size: 100% 100%;
        }
        &.num1 {
          background: url(../assets/img/nums/1.png);
          background-size: 100% 100%;
        }
        &.num2 {
          background: url(../assets/img/nums/2.png);
          background-size: 100% 100%;
        }
        &.num3 {
          background: url(../assets/img/nums/3.png);
          background-size: 100% 100%;
        }
        &.num4 {
          background: url(../assets/img/nums/4.png);
          background-size: 100% 100%;
        }
        &.num5 {
          background: url(../assets/img/nums/5.png);
          background-size: 100% 100%;
        }
        &.num6 {
          background: url(../assets/img/nums/6.png);
          background-size: 100% 100%;
        }
        &.num7 {
          background: url(../assets/img/nums/7.png);
          background-size: 100% 100%;
        }
        &.num8 {
          background: url(../assets/img/nums/8.png);
          background-size: 100% 100%;
        }
        &.num9 {
          background: url(../assets/img/nums/9.png);
          background-size: 100% 100%;
        }
        &.zi {
          background: url(../assets/img/nums/0_1.png);
          background-size: 100% 100%;
        }
      }
    }
    .liner {
      width: 6.85rem;
      height: 0.25rem;
      background: url(../assets/img/timeLiner.png);
      background-size: 100% 100%;
      position: absolute;
    }
  }
  .timeTips {
    text-align: center;
    color: rgba(255, 255, 255, 0.8);
    font-size: 0.22rem;
    position: relative;
    z-index: 10;
  }
}
</style>
