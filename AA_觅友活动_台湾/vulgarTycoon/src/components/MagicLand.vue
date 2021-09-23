<template>
  <div class="land">
    <div class="landBg"></div>
    <div class="magic_land">
      <div class="land_bg">
        <div class="synthesis_gift">
          <div class="imgBox">
            <img :src="nowGift.image" alt="">
          </div>
        </div>
        <div class="science" v-for="(item,index) in nowGift.gifts" :key="index" :class="'science' + item.id">
          <div class="imgBox">
            <span class="linght" v-if="synthesis.gifts[item.id].num >= item.num"></span>
            <img :src="synthesis.gifts[item.id].image" alt="">
            <!-- <div class="nums">x{{item.num}}</div> -->
          </div>
          <div class="giftName">{{synthesis.gifts[item.id].name}}</div>
          <strong>{{synthesis.gifts[item.id].num}}/{{item.num}}</strong>
        </div>
      </div>
      <div class="con">

      </div>
    </div>
    <div class="scienceList">
      <div class="scienceItem" v-for="(item,index) in synthesis.prizes" :key="index" :class="{act:actIndex == index}">
        <div class="imgBox">
          <div class="giftMask" v-if="actIndex != index" @click="actIndex = index"></div>
          <img :src="item.image" alt="">
        </div>
        <strong>{{item.name}}</strong>
      </div>
    </div>
    <div class="synthesis" @click="synthesisGift()" :class="{black:nowGift.num <= 0}">
      {{lang.synthesis}}
    </div>

    <div class="mask" v-show="showGetGiftPup">
      <transition name="slide">
        <div class="synthesisGift" v-if="showGetGiftPup">
          <i class="close" @click="showGetGiftPup =false"></i>
          <div class="title">{{lang.synthesis}}</div>
          <div class="imgBox">
            <img :src="nowGift.image" alt="">
          </div>
          <strong class="giftName">{{nowGift.name}}</strong>
          <div class="qureyMsg">{{lang.qureyMsg.replace('%n',nowGift.name)}}</div>
          <!-- <div class="giftNums">
            <span class="redux" @click="giftNums <= 1?1:--giftNums"></span>
            <div class="numInput">
              <input type="number" :max="nowGift.num" v-model="giftNums" disabled>
            </div>
            <span class="add" @click="giftNums == nowGift.num?nowGift.num:++giftNums"></span>
            <u class="max" @click="giftNums = nowGift.num">{{lang.max}}</u>
          </div> -->
          <div class="get">
            <u class="no" @click="showGetGiftPup =false">{{lang.cancel}}</u>
            <div class="ok" @click="getGift()">{{lang.synthesis}}</div>
          </div>
          <!-- <div class="getTips">{{lang.synthesisTips}}</div> -->
        </div>
      </transition>
    </div>
  </div>
</template>

<script>

import { mapState } from "vuex"
import { synthesis } from "../apis"

export default {
  data () {
    return {
      actIndex: 0,
      giftNums: 1,
      showGetGiftPup: false
    }
  },
  computed: {
    ...mapState(['synthesis']),
    nowGift () {
      return this.synthesis.prizes ? this.synthesis.prizes[this.actIndex] : {}
    }
  },
  methods: {
    synthesisGift () {
      if (this.nowGift.num) {
        this.showGetGiftPup = true
      }
    },
    getGift () {
      synthesis(this.nowGift.id, this.giftNums).then(res => {
        if (res.data.response_status.code == 0) {
          this.showGetGiftPup = false
          this.toast(this.lang.synthesisSucTips.replace('%n', this.nowGift.name).replace('%s', this.giftNums))
          this.$store.dispatch('getInitInfo');

        } else {
          this.toast(res.data.response_status.error)
        }
      })
    }
  }
}
</script>

<style lang="scss">
.land {
  position: relative;
  margin: 1.4rem auto 0;
  padding-bottom: 0.2rem;
  .landBg {
    width: 7.37rem;
    height: 11.12rem;
    background: url(../img/landBg.png);
    background-size: 100% 100%;
    position: absolute;
  }
  .magic_land {
    height: 7.38rem;
    .land_bg {
      width: 7.38rem;
      height: 7.38rem;
      background: url(../img/land.png);
      background-size: 100% 100%;
      position: absolute;
      left: 0.06rem;
      .synthesis_gift {
        width: 1.9rem;
        position: absolute;
        top: 2.9rem;
        left: 2.72rem;
        .imgBox {
          width: 1.9rem;
          height: 1.9rem;
          display: flex;
          align-items: center;
          justify-content: center;
          img {
            width: 1.9rem;
            height: 1.9rem;
          }
        }
        strong {
          display: block;
          width: 3.28rem;
          height: 1.15rem;
          margin-left: -0.55rem;
          text-align: center;
          font-size: 0.24rem;
          color: rgba(108, 113, 255, 1);
          margin-top: -0.2rem;
          > em {
            display: block;
            font-size: 0.24rem;
            color: rgba(254, 196, 27, 1);
            &.gift_name {
              font-size: 0.28rem;
              height: 0.4rem;
              line-height: 0.4rem;
            }
            &.gift_tips {
              color: #6C71FF;
              em {
                font-size: 0.28rem;
                color: rgba(254, 196, 27, 1);
              }
            }
          }
        }
      }
      .science {
        width: 1.41rem;
        position: absolute;
        .imgBox {
          width: 1.41rem;
          height: 1.41rem;
          background: url(../img/science_imgBg.png);
          background-size: 100% 100%;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          img {
            width: 80%;
            height: 80%;
          }
          .nums {
            font-size: 0.28rem;
            text-shadow: #962146 1px 0 0, #962146 0 1px 0, #962146 -1px 0 0,
              #962146 0 -1px 0;
            color: rgba(255, 222, 122, 1);
            position: absolute;
            right: 0;
            bottom: 0.05rem;
          }
          .linght {
            position: absolute;
            top: -0.72rem;
            left: -0.85rem;
            width: 3.17rem;
            height: 3.01rem;
            background: url(../img/linght.png);
            background-size: 100% 100%;
          }
        }
        .giftName {
          width: 100%;
          text-align: center;
          white-space: nowrap;
          font-size: 0.28rem;
          position: absolute;
          bottom: 0.45rem;
          text-shadow: #92670A 1px 0 0, #92670A 0 1px 0, #92670A -1px 0 0,
            #92670A 0 -1px 0;
        }
        strong {
          display: block;
          width: 2.49rem;
          height: 0.46rem;
          line-height: 0.46rem;
          margin-left: -0.55rem;
          text-align: center;
          font-size: 0.24rem;
        }
        &.science1,
        &.science7 {
          top: 0.15rem;
          left: 2.91rem;
        }
        &.science2 {
          top: 1.55rem;
          right: 0.76rem;
        }
        &.science6 {
          top: 1.55rem;
          left: 0.76rem;
        }
        &.science4 {
          top: 5.5rem;
          left: 2.91rem;
        }
        &.science5,
        &.science9 {
          left: 0.74rem;
          bottom: 1.1rem;
        }
        &.science3,
        &.science8 {
          right: 0.74rem;
          bottom: 1.1rem;
        }
      }
    }
    .con {
      width: 7.08rem;
      height: 6.83rem;
      left: 0.21rem;
      top: 0.2rem;
      position: absolute;
    }
  }
  .scienceList {
    margin-top: 0.4rem;
    padding: 0 1.83rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .scienceItem {
      width: 1.64rem;
      position: relative;
      .imgBox {
        width: 1.64rem;
        height: 1.78rem;
        margin: 0 auto;
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        .giftMask {
          width: 100%;
          height: 100%;
          position: absolute;
          background: url(../img/giftTab.png);
          background-size: 100% 100%;
        }

        img {
          width: 1.1rem;
          height: 1.1rem;
        }
      }
      &.act {
        .imgBox {
          background: url(../img/giftTab_act.png);
          background-size: 100% 100%;
        }
        strong {
          color: #fff;
        }
      }
      strong {
        color: #A35642;
        width: 1.84rem;
        margin-left: -0.1rem;
        display: block;
        text-align: center;
        font-size: 0.26rem;
      }
    }
  }
  .synthesis {
    width: 3.41rem;
    height: 0.72rem;
    background: url(../img/synthesis.png);
    background-size: 100% 100%;
    text-align: center;
    line-height: 0.72rem;
    margin: 0.23rem auto 0;
    font-size: 0.39rem;
    position: relative;
    &.black {
      background: url(../img/notAct.png);
      background-size: 100% 100%;
    }
  }
  .synthesisGift {
    width: 6.47rem;
    height: 5.8rem;
    background: url(../img/getGift.png);
    background-size: 100% 100%;
    position: relative;
    .close {
      display: block;
      width: 0.7rem;
      height: 0.7rem;
      background: url(../img/close.png);
      background-size: 100% 100%;
      position: absolute;
      right: 0rem;
      top: -0.8rem;
    }
    .title {
      padding-top: 0.4rem;
      height: 0.8rem;
      text-align: center;
      line-height: 0.75rem;
      font-size: 0.4rem;
      color: #FFE7B8;
    }
    .imgBox {
      width: 2.53rem;
      height: 2.33rem;
      background: url(../img/getGiftBg.png);
      background-size: 100% 100%;
      margin: 0 auto;
      display: flex;
      align-items: center;
      justify-content: center;
      img {
        width: 1.6rem;
        height: 1.6rem;
      }
    }
    .giftName {
      display: block;
      text-align: center;
      text-align: center;
      color: #96451D;
      font-size: 0.28rem;
    }
    // .giftNums {
    //   display: flex;
    //   align-items: center;
    //   justify-content: center;
    //   .redux {
    //     width: 0.6rem;
    //     height: 0.6rem;
    //     // background: url(../img/redux.png);
    //     // background-size: 100% 100%;
    //   }
    //   .numInput {
    //     width: 2.06rem;
    //     height: 0.51rem;
    //     // background: url(../img/numsInput.png);
    //     // background-size: 100% 100%;
    //     input {
    //       width: 100%;
    //       height: 0.51rem;
    //       color: #330D0E;
    //       border: none;
    //       outline: none;
    //       background: none;
    //       text-align: center;
    //     }
    //   }
    //   .add {
    //     width: 0.6rem;
    //     height: 0.6rem;
    //     // background: url(../img/add.png);
    //     // background-size: 100% 100%;
    //   }
    //   .max {
    //     font-size: 0.26rem;
    //     color: #96451D;
    //     margin-left: 0.1rem;
    //   }
    // }
    .qureyMsg {
      color: #FFE7B8;
      text-align: center;
      margin-top: 0.1rem;
    }
    .get {
      padding: 0 0.78rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-top: 0.4rem;
      .ok {
        width: 2.34rem;
        height: 0.56rem;
        text-align: center;
        line-height: 0.56rem;
        background: url(../img/ok.png);
        background-size: 100% 100%;
        color: #92260A;
      }
      .no {
        width: 2.34rem;
        text-align: center;
      }
    }
    // .getTips {
    //   font-size: 0.26rem;
    //   color: #96451D;
    //   text-align: center;
    //   margin-top: 0.2rem;
    // }
  }
}
</style>