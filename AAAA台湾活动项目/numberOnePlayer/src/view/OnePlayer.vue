<template>
  <div class="box">
    <div class="shareBar" v-if="isShare">
      <div class="bar" @click="downApp()"></div>
    </div>
    <div class="header">
      <div class="tipsBox" :class="{top:isShare}">
        <span @click="goMain()">{{lang.MainVenue}}</span>
        <span class="ruleTips" @click="goRule()">{{lang.Rules}}</span>
        <span @click="goknapsack()" v-if="is_allow == 1">{{lang.Pack}}</span>
      </div>
    </div>
    <plaything ref="play"></plaything>
    <task-and-rank></task-and-rank>
    <act-footer></act-footer>
    <loading></loading>
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
import ActFooter from "../components/ActFooter"
import MsgToast from "../components/commonToast"
import { globalBus } from '../utils/eventBus'
import Plaything from "../components/Plaything"
import TaskAndRank from "../components/TabsScrollLoadList"
import lang from "../config/lang"
export default {
  components: { Loading, MsgToast, ActFooter, Plaything, TaskAndRank },
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
      is_allow: 0
    }
  },
  created() {
    window.addEventListener("pageshow", function () {
      if (sessionStorage.getItem("need-refresh")) {
        location.reload();
        sessionStorage.removeItem("need-refresh");
      }
    });
    this.judgeShare()  //判断是否为分享环境,请求相应的接口 
    let tab = getString('t')
    if (tab) {
      this.getDefaultDataTicket()
    } else {
      this.getDefaultData()
    }

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
      api.getDefault().then(res => {
        const { response_data, response_status } = res.data
        if (response_status.code == 20000) { //活動未開始
          this.activite = 0
          this.$store.commit("changActStatus", this.activite)
        } else if (response_status.code == 0) {  // 拆分存入數據
          const { activity_status, daily_b, daily_tasks, owner_msg, praise_area, send_praise, lv_gift_status, is_allow } = response_data
          this.$store.commit("changSetInited", 1)  //是否初始化頁面
          this.activite = activity_status
          this.$store.commit("changActStatus", activity_status)
          this.$store.commit("changDaily_b", daily_b)    //每日遊戲B
          this.$store.commit("changDaily_tasks", daily_tasks)  //每日任務
          this.$store.commit('changRegistered', owner_msg.is_reg) //报名状态
          this.$store.commit('changPraise_area', praise_area)   //点赞数组
          this.$store.commit('changSend_praise', send_praise)
          this.$store.commit('changScore', owner_msg.score)
          this.$store.commit("changGroupsUserMsg", {//初始当前日榜个人信息
            key: 2,
            msg: owner_msg
          })
          this.$store.commit('changLv_gift_status', lv_gift_status) //有無獎勵未領取
          this.is_allow = is_allow
        }
      })
    },
    getDefaultDataTicket() {   //优先展示任务列表任务列表
      api.getDefault(1).then(res => {
        const { response_data, response_status } = res.data
        if (response_status.code == 20000) { //活動未開始
          this.activite = 0
          this.$store.commit("changActStatus", this.activite)
        } else if (response_status.code == 0) {  // 拆分存入數據
          const { activity_status, daily_b, daily_tasks, owner_msg, praise_area, send_praise, lv_gift_status, is_allow, ticket_list } = response_data
          this.$store.commit("changSetInited", 1)  //是否初始化頁面
          this.activite = activity_status
          this.$store.commit("changActStatus", activity_status)
          this.$store.commit("changDaily_b", daily_b)    //每日遊戲B
          this.$store.commit("changDaily_tasks", daily_tasks)  //每日任務
          this.$store.commit('changRegistered', owner_msg.is_reg) //报名状态
          this.$store.commit('changPraise_area', praise_area)   //点赞数组
          this.$store.commit('changSend_praise', send_praise)
          this.$store.commit('changScore', owner_msg.score)
          this.$store.commit("changGroupsUserMsg", {//初始当前日榜个人信息
            key: 2,
            msg: owner_msg
          })
          this.$store.commit('changLv_gift_status', lv_gift_status) //有無獎勵未領取
          this.is_allow = is_allow
          this.$store.commit('changTicketState', ticket_list)
          this.$refs.play.showCom = 'playing2'
          this.scorllTo()
        }
      })
    },
    scorllTo() {
      window.scrollTo(0, 160)
    },
    onScroll() {
      if (this.isMore) {
        const scrollToBottom = (document.documentElement.scrollTop || document.body.scrollTop) + window.innerHeight >= document.body.scrollHeight - 100
        if (scrollToBottom) { //加載更多
        }
      }
    },
    goknapsack() {
      if (this.isShare) { //分享下打开app
        APP()
        return
      }
      var u = navigator.userAgent;
      var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
      var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
      if (isAndroid) {
        location.href = `goto:{"controller":"com.utalk.hsing.activity.MyPackActivity","property": {}}`
      } else {
        location.href = `goto:{"controller":"LTBrisDaumiSubjVC","property": {}}`
      }
    },
    downApp() {
      APP()
    },
    goMain() {
      let regstr = getString('token')
      let uid = getString("uid")
      location.href = `http://activity.17sing.tw/static_html/2019/mainVenue/index.html?uid=${uid}&token=${regstr}`
    },
    goRule() {
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
    height: 5.07rem;
    position: relative;
    .tipsBox {
      position: absolute;
      right: 0;
      top: 0.17rem;
      &.top {
        top: 1.5rem;
      }
      span {
        width: 1.33rem;
        height: 0.53rem;
        background: url(../assets/img/tipsBg.png);
        background-size: 100% 100%;
        display: block;
        margin-top: 0.02rem;
        text-align: center;
        line-height: 0.53rem;
        color: #b98300;
        font-size: 71%;
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
</style>


