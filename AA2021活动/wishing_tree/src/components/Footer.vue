<template>
  <div class="footerBar">
    <div class="acrStatus">
      <div class="act_not" v-if="astState == 0">{{lang.act_not}}</div>
      <div class="act_not" v-else-if="astState == 2">{{lang.act_end}}</div>
      <div class="singUp" @click="singUp()" v-else-if="astState == 1">{{lang.singUp}}</div>
      <div class="actIng" v-else-if="astState === 3" :class="'rank' + nowMsg.rank">
        <i class="day_tips" v-if="tab != 'total'">{{act_day}}</i>
        <div class="rank" :class="{not_rank:nowMsg.rank == 0}">{{nowMsg.rank == 0?lang.noRank:nowMsg.rank}}</div>
        <div class="imgBox" @click="goUser(nowMsg.userinfo.uid)">
          <img v-if="nowMsg.userinfo.avatar_frame && nowMsg.userinfo.avatar_frame != ''" :src="nowMsg.userinfo.avatar_frame" class="frame" alt="">
          <!-- <img src="../assets/img/testFrame.png" class="frame" alt=""> -->
          <img v-else-if="nowMsg.userinfo.noble > 0" :src="require(`../img/nob/${nowMsg.userinfo.noble}.png`)" class="nob" alt="">
          <img v-lazy="nowMsg.userinfo.avatar" alt="" class="av">
        </div>
        <div class="msg">
          <div class="nick">{{nowMsg.userinfo.nick}}</div>
          <div class="add">UID:{{nowMsg.userinfo.uid}}</div>
        </div>
        <div class="score">
          <div class="lv"><i></i><em class="lvScore">{{nowMsg.score}}</em> </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import { globalBus } from '../utils/eventBus'
import { singUp } from "../apis"
import getDate from "../utils/getDate"

export default {
  computed: {
    ...mapState(['step', 'reg', 'tab', 'groupsUserMsg', "isShare", "dateArr", "c_day"]),
    astState() {
      if (this.step === 0) { //活动未开始
        return 0
      } else if (this.step === 2) { //活动已结束
        return 2
      } else if (!this.reg || this.isShare) { //活动开始未报名，或者分享
        return 1
      } else if (this.reg) {
        return 3
      }
    },
    nowMsg() {
      return this.groupsUserMsg[this.tab] ? this.groupsUserMsg[this.tab].msg : { userinfo: {} }
    },
    act_day() {
      return getDate(new Date(this.dateArr[this.tab - 1] * 1000), 3)
    }
  },
  methods: {
    singUp() {
      globalBus.$emit('commonEvent', () => {
        singUp().then(res => {
          if (res.data.response_status.code == 0) {
            this.toast(`報名成功！`)
            this.$parent.init()
          } else {
            this.toast(res.data.response_status.error)
          }
        })

      })
    },
    commitSong() {
      globalBus.$emit('commonEvent', () => {
        // let token = getString('token')
        location.href = `./index3.html?token=${token}`
      })
    },
    goUser(uid) { //跳转
      location.href = `uid:${uid}`
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
    height: 2.53rem;
    display: flex;
    align-items: center;
    justify-content: center;
    background: url(../img/footerBg.png);
    background-size: 100% 100%;
    .act_not {
      margin-top: 1.3rem;
      font-size: 0.32rem;
      font-weight: 600;
      color: rgba(145, 77, 68, 1);
    }
    .singUp {
      width: 2.98rem;
      height: 0.88rem;
      background: url(../img/singUpBg.png);
      background-size: 100% 100%;
      font-size: 0.36rem;
      color: rgba(145, 77, 68, 1);
      text-align: center;
      line-height: 0.95rem;
      font-weight: 600;
      margin-top: 1.3rem;
    }
    .actIng {
      width: 100%;
      height: 1.35rem;
      display: flex;
      align-items: center;
      margin-top: 1.5rem;
      .day_tips {
        display: block;
        width: 0.85rem;
        height: 0.35rem;
        background: url(../img/day_tips.png);
        background-size: 100% 100%;
        font-size: 0.24rem;
        text-align: center;
        line-height: 0.35rem;
        position: absolute;
        right: 0;
        top: 1.31rem;
      }
      .rank {
        width: 0.75rem;
        height: 0.65rem;
        font-size: 0.36rem;
        font-weight: bold;
        color: rgba(249, 134, 154, 1);
        margin-left: 0.3rem;
        white-space: nowrap;
        &.not_rank {
          font-size: 0.26rem;
          font-weight: 600;
        }
      }
      .imgBox {
        width: 1.1rem;
        height: 1.1rem;
        position: relative;
        margin: 0 0.18rem;
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
        .av {
          width: 0.88rem;
          height: 0.88rem;
          border: 0.04rem solid rgba(247, 224, 160, 1);
          box-sizing: border-box;
          top: 0.1rem;
          left: 0.11rem;
          border-radius: 50%;
          position: absolute;
        }
      }
      .msg {
        width: 1.8rem;
        .nick {
          font-size: 0.28rem;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          color: rgba(145, 77, 68, 1);
        }
        .add {
          color: rgba(235, 168, 104, 1);
          font-size: 0.24rem;
          margin-top: 0.15rem;
          white-space: nowrap;
        }
      }
      .score {
        flex: 1;
        width: 2.58rem;
        .lv {
          display: flex;
          align-items: center;
          justify-content: center;
          i {
            width: 0.41rem;
            height: 0.42rem;
            background: url(../img/gift_icon.png);
            background-size: 100% 100%;
            margin-right: 0.15rem;
          }
          em {
            font-size: 0.24rem;
            color: rgba(249, 121, 145, 1);
            font-weight: bold;
          }
        }
        .iconScore {
          display: flex;
          align-items: center;
          justify-content: flex-end;
          font-size: 0.26rem;
          margin-top: 0.15rem;
          white-space: nowrap;
          > span {
            font-size: 0.26rem;
            // display: flex;
            // align-items: center;
            // justify-content: center;
            // i {
            //   width: 0.36rem;
            //   height: 0.36rem;
            //   margin-right: 0.05rem;
            // }
            // .sIcon1 {
            //   background: url(../assets/img/rank/sIcon1.png);
            //   background-size: 100% 100%;
            // }
            // .sIcon2 {
            //   background: url(../assets/img/rank/sIcon2.png);
            //   background-size: 100% 100%;
            // }
          }
          .luck_ed {
            width: 0.64rem;
            height: 0.32rem;
            background: linear-gradient(90deg, #ff4571 0%, #ff67b2 100%);
            border-radius: 0.16rem;
            font-size: 0.21rem;
            margin-left: 0.1rem;
            text-align: center;
            line-height: 0.32rem;
          }
        }
      }
      &.rank1 {
        .rank {
          text-indent: -999rem;
          background: url(../img/top1.png);
          background-size: 100% 100%;
        }
      }
      &.rank2 {
        .rank {
          text-indent: -999rem;
          background: url(../img/top2.png);
          background-size: 100% 100%;
        }
      }
      &.rank3 {
        .rank {
          text-indent: -999rem;
          background: url(../img/top3.png);
          background-size: 100% 100%;
        }
      }
    }
  }
}
</style>
