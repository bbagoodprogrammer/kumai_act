<template>
  <div class="box">
    <!-- <div class="shareBar" v-if="isShare">
      <div class="bar" @click="downApp()"></div>
    </div>
    <div class="header">
      <span class="ruleTips" :class="{top:isShare}" @click="goRule()"></span>
    </div>-->
    <div class="tunrnHeader">
      <span class="back" @click="closeWeb()"></span>
      <div class="tabs">
        <span class="glod" :class="{active:showCom == 'GoldTrun'}" @click="tabClick('GoldTrun')">القرص الدوار الذهبي</span>
        <span class="silver" :class="{active:showCom == 'SilverTrun' }" @click="tabClick('SilverTrun')">القرص الدوار الفضي</span>
        <em class="liner"></em>
        <i :class="{silver:showCom == 'SilverTrun'}"></i>
      </div>
    </div>
    <trun-msg></trun-msg>
    <keep-alive>
      <component :is="showCom"></component>
    </keep-alive>
    <act-footer :showCom="showCom"></act-footer>
    <loading></loading>
    <transition name="slide">
      <msg-toast :msg="tastMsg" @closeToast="closeToast()" v-show="showT"></msg-toast>
    </transition>
  </div>
</template>

<script>

import getString from "../utils/getString"
import APP from "../utils/openApp"
import api from "../api/apiConfig"
import Loading from "../components/Loading"
import MsgToast from "../components/commonToast"
import { globalBus } from '../utils/eventBus'
import TrunMsg from "../components/TrunMsg"
import GoldTrun from "../components/GoldTrun"
import SilverTrun from "../components/SilverTrun"
import ActFooter from "../components/ActFooter"
export default {
  components: { Loading, MsgToast, TrunMsg, GoldTrun, SilverTrun, ActFooter },
  data() {
    return {
      showT: false,  //提示弹窗显示
      tastMsg: "提示信息",  //基础弹窗提示信息 
      showCom: 'GoldTrun',     //当前显示转盘
      loaded: false,
      owner_wallet: {}
    }
  },
  created() {
    this.getDefaultData()
  },
  methods: {
    getDefaultData(val) { //初始化
      api.getDefault(1).then(res => {
        const { response_data, response_status } = res.data
        if (response_status.code == 0) {
          const { table, owner_wallet, top_record } = response_data
          this.$store.commit('goldGiftArr', table)
          this.$store.commit('changOwner_wallet', owner_wallet)
          this.$store.commit('changTop_record', top_record)
          if (Math.floor(owner_wallet.coin / 3) > 1) {  //chux
            this.showCom = 'GoldTrun'
          } else if (Math.floor(owner_wallet.bean / 10) > 1) {
            this.showCom = 'SilverTrun'
            api.getDefault(2).then(res => {
              if (res.data.response_status.code == 0) {
                this.$store.commit('silverGiftArr', res.data.response_data.table)
                this.$store.commit('changOwner_wallet', res.data.response_data.owner_wallet)
                this.loaded = true
              } else {
                this.tastMsg = res.data.response_status.error
                this.showT = true
              }
            })
          } else {
            this.showCom = 'GoldTrun'
          }
        } else {
          this.tastMsg = response_status.error
          this.showT = true
        }
      })
    },
    tabClick(val) {
      this.showCom = val
      if (val == 'SilverTrun' && !this.loaded) {
        api.getDefault(2).then(res => {
          if (res.data.response_status.code == 0) {
            this.showCom = val
            this.$store.commit('silverGiftArr', res.data.response_data.table)
            this.$store.commit('changOwner_wallet', res.data.response_data.owner_wallet)
            this.loaded = true
          } else {
            this.tastMsg = res.data.response_status.error
            this.showT = true
          }
        })
      }
      //  else {
      //   this.showCom = val
      // }
    },
    goRule() {
      let regstr = getString('token')
      location.href = `./index2.html?token=${regstr}`
    },
    refrsh() { //刷新
      this.rotatePx = 540 * ++this.rotatec  //旋转动画
      window.removeEventListener("scroll", this.onScroll)
      this.getDefaultData('ref')
    },
    closeToast() {
      this.showT = false
    },
    closeWeb() {
      var u = navigator.userAgent;
      var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
      var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
      if (isiOS) {
        closeWeb();
      } else {
        window.JSInterface.closeWeb();
      }
    }
  }
}
</script>
<style lang='scss'>
body::-webkit-scrollbar {
  width: 0;
}
body {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  z-index: 10000;
  direction: rtl;
}
.box {
  width: 7.5rem;
  height: 9rem;
  background: #4f0078;
  overflow-x: hidden;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  // background:url(../assets/img/主视觉.png) center 0 no-repeat;
  background-size: 100% auto;
  .tunrnHeader {
    height: 0.96rem;
    width: 6.17rem;
    margin: 0 auto;
    position: relative;
    .back {
      display: block;
      width: 0.18rem;
      height: 0.3rem;
      position: absolute;
      top: 0.34rem;
      right: -0.42rem;
      transform: rotate(180deg);
      background: url(../assets/img/backArrow.png);
      background-size: 100% 100%;
    }
    .tabs {
      display: flex;
      width: 100%;
      position: relative;
      span {
        display: block;
        width: 50%;
        text-align: center;
        line-height: 0.96rem;
        color: #b5a3c3;
        font-size: 80%;
        &.active {
          font-size: 85%;
          color: #fff9a0;
          font-weight: bold;
        }
      }
      .liner {
        display: block;
        width: 100%;
        height: 0.02rem;
        position: absolute;
        bottom: 0;
        background: rgba(255, 255, 255, 1);
        opacity: 0.05;
      }
      i {
        display: block;
        width: 0.68rem;
        height: 0.02rem;
        background: #dcd097;
        opacity: 0.5;
        position: absolute;
        left: 4.21rem;
        bottom: 0;
        // transition: left linear 0.4s;
        &.silver {
          left: 1.24rem;
        }
      }
    }
  }
}
</style>


