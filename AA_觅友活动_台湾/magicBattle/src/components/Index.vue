<template>
  <div class="page pageIndex">
    <a @click.prevent="onRefresh" href="" :style="{transform:'rotate('+rotatePx+'deg)'}" id="refresh"></a>
    <div class="header">
      <RoolMsg />
      <div class="ruleTips">
        <span @click="showRule = true">{{lang.index_rultTips1}}</span>
        <span @click="showHistory = true">{{lang.index_rultTips2}}</span>
      </div>
      <div class="act_title"></div>
      <div class="timeBox">
        <p class="tmStatus">
          <i class="liner_l"></i>
          <strong>{{lang.index_downTm}}</strong>
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
    <div class="mask" v-show="showHistory">
      <transition name="slide">
        <History v-if="showHistory" />
      </transition>
    </div>

    <div class="mask" v-show="showRule">
      <transition name="slide">
        <Rule v-if="showRule" />
      </transition>
    </div>

    <div class="mask" v-show="first">
      <transition name="slide">
        <div class="firstIn" v-show="first">
          <i class="close" @click="first = false"></i>
          <div class="firstInTitle">
            <i class="liner_l"></i>
            <strong>{{lang.firstTipsTitle}}</strong>
            <i class="liner_r"></i>
          </div>
          <div class="imgBox">
          </div>
          <p class="firstTips">{{lang.firstTips}}</p>
          <div class="join" @click="singUp()">{{lang.join}}</div>
          <p class="singUpTips">{{lang.singUpTips}}</p>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import downTime from "../utils/downTime"
import MagicLand from "./MagicLand"
import { mapState } from "vuex"
import Otsuge from "./Otsuge"
import Rank from "./Rank"
import { singUp } from "../apis"
import History from "./History"
import Rule from "./Rule"
import RoolMsg from "./RoolMsg"



export default {
  components: { MagicLand, Otsuge, Rank, History, Rule, RoolMsg },
  data () {
    return {
      first: false,
      surplusTime: {},
      showHistory: false,
      showRule: false,
      rotatePx: 0,    //刷新旋转动画
      rotatec: 0,
    }
  },
  computed: {
    ...mapState(['activity', 'owner', 'rank']),
  },
  watch: {
    activity (val) {
      this.downTimeGo('time', val.seconds)
    },
    owner (val) {
      console.log(val)
      if (val.team_id == 0) {
        this.first = true
      }
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
    singUp () {
      singUp().then(res => {
        if (res.data.response_status.code == 0) {
          const team_id = res.data.response_data.team_id
          this.toast(this.lang.singUpSuc.replace('%n', this.rank[team_id - 1].name).replace('%s', this.rank[team_id - 1].score).replace('%b', this.rank[team_id - 1].rank))
          this.first = false
          setTimeout(() => {
            this.$store.dispatch('getInitInfo');
          }, 800)
        } else {
          this.toast(res.data.response_status.error)
        }
      })
    },
    onRefresh (val) {
      this.rotatePx = 540 * ++this.rotatec  //旋转动画
      this.$store.dispatch('getInitInfo');
    },
  }
}
</script>

<style lang="scss">
.pageIndex {
  background: RGBA(21, 0, 54, 1) url(../img/bg.png) no-repeat 0 3.08rem;
  background-size: 100% auto;
  padding-bottom: 2rem;
  .header {
    height: 4.36rem;
    position: relative;
    .ruleTips {
      position: absolute;
      top: 3.57rem;
      right: 0;
      z-index: 5;
      span {
        display: block;
        width: 1.53rem;
        height: 0.52rem;
        background: url(../img/ruleTips.png);
        background-size: 100% 100%;
        margin-bottom: 0.04rem;
        text-align: center;
        line-height: 0.52rem;
        font-size: 0.24rem;
        text-indent: 0.2rem;
      }
    }
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
  .firstIn {
    width: 6rem;
    height: 7.32rem;
    padding: 0 0.5rem;
    background: url(../img/firstIn.png);
    background-size: 100% 100%;
    position: relative;
    .close {
      display: block;
      width: 0.79rem;
      height: 0.78rem;
      background: url(../img/close.png);
      background-size: 100% 100%;
      position: absolute;
      right: 0.44rem;
      top: 0;
    }
    .firstInTitle {
      margin-top: 0.5rem;
      text-align: center;
      color: #330D0E;
      display: flex;
      align-items: center;
      justify-content: center;
      .liner_l {
        width: 1.67rem;
        height: 0.21rem;
        background: url(../img/liner_l2.png);
        background-size: 100% 100%;
        margin-right: 0.15rem;
      }
      strong {
        flex: 1;
        font-size: 0.28rem;
      }
      .liner_r {
        width: 1.67rem;
        height: 0.21rem;
        background: url(../img/liner_r2.png);
        background-size: 100% 100%;
        margin-left: 0.15rem;
      }
    }
    .imgBox {
      width: 2.79rem;
      height: 2.64rem;
      margin: 0.13rem auto 0;
      background: url(../img/first.png);
      background-size: 100% 100%;
    }
    .firstTips {
      font-size: 0.28rem;
      color: #96451D;
      padding: 0 0.5rem;
      line-height: 0.34rem;
      margin-top: 0.06rem;
    }
    .singUpTips {
      text-align: center;
      color: #561C26;
      font-size: 0.24rem;
    }
    .join {
      width: 3.03rem;
      height: 0.94rem;
      text-align: center;
      line-height: 0.94rem;
      background: url(../img/join.png);
      background-size: 100% 100%;
      margin: 0 auto;
    }
  }
  img {
    display: block;
    width: 100%;
  }
}
#refresh {
  display: block;
  width: 1rem;
  height: 1rem;
  position: fixed;
  right: 0.08rem;
  bottom: 2rem;
  background: url(../img/refresh.png) no-repeat;
  background-size: contain;
  transition: all 1s;
  text-indent: -999rem;
  z-index: 100;
}
</style>