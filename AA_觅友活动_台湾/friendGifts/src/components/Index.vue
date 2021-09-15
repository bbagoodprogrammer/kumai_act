<template>
  <div class="page pageIndex">
    <div class="herder">
      <div class="ruleTips" @click="showRule = true">{{lang.ruleTips}}</div>
      <RoolMsg />
      <div class="chareTips">
        {{lang.chareTips.replace('%c',coinsStr)}}
      </div>
    </div>
    <div class="backItem" v-for="(item,index) in gift_packs" :key="index">
      <div class="title">{{item.name}}</div>
      <div class="chagre" v-html="lang.chareTips2.replace('%c',item.charge)"> </div>
      <div class="giftList">
        <div class="giftItem" v-for="(item2,index2) in item.prizes" :key="index2">
          <div class="imgBox">
            <img :src="giftImg[item2.type]" alt="">
            <div class="nums">x{{item2.type!="vip"?item2.num:`${item2.days}${lang.day}`}}</div>
          </div>
          <strong>{{item2.name}}</strong>
        </div>
      </div>
    </div>
    <div class="footer">
      <div class="btn" :class="{black:owner.get}" @click="walletpage()">{{this.owner.get?lang.getEd:lang.charge}}</div>
      <div class="chareTips" v-html="lang.chareTips3"></div>
    </div>
    <div class="mask" v-show="showRule">
      <transition name="slide">
        <div class="rule" v-if="showRule">
          <i class="close" @click="showRule = false"></i>
          <div class="title">{{lang.ruleTips}}</div>
          <div class="tm">{{lang.tm}}{{aTimer}}</div>
          <h6>{{lang.ruleTipsMsg1}}</h6>
          <p>{{lang.ruleTipsMsg2}}</p>
          <h6>{{lang.ruleTipsMsg3}}</h6>
          <p v-html="lang.ruleTipsMsg4">
          </p>
          <div class="lastTips">{{lang.ruleTipsMsg5}}</div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>

import { mapState } from "vuex"
import RoolMsg from "./RoolMsg"
import getDate from "../utils/getDate"
export default {
  data () {
    return {
      showRule: false
    }
  },
  components: { RoolMsg },
  computed: {
    ...mapState(['gift_packs', 'owner', 'activity']),
    giftImg () {
      return _images
    },
    coinsStr () {
      let arr = []
      for (let i = 0; i < this.gift_packs.length; i++) {
        arr.push(this.gift_packs[i].charge)
      }
      return arr.join('/')
    },
    aTimer () {
      if (AREA == 'tw') {
        return getDate(new Date(this.activity.stime * 1000), 1) + '-' + getDate(new Date(this.activity.etime * 1000), 1)
      } else if (AREA == 'vn') {
        return getDate(new Date(this.activity.stime * 1000), 2) + '-' + getDate(new Date(this.activity.etime * 1000), 2)
      }

    },
  },
  methods: {
    walletpage () {
      if (this.owner.get) {
        return
      }
      const ios = navigator.userAgent.match(/iPhone|iPod|ios|iPad/i);
      try {
        if (ios) {
          // goWalletpage()
          sendJsData('app://walletpage');
        } else {
          javascript: JSInterface.sendJsData('app://walletpage');
        }
      } catch (e) { }
    }
  }
}
</script>

<style lang="scss">
.pageIndex {
  padding-bottom: 1.5rem;
  .herder {
    height: 4.84rem;
    position: relative;
    .ruleTips {
      width: 1.41rem;
      height: 0.5rem;
      background: url(../img/ruleTips.png);
      background-size: 100% 100%;
      text-align: center;
      line-height: 0.5rem;
      position: absolute;
      top: 4.54rem;
      right: 0;
      text-align: center;
      line-height: 0.5rem;
      font-size: 0.24rem;
      color: #07618E;
      text-indent: 0.2rem;
    }
    .chareTips {
      width: 6.45rem;
      height: 0.56rem;
      background: url(../img/chargeTips.png);
      background-size: 100% 100%;
      font-size: 0.24rem;
      text-align: center;
      line-height: 0.56rem;
      position: absolute;
      top: 3.57rem;
      left: 0.53rem;
    }
  }
  .backItem {
    width: 7.5rem;
    height: 5.2rem;
    padding-top: 0.29rem;
    background: url(../img/backItem.png);
    background-size: 100% 100%;
    margin-bottom: 0.36rem;
    .title {
      text-align: center;
      font-size: 0.34rem;
      font-weight: bold;
      text-shadow: #DA0B23 1px 0 0, #DA0B23 0 1px 0, #DA0B23 -1px 0 0,
        #DA0B23 0 -1px 0;
      margin-top: 0.05rem;
    }
    .chagre {
      width: 5.98rem;
      height: 0.53rem;
      background: url(../img/charge.png);
      background-size: 100% 100%;
      text-align: center;
      line-height: 0.53rem;
      margin: 1.2rem auto 0;
      text-shadow: #A68FF5 1px 0 0, #A68FF5 0 1px 0, #A68FF5 -1px 0 0,
        #A68FF5 0 -1px 0;
      em {
        color: #FFEA01;
        margin: 0 0.1rem;
      }
    }
    .giftList {
      padding: 0 0.68rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-top: 0.18rem;
      .giftItem {
        .imgBox {
          width: 1.82rem;
          height: 1.82rem;
          background: url(../img/giftItem.png);
          background-size: 100% 100%;
          margin: 0 auto;
          position: relative;
        }
        .nums {
          font-size: 0.4rem;
          font-weight: bold;
          text-shadow: #FF4E91 1px 0 0, #FF4E91 0 1px 0, #FF4E91 -1px 0 0,
            #FF4E91 0 -1px 0;
          position: absolute;
          bottom: 0.05rem;
          right: 0.05rem;
        }
        strong {
          display: block;
          text-align: center;
          font-size: 0.28rem;
          color: #6D0949;
          margin-top: 0.14rem;
        }
      }
    }
  }
  .footer {
    width: 7.5rem;
    height: 1.34rem;
    background: url(../img/footer.png);
    background-size: 100% 100%;
    position: fixed;
    bottom: 0;
    left: 0;
    .btn {
      width: 3.48rem;
      height: 1rem;
      background: url(../img/chargeBtn.png);
      background-size: 100% 100%;
      margin: -0.25rem auto 0;
      text-align: center;
      line-height: 1rem;
      font-weight: bold;
      text-shadow: #DC3F6A 1px 0 0, #DC3F6A 0 1px 0, #DC3F6A -1px 0 0,
        #DC3F6A 0 -1px 0;
      &.black {
        background: url(../img/black.png);
        background-size: 100% 100%;
        text-shadow: #6c6c6c 1px 0 0, #6c6c6c 0 1px 0, #6c6c6c -1px 0 0,
          #6c6c6c 0 -1px 0;
      }
    }
    .chareTips {
      text-align: center;
      font-size: 0.26rem;
      text-shadow: #23A7EC 1px 0 0, #23A7EC 0 1px 0, #23A7EC -1px 0 0,
        #23A7EC 0 -1px 0;
      em {
        text-shadow: #FFD536 1px 0 0, #FFD536 0 1px 0, #FFD536 -1px 0 0,
          #FFD536 0 -1px 0;
      }
    }
  }
  .rule {
    width: 6.22rem;
    height: 9.74rem;
    background: url(../img/ruleBg.png);
    background-size: 100% 100%;
    padding-top: 0.28rem;
    padding: 0 0.64rem;
    position: relative;
    .close {
      width: 0.58rem;
      height: 0.58rem;
      position: absolute;
      top: 0.21rem;
      right: 0.53rem;
      background: url(../img/close.png);
      background-size: 100% 100%;
    }
    .title {
      text-align: center;
      height: 0.9rem;
      line-height: 1rem;
      font-size: 0.34rem;
      font-weight: bold;
      text-shadow: #DA0B23 1px 0 0, #DA0B23 0 1px 0, #DA0B23 -1px 0 0,
        #DA0B23 0 -1px 0;
      margin-top: 0.05rem;
    }
    .tm {
      text-align: center;
      margin-top: 1.51rem;
      font-size: 0.28rem;
      color: #5B1901;
    }
    h6 {
      font-size: 0.28rem;
      color: #5B1901;
      margin-top: 0.25rem;
    }
    p {
      font-size: 0.26rem;
      color: #B6390E;
    }
    .lastTips {
      width: 100%;
      position: absolute;
      left: 0;
      bottom: 0.2rem;
      text-align: center;
      font-size: 0.24rem;
      color: #B6390E;
    }
  }
  img {
    display: block;
    width: 100%;
  }
}
</style>