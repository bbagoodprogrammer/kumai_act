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
          <canvas id="silkCanvas"></canvas>
          <div class="btn"></div>
        </div>
        <div class="iconList">
          <div class="title">
            <i class="liner_l"></i>
            <i class="liner_r"></i>
            <div class="msg">
              特權信息 {{item.privilege +1}}/{{iconConfig.length}}
            </div>
          </div>
          <div class="listCon">
            <div class="iconItem" v-for="(item2,index2) in iconConfig" :key="index2" :class="{act:item.privilege >= index2}">
              <span class="icon" :class="[{act:item.privilege >= index2},'icon'+ (index2 +1)]"></span>
              <strong>{{item2.name}}</strong>
            </div>
          </div>
        </div>
      </van-swipe-item>
    </van-swipe>
    <div class="userMsg">
      <i class="liner"></i>
      <div class="userScore">
        <div class="userMonth">
          <span class="score">本月已累積 <em>{{user.noble_value}}</em> 貴族值</span>
          <span class="explain">說明</span>
        </div>
        <div class="lv">
          <div class="lvLiner">
            <div class="actLiner" :style="{width:actWidth}"></div>
          </div>
          <div class="lvItem">
            <div class="item" v-for="(item,index) in level_list" :key="index" :class="{act:user.noble_level  ==  index,over:user.noble_level  >  index}">
              <div class="name">{{item.name}}</div>
              <div class="lvScore">{{item.value /10000}}万</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="mask" v-show="showPup">
      <transition name="slide">
        <div class="tipsMsg" v-if="showPup">
          <i class="close" @click="showPup = false"></i>
          <div class="title">貴族稱號</div>
          <img src="" alt="">
          <p class="tips">
            貴族稱號將展示在房間的公屏發言、資料卡片，貴族等級越高象徵身份越尊貴
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
const parser = new Parser({ disableWorker: true })

export default {
  data () {
    return {
      initNum: 0,
      nowIndex: 0,
      nobleConfig: [
        {
          name: '遊俠',
          privilege: 1
        },
        {
          name: '騎士',
          privilege: 2
        },
        {
          name: '子爵',
          privilege: 3
        },
        {
          name: '伯爵',
          privilege: 5
        },
        {
          name: '侯爵',
          privilege: 7
        },
        {
          name: '公爵',
          privilege: 8
        },
      ],
      iconConfig: [
        {
          name: '貴族稱號'
        },
        {
          name: '特權禮物'
        },
        {
          name: '專屬頭像框'
        },
        {
          name: '尊貴名片'
        },
        {
          name: '酷炫进场秀'
        },
        {
          name: '聊天氣泡'
        },
        {
          name: '查看喜歡'
        },
        {
          name: '稀有座駕'
        },
        {
          name: '防踢'
        }
      ],
      svgaConfig: {
        0: {
          key: '0',
          addres: '//fstatic.cat1314.com/uc/svga/978fc1ab3b80c70da85665715c09875a_1627631713.svga'
        },
        1: {
          key: '1',
          addres: '//fstatic.cat1314.com/uc/svga/7b07303b8461a049783eec6be9c7c076_1627381713.svga'
        },
        2: {
          key: '2',
          addres: '	//fstatic.cat1314.com/uc/svga/0316af4411f1d62f70051062b75cf5eb_1627372792.svga'
        },
        3: {
          key: '3',
          addres: '	//fstatic.cat1314.com/uc/svga/1d5c810a76af7ebbd9f895dcebe590dc_1627372784.svga'
        },
        4: {
          key: '4',
          addres: '	//fstatic.cat1314.com/uc/svga/c2923fa6a99d85add23eab3c22eb1791_1627372776.svga'
        },
        5: {
          key: '5',
          addres: '//fstatic.cat1314.com/uc/svga/4c1a88b03aa12daf63c2d49a168d51bc_1627372767.svga'
        },
      },
      showPup: false
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
          return userScore / c * 100 / 6 / 4.8 + '%'
        } else if (userScore >= this.level_list[listLength].value) {  //满级
          return '94%'
        } else {
          console.log(listLength)
          for (var i = listLength - 1; i >= 0; i--) {
            if (userScore >= this.level_list[i].value) {
              let c = this.level_list[i + 1].value - this.level_list[i].value
              let a = userScore - this.level_list[i].value
              console.log(a, c)
              return (a / c / 4.8 * 100) + (i - 1) * 19 + '%'
            }
          }
        }
      }
      return '0%'
    }
  },
  mounted () {
    this.svgaPlayer(this.svgaConfig[0], true)
    this.svgaPlayer(this.svgaConfig[1], false)
  },
  methods: {
    tabClick (index) {
      this.nowIndex = index
      this.$refs.swiper.swipeTo(index)
    },
    onChange (index) {
      console.log(index)
      if (this.svgaConfig[index].player) {
        this.svgaConfig[index].player.stop()
      }
      this.nowIndex = index
      this.svgaPlayer(this.svgaConfig[this.nowIndex], true)
    },
    async svgaPlayer (item, play) {
      let data = await this.loadSvgaData(item.addres)
      let canvas = document.getElementById('iconCanvas' + item.key)
      let player = new Player(canvas)
      await player.mount(data)
      if (play) {
        player.start()
      }
      item.player = player
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
  }
}
</script>

<style lang="scss">
body {
  background: #181B23;
}
.pageIndex {
  padding-bottom: 2.5rem;
  .tabs {
    height: 0.86rem;
    padding: 0 0.46rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .tabItem {
      font-size: 0.28rem;
      color: rgba(255, 255, 255, 0.4);
      position: relative;
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
        left: 0.14rem;
        bottom: -0.15rem;
      }
    }
  }
  .my-swipe .van-swipe-item {
    .landBg,
    #landCanvas {
      width: 100%;
      height: 100%;
    }
  }
  .canvasShow {
    height: 5.08rem;
    position: relative;
    .aniSvga {
      display: block;
      width: 4.6rem;
      height: 4.6rem;
      margin: 0 auto;
    }
    .btn {
      width: 7.5rem;
      height: 2.78rem;
      background: url(../img/top_bg.png);
      background-size: 100% 100%;
      position: absolute;
      bottom: -0.73rem;
    }
  }
  .iconList {
    width: 6.72rem;
    height: 7.86rem;
    padding: 0.04rem;
    border-image: -moz-linear-gradient(#222631, #1F232D) 4 4;
    border-image: linear-gradient(#222631, #1F232D) 4 4;
    background: -webkit-linear-gradient(0deg, #222631, #1F232D);
    border-radius: 0.28rem;
    margin: 0 auto;
    position: relative;
    .title {
      width: 2.3rem;
      height: 0.49rem;
      position: absolute;
      left: 2.32rem;
      top: -0.2rem;
      text-align: center;
      line-height: 0.56rem;
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
      width: 5.52rem;
      height: 7.08rem;
      padding: 0.78rem 0.6rem 0;
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      .iconItem {
        width: 33.3%;
        height: 2.4rem;
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
            background: url(../img/icon/icon1.png);
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
    }
  }
  .userMsg {
    position: fixed;
    bottom: 0;
    width: 7.5rem;
    height: 1.9rem;
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
        height: 0.73rem;
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
          margin-top: 0.25rem;
          .item {
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
            left: 0.2rem;
            top: -0.17rem;
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
    }
  }
  img {
    display: block;
    width: 100%;
  }
}
</style>