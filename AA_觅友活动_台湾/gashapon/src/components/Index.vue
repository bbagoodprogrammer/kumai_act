<template>
  <div class="page pageIndex">
    <GiftList />
    <div class="timeDown" v-if="surplusTime&& !surplusTime.end && activity.activity_status!=2">
      <div class="tmTips"> 結束倒計時:</div>
      <strong>{{surplusTime.day}}</strong>
      <em>{{lang.rank_day}}</em>
      <strong>{{surplusTime.hour}}</strong>
      <em>{{lang.rank_hour}}</em>
      <strong>{{surplusTime.minute}}</strong>
      <em>{{lang.rank_min}}</em>
      <strong>{{surplusTime.second}}</strong>
      <em>{{lang.rank_second}}</em>
    </div>
    <canvas id="balls" />
    <div class="openType">
      <div class="openBtn" :class="'type' + index" v-for="(item,index) in openType" :key="index" @click="luck(item.num)"> </div>
    </div>
    <div class="userMsg">
      <div class="userOpenNums">開啟次數:{{owner.go_count}}次</div>
      <div class="userTicket"> <i class="ticketIcon"></i> {{owner.coupons}} <i class="add"></i></div>
      <div class="ticketTips">儲值每滿<em>{{charge.step}}</em>送 <i class="ticketIcon"> </i> 一張</div>
    </div>
    <div class="giftExport">
      <img src="../img/ball.png" alt="" :class="{ani:showAni}" v-show="showAni">
    </div>
    <div class="mask">
      <transition name="slide">
        <div class="luckPup">
          <i class="close"></i>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import GiftList from "./GiftList"
import downTime from '../utils/downTime.js'
import { mapState } from "vuex"


import { Downloader, Parser, Player } from 'svga.lite'

const downloader = new Downloader()
const parser = new Parser({ disableWorker: true })
export default {
  data () {
    return {
      surplusTime: {},
      openType: [
        {
          num: 1
        },
        {
          num: 10
        },
        {
          num: 20
        },
      ],
      player: null,
      showAni: false,
      bean: [10, 11, 12, 13, 14], // 10-14ID都是金豆
    }
  },
  computed: {
    ...mapState(['activity', 'owner', 'charge'])
  },
  watch: {
    activity (val) {
      this.downTimeGo('time', val.seconds)
    }
  },
  mounted () {
    this.bannerGo()
  },
  methods: {
    luck (val) {
      this.showAni = false
      this.player.start()
      setTimeout(() => {
        this.player.stop()
        this.showAni = true
      }, 2000)
    },
    async bannerGo () {
      let canvas = document.getElementById('balls')
      const fileData = await downloader.get(`http://fstatic.cat1314.com/uc/svga/c3ee8455efefa099c3a68f65b4f18e52_1629884133.svga`);
      const data = await parser.do(fileData);
      this.player = new Player(canvas)
      await this.player.mount(data)
      this.player.start()
      this.player.stop()
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
  },
  components: {
    GiftList
  }
}
</script>


<style lang="scss">
#balls {
  width: 6.08rem;
  height: 4.21rem;
  position: absolute;
  top: 5.9rem;
  left: 0.6rem;
}
.pageIndex {
  height: 14.04rem;
  background: url(../img/banner.png);
  background-size: 100% auto;
  position: relative;
  .timeDown {
    width: 4rem;
    padding: 0 0.5rem;
    height: 0.4rem;
    line-height: 0.4rem;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    color: #FCE96D;
    position: absolute;
    top: 5.46rem;
    left: 1.25rem;
    font-size: 0.24rem;
    strong,
    em {
      font-size: 0.24rem;
    }
    .tmTips {
      color: #9E99F4;
    }
  }
  .openType {
    padding: 0 0.81rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: absolute;
    z-index: 11;
    top: 9.67rem;
    .openBtn {
      width: 1.93rem;
      height: 1.36rem;
    }
  }
  .userMsg {
    width: 3.3rem;
    height: 1.6rem;
    position: absolute;
    bottom: 1rem;
    left: 3.4rem;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    .userOpenNums {
      font-size: 0.26rem;
      color: #A40FA2;
      text-shadow: #fff 1px 0 0, #fff 0 1px 0, #fff -1px 0 0, #fff 0 -1px 0;
    }
    .userTicket {
      width: 2.64rem;
      height: 0.41rem;
      background: url(../img/ticketBg.png);
      background-size: 100% 100%;
      margin: 0.1rem auto;
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 0.28rem;
      .ticketIcon {
        width: 0.64rem;
        height: 0.46rem;
        margin: -0.05rem 0 0 -0.1rem;
      }
      .add {
        width: 0.42rem;
        height: 0.41rem;
        background: url(../img/add.png);
        background-size: 100% 100%;
      }
    }
    .ticketTips {
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 0.24rem;
      color: #7F1ACB;
      em {
        color: #fff;
        font-size: 0.24rem;
        margin: 0 0.1rem;
      }
      .ticketIcon {
        width: 0.54rem;
        height: 0.38rem;
        margin: 0 0.1rem;
      }
    }
  }
  .giftExport {
    width: 1.4rem;
    height: 1.3rem;
    padding-top: 0.1rem;
    position: absolute;
    bottom: 1.1rem;
    left: 1.7rem;
    overflow: hidden;
    border-radius: 0.7rem 0.7rem 0 0;
    img {
      width: 1.3rem;
      margin: 0 auto;
      &.ani {
        animation: ballAni 0.2s linear forwards;
      }
    }
  }
  .luckPup {
    width: 6.4rem;
    height: 5rem;
    background: url(../img/pupCon.png);
    background-size: 100% auto;
    position: relative;
    .close {
      display: block;
      width: 0.62rem;
      height: 0.62rem;
      background: url(../img/close.png);
      background-size: 100% 100%;
      position: absolute;
      right: 0.3rem;
      top: -1.7rem;
    }
  }
  .luckPup::before {
    content: '';
    display: block;
    width: 6.4rem;
    height: 0.82rem;
    background: url(../img/pupTop.png);
    background-size: 100% auto;
    position: absolute;
    top: -0.81rem;
  }
  .luckPup::after {
    content: '';
    display: block;
    width: 6.4rem;
    height: 0.82rem;
    background: url(../img/pupBotton.png);
    background-size: 100% auto;
    position: absolute;
    bottom: -0.81rem;
  }
  @keyframes ballAni {
    0% {
      transform: translate(0, -2rem);
    }
    100% {
      transform: translate(0, 0);
    }
  }
  img {
    display: block;
    width: 100%;
  }
}
</style>