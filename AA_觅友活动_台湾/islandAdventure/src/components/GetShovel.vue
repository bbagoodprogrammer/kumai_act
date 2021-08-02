<template>
  <div class="getShovel">
    <i class="close" @click="closePup()"></i>
    <div class="title">{{lang.get}}</div>
    <div class="userNums" v-if="setType == 1">
      <span>{{lang.dayGetNums}}:{{owner.today_iron_exchange}}/{{activity.shovels.iron.daily_max}}</span>
      <span>{{lang.userGifts}}:{{owner.props}}</span>
    </div>
    <div class="userNums2" v-else>
      <img src="../img/coins.png" alt="">
      <em>{{owner.coins}}</em>
      <span class="add" @click="walletpage"></span>
    </div>
    <div class="shovel">
      <div class="shovel1">
        <span class="shoveImg" :class="{act:setType== 1}" @click="tabClick (1)"></span>
        <strong>{{lang.shovel1}}</strong>
      </div>
      <div class="shovel2">
        <span class="shoveImg" :class="{act:setType== 2}" @click="tabClick (2)"></span>
        <strong>{{lang.shovel2}}</strong>
      </div>
    </div>
    <div class="shovelNums">
      <span class="redux" @click="nums>0?nums--:0"></span>
      <input type="text" disabled v-model="nums" class="getNums">
      <span class="add" @click="nums<maxGetNums?nums++:maxGetNums"></span>
      <u class="max" @click="nums = maxGetNums">{{lang.max}}</u>
    </div>
    <div class="get" :class="{black:nums == 0}" @click="getShovel()">{{lang.get}}</div>
    <p class="getTips">{{setType == 1?lang.getTip1:lang.getTip2}} </p>
  </div>
</template>

<script>

import { mapState } from "vuex"
import { getShovel } from "../apis"

export default {
  computed: {
    ...mapState(['owner', 'activity']),
    maxGetNums () {
      return this.setType == 1 ? this.owner.iron_exchange_max : this.owner.gold_exchange_max
    }
  },
  data () {
    return {
      setType: 1,
      nums: 0
    }
  },
  methods: {
    tabClick (val) {
      this.setType = val
      this.nums = 0
    },
    getShovel () {
      if (this.nums > 0) {
        getShovel(this.setType == 1 ? 'iron' : 'gold', this.nums).then(res => {
          if (res.data.response_status.code == 0) {
            this.$store.dispatch('getInitInfo');
            this.$parent.showGetShovel = false
            this.toast(this.lang.getSuc)
          } else {
            this.toast(res.data.response_status.error)
          }
        })
      }
    },
    walletpage () {
      const ios = navigator.userAgent.match(/iPhone|iPod|ios|iPad/i);
      try {
        if (ios) {
          // goWalletpage()
          sendJsData('app://walletpage');
        } else {
          javascript: JSInterface.sendJsData('app://walletpage');
        }
      } catch (e) { }
    },
    closePup () {
      this.$parent.showGetShovel = false
      this.setType = 1
      this.nums = 0
    }
  },

}
</script>

<style lang="scss" scoped>
.close {
  display: block;
  width: 0.5rem;
  height: 0.5rem;
  position: absolute;
  right: 0.3rem;
  top: 0rem;
  background: url(../img/close.png);
  background-size: 100% 100%;
  z-index: 1;
}
.getShovel {
  width: 5.42rem;
  height: 8.47rem;
  padding: 0 0.57rem;
  background: url(../img/getShovel.png);
  background-size: 100% 100%;
  position: relative;
  .title {
    height: 0.72rem;
    text-align: center;
    line-height: 0.72rem;
    font-size: 0.4rem;
  }
  .userNums {
    margin-top: 1rem;
    color: #A36E41;
    font-size: 0.28rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .userNums2 {
    margin-top: 1rem;
    width: 2.11rem;
    height: 0.43rem;
    background: url(../img/coinsBg.png);
    background-size: 100% 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    img {
      width: 0.45rem;
      height: 0.45rem;
      margin-top: -0.01rem;
    }
    .add {
      width: 0.31rem;
      height: 0.31rem;
      background: url(../img/add2.png);
      background-size: 100% 100%;
      margin-right: 0.08rem;
    }
    em {
      flex: 1;
      text-align: center;
      font-size: 0.28rem;
      color: #7D3F0A;
    }
  }
  .shovel {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 0.25rem;
    .shoveImg {
      display: block;
      width: 2.54rem;
      height: 2.54rem;
    }
    strong {
      display: block;
      text-align: center;
      color: #B55E33;
    }
    .shovel1 {
      .shoveImg {
        background: url(../img/shovel1.png);
        background-size: 100% 100%;
        &.act {
          background: url(../img/shovel1_act.png);
          background-size: 100% 100%;
        }
      }
    }
    .shovel2 {
      .shoveImg {
        background: url(../img/shovel2.png);
        background-size: 100% 100%;
        &.act {
          background: url(../img/shovel2_act.png);
          background-size: 100% 100%;
        }
      }
    }
  }
  .shovelNums {
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    margin-top: 0.25rem;
    .redux,
    .add {
      width: 0.67rem;
      height: 0.67rem;
    }
    .redux {
      background: url(../img/redux.png);
      background-size: 100% 100%;
    }
    .add {
      background: url(../img/add.png);
      background-size: 100% 100%;
    }
    .max {
      font-size: 0.28rem;
      color: #A67247;
      position: absolute;
      right: 0.38rem;
    }
    .getNums {
      width: 1.58rem;
      height: 0.67rem;
      background: #D9BE9F;
      outline: none;
      border: 0.02rem solid #A6845A;
      border-radius: 0.1rem;
      margin: 0 0.2rem;
      text-align: center;
      line-height: 0.67rem;
      color: #fff;
    }
  }
  .get {
    width: 2.59rem;
    height: 0.96rem;
    background: url(../img/btn.png);
    background-size: 100% 100%;
    text-align: center;
    line-height: 0.96rem;
    font-size: 0.36rem;
    color: #561F04;
    margin: 0.2rem auto 0;
    &.black {
      color: #fff;
      background: url(../img/notGet.png);
      background-size: 100% 100%;
    }
  }
  .getTips {
    font-size: 0.28rem;
    color: #A36E41;
    margin: 0.15rem auto 0;
    text-align: center;
  }
}
</style>