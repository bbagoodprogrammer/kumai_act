<template>
  <div class="box">
    <div class="turnHeader">
      <div class="tabs">
        <span class="trun" :class="{act:shoCom=='Trun'}" @click="tabClick('Trun')">Vòng Quay May Mắn</span>
        <span class="trunBox" :class="{act:shoCom=='Box'}" @click="tabClick('Box')">Rương Báu Bất Ngờ</span>
        <i class="boxNum"> {{userMsg.lock_box>99?'···':userMsg.lock_box}}</i>
      </div>
      <i class="close" @click="closeWeb()"></i>
    </div>
    <rool-msg :roolmsg="roolmsg"></rool-msg>
    <component :is="shoCom"></component>
    <Footer></Footer>
    <!-- <div class="noData">
      <img src="../assets/img/noOpen.png" alt="" class="noOpenImg">
      <strong>Đang bảo trì nâng cấp...</strong>
    </div> -->
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
import RoolMsg from "../components/RoolMsg"
import Trun from "../components/Trun"
import Box from "../components/Box"
import Footer from "../components/Footer"
export default {
  components: { Loading, MsgToast, RoolMsg, Trun, Box, Footer },
  data() {
    return {
      showT: false,  //提示弹窗显示
      tastMsg: "提示信息",  //基础弹窗提示信息
      roolmsg: "",
      shoCom: 'Trun',
      userMsg: {}
    }
  },
  created() {
    this.getDefaultData()
  },
  mounted() {
  },
  methods: {
    getDefaultData() {
      api.getDefault(0).then(res => {
        const { response_data, response_status } = res.data
        this.roolmsg = response_data.top_record   //弹幕信息
        this.$store.commit('changGift_list', response_data.gift_list)  //转盘礼物配置
        this.$store.commit('changUserMsg', response_data.user_wallet)    //个人信息
        this.userMsg = response_data.user_wallet
      })
    },
    tabClick(val) {
      this.shoCom = val
      this.$store.commit('changShoCom', val)
    },
    closeToast() {
      this.showT = false
    },
    closeWeb() {
      var u = navigator.userAgent;
      var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
      var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
      if (isAndroid) {
        window.JSInterface.closeWeb();
      } else {
        closeWeb();
      }
    }
  }
}
</script>
<style lang='scss'>
body {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: transparent;
  z-index: 10000;
}
body::-webkit-scrollbar {
  width: 0;
}
.noData {
  width: 3.5rem;
  height: 3.5rem;
  margin: 3rem auto 0;
  .noOpenImg {
    width: 1.21rem;
    height: 1.01rem;
    display: block;
    margin: 0 auto 0;
  }
  strong {
    display: block;
    text-align: center;
    font-size: 0.24rem;
    margin-top: 0.04rem;
  }
}
.box {
  max-width: 750px;
  height: 9rem;
  overflow-x: hidden;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  background: url(../assets/img/bigBox.png) center 0 no-repeat;
  background-size: 100% auto;
  .turnHeader {
    height: 1rem;
    border-bottom: 0.01rem solid #837cff;
    position: relative;
    .tabs {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 6.7rem;
      height: 1rem;
      span {
        display: block;
        width: 3.35rem;
        height: 1rem;
        display: flex;
        align-items: center;
        justify-content: center;
        // line-height: 1rem;
        // font-size: 0.3rem;
        font-weight: 600;
        position: relative;
        letter-spacing: -0.02rem;
      }
      .boxNum {
        width: 0.32rem;
        height: 0.32rem;
        padding: 0.01rem;
        line-height: 0.34rem;
        background: rgba(255, 86, 34, 1);
        border: 0.02rem solid rgba(255, 255, 255, 1);
        font-size: 70%;
        border-radius: 50%;
        position: absolute;
        top: 0.15rem;
        right: 0.86rem;
        text-align: center;
        color: #fff !important;
      }
      .act {
        color: #fef129;
      }
      .act::after {
        content: "";
        display: block;
        width: 0.6rem;
        height: 0.06rem;
        background: #fef129;
        border-radius: 0.03rem;
        position: absolute;
        bottom: 0;
        left: 1.4rem;
      }
    }
    .close {
      display: block;
      width: 0.37rem;
      height: 0.37rem;
      background: url(../assets/img/close.png);
      background-size: 100% 100%;
      position: absolute;
      top: 0.32rem;
      right: 0.32rem;
    }
  }
}
</style>


