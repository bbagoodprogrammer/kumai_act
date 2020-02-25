<template>
  <div class="box">
    <div class="header">
      <a href="" class="share" @click.prevent="downApp()" v-if="isShare"></a>
      <a href="./index2.html" class="rules" :class="{moreTop:isShare}">قواعد&جوائز</a>
      <a href="" class="refresh" @click.prevent="refrsh()" :style="{transform:'rotate('+rotatePx+'deg)'}" v-show="activite=== 1 && !isShare"></a>
    </div>
    <div class="wards">
      <div class="lampBg"></div>
      <div class="lamp"></div>
    </div>
    <package-status></package-status>
    <task-list></task-list>
    <rank-list ref="rankList"></rank-list>
    <act-footer @getDefaultData="getDefaultData()"></act-footer>
    <loading></loading>
    <msg-toast :msg="tastMsg" @closeToast="closeToast()" v-show="showT"></msg-toast>

  </div>
</template>

<script>

import getString from "../utils/getString.js"
import api from "../api/apiConfig.js"
import Loading from "../components/Loading"
import MsgToast from "../components/commonToast"
import actFooter from "../components/ActFooter"
import PackageStatus from "../components/PackageStatus"
import TaskList from "../components/TaskList"
import RankList from "../components/RanksList"
import APP from "../utils/openApp.js"
import { mapState } from "vuex"
export default {
  components: { Loading, MsgToast, actFooter, PackageStatus, TaskList, RankList },
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
  computed: {
    ...mapState(['nowTab'])
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
    getDefaultData() { //初始化
      api.getDefault().then((res) => {
        const { response_data, response_status } = res.data
        if (response_status.code === 20000) { //活动未开始
          this.activite = 0
          this.$store.commit('changActiveityState', this.activite)
        } else if (response_status.code === 0) { //请求成功
          const { activity_statis, daily_tasks, owner_msg, user_rank } = response_data
          this.activite = activity_statis
          this.$store.commit('changActiveityState', this.activite) //活动状态
          if (daily_tasks.task) {
            this.$store.commit('changTaskState', daily_tasks.task) //任务完成状态
          }
          if (daily_tasks.gift) {
            this.$store.commit('changTaskReceive', daily_tasks.gift) //精灵球领取状态
          }
          this.$store.commit('changTotalSpirit', daily_tasks.total_spirit) //精灵球总数
          this.$store.commit('changShouliMsg', owner_msg) //收礼榜单个人信息
          this.$store.commit('changShouliRank', user_rank) //收礼榜单列表
        }
      })
    },
    downApp() {
      APP()
    },
    refrsh() { //刷新
      this.rotatePx = 540 * ++this.rotatec  //旋转动画
      window.removeEventListener("scroll", this.$refs.rankList.onScroll)  //去除滚动加载事件，避免减少数组后滚动条到底默认加载一次
      this.getDefaultData()
      this.$refs.rankList.load1 = false
      this.$refs.rankList.load2 = false
      if (this.nowTab == 'giving') {
        // api.songliRank('receiver', 0, 'more').then((res) => {
        //   var newArr = res.data.response_data.user_rank
        //   var newGivingMsg = res.data.response_data.owner_msg
        //   this.$store.commit('changShouliRank', newArr)
        //   this.$store.commit('changShouliMsg', newGivingMsg) //收礼榜单个人信息
        //   setTimeout(() => {
        //     window.addEventListener("scroll", this.$refs.rankList.onScroll)
        //   }, 500)
        // })
        setTimeout(() => {
          window.addEventListener("scroll", this.$refs.rankList.onScroll)
        }, 600)
      } else if (this.nowTab == 'receiving') {
        api.songliRank('send', 0, 'more').then((res) => {
          var newArr = res.data.response_data.user_rank
          var newReveceMsg = res.data.response_data.owner_msg
          this.$store.commit('changSongliRank', newArr)
          this.$store.commit('changSongliMsg', newReveceMsg) //收礼榜单个人信息
          setTimeout(() => {
            window.addEventListener("scroll", this.$refs.rankList.onScroll)
          }, 500)
        })
      }
    }
  }
}
</script>
<style lang='scss'>
body {
  background-color: #552996;
  direction: rtl;
}
.box {
  max-width: 750px;
  margin: auto;
  overflow-x: hidden;
  background: url(../assets/img/banner.png) center 0 no-repeat;
  background-size: 100% auto;
  .header {
    height: 6.06rem;
    position: relative;
    .rules {
      display: block;
      width: 1.42rem;
      height: 0.59rem;
      background: url(../assets/img/rules.png) no-repeat;
      background-size: contain;
      position: absolute;
      right: 0;
      top: 0.23rem;
      text-align: center;
      color: #fefefe;
      padding-left: 0.1rem;
      line-height: 0.49rem;
      font-size: 70%;
      &.moreTop {
        top: 1.5rem;
      }
    }
    .share {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      height: 1.2rem;
      background: url(../assets/img/share_bar.png);
      background-size: 100% 100%;
      z-index: 1000;
    }
  }
  .wards {
    width: 7.5rem;
    height: 5.56rem;
    background: url(../assets/img/wards.png);
    background-size: 100% 100%;
    position: relative;
    .lampBg {
      width: 2.12rem;
      height: 2.08rem;
      background: url(../assets/img/lampBg.png);
      background-size: 100% 100%;
      position: absolute;
      top: -0.61rem;
      left: 2.7rem;
      animation: roatae 5s linear infinite;
    }
    .lamp {
      width: 2.47rem;
      height: 1.89rem;
      background: url(../assets/img/lamp.png);
      background-size: 100% 100%;
      position: absolute;
      top: -0.61rem;
      left: 2.52rem;
      animation: lampAnmiation 3s linear infinite;
    }
  }
}
@keyframes roatae {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
@keyframes lampAnmiation {
  48%,
  62% {
    transform: scale(1, 1);
  }
  50% {
    transform: scale(1.1, 0.9);
  }
  56% {
    transform: scale(0.9, 1.1) translate(0, -5px);
  }
  59% {
    transform: scale(1, 1) translate(0, -3px);
  }
}
.refresh {
  display: block;
  width: 0.94rem;
  height: 1rem;
  position: fixed;
  left: 0.08rem;
  bottom: 1.65rem;
  background: url(../assets/img/refresh.png) no-repeat;
  background-size: 100% 100%;
  transition: all 1s;
  z-index: 1000;
}
</style>


