<template>
  <div class="footer" v-if="astState">
    <div class="acrStatus">
      <div class="act_not" v-if="astState == 0">活動未開始</div>
      <div class="act_not" v-else-if="astState == 2">活動已結束</div>
      <div class="singUp" @click="singUp()" v-else-if="astState == 1">立即報名</div>
      <div class="rankMsg" v-else-if="astState == 3" :class="'rank' + userRank.rank">
        <div class="listRank" :class="{noRank:!userRank.rank}">{{userRank.rank?userRank.rank:'未上榜'}}</div>
        <div class="uerImg" @click="goUser(userRank.info.uid)">
          <img v-if="userRank.info.avatar_frame &&userRank.info.avatar_frame != ''" :src="userRank.info.avatar_frame" class="frame" alt="">
          <!-- <img src="../assets/img/testFrame.png" class="frame" alt=""> -->
          <!-- <img v-else-if="userRank.info.nob > 0" :src="require(`../img/nob/${userRank.info.nob}.png`)" class="nob" alt=""> -->
          <img v-lazy="userRank.info.avatar" alt="" class="av">
        </div>
        <div class="msg">
          <div class="nick">{{userRank.info.nick}}</div>
          <div class="uid">距離上一名還差{{userRank.gap}}朵</div>
        </div>
        <div class="score">
          <i></i>
          <em>{{userRank.score}}</em>
        </div>
      </div>
    </div>

  </div>
</template>

<script>

import { mapState } from 'vuex'
import { globalBus } from '../utils/eventBus'
import { singUp } from "../apis"
export default {
  computed: {
    ...mapState(['step', 'reg', 'tab', 'userRank']),
    astState () {
      if (this.step === 0) { //活动未开始
        return 0
      } else if (this.step === 2) { //活动已结束
        return 2
      } else if (!this.reg || this.isShare) { //活动开始未报名，或者分享
        return 1
      } else if (this.reg && this.tab == 2) {
        return 3
      }
    },
  },
  methods: {
    singUp () {

      singUp().then(res => {
        if (res.data.response_status.code == 0) {
          this.toast('報名成功！')
          this.$parent.init()
        } else {
          this.toast(res.data.response_status.error)
        }
      })

    }
  }
}
</script>

<style lang="scss">
.footer {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  .acrStatus {
    width: 7.5rem;
    height: 1.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    background: url(../img/footerBg.png);
    background-size: 100% 100%;
    .act_not {
      margin-top: 0.3rem;
      font-size: 0.32rem;
      font-weight: 600;
      color: rgba(101, 72, 209, 1);
    }
    .singUp {
      width: 3.98rem;
      height: 1.67rem;
      background: url(../img/singUpBg.png);
      background-size: 100% 100%;
      font-size: 0.36rem;
      color: rgba(101, 72, 209, 1);
      text-align: center;
      line-height: 1.67rem;
      font-weight: 600;
      margin-top: 0.1rem;
    }
    .rankMsg {
      height: 1.4rem;
      display: flex;
      align-items: center;
      margin-bottom: 0.1rem;
      position: relative;
      .listRank {
        width: 0.87rem;
        height: 0.7rem;
        line-height: 0.7rem;
        text-align: center;
        &.noRank {
          font-size: 0.26rem;
          line-height: 0.7rem;
          white-space: nowrap;
        }
      }
      .uerImg {
        width: 1.1rem;
        height: 1.1rem;
        position: relative;
        .nob {
          width: 1.1rem;
          height: 1.1rem;
          position: absolute;
          top: 0rem;
          left: 0rem;
          z-index: 10;
        }
        .frame {
          width: 1.5rem;
          height: 1.5rem;
          position: absolute;
          top: -0.21rem;
          left: -0.2rem;
          z-index: 10;
        }
        .room_frame {
          width: 0.94rem;
          height: 0.94rem;
          position: absolute;
          top: 0.055rem;
          left: 0.065rem;
          z-index: 10;
        }
        .av {
          width: 0.88rem;
          height: 0.88rem;
          position: absolute;
          top: 0.1rem;
          left: 0.11rem;
          border-radius: 50%;
          border: 0.02rem solid rgba(213, 199, 240, 1);
          &.room {
            border-radius: 0.14rem;
            &.noBor {
              border: none;
            }
          }
        }
      }
      .msg {
        width: 2.6rem;
        margin-left: 0.18rem;
        .nick {
          color: rgba(234, 236, 255, 1);
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
        .uid {
          font-size: 0.26rem;
          color: rgba(182, 239, 255, 1);
        }
      }
      .score {
        display: flex;
        align-items: center;
        color: rgba(255, 245, 137, 1);
        margin-left: 0.3rem;
        i {
          width: 0.5rem;
          height: 0.5rem;
          background: url(../img/flower.png);
          background-size: 100% 100%;
          margin-right: 0.08rem;
        }
      }
      &.rank1 {
        .listRank {
          text-indent: -999rem;
          background: url(../img/top1.png) center center no-repeat;
          background-size: 0.44rem 0.55rem;
        }
      }
      &.rank2 {
        .listRank {
          text-indent: -999rem;
          background: url(../img/top2.png) center center no-repeat;
          background-size: 0.44rem 0.55rem;
        }
      }
      &.rank3 {
        .listRank {
          text-indent: -999rem;
          background: url(../img/top3.png) center center no-repeat;
          background-size: 0.44rem 0.55rem;
        }
      }
    }
  }
}
</style>