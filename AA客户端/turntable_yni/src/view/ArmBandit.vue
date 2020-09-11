<template>
  <div id="box" :style="{height:boxHeight+'px'}">
    <div class="turnHeader">
      <div class="tabs">
        <span class="trun" :class="{act:shoCom=='Trun'}" @click="tabClick('Trun')">Roda Lucky</span>
        <span class="trunBox" :class="{act:shoCom=='Box'}" @click="tabClick('Box')">Peti harta karun kejutan</span>
        <i class="boxNum"> {{userMsg.lock_box>99?'···':userMsg.lock_box}}</i>
      </div>
      <i class="close" @click="closeWeb()"></i>
    </div>
    <rool-msg :roolmsg="roolmsg"></rool-msg>
    <div class="conMaxBox" :style="{maxHeight:contMaxHeigth+'px'}">
      <keep-alive>
        <component :is="shoCom"></component>
      </keep-alive>
    </div>
    <Footer></Footer>
    <!-- <div class="noData">
      <img src="../assets/img/noOpen.png" alt="" class="noOpenImg">
      <strong>工程師正在維護升級中...</strong>
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
import { mapState } from "vuex"
export default {
  components: { Loading, MsgToast, RoolMsg, Trun, Box, Footer },
  data() {
    return {
      showT: false,  //提示弹窗显示
      tastMsg: "",  //基础弹窗提示信息
      roolmsg: "",
      shoCom: 'Trun',
      contMaxHeigth: null
    }
  },
  created() {
    // sessionStorage.setItem('entryType', 2)
    this.getDefaultData()
  },
  computed: {
    ...mapState(["userMsg"]),
    boxHeight() {
      return window.innerHeight
    }
  },
  mounted() {
    window.onload = () => {
      let turnHeaderHeigth = document.getElementsByClassName('turnHeader')[0].clientHeight
      let footerHeight = document.getElementsByClassName('footer')[0].clientHeight
      this.contMaxHeigth = this.boxHeight - turnHeaderHeigth - footerHeight - 42  //首頁內容最大高度
      let pupMaxHeight = this.boxHeight - turnHeaderHeigth - footerHeight    //彈窗頁面最大高度
      sessionStorage.setItem('pupMaxHeight', pupMaxHeight)
      let mainHeight = document.getElementById('box').clientHeight
      this.$store.commit('setMainHeight', mainHeight)
      sessionStorage.setItem('pupHeight', mainHeight)
    }
  },
  methods: {
    getDefaultData() {
      api.getDefault(0).then(res => {
        const { response_data, response_status } = res.data
        this.roolmsg = response_data.top_record   //弹幕信息
        this.$store.commit('changGift_list', response_data.gift_list)  //转盘礼物配置
        this.$store.commit('changUserMsg', response_data.user_wallet)    //个人信息
        this.$store.commit('setVersion', response_data.is_ok_version)   //新舊版本標識
        // sessionStorage.setItem('user_wallet', JSON.stringify(response_data.user_wallet))   //頁面用
        // this.userMsg = response_data.user_wallet
        this.$store.commit('setOpenType', 1)
      })
    },
    tabClick(val) {
      this.shoCom = val
      this.$store.commit('changShoCom', val)
      // let boxGiftList = sessionStorage.getItem('boxGiftBox')
      // if (val == 'Box' && !boxGiftList) {
      //   api.getDefault(1).then(res => {
      //     const { response_data, response_status } = res.data
      //     sessionStorage.setItem('boxGiftBox', JSON.stringify(response_data.gift_list))
      //     this.shoCom = val
      //     this.$store.commit('changShoCom', val)
      //   })
      // } else {
      //   this.shoCom = val
      //   this.$store.commit('changShoCom', val)
      // }
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
html {
  background-color: transparent;
}
body {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  // background: rgba(0, 0, 0, 0.8);
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
#box {
  max-width: 750px;
  // height: 9.74rem;
  // overflow-x: hidden;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  background: url(../assets/img/bigBox.png) center 0 no-repeat;
  background-size: 100% 100%;
  // border-radius: 0.32rem 0.32rem 0 0;
  // overflow: hidden;
  .turnHeader {
    height: 1rem;
    border-bottom: 0.01rem solid #837cff;
    position: relative;
    .tabs {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 6rem;
      height: 1rem;
      margin-left: 0.37rem;
      span {
        flex: 1;
        height: 1rem;
        font-size: 120%;
        font-weight: 600;
        position: relative;
        text-align: center;
        display: flex;
        align-items: center;
        justify-content: center;
        line-height: 0.3rem;
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
        right: 0.8rem;
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
        bottom: -0.02rem;
        left: 1.2rem;
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
  .conMaxBox {
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch; //有回弹效果
    -webkit-overflow-scrolling: auto; //滑到哪停到哪
  }
}
</style>


