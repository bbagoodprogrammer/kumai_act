<template>
  <div class="box">
    <div class="header">
      <a href="" class="share" @click.prevent="downApp()" v-if="isShare"></a>
      <a href="./index2.html" class="rules" :class="{moreTop:isShare}"></a>
    </div>
    <div class="wards">
    </div>
    <packets></packets>
    <tasks-list ref="tasksList"></tasks-list>
    <act-footer @getDefaultData="getDefaultData()"></act-footer>
    <loading></loading>
    <msg-toast :msg="tastMsg" @closeToast="closeToast()" v-show="showT"></msg-toast>
    <a href="" class="refresh" @click.prevent="refrsh()" :style="{transform:'rotate('+rotatePx+'deg)'}" v-show="activite!= 0 && !isShare"></a>
  </div>
</template>

<script>

import getString from "../utils/getString.js"
import api from "../api/apiConfig.js"
import Loading from "../components/Loading"
import MsgToast from "../components/commonToast"
import Packets from "../components/Packers"
import TasksList from "../components/TasksList"
import actFooter from "../components/ActFooter"
import APP from "../utils/openApp.js"
export default {
  components: { Loading, MsgToast, Packets, TasksList, actFooter },
  data() {
    return {
      isShare: false, //是否分享
      isMore: true,   //加载更多
      activite: 0,    //活动状态
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
      let regstr = getString('token')
      if (regstr) {
        this.isShare = false
      } else {
        this.isShare = true
      }
      this.$store.commit('changShareState', this.isShare) //分享状态
    },
    getDefaultData() { //初始化
      api.getDefault().then((res) => {
        const { response_data, response_status } = res.data
        if (response_status.code === 20000) { //活动未开始
          this.activite === 0
          this.$store.commit('changactiveitySta', this.activite) //活动状态
        } else if (response_status.code === 0) {
          const { packets, score, step, tasks, uid, registered, room } = response_data
          this.activite === step
          this.$store.commit('changactiveitySta', step) //活动状态
          this.$store.commit('changPackets', packets) //礼包列表
          this.$store.commit('changScore', score) //用户积分
          this.$store.commit('changTasks', tasks) //任务列表
          this.$store.commit('changRegistered', registered) //用户是否报名
          this.$store.commit('changRoomId', room)
        }
      })
    },
    downApp() {
      APP()
    },
    refrsh() { //刷新
      this.rotatePx = 540 * ++this.rotatec  //旋转动画
    }
  }
}
</script>
<style lang='scss'>
body {
  background-color: #fff2d4;
}
.box {
  max-width: 750px;
  position: relative;
  margin: auto;
  overflow-x: hidden;
  // background:url(../assets/img/banner.png) center 0 no-repeat;
  // background-size: 100% auto;
  .header {
    width: 7.5rem;
    height: 5.85rem;
    background: url(../assets/img/banner.png) center 0 no-repeat;
    background-size: 100% 100%;
    position: relative;
    .share {
      height: 1.2rem;
      background: url(../assets/img/share_bar.png);
      background-size: 100% 100%;
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 1000;
    }
    .rules {
      display: inline-block;
      width: 1.75rem;
      height: 0.66rem;
      background: url(../assets/img/rules.png) no-repeat;
      background-size: 100% 100%;
      position: absolute;
      right: 0;
      top: 0.63rem;
      &.moreTop {
        top: 1.5rem;
      }
    }
  }
  .wards {
    width: 6.89rem;
    height: 3.72rem;
    background: url(../assets/img/wards.png) no-repeat;
    background-size: 100% 100%;
    margin: -0.3rem auto 0;
    position: relative;
  }
}
.refresh {
  display: block;
  width: 0.94rem;
  height: 0.94rem;
  position: fixed;
  left: 0.08rem;
  bottom: 1.35rem;
  background: url(../assets/img/refresh.png) no-repeat;
  background-size: contain;
  transition: all 1s;
}
</style>


