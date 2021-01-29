<template>
  <div class='footerBar' v-if="astState">
    <span class="noAct" v-if="astState === 1">{{lang.act_noStart}}</span>
    <span class="noAct" v-if="astState === 2">{{lang.act_end}}</span>
    <span class="signUp" @click="signUpClick()" v-if="astState === 3">{{lang.singUp}}</span>
    <div class="actIng" v-if="astState == 4">
      <div class="rank" :class="{noRank:nowUserMsg.rank == 0}">{{nowUserMsg.rank == 0?lang.noRank:nowUserMsg.rank}}</div>
      <div class="uerImg" @click="goUser(nowUserMsg.uid,nowUserMsg.kmic)">
        <img v-if="nowUserMsg.avatar_frame &&nowUserMsg.avatar_frame != ''" :src="nowUserMsg.avatar_frame" class="frame" alt="">
        <!-- <img src="../assets/img/testFrame.png" class="frame" alt=""> -->
        <img v-else-if="nowUserMsg.nob > 0" :src="require(`../img/nob/${nowUserMsg.nob}.png`)" class="nob" alt="">
        <img v-lazy="nowUserMsg.avatar" alt="" class="av">
      </div>
      <div class="nickBox">
        <div class="nick">{{nowUserMsg.nick}}</div>
        <div class="uid">{{nowUserMsg.uid}}</div>
      </div>
      <div class="score"><i class="coins"></i>{{nowUserMsg.score}}</div>
    </div>
    <div class="actIng" v-if="astState == 5">
      <div class="rank" :class="{noRank:nowUserMsg.rank == 0}">{{nowUserMsg.rank == 0?lang.noRank:nowUserMsg.rank}}</div>
      <div class="uerImg" @click="goKroom(nowUserMsg.info.rid)">
        <!-- <img v-if="nowUserMsg.avatar_frame &&nowUserMsg.avatar_frame != ''" :src="nowUserMsg.avatar_frame" class="frame" alt=""> -->
        <!-- <img src="../assets/img/testFrame.png" class="frame" alt=""> -->
        <!-- <img v-else-if="nowUserMsg.nob > 0" :src="require(`../img/nob/${nowUserMsg.nob}.png`)" class="nob" alt=""> -->
        <img v-lazy="nowUserMsg.info.pic_url" alt="" class="av room">
      </div>
      <div class="nickBox">
        <div class="nick">{{nowUserMsg.info.rname}}</div>
        <div class="uid">{{nowUserMsg.info.rid}} <i class="scoreIcon" :class="'icon'+nowUserMsg.rockt" v-if="nowUserMsg.rockt"></i> <i class="red_packet" v-if="nowUserMsg.red_packet"></i> </div>
      </div>
      <div class="score"><i></i>{{nowUserMsg.score}}</div>
    </div>
    <div class="mask" v-show="showGiftPup">
      <transition name="slide">
        <div class="signUp_suc" v-show="showGiftPup">
          <i class="close" @click="showGiftPup = false"></i>
          {{lang.singUp_suc}}
        </div>
      </transition>
    </div>
  </div>
</template>
<script>

import { mapState } from 'vuex'
import { signUp } from "../apis"
export default {
  data() {
    return {
      showGiftPup: false
    }
  },
  computed: {
    ...mapState(['step', 'tab', 'user_info', 'groupsUserMsg', 'reg']),
    astState() {
      if (this.step === 0) { //活动未开始
        return 1
      } else if (this.step === 2) { //活动已结束
        return 2
      } else if (!this.reg || this.isShare) { //活动开始未报名，或者分享
        return 3
      } else if (this.reg && this.tab == 0) { //活动开始已报名
        return 4
      } else if (this.reg && this.tab == 'total' && this.nowUserMsg.info.rid) { //活动开始已报名
        return 5
      }
    },
    nowUserMsg() {
      return this.groupsUserMsg[this.tab] ? this.groupsUserMsg[this.tab].msg : { info: {} }
    }
  },
  methods: {
    signUpClick() {
      signUp().then(res => {
        if (res.data.response_status.code == 0) {
          this.showGiftPup = true
          this.$store.dispatch('getInitInfo');
        } else {
          this.toast(res.data.response_status.error)
        }
      })
    },
    goKroom(rid) {
      location.href = `rid:${rid}`
    },
    goUser(uid, kmic) { //跳转
      if (kmic) {
        this.goKroom(kmic)
        return
      }
      location.href = `uid:${uid}`
    },
  }
}
</script>
<style lang="scss" scoped>
.footerBar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  height: 1.26rem;
  background: url(../img/footerBg.png);
  background-size: 100% 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  .signUp {
    width: 3.98rem;
    height: 1.25rem;
    background: url(../img/signUp.png);
    background-size: 100% 100%;
    text-align: center;
    font-size: 0.36rem;
    font-weight: 500;
    line-height: 1.25rem;
  }
  .actIng {
    width: 100%;
    height: 1.25rem;
    margin-top: 0.05rem;
    display: flex;
    align-items: center;
    margin-bottom: 0.04rem;
    .rank {
      width: 0.43rem;
      height: 0.6rem;
      color: rgba(199, 225, 255, 1);
      text-align: center;
      line-height: 0.6rem;
      margin: 0 0.25rem 0 0.8rem;
      font-weight: bold;
      white-space: nowrap;
      font-size: 0.36rem;
      color: #ffe344;
      &.noRank {
        width: 1rem;
        font-size: 0.21rem;
        margin-left: 0.8rem;
        white-space: pre-wrap;
        font-weight: normal;
        line-height: 0.3rem;
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
      .av {
        width: 0.88rem;
        height: 0.88rem;
        position: absolute;
        top: 0.1rem;
        left: 0.11rem;
        border-radius: 50%;
        &.room {
          border-radius: 0.14rem;
          border: 0.02rem solid rgba(251, 235, 137, 1);
        }
      }
    }
    .nickBox {
      margin-left: 0.2rem;
      .nick {
        width: 2.8rem;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        font-size: 0.32rem;
        color: rgba(255, 255, 255, 1);
      }
      .uid {
        color: rgba(226, 205, 255, 1);
        font-size: 0.28rem;
        margin-top: 0.1rem;
        display: flex;
        align-items: center;
        .scoreIcon {
          width: 1.29rem;
          height: 0.65rem;
          margin-left: 0.1rem;
          &.icon1 {
            background: url(../img/icon/icon_1.png);
            background-size: 100% 100%;
          }
          &.icon2 {
            background: url(../img/icon/icon_2.png);
            background-size: 100% 100%;
          }
          &.icon3 {
            background: url(../img/icon/icon_3.png);
            background-size: 100% 100%;
          }
          &.icon4 {
            background: url(../img/icon/icon_4.png);
            background-size: 100% 100%;
          }
          &.icon5 {
            width: 1.94rem;
            background: url(../img/icon/icon_5.png);
            background-size: 100% 100%;
          }
          &.icon100 {
            width: 1.94rem;
            background: url(../img/icon/icon_5.png);
            background-size: 100% 100%;
          }
        }
        .red_packet {
          width: 1.41rem;
          height: 0.57rem;
          margin-left: 0.1rem;
          background: url(../img/icon/red_packt.png);
          background-size: 100% 100%;
        }
      }
    }

    .score {
      display: flex;
      align-items: center;
      font-size: 0.28rem;
      margin-left: 0.35rem;
      color: rgba(255, 227, 68, 1);
      i {
        width: 0.25rem;
        height: 0.29rem;
        background: url(../img/fire.png);
        background-size: 100% 100%;
        margin-right: 0.1rem;
        &.coins {
          height: 0.25rem;
          background: url(../img/coinsIcon.png);
          background-size: 100% 100%;
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
  .signUp_suc {
    width: 4.77rem;
    height: 3.02rem;
    background: url(../img/toast_bg.png);
    background-size: 100% 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    .close {
      display: block;
      width: 0.64rem;
      height: 0.64rem;
      background: url(../img/close.png);
      background-size: 100% 100%;
      position: absolute;
      bottom: -1rem;
      left: 2.06rem;
    }
  }
}
</style>
