<template>
  <div class="page pageIndex">
    <TrunMsg />
    <div class="shareBar" v-if="isShare">
      <div class="bar" @click="downApp()"></div>
    </div>
    <div class="header">
      <div class="banner_title" v-if="!banner_title_svga"></div>
      <canvas id="banner_title" v-show="banner_title_svga"></canvas>
      <div class="tipsBox">
        <span @click="$router.push('rule')">{{lang.rule_title}}</span>
        <span @click="showHistory = true">{{lang.scoreHistory}}</span>
      </div>
      <Tree ref="tree" />
      <Integral />
    </div>
    <TabsScrollLoadList ref="scorll" />
    <Footer />
    <div class="mask" v-show="showHistory">
      <transition name="slide">
        <historyTabsScrollLoadList v-if="showHistory" />
      </transition>
    </div>
    <div class="mask" v-show="showOwnerGift">
      <transition name="slide">
        <div class="luckPup" v-show="showOwnerGift">
          <i class="close" @click="showOwnerGift = false"></i>
          <h3>{{lang.luck}}</h3>
          <p class="luckTitle">{{lang.luckOwnerScoreTips.replace('$',myScore)}}</p>
          <div class="imgBox">
            <img :src="show0.image" alt="">
          </div>
          <strong>{{show0.name}}</strong>
          <p class="luckTips">{{lang.luckTips}}</p>
        </div>
      </transition>
    </div>
    <div class="mask" v-show="showAllGift">
      <transition name="slide">
        <div class="luckPup" v-show="showAllGift">
          <i class="close" @click="showAllGift = false"></i>
          <h3>{{lang.luck}}</h3>
          <p class="luckTitle">{{lang.luckAllScoreTips.replace('$',all_score)}}</p>
          <div class="imgBox">
            <img :src="show1.image" alt="">
          </div>
          <strong>{{show1.name}}</strong>
          <p class="luckTips">{{lang.luckTips}}</p>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { getUrlString } from '../utils'
import APP from "../utils/openApp"
import TabsScrollLoadList from "./TabsScrollLoadList"
import { init } from "../apis"
import Tree from "./Tree"
import Integral from "./Integral"
import Footer from "./Footer"
import historyTabsScrollLoadList from "./historyTabsScrollLoadList"
import TrunMsg from "./TrunMsg"

import { Downloader, Parser, Player } from 'svga.lite'

const downloader = new Downloader()
const parser = new Parser({ disableWorker: true })

export default {
  components: { TabsScrollLoadList, Tree, Integral, Footer, historyTabsScrollLoadList, TrunMsg },
  data() {
    return {
      isShare: false,
      showHistory: false,
      banner_title_svga: false,
      showOwnerGift: false,
      showAllGift: false,
      show0: false,
      show1: false,
      svgaAdress: {
        banner_title: 'http://fstatic.cat1314.com/uc/svga/5a09e6224a7de17d52f7ec5f9d40b3e0_1612174940.svga',
        banner_tree: 'http://fstatic.cat1314.com/uc/svga/e777f1868ecaad7da75e1dc4af72d52f_1612175000.svga'
      }
    }
  },
  computed: {
    ...mapState(['myScore', 'all_score'])
  },
  created() {
    this.judgeShare()
    this.init()
  },
  mounted() {
    for (let key in this.svgaAdress) {
      this.svgaGo(key, this.svgaAdress[key])
    }
  },
  methods: {
    init(val) {
      init().then(res => {
        const { c_day, days, step, stime, etime, schule, score, all_score, now, user_info, myrank, notice, show0, show1 } = res.data.response_data
        this.vxc('setSchule', schule)
        this.vxc('setStep', step)
        this.vxc('setScore', score)
        this.vxc('setAll_score', all_score)
        this.vxc('setTimeArr', this.getDateArr(stime, etime))
        this.vxc('setTotalDay', days)
        this.vxc('setC_day', c_day)
        this.vxc('setDown_second', this.down_second(step, stime, etime, now))
        this.vxc('setReg', user_info.registered)
        this.vxc('setInited', 1)
        this.vxc('setMyScore', myrank.score)
        this.vxc('setNotice', notice)
        if (show0) {
          this.show0 = show0
          this.showOwnerGift = true
        }
        if (show1) {
          this.show1 = show1
          this.showAllGift = true
        }

        if (!val) {
          this.vxc('changTab', c_day)
        }
      })
    },
    judgeShare() {//判断是否为分享环境,请求相应的接口 
      this.isShare = getUrlString('token') ? false : true
      this.vxc('setShareState', this.isShare) //分享状态
    },
    downApp() {
      APP()
    },
    getDateArr(stime, etime) {
      let arr = []
      for (let i = stime * 1; i <= etime * 1; i += 86400) {
        arr.push(i)
      }
      return arr
    },
    down_second(step, stime, etime, now) {
      if (step == 0) {
        return stime - now
      } else if (step == 1) {
        return etime - now
      } else {
        return 0
      }
    },
    async svgaGo(el, adress) {
      let canvas = document.getElementById(el)
      const fileData = await downloader.get(adress);
      const data = await parser.do(fileData);
      let player = new Player(canvas)
      await player.mount(data)
      if (el == 'banner_title') {
        this.banner_title_svga = true
      } else {
        this.$refs.tree.banner_tree_svga = true
      }

      player.start()
    }
  },
}
</script>

<style lang="scss">
body {
  background: #ff7784;
}
.pageIndex {
  overflow-x: hidden;
  background: #ff7784 url(../img/banner.png) no-repeat;
  background-size: 100% auto;
  .header {
    height: 7.97rem;
    padding-top: 4.43rem;
    position: relative;
    .banner_title {
      width: 5.57rem;
      height: 1.9rem;
      background: url(../img/banner_title.png);
      background-size: 100% 100%;
      position: absolute;
      top: 0.7rem;
      left: 0.96rem;
    }
    #banner_title {
      width: 5.57rem;
      height: 1.9rem;
      position: absolute;
      top: 0.7rem;
      left: 0.96rem;
    }
    .tipsBox {
      position: absolute;
      top: 2.53rem;
      right: 0;
      span {
        display: block;
        width: 1.39rem;
        height: 0.54rem;
        margin-bottom: 0.13rem;
        background: url(../img/ruleTips.png);
        background-size: 100% 100%;
        text-align: center;
        line-height: 0.48rem;
        font-size: 0.22rem;
        color: rgba(240, 163, 148, 1);
        text-indent: 0.15rem;
        white-space: nowrap;
      }
    }
  }
}
.luckPup {
  width: 5.84rem;
  height: 4.2rem;
  padding-bottom: 0.3rem;
  background: url(../img/taskPup_bg.png);
  background-size: 100% 100%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  h3 {
    font-size: 0.36rem;
    color: rgba(145, 77, 68, 1);
    font-weight: 600;
  }
  .luckTitle {
    color: rgba(145, 77, 68, 1);
    margin: 0.1rem auto;
  }
  .imgBox {
    width: 1.2rem;
    height: 1.2rem;
    background: #f46b6f;
    border: 0.02rem solid #ffeda4;
    border-radius: 0.14rem;
    img {
      width: 1.2rem;
      height: 1.2rem;
    }
  }
  strong {
    font-size: 0.28rem;
    color: rgba(234, 105, 135, 1);
  }
  .luckTips {
    font-size: 0.24rem;
    color: rgba(234, 105, 135, 1);
    margin-top: 0.15rem;
  }
  .close {
    display: block;
    width: 0.7rem;
    height: 0.7rem;
    background: url(../img/close.png);
    background-size: 100% 100%;
    position: absolute;
    bottom: -0.6rem;
    left: 2.73rem;
  }
}
</style>