<template>
  <div class="table">
    <div class="zi"></div>
    <canvas id="turn_bg" class="turn_bg"></canvas>
    <canvas id="turn_openDefaule" class="goIcon" v-show="luckDrawCount<=0"></canvas>
    <canvas id="turn_openAct" class="goIcon" @click="luckIng()" v-show="luckDrawCount>0"></canvas>
    <div class="turnTable" :style="{transform:'rotate('+nowAngle+'deg)'}">
      <canvas id="turn_All" class="turn_All" v-if="is_all"></canvas>
      <span v-for=" (item,index) in turntable" :key="index" :class="'ward'+index">
        <img :src="item.image" alt="">
        <em>{{item.short_name?item.short_name:item.name}}</em>
        <span class="black_bg" v-if="!item.have"></span>
      </span>
      <canvas id="turn_linght" :class="'ward' + (giftIndex -1)" v-show="lingHt"></canvas>
    </div>
    <div class="mask" v-show="giftPup">
      <transition name="slide">
        <div class="luckPup" v-if="giftPup">
          <div class="title">{{lang.star_luckTitle}}</div>
          <div class="luckItem">
            <div class="imgBox">
              <img :src="gift.image" alt="">
            </div>
            <!-- <strong>{{gift.name}}</strong> -->
          </div>
          <div class="tips">{{lang.star_luckTitle2}}【{{gift.name}}】</div>
          <div class="ok" @click="giftPup = false"></div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>

import { mapState } from "vuex"
import { turntableLuck } from "../apis"


import { Downloader, Parser, Player } from 'svga.lite'

const downloader = new Downloader()
const parser = new Parser({ disableWorker: true })

export default {
  data () {
    return {
      nowAngle: 0,
      giftAngle: {
        1: 0, //碎片1-6
        2: 300,
        3: 240,
        4: 180,
        5: 120,
        6: 60,
      },
      giftIndex: 1,
      gift: {},
      giftPup: false,
      linghtStar: false,
      svgaDdress: [
        {
          key: 'turn_bg',
          addres: 'http://fstatic.cat1314.com/uc/svga/8ad3baf1bfd111468c55fbb0cd748089_1617848559.svga'
        },
        {
          key: 'turn_openDefaule',
          addres: 'http://fstatic.cat1314.com/uc/svga/6a20293d9d1fd3e05808a01bbae3c884_1617848504.svga'
        },
        {
          key: 'turn_openAct',
          addres: 'http://fstatic.cat1314.com/uc/svga/b590c455412cf310433cd2fec4616f3d_1624358168.svga'
        },
        {
          key: 'turn_linght',
          addres: 'http://fstatic.cat1314.com/uc/svga/244a0fbe436cdcf1b7c0ae5282cc275b_1617848574.svga'
        },
        {
          key: 'turn_All',
          addres: 'http://fstatic.cat1314.com/uc/svga/0b2c0cab8643886816e05a273f06dea4_1617865747.svga'
        }
      ],
      dataArr: {},
      plarerArr: {},
      lingHt: false,
      svgaLoad: false
    }
  },
  computed: {
    ...mapState(['turntable', 'luckDrawCount']),
    is_all () {
      let nums = 0
      this.turntable.forEach(element => {
        if (element.have) {
          nums++
        }
      });
      console.log(nums >= this.turntable.length)
      return nums
    }
  },
  created () {
    if (AREA == 'vn') {
      this.svgaDdress[1].addres = `	http://fstatic.cat1314.com/uc/svga/bd1b199553c10787e076df035bad1cb8_1624437188.svga`
      this.svgaDdress[2].addres = `http://fstatic.cat1314.com/uc/svga/4302fd8e95b23119063ff9c28c4202e0_1624437210.svga`
    }
  },
  mounted () {
    this.downloaderData(this.svgaDdress)
  },
  watch: {
    luckDrawCount (val) {
      if (this.svgaLoad) {
        this.firstLuckAni(val)
      }
    },
    is_all (val) {
      if (val == this.turntable.length) {
        console.log(val)
        this.svgaStart('turn_All', 1, true, this.svgaDdress[4].data)
      }
    }
  },
  methods: {
    firstLuckAni (val) {
      if (this.plarerArr['turn_openAct']) {
        this.plarerArr['turn_openAct'].player.clear()
      }
      if (this.plarerArr['turn_openDefaule']) {
        this.plarerArr['turn_openDefaule'].player.clear()
      }
      console.log(val)
      if (val > 0) {
        this.svgaStart('turn_openAct', 1, true, this.svgaDdress[2].data)
      } else {
        this.svgaStart('turn_openDefaule', 1, true, this.svgaDdress[1].data)
      }
    },
    luckIng () {
      turntableLuck().then(res => {
        if (res.data.response_status.code == 0) {
          this.vxc('reduxNums')
          this.gift = res.data.response_data.prize
          const id = this.gift.pid
          for (let i = 0; i < this.turntable.length; i++) {
            if (this.turntable[i].pid == id) {
              this.giftIndex = this.turntable[i].pid
              this.turnAngle()
              setTimeout(() => { //svga光效闪动
                this.lingHt = true
                setTimeout(() => {
                  this.lingHt = false
                  this.giftPup = true
                  this.vxc('setGiftHave', id)
                }, 2000)
              }, 5000)
            }
          }
        } else {
          this.toast(res.data.response_status.error)
        }
      })
    },
    turnAngle () {
      if (this.nowAngle % 360 > this.giftAngle[this.giftIndex]) { //目标礼物在前面
        this.nowAngle += 1800 + (this.giftAngle[this.giftIndex] - this.nowAngle % 360)
      } else if (this.nowAngle % 360 < this.giftAngle[this.giftIndex]) {
        this.nowAngle += 1800 + (360 - (this.nowAngle % 360)) + this.giftAngle[this.giftIndex]
      } else if (this.nowAngle % 360 == this.giftAngle[this.giftIndex]) {
        this.nowAngle += 1800
      }
    },
    downloaderData (arr) {
      return new Promise((res, rej) => {
        let PromiseArr = []
        for (let i = 0; i < arr.length; i++) {
          PromiseArr.push(this.loadSvgaData(arr[i]))
        }
        Promise.all(PromiseArr).then((values) => {
          res(values)
          console.log(this.svgaDdress)
          this.svgaLoad = true
          this.svgaGo()
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
    svgaGo () {
      this.svgaStart('turn_bg', 1, true, this.svgaDdress[0].data)  //节点类名,開始幀數,是否开始动画,加载的对应Data
      this.svgaStart('turn_linght', 1, true, this.svgaDdress[3].data)
      this.firstLuckAni(this.luckDrawCount)
    },
    async svgaStart (className, start, isGo, data) {//节点类名,開始幀數,是否开始动画,加载的对应Data
      console.log(className, data)
      let canvas = document.getElementById(className)
      let player = new Player(canvas)
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
      console.log(this.plarerArr)
    },
  }
}
</script>

<style lang="scss">
.table {
  width: 7.5rem;
  height: 7.66rem;
  background: url(../img/turnTable2.png);
  background-size: 100% 100%;
  position: relative;
  .turn_bg {
    width: 7.5rem;
    height: 7.66rem;
    position: absolute;
  }

  .zi {
    width: 0.38rem;
    height: 0.59rem;
    background: url(../img/zi.png);
    background-size: 100% 100%;
    position: absolute;
    top: 0.78rem;
    left: 3.65rem;
    z-index: 10;
  }
  .goIcon {
    width: 2.11rem;
    height: 2.11rem;
    //   background: url(../img/turn_default.png);
    //   background-size: 100% 100%;
    position: absolute;
    top: 2.82rem;
    left: 2.8rem;
    z-index: 100;
  }
  .turnTable {
    width: 5.6rem;
    height: 5.6rem;
    background: url(../img/turnTable1.png);
    background-size: 100% 100%;
    position: absolute;
    top: 1.05rem;
    left: 1.04rem;
    transition: transform 5s ease;
    #turn_All {
      width: 5.6rem;
      height: 5.6rem;
      position: absolute;
      left: 0;
      top: 0;
      z-index: 50;
    }

    span {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      position: relative;
      .black_bg {
        width: 2.89rem;
        height: 2.07rem;
        background: url(../img/black_bg.png);
        background-size: 100% 100%;
        position: absolute;
      }
      img {
        width: 1.2rem;
        height: 1.2rem;
      }
      em {
        display: block;
        width: 1.2rem;
        height: 0.3rem;
        font-size: 80%;
        color: rgba(255, 254, 135, 1);
        text-align: center;
        white-space: nowrap;
      }
      &.ward0 {
        position: absolute;
        top: 0.22rem;
        left: 2.2rem;
        z-index: 10;
      }
      &.ward1 {
        position: absolute;
        top: 1.13rem;
        left: 3.76rem;
        transform: rotate(60deg);
        z-index: 10;
        // .black_bg {
        //   transform: rotate(60deg);
        // }
      }
      &.ward2 {
        position: absolute;
        top: 2.95rem;
        left: 3.78rem;
        transform: rotate(120deg);
        z-index: 10;
        // .black_bg {
        //   transform: rotate(120deg);
        // }
      }
      &.ward3 {
        position: absolute;
        top: 3.86rem;
        left: 2.2rem;
        transform: rotate(-180deg);
        z-index: 10;
        // .black_bg {
        //   transform: rotate(-180deg);
        // }
      }
      &.ward4 {
        position: absolute;
        top: 2.96rem;
        left: 0.62rem;
        transform: rotate(-120deg);
        z-index: 10;
        // .black_bg {
        //   transform: rotate(-120deg);
        // }
      }
      &.ward5 {
        position: absolute;
        top: 1.14rem;
        left: 0.62rem;
        transform: rotate(-60deg);
        z-index: 10;
        // .black_bg {
        //   transform: rotate(-60deg);
        // }
      }
    }
    #turn_linght {
      width: 3.4rem;
      height: 2.48rem;
      position: absolute;
      &.ward0 {
        top: -0.23rem;
        left: 1.12rem;
        z-index: 10;
      }
      &.ward1 {
        top: 0.67rem;
        left: 2.65rem;
        z-index: 10;
        transform: rotate(61deg);
      }
      &.ward2 {
        top: 2.45rem;
        left: 2.63rem;
        z-index: 10;
        transform: rotate(120deg);
      }
      &.ward3 {
        top: 3.35rem;
        left: 1.05rem;
        z-index: 10;
        transform: rotate(-180deg);
      }
      &.ward4 {
        top: 2.44rem;
        left: -0.42rem;
        z-index: 10;
        transform: rotate(-120deg);
      }
      &.ward5 {
        top: 0.67rem;
        left: -0.42rem;
        z-index: 10;
        transform: rotate(-60deg);
      }
    }
  }
  .luckPup {
    width: 5.89rem;
    height: 4.88rem;
    background: url(../img/turnLuckPup.png);
    background-size: 100% 100%;
    .title {
      height: 0.8rem;
      text-align: center;
      line-height: 0.8rem;
      font-size: 0.32rem;
      color: #fff;
    }
    .luckItem {
      width: 1.37rem;
      margin: 0.3rem auto;
      .imgBox {
        width: 1.37rem;
        padding-top: 0.24rem;
        height: 1.2rem;
        background: url(../img/luckItemBg.png);
        background-size: 100% 100%;
        position: relative;
        img {
          width: 0.9rem;
          height: 0.9rem;
          display: block;
          margin: 0 auto;
        }
        .gNums {
          width: 0.27rem;
          height: 0.31rem;
          position: absolute;
          right: 0.15rem;
          bottom: 0.15rem;
        }
      }
      strong {
        display: block;
        text-align: center;
        font-size: 0.24rem;
        color: rgba(90, 224, 248, 1);
      }
    }
    .tips {
      text-align: center;
      color: rgba(246, 223, 254, 1);
      font-size: 0.28rem;
    }
  }
}
</style>