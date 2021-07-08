<template>
  <div class="otsuge">
    <div class="otsugeTitle"></div>
    <div class="otsuge_con">
      <div class="crystalBall">

        <strong>{{owner.divination?owner.divination.progress:0}}%</strong>
      </div>
      <div class="outsTips">
        <div class="msg" v-html="lang.otsuge_tips.replace('%s',owner.divination?owner.divination.min_coins:0)">
        </div>
        <div class="outsBtn" @click="outs()" :class="{black:owner.divination.today_coins < owner.divination.min_coins || owner.divination.time}" v-if="owner.divination">
          {{lang.outs}}
        </div>
      </div>
    </div>

    <div class="mask" v-show="showOutsPup">
      <transition name="slide">
        <div class="outsIng" v-show="showOutsPup">
          <i class="close" @click="closePup()"></i>
          <div class="outsTitle">
            <i class="liner_l"></i>
            <strong>{{outType == 1?lang.outsIng :lang.outsEd}}</strong>
            <i class="liner_r"></i>
          </div>
          <!-- <div class="pupBall"></div> -->
          <canvas id='pupBall'></canvas>
          <div class="outsTips" v-if="outType == 2">
            <strong class="msg">{{lang.outsDddres}}{{msg}}</strong>
            <strong class="scoreMsg">{{lang.outsScore}}+{{score}}</strong>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex"
import { outs } from "../apis"

import { Downloader, Parser, Player } from 'svga.lite'

const downloader = new Downloader()
const parser = new Parser({ disableWorker: true })

export default {
  data () {
    return {
      outType: 1,
      showOutsPup: false,
      msg: '',
      score: 0,
      player: {}
    }
  },
  computed: {
    ...mapState(['owner'])
  },
  mounted () {
    this.svgaGo('pupBall', `http://fstatic.cat1314.com/uc/svga/eed28ed9f2a7c0385044a38341802b04_1625645414.svga`)
  },
  methods: {
    outs () {
      if (this.owner.divination.today_coins >= this.owner.divination.min_coins) {
        if (this.owner.divination.time) {
          this.toast(this.lang.outsError)
        } else {
          outs().then(res => {
            if (res.data.response_status.code == 0) {
              this.score = res.data.response_data.score
              this.msg = res.data.response_data.message
              this.showOutsPup = true
              this.player.start()
              setTimeout(() => {
                this.player.stop()
                this.outType = 2
                //this.$store.dispatch('getInitInfo');
              }, 2000)
            } else {
              this.toast(res.data.response_status.error)
            }
          })
        }
      }

    },
    async svgaGo (el, adress) {
      let canvas = document.getElementById(el)
      const fileData = await downloader.get(adress);
      const data = await parser.do(fileData);
      let player = new Player(canvas)
      await player.mount(data)
      this.player = player
    },
    closePup () {
      this.showOutsPup = false
      this.$store.dispatch('getInitInfo');
    }
  }
}
</script>

<style lang="scss">
.otsuge_con {
  width: 7.19rem;
  height: 3.03rem;
  background: url(../img/or_con.png);
  background-size: 100% 100%;
  margin: 0 auto;
  display: flex;
  align-items: center;
  .crystalBall {
    width: 3.29rem;
    height: 2.78rem;
    background: url(../img/crystalBall.png);
    background-size: 100% 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    strong {
      font-size: 0.37rem;
      font-weight: bold;
      margin-top: -0.45rem;
    }
  }
  .outsTips {
    flex: 1;
    margin-left: -0.4rem;
    color: #6C71FF;
    font-size: 0.24rem;
    .outsBtn {
      width: 2.56rem;
      height: 0.69rem;
      background: url(../img/get.png);
      background-size: 100% 100%;
      text-align: center;
      line-height: 0.69rem;
      font-size: 0.29rem;
      color: #fff;
      margin-top: 0.26rem;
      &.black {
        background: url(../img/notAct.png);
        background-size: 100% 100%;
      }
    }
  }
}
.outsIng {
  width: 5.95rem;
  height: 6.73rem;
  background: url(../img/outsBg.png);
  background-size: 100% 100%;
  position: relative;
  .outsTitle {
    margin-top: 0.79rem;
    text-align: center;
    font-size: 0.36rem;
    color: #330D0E;
    display: flex;
    align-items: center;
    justify-content: center;
    .liner_l {
      width: 1.67rem;
      height: 0.21rem;
      background: url(../img/liner_l2.png);
      background-size: 100% 100%;
      margin-right: 0.44rem;
    }
    .liner_r {
      width: 1.67rem;
      height: 0.21rem;
      background: url(../img/liner_r2.png);
      background-size: 100% 100%;
      margin-left: 0.44rem;
    }
  }
  #pupBall {
    display: block;
    width: 4rem;
    height: 3.77rem;
    // background: url(../img/pupBall.png);
    // background-size: 100% 100%;
    margin: 0 auto;
  }
  .outsTips {
    strong {
      display: block;
      text-align: center;
      padding: 0 0.25rem;
      &.scoreMsg {
        font-size: 0.32rem;
        color: #391414;
        margin-top: 0.11rem;
      }
      &.msg {
        font-size: 0.28rem;
        color: #96451D;
      }
    }
  }
  .close {
    display: block;
    width: 0.79rem;
    height: 0.78rem;
    background: url(../img/close.png);
    background-size: 100% 100%;
    position: absolute;
    right: 0.44rem;
    top: 0;
  }
}
</style>