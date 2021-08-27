<template>
  <div class="page pageIndex">
    <div class="ruleTips">
      <span @click="showRule = true">規則獎勵</span>
      <span @click="showHistory = true">扭蛋記錄</span>
    </div>
    <RoolMsg />
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
      <div class="userTicket"> <i class="ticketIcon"></i> {{owner.coupons}} <i class="add" @click="gowalletpage()"></i></div>
      <div class="ticketTips">儲值每滿<em>{{charge.step}}</em>送 <i class="ticketIcon"> </i> 一張</div>
    </div>
    <div class="giftExport">
      <img :src="images[ballGift.id]" alt="" :class="{ani:showAni}" v-if="showAni">
    </div>
    <div class="mask" v-show="showPup">
      <transition name="slide">
        <div class="luckPup" v-if="showPup">
          <i class="close" @click="closePup()"></i>
          <div class="title" v-if="prizes.length > 1">恭喜獲得以下禮物</div>
          <div class="title" v-else-if="prizes.length == 1 && rare_prizes.id">恭喜獲得{{rare_prizes.name}}稀有禮物</div>
          <div class="title" v-else>恭喜獲得{{ballGift.name}}禮物</div>
          <!-- v-if="rare_prizes.id" -->
          <div class="rareGift" v-if="rare_prizes.id">
            <div class="imgBox">
              <i class="tips">稀有</i>
              <img :src="rare_prizes.image" alt="">
              <span class="nums">x{{rare_prizes.count}}</span>
            </div>
            <strong>{{rare_prizes.name}}</strong>
          </div>
          <div class="pupGiftList" :class="{nums:prizes.length > 1}">
            <div class="giftItem" v-for="(item,index) in prizes" :key="index">
              <div class="imgBox">
                <img :src="_images[`pup_${item.id}`]" alt="" v-if="_images[`pup_${item.id}`]">
                <img :src="item.image" alt="" v-else>
                <span class="nums">x{{item.count}}</span>
              </div>
              <strong>{{item.name}}</strong>
            </div>
          </div>
          <div class="btns">
            <span class="ok" @click="closePup()">收下</span>
            <span class="again" @click="luck(luckNums,true)">再扭{{openType[luckNums].str}}</span>
          </div>
        </div>
      </transition>
    </div>
    <div class="mask" v-show="showFirstPup">
      <transition name="slide">
        <div class="getTicket" v-show="showFirstPup">
          <i class="close" @click="showFirstPup =false"></i>
          <div class="title">獲得扭扭券{{owner.coupons_get}}張</div>
          <div class="tickImg">
            <div class="ticketIcon"></div>
          </div>
          <p class="tips">快去扭一扭吧</p>
        </div>
      </transition>
    </div>
    <div class="mask" v-show="showHistory">
      <transition name="slide">
        <History v-if="showHistory" />
      </transition>
    </div>
    <div class="mask" v-show="showRule">
      <transition name="slide">
        <Rule v-if="showRule" />
      </transition>
    </div>
  </div>
</template>

<script>
import GiftList from "./GiftList"
import downTime from '../utils/downTime.js'
import { mapState } from "vuex"
import { luck } from "../apis"
import History from "./History"
import { Downloader, Parser, Player } from 'svga.lite'
import Rule from "./Rule"
import RoolMsg from "./RoolMsg"

const downloader = new Downloader()
const parser = new Parser({ disableWorker: true })
export default {
  data () {
    return {
      surplusTime: {},
      openType: {
        1: {
          num: 1,
          str: '一次'
        },
        10: {
          num: 10,
          str: '十次'
        },
        20: {
          num: 20,
          str: '二十次'
        },
      },
      player: null,
      showAni: false,
      showPup: false,
      prizes: [],
      rare_prizes: {},
      showFirstPup: false,
      showHistory: false,
      showRule: false,
      luckNums: 0
    }
  },
  computed: {
    ...mapState(['activity', 'owner', 'charge']),
    ballGift () {
      return this.prizes[0]
    },
    _images () {
      return _images
    }
  },
  watch: {
    owner (val) {
      if (val.coupons_get > 0) {
        this.showFirstPup = true
      }
    },
    activity (val) {
      this.downTimeGo('time', val.seconds)
    }
  },
  mounted () {
    this.bannerGo()
  },
  methods: {
    luck (val, notAni) {
      if (this.owner.coupons >= val) {
        luck(val).then(res => {
          if (res.data.response_status.code == 0) {
            this.luckNums = val
            const { coupons, go_count, prizes, rare_prizes } = res.data.response_data
            this.prizes = prizes
            this.rare_prizes = rare_prizes
            if (!notAni) {
              this.player.start()
              setTimeout(() => {
                this.player.stop()
                this.showAni = true
                setTimeout(() => {
                  this.showPup = true
                }, 500)
              }, 2000)
            }
          } else {
            this.toast(res.data.response_status.error)
          }
        })
      } else {
        setTimeout(() => {
          this.gowalletpage()
        }, 1000)
        this.toast(`扭扭券不足！`)
      }

    },
    async bannerGo () {
      let canvas = document.getElementById('balls')
      const fileData = await downloader.get(`//fstatic.cat1314.com/uc/svga/f772a5796b0328782fc7b4a62e8c992e_1630052898.svga`);
      const data = await parser.do(fileData);
      this.player = new Player(canvas)
      await this.player.mount(data)
      this.player.start()
      this.player.stop()
    },
    closePup () {
      this.showAni = false
      this.showPup = false
      this.$store.dispatch('getInitInfo');
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
    gowalletpage () {
      alert('jump')
      const ios = navigator.userAgent.match(/iPhone|iPod|ios|iPad/i);
      try {
        if (ios) {
          // goWalletpage()
          sendJsData('app://walletpage');
        } else {
          javascript: JSInterface.sendJsData('app://walletpage');
        }
      } catch (e) { }
    },
  },
  components: {
    GiftList,
    History,
    Rule,
    RoolMsg
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

  position: relative;
  .ruleTips {
    position: absolute;
    top: 6.13rem;
    right: 0;
    span {
      display: block;
      width: 1.42rem;
      height: 0.5rem;
      background: url(../img/ruleTips.png);
      background-size: 100% 100%;
      text-align: center;
      font-size: 0.24rem;
      color: #07618E;
      line-height: 0.5rem;
      text-indent: 0.18rem;
      margin-bottom: 0.05rem;
    }
  }
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
    top: 11.5rem;
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
    top: 11.5rem;
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
    // height: 5rem;
    background: url(../img/pupCon.png);
    background-size: 100% auto;
    position: relative;
    .title {
      text-align: center;
      font-size: 0.34rem;
      text-shadow: #8048D5 1px 0 0, #8048D5 0 1px 0, #8048D5 -1px 0 0,
        #8048D5 0 -1px 0;
    }
    .rareGift {
      width: 1.58rem;
      margin: 0.15rem auto 0;
      .imgBox {
        width: 1.58rem;
        height: 1.58rem;
        background-image: url(../img/rare.png);
        background-size: 100% 100%;
        position: relative;
        .tips {
          width: 0.68rem;
          height: 0.29rem;
          background: url(../img/tipsBg.png);
          background-size: 100% 100%;
          position: absolute;
          left: 0rem;
          font-size: 0.24rem;
          text-align: center;
          line-height: 0.29rem;
          z-index: 10;
        }
        .nums {
          position: absolute;
          bottom: 0.05rem;
          right: 0.05rem;
          font-size: 0.24rem;
          text-shadow: #9455F1 1px 0 0, #9455F1 0 1px 0, #9455F1 -1px 0 0,
            #9455F1 0 -1px 0;
        }
        img {
          width: 100%;
          height: 100%;
        }
      }
      strong {
        display: block;
        width: 100%;
        text-align: center;
      }
    }
    .pupGiftList {
      padding: 0 0.39rem;
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      margin-top: 0.3rem;
      .giftItem {
        width: 1.44rem;
        .imgBox {
          width: 1.44rem;
          height: 1.44rem;
          background: url(../img/giftBg.png);
          background-size: 100% 100%;
          border-radius: 0.2rem;
          overflow: hidden;
          position: relative;
          img {
            width: 100%;
            height: 100%;
            margin: 0 auto;
          }
          .nums {
            position: absolute;
            bottom: 0.05rem;
            right: 0.05rem;
            font-size: 0.24rem;
            text-shadow: #9455F1 1px 0 0, #9455F1 0 1px 0, #9455F1 -1px 0 0,
              #9455F1 0 -1px 0;
          }
        }
        strong {
          font-size: 0.24rem;
          display: block;
          width: 100%;
          text-align: center;
          margin-top: 0.2rem;
        }
      }
      &.nums {
        justify-content: flex-start;
        max-height: 4rem;
        overflow-y: scroll;
        .giftItem {
          width: 1.2rem;
          margin: 0 0.2rem 0.1rem 0;
          .imgBox {
            width: 1.2rem;
            height: 1.2rem;
          }
          strong {
            margin-top: 0.1rem;
          }
        }
      }
    }
    .btns {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-top: 0.2rem;
      span {
        width: 2.53rem;
        height: 1.01rem;
        text-align: center;
        line-height: 1.01rem;
        &.ok {
          background: url(../img/ok.png);
          background-size: 100% 100%;
        }
        &.again {
          background: url(../img/again.png);
          background-size: 100% 100%;
        }
      }
    }
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

  .getTicket {
    width: 4.54rem;
    height: 4.2rem;
    background: url(../img/getTicket.png);
    background-size: 100% 100%;
    position: relative;
    .title {
      height: 1.46rem;
      line-height: 1.6rem;
      text-align: center;
      text-shadow: #8048D5 1px 0 0, #8048D5 0 1px 0, #8048D5 -1px 0 0,
        #8048D5 0 -1px 0;
    }
    .tickImg {
      width: 1.4rem;
      height: 1.4rem;
      background: rgba(255, 255, 255, 0.2);
      border: 0.02rem solid rgba(255, 255, 255, 0.5);
      border-radius: 0.14rem;
      margin: 0 auto;
      display: flex;
      align-items: center;
      justify-content: center;
      .ticketIcon {
        width: 1.08rem;
        height: 0.77rem;
      }
    }
    .tips {
      text-align: center;
      margin-top: 0.4rem;
      font-size: 0.28rem;
    }
    .close {
      display: block;
      width: 0.62rem;
      height: 0.62rem;
      background: url(../img/close.png);
      background-size: 100% 100%;
      position: absolute;
      right: 0rem;
      top: -0.8rem;
    }
  }
  img {
    display: block;
    width: 100%;
  }
}
</style>