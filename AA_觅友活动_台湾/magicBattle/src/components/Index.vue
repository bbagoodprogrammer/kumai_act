<template>
  <div class="page pageIndex">
    <div class="header">
      <div class="act_title"></div>
      <div class="timeBox">
        <p class="tmStatus">
          <i class="liner_l"></i>
          <strong>戰鬥結束倒計時</strong>
          <i class="liner_r"></i>
        </p>
        <div class="actTime">
          <span>{{surplusTime.day}}</span>
          <em>{{lang.day}}</em>
          <span>{{surplusTime.hour}}</span>
          <em>{{lang.hour}}</em>
          <span>{{surplusTime.minute}}</span>
          <em>{{lang.minute}}</em>
          <span>{{surplusTime.second}}</span>
          <em>{{lang.second}}</em>
        </div>
      </div>
    </div>

    <MagicLand />
    <Otsuge />
    <Rank />
  </div>
</template>

<script>
import downTime from "../utils/downTime"
import MagicLand from "./MagicLand"
import { mapState } from "vuex"
import Otsuge from "./Otsuge"
import Rank from "./Rank"

export default {
  components: { MagicLand, Otsuge, Rank },
  data () {
    return {
      surplusTime: {}
    }
  },
  computed: {
    ...mapState(['activity'])
  },
  watch: {
    activity (val) {
      this.downTimeGo('time', val.seconds)
    }
  },
  methods: {
    downTimeGo (timeName, val) {
      clearInterval(this.timer)
      if (!downTime(timeName)) {
        downTime(timeName, val);
      }
      this.surplusTime = downTime(timeName);
      this.timer = setInterval(() => {
        this.surplusTime = downTime(timeName);
        if (this.surplusTime.end) {
          clearInterval(this.timer)
          // this.$store.commit("changday_down_time", 0)  //當天剩餘時間
        }
      }, 1000)
    },
  }
}
</script>

<style lang="scss">
.pageIndex {
  background: RGBA(21, 0, 54, 1) url(../img/bg.png) no-repeat 0 3.08rem;
  background-size: 100% auto;
  .header {
    height: 4.36rem;
    .timeBox {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      margin-top: -0.3rem;
      .tmStatus {
        display: flex;
        align-items: center;
        justify-content: center;
        strong {
          font-size: 0.24rem;
          color: rgba(254, 196, 27, 1);
        }
        font-size: 0.24rem;
        .liner_l {
          width: 1.67rem;
          height: 0.21rem;
          background: url(../img/liner_l.png);
          background-size: 100% 100%;
          margin-right: 0.44rem;
        }
        .liner_r {
          width: 1.67rem;
          height: 0.21rem;
          background: url(../img/liner_r.png);
          background-size: 100% 100%;
          margin-left: 0.44rem;
        }
      }
      .actTime {
        height: 1rem;
        display: flex;
        align-items: center;
        span {
          width: 0.72rem;
          height: 0.72rem;
          text-align: center;
          line-height: 0.72rem;
          font-size: 0.48rem;
          font-weight: 700;
          border-radius: 0.1rem;
        }
        em {
          font-size: 0.22rem;
          margin: 0.1rem 0.15rem 0 0.15rem;
          color: rgba(216, 165, 32, 1);
        }
      }
    }
  }

  img {
    display: block;
    width: 100%;
  }
}
</style>