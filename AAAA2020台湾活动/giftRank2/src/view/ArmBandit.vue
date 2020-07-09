<template>
  <div class="box">
    <div class="shareBar" v-if="isShare">
      <div class="bar" @click="downApp()"></div>
    </div>
    <div class="header">
      <div class="tipsBox" :class="{top:isShare}">
        <span class="ruleTips" @click="goRule()">規則&獎勵</span>
        <span class="histyry" @click="goLastRank()" v-if="period!=1">往期名人堂</span>
      </div>

    </div>
    <div class="wards"></div>
    <TabsScrollLoadList ref="scorll" @getDefaultData="getDefaultData"></TabsScrollLoadList>
    <act-footer></act-footer>
    <div href="" class="refresh circle" @click.prevent="refrsh()" :style="{transform:'rotate('+rotatePx+'deg)'}"></div>
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
export default {
  components: { MsgToast, ActFooter, TabsScrollLoadList },
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
      period: 1
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
      this.isShare = getString('token') ? false : true
      this.vxc('setShareState', this.isShare) //分享状态
    },
    getDefaultData(val) { //初始化
      api.getDefault().then(res => {
        const { response_status, response_data } = res.data
        if (response_status.code == 0) {
          this.vxc('setActStatus', response_data.time_data.step)
          this.vxc("setInited", 1)  //是否初始化頁面
          this.vxc('setUserSingUp', response_data.data.register)
          let nowTime = getDateArr(response_data.time_data)
          this.vxc('setActiIme', response_data.time_data)
          this.vxc('setDateArr', nowTime.arr)
          sessionStorage.setItem('stime', response_data.time_data.stime)
          sessionStorage.setItem('etime', response_data.time_data.etime)
          if (!val) {
            this.vxc("setShowType", response_data.data.type)
            this.vxc("changTab", response_data.time_data.days)
            this.vxc('setNowDay', response_data.time_data.days)
          }
          this.period = response_data.data.period
          let rank = response_data.data.list
          let obj = {
            type: response_data.data.type,
            data: { //当前日榜信息
              key: response_data.time_data.days,
              loadCount: 0,
              loadEnd: rank.length < 20,
              loading: false,
              none: rank.length < 20,
              list: rank,
              second: response_data.data.current_time
            }
          }
          this.vxc('updateRankGroups', obj)
          let userMsg = response_data.data.myrank
          let userObj = {
            type: response_data.data.type,
            data: { //当前日榜信息
              key: response_data.time_data.days,
              msg: userMsg ? userMsg : {}
            }
          }
          this.vxc('updateGroupsUserMsg', userObj)
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
      location.href = `./index2.html?token=${regstr}`
    },
    goLastRank() {
      let regstr = getString('token')
      location.href = `./index3.html?token=${regstr}`
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
  background: #8338d0 url(../assets/img/banner.png) center 0 no-repeat;
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
    height: 5.31rem;
    position: relative;
    .tipsBox {
      position: absolute;
      right: 0;
      top: 0.17rem;
    }
    .ruleTips,
    .histyry {
      display: block;
      width: 1.5rem;
      height: 0.64rem;
      background: url(../assets/img/ruleTips.png);
      background-size: 100% 100%;
      font-size: 0.24rem;
      text-align: center;
      line-height: 0.64rem;
    }
    .histyry {
      margin-top: 0.08rem;
    }
    &.top {
      top: 1.5rem;
    }
  }
  .wards {
    width: 7.18rem;
    height: 3.75rem;
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


