<template>
  <div class="luck">
    <div class="land">
      <div class="landList">
        <div class="landName" v-if="islands[nowIndex]&&islands[nowIndex].status == 0">{{lang.noOpen}}</div>
        <div class="landName" v-else>{{islands[nowIndex]?islands[nowIndex].name:''}}</div>
        <van-swipe class="my-swipe" :loop="false" :show-indicators="false" :initial-swipe="initNum" @change="onChange" ref="swiper">
          <van-swipe-item v-for="(item,index) in islands" :key="index">
            <canvas id="landCanvas" v-if="item.status == 1" />
            <img :src="require(`../img/landImg/${index+1}.png`)" alt="" class="landBg" v-else>
            <div class="user" v-if="item.uid">
              <img v-lazy="item.avatar" alt="" @click="goUser(item.uid)">
              <div class="nick">{{item.nick}}</div>
            </div>
          </van-swipe-item>
        </van-swipe>
        <span class="left" @click="gotoswiper('left')"></span>
        <span class="right" @click="gotoswiper('right')"></span>
      </div>
      <div class="userShovelNums">
        <div class="shovleItem" v-for="(item,index) in userShovelNums" :key="index">
          <span class="shovleIcon" :class="{gold:item.type == 'gold'}"></span>
          <span class="nums">{{item.nums}}</span>
          <div class="getBtn" @click="luck(index)" :class="{gold1:item.type == 'gold' && item.sellNums == 1,gold2:item.type == 'gold' && item.sellNums == 10}">
            {{item.sellNums == 1?lang.luckOne:lang.luckTen}}
          </div>
        </div>
      </div>
      <!-- 抽獎禮物彈窗 -->
      <div class="mask" v-show="showLuckGift">
        <transition name="slide">
          <div class="luckGiftPup" v-if="showLuckGift">
            <i class="close" @click="showLuckGift =false"></i>
            <div class="luckTop">
              <span class="icon">{{lang.luckTitle}}</span>
            </div>
            <div class="luckCon" :class="{one:Object.keys(prizes).length == 1}">
              <div class="giftItem" v-for="(item,index) in prizes" :key="index">
                <div class="imgBox">
                  <img src="../img/coin.png" alt="" v-if="item.type == 'coin'">
                  <img src="../img/bean.png" alt="" v-if="item.type == 'bean'">
                  <img :src="item.image" alt="" v-else>
                  <div class="nums">
                    {{item.count}}
                  </div>
                </div>
                <strong>{{item.name}}</strong>
              </div>
              <p class="userScoreTips" v-if="prizes.length == 1">{{lang.userScoreTips1.replace('%n',prizes[0].name).replace('%s',score)}}</p>
              <p class="userScoreTips" v-else>{{lang.userScoreTips2.replace('%s',score)}}</p>
              <div class="nextBtn">
                <span class="ok" @click="showLuckGift = false">{{lang.ok}}</span>
                <span class="next" @click="luck(luckIndex)">{{lang.again}}</span>
              </div>
            </div>
            <div class="luckBotton"></div>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex"
import { luck } from "../apis"

import { Downloader, Parser, Player } from 'svga.lite'

const downloader = new Downloader()
const parser = new Parser({ disableWorker: true })

export default {
  data () {
    return {
      nowIndex: 0,
      prizes: [],
      showLuckGift: false,
      score: 0,
      svgaList: [
        'http://fstatic.cat1314.com/uc/svga/c492c6ee04fb37f3cc52db56925ead16_1627372734.svga',
        'http://fstatic.cat1314.com/uc/svga/cdf8916fe16f69e246deeb0fd2dab5ef_1627372749.svga',
        'http://fstatic.cat1314.com/uc/svga/887f14cfc070ad6458881234cf61b546_1627372759.svga',
        'http://fstatic.cat1314.com/uc/svga/4c1a88b03aa12daf63c2d49a168d51bc_1627372767.svga',
        'http://fstatic.cat1314.com/uc/svga/c2923fa6a99d85add23eab3c22eb1791_1627372776.svga',
        'http://fstatic.cat1314.com/uc/svga/1d5c810a76af7ebbd9f895dcebe590dc_1627372784.svga',
        'http://fstatic.cat1314.com/uc/svga/0316af4411f1d62f70051062b75cf5eb_1627372792.svga'
      ],
      player: null,
      luckIndex: {}
    }
  },
  computed: {
    ...mapState(['islands', 'activity', 'owner']),
    initNum () {
      return this.activity.vol - 1
    },
    userShovelNums () {
      return [
        {
          type: 'iron',
          sellNums: 1,
          nums: this.owner.iron_num,
        },
        {
          type: 'gold',
          sellNums: 1,
          nums: this.owner.gold_num,
        },
        {
          type: 'gold',
          sellNums: 10,
          nums: this.owner.gold_num,
        }
      ]
    },
    showSvgaAddres () {
      return this.svgaList[this.activity.vol - 1]
    }
  },
  watch: {
    activity (val) {
      this.nowIndex = val.vol - 1
    },
    islands (val) {
      if (val.length) {
        setTimeout(() => {
          this.bannerGo()
        }, 0)
      }
    }
  },
  methods: {
    onChange (index) {
      console.log(index)
      this.nowIndex = index
    },
    luck (index) {
      let item = this.userShovelNums[index]
      if (item.nums >= item.sellNums) {
        this.luckIndex = index
        luck(item.type, item.sellNums).then(res => {
          if (res.data.response_status.code == 0) {
            this.prizes = res.data.response_data.prizes
            this.score = res.data.response_data.score
            this.showLuckGift = true
            this.$store.dispatch('getInitInfo');
          } else {
            this.toast(res.data.response_status.error)
          }
        })
      } else {
        this.showLuckGift = false
        console.log(item.type)
        if (item.type == 'iron') {
          this.$parent.$parent.showGetShovel = true
        } else {
          this.$parent.$parent.showGetShovel = true
          setTimeout(() => {
            this.vxc('setSetType', 2)
          }, 0);

          //   this.$parent.$parent.$refs.GetShovel.setType = 2
        }
      }
    },
    gotoswiper (t) {
      if (t == 'left') {
        if (this.nowIndex > 0) {
          this.$refs.swiper.swipeTo(--this.nowIndex);
        }
      } else {
        if (this.nowIndex < this.islands.length - 1) {
          this.$refs.swiper.swipeTo(++this.nowIndex);
        }
      }

    },
    async bannerGo () {
      if (this.player) {
        this.player.clear()
      }

      let canvas = document.getElementById('landCanvas')
      const fileData = await downloader.get(this.showSvgaAddres);
      const data = await parser.do(fileData);
      console.log(data, canvas)
      this.player = new Player(canvas)
      await this.player.mount(data)
      this.player.start()
    },
    goUser (uid) {
      console.log(uid)
      var isiOS = navigator.userAgent.match(/iPhone|iPod|ios|iPad/i);
      if (isiOS) {
        sendJsData('app://userInfo?uid=' + uid);
      } else {
        javascript: JSInterface.sendJsData('app://userInfo?uid=' + uid);
      }
    }
  }
}
</script>

<style lang="scss">
.luck {
  width: 7.34rem;
  height: 9.34rem;
  background: url(../img/landBg.png);
  background-size: 100% 100%;
  margin: 0.1rem auto 0;
  padding-top: 0.13rem;
  .land {
    width: 7.04rem;
    height: 9.18rem;
    background: url(../img/land.png);
    background-size: 100% 100%;
    margin: 0 auto;
    position: relative;
    .landName {
      width: 2.6rem;
      height: 1.03rem;
      text-align: center;
      line-height: 1.3rem;
      background: url(../img/landName2.png);
      background-size: 100% 100%;
      position: absolute;
      left: 2.3rem;
      text-shadow: #9C5314 0.02rem 0 0, #9C5314 0 0.02rem 0,
        #9C5314 -0.02rem 0 0, #9C5314 0 -0.02rem 0;
    }
    .right,
    .left {
      display: block;
      width: 0.59rem;
      height: 0.59rem;
      background: url(../img/left.png);
      background-size: 100% 100%;
      position: absolute;
      top: 3.61rem;
      left: 0.08rem;
    }
    .right {
      background: url(../img/right.png);
      background-size: 100% 100%;
      left: 6.31rem;
    }
  }

  .my-swipe {
    padding-top: 1.39rem;
  }
  .my-swipe .van-swipe-item {
    width: 6.94rem;
    height: 4.86rem;
    .landBg,
    #landCanvas {
      width: 100%;
      height: 100%;
    }
    .user {
      position: absolute;
      top: 2.96rem;
      left: 2.24rem;
      width: 2.41rem;
      height: 0.53rem;
      border: 0.02rem solid #FFFFFF;
      border-radius: 0.26rem;
      background: RGBA(48, 57, 38, 0.6);
      display: flex;
      align-items: center;
      img {
        width: 0.71rem;
        height: 0.71rem;
        border-radius: 50%;
        border: 0.02rem solid #F6B28C;
        margin-top: -0.1rem;
      }
      .nick {
        height: 100%;
        margin: 0 0.1rem;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
    }
  }
  .userShovelNums {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 0.34rem;
    margin-top: -0.2rem;
    .shovleItem {
      width: 1.99rem;
      height: 2.88rem;
      position: relative;
      .shovleIcon {
        display: block;
        width: 1.99rem;
        height: 2.06rem;
        background: url(../img/shovleIcon1.png);
        background-size: 100% 100%;
        &.gold {
          background: url(../img/shovleIcon2.png);
          background-size: 100% 100%;
        }
      }
      .nums {
        display: block;
        width: 0.38rem;
        height: 0.38rem;
        background: url(../img/nums.png);
        background-size: 100% 100%;
        position: absolute;
        top: 0.14rem;
        right: 0.28rem;
        font-size: 0.23rem;
        text-align: center;
        line-height: 0.38rem;
      }
      .getBtn {
        width: 1.98rem;
        height: 0.96rem;
        background: url(../img/getBtn1.png);
        background-size: 100% 100%;
        line-height: 0.35rem;
        text-align: center;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: -0.3rem;
        font-size: 0.36rem;
        &.gold1 {
          color: #A4261C;
          background: url(../img/getBtn2.png);
          background-size: 100% 100%;
        }
        &.gold2 {
          color: #A4261C;
          width: 2.24rem;
          height: 1.17rem;
          background: url(../img/getBtn3.png);
          background-size: 100% 100%;
          margin: -0.4rem 0 0 -0.1rem;
        }
      }
    }
  }
  .luckGiftPup {
    width: 6.94rem;
    min-height: 4rem;
    position: relative;
    .close {
      display: block;
      width: 0.5rem;
      height: 0.5rem;
      position: absolute;
      right: 0.3rem;
      top: -0.9rem;
      background: url(../img/close.png);
      background-size: 100% 100%;
      z-index: 1;
    }
    .luckTop {
      width: 6.94rem;
      height: 1.28rem;
      background: url(../img/luckGift_top.png);
      background-size: 100% 100%;
      position: relative;
      text-align: center;

      .icon {
        display: block;
        width: 7.24rem;
        height: 1.61rem;
        background: url(../img/pupHeader.png);
        background-size: 100% 100%;
        position: absolute;
        top: -0.9rem;
        left: -0.15rem;
        line-height: 0.8rem;
        font-size: 0.36rem;
        font-weight: bold;
      }
    }
    .luckCon {
      width: 6.42rem;
      padding: 0 0.33rem 0 0.19rem;
      margin-top: -0.02rem;
      min-height: 3rem;
      background: url(../img/luckGift_con.png);
      background-size: 100% 100%;
      display: flex;
      align-items: flex-start;
      justify-content: center;
      flex-wrap: wrap;
      .giftItem {
        width: 1.48rem;
        margin: 0 0 0.06rem 0.12rem;
        .imgBox {
          width: 1.31rem;
          height: 1.31rem;
          background: url(../img/giftItemBg.png);
          background-size: 100% 100%;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto;
          img {
            width: 1.06rem;
            height: 1.06rem;
          }
          .nums {
            position: absolute;
            bottom: 0.05rem;
            right: 0.05rem;
            display: flex;
            align-items: center;
            color: #7D3F0A;
            img {
              width: 0.25rem;
              height: 0.31rem;
              margin-left: -0.05rem;
            }
          }
        }
        strong {
          width: 100%;
          color: #A9650A;
          font-size: 0.24rem;
          display: block;
          text-align: center;
          margin-top: 0.05rem;
        }
      }
      .userScoreTips {
        padding: 0 0.5rem;
        font-size: 0.28rem;
        color: #A36E41;
        text-align: center;
        margin: 0.2rem 0;
      }
      .nextBtn {
        width: 100%;
        padding: 0 0.9rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
        span {
          width: 2.14rem;
          height: 0.87rem;
          background: url(../img/getBtn1.png);
          background-size: 100% 100%;
          text-align: center;
          line-height: 0.87rem;
          &.ok {
            color: #05257F;
          }
          &.next {
            color: #561F04;
            background: url(../img/getBtn2.png);
            background-size: 100% 100%;
          }
        }
      }
      &.one {
        justify-content: center;
        .giftItem {
          width: 2.06rem;
        }
      }
    }
    .luckBotton {
      width: 6.94rem;
      height: 1.88rem;
      background: url(../img/luckGift_bottom.png);
      background-size: 100% 100%;
      margin-top: -1.3rem;
    }
  }
}
</style>