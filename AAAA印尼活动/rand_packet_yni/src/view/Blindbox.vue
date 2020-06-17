<template>
  <div class="box">
    <div class="shareBar" v-if="isShare">
      <div class="bar" @click="downApp()"></div>
    </div>
    <div class="header">
      <div class="tipsBox" :class="{top:isShare}">
        <span class="ruleTips" @click="goRule()">{{lang.rule}}</span>
        <span class="ruleTips index2" @click="goIndex3()">{{lang.surpriseTime}}</span>
      </div>
    </div>
    <box />
    <TabsScrollLoadList />
    <act-footer></act-footer>
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
import ActFooter from "../components/ActFooter"
import Box from "../components/Box"
import MsgToast from "../components/commonToast"
import TabsScrollLoadList from "../components/TabsScrollLoadList"
import { globalBus } from '../utils/eventBus'
import getDateArr from "../utils/getDateArr"
export default {
  components: { Loading, MsgToast, ActFooter, Box, TabsScrollLoadList },
  data() {
    return {
      isShare: false, //是否分享
      isMore: true,   //加载更多
      showT: false,  //提示弹窗显示
      tastMsg: "提示信息",  //基础弹窗提示信息
      userState: 0,   //用户状态（是否报名）
      rotatePx: 0,    //刷新旋转动画
      rotatec: 0,
    }
  },
  created() {
    this.judgeShare()  //判断是否为分享环境,请求相应的接口 
    this.getDefaultData()
  },
  methods: {
    judgeShare() {//判断是否为分享环境,请求相应的接口 
      this.isShare = getString('token') ? false : true
      this.vuexCommit('changShareState', this.isShare) //分享状态
    },
    getDefaultData(val) { //初始化
      api.getDefault(-1).then(res => {
        const { response_status, response_data } = res.data
        if (response_status.code == 20000) {
          this.vuexCommit('changActStatus', 0)
        } else if (response_status.code == 0) {
          const { step, currentDay, totalDay, totalTime, dayTime, stime, etime, owner, packet, rank } = response_data
          this.vuexCommit('changActStatus', step)
          this.vuexCommit('setNowDay', currentDay)
          this.vuexCommit("setTab", currentDay)
          this.vuexCommit('setTotalDay', totalDay)
          this.vuexCommit('setTotalTime', totalTime)
          this.vuexCommit('setDayTime', dayTime)
          this.vuexCommit('setDateArr', getDateArr(stime, etime))
          this.vuexCommit('setRegistered', owner ? owner.registered : false)
          this.vuexCommit('setPacket', packet) //packet
          this.vuexCommit('updateRankGroups', { //当前日榜信息
            key: currentDay,
            loadCount: 0,
            loadEnd: rank.length < 20,
            loading: false,
            none: rank.length == 0,
            list: rank,
            second: dayTime
          })
          this.vuexCommit("changGroupsUserMsg", {//初始当前日榜个人信息
            key: currentDay,
            msg: owner ? owner : {}
          })
          this.vuexCommit("setInited", false)  //是否初始化頁面
        } else {
          this.toast(response_status.error)
        }
      })
    },
    downApp() {
      APP()
    },
    goRule() {
      let regstr = getString('token')
      location.href = `./index2.html?token=${regstr}&v=1`
    },
    goIndex3() {
      if (this.isShare) {
        APP()
      } else {
        let regstr = getString('token')
        location.href = `./index3.html?token=${regstr}&v=1`
      }
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
    height: 4.18rem;
    position: relative;
    .tipsBox {
      position: absolute;
      right: 0;
      top: 0.17rem;
      text-align: center;
      color: #a24e04;
      font-size: 0.22rem;
      font-weight: 700;
      line-height: 0.66rem;
      text-indent: 0.15rem;
      white-space: nowrap;
      &.top {
        top: 1.5rem;
      }
      .ruleTips {
        display: block;
        width: 1.85rem;
        height: 0.66rem;
        background: url(../assets/img/ruleTips.png);
        background-size: 100% 100%;
      }
      .index2 {
        margin-top: 0.08rem;
      }
    }
  }
}
// .refresh {
//   display: block;
//   width: 0.94rem;
//   height: 1rem;
//   position: fixed;
//   left: 0.08rem;
//   bottom: 1.35rem;
//   background: url(../assets/img/refresh.png) no-repeat;
//   background-size: contain;
//   transition: transform 1s;
//   z-index: 1000;
// }
#circlebox {
  // width: 2rem;
  // height: 2rem;
  // background-color: red;
  // position: fixed;
}
</style>


