<template>
  <div class="box">
    <div class="shareBar" v-if="isShare">
      <div class="bar" @click="downApp()"></div>
    </div>
    <div class="header">
      <div class="tipsBox" :class="{top:isShare}">
        <span class="ruleTips" @click="goRule()">規則&獎勵</span>
        <span class="rankTips" @click="goRank()">助威守護榜</span>
      </div>
    </div>
    <div class="wards">

    </div>
    <tabs-scroll-load-list ref="scorll"></tabs-scroll-load-list>
    <act-footer></act-footer>
    <loading></loading>
    <transition name="slide">
      <msg-toast :msg="tastMsg" @closeToast="closeToast()" v-show="showT"></msg-toast>
    </transition>
    <div href="" class="refresh circle" @click.prevent="refrsh()" :style="{transform:'rotate('+rotatePx+'deg)'}" v-if="!isShare && activite != 0"></div>
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
import TabsScrollLoadList from '../components/TabsScrollLoadList'
import { mapState } from "vuex"
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
      // positionX: 0,
      // positionY: 0,
      // innerHeight: 0,
      // innerWidth: 0,
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
    this.getDefaultData()
  },
  mounted() {

  },
  computed: {
    ...mapState(['mainTab', 'tab'])
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
      api.getDefault(this.tab).then(res => {
        const { response_status, response_data } = res.data
        if (response_status.code == 20000) {
          this.activite = 0
          this.$store.commit('changActStatus', this.activite)
        } else if (response_status.code == 0) {
          const { step, step1, step2, step1Time, step2Time, step0Time, owner, rank } = response_data
          this.activite = step
          this.$store.commit('changActStatus', step)
          this.$store.commit('changStep', step1)
          this.$store.commit('changStep2', step2)
          this.$store.commit('changStepTime', step1Time)
          this.$store.commit('changStep2Time', step2Time)
          this.$store.commit('changStep3Time', step0Time)
          this.$store.commit('changUserMsg', owner)
          this.$store.commit("changSetInited", 1)  //是否初始化頁面
          //风云榜初始化榜单
          this.$store.commit('updateRankGroups', { //当前日榜信息
            key: 1,
            loadCount: 0,
            loadEnd: rank < 20,
            loading: false,
            none: false,
            list: rank,
          })
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
    downApp() {
      APP()
    },
    goRule() {
      let regstr = getString('token')
      location.href = `./index2.html?token=${regstr}`
    },
    goRank() {
      sessionStorage.setItem('actStep', this.activite)  //活動狀態
      let regstr = getString('token')
      location.href = `./index3.html?token=${regstr}`
    },
    refrsh() { //刷新
      this.rotatePx = 540 * ++this.rotatec  //旋转动画
      window.removeEventListener("scroll", this.onScroll)
      if (this.mainTab == 0) {
        this.getDefaultData('ref')
      } else if (this.tab != 1 || this.mainTab == 1) {
        this.$refs.scorll.onRefresh()
      }

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
    height: 6.61rem;
    position: relative;
    .tipsBox {
      position: absolute;
      right: 0;
      top: 0.17rem;
      .ruleTips {
        display: block;
        width: 1.55rem;
        height: 0.6rem;
        background: url(../assets/img/ruleTips.png);
        background-size: 100% 100%;
        color: #fff9d6;
        font-size: 80%;
        text-align: center;
        line-height: 0.55rem;
      }
      .rankTips {
        display: block;
        width: 1.55rem;
        height: 0.6rem;
        background: url(../assets/img/ruleTips.png);
        background-size: 100% 100%;
        color: #fff9d6;
        font-size: 80%;
        text-align: center;
        line-height: 0.55rem;
        margin-top: 0.1rem;
      }
      &.top {
        top: 1.5rem;
      }
    }
  }
  .wards {
    width: 7.12rem;
    height: 4.15rem;
    margin: 0 auto;
    background: url(../assets/img/wards.png);
    background-size: 100% 100%;
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
  z-index: 100;
}
#circlebox {
  // width: 2rem;
  // height: 2rem;
  // background-color: red;
  // position: fixed;
}
</style>


