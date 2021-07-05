<template>
  <div class="land">
    <div class="magic_land">
      <div class="land_bg">
        <div class="synthesis_gift">
          <div class="imgBox">
            <img :src="nowGift.image" alt="">
          </div>
          <strong>
            <em class="gift_name">{{nowGift.name}}</em>
            <em class="gift_tips" v-html="lang.MagicLand_addScore.replace('%n',nowGift.desc).replace('%s',nowGift.score)"></em>
          </strong>
        </div>
        <div class="science" v-for="(item,index) in nowGift.gifts" :key="index" :class="'science' + index">
          <div class="imgBox">
            <img :src="synthesis.gifts[item.gid].image" alt="">
            <div class="nums">x{{item.num}}</div>
          </div>
          <strong>{{lang.surplus}} <em>{{synthesis.gifts[item.gid].num}}</em></strong>
        </div>
      </div>
      <div class="con">

      </div>
    </div>
    <div class="scienceList">
      <div class="scienceItem" v-for="(item,index) in synthesis.prizes" :key="index">
        <i class="linght" v-if="actIndex == index"></i>
        <i class="gift_mask" v-if=" actIndex != index" @click="actIndex = index"></i>
        <div class="imgBox">
          <img :src="item.image" alt="">
        </div>
        <strong>{{item.name}}</strong>
      </div>
    </div>
    <div class="synthesis" @click="synthesisGift()">
      {{lang.synthesis}}
    </div>

    <div class="mask" v-show="showGetGiftPup">
      <transition name="slide">
        <div class="synthesisGift" v-if="showGetGiftPup">
          <i class="close" @click="showGetGiftPup =false"></i>
          <div class="imgBox">
            <img :src="nowGift.image" alt="">
          </div>
          <strong class="giftName">{{nowGift.name}}</strong>
          <div class="giftNums">
            <span class="redux" @click="giftNums <= 1?1:--giftNums"></span>
            <div class="numInput">
              <input type="number" :max="nowGift.num" v-model="giftNums" disabled>
            </div>
            <span class="add" @click="giftNums == nowGift.num?nowGift.num:++giftNums"></span>
            <u class="max" @click="giftNums = nowGift.num">{{lang.max}}</u>
          </div>
          <div class="get" @click="getGift()">{{lang.synthesis}}</div>
          <div class="getTips">{{lang.synthesisTips}}</div>
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
        this.showGetGiftPup = false
        if (res.data.response_status.code == 0) {
          this.toast(this.lang.synthesisSucTips.replace('%n', this.nowGift.name).replace('%s', this.giftNums))
          setTimeout(() => {
            this.$store.dispatch('getInitInfo');
          }, 1000)
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
  margin: 1.1rem auto 0;
  .magic_land {
    height: 7.38rem;
    .land_bg {
      width: 7.38rem;
      height: 7.38rem;
      background: url(../img/land.png);
      background-size: 100% 100%;
      position: absolute;
      left: 0.06rem;
      z-index: 2;
      .synthesis_gift {
        width: 1.88rem;
        position: absolute;
        top: 2.3rem;
        left: 2.69rem;
        .imgBox {
          width: 1.88rem;
          height: 1.88rem;
          background: url(../img/synthesis_bg.png);
          background-size: 100% 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          img {
            width: 1.1rem;
            height: 1.1rem;
          }
        }
        strong {
          display: block;
          width: 3.28rem;
          height: 1.15rem;
          margin-left: -0.55rem;
          background: url(../img/synthesis_name.png);
          background-size: 100% 100%;
          text-align: center;
          font-size: 0.24rem;
          color: rgba(108, 113, 255, 1);
          margin-top: -0.2rem;
          em {
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
          img {
            width: 100%;
            height: 100%;
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
        }
        strong {
          display: block;
          width: 2.49rem;
          height: 0.46rem;
          line-height: 0.46rem;
          margin-left: -0.55rem;
          background: url(../img/science_nameBg.png);
          background-size: 100% 100%;
          text-align: center;
          font-size: 0.24rem;
          color: rgba(108, 113, 255, 1);
          em {
            font-size: 0.24rem;
            color: rgba(254, 196, 27, 1);
          }
        }
        &.science0 {
          top: 0.15rem;
          left: 2.91rem;
        }
        &.science1 {
          left: 0.74rem;
          bottom: 1.1rem;
        }
        &.science2 {
          right: 0.74rem;
          bottom: 1.1rem;
        }
      }
    }
    .con {
      width: 7.08rem;
      height: 6.83rem;
      background: url(../img/land_con.png);
      background-size: 100% 100%;
      left: 0.21rem;
      top: 0.2rem;
      position: absolute;
    }
  }
  .scienceList {
    padding: 0 0.35rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .scienceItem {
      position: relative;
      .linght {
        display: block;
        width: 2.19rem;
        height: 2.05rem;
        background: url(../img/scienceItem_act.png);
        background-size: 100% 100%;
        position: absolute;
        left: -0.3rem;
        top: -0.23rem;
      }
      .gift_mask {
        display: block;
        width: 1.57rem;
        height: 1.57rem;
        background: url(../img/gift_mask.png);
        background-size: 100% 100%;
        position: absolute;
        z-index: 3;
      }
      .imgBox {
        width: 1.57rem;
        height: 1.57rem;
        background: url(../img/scienceItem.png);
        background-size: 100% 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        img {
          width: 1.1rem;
          height: 1.1rem;
        }
      }
      strong {
        color: #FEC41B;
        display: block;
        text-align: center;
        font-size: 0.28rem;
      }
    }
  }
  .synthesis {
    width: 3.03rem;
    height: 0.95rem;
    background: url(../img/synthesis.png);
    background-size: 100% 100%;
    text-align: center;
    line-height: 0.95rem;
    margin: 0.23rem auto 0;
    font-size: 0.39rem;
  }
  .synthesisGift {
    width: 5.53rem;
    height: 6.25rem;
    background: url(../img/getGift.png);
    background-size: 100% 100%;
    position: relative;
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
    .imgBox {
      width: 2.28rem;
      height: 2.28rem;
      background: url(../img/gift_pup_bg.png);
      background-size: 100% 100%;
      margin: 0.84rem auto 0;
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
    .giftNums {
      display: flex;
      align-items: center;
      justify-content: center;
      .redux {
        width: 0.6rem;
        height: 0.6rem;
        background: url(../img/redux.png);
        background-size: 100% 100%;
      }
      .numInput {
        width: 2.06rem;
        height: 0.51rem;
        background: url(../img/numsInput.png);
        background-size: 100% 100%;
        input {
          width: 100%;
          height: 0.51rem;
          color: #330D0E;
          border: none;
          outline: none;
          background: none;
          text-align: center;
        }
      }
      .add {
        width: 0.6rem;
        height: 0.6rem;
        background: url(../img/add.png);
        background-size: 100% 100%;
      }
      .max {
        font-size: 0.26rem;
        color: #96451D;
        margin-left: 0.1rem;
      }
    }
    .get {
      width: 2.56rem;
      height: 0.69rem;
      background: url(../img/get.png);
      background-size: 100% 100%;
      text-align: center;
      line-height: 0.69rem;
      margin: 0.45rem auto 0;
    }
    .getTips {
      font-size: 0.26rem;
      color: #96451D;
      text-align: center;
      margin-top: 0.2rem;
    }
  }
}
.land::before {
  content: '';
  width: 7.5rem;
  height: 2.72rem;
  background: url(../img/lamp_bg.png);
  background-size: 100% 100%;
  position: absolute;
  top: -1.2rem;
}
</style>