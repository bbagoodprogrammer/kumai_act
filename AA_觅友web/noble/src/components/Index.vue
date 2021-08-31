<template>
  <div class="page pageIndex">
    <div class="tabs">
      <div class="tabItem" v-for="(item,index) in nobleConfig" :key="index" :class="{act:index == nowIndex}" @click="tabClick(index)">
        {{item.name}}
      </div>
    </div>
    <van-swipe class="my-swipe" :loop="false" :show-indicators="false" :initial-swipe="initNum" @change="onChange" ref="swiper">
      <van-swipe-item v-for="(item,index) in nobleConfig" :key="index">
        <div class="canvasShow">
          <canvas :id="'iconCanvas' + index" class="aniSvga"></canvas>
          <canvas :id="'silkCanvas' + index" class="silkCanvas"></canvas>
          <div class="btn"></div>
        </div>
        <div class="iconList">
          <div class="title">
            <i class="liner_l"></i>
            <i class="liner_r"></i>
            <div class="msg">
              {{lang.privilege}} {{item.privilege +1}}/{{iconConfig.length}}
            </div>
          </div>
          <div class="listCon">
            <p class="is" :class="{act:user.noble_level >= nowIndex +1 }">{{user.noble_level >= nowIndex +1 ?lang.ed:lang.noEd}} </p>
            <div class="iconListMsg">
              <div class="iconItem" v-for="(item2,index2) in iconConfig" :key="index2" :class="{act:item.privilege >= index2}" @click="showMsg(index,item,index2)">
                <span class="icon" :class="[{act:item.privilege >= index2},'icon'+ (index2 +1)]"></span>
                <strong>{{item2.name}}</strong>
              </div>
            </div>

          </div>
        </div>
      </van-swipe-item>
    </van-swipe>
    <div class="userMsg">
      <i class="liner"></i>
      <div class="userScore">
        <div class="userMonth">
          <span class="score" v-html="lang.userScore.replace('%s',user.noble_value)"></span>
          <span class="explainTips" @click="$router.push({name:'explain'})">{{lang.explain}}</span>
        </div>
        <div class="lv">
          <div class="lvLiner">
            <div class="actLiner" :style="{width:actWidth}"></div>
          </div>
          <div class="lvItem">
            <div class="item" v-for="(item,index) in level_list" :key="index" :class="{act:user.noble_level  ==  index,over:user.noble_level  >  index}">
              <div class="name">{{item.name}}</div>
              <div class="lvScore">{{getNumStr(item.value)}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="mask" v-show="showPup">
      <transition name="slide">
        <div class="tipsMsg" v-if="showPup">
          <i class="close" @click="showPup = false"></i>
          <div class="title"> {{iconConfig[showIndex].name}}</div>
          <img :src=" getImg()" alt="">
          <p class="tips" v-if="AREA == 'id'">
            {{ showIndex>1? lang.lvTips:'' }} {{showIndex >1?nobleConfig[nowIndex].name:''}} {{iconConfig[showIndex].tips}}
          </p>
          <p class="tips" v-else>
            {{showIndex >1?nobleConfig[nowIndex].name:''}}{{iconConfig[showIndex].tips}}
          </p>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>

import { mapState } from "vuex"
import { Downloader, Parser, Player } from 'svga.lite'
const downloader = new Downloader()
const parser = new Parser({ disableWorker: true, isDisableImageBitmapShim: true })

export default {
  data () {
    return {
      initNum: 0,
      nowIndex: 0,
      svgaConfig: {
        0: {
          key: '0',
          addres: '//fstatic.cat1314.com/uc/svga/48b4c8a95ec34425c29f77e9020dfd0f_1628072688.svga'
        },
        1: {
          key: '1',
          addres: '//fstatic.cat1314.com/uc/svga/1045d3b466a740c15615e9e1b9c35514_1629358177.svga'
        },
        2: {
          key: '2',
          addres: '//fstatic.cat1314.com/uc/svga/9800a3e0f5b00f4286f603f10f68010a_1629358190.svga'
        },
        3: {
          key: '3',
          addres: '//fstatic.cat1314.com/uc/svga/6c1d2a4f943521cf9988ca2fdc748f9c_1629358202.svga'
        },
        4: {
          key: '4',
          addres: '//fstatic.cat1314.com/uc/svga/98c347f5e013782a9b6453fb673f2224_1629358212.svga'
        },
        5: {
          key: '5',
          addres: '//fstatic.cat1314.com/uc/svga/574c98c846dde7aa3f93490abf182317_1630290540.svga'
        },
      },
      linerSvga: {
        addres: '//fstatic.cat1314.com/uc/svga/24a76c118d11d3aacab0c60338be5146_1628072700.svga'
      },
      linerPlayer: null,
      showPup: false,
      showIndex: 0,
      showLv: 0
    }
  },
  computed: {
    ...mapState(['level_list', 'user']),
    actWidth () {
      let listLength = Object.keys(this.level_list).length
      let userScore = this.user.noble_value
      if (listLength) {
        if (userScore < this.level_list[1].value) { //一级不到
          let c = this.level_list[1].value
          return userScore / c * 100 / 5 / 4.8 + '%'
        } else if (userScore >= this.level_list[listLength].value) {  //满级
          return '94.5%'
        } else {
          for (var i = listLength - 1; i >= 0; i--) {
            if (userScore >= this.level_list[i].value) {
              let c = this.level_list[i + 1].value - this.level_list[i].value
              let a = userScore - this.level_list[i].value
              return (a / c * 100) / 5.5 + (i - 1) * 18 + 5.3 + '%'
            }
          }
        }
      }
      return '0%'
    },
    nobleConfig () {
      return this.lang.nobleConfig
    },
    iconConfig () {
      return this.lang.iconConfig
    },
    AREA () {
      return AREA
    }
  },
  watch: {
    user (val) {
      this.initNum = val.noble_level - 1 < 0 ? 0 : val.noble_level - 1
      this.nowIndex = val.noble_level - 1 < 0 ? 0 : val.noble_level - 1
      let listLength = Object.keys(this.level_list).length
      setTimeout(() => {
        this.svgaPlayer(this.svgaConfig[this.initNum], true)
        this.linerAni(`silkCanvas0`)
        if (val.noble_level < listLength) {
          this.svgaPlayer(this.svgaConfig[this.initNum + 1], false)
        }
      }, 0)
    }
  },
  async created () {
    this.linerSvga.data = await this.loadSvgaData(this.linerSvga.addres)
  },
  activated () {
    this.initNum = this.nowIndex
    if (this.svgaConfig[this.nowIndex].player) {
      this.svgaConfig[this.nowIndex].player.start()
    }
  },
  deactivated () {
    if (this.svgaConfig[this.nowIndex].player) {
      this.svgaConfig[this.nowIndex].player.stop()
    }
  },
  methods: {
    tabClick (index) {
      this.$refs.swiper.swipeTo(index)
    },
    onChange (index) {
      this.linerAni(`silkCanvas${index}`)
      if (this.svgaConfig[this.nowIndex].player) {
        this.svgaConfig[this.nowIndex].player.stop()
      }
      this.nowIndex = index
      if (this.svgaConfig[index].player) {
        this.svgaConfig[index].player.start()
      } else {
        this.svgaPlayer(this.svgaConfig[index], true)
      }
    },
    async svgaPlayer (item, play) {
      let data = await this.loadSvgaData(item.addres)
      let canvas = document.getElementById('iconCanvas' + item.key)
      let player = new Player(canvas)
      if (item.key == 0) {
        player.set({ startFrame: 2, isCacheFrames: true })
      }
      await player.mount(data)
      if (play) {
        player.start()
      }
      item.player = player
    },
    async linerAni (className) {
      if (this.linerPlayer) {
        this.linerPlayer.clear()
      }
      let canvas = document.getElementById(className)
      let player = new Player(canvas)
      await player.mount(this.linerSvga.data)
      player.start()
      this.linerPlayer = player
    },
    loadSvgaData (fileItem) {
      return new Promise((resolve, reject) => {
        ; (async () => {
          const fileData = await downloader.get(fileItem);
          const data = await parser.do(fileData);
          //   fileItem.data = data
          resolve(data);
        })()
      });
    },
    showMsg (index, item, index2) { //第几级 第几个icon
      if (item.privilege >= index2) {
        this.showLv = index + 1
        this.showIndex = index2
        this.showPup = true
      }
    },
    getImg () {
      return _images[`${this.showIndex + 1}_${this.showLv}`]
    },
    getNumStr (val) {
      if (AREA == 'tw') {
        return `${val / 10000}${this.lang.thousand}`
      } else if (AREA == 'vn') {
        return `${val / 1000}${this.lang.k}`
      } else if (AREA == 'id') {
        if (val < 1000000) {
          return `${val / 1000}${this.lang.k}`
        } else if (val > 1000000) {
          return `${val / 1000000}${this.lang.million}`
        }
      }
    }
  }
}
</script>

<style lang="scss">
body {
  background: #181B23;
}
.pageIndex {
  padding: 0.2rem 0 2.5rem;
  .tabs {
    // width: 6.58rem;
    height: 0.86rem;
    // padding: 0 0.46rem;
    white-space: nowrap;
    margin: 0 auto;
    overflow-x: scroll;
    .tabItem {
      // min-width: 0.796rem;
      height: 100%;
      white-space: nowrap;
      display: inline-block;
      text-align: center;
      font-size: 0.28rem;
      color: rgba(255, 255, 255, 0.4);
      position: relative;
      padding: 0 0.335rem;
      line-height: 0.86rem;
      &.act {
        color: #FFC86D;
      }
      &.act::before {
        content: '';
        display: block;
        width: 0.28rem;
        height: 0.05rem;
        background: #FFC86D;
        border-radius: 0.03rem;
        position: absolute;
        left: 50%;
        margin-left: -0.14rem;
        bottom: 0.08rem;
      }
    }
    .tabItem:first-child {
      margin-left: 0.14rem;
    }
  }
  .tabs::-webkit-scrollbar {
    display: none; /* Chrome Safari */
  }

  .my-swipe .van-swipe-item {
    .landBg,
    #landCanvas {
      width: 100%;
      height: 100%;
    }
  }
  .canvasShow {
    width: 6.3rem;
    height: 4.4rem;
    position: relative;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: center;
    .aniSvga {
      display: block;
      position: relative;
      margin-top: 0.5rem;
      z-index: 2;
    }
    canvas {
      &#iconCanvas0 {
        width: 4.6rem;
        height: 4.6rem;
      }
      &#iconCanvas1 {
        width: 3.4rem;
        height: 3.2rem;
      }
      &#iconCanvas2 {
        width: 4rem;
        height: 3.8rem;
      }
      &#iconCanvas3 {
        width: 4rem;
        height: 4rem;
      }
      &#iconCanvas4 {
        width: 4.4rem;
        height: 4.2rem;
      }
      &#iconCanvas5 {
        width: 6.3rem;
        height: 4.4rem;
      }
    }
    .silkCanvas {
      width: 5.1rem;
      height: 0.9rem;
      position: absolute;
      bottom: -0.15rem;
      left: 0.62rem;
      z-index: 5;
    }
    .btn {
      width: 7.5rem;
      height: 2.78rem;
      background: url(../img/top_bg.png);
      background-size: 100% 100%;
      position: absolute;
      bottom: -1.48rem;
    }
  }
  .iconList {
    width: 6.72rem;
    min-height: 8.66rem;
    padding: 0.04rem;
    background: linear-gradient(#222631, #1F232D);
    border-radius: 0.28rem;
    margin: 0.65rem auto 0;
    position: relative;
    .title {
      width: 2.3rem;
      height: 0.49rem;
      position: absolute;
      left: 2.32rem;
      top: -0.2rem;
      text-align: center;
      line-height: 0.49rem;
      color: #7F4C1B;
      font-size: 0.26rem;
      font-weight: bold;
      .msg {
        width: 100%;
        height: 100%;
        background: url(../img/icon/iconTitle.png);
        background-size: 100% 100%;
        position: absolute;
        z-index: 1;
      }
      i {
        display: block;
        width: 1.58rem;
        height: 0.04rem;
        position: absolute;
        &.liner_l {
          background: url(../img/liner_l.png);
          background-size: 100% 100%;
          top: 0.2rem;
          left: -1.4rem;
        }
        &.liner_r {
          background: url(../img/liner_r.png);
          background-size: 100% 100%;
          top: 0.2rem;
          right: -1.4rem;
        }
      }
    }
    .listCon {
      background: #1E212C;
      width: 100%;
      height: 100%;
      border-radius: 0.28rem;
      .is {
        height: 1.28rem;
        text-align: center;
        line-height: 1.4rem;
        color: rgba(255, 255, 255, 0.2);
        font-size: 0.26rem;
        &.act {
          color: #FFC86D;
        }
      }
      .iconListMsg {
        width: 5.6rem;
        padding: 0 0.56rem;
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
      }
      .iconItem {
        width: 1.28rem;
        height: 2.4rem;
        margin-bottom: 0.33rem;
        // flex: 33.33%;
        .icon {
          display: block;
          width: 1.28rem;
          height: 1.28rem;
          margin: 0 auto;
          &.icon1 {
            background: url(../img/icon/icon1.png);
            background-size: 100% 100%;
          }
          &.icon2 {
            background: url(../img/icon/icon2.png);
            background-size: 100% 100%;
          }
          &.icon3 {
            background: url(../img/icon/icon3_black.png);
            background-size: 100% 100%;
            &.act {
              background: url(../img/icon/icon3.png);
              background-size: 100% 100%;
            }
          }
          &.icon4 {
            background: url(../img/icon/icon4_black.png);
            background-size: 100% 100%;
            &.act {
              background: url(../img/icon/icon4.png);
              background-size: 100% 100%;
            }
          }
          &.icon5 {
            background: url(../img/icon/icon5_black.png);
            background-size: 100% 100%;
            &.act {
              background: url(../img/icon/icon5.png);
              background-size: 100% 100%;
            }
          }
          &.icon6 {
            background: url(../img/icon/icon6_black.png);
            background-size: 100% 100%;
            &.act {
              background: url(../img/icon/icon6.png);
              background-size: 100% 100%;
            }
          }
          &.icon7 {
            background: url(../img/icon/icon7_black.png);
            background-size: 100% 100%;
            &.act {
              background: url(../img/icon/icon7.png);
              background-size: 100% 100%;
            }
          }
          &.icon8 {
            background: url(../img/icon/icon8_black.png);
            background-size: 100% 100%;
            &.act {
              background: url(../img/icon/icon8.png);
              background-size: 100% 100%;
            }
          }
          &.icon9 {
            background: url(../img/icon/icon9_black.png);
            background-size: 100% 100%;
            &.act {
              background: url(../img/icon/icon9.png);
              background-size: 100% 100%;
            }
          }
        }
        strong {
          display: block;
          text-align: center;
          color: rgba(255, 255, 255, 0.4);
          font-size: 0.26rem;
          margin-top: 0.22rem;
        }
        &.act {
          strong {
            color: #FFC86D;
          }
        }
      }
      .iconItem:nth-child(2),
      .iconItem:nth-child(5),
      .iconItem:nth-child(8) {
        margin: 0 0.3rem;
      }
    }
  }
  .userMsg {
    position: fixed;
    bottom: 0;
    width: 7.5rem;
    height: 2.2rem;
    background: #262936;
    .liner {
      width: 7.5rem;
      height: 0.04rem;
      background: linear-gradient(90deg, #303540, #495162, #272B35);
      position: absolute;
      top: 0rem;
    }
    .userScore {
      .userMonth {
        height: 0.89rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 0.38rem 0 0.33rem;
        span {
          color: rgba(255, 255, 255, 0.4);
          font-size: 0.26rem;
          em {
            color: #FFC86D;
            font-size: 0.26rem;
          }
        }
      }
      .lv {
        .lvLiner {
          width: 6.86rem;
          height: 0.14rem;
          background: #404654;
          border-radius: 0.07rem;
          margin: 0 auto;
          position: relative;
          .actLiner {
            max-width: 100%;
            height: 100%;
            background: linear-gradient(90deg, #DCA150, #F6D09C);
            box-shadow: 0.07rem 0 0.1rem 0 rgba(223, 162, 87, 0.6);
            border-radius: 0.07rem;
            position: absolute;
            left: 0;
            top: 0;
          }
        }
        .lvItem {
          padding: 0 0.33rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          color: rgba(255, 255, 255, 0.4rem);
          font-size: 0.22rem;
          text-align: center;
          margin-top: 0.34rem;
          .item {
            width: 0.8rem;
            text-align: center;
            position: relative;
            &.act {
              color: #FFC86D;
            }
            &.over {
              color: rgba(255, 200, 109, 0.4);
            }
          }
          .item::before {
            content: '';
            display: block;
            width: 0.02rem;
            height: 0.1rem;
            background: #FFFFFF;
            opacity: 0.4;
            position: absolute;
            left: 0.39rem;
            top: -0.19rem;
          }
          .lvScore {
            // margin-top: 0.02rem;
          }
        }
      }
    }
  }
  .tipsMsg {
    width: 6.18rem;
    min-height: 5.06rem;
    padding-bottom: 0.48rem;
    background: #FFFFFF;
    border-radius: 0.3rem;
    position: relative;
    .close {
      display: block;
      width: 0.48rem;
      height: 0.48rem;
      background: url(../img/close.png);
      background-size: 100% 100%;
      position: absolute;
      top: 0.2rem;
      right: 0.2rem;
    }
    .title {
      height: 1rem;
      line-height: 0.9rem;
      text-align: left;
      color: #2C2B36;
      text-align: center;
      font-weight: bold;
    }
    img {
      width: 4.66rem;
      height: 2.86rem;
      margin: 0 auto;
    }
    .tips {
      padding: 0 0.68rem;
      margin: 0.4rem auto 0;
      color: #2C2B36;
      font-size: 0.28rem;
      text-align: center;
      line-height: 0.4rem;
    }
  }
  img {
    display: block;
    width: 100%;
  }
}
</style>