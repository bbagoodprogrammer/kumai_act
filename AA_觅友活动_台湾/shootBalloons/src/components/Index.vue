<template>
  <div class="page pageIndex">
    <RoolMsg />
    <canvas id="ball"></canvas>
    <div class="con">
      <div class="ruleTips">
        <span @click="showRule = true">{{lang.rule_tips}}</span>
        <span @click="showHistory = true">{{lang.rule_tips2}}</span>
      </div>
      <div class="actTitle"></div>
      <div class="tab">
        <span class="tab1" :class="{act:type == 1}" @click="tabClick(1)">{{lang.balloon_tab1}}</span>
        <span class="tab2" :class="{act:type == 2}" @click="tabClick(2)">{{lang.balloon_tab2}}</span>
      </div>
      <Balloon :type="type" :svgaAddress="svgaAddress" />
      <Grand />
      <Rank />
      <Footer />
    </div>

    <!-- 歷史 -->
    <div class="mask" v-show="showHistory">
      <transition name="slide">
        <History v-if="showHistory" />
      </transition>
    </div>
    <!-- 歷史 -->
    <div class="mask" v-show="showRule">
      <transition name="slide">
        <Rule v-if="showRule" />
      </transition>
    </div>
    <!-- 大獎 -->
    <div class="mask" v-show="showFirstPup">
      <transition name="slide">
        <div class="grandPrix" :class="{open:prize_open}" v-if="showFirstPup">
          <!-- <i class="close" @click="closePup()"></i> -->
          <div class="prizeImg"> </div>
          <div class="prizeTips">
            {{prize_open?`${lang.prizeTips}${nowPrize.desc}`:lang.prizeTips2}}
          </div>
          <div class="coins" v-if="prize_open">
            <i></i>
            <span>{{nowPrize.name}}</span>
          </div>
          <div class="ok" @click="next()">
            {{lang.getEd}}
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>

import Balloon from "./Balloon"
import Grand from "./Grand"
import Rank from "./Rank"
import Footer from "./Footer"
import { mapState } from "vuex"
import { getPrize } from "../apis"
import History from "./History"
import Rule from "./Rule"
import RoolMsg from "./RoolMsg"
import { Downloader, Parser, Player } from 'svga.lite'

const downloader = new Downloader()
const parser = new Parser({ disableWorker: true })

export default {
  components: { Balloon, Grand, Rank, Footer, History, Rule, RoolMsg },
  data () {
    return {
      type: 1,
      prize_index: 0,
      prize_open: false,
      showFirstPup: false,
      showHistory: false,
      showRule: false,
      svgaAddress: {
        Marbles_default: {
          addres: 'http://fstatic.cat1314.com/uc/svga/fb11494748be1a32b870b409441bc95a_1623233262.svga',
        },
        Darts_default: {
          addres: 'http://fstatic.cat1314.com/uc/svga/98f0c4cab7140208e5ffc454d10f671a_1623233329.svga',
        },
        Marbles_one_1: {
          addres: 'http://fstatic.cat1314.com/uc/svga/f7a7236290e0f568fb3a260993d3e19e_1623233205.svga',
        },
        Marbles_one_2: {
          addres: 'http://fstatic.cat1314.com/uc/svga/e48f0efe059336cb6672d762e12d5fcf_1623233224.svga',
        },
        Marbles_one_3: {
          addres: 'http://fstatic.cat1314.com/uc/svga/a49d53f06391a847443a187e05771b71_1623233234.svga',
        },
        Marbles_one_4: {
          addres: 'http://fstatic.cat1314.com/uc/svga/7cc1453a295c650f8cf7e64e5a5261a2_1623233243.svga',
        },
        Marbles_ten: {
          addres: 'http://fstatic.cat1314.com/uc/svga/d08c332cadc02dfe4c8ff463bdbeb1b4_1623297600.svga',
        },
        Darts_one_1: {
          addres: 'http://fstatic.cat1314.com/uc/svga/10ba6e9f5835c28035ffcffb4e408635_1623233296.svga',
        },
        Darts_one_2: {
          addres: 'http://fstatic.cat1314.com/uc/svga/a70e719e9f2932a4c5b71a9003213801_1623233305.svga',
        },
        Darts_one_3: {
          addres: 'http://fstatic.cat1314.com/uc/svga/d3c0987819a6882de40af4174bbaba67_1623233315.svga',
        },
        Darts_ten: {
          addres: 'http://fstatic.cat1314.com/uc/svga/fc0ce5dd095b6940ebf108bea4e1fd35_1623297614.svga',
        }
      },
      plarerArr: {}
    }
  },
  watch: {
    nowPrize (val) {
      if (val) {
        this.showFirstPup = true
      }
    }
  },
  computed: {
    ...mapState(['grand_prizes_wait']),
    nowPrize () {
      return this.grand_prizes_wait[this.prize_index] || null
    }
  },
  created () {
    this.downloaderData(this.svgaAddress).then(res => {
      this.svgaStart('ball', 1, true, this.svgaAddress['Marbles_default'].data)
    })
  },
  methods: {
    tabClick (val) {
      this.type = val
      if (val == 1) {
        this.svgaStart('ball', 1, true, this.svgaAddress['Marbles_default'].data)
      } else {
        this.svgaStart('ball', 1, true, this.svgaAddress['Darts_default'].data)
      }
    },
    next () {
      if (!this.prize_open) {
        getPrize().then(res => {
          if (res.data.response_status.code == 0) {
            this.prize_open = true
          } else {
            this.toast(res.data.response_status.error)
          }
        })

      } else {
        this.prize_index += 1
        this.prize_open = false
        this.showFirstPup = false
      }

    },
    closePup () {
      this.prize_open = false
      this.showFirstPup = false
    },
    downloaderData (arr) {
      return new Promise((res, rej) => {
        let PromiseArr = []
        for (let i in arr) {
          PromiseArr.push(this.loadSvgaData(arr[i]))
        }
        Promise.all(PromiseArr).then((values) => {
          res(values)
        })
      })
    },
    loadSvgaData (fileItem) {
      return new Promise((resolve, reject) => {
        ; (async () => {
          const fileData = await downloader.get(fileItem.addres);
          const data = await parser.do(fileData);
          fileItem.data = data
          resolve(data);
        })()
      });
    },
    async svgaStart (className, start, isGo, data) {
      let canvas = document.getElementById(className)
      let player = new Player(canvas)
      if (this.plarerArr[className]) {
        this.plarerArr[className].player.clear()
      }
      player.set({ startFrame: start })
      if (!isGo && start == 1) {
        player.set({ startFrame: start }) //loop: 1, 
      } else {
        player.set({ startFrame: start })
      }
      await player.mount(data)
      player.start()
      if (!isGo && start == 1) {
        player.stop()
      }
      this.plarerArr[className] = {
        player,
      }
    },
  }
}
</script>

<style lang="scss">
.pageIndex {
  padding-top: 0.48rem;
  background: #AAFFBA url(../img/banner.png) no-repeat;
  background-size: 100% auto;
  position: relative;
  .con {
    position: relative;
    z-index: 2;
  }
  #ball {
    width: 7.5rem;
    position: absolute;
    top: -0.8rem;
    left: 0;
    z-index: 1;
  }
  .ruleTips {
    position: absolute;
    top: 10.05rem;
    right: 0;
    z-index: 10;
    span {
      display: block;
      width: 1.56rem;
      height: 0.47rem;
      line-height: 0.47rem;
      background: url(../img/ruleTipsBg.png);
      background-size: 100% 100%;
      text-align: center;
      font-size: 0.24rem;
      margin-bottom: 0.08rem;
    }
  }
  .tab {
    width: 6.09rem;
    height: 0.73rem;
    background: url(../img/tab_bg.png);
    background-size: 100% 100%;
    margin: 0 auto;
    display: flex;
    align-items: center;
    position: relative;
    z-index: 10;
    span {
      flex: 1;
      height: 100%;
      text-align: center;
      line-height: 0.73rem;
      color: rgba(211, 237, 253, 1);
    }
  }
  img {
    display: block;
    width: 100%;
  }
  .grandPrix {
    position: relative;
    .close {
      display: block;
      width: 0.7rem;
      height: 0.7rem;
      position: absolute;
      right: 0.45rem;
      top: 0.3rem;
      z-index: 1;
    }
    .prizeImg {
      width: 3.25rem;
      height: 2.79rem;
      background: url(../img/first_prizeImg.png);
      background-size: 100% 100%;
      margin: 0 auto;
    }
    .prizeTips {
      padding: 0 0.55rem;
      text-align: center;
      font-size: 0.24rem;
      color: #A9650A;
    }
    .coins {
      display: flex;
      align-items: center;
      justify-content: center;
      i {
        width: 0.4rem;
        height: 0.42rem;
        background: url(../img/firstIcon.png);
        background-size: 100% 100%;
        margin-right: 0.16rem;
      }
      span {
        font-size: 0.4rem;
        color: #FE4C2F;
      }
    }
    .ok {
      width: 2.07rem;
      height: 0.63rem;
      background: url(../img/ok.png);
      background-size: 100% 100%;
      text-align: center;
      line-height: 0.63rem;
      margin: 0.35rem auto 0;
    }
    &.open {
      .prizeImg {
        width: 3.03rem;
        height: 2.6rem;
        background: url(../img/first_prizeImg_open.png);
        background-size: 100% 100%;
        margin: 0 auto;
      }
      .ok {
        margin-top: 0.13rem;
      }
    }
  }
}
</style>