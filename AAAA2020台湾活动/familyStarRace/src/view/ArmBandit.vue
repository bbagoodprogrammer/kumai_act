<template>
  <div class="box">
    <div class="shareBar" v-if="isShare">
      <div class="bar" @click="downApp()"></div>
    </div>
    <div class="header">
      <div class="tipsBox" :class="{top:isShare}">
        <span class="ruleTips" @click="goRule()">規則&獎勵</span>
        <span class="rank" @click="goLastRank()">家族守護榜</span>
        <span class="history" @click="showHistoryPup()">開獎明細</span>
      </div>
    </div>
    <div class="wards"></div>
    <TabsScrollLoadList :stime1="stime1" :stime2="stime2" :stime3="stime3" :etime1="etime1" :etime2="etime2" :etime3="etime3" ref="scorll" @getDefaultData="getDefaultData"></TabsScrollLoadList>
    <act-footer :fid="fid"></act-footer>
    <div href="" class="refresh circle" @click.prevent="refrsh()" :style="{transform:'rotate('+rotatePx+'deg)'}"></div>
    <div class="mask2" v-show="showHistory">
      <transition name="slide">
        <history :hList="hList" v-if="showHistory" />
      </transition>
    </div>
  </div>
</template>

<script>

import getString from "../utils/getString"
import APP from "../utils/openApp"
import api from "../api/apiConfig"
import ActFooter from "../components/ActFooter"
import MsgToast from "../components/commonToast"
import { globalBus } from '../utils/eventBus'
import getDateArr from "../utils/getDateArr"
import TabsScrollLoadList from "../components/TabsScrollLoadList"
import history from "../components/History"
export default {
  components: { MsgToast, ActFooter, TabsScrollLoadList, history },
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
      period: 1,
      showHistory: false,
      ctime: 0,
      stime1: 0,
      stime2: 0,
      stime3: 0,
      etime1: 0,
      etime2: 0,
      etime3: 0,
      step: 0,
      step_level: 1,
      days: 0,
      arrLength: 0,
      seconed: 0,
      fid: 0,
      hList: []
    }
  },
  created() {
    this.judgeShare()  //判断是否为分享环境,请求相应的接口 
    this.getDefaultData()
  },
  methods: {
    judgeShare() {//判断是否为分享环境,请求相应的接口 
      this.isShare = getString('token') ? false : true
      this.vxc('setShareState', this.isShare) //分享状态
    },
    getDefaultData(val) { //初始化
      api.getDefault().then(res => {
        const { response_status, response_data } = res.data
        if (response_status.code == 0) {
          const { ctime, days, second, stime, stime1, stime2, stime3, etime, etime1, etime2, etime3, fid, list, rank, step, step_level, user_info } = response_data
          this.ctime = ctime
          this.stime1 = stime1
          this.stime2 = stime2
          this.stime3 = stime3
          this.etime1 = etime1
          this.etime2 = etime2
          this.etime3 = etime3
          this.step_level = step_level
          this.step = step
          this.days = days
          this.fid = fid
          this.seconed = second
          this.vxc('setActStatus', step)
          this.vxc("setInited", 1)  //是否初始化頁面
          this.vxc('setUserSingUp', user_info.registered)
          let nowTime = getDateArr(stime1, etime1)
          // this.vxc('setActiIme', response_data.time_data)
          this.vxc('setDateArr', nowTime.arr)
          this.vxc('setTotalDay', nowTime.arr.length)
          this.arrLength = nowTime.arr.length
          sessionStorage.setItem('stime', stime)
          sessionStorage.setItem('etime', etime)
          if (!val) {
            this.vxc("setShowType", step_level)
            this.vxc("changTab", step_level == 1 ? days : 'total')
            this.vxc('setNowDay', step_level == 1 ? days : 'total')
            this.vxc('setOneNowDay', days)
          }
          this.vxc('setnowShowType', step_level)
          // this.period = response_data.data.period
          // let rank = response_data.data.list
          let obj = {
            type: step_level,
            data: { //当前日榜信息
              key: step_level == 1 ? days : 'total',
              loadCount: 0,
              loadEnd: list.length < 20,
              loading: false,
              none: list.length < 20,
              list: list,
              // step_level == 1 ? second : 
              second: this.computedInitSecond(step_level, days, ctime)
            }
          }
          this.vxc('updateRankGroups', obj)
          // let userMsg = response_data.data.myrank
          let userObj = {
            type: step_level,
            data: { //当前日榜信息
              key: step_level == 1 ? days : 'total',
              msg: rank ? rank : {}
            }
          }
          this.vxc('updateGroupsUserMsg', userObj)
        } else {
          this.toast(response_status.error)
        }
      })
    },
    computedInitSecond(type, day, ctime) {
      if (this.step == 0) {  //活動未開始  計算三個階斷的開始時間
        if (type == 1) {
          return this.stime1 - ctime
        } else if (type == 2) {
          return this.stime2 - ctime
        } else if (type == 3) {
          return this.stime3 - ctime
        }
      } else if (this.step == 2) {
        return 0
      } else {   //活動開始狀態
        if (type == 1) {
          if (day == 'total') {
            return this.etime1 - ctime
          } else if (day == this.days || day == this.arrLength) {  //當天或者最後一天
            return this.seconed
          } else {
            return this.seconed + 84600 * (day - this.days)
          }
        } else if (type == 2) {
          if (this.step_level == 1) {
            return this.stime2 - ctime
          } else {
            return this.etime2 - ctime
          }
        } else if (type == 3) {
          if (this.step_level == 1 || this.step_level == 2) {
            return this.stime3 - ctime
          } else {
            return this.etime3 - ctime
          }

        }
      }
    },
    downApp() {
      APP()
    },
    goRule() {
      let regstr = getString('token')
      location.href = `./index2.html?token=${regstr}`
    },
    goLastRank() {
      let regstr = getString('token')
      location.href = `./index3.html?token=${regstr}`
    },
    showHistoryPup() {
      api.getHistory(0).then(res => {
        this.showHistory = true
        this.hList = res.data.response_data.list
      })

    },
    refrsh() { //刷新
      this.rotatePx = 540 * ++this.rotatec  //旋转动画
      if (!this.$refs.scorll.rank.loading) {
        window.removeEventListener("scroll", this.onScroll)
        this.getDefaultData('ref')
        this.$refs.scorll.onRefresh()
      }
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
  background: rgba(29, 14, 9, 1) url(../assets/img/banner.png) center 0
    no-repeat;
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
    height: 7.75rem;
    position: relative;
    .tipsBox {
      position: absolute;
      right: 0;
      top: 0.17rem;
    }
    .ruleTips,
    .rank,
    .history {
      display: block;
      width: 1.59rem;
      height: 0.54rem;
      background: url(../assets/img/ruleTips.png);
      background-size: 100% 100%;
      font-size: 0.24rem;
      text-align: center;
      color: #764d2e;
      line-height: 0.54rem;
      text-indent: 0.2rem;
      margin-bottom: 0.08rem;
    }
    &.top {
      top: 1.5rem;
    }
  }
  .wards {
    width: 7.15rem;
    height: 4.99rem;
    background: url(../assets/img/wards.png);
    background-size: 100% 100%;
    margin: 0 auto;
  }
}
.refresh {
  display: block;
  width: 0.94rem;
  height: 1rem;
  position: fixed;
  right: 0.08rem;
  bottom: 1.35rem;
  background: url(../assets/img/refresh.png) no-repeat;
  background-size: contain;
  transition: transform 1s;
  z-index: 1000;
}
</style>


