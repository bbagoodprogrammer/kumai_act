<template>
  <div class="fightTabTime">
    <div class="actTime">
      <div class="timeTips">
        <p v-if="actStatus == 0">本期打擂日榜開始倒計時</p>
        <p v-else-if="actStatus == 1">هذا العدد التنازلي لانتهاء قائمة PK اليوم</p>
        <p v-else>本期打擂已結束</p>
      </div>
      <div class="timeDown" v-if="surplusTime.day">
        <div class="day">
          <strong>{{surplusTime.day}}</strong>
          <em>يوم</em>
        </div>
        <div class="hours">
          <strong>{{surplusTime.hour}}</strong>
          <em>ساعة</em>
        </div>
        <div class="min">
          <strong>{{surplusTime.minute}}</strong>
          <em>دقيقة</em>
        </div>
        <div class="second">
          <strong>{{surplusTime.second}}</strong>
          <em>ثانية</em>
        </div>
      </div>
    </div>
    <div class="tabs">
      <span class="myStandings" @click="goStandings()"></span>
      <span class="myVote" @click="goMyVote()"></span>
      <span class="rank" @click="goRank()"></span>
    </div>
  </div>
</template>
<script>
import downTime from '../utils/downTime.js'
import getString from "../utils/getString"
import { mapState } from "vuex"
import APP from '../utils/openApp'
export default {
  data () {
    return {
      surplusTime: {}
    }
  },
  computed: {
    ...mapState(['downScoend', 'isShare', 'actStatus'])
  },
  watch: {
    downScoend (val) {
      console.log(val)
      this.downTimeGo('time', val)
    }
  },
  methods: {
    downTimeGo (timeName, val) {
      downTime(timeName, val);
      this.surplusTime = downTime(timeName);
      this.timer = setInterval(() => {
        this.surplusTime = downTime(timeName);
        if (this.surplusTime.end) {
          clearInterval(this.timer)
          this.actStatus = 2
          // this.$store.commit("changday_down_time", 0)  //當天剩餘時間
        }
      }, 1000)
    },
    goStandings () {
      if (this.isShare) {
        APP()
        return
      }
      let regstr = getString('token')
      location.href = `./myStandings.html?token=${regstr}`

    },
    goMyVote () {
      if (this.isShare) {
        APP()
        return
      }
      let regstr = getString('token')
      location.href = `./myVote.html?token=${regstr}`

    },
    goRank () {
      if (this.isShare) {
        APP()
        return
      }
      let regstr = getString('token')
      location.href = `./rank.html?token=${regstr}`

    }
  }
}
</script>
<style lang="scss">
.fightTabTime {
  height: 2.7rem;
  .actTime {
    height: 0.91rem;
    text-align: center;
    color: rgba(255, 232, 176, 1);
    .timeTips {
      // height: 0.7rem;
      p {
        font-size: 0.26rem;
      }
    }
    .timeDown {
      width: 4rem;
      height: 0.45rem;
      padding: 0 0.25rem;
      margin: 0.12rem auto 0;
      display: flex;
      justify-content: space-between;
      > div {
        height: 100%;
        line-height: 0.45rem;
        display: inline-block;
        strong {
          font-size: 0.3rem;
          font-weight: bold;
          color: rgba(255, 242, 156, 1);
        }
        em {
          font-size: 0.24rem;
          color: rgba(221, 211, 255, 1);
        }
      }
    }
  }
  .tabs {
    padding: 0 0.45rem;
    height: 1.38rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 0.15rem;
    span {
      width: 1.92rem;
      height: 1.38rem;
    }
    .myStandings {
      background: url(../assets/img/myStandings.png);
      background-size: 100% 100%;
    }
    .myVote {
      background: url(../assets/img/myVote.png);
      background-size: 100% 100%;
    }
    .rank {
      background: url(../assets/img/rank.png);
      background-size: 100% 100%;
    }
  }
}
</style>
