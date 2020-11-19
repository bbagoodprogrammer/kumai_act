<template>
  <div class="footer" :class="'status' + footerState" @click="singUp()" v-if="footerState != 7">
    <div class="msg" v-if="footerState != 0 & footerState != 1 && footerState != 2 ">
      <div class="rank" :class="[{noRank:petMsg.rank == 0},'top' + petMsg.rank]" v-if="footerState == 5">{{petMsg.rank == 0?lang.noRank:petMsg.rank}}</div>
      <div class="rank" :class="[{noRank:nowMsg.rank == 0},'top' + nowMsg.rank]" v-else-if="footerState!=6">{{nowMsg.rank== 0?lang.noRank:nowMsg.rank}}</div>
      <div class="imgBox" @click="goUser(userImg.uid)" :class="{ml:footerState == 6}">
        <img v-if="userImg.avatar_frame &&userImg.avatar_frame != ''" :src="userImg.avatar_frame" class="frame" alt="">
        <!-- <img src="../assets/img/testFrame.png" class="frame" alt=""> -->
        <img v-else-if="userImg.nob > 0" :src="require(`../assets/img/nob/${userImg.nob}.png`)" class="nob" alt="">
        <img v-lazy="userImg.avatar" alt="" class="av">
      </div>
      <div class="tips" v-if="footerState == 3">
        <div class="name">{{lang.myScore}}{{nowMsg.score}}</div>
        <div class="name" v-if="nowMsg.gap > 0">{{lang.lastRankScore}}{{nowMsg.gap}}</div>
      </div>
      <div class="tips" v-else-if="footerState == 4">
        <div class="name">{{lang.myScore2}}{{nowMsg.score}}</div>
        <div class="name" v-if="nowMsg.gap > 0">{{lang.lastRankScore2}}{{nowMsg.gap}}</div>
      </div>
      <div class="petTips" v-else-if="footerState == 5">
        <img :src="petsImg" alt="">
        <div class="score">{{petMsg.score}}</div>
      </div>
      <div class="tips" v-else-if="footerState == 6">
        <p>{{lang.storeNum}}{{storeMsg.score}}</p>
        <div class="score" v-if="storeMsg.rank == 1">{{lang.numTips2}}{{storeMsg.gap}} <i class="coins"></i> </div>
        <div class="score" v-else-if="storeMsg.rank != 0">{{lang.numTips3}}{{storeMsg.gap}}<i class="coins"></i></div>
        <div class="score" v-else>{{lang.numTips4}}{{storeMsg.gap}}<i class="coins"></i></div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import { globalBus } from '../utils/eventBus'
import api from "../api/apiConfig"
export default {
  computed: {
    ...mapState(['actStatus', 'groupsUserMsg', 'storeType', 'storeUser', 'registered', 'act_index', 'tab', 'tab1_type', 'pets', 'petUserMsg', 'userInfo']),
    footerState() {
      if (this.actStatus == 0) {
        return 0
      } else if (this.actStatus == 2) {
        return 1
      } else if (!this.registered && this.act_index != 4 && this.act_index != 5) {
        return 2
      } else if (this.act_index == 1 && this.tab1_type == 2) {
        return 3
      } else if (this.act_index == 2) {
        return 4
      } else if (this.act_index == 3) {
        return 5
      } else if (this.act_index == 4 && this.registered) {
        return 6
      } else if (this.act_index == 5) {
        return 7
      } else {
        return 7
      }
    },
    nowMsg() {
      return this.groupsUserMsg[this.act_index] ? this.groupsUserMsg[this.act_index].msg : {}
    },
    petsImg() {
      return this.pets[this.tab] ? this.pets[this.tab].img : ''
    },
    petMsg() {
      return this.petUserMsg[this.tab] ? this.petUserMsg[this.tab].msg : {}
    },
    userImg() {
      return this.userInfo ? this.userInfo : {}
    },
    storeMsg() {
      console.log(this.storeUser, this.storeType)
      return this.storeUser[this.storeType] ? this.storeUser[this.storeType] : {}
    }
  },
  methods: {
    singUp() {
      if (this.footerState != 2) return
      globalBus.$emit('commonEvent', () => {
        api.singUp().then(res => {
          if (res.data.response_status.code == 0) {
            this.vxc('setRegistered', true)
          } else {
            this.vxc('setToast', {
              title: this.lang.singUpNo,
              msg: res.data.response_status.error
            })
          }
        })
      })
    },
    goUser(uid) {
      location.href = `uid:${uid}`
    },
  }
}
</script>
<style lang="scss">
.footer {
  position: fixed;
  z-index: 1000;
  bottom: 0;
  .msg {
    width: 7.5rem;
    height: 1.46rem;
    display: flex;
    align-items: center;
    font-size: 0.26rem;
    background: url(../assets/img/footer/footerBg.png) no-repeat;
    background-size: 100% 100%;
    .rank {
      width: 0.51rem;
      height: 0.67rem;
      line-height: 0.67rem;
      text-align: center;
      font-size: 0.26rem;
      margin: 0 0.22rem 0 0.52rem;
      &.noRank {
        width: 0.8rem;
        margin: 0 0.22rem 0 0.52rem;
        line-height: 0.25rem;
      }
      &.top1 {
        text-indent: 999rem;
        background: url(../assets/img/top1.png);
        background-size: 100% 100%;
      }
      &.top2 {
        text-indent: 999rem;
        background: url(../assets/img/top2.png);
        background-size: 100% 100%;
      }
      &.top3 {
        text-indent: 999rem;
        background: url(../assets/img/top3.png);
        background-size: 100% 100%;
      }
    }
    .imgBox {
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
      }
      &.ml {
        margin-left: 0.7rem;
      }
    }
    .tips {
      margin-left: 0.18rem;
      .score {
        display: flex;
        align-items: center;
        .coins {
          width: 0.35rem;
          height: 0.37rem;
          background: url(../assets/img/coins2.png);
          background-size: 100% 100%;
          margin-left: 0.08rem;
        }
      }
    }
    .petTips {
      display: flex;
      align-items: center;
      margin-left: 3.4rem;
      img {
        width: 0.6rem;
        height: 0.6rem;
        margin-right: 0.05rem;
      }
    }
  }
  &.status0 {
    width: 7.5rem;
    height: 0.97rem;
    background: url(../assets/img/footer/noStart.png) no-repeat;
    background-size: 100% 100%;
  }
  &.status1 {
    width: 7.5rem;
    height: 0.97rem;
    background: url(../assets/img/footer/acted.png) no-repeat;
    background-size: 100% 100%;
  }
  &.status2 {
    width: 7.5rem;
    height: 0.97rem;
    background: url(../assets/img/footer/singUp.png) no-repeat;
    background-size: 100% 100%;
  }
}
</style>
