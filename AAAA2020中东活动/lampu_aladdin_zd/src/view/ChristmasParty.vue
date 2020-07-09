<template>
  <div class="box">
    <div class="shareBar" v-if="isShare">
      <div class="bar" @click="downApp()"></div>
    </div>
    <div class="header">
      <div class="lampGod"></div>
      <canvas id="canvas1"></canvas>
      <div class="ruleBox" :class="{top:isShare}">
        <span class="ruleTips" @click="goRule()"><em> القواعد و المكافآت</em></span>
        <span class="ruleTips tip2" @click="goHistory()"><em> سجل المصباح السحري</em></span>
      </div>
      <div class="lampD"></div>
      <Lamp ref="lamp"></Lamp>
    </div>
    <TabsScrollLoadList ref="scorll" @getDefaultData="getDefaultData"></TabsScrollLoadList>
    <Footer></Footer>
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
import Footer from "../components/Footer"
import Lamp from "../components/Lamp"
import MsgToast from "../components/commonToast"
import { globalBus } from '../utils/eventBus'
import TabsScrollLoadList from "../components/TabsScrollLoadList"
import getDateArr from "../utils/getDateArr"
import { Downloader, Parser, Player } from 'svga.lite'
import { setTimeout } from 'timers';
export default {
  components: { Loading, MsgToast, Footer, TabsScrollLoadList, Lamp },
  data() {
    return {
      isShare: false, //是否分享
      isMore: true,   //加载更多
      showT: false,  //提示弹窗显示
      tastMsg: "提示信息",  //基础弹窗提示信息
      rotatePx: 0,    //刷新旋转动画
      rotatec: 0,
      nowDay: null,
      svgaData1: null,
      svgaData2: null,
      player: {}
    }
  },
  created() {
    this.judgeShare()  //判断是否为分享环境,请求相应的接口 
    this.getDefaultData()
  },
  mounted() {
    this.aniGo()
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
      api.getDefault(0).then((res) => {
        const { response_data, response_status } = res.data
        if (response_status.code == 0) {  // 拆分存入數據
          const { step, c_day, date, list, schule, myrank, stime, etime, all_chance, re_chance, amount, charge, coins, user_info } = response_data
          this.$store.commit("changactiveityState", step)
          this.$store.commit("changNowDay", c_day)  //當前天
          // this.$store.commit("changday_down_time", date)  //當天剩餘時間
          this.$store.commit("changSetInited", 1)  //是否初始化頁面
          this.$store.commit("setAll_chance", all_chance)  //今日總召喚值
          this.$store.commit("setRe_chance", re_chance)  //今日剩餘召喚值
          this.$store.commit("setCharge", charge)  //今日已充金幣
          this.$store.commit("changDaily_tasks", schule)  //每日任務
          this.$store.commit("setSingUp", user_info.registered) //是否報名
          this.$store.commit("setAv", user_info.avatar)
          this.$store.commit('updateRankGroups', { //当前日榜信息
            key: c_day,
            loadCount: 0,
            loadEnd: list.length < 20,
            loading: false,
            none: list.length == 0,
            list: list,
            second: date,
            amount: amount,
            coins: coins
          })
          this.$store.commit("changTab", c_day)  //初始当天选择的
          this.$store.commit("changGroupsUserMsg", {//初始当前日榜个人信息
            key: c_day,
            msg: myrank
          })
          this.getDateArr(stime, etime)  //生成日榜数组
          this.nowDay = c_day
        } else {

        }
      })
    },
    aniGo() {
      let downloader = new Downloader()
      let parser = new Parser({ disableWorker: true })
        ; (async () => {
          let canvas = document.getElementById('canvas1')
          this.player = new Player(canvas)
          // http://img.17sing.tw/uc/activity/a87818ffa8b3daf5e1a5bddcc9f2c361_1591177271.svga	
          let fileData1 = await downloader.get('http://img.17sing.tw/uc/activity/33f1961043693a081eb0e7d7a1ca3190_1591177281.svga')
          this.svgaData1 = await parser.do(fileData1)
          let fileData2 = await downloader.get('http://img.17sing.tw/uc/activity/a87818ffa8b3daf5e1a5bddcc9f2c361_1591177271.svga')
          this.svgaData2 = await parser.do(fileData2)
          await this.player.mount(this.svgaData1)
          this.player.start()
          api.setNum()
        })()
    },
    async aniOpen(cb) {
      this.player.mount(this.svgaData2)
      this.player.start()
      setTimeout(() => {
        ; (async () => {
          this.player.mount(this.svgaData1)
          this.player.start()
          this.$refs.lamp.lucking = false
          cb()
        })()
      }, 3000)
    },
    getDateArr(stime, etime) {
      let dateArr = getDateArr(stime, etime)
      this.$store.commit('changDateArr', dateArr)
      this.$store.commit("changTotalDay", dateArr.length) //当前期活动总天数
    },
    downApp() {
      APP()
    },
    goRule() {
      let regstr = getString('token')
      location.href = `./index2.html?token=${regstr}`
    },
    goHistory() {
      globalBus.$emit('commonEvent', () => {
        let regstr = getString('token')
        location.href = `./index3.html?token=${regstr}`
      })
    },
    refrsh(val) { //刷新
      if (!val) {
        this.rotatePx = 540 * ++this.rotatec  //旋转动画
      }
      window.removeEventListener("scroll", this.onScroll)
      this.getDefaultData('ref')
    },
    closeToast() {
      this.showT = false
    },
    closeFirstPup() {
      this.showFirstGift = false
    },
  }
}
</script>
<style lang='scss'>
body::-webkit-scrollbar {
  width: 0;
}
body {
  direction: rtl;
}
.box {
  max-width: 750px;
  overflow-x: hidden;
  position: relative;
  margin: auto;
  .shareBar {
    position: fixed;
    z-index: 1010;
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
    height: 9.19rem;
    position: relative;
    background-image: url("../assets/img/banner.png"),
      url("../assets/img/bannerBtn.png");
    background-repeat: no-repeat, no-repeat;
    background-position: 0 0, 0 4.54rem;
    background-size: 100% auto;
    .lampGod {
      width: 6.21rem;
      height: 3.94rem;
      background: url(../assets/img/lampGod.png);
      background-size: 100% 100%;
      position: absolute;
      top: 2.38rem;
      left: 0.66rem;
      animation: heart 1.3s ease-in-out 2.7s infinite alternate;
    }
    #canvas1 {
      width: 7.5rem;
      height: 8.6rem;
      position: absolute;
      top: -0.3rem;
      left: 0;
      // transform: rotateY(-180deg);
    }
    .lampD {
      width: 7.5rem;
      height: 6.69rem;
      background: url(../assets/img/bannerTips.png);
      background-size: 100% 100%;
      position: absolute;
      top: 2.45rem;
    }
    .ruleBox {
      z-index: 10;
      position: absolute;
      top: 0.08rem;
      right: 0;
      &.top {
        top: 1.5rem;
      }
      .ruleTips {
        display: block;
        width: 1.85rem;
        height: 0.66rem;
        // text-align: center;
        background: url(../assets/img/ruleTips2.png);
        background-size: 100% 100%;
        margin-bottom: 0.07rem;
        em {
          height: 100%;
          font-size: 0.24rem;
          display: block;
          width: 1.35rem;
          display: flex;
          align-items: center;
          line-height: 0.2rem;
          margin-right: 0.15rem;
        }
        &.tip2 {
          width: 1.45rem;
          background: url(../assets/img/ruleTips.png);
          background-size: 100% 100%;
        }
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


