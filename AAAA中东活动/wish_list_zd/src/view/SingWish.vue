<template>
  <div class="box">
    <div class="shareBar" v-if="isShare" @click="downAPP()">
      <div class="bar"></div>
    </div>
    <div class="header">
      <span class="rules" @click="goRules()"></span>
      <span class="list" @click="gohearList()"></span>
    </div>
    <tabs-scroll-load-list ref="scroll"></tabs-scroll-load-list>
    <act-footer></act-footer>
    <loading></loading>
    <transition name="slide">
      <msg-toast :msg="tastMsg" @closeToast="closeToast()" v-show="showT"></msg-toast>
    </transition>
    <div href="" class="refresh circle" @click.prevent="refrsh()" :style="{transform:'rotate('+rotatePx+'deg)'}" id="circlebox" v-if="!isShare"></div>
    <!-- <div @touchstart="down" @touchmove="move" @touchend="end" id="circlebox" class="circle">
      <div class="left-line"></div>
      <div class="right-line"></div>
    </div> -->
    <!-- 遮罩 -->
    <!-- <div class="mask-box" id="page1mask" v-if="showif"></div> -->
  </div>
</template>

<script>

import getString from "../utils/getString"
import APP from "../utils/openApp"
import api from "../api/apiConfig"
import Loading from "../components/Loading"
import ActFooter from "../components/ActFooter"
import MsgToast from "../components/commonToast"
import TabsScrollLoadList from "../components/TabsScrollLoadList"
import { globalBus } from '../utils/eventBus'
export default {
  components: { Loading, MsgToast, ActFooter, TabsScrollLoadList },
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
      positionX: 0,
      positionY: 0,
      innerHeight: 0,
      innerWidth: 0,
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
      api.getDefault().then((res) => {
        const { response_status, response_data } = res.data
        if (response_status.code == 20000) {
          this.activite = 0
          this.$store.commit('changActStatus', this.activite)
        } else if (response_status.code == 0) {
          const { step, took, count, } = response_data
          this.$store.commit('changActStatus', step)
          this.$store.commit('changUserMsg', response_data)
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
    goRules() {
      let regstr = getString('token')
      location.href = `./index2.html?token=${regstr}`
    },
    gohearList() {
      if (this.isShare) {
        APP()
        return
      }
      let regstr = getString('token')
      location.href = `./index4.html?token=${regstr}`
    },
    downAPP() {
      APP()
    },
    refrsh() { //刷新
      this.rotatePx = 540 * ++this.rotatec  //旋转动画
      window.removeEventListener("scroll", this.onScroll)
      this.getDefaultData('ref')
      this.$refs.scroll.onRefresh()
    }
  }
}
</script>
<style lang='scss'>
.box {
  max-width: 750px;
  overflow-x: hidden;
  position: relative;
  margin: auto;
  // background:url(../assets/img/主视觉.png) center 0 no-repeat;
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
    height: 7.06rem;
    position: relative;
    background: url(../assets/img/banner.png);
    background-size: contain;
    .rules {
      display: block;
      width: 1.98rem;
      height: 0.73rem;
      background: url(../assets/img/rules.png);
      background-size: 100% 100%;
      position: absolute;
      right: -.06rem;
      top: 4.16rem;
    }
    .list {
      display: block;
      width: 1.85rem;
      height: 0.73rem;
      background: url(../assets/img/BXHlist.png);
      background-size: 100% 100%;
      position: absolute;
      right: -.06rem;
      top: 5.05rem;
    }
  }
}
.refresh {
  display: block;
  width: 0.75rem;
  height: 0.75rem;
  position: fixed;
  left: 0.31rem;
  bottom: 1.35rem;
  background: url(../assets/img/refresh.png) no-repeat;
  background-size: contain;
  transition: transform 1s;
  z-index: 10;
}
#circlebox {
  // width: 2rem;
  // height: 2rem;
  // background-color: red;
  // position: fixed;
}
</style>


