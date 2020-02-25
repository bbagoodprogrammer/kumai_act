<template>
  <div class="footerBar">
    <div class="acrStatus">
      <div class="userMsg">
        <img v-lazy="user_msg.uinfo?user_msg.uinfo.avatar:''" alt="">
        <div class="name">{{user_msg.uinfo?user_msg.uinfo.nick:''}}</div>
        <div class="coinsbox">
          <span class="bi"><i></i> {{user_msg.coins}}</span>
          <span class="dou"><i></i>{{user_msg.beans}}</span>
        </div>
        <div class="topUp" @click="goTopUp()">
          Nạp xu
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import APP from '../utils/openApp'
export default {
  computed: {
    ...mapState(["isShare", "user_msg"]),
    // astState() {
    //   if (this.actStatus === 0) { //活动未开始
    //     return 0
    //   } else if (this.actStatus === 2) { //活动已结束
    //     return 2
    //   } else if ((this.actStatus === 1 && !this.registered) || this.isShare) { //活动开始未报名，或者分享
    //     return 1
    //   } else if (this.actStatus === 1 && this.registered) { //活动开始已报名
    //     return 3
    //   }
    // }
  },
  methods: {
    goTopUp() {
      if (this.isShare) {
        APP()
        return
      }
      location.href = "walletConfig://"
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
    height: 1.61rem;
    margin: auto;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    background: url(../assets/img/footerBg.png) no-repeat;
    background-size: 100% 100%;
    .userMsg {
      width: 100%;
      height: 1rem;
      margin-top: 0.3rem;
      padding: 0 0.3rem;
      display: flex;
      align-items: center;
      img {
        width: 1rem;
        height: 1rem;
        border-radius: 50%;
        border: 0.02rem solid rgba(255, 255, 255, 1);
      }
      .name {
        width: 1.9rem;
        color: #46396a;
        max-width: 1.9rem;
        margin-left: 0.1rem;
        text-align: left;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      .coinsbox {
        height: 100%;
        margin-left: 0.3rem;
        span {
          display: block;
          width: 1.32rem;
          height: 0.38rem;
          color: #fff6ad;
          font-size: 85%;
          line-height: 0.38rem;
          padding-left: 0.23rem;
          text-align: center;
          background: url(../assets/img/coinsBg.png);
          background-size: 100% 100%;
          position: relative;
          &.bi {
            i {
              display: block;
              width: 0.45rem;
              height: 0.45rem;
              background: url(../assets/img/GoldCoin.png);
              background-size: 100% 100%;
              position: absolute;
              left: -0.2rem;
              top: -0.05rem;
            }
          }
          &.dou {
            margin-top: 0.15rem;
            i {
              display: block;
              width: 0.43rem;
              height: 0.43rem;
              background: url(../assets/img/Goldenbeans.png);
              background-size: 100% 100%;
              position: absolute;
              left: -0.2rem;
              top: -0.02rem;
            }
          }
        }
      }
      .topUp {
        width: 2rem;
        height: 0.8rem;
        line-height: 0.8rem;
        color: #833700;
        margin-left: 0.29rem;
        background: url(../assets/img/topUp.png);
        background-size: 100% 100%;
      }
    }
  }
}
</style>
