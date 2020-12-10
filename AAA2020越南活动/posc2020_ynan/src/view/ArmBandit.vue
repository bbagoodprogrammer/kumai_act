<template>
  <div class="box" :class="{pb:nowInitData.reg || !kol,pb2:nowUserScore.up,bg:!showBannerBg}">
    <canvas id="bannerBg" v-show="!showBannerBg"></canvas>
    <div class="shareBar" v-if="isShare">
      <div class="bar" @click="downApp()"></div>
    </div>
    <div class="header">
      <span class="ruleTips" @click="goMain()">Hội trường Gala năm>> <i></i> </span>
      <span class="ruleTips top" @click="goRule()">Thể lệ & Giải thưởng>><i></i> </span>
    </div>
    <div class="giftImg"></div>
    <TabsScrollLoadList ref="list" />
    <act-footer></act-footer>

  </div>
</template>

<script>

import getString from "../utils/getString"
import APP from "../utils/openApp"
import api from "../api/apiConfig"
import ActFooter from "../components/ActFooter"
import MsgToast from "../components/commonToast"
import { globalBus } from '../utils/eventBus'
import TabsScrollLoadList from "../components/TabsScrollLoadList"
import { mapState } from 'vuex'

import { Downloader, Parser, Player } from 'svga.lite'

const downloader = new Downloader()
const parser = new Parser({ disableWorker: true })

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
      showBannerBg: true,
    }
  },
  created() {
    this.judgeShare()  //判断是否为分享环境,请求相应的接口 
    this.getDefaultData()
  },
  mounted() {
    this.bannerGo()
  },
  computed: {
    ...mapState(['nowTab', "initGrounps", "kol"]),
    nowUserScore() {
      return this.initGrounps[this.nowTab].owner ? this.initGrounps[this.nowTab].owner : {
        uid1: { user: {} },
        uid2: { user: {} }
      }
    },
    nowInitData() {
      return this.initGrounps[this.nowTab]
    }
  },
  methods: {
    judgeShare() {//判断是否为分享环境,请求相应的接口 
      this.isShare = getString('token') ? false : true
      this.vxc('setShareState', this.isShare) //分享状态
    },
    getDefaultData(val) { //初始化
    },
    downApp() {
      APP()
    },
    goRule() {
      let regstr = getString('token')
      location.href = `./index2.html?token=${regstr}`
    },
    goMain() {
      let regstr = getString('token')
      let uid = getString('uid')
      let aid = getString('aid')
      location.href = `/static_html/2020/ceremony202000/index.html?token=${regstr}&uid=${uid}&aid=${aid}`
    },
    refrsh() { //刷新
      this.rotatePx = 540 * ++this.rotatec  //旋转动画
      window.removeEventListener("scroll", this.onScroll)
      this.getDefaultData('ref')
    },
    tabClick(val) {
      this.actStep = val
    },
    async bannerGo() {
      let canvas = document.getElementById('bannerBg')
      const fileData = await downloader.get(`http://fstatic.cat1314.com/uc/wyn/365852af385c8eac7cf961b1f343f014_1607592919cwyn`);
      const data = await parser.do(fileData);
      let player = new Player(canvas)
      await player.mount(data)
      this.showBannerBg = false
      player.start()
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
  background: rgba(28, 21, 44, 1) url(../assets/img/banner.png) center 0
    no-repeat;
  background-size: 100% auto;
  padding-bottom: 1rem;
  &.pb {
    padding-bottom: 3rem;
  }
  &.pb2 {
    padding-bottom: 4rem;
  }
  &.bg {
    background: url(../assets/img/banner1.jpg) center 0 no-repeat;
    background-size: 100% auto;
  }
  #bannerBg {
    width: 7.5rem;
    height: auto;
    position: absolute;
    top: 0;
    left: 0;
  }
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
    height: 8.45rem;
    position: relative;
    .ruleTips {
      width: 2.08rem;
      height: 0.79rem;
      background: url(../assets/img/ruleTips.png);
      background-size: 100% 100%;
      position: absolute;
      right: 0;
      top: 6.56rem;
      text-align: center;
      color: rgba(176, 77, 39, 1);
      font-size: 0.26rem;
      white-space: nowrap;
      display: flex;
      justify-content: center;
      line-height: 0.65rem;
      padding-left: 0.2rem;
      font-weight: 600;
      i {
        width: 0.24rem;
        height: 0.23rem;
        background: url(../assets/img/arr.png);
        background-size: 100% 100%;
        margin: 0.2rem 0 0 0.05rem;
      }
      &.top {
        top: 7.4rem;
      }
    }
  }
  .giftImg {
    width: 7.5rem;
    height: 6.27rem;
    background: url(../assets/img/giftImg.png);
    background-size: 100% 100%;
    position: relative;
    z-index: 50;
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
</style>


