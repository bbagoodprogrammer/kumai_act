<template>
  <div class="box">
    <div class="shareBar" v-if="isShare">
      <div class="bar" @click="downApp()"></div>
    </div>
    <div class="header">
      <span class="ruleTips" :class="{top:isShare}" @click="goRule()">活動攻略</span>
      <div class="bigBg"></div>
      <div class="bottom"></div>
      <div class="bottom2"></div>
      <div class="bottom3"></div>
      <div class="bottom4"></div>
      <div class="title">
        <div class="actTime">2020.01.08-2020.02.07</div>
      </div>
      <div class="titleLate">
        <div class="slide"></div>
      </div>
      <div class="light"></div>
      <div class="element1"></div>
      <div class="element2"></div>
      <div class="element3"></div>
      <div class="element4"></div>
      <div class="element5"></div>
      <div class="element6"></div>
      <div class="element7"></div>
      <div class="element8"></div>
    </div>
    <div class="wards"></div>
    <div class="main">
      <div class="tabs">
        <a :class="{act:showCom == 'Match'}" @click="tabClick('Match')">年度賽事</a>
        <a :class="{act:showCom == 'People'}" @click="tabClick('People')">年度之星榜單</a>
      </div>
      <component :is="showCom"></component>
    </div>
    <p class="tips">本系列活動最終解釋權歸歡歌所有</p>
    <loading></loading>
    <transition name=" slide">
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
import ActFooter from "../components/ActFooter"
import MsgToast from "../components/commonToast"
import { globalBus } from '../utils/eventBus'
import Match from "../components/Match"
import People from "../components/People"
export default {
  components: { Loading, MsgToast, ActFooter, Match, People },
  data() {
    return {
      activite: 1,    //活动状态
      showT: false,  //提示弹窗显示
      tastMsg: "提示信息",  //基础弹窗提示信息
      showCom: "Match",
      rotatePx: 0,
      rotatec: 0,
      isTotal: 0,  //总榜是否请求
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
      api.getDefault().then(res => {
        const { response_data, response_status } = res.data
        if (response_status.code == 0) {
          this.$store.commit('changActStatus', response_data.activity_status)
          this.$store.commit('changActList', response_data.act_list)  //活动列表
          this.$store.commit('updateRankGroups', {
            key: 0,
            total_rank: response_data.total_rank,
            loaded: true
          })
        }
      })
    },
    downApp() {
      // alert(navigator.userAgent)
      APP()
    },
    tabClick(val) {
      if (this.isTotal == 0) {
        api.getTotelRank().then(res => {
          this.isTotal = 1
          this.showCom = val
          this.$store.commit('changAllRank', res.data.response_data.all_rank)
        })
      } else {
        this.showCom = val
      }
    },
    goRule() {
      console.log('ggg')
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
    }
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
  // background:url(../assets/img/banner.png) center 0 no-repeat;
  background-size: 100% auto;
  .shareBar {
    position: fixed;
    z-index: 10000;
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
    height: 9.09rem;
    position: relative;
    .bigBg {
      width: 7.5rem;
      height: 8.47rem;
      background: url(../assets/img/headerElement/banner.png);
      background-size: 100% 100%;
      position: absolute;
      top: 0;
      left: 0;
    }
    .bottom {
      width: 5.77rem;
      height: 2.25rem;
      background: url(../assets/img/headerElement/bottom.png);
      background-size: 100% 100%;
      position: absolute;
      left: 0.83rem;
      top: 6.03rem;
    }
    .bottom2 {
      width: 7.37rem;
      height: 2.19rem;
      background: url(../assets/img/headerElement/bottom2.png);
      background-size: 100% 100%;
      position: absolute;
      top: 5.63rem;
      left: 0.07rem;
      z-index: 20;
      transform-origin: center center;
      animation-fill-mode: forwards;
      animation: duck 10s linear infinite;
    }
    .bottom3 {
      width: 4.45rem;
      height: 1.24rem;
      background: url(../assets/img/headerElement/bottom3.png);
      background-size: 100% 100%;
      position: absolute;
      top: 5.63rem;
      left: 1.52rem;
      z-index: 20;
      transform-origin: center center;
      animation-fill-mode: forwards;
      animation: duck2 10s linear infinite;
    }
    .bottom4 {
      width: 7.5rem;
      height: 1.57rem;
      background: url(../assets/img/headerElement/bottom4.png);
      background-size: 100% 100%;
      position: absolute;
      top: 5.9rem;
      left: 0;
      z-index: 10;
    }
    .title {
      width: 7.35rem;
      height: 5.04rem;
      background: url(../assets/img/headerElement/title.png);
      background-size: 100% 100%;
      position: absolute;
      top: 0.86rem;
      left: 0.08rem;
      z-index: 1000;
      .actTime {
        font-size: 120%;
        white-space: nowrap;
        font-family: HYQiHei;
        font-weight: 800;
        color: rgba(255, 255, 255, 1);
        line-height: 0.44rem;
        -webkit-text-stroke: 0.02rem #3f1f00;
        text-stroke: 0.02rem #3f1f00;
        position: absolute;
        bottom: 0.5rem;
        left: 50%;
        transform: translate(-50%, 0);
      }
    }
    .titleLate {
      width: 7.35rem;
      height: 5.04rem;
      position: absolute;
      top: 0.86rem;
      left: 0.08rem;
      background-size: 100% 100%;
      -webkit-mask-image: url(../assets/img/headerElement/title.png);
      mask-image: url(../assets/img/headerElement/title.png);
      mask-repeat: no-repeat;
      mask-size: 100% 100%;
      z-index: 1000;
      .slide {
        width: 7.35rem;
        height: 5.04rem;
        position: absolute;
        top: 0;
        left: -7.5rem;
        background: url(../assets/img/titleLate.png);
        background-size: 100% 100%;
        animation: late3 4s linear infinite;
      }
    }
    .light {
      width: 7.5rem;
      height: 8.11rem;
      background: url(../assets/img/headerElement/light.png);
      background-size: 100% 100%;
      opacity: 0;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 999;
    }
    .element1 {
      width: 0.77rem;
      height: 1.25rem;
      background: url(../assets/img/headerElement/element1.png);
      background-size: 100% 100%;
      position: absolute;
      top: 2.3rem;
      right: 1.24rem;
    }
    .element2 {
      width: 0.43rem;
      height: 0.72rem;
      background: url(../assets/img/headerElement/element2.png);
      background-size: 100% 100%;
      position: absolute;
      top: 1.58rem;
      left: 0.75rem;
      animation: heart 1.3s ease-in-out 2s infinite alternate;
    }
    .element3 {
      width: 0.43rem;
      height: 0.72rem;
      background: url(../assets/img/headerElement/element3.png);
      background-size: 100% 100%;
      position: absolute;
      top: 5.56rem;
      right: 0.33rem;
      z-index: 30;
      animation: heart 1.3s ease-in-out 2.5s infinite alternate;
    }
    .element4 {
      width: 0.12rem;
      height: 0.4rem;
      background: url(../assets/img/headerElement/element4.png);
      background-size: 100% 100%;
      position: absolute;
      top: 0.58rem;
      left: 1.69rem;
      animation: heart 1.3s ease-in-out 2.1s infinite alternate;
    }
    .element5 {
      width: 0.39rem;
      height: 0.45rem;
      background: url(../assets/img/headerElement/element5.png);
      background-size: 100% 100%;
      position: absolute;
      top: 1.34rem;
      right: 1.7rem;
      animation: heart 1.3s ease-in-out 2.2s infinite alternate;
    }
    .element6 {
      width: 1.49rem;
      height: 1.13rem;
      background: url(../assets/img/headerElement/element6.png);
      background-size: 100% 100%;
      position: absolute;
      top: 6.73rem;
      left: 0rem;
      z-index: 30;
      animation: heart 3s ease-in-out 3s infinite alternate;
    }
    .element7 {
      width: 0.5rem;
      height: 0.71rem;
      background: url(../assets/img/headerElement/element7.png);
      background-size: 100% 100%;
      position: absolute;
      top: 5.01rem;
      left: 0rem;
    }
    .element8 {
      width: 1.21rem;
      height: 1.28rem;
      background: url(../assets/img/headerElement/element8.png);
      background-size: 100% 100%;
      position: absolute;
      top: 6.21rem;
      right: 1.09rem;
      z-index: 30;
      animation: heart 3s ease-in-out 3s infinite alternate;
    }
    .ruleTips {
      width: 1.57rem;
      height: 0.52rem;
      background: url(../assets/img/ruleTips.png);
      background-size: 100% 100%;
      font-size: 80%;
      text-align: center;
      line-height: 0.52rem;
      position: absolute;
      right: 0;
      top: 1.2rem;
      z-index: 9999;
      &.top {
        top: 1.5rem;
      }
    }
  }
  .wards {
    width: 6.95rem;
    height: 6.96rem;
    background: url(../assets/img/wards.png);
    background-size: 100% 100%;
    margin: -1.5rem auto 0;
    position: relative;
    z-index: 1000;
  }
  .main {
    width: 6.9rem;
    background: rgba(28, 4, 80, 1);
    border: 0.02rem solid rgba(245, 188, 97, 1);
    border-radius: 0.2rem;
    padding: 0.49rem 0.2rem 0.49rem;
    margin: 0.81rem auto 0;
    position: relative;
    .tabs {
      width: 6.78rem;
      height: 0.98rem;
      padding: 0 0.1rem;
      background: url(../assets/img/tabsBg.png);
      background-size: 100% 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      position: absolute;
      top: -0.49rem;
      a {
        display: block;
        width: 3.51rem;
        height: 0.76rem;
        color: #d3b7ff;
        text-align: center;
        line-height: 0.76rem;
        position: relative;
        overflow: hidden;
        border-radius: 0.4rem;
      }
      .act {
        background: url(../assets/img/tabAct.png);
        background-size: 100% 100%;
        color: #fff;
      }
      .act::after {
        content: "";
        display: block;
        width: 1.85rem;
        height: 0.76rem;
        background: url(../assets/img/actLate.png);
        background-size: 100% 100%;
        position: absolute;
        left: -3.5rem;
        top: 0;
        z-index: 100;
        animation: late2 4s linear infinite;
      }
    }
  }
  .tips {
    font-size: 80%;
    color: #776fb6;
    text-align: center;
    text-align: center;
    margin: 0.32rem 0 0.22rem 0;
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
</style>


