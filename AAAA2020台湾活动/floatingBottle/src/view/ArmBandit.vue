<template>
  <div class="box">
    <div class="shareBar" v-if="isShare">
      <div class="bar" @click="downApp()"></div>
    </div>
    <div class="header">
      <span class="bgSoundTips" :style="{transform:'rotate('+rotateDeg+'deg)'}" @click="setBgSound()"></span>
      <div class="tipsBox">
        <span class="tips ruleTips" :class="{top:isShare}" @click="goRule()">規則獎勵</span>
        <span class="tips songList">歌曲榜單</span>
        <span class="myHistory">我的記錄</span>
      </div>
    </div>
    <!-- <div class="bottleCon">
      <BottleCon />
    </div> -->

    <act-footer :dstime="dstime" :detime="detime" :gstime="gstime" :getime="getime"></act-footer>
    <div href="" class="refresh circle" @click.prevent="refrsh()" :style="{transform:'rotate('+rotatePx+'deg)'}"></div>
  </div>
</template>

<script>

import getString from "../utils/getString"
import APP from "../utils/openApp"
import api from "../api/apiConfig"
import ActFooter from "../components/ActFooter"
import MsgToast from "../components/commonToast"
import { globalBus } from '../utils/eventBus'
import { Howl, Howler } from 'howler';
export default {
  components: { MsgToast, ActFooter },
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
      getime: 0
    }
  },
  created() {
    this.creatBgMusic()
    this.judgeShare()  //判断是否为分享环境,请求相应的接口 
    this.getDefaultData()
    globalBus.$on('setBg', () => {
      this.setBgSound()
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
      api.getDefault().then(res => {
        const { response_status, response_data } = res.data
        if (response_status.code == 0) {
          const { step, dstep, gstep, user_info, chance, dstime, detime, gstime, getime } = response_data
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
    },
    creatBgMusic() {
      this.bgSound = new Howl({
        src: ['mp3/bg.mp3'],
        autoplay: true,
        loop: true,
        volume: 0.5,
        onload: () => {
          this.compuetBgDeg()
        }
      });
    },
    setBgSound() {
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
    downApp() {
      APP()
    },
    goRule() {
      let regstr = getString('token')
      location.href = `./index2.html?token=${regstr}`
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
  overflow-x: hidden;
  position: relative;
  margin: auto;
  // background:url(../assets/img/主视觉.png) center 0 no-repeat;
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
    height: 4.42rem;
    position: relative;
    .bgSoundTips {
      display: block;
      width: 1rem;
      height: 1rem;
      background: url(../assets/img/default.png);
      background-size: 100% 100%;
      position: absolute;
      left: 0.3rem;
      top: 0.3rem;
    }
    .tipsBox {
      position: absolute;
      right: 0;
      top: 2.17rem;
      .tips {
        display: block;
        width: 1.7rem;
        height: 0.56rem;
        text-align: center;
        line-height: 0.56rem;
        // background: url(../assets/img/ruleTips.png);
        background-size: 100% 100%;
        &.songList {
          margin-top: 0.15rem;
        }
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


