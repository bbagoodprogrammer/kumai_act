<template>
  <div class="cards">
    <div class="cardItem" v-swipe="onSwipe" :class="[{open:item.open == 1,turn:turnId == index},'card'+item.className]" v-for="(item,index) in newCards" :key="index">
      <div class="inner">
        <div class="front">
          <img src="../assets/img/carItemBg.png" alt="">
        </div>
        <div class="back">
          <img :src="require(`../assets/img/number/${item.card}.png`)" class="cardIndex1">
          <img :src="require(`../assets/img/number/${item.card}.png`)" class="cardIndex2">
          <div class="imgBox">
            <img :src="item.image" alt="" v-if="item.image" class="giftImg">
            <img :src="getWardImg(item.type)" alt="" v-else class="giftImg">
            <i class="double" v-if="item.double == 1"></i>
          </div>
          <p class="giftName" v-if="item.name">{{item.name}}</p>
          <p class="giftName" v-else>{{getWardName(item)}}</p>
        </div>
      </div>
    </div>
    <div class="btn">
      <!-- <span class="noClick" v-if="initData.chanceUsed >= 5">{{lang.noNum}}</span> -->
      <!-- v-if="nowMid && nowMid.open == 0" -->
      <span class="open" @click="openCard()">{{lang.oneNum}}</span>
    </div>
    <div class="mask" v-show="showGift">
      <transition name="slide">
        <div class="giftPup" v-if="showGift">
          <div class="con">
            <p class="title"><em v-if="giftPup.double == 0">{{lang.prize}}</em> <em v-else>{{lang.twoPrize}}</em> </p>
            <div class="giftPupImg">
              <img :src="require(`../assets/img/number/${giftPup.card}.png`)" class="cardIndex1">
              <img :src="require(`../assets/img/number/${giftPup.card}.png`)" class="cardIndex2">
              <div class="imgBox">
                <img :src="giftPup.image" alt="" v-if="giftPup.image" class="giftImg">
                <img :src="getWardImg(giftPup.type)" alt="" v-else class="giftImg">
                <i class="double" v-if="giftPup.double == 1"></i>
              </div>
              <p class="giftName" v-if="giftPup.name">{{giftPup.name}}</p>
              <p class="giftName" v-else>{{getWardName(giftPup)}}</p>
              <p class="giftTips">{{lang.prizeTips}}</p>
            </div>
            <span class="closeGiftPup" @click="closeGiftPup()">{{lang.query}}</span>
          </div>
        </div>
      </transition>
    </div>
    <div class="mask" v-show="showT">
      <transition name="slide">
        <msg-toast :msg="tastMsg" @closeToast="closeToast()" v-show="showT"></msg-toast>
      </transition>
    </div>

  </div>
</template>
<script>
import { mapState } from "vuex"
import { setTimeout, setInterval, clearInterval } from 'timers';
import api from "../api/apiConfig"
import MsgToast from "../components/commonToast"
import { globalBus } from '../utils/eventBus'
import { wards } from "../config/wards"
import wardsImg from "../config/wardsImg"
export default {
  components: { MsgToast },
  data() {
    return {
      turnId: -2,
      type: 1,
      showT: false,
      tastMsg: '',
      timer: null,
      showGift: false,  //禮物彈窗
      giftPup: {},
      cards: [
        {
          className: 1,
          card: "2",
          type: "no",
          open: 0,
        },
        {
          className: 5,
          card: "2",
          type: "no",
          open: 0
        },
        {
          className: 2,
          card: "2",
          type: "no",
          open: 0
        },
        {
          className: 4,
          card: "2",
          type: "no",
          open: 0
        },
        {
          className: 3,
          card: "2",
          type: "no",
          open: 0
        },
      ],
      nowMid: {}
    }
  },
  computed: {
    ...mapState(['initData']),
    newCards() {
      if (this.initData.cards) {
        let arr = this.initData.cards || []
        for (let i = 0; i < arr.length; i++) {
          arr[i].open = 1
        }
        return this.cards.map((o, i) => { return { ...o, ...arr[i] } })
      }
    },
  },
  watch: {
    initData() {
      this.setTime()
    },
    newCards(val) {
      this.vxc('setNewCards', val)
      this.newCards.forEach((element, index) => {
        if (element.className == 3) {
          this.nowMid = element
        }
      })
    }
  },
  mounted() {
    if (this.initData.cards) {
      this.setTime()
    }
  },
  methods: {
    onSwipe(e) {
      clearInterval(this.timer)
      if (e == 'left') {
        this.btnC()
      } else if (e == 'right') {
        this.btnR()
      }
      this.setTime()
    },
    openCard() {
      globalBus.$emit('commonEvent', () => {
        if (this.initData.registered) {
          if (this.initData.chance > 0) {
            clearInterval(this.timer)
            api.openCard().then(res => {
              const { response_status, response_data } = res.data
              if (response_status.code == 0) {
                this.cards.forEach((element, index) => {
                  if (element.className == 3) {
                    this.turnId = index
                    let newObj = Object.assign(this.cards[index], response_data.prize)
                    newObj.open = 1
                    this.cards[index] = newObj
                    this.vxc('reductOpenClick', newObj)
                    this.vxc('setNewCards', this.newCards)
                    this.giftPup = newObj
                    setTimeout(() => {
                      this.showGift = true
                    }, 600)
                    return
                  }
                });
              } else {
                this.tastMsg = response_status.error
                this.showT = true
              }
            })
          } else {
            this.tastMsg = this.lang.noScore
            this.showT = true
          }
        } else {
          this.tastMsg = this.lang.goSingUp
          this.showT = true
        }
      })
    },
    setTime() {
      clearInterval(this.timer)
      this.timer = setInterval(() => {
        this.btnC()
      }, 2000)
    },
    btnC() {
      for (let i = 0; i < this.cards.length; i++) {
        this.cards[i].className--
        if (this.cards[i].className == 0) {
          this.cards[i].className = 5
        }
      }
    },
    btnR() {
      for (let i = 0; i < this.cards.length; i++) {
        this.cards[i].className++
        if (this.cards[i].className == 6) {
          this.cards[i].className = 1
        }
      }
    },
    closeGiftPup() {
      this.showGift = false
      this.setTime()
    },
    getWardImg(type) {
      return wardsImg[type]
    },
    getWardName(item) {
      return wards[item.type].replace('X', item.num)
    },
    closeToast() {
      this.showT = false
    }
  }
}
</script>
<style lang="scss" scoped>
.cards {
  width: 7rem;
  padding-top: 0.56rem;
  height: 5.55rem;
  background: url(../assets/img/turnBg.png);
  background-size: 100% 100%;
  margin: 0 auto;
  position: relative;
  .cardItem {
    width: 3rem;
    height: 4.2rem;
    position: absolute;
    transition: all 0.5s ease;
    perspective: 1000px;
    -webkit-perspective: 1000px;
    .inner {
      position: relative;
      width: 100%;
      height: 100%;
      transform-style: preserve-3d;
      -webkit-transform-style: preserve-3d;
      /* Safari and Chrome */
    }
    .inner > div {
      width: 100%;
      height: 100%;
      position: absolute;
      backface-visibility: hidden;
    }
    .back {
      background: url(../assets/img/openCarBg.png);
      background-size: 100% 100%;
      transform: rotateY(180deg);
      position: relative;
      .cardIndex1 {
        width: 0.51rem;
        height: 0.51rem;
        position: absolute;
        left: 0.12rem;
        top: 0.12rem;
      }
      .cardIndex2 {
        width: 0.51rem;
        height: 0.51rem;
        position: absolute;
        right: 0.12rem;
        bottom: 0.12rem;
        transform: rotate(180deg);
      }
      .imgBox {
        position: absolute;
        left: 0.71rem;
        top: 1.3rem;
        .giftImg {
          width: 1.6rem;
          height: 1.6rem;
        }
        .double {
          display: block;
          width: 0.75rem;
          height: 0.41rem;
          background: url(../assets/img/dou.png);
          background-size: 100% 100%;
          position: absolute;
          right: 0.1rem;
          bottom: 0.1rem;
        }
      }
      .giftName {
        width: 2rem;
        font-weight: 700;
        font-size: 0.24rem;
        color: #ffebb6;
        position: absolute;
        top: 3.1rem;
        left: 0.55rem;
        text-align: center;
      }
    }
    &.open {
      .inner {
        transform: rotateY(180deg);
      }
    }
    &.turn {
      .inner {
        transform: rotateY(180deg);
        transition: transform 0.5s;
        -webkit-transition: transform 0.5s;
      }
    }
    img {
      width: 3rem;
      height: 4.2rem;
    }
    &.card1 {
      transform: scale(0.7);
      left: -0.45rem;
      z-index: 2;
    }
    &.card2 {
      transform: scale(0.826);
      left: 0.6rem;
      z-index: 4;
    }
    &.card3 {
      left: 2.05rem;
      z-index: 5;
    }
    &.card4 {
      transform: scale(0.826);
      left: 3.49rem;
      z-index: 4;
      &.zi {
        z-index: 6;
      }
    }
    &.card5 {
      transform: scale(0.7);
      left: 4.5rem;
      z-index: 2;
    }
  }
  .btn {
    width: 2.43rem;
    height: 0.8rem;
    position: absolute;
    top: 5.11rem;
    left: 2.34rem;
    text-align: center;
    line-height: 0.8rem;
    font-weight: 800;
    color: #fff;
    .noClick {
      white-space: nowrap;
      font-weight: 700;
      color: #fff;
      margin-right: -0.25rem;
    }
    .open {
      display: block;
      width: 100%;
      height: 100%;
      background: url(../assets/img/openBtn.png);
      background-size: 100% 100%;
    }
  }
  .giftPup {
    width: 5.45rem;
    height: 7.94rem;
    background: url(../assets/img/giftPup.png);
    background-size: 100% 100%;
    position: absolute;
    left: 1.09rem;
    top: 2rem;
    .con {
      width: 5rem;
      height: 5rem;
      position: absolute;
      top: 2.35rem;
      left: 0.2rem;
      .title {
        text-align: center;
      }
      .giftPupImg {
        width: 3rem;
        height: 4.2rem;
        background: url(../assets/img/openCarBg.png);
        background-size: 100% 100%;
        margin: 0.14rem auto;
        position: relative;
        .cardIndex1 {
          width: 0.51rem;
          height: 0.51rem;
          position: absolute;
          left: 0.12rem;
          top: 0.12rem;
        }
        .cardIndex2 {
          width: 0.51rem;
          height: 0.51rem;
          position: absolute;
          right: 0.12rem;
          bottom: 0.12rem;
          transform: rotate(180deg);
        }
        .imgBox {
          position: absolute;
          left: 0.71rem;
          top: 1.3rem;
          .giftImg {
            width: 1.6rem;
            height: 1.6rem;
          }
          .double {
            display: block;
            width: 0.75rem;
            height: 0.41rem;
            background: url(../assets/img/dou.png);
            background-size: 100% 100%;
            position: absolute;
            right: 0.1rem;
            bottom: 0.1rem;
          }
        }
        .giftName {
          width: 2rem;
          font-weight: 700;
          font-size: 0.24rem;
          color: #ffebb6;
          position: absolute;
          top: 3.1rem;
          left: 0.55rem;
          text-align: center;
        }
        .giftTips {
          width: 4rem;
          font-size: 0.24rem;
          line-height: 0.25rem;
          color: #fcf16a;
          text-align: center;
          font-weight: 600;
          position: absolute;
          bottom: -0.5rem;
          left: -0.5rem;
        }
      }
      .closeGiftPup {
        display: block;
        width: 2.43rem;
        height: 0.8rem;
        background: url(../assets/img/openBtn.png);
        background-size: 100% 100%;
        position: absolute;
        bottom: -1.5rem;
        left: 1.42rem;
        font-weight: 800;
        line-height: 0.75rem;
        text-align: center;
      }
    }
  }
}
</style>
