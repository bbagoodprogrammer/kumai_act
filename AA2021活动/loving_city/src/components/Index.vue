<template>
  <div class="page pageIndex" :class="{bg:!showBannerBg}">
    <canvas id="bannerBg" v-show="!showBannerBg"></canvas>
    <div class="shareBar" v-if="isShare">
      <div class="bar" @click="downApp()"></div>
    </div>
    <div class="header">
      <div class="ruleTips" @click="$router.push('rule')"></div>
    </div>
    <div class="wards">
      <div class="title">{{lang.wardsTitle}}</div>
      <div class="giftList">
        <div class="giftItem" v-for="(item,index) in giftList" :key="index">
          <div class="imgBox">
            <img :src="item.img" alt="">
          </div>
          <div class="name">{{item.name}}</div>
          <div class="price">{{item.price}}<i></i></div>
        </div>
      </div>
    </div>
    <div class="act_time">
      <div class="actStep">
        <p v-if="step==0">{{lang.rank_timeTips}}</p>
        <p v-else-if="step == 1">{{lang.rank_timeTips2}}</p>
      </div>
      <div class="timeDown" v-if="surplusTime&& !surplusTime.end && step!=2">
        <strong>{{surplusTime.day}}</strong>
        <em>{{lang.rank_day}}</em>
        <strong>{{surplusTime.hour}}</strong>
        <em>{{lang.rank_hour}}</em>
        <strong>{{surplusTime.minute}}</strong>
        <em>{{lang.rank_min}}</em>
        <strong>{{surplusTime.second}}</strong>
        <em>{{lang.rank_second}}</em>
      </div>
    </div>
    <TabsScrollLoadList ref="rank" />
    <Footer />
  </div>
</template>

<script>

import downTime from '../utils/downTime.js'
import { mapState } from "vuex"
import TabsScrollLoadList from "./TabsScrollLoadList"
import Footer from "./Footer"
import { getUrlString } from '../utils'
import APP from "../utils/openApp"

import { Downloader, Parser, Player } from 'svga.lite'

const downloader = new Downloader()
const parser = new Parser({ disableWorker: true })

export default {
  components: { TabsScrollLoadList, Footer },
  data () {
    return {
      //   giftList: [
      //     {
      //       name: '浪漫情書',
      //       img: require('../img/gifts/gift1.png'),
      //       price: '20'
      //     },
      //     {
      //       name: '小鹿亂撞',
      //       img: require('../img/gifts/gift2.png'),
      //       price: '52'
      //     },
      //     {
      //       name: '談情說愛',
      //       img: require('../img/gifts/gift3.png'),
      //       price: '99'
      //     }
      //   ],
      surplusTime: {},
      isShare: true,
      showBannerBg: true,
    }
  },
  computed: {
    ...mapState(['step', 'is_kol', "stime", "etime", "ctime"]),
    giftList () {
      return this.lang.giftList
    }
  },
  watch: {
    is_kol (val) {
      if (!val) {
        this.$refs.rank.mainTabClick(1)
      }
    },
    stime (val) {
      if (this.step == 0) {
        this.downTimeGo('time', (this.stime - this.ctime))
      } else if (this.step == 1) {
        this.downTimeGo('time', (this.etime - this.ctime))
      }
    }
  },
  mounted () {
    // this.downTimeGo('time', 99999)
    this.judgeShare()
    this.bannerGo()
  },
  methods: {
    judgeShare () {//判断是否为分享环境,请求相应的接口 
      this.isShare = getUrlString('token') ? false : true
      this.vxc('setShareState', this.isShare) //分享状态
    },
    downTimeGo (timeName, val) {
      clearInterval(this.timer)
      if (!downTime(timeName)) {
        downTime(timeName, val);
      }
      this.surplusTime = downTime(timeName);
      this.timer = setInterval(() => {
        this.surplusTime = downTime(timeName);
        if (this.surplusTime && this.surplusTime.end) {
          clearInterval(this.timer)
          // this.$store.commit("changday_down_time", 0)  //當天剩餘時間
        }
      }, 1000)
    },
    downApp () {
      APP()
    },
    async bannerGo () {
      let canvas = document.getElementById('bannerBg')
      let addres = ''
      if (_app == 'hsing') {
        addres = `http://fstatic.cat1314.com/uc/svga/7ee9ed39dc372ec43b5a8849823ba870_1616383211.svga`
      } else if (_app == 'singnow') {
        addres = `http://fstatic.cat1314.com/uc/svga/7ee9ed39dc372ec43b5a8849823ba870_1616383211.svga`
      }
      const fileData = await downloader.get(addres);
      const data = await parser.do(fileData);
      let player = new Player(canvas)
      await player.mount(data)
      this.showBannerBg = false
      player.start()
    }
  }
}
</script>

<style lang="scss">
#bannerBg {
  width: 7.5rem;
  height: auto;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 0;
}
.pageIndex {
  &.bg {
    background: RGBA(239, 229, 255, 1) !important;
  }
  .header {
    height: 10.26rem;
    position: relative;
    .ruleTips {
      display: block;
      position: absolute;
      width: 1.72rem;
      height: 0.52rem;
      right: 0;
      top: 1.5rem;
    }
  }
  .wards {
    width: 7.5rem;
    height: 4.64rem;
    background: url(../img/wards.png);
    background-size: 100% 100%;
    position: relative;
    z-index: 2;
    .title {
      height: 0.73rem;
      text-align: center;
      line-height: 0.9rem;
      font-size: 0.28rem;
    }
    .giftList {
      padding: 0 0.8rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      color: rgba(168, 168, 176, 1);
      font-size: 0.26rem;
      margin: 0.3rem auto 0;
      .imgBox {
        width: 1.6rem;
        height: 1.6rem;
        background: url(../img/giftImgBg.png);
        background-size: 100% 100%;
      }
      .name {
        text-align: center;
        margin-top: 0.15rem;
      }
      .price {
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0.15rem auto;
        i {
          margin-left: 0.15rem;
          width: 0.24rem;
          height: 0.24rem;
          background: url(../img/coins.png);
          background-size: 100% 100%;
        }
      }
    }
  }
  .act_time {
    width: 7.5rem;
    height: 2.16rem;
    background: url(../img/timeBg.png);
    background-size: 100% 100%;
    .actStep {
      height: 0.6rem;
      line-height: 0.78rem;
      text-align: center;
      text-align: center;
      p {
        font-size: 0.24rem;
      }
    }
    .timeDown {
      padding: 0 0.9rem;
      margin: 0.2rem auto 0;
      display: flex;
      justify-content: space-between;
      color: rgba(168, 168, 176, 1);
      strong {
        font-size: 0.48rem;
        font-weight: bold;
        display: block;
        width: 1rem;
        height: 1rem;
        // background: url(../img/timeBg.png);
        // background-size: 100% 100%;
        border-radius: 0.12rem;
        display: flex;
        align-items: center;
        justify-content: center;
        img {
          width: 0.38rem;
          height: 0.59rem;
        }
      }
      em {
        display: block;
        font-size: 0.24rem;
        line-height: 0.9rem;
        margin: 0.1rem 0 0.22rem;
      }
    }
  }
  img {
    display: block;
    width: 100%;
  }
}
</style>