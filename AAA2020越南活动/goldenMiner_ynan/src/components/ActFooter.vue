<template>
  <div class="footerBar">
    <div class="acrStatus">
      <span class="noAct" v-if="astState === 0">{{lang.noAct}}</span>
      <span class="noAct" v-if="astState === 2">{{lang.actEd}}</span>
      <span class="goAct" v-if="astState === 1" @click="singUp()">{{lang.singUp}}</span>
      <div class="actIng" v-if="astState === 3" :class="'rank'+myrank.rank">
        <div class="rank" :class="{min:myrank.rank == 0}">{{myrank.rank==0?lang.noRank:myrank.rank}}</div>
        <div class="imgBox">
          <div class="defaultImg"></div>
          <img v-lazy="userMsg.avatar" alt="" class="userImg">
        </div>
        <div class="userMsg">
          <div class="dayScore">{{lang.todayScore}} {{today_wealth}}</div>
          <div class="totalScore">{{lang.totalScore}} {{myrank.score}}</div>
        </div>
        <div class="lastRank">{{lang.lastRank}}{{myrank.gap}}</div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import api from "../api/apiConfig"
import { globalBus } from '../utils/eventBus'
export default {
  computed: {
    ...mapState(['actStatus', 'userMsg', "isShare", "myrank", 'today_wealth']),
    astState() {
      if (this.actStatus === 0) { //活动未开始
        return 0
      } else if (this.actStatus === 2) { //活动已结束
        return 2
      } else if (!this.userMsg.registered || this.isShare) { //活动开始未报名，或者分享
        return 1
      } else if (this.userMsg.registered) { //活动开始已报名
        return 3
      }
    }
  },
  methods: {
    singUp() {
      globalBus.$emit('commonEvent', (callback) => {
        api.singUp().then(res => {
          const { response_data, response_status } = res.data
          if (response_status.code == 0) {
            this.$parent.getDefaultData()
            this.vxc('setUserMsg', response_data.user_info)
          } else {
            this.vxc('setToast', {
              msg: response_status.error
            })
          }
        })

      })
    }
  }
}
</script>
<style lang="scss">
.footerBar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  .acrStatus {
    width: 7.5rem;
    height: 1.26rem;
    margin: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    background: url(../assets/img/footer.png) no-repeat;
    background-size: 100% 100%;
    span {
      display: inline-block;
    }
    .noAct {
      font-size: 0.38rem;
      font-weight: 700;
    }
    .goAct {
      width: 3.46rem;
      height: 1.04rem;
      background: url(../assets/img/singUp.png);
      background-size: 100% 100%;
      text-align: center;
      line-height: 1.04rem;
      font-size: 0.36rem;
      color: rgba(255, 240, 157, 1);
      -webkit-text-stroke: 1.5px #6d2c06;
      text-stroke: 1.5px #6d2c06;
    }
    .actIng {
      width: 7.5rem;
      height: 1.26rem;
      display: flex;
      align-items: center;
      .rank {
        width: 0.73rem;
        height: 0.65rem;
        margin-left: 0.3rem;
        text-align: center;
        color: #fffeaf;
        font-weight: 700;
        font-size: 0.36rem;
        display: flex;
        align-items: center;
        justify-content: center;
        &.min {
          font-size: 0.24rem;
        }
      }
      .imgBox {
        position: relative;
        width: 1.09rem;
        height: 1.09rem;
        margin-left: 0.09rem;
        .defaultImg {
          width: 1.09rem;
          height: 1.09rem;
          background: url(../assets/img/defaultBg.png);
          background-size: 100% 100%;
          position: absolute;
          z-index: 1;
        }
        .userImg {
          width: 1rem;
          height: 1rem;
          position: absolute;
          border-radius: 50%;
          top: 0.045rem;
          left: 0.045rem;
        }
      }
      .userMsg {
        font-size: 0.24rem;
        font-weight: 700;
        margin-left: 0.17rem;
        width: 2.6rem;
        .dayScore {
          width: 3.5rem;
        }
        .dayScore,
        .totalScore {
          color: #fff992;
        }
      }
      .lastRank {
        font-size: 0.24rem;
        color: #fff992;
        font-weight: 500;
        margin: 0.27rem 0 0 0.15rem;
      }
      &.rank1 {
        .rank {
          background: url(../assets/img/1.png);
          background-size: 100% 100%;
          text-indent: -999rem;
        }
        .defaultImg {
          width: 1.11rem;
          height: 1.25rem;
          background: url(../assets/img/top1.png);
          background-size: 100% 100%;
          top: -0.2rem;
          left: -0.04rem;
        }
      }
      &.rank2 {
        .rank {
          background: url(../assets/img/2.png);
          background-size: 100% 100%;
          text-indent: -999rem;
        }
        .defaultImg {
          width: 1.11rem;
          height: 1.25rem;
          background: url(../assets/img/top2.png);
          background-size: 100% 100%;
          top: -0.2rem;
          left: -0.04rem;
        }
      }
      &.rank3 {
        .rank {
          background: url(../assets/img/3.png);
          background-size: 100% 100%;
          text-indent: -999rem;
        }
        .defaultImg {
          width: 1.11rem;
          height: 1.25rem;
          background: url(../assets/img/top3.png);
          background-size: 100% 100%;
          top: -0.2rem;
          left: -0.04rem;
        }
      }
    }
  }
}
</style>
