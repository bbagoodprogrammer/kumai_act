<template>
  <div class="box" :class="{bg:!showBannerBg}">
    <canvas id="bannerBg" v-show="!showBannerBg"></canvas>
    <div class="shareBar" v-if="isShare">
      <div class="bar" @click="downApp()"></div>
    </div>
    <div class="header">
      <div class="ruleTipsBox">
        <!-- <span class="ruleTips" @click="goMain()"></span> -->
        <span class="ruleTips2" @click="goRule()"></span>
        <!-- <span class="ruleTips3" @click="goTicket()"></span> -->
      </div>
    </div>
    <div class="tabs">
      <span :class="[{act:act_index == item},'tab'+item]" v-for="(item,index) in 3" :key="index" @click="tabClick(item)">
        <i class="red" v-if="item == 1 && point.one || item == 2 && point.two || item == 3 && point.three"></i>
      </span>
    </div>
    <keep-alive>
      <component :is="'Playing'+act_index"></component>
    </keep-alive>
    <act-footer></act-footer>
    <!-- <div href="" class="refresh circle" @click.prevent="refrsh()" :style="{transform:'rotate('+rotatePx+'deg)'}"></div> -->
  </div>
</template>

<script>

import getString from "../utils/getString"
import APP from "../utils/openApp"
import api from "../api/apiConfig"
import ActFooter from "../components/ActFooter"
import MsgToast from "../components/commonToast"
import { globalBus } from '../utils/eventBus'
import { mapState } from "vuex"
import Playing1 from "../components/Playing1"
import Playing2 from "../components/Playing2"
import Playing3 from "../components/Playing4"
// import Playing4 from "../components/Playing4"
// import Playing5 from "../components/Playing5"

import { Downloader, Parser, Player } from 'svga.lite'

const downloader = new Downloader()
const parser = new Parser({ disableWorker: true })

export default {
  components: { MsgToast, ActFooter, Playing1, Playing2, Playing3 },
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
      act_index: 1,
      showBannerBg: true,
    }
  },
  computed: {
    ...mapState(['point']),
    showCom() {
      return `Playing${this.act_index}`
    }
  },
  created() {
    this.judgeShare()  //判断是否为分享环境,请求相应的接口 
    this.getDefaultData()
  },
  mounted() {
    this.bannerGo()
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
          const { step, coins, point, rank, shcule, user_info } = response_data
          this.vxc('setActStatus', step)
          this.vxc('setDaily_b', coins)
          this.vxc('setRegistered', user_info.registered)
          this.vxc('setShcule', shcule)
          let newPoint = point
          newPoint.one = false
          this.vxc('setPoint', newPoint)
          this.vxc('setUserInfo', user_info)
        } else {
          this.toast(response_status.error)
        }
      })
    },
    tabClick(item) {
      this.act_index = item
      this.vxc('setAct_index', item)
    },
    downApp() {
      APP()
    },
    goMain() {
      let regstr = getString('token')
      let uid = getString('uid')
      let aid = getString('aid')
      location.href = `https://activity.wekarapp.com/static_html/2020/ceremony202000/index.html?token=${regstr}&uid=${uid}&aid=${aid}`
    },
    goRule() {
      let uid = getString('uid')
      let regstr = getString('token')
      location.href = `./index2.html?token=${regstr}&uid=${uid}`
    },
    goTicket() {
      let uid = getString('uid')
      let regstr = getString('token')
      let aid = getString('aid')
      location.href = `https://activity.wekarapp.com/static_html/2020/singervote2020/index.html?token=${regstr}&uid=${uid}&aid=${aid}`
    },
    refrsh() { //刷新
      this.rotatePx = 540 * ++this.rotatec  //旋转动画
      window.removeEventListener("scroll", this.onScroll)
      this.getDefaultData('ref')
    },
    async bannerGo() {
      let canvas = document.getElementById('bannerBg')
      const fileData = await downloader.get(`http://fstatic.cat1314.com/uc/svga/d33266b2aaf3ca2004efa57cf5ffb9b6_1605520727.svga`);
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
body {
  background: #281b24;
}
.box {
  max-width: 750px;
  overflow-x: hidden;
  position: relative;
  margin: auto;
  background: url("../assets/img/banner.png") 0 0 no-repeat,
    url("../assets/img/bg.png") 0 0 no-repeat;
  background-size: 100% auto;
  padding-bottom: 2rem;
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
    height: 9.76rem;
    position: relative;
    .ruleTipsBox {
      position: absolute;
      right: 0;
      top: 4.45rem;
      span {
        display: block;
        margin-bottom: 0.06rem;
      }
      .ruleTips {
        width: 1.49rem;
        height: 0.9rem;
        background: url(../assets/img/ruleTips1.png);
        background-size: 100% 100%;
      }
      .ruleTips2 {
        width: 1.48rem;
        height: 0.66rem;
        background: url(../assets/img/ruleTips2.png);
        background-size: 100% 100%;
      }
      .ruleTips3 {
        width: 1.48rem;
        height: 0.66rem;
        background: url(../assets/img/ruleTips3.png);
        background-size: 100% 100%;
      }
    }
  }
  .tabs {
    height: 1.92rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    transition: all 0.5s ease;
    padding: 0 0.4rem;
    span {
      width: 1.86rem;
      height: 1.92rem;
      position: relative;
      .red {
        display: block;
        width: 0.24rem;
        height: 0.24rem;
        background: url(../assets/img/red.png);
        background-size: 100% 100%;
        position: absolute;
        right: 0.1rem;
        top: 0.1rem;
      }
    }
    .tab1 {
      background: url(../assets/img/tab1.png) no-repeat;
      background-size: 100% 100%;
      &.act {
        background: url(../assets/img/tab1_act.png) no-repeat;
        background-size: 100% 100%;
      }
    }
    .tab2 {
      background: url(../assets/img/tab2.png) no-repeat;
      background-size: 100% 100%;
      &.act {
        background: url(../assets/img/tab2_act.png) no-repeat;
        background-size: 100% 100%;
      }
    }
    // .tab3 {
    //   background: url(../assets/img/tab3.png) no-repeat;
    //   background-size: 100% 100%;
    //   &.act {
    //     background: url(../assets/img/tab3_act.png) no-repeat;
    //     background-size: 100% 100%;
    //   }
    // }
    .tab3 {
      background: url(../assets/img/tab4.png) no-repeat;
      background-size: 100% 100%;
      &.act {
        background: url(../assets/img/tab4_act.png) no-repeat;
        background-size: 100% 100%;
      }
    }
    .tab5 {
      background: url(../assets/img/tab5.png) no-repeat;
      background-size: 100% 100%;
      &.act {
        background: url(../assets/img/tab5_act.png) no-repeat;
        background-size: 100% 100%;
      }
    }
  }
  .com {
    height: 15rem;
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


