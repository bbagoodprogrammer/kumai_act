<template>
  <div class="box">
    <div class="shareBar" v-if="isShare">
      <div class="bar" @click="downApp()"></div>
    </div>
    <div class="header">
      <span class="ruleTips" :class="{top:isShare}" @click="goRule()"></span>
    </div>
    <turn-table></turn-table>
    <integral></integral>
    <fragment></fragment>
    <rank></rank>
    <act-footer></act-footer>
    <loading></loading>
    <transition name="slide">
      <msg-toast :msg="tastMsg" @closeToast="closeToast()" v-show="showT"></msg-toast>
    </transition>
    <div href="" class="refresh circle" @click.prevent="refrsh()" :style="{transform:'rotate('+rotatePx+'deg)'}" v-if="activite == 1 || activite == 2"></div>
    <!-- <div href="" class="refresh circle" @click.prevent="refrsh()" :style="{transform:'rotate('+rotatePx+'deg)'}" @touchstart="down" @touchmove="move" @touchend="end" id="circlebox"></div> -->
    <!-- <div @touchstart="down" @touchmove="move" @touchend="end" id="circlebox" class="circle">
      <div class="left-line"></div>
      <div class="right-line"></div>
    </div> -->
    <!-- 遮罩 -->
    <!-- <div class="mask-box" id="page1mask" v-if="showif"></div> -->
    <!-- <testSlide></testSlide> -->
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
import TurnTable from "../components/Turntable"
import Integral from "../components/Integral"
import Fragment from "../components/Fragment"
import Rank from "../components/Rank"
export default {
  components: { Loading, MsgToast, ActFooter, TurnTable, Integral, Fragment, Rank },
  data() {
    return {
      isShare: false, //是否分享
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
  methods: {
    // /* 阻止移动端屏幕默认滑动 */
    // default(e) {
    //   let divv = document.getElementById('page1mask')
    //   if (divv) {
    //     divv.addEventListener(
    //       'touchmove',
    //       function (e) {
    //         e.preventDefault()
    //       },
    //       { passive: false }
    //     )
    //   }
    // },

    // getThisNode() {
    //   let odiv = document.getElementById('circlebox')
    //   odiv.style.left = `${this.positionX - 20}px`
    //   odiv.style.top = `${this.positionY - 20}px`
    // },
    // down(e) {
    //   console.log(e, e.touches)
    //   this.showif = true
    //   this.default()
    //   this.innerHeight = e.view.innerHeight
    //   this.innerWidth = e.view.innerWidth
    //   this.positionX = e.changedTouches[0].pageX
    //   this.positionY = e.changedTouches[0].pageY
    // },
    // move(e) {
    //   this.getThisNode()
    //   this.default()
    //   this.positionX = e.changedTouches[0].pageX
    //   this.positionY = e.changedTouches[0].pageY
    //   this.getThisNode()
    //   if (this.positionX <= 20) {
    //     this.positionX = 20
    //   } else if (this.positionX >= this.innerWidth - 20) {
    //     this.positionX = this.innerWidth - 20
    //   } else {
    //     this.positionX = this.positionX
    //   }
    //   if (this.positionY <= 20) {
    //     this.positionY = 20
    //   } else if (this.positionY >= this.innerHeight - 40) {
    //     this.positionY = this.innerHeight - 20
    //   } else {
    //     this.positionY = this.positionY
    //   }
    // },
    // end(e) {
    //   this.showif = false
    // },
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
      api.getDefault().then(res => {
        const { response_status, response_data } = res.data
        if (response_status.code === 20000) {
          this.activite = 0
          this.$store.commit('changActStatus', this.activite)
        } else if (response_status.code === 0) {
          const { activity_status, owner_msg, praise_area, puzzle_list, puzzle_total_counts, rank } = response_data
          this.$store.commit('changActStatus', activity_status)
          this.$store.commit('changUserMsg', owner_msg)
          this.$store.commit('changPraise_area', praise_area)  //给我点赞的人
          this.$store.commit('changRank', rank)    //榜单
          this.$store.commit('changPuzzle_total_counts', puzzle_total_counts) //合成拼图数
          this.$store.commit('changPuzzle_list', puzzle_list) //拼图数组
          sessionStorage.setItem('userMsg', JSON.stringify(owner_msg))
        }
      })
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
    },
    downApp() {
      APP()
    }
  }
}
</script>
<style lang='scss'>
body::-webkit-scrollbar {
  width: 0;
}
body {
  background: #cb4a45;
}
.box {
  max-width: 750px;
  padding-bottom: 2rem;
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
    height: 2.42rem;
    position: relative;
    .ruleTips {
      width: 1.7rem;
      height: 0.56rem;
      background: url(../assets/img/ruleTips.png);
      background-size: 100% 100%;
      position: absolute;
      right: 0;
      top: 0.17rem;
      &.top {
        top: 1.5rem;
      }
    }
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
#circlebox {
  // width: 2rem;
  // height: 2rem;
  // background-color: red;
  // position: fixed;
}
</style>


