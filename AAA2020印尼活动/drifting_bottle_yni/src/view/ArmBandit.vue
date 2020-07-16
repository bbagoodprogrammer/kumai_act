<template>
  <div class="box">
    <div class="canvasBox">
      <canvas id="Bg"></canvas>
      <canvas id="BgBtn"></canvas>
      <canvas id="Throw"></canvas>
      <canvas id="Get"></canvas>
      <canvas id="bottle"></canvas>
    </div>
    <div class="shareBar" v-if="isShare">
      <div class="bar" @click="downApp()"></div>
    </div>
    <div class="header">
      <span class="bgSoundTips" :style="{transform:'rotate('+rotateDeg+'deg)'}" @click="setBgSound()"></span>
      <div class="tipsBox">
        <span class="tips ruleTips" :class="{top:isShare}" @click="goRule()">Hadiah<br />Aturan</span>
        <span class="tips songList" @click="showRank()">Daftar<br />lagu</span>
        <span class="tips myHistory" @click="goHistory()">Catatan<br />lempar</span>
      </div>
    </div>
    <act-footer :dstime="dstime" :detime="detime" :gstime="gstime" :getime="getime" :plarerArr="plarerArr" @svgaStart="svgaStart"></act-footer>
    <!-- <test /> -->
    <!-- <div href="" class="refresh circle" @click.prevent="refrsh()" :style="{transform:'rotate('+rotatePx+'deg)'}"></div> -->
  </div>
</template>

<script>

import getString from "../utils/getString"
import APP from "../utils/openApp"
import api from "../api/apiConfig"
import ActFooter from "../components/ActFooter"
import test from "../components/test"
import MsgToast from "../components/commonToast"
import { globalBus } from '../utils/eventBus'
import { Downloader, Parser, Player } from 'svga.lite'
import { Howl, Howler } from 'howler';
import { resolve } from 'url';


const downloader = new Downloader()
const parser = new Parser({ disableWorker: true })
export default {
  components: { MsgToast, ActFooter, test },
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
      bgSound: null,
      rotateDeg: 0,
      bgTimer: null,
      dstime: 0,
      detime: 0,
      gstime: 0,
      getime: 0,
      svgaAddress: {
        Bg: {
          addres: "//fstatic.cat1314.com/uc/svga/bg.svga", //背景
          isStop: false
        },
        BgBtn: {
          addres: "//fstatic.cat1314.com/uc/svga/footer.svga", //沙灘底部
          isStop: false
        },
        Throw: {
          addres: "//fstatic.cat1314.com/uc/svga/throw.svga", //投
          isStop: true
        },
        Get: {
          addres: "//fstatic.cat1314.com/uc/svga/get.svga", //撈
          isStop: true
        },
        bottle: {
          addres: "//fstatic.cat1314.com/uc/svga/bottle.svga", //瓶子
          isStop: false
        }
      },
      plarerArr: {}
    }
  },
  created() {
    this.creatBgMusic()
    this.judgeShare()  //判断是否为分享环境,请求相应的接口 
    this.getDefaultData()
    let pro2 = this.downloaderData(this.svgaAddress)
    Promise.all([this.getDefaultData, pro2]).then((val) => {
      this.svgaGo()
    })
    globalBus.$on('goBg', () => {
      setTimeout(() => {
        this.bgSound.play()
      }, 2000)
    })
    globalBus.$on('stopBg', () => {
      this.bgSound.pause()
    })
  },
  mounted() {
  },
  methods: {
    judgeShare() {//判断是否为分享环境,请求相应的接口 
      this.isShare = getString('token') ? false : true
      this.vxc('setShareState', this.isShare) //分享状态
    },
    getDefaultData(val) { //初始化
      return new Promise((resolve, reject) => {
        api.getDefault().then(res => {
          const { response_status, response_data } = res.data
          if (response_status.code == 0) {
            resolve(res)
            const { step, dstep, gstep, user_info, chance, dstime, detime, gstime, getime } = response_data
            this.activite = step
            this.vxc('setActStatus', step)
            this.vxc('setDstep', dstep)
            this.vxc('setGstep', gstep)
            this.vxc('setChance', chance)
            this.vxc('setUserMsg', user_info)
            this.dstime = dstime
            this.detime = detime
            this.gstime = gstime
            this.getime = getime
          } else {
            this.toast(response_status.error)
          }
        })
      })
    },
    creatBgMusic() {
      this.bgSound = new Howl({
        src: ['mp3/bg.mp3'],
        autoplay: true,
        loop: true,
        volume: 0.5,
        onplay: () => {
          this.compuetBgDeg()
        },
        onloaderror: () => {
          this.toast(`Audio memuat gagal, coba lagi nanti`)
        }
      });
    },
    setBgSound() {
      if (this.bgSound.state() != 'loaded') return
      if (this.bgSound.playing()) {
        clearInterval(this.bgTimer)
        this.bgSound.pause()
      } else {
        this.bgSound.play()
        this.compuetBgDeg()
      }
    },
    compuetBgDeg() {
      clearInterval(this.bgTimer)
      this.bgTimer = setInterval(() => {
        this.rotateDeg += 3
      }, 30)
    },
    downloaderData(arr) {
      return new Promise((res, rej) => {
        let PromiseArr = []
        for (let item in arr) {
          PromiseArr.push(this.loadSvgaData(arr[item]))
        }
        Promise.all(PromiseArr).then((values) => {
          res(values)
        })
      })
    },
    loadSvgaData(fileItem) {
      return new Promise((resolve, reject) => {
        ; (async () => {
          const fileData = await downloader.get(fileItem.addres);
          const data = await parser.do(fileData);
          fileItem.data = data
          resolve(data);
        })()
      });
    },
    svgaGo() {
      for (let item in this.svgaAddress) {
        this.svgaStart(item, 1, this.svgaAddress[item].data, this.svgaAddress[item].isStop)
      }
      // this.svgaStart("Bg", 1, this.svgaAddress['Bg'].data)
      // this.svgaStart("BgBtn", 1, this.svgaAddress['BgBtn'].data)
      // this.svgaStart("Bg", 1, this.svgaAddress['Bg'].data)
      // this.svgaStart("Bg", 1, this.svgaAddress['Bg'].data)
    },
    async svgaStart(className, start, data, stop) {
      let canvas = document.getElementById(className)
      let player = new Player(canvas)
      if (stop) {
        player.set({ startFrame: start, loop: 1, fillMode: 'none' })
      } else {
        player.set({ startFrame: start })
      }
      await player.mount(data)
      if (!stop) {
        player.start()
      }
      this.plarerArr[className] = {
        player,
      }
      this.vxc('plarerArr', this.plarerArr)
    },
    downApp() {
      APP()
    },
    goRule() {
      let regstr = getString('token')
      location.href = `./index2.html?token=${regstr}`
    },
    showRank() {
      sessionStorage.setItem('activite', this.activite)
      let regstr = getString('token')
      location.href = `./index3.html?token=${regstr}`
    },
    goHistory() {
      let regstr = getString('token')
      location.href = `./index4.html?token=${regstr}`
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
  height: 100%;
  overflow-x: hidden;
  position: relative;
  margin: auto;
  background-color: #0c96ff;
  // background:url(../assets/img/主视觉.png) center 0 no-repeat;
  // background-size: 100% auto;
  .canvasBox {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    canvas {
      width: 7.5rem;
      height: 14.96rem;
      position: absolute;
      &#BgBtn {
        bottom: 0;
      }
    }
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
    height: 100%;
    position: relative;
    .bgSoundTips {
      display: block;
      width: 0.62rem;
      height: 0.62rem;
      background: url(../assets/img/bgMusicIcon.png);
      background-size: 100% 100%;
      position: absolute;
      right: 0.19rem;
      top: 0.24rem;
    }
    .tipsBox {
      position: absolute;
      right: 0.07rem;
      top: 4.94rem;
      .tips {
        display: block;
        width: 1rem;
        height: 0.91rem;
        padding-top: 0.1rem;
        text-align: center;
        background: url(../assets/img/ruleTips.png);
        background-size: 100% 100%;
        font-size: 0.24rem;
        color: #e5fef5;
        font-weight: 700;
        // &.songList {
        //   margin-top: 0.15rem;
        // }
      }
    }
    &.top {
      top: 1.5rem;
    }
  }
  .guaBox {
    position: relative;
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
  z-index: 100;
}
</style>


