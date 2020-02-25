<template>
  <div class="box">
    <div class="shareBar" v-if="isShare">
      <div class="bar" @click="downApp()"></div>
    </div>
    <div class="header">
      <div class="rotateBg"></div>
      <div class="heartL"></div>
      <div class="heartR"></div>
      <div class="snowBg">
        <!-- <div class="snow"></div> -->
        <lottie :options="defaultOptions" v-on:animCreated="handleAnimation" class="lottle" />
      </div>
      <div class="bannerTitle"></div>
      <div class="ruleBox" :class="{top:isShare}">
        <span class="ruleTips" @click="goRule()">獎勵&規則</span>
        <span class="history" @click="goHistory()">獲獎記錄></span>
      </div>
    </div>
    <integral></integral>
    <TabsScrollLoadList ref="scorll" @getDefaultData="getDefaultData"></TabsScrollLoadList>
    <Footer></Footer>
    <loading></loading>
    <transition name="slide">
      <div class="firstPup" v-if="showFirstGift">
        <div class="firstCon">
          <div class="title"></div>
          <div class="getIntegral" @click="doTask()">去賺積分>></div>
          <div class="giftItem">
            <span class="close" @click="closeFirstPup()"></span>
            <div class="giftOne">
              <span>積分值達到70</span>
              <div class="imgBox">
                <img src="../assets/img/PupImg/ward0.png" alt="">
              </div>
              <em>{{gift_list.gift_list[0].counts}}金豆</em>
            </div>
            <div class="giftOne">
              <span>積分值達到90</span>
              <div class="imgBox">
                <img :src="getFirsrImg(1)" alt="">
              </div>
              <em v-html="getGiftName(1)"></em>
            </div>
            <div class="giftOne">
              <span>積分值達到130</span>
              <div class="imgBox">
                <img :src="getFirsrImg(2)" alt="">
              </div>
              <em v-html="getGiftName(2)"></em>
            </div>
            <div class="giftOne">
              <span>積分值達到150</span>
              <div class="imgBox">
                <img src="../assets/img/PupImg/ward3.png" alt="">
              </div>
              <em>前3個禮物的</br>隨機1個*2</em>
            </div>
          </div>
        </div>
      </div>
    </transition>
    <transition name="slide">
      <msg-toast :msg="tastMsg" @closeToast="closeToast()" v-show="showT"></msg-toast>
    </transition>
    <!-- <div href="" class="refresh circle" @click.prevent="refrsh()" :style="{transform:'rotate('+rotatePx+'deg)'}"></div> -->
  </div>
</template>

<script>

import getString from "../utils/getString"
import APP from "../utils/openApp"
import api from "../api/apiConfig"
import Loading from "../components/Loading"
import Footer from "../components/Footer"
import MsgToast from "../components/commonToast"
import { globalBus } from '../utils/eventBus'
import TabsScrollLoadList from "../components/TabsScrollLoadList"
import Integral from "../components/Integral"
import getDateArr from "../utils/getDateArr"
import gift from "../config/gift"
import lottie from 'vue-lottie';
import Vue from "vue"
Vue.component('lottie', lottie)
import * as animationData from "../images/snow.json";
export default {
  components: { Loading, MsgToast, Footer, TabsScrollLoadList, Integral },
  data() {
    return {
      isShare: false, //是否分享
      isMore: true,   //加载更多
      activite: 1,    //活动状态
      showT: false,  //提示弹窗显示
      tastMsg: "提示信息",  //基础弹窗提示信息
      userState: 0,   //用户状态（是否报名）
      rotatePx: 0,    //刷新旋转动画
      rotatec: 0,
      showFirstGift: false,   //初次礼物弹窗
      gift_list: {},
      nowDay: null,
      defaultOptions: { animationData: animationData },
      animationSpeed: 1,
      anim: {}
    }
  },
  created() {
    this.judgeShare()  //判断是否为分享环境,请求相应的接口 
    this.getDefaultData()
  },
  mounted() {
  },
  methods: {
    judgeShare() {//判断是否为分享环境,请求相应的接口 
      let regstr = getString('token')
      if (regstr) {
        this.isShare = false
      } else {
        this.isShare = true
      }
      this.$store.commit('changShareState', this.isShare) //分享状态
    },
    getDefaultData(val) { //初始化
      api.getDefault(0).then((res) => {
        const { response_data, response_status } = res.data
        if (response_status.code == 20000) { //活動未開始
          this.activite = 0
          this.$store.commit("changactiveityState", this.activite)
        } else if (response_status && response_status.code == 0) {  // 拆分存入數據
          const { activity_status, dates, gift_list, second, rank, owner_msg, is_first_init } = response_data
          this.activite = activity_status
          this.$store.commit("changactiveityState", activity_status)
          this.$store.commit("changNowDay", dates.days)  //當前天
          this.$store.commit("changIntegral", owner_msg.daily_star)  //當前積分  owner_msg.daily_star
          this.$store.commit("changGift_list", gift_list)   //積分狀態
          this.$store.commit("changday_down_time", second)  //當天剩餘時間
          this.$store.commit("changSetInited", 1)  //是否初始化頁面
          this.$store.commit('updateRankGroups', { //当前日榜信息
            key: dates.days,
            loadCount: 0,
            loadEnd: rank.length < 20,
            loading: false,
            none: rank.length == 0,
            list: rank,
            second: second
          })
          this.$store.commit("changTab", dates.days)  //初始当天选择的
          this.$store.commit("changGroupsUserMsg", {//初始当前日榜个人信息
            key: dates.days,
            msg: owner_msg
          })
          this.getDateArr(dates.stime, dates.etime)  //生成日榜数组
          this.firstSingUp(is_first_init)     //是否第一次登陆
          this.gift_list = gift_list
          this.nowDay = dates.days
        }
      })
    },
    onScroll() {
      if (this.isMore) {
        const scrollToBottom = (document.documentElement.scrollTop || document.body.scrollTop) + window.innerHeight >= document.body.scrollHeight - 100
        if (scrollToBottom) { //加載更多
        }
      }
    },
    getDateArr(stime, etime) {
      let dateArr = getDateArr(stime, etime)
      this.$store.commit('changDateArr', dateArr)
      this.$store.commit("changTotalDay", dateArr.length) //当前期活动总天数
    },
    firstSingUp(num) {
      if (num == 1 && this.activite == 1) {
        this.showFirstGift = true
      }
    },
    getFirsrImg(num) {
      return gift[this.nowDay][num].pupImg
    },
    getGiftName(num) {
      return gift[this.nowDay][num].name
    },
    downApp() {
      APP()
    },
    goRule() {
      let regstr = getString('token')
      location.href = `./index2.html?token=${regstr}`
    },
    goHistory() {
      globalBus.$emit('commonEvent', () => {
        let regstr = getString('token')
        location.href = `./index4.html?token=${regstr}`
      })
    },
    refrsh() { //刷新
      this.rotatePx = 540 * ++this.rotatec  //旋转动画
      window.removeEventListener("scroll", this.onScroll)
      this.getDefaultData('ref')
    },
    closeToast() {
      this.showT = false
    },
    closeFirstPup() {
      this.showFirstGift = false
    },
    doTask() {
      this.showFirstGift = false
      this.$refs.scorll.mainTabClick(2)
    },
    handleAnimation: function (anim) {
      this.anim = anim;
    },
  }
}
</script>
<style lang='scss'>
body::-webkit-scrollbar {
  width: 0;
}
.box {
  max-width: 750px;
  overflow-x: hidden;
  position: relative;
  margin: auto;
  background: url(../assets/img/banner.png) center 0 no-repeat;
  background-size: 100% auto;
  .shareBar {
    position: fixed;
    z-index: 1010;
    top: 0;
    left: 0;
    right: 0;
    text-align: center;
    .bar {
      width: 7.5rem;
      height: 1.2rem;
      margin: auto;
      background: url(../assets/img/share_bar.png) no-repeat;
      background-size: 100% 100%;
    }
  }
  .header {
    height: 8.42rem;
    position: relative;
    .rotateBg {
      width: 6.28rem;
      height: 6.28rem;
      // background: url(../assets/img/rotateBg.png);
      // background-size: 100% 100%;
      position: absolute;
      top: 1.48rem;
      left: 0.53rem;
      // animation: 20s rotateInfint linear infinite;
    }
    .heartL {
      width: 1.16rem;
      height: 1.89rem;
      background: url(../assets/img/heartL.png);
      background-size: 100% 100%;
      z-index: 13;
      position: absolute;
      top: 4.62rem;
      left: 0.69rem;
      animation: heart 1.3s ease-in-out 2.7s infinite alternate;
    }
    .heartR {
      width: 0.92rem;
      height: 1.61rem;
      background: url(../assets/img/heartR.png);
      background-size: 100% 100%;
      z-index: 13;
      position: absolute;
      top: 5.39rem;
      right: 0.53rem;
      animation: heart 1.3s ease-in-out 2.7s infinite alternate;
    }
    .snowBg {
      width: 6.28rem;
      height: 6.28rem;
      position: absolute;
      border-radius: 50%;
      overflow: hidden;
      top: 1.48rem;
      left: 0.53rem;
      .lottle {
        width: 6.28rem;
        height: 6.28rem;
      }
      .snow {
        width: 6.28rem;
        height: 6.28rem;
        position: absolute;
        top: 0;
        left: 0;
        // background-image: url(../assets/img/snowBg.png);
        // background-size: 6.28rem 6.28rem;
        // background-position: 0 0;
        // -webkit-animation: snow 10s linear infinite;
        // -moz-animation: snow 10s linear infinite;
        // -o-animation: snow 10s linear infinite;
        // animation: snow 10s linear infinite;
        // transition: all 1s;
        // &:hover {
        //   background-position: 0 6.28rem;
        // }
      }
    }
    .bannerTitle {
      width: 6.46rem;
      height: 2.17rem;
      background: url(../assets/img/bannerTitle.png);
      background-size: 100% 100%;
      position: absolute;
      top: 0.51rem;
      left: 0.55rem;
    }
    .ruleBox {
      position: absolute;
      top: 2.81rem;
      right: 0;
      &.top {
        top: 1.5rem;
      }
      .ruleTips {
        display: block;
        width: 1.59rem;
        height: 0.62rem;
        text-indent: 0.1rem;
        font-size: 88%;
        line-height: 0.62rem;
        text-align: center;
        background: url(../assets/img/ruleTips.png);
        background-size: 100% 100%;
      }
      .history {
        display: block;
        width: 1.59rem;
        height: 0.62rem;
        text-indent: 0.1rem;
        font-size: 88%;
        line-height: 0.62rem;
        text-align: center;
        background: url(../assets/img/ruleTips.png);
        background-size: 100% 100%;
        margin-top: 0.16rem;
      }
    }
  }
  .firstPup {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.8);
    z-index: 10000;
    .firstCon {
      width: 5.49rem;
      padding: 0.57rem 0 0.2rem 0;
      background: rgba(234, 71, 78, 1);
      border: 0.04rem solid rgba(255, 196, 130, 1);
      border-radius: 0.4rem;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      .title {
        width: 4.4rem;
        height: 1.83rem;
        background: url(../assets/img/giftTitle.png);
        background-size: 100% 100%;
        position: absolute;
        top: -1.3rem;
        left: 0.5rem;
      }
      .getIntegral {
        display: block;
        width: 2.95rem;
        height: 0.8rem;
        line-height: 0.8rem;
        font-size: 120%;
        text-align: center;
        background: url(../assets/img/singUpBtm.png);
        background-size: 100% 100%;
        position: absolute;
        bottom: -0.4rem;
        left: 1.2rem;
      }
      .giftItem {
        text-align: center;
        vertical-align: middle;
        padding-bottom: 0.5rem;
        .close {
          display: block;
          width: 0.5rem;
          height: 0.5rem;
          background: url(../assets/img/close.png);
          background-size: 100% 100%;
          position: absolute;
          right: 0;
          top: -0.8rem;
        }
        .giftOne {
          float: left;
          width: 49%;
          span {
            color: #ffd08c;
            font-size: 80%;
          }
          .imgBox {
            margin: 0 auto;
          }
          em {
            font-size: 80%;
            display: block;
            height: 0.7rem;
            color: #ffefd7;
          }
        }
        .imgBox {
          width: 1.6rem;
          height: 1.6rem;
          background: url(../assets/img/giftbg.png);
          background-size: 100% 100%;
          img {
            width: 1.6rem;
            height: 1.6rem;
          }
        }
      }
      .giftItem:after {
        content: "";
        height: 0;
        line-height: 0;
        display: block;
        visibility: hidden;
        clear: both;
      }
    }
  }
}
.refresh {
  display: block;
  width: 0.94rem;
  height: 1rem;
  position: fixed;
  left: 0.08rem;
  bottom: 1.35rem;
  background: url(../assets/img/refresh.png) no-repeat;
  background-size: contain;
  transition: transform 1s;
  z-index: 1000;
}
#circlebox {
  // width: 2rem;
  // height: 2rem;
  // background-color: red;
  // position: fixed;
}
</style>


