<template>
  <div class="box">
    <div class="shareBar" v-if="isShare">
      <div class="bar" @click="downApp()"></div>
    </div>
    <div class="header">
      <div class="tipsBox" :class="{top:isShare}">
        <span class="ruleTips" @click="goRule()">活動規則&獎勵</span>
        <span class="ruleTips" @click="goHistory()">我的推薦記錄</span>
      </div>
    </div>
    <Time />
    <Rank />
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
import Time from "../components/Time"
import Rank from "../components/Rank"

export default {
  components: { MsgToast, ActFooter, Time, Rank },
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
          const { step, user_info, isRegistered, stime, etime, pstime, petime, ctime, limit, prize, list, myRank, fid } = response_data
          this.vxc('setActStatus', step)
          this.vxc('setPrize', prize)
          this.vxc('setStime', stime)
          this.vxc('setEtime', etime)
          this.vxc('setCtime', ctime)
          this.vxc('setList', list)
          this.vxc('setUserMsg', user_info)
          this.vxc('setPetime', petime)
          this.vxc('setIsRegistered', isRegistered)
          if (fid) {
            this.vxc('setFid', fid)
          }
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
    goHistory() {
      let regstr = getString('token')
      location.href = `./index3.html?token=${regstr}`
    },
    refrsh() { //刷新
      this.rotatePx = 540 * ++this.rotatec  //旋转动画
      window.removeEventListener("scroll", this.onScroll)
      this.getDefaultData('ref')
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
  background: rgba(29, 22, 95, 1) url(../assets/img/banner.png) center 0
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
    height: 6.7rem;
    position: relative;
    .tipsBox {
      position: fixed;
      right: 0;
      top: 4.88rem;
      z-index: 1000;
    }
    .ruleTips {
      display: block;
      width: 2.03rem;
      height: 0.79rem;
      background: url(../assets/img/ruleTips.png);
      background-size: 100% 100%;
      text-align: center;
      line-height: 0.79rem;
      font-size: 0.24rem;
      text-shadow: rgba(16, 20, 77, 1) 0.02rem 0 0,
        rgba(16, 20, 77, 1) 0 0.02rem 0, rgba(16, 20, 77, 1) -0.02rem 0 0,
        rgba(16, 20, 77, 1) 0 -0.02rem 0;
      text-indent: 0.15rem;
      &.mt {
        margin-top: 0.17rem;
      }
    }
  }
  .guaBox {
    position: relative;
  }
}
.refresh {
  display: block;
  width: 0.94rem;
  height: 0.94rem;
  position: fixed;
  right: 0.08rem;
  bottom: 1.35rem;
  background: url(../assets/img/refresh.png) no-repeat;
  background-size: contain;
  transition: transform 1s;
  z-index: 1000;
}
</style>


