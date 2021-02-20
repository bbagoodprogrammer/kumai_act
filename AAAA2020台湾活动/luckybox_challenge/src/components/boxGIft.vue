<template>
  <div class="dayGift">
    <i class="showGfitPup" @click="giftPup = true"></i>
    <div class="gift">
      <div class="boxItem" v-for="(item,index) in gift" :key="index">
        <div class="boxImg" :class="'box'+ item.gid"></div>
        <strong>{{boxArr[item.gid - 1]}}</strong>
        <div class="status" :class="{get:item.able,geted:item.receive}">
          <em v-if="item.receive">{{lang.geted}}</em>
          <em v-else-if="item.able" @click="getGift(item.gid)">{{lang.get}}</em>
          <em v-else>0/1</em>
        </div>
      </div>
    </div>
    <p class="giftTips" v-html="lang.getTips"></p>
    <div class="mask" v-show="giftPup">
      <transition name="slide">
        <div class="giftShow" v-if="giftPup">
          <i class="close" @click="giftPup = false"></i>
          <h5>{{lang.giftTitle}}</h5>
          <div class="giftList">
            <div class="giftItem" v-for="(item,index) in giftList" :key="index">
              <div class="imgBg">
                <img :src="item.imgIcon" alt="">
              </div>
              <strong>{{item.name}}</strong>
            </div>
          </div>
          <div class="tipsBox">
            <p>{{lang.giftTips1}}</p>
            <p>{{lang.giftTips2}}</p>
          </div>
        </div>
      </transition>
    </div>
    <div class="mask" v-show="getGiftPup">
      <transition name="slide">
        <div class="getGiftPup" v-show="getGiftPup">
          <i class="close" @click="getGiftPup = false"> </i>
          <div class="giftItem">
            <div class="imgBg">
              <img :src="getGiftData.img" alt="">
            </div>
            <strong>{{getGiftData.name}}</strong>
          </div>
          <div class="tips">
            {{lang.giftTipsSuc.replace('$',getGiftData.name)}}
          </div>
          <div class="ok" @click="getGiftPup = false">{{lang.ok}}</div>
        </div>
      </transition>
    </div>
  </div>
</template>
<script>

import { mapState } from "vuex"
import { getGift } from "../apis"

export default {
  data() {
    return {
      giftPup: false,
      getGiftPup: false,
      getGiftData: {}
    }
  },
  computed: {
    ...mapState(['gift']),
    boxArr() {
      return this.lang.boxArr
    },
    giftList() {
      return this.lang.giftList
    }
  },
  methods: {
    getGift(gid) {
      getGift(gid).then(res => {
        if (res.data.response_status.code == 0) {
          this.getGiftData = res.data.response_data.data
          this.getGiftPup = true
          this.$store.commit('setGiftStatus', gid - 1)
        } else {
          this.toast(res.data.response_status.error)
        }
      })
    }
  }
}
</script>
<style lang="scss">
.dayGift {
  width: 7.42rem;
  height: 4.5rem;
  margin: 0.3rem auto;
  padding-top: 1.3rem;
  position: relative;
  .showGfitPup {
    display: block;
    width: 0.32rem;
    height: 0.32rem;
    position: absolute;
    right: 2.3rem;
    top: 0.4rem;
    z-index: 3;
    background: url(../img/quest.png);
    background-size: 100% 100%;
  }
  .gift {
    padding: 0 0.8rem;
    display: flex;
    justify-content: space-between;
    .boxItem {
      width: 1.6rem;
      .boxImg {
        width: 1.6rem;
        height: 1.6rem;
        &.box1 {
          background: url(../img/bx1.png);
          background-size: 100% 100%;
        }
        &.box2 {
          background: url(../img/bx2.png);
          background-size: 100% 100%;
        }
        &.box3 {
          background: url(../img/bx3.png);
          background-size: 100% 100%;
        }
      }
      strong {
        height: 0.6rem;
        display: block;
        text-align: center;
        font-size: 0.24rem;
        color: rgba(255, 255, 255, 1);
      }
      .status {
        display: block;
        width: 1.48rem;
        height: 0.52rem;
        background: url(../img/getNo.png);
        background-size: 100% 100%;
        text-align: center;
        margin: 0.2rem auto 0.1rem;
        em {
          display: block;
          height: 100%;
          font-size: 0.24rem;
          line-height: 0.52rem;
        }
        &.get {
          background: url(../img/get.png);
          background-size: 100% 100%;
        }
        &.geted {
          background: url(../img/geted.png);
          background-size: 100% 100%;
        }
      }
    }
  }
  .giftTips {
    font-size: 0.23rem;
    padding: 0 0.4rem 0 0.53rem;
    margin-top: 0.15rem;
  }
  .giftShow {
    width: 6.52rem;
    height: 4.72rem;
    padding: 3rem 0.3rem 0;
    position: relative;

    h5 {
      font-size: 0.32rem;
      color: rgba(255, 248, 165, 1);
    }
    .giftList {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-top: 0.22rem;
      .giftItem {
        width: 1.4rem;
      }
      .imgBg {
        background: rgba(56, 38, 134, 0.3);
        border-radius: 0.1rem;
        img {
          width: 1.4rem;
          height: 1.4rem;
        }
      }
      strong {
        height: 0.6rem;
        display: block;
        text-align: center;
        font-size: 0.26rem;
        margin-top: 0.11rem;
      }
    }
    .tipsBox {
      margin-top: 0.58rem;
      p {
        font-size: 0.26rem;
      }
    }
  }
  .getGiftPup {
    width: 6.52rem;
    height: 5.42rem;
    padding: 3.2rem 0.3rem 0;
    position: relative;
    .giftItem {
      .imgBg {
        background: rgba(56, 38, 134, 0.3);
        border-radius: 0.1rem;
        width: 1.4rem;
        margin: 0 auto;
        img {
          width: 1.4rem;
          height: 1.4rem;
        }
      }
      strong {
        display: block;
        text-align: center;
        font-size: 0.26rem;
        margin-top: 0.11rem;
        white-space: nowrap;
        font-size: 0.32rem;
      }
    }
    .tips {
      color: rgba(255, 255, 255, 1);
      font-size: 0.26rem;
      margin-top: 0.8rem;
      padding: 0 1rem;
    }
    .ok {
      width: 2.98rem;
      height: 0.91rem;
      background: url(../img/ok.png);
      background-size: 100% 100%;
      margin: 0.25rem auto 0;
      text-align: center;
      line-height: 0.91rem;
    }
  }
  .close {
    display: block;
    width: 0.56rem;
    height: 0.56rem;
    background: url(../img/close.png);
    background-size: 100% 100%;
    position: absolute;
    right: 0rem;
    top: 2rem;
  }
}
</style>
