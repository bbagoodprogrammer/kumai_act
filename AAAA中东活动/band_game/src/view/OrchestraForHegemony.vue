<template>
  <div class="box">
    <div class="shareBar" v-if="isShare">
      <div class="bar" @click="downApp()"></div>
    </div>
    <div class="header">
      <span class="ruleTips" :class="{top:isShare}" @click="goRule()"></span>
    </div>
    <div class="wardsImg"></div>
    <div class="tabs">
      <span :class="{active:showCom == 'group'}" @click="tabClick('group')">قائمة غرفة الغناء </span>
      <span :class="{active:showCom == 'people'}" @click="tabClick('people')">قائمة المساهمة</span>
    </div>
    <component :is="showCom"></component>
    <act-footer :showCom="showCom"></act-footer>
    <loading></loading>
    <transition name="slide">
      <msg-toast :msg="tastMsg" @closeToast="closeToast()" v-show="showT"></msg-toast>
    </transition>
    <div href="" class="refresh circle" @click.prevent="refrsh()" :style="{transform:'rotate('+rotatePx+'deg)'}"></div>
    <!-- <div href="" class="refresh circle" @click.prevent="refrsh()" :style="{transform:'rotate('+rotatePx+'deg)'}" @touchstart="down" @touchmove="move" @touchend="end" id="circlebox"></div> -->
    <!-- <div @touchstart="down" @touchmove="move" @touchend="end" id="circlebox" class="circle">
      <div class="left-line"></div>
      <div class="right-line"></div>
    </div> -->
    <!-- 遮罩 -->
    <!-- <div class="mask-box" id="page1mask" v-if="showif"></div> -->
    <!-- <testSlide></testSlide> -->
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
import people from "../components/People"
import group from "../components/Group"

export default {
  components: { Loading, MsgToast, ActFooter, people, group },
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
      // showif: false,
      // positionX: 0,
      // positionY: 0,
      // innerHeight: 0,
      // innerWidth: 0,
      showCom: 'group',
      load: false
    }
  },
  created() {
    this.judgeShare()  //判断是否为分享环境,请求相应的接口 
    this.getDefaultData()
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
        const { response_status, response_data } = res.data
        if (response_status.code == 20000) {
          this.activite = 0
          this.$store.commit('changActStatus', this.activite)
        } else if (response_status.code == 0) {
          const { activity_status, owner_msg, rank } = response_data
          this.activite = activity_status
          this.$store.commit('changActStatus', activity_status)
          this.$store.commit('changGroupMsg', owner_msg)
          this.$store.commit('changGroupRank', rank)
        } else {
          this.tastMsg = response_status.error
          this.showT = true
        }
      })
    },
    tabClick(val) {
      if (val == 'people' && !this.load) {
        api.getPeopleRank(0).then(res => {
          this.$store.commit('changPeopleMsg', res.data.response_data.owner_msg)
          this.$store.commit('changPeopleRank', res.data.response_data.rank)
          this.showCom = val
          this.load = true
        })
      } else {
        this.showCom = val
      }
    },
    onScroll() {
      if (this.isMore) {
        const scrollToBottom = (document.documentElement.scrollTop || document.body.scrollTop) + window.innerHeight >= document.body.scrollHeight - 100
        if (scrollToBottom) { //加載更多
        }
      }
    },
    goRule() {
      let regstr = getString('token')
      location.href = `./index2.html?token=${regstr}`
    },
    refrsh() { //刷新
      this.rotatePx = 540 * ++this.rotatec  //旋转动画
      window.removeEventListener("scroll", this.onScroll)
      this.getDefaultData('ref')
      if (this.showCom == 'people') {
        this.load = false
        this.tabClick('people')
      }
    },
    closeToast() {
      this.showT = false
    },
    downApp() {
      APP()
    }
  }
}
</script>
<style lang='scss'>
body {
  background: #3018a8;
  direction: rtl;
}
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
    z-index: 1000;
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
    height: 8.21rem;
    position: relative;
    .ruleTips {
      width: 1.9rem;
      height: 0.63rem;
      background: url(../assets/img/ruleTips.png);
      background-size: 100% 100%;
      position: absolute;
      right: 0;
      top: 0.17rem;
      &.top {
        top: 1.5rem;
      }
    }
  }
  .wardsImg {
    width: 7.1rem;
    height: 4.85rem;
    background: url(../assets/img/wardsImg.png);
    background-size: 100% 100%;
    margin: 0 auto;
  }
  .tabs {
    width: 6.74rem;
    height: 0.98rem;
    padding: 0 0.12rem;
    margin: 0.41rem auto;
    background: url(../assets/img/tabsBg.png);
    background-size: 100% 100%;
    display: flex;
    align-items: center;
    span {
      display: block;
      width: 3.51rem;
      height: 0.76rem;
      color: #bb81fb;
      text-align: center;
      font-size: 130%;
      line-height: 0.76rem;
      white-space: nowrap;
      &.active {
        color: #fff;
        background: url(../assets/img/tabActive.png);
        background-size: 100% 100%;
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


