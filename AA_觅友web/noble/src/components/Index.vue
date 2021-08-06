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
            <p class="is" :class="{act:user.noble_level >= nowIndex +1 }">{{user.noble_level >= nowIndex +1 ?'已達到':'尚未達到'}} </p>
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
          <span class="score">本月已累積 <em>{{user.noble_value}}</em> 貴族值</span>
          <span class="explain" @click="$router.push({name:'explain'})">說明</span>
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
          <div class="title"> {{iconConfig[showIndex].name}}</div>
          <img :src=" getImg()" alt="">
          <p class="tips">
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
          name: '貴族稱號',
          tips: '貴族稱號將展示在房間的公屏發言、資料卡片中，貴族等級越高象徵身份越尊貴。'
        },
        {
          name: '特權禮物',
          tips: '貴族身份可在房間中贈送特權禮物，貴族等級越高可贈送的禮物越多，禮物特效越酷炫。'
        },
        {
          name: '專屬頭像框',
          tips: '貴族擁有專屬頭像框，貴族等級越高效果越酷炫。'
        },
        {
          name: '尊貴名片',
          tips: '貴族擁有尊貴名片，在房間戶信息卡展示效果，貴族等級越高效果越酷炫。'
        },
        {
          name: '酷炫进场秀',
          tips: '貴族擁有酷炫的進場秀效果，進入房間時觸發效果，獲得全場矚目。'
        },
        {
          name: '聊天氣泡',
          tips: '貴族擁有聊天氣泡裝飾，在房間、私訊中發言帶有醒目氣泡框。'
        },
        {
          name: '查看喜歡',
          tips: '貴族在交友配對中享有查看喜歡我的人特權，更容易找到心儀對象。'
        },
        {
          name: '稀有座駕',
          tips: '貴族擁有稀有座駕，進入房間時觸發效果，霸氣十足，驚豔全場。'
        },
        {
          name: '防踢',
          tips: '貴族擁有發防踢特權，在房間中無法被房主、房管踢出房間。'
        }
      ],
      svgaConfig: {
        0: {
          key: '0',
          addres: '//fstatic.cat1314.com/uc/svga/48b4c8a95ec34425c29f77e9020dfd0f_1628072688.svga'
        },
        1: {
          key: '1',
          addres: '//fstatic.cat1314.com/uc/svga/c829a0071081b0c8ab724eb24d58509b_1628072680.svga'
        },
        2: {
          key: '2',
          addres: '//fstatic.cat1314.com/uc/svga/c8af8b330c7e11269a78925706ee047b_1628072667.svga'
        },
        3: {
          key: '3',
          addres: '//fstatic.cat1314.com/uc/svga/d032750c9d209b3f2afcaa410b4fd233_1628072659.svga'
        },
        4: {
          key: '4',
          addres: '//fstatic.cat1314.com/uc/svga/ef72b32b1e67336abd48febbd12c26b0_1628072650.svga '
        },
        5: {
          key: '5',
          addres: '//fstatic.cat1314.com/uc/svga/bd4a6fab31bf864b0c3aeb72593ce84e_1628072641.svga'
        },
      },
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
          return userScore / c * 100 / 6 / 4.8 + '%'
        } else if (userScore >= this.level_list[listLength].value) {  //满级

          return '92%'
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
  watch: {
    user (val) {
      this.initNum = val.noble_level - 1 < 0 ? 0 : val.noble_level - 1
      this.nowIndex = val.noble_level - 1 < 0 ? 0 : val.noble_level - 1
      let listLength = Object.keys(this.level_list).length
      console.log(this.initNum, this.nowIndex)
      setTimeout(() => {
        this.svgaPlayer(this.svgaConfig[this.initNum], true)
        if (val.noble_level < listLength) {
          this.svgaPlayer(this.svgaConfig[this.initNum + 1], false)
        }

      }, 0)

    }
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
      console.log(data)
      if (item.key == 0) {
        player.set({ startFrame: 2 })
      }
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
    showMsg (index, item, index2) { //第几级 第几个icon
      console.log(index, item.privilege)
      if (item.privilege >= index2) {
        this.showLv = index + 1
        this.showIndex = index2
        this.showPup = true
      }

    },
    getImg () {
      return _images[`${this.showIndex + 1}_${this.showLv}`]
    }
  },
  created () {
    console.log(_images)
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
      position: absolute;
      left: 1.45rem;
      top: 0;
      z-index: 2;
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
    height: 8.66rem;
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
      width: 5.6rem;
      height: 8.66rem;
      padding: 0 0.6rem;
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
        width: 100%;
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
      }
      .iconItem {
        width: 1.28rem;
        height: 2.4rem;
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
            text-align: left;
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
            top: -0.19rem;
          }
          .lvScore {
            margin-top: 0.02rem;
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