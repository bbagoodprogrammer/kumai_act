<template>
  <div class="page pageIndex">
    <RoolMsg :roolMsgs="roolMsgs" />
    <div class="tipsBox">
      <span @click="showRule = true">{{lang.ruleTips}}</span>
      <span @click="showHistory = true">{{lang.ruleTips2}}</span>
    </div>
    <div class="header">

    </div>
    <div class="con">

    </div>
    <div class="starCon">
      <star />
      <Tutable />
      <p class="lastTIips"><span>剩餘抽獎次數：{{luckDrawCount}}</span> {{lang.lastTips}}</p>
    </div>
    <div class="mask" v-show="showHistory">
      <transition name="slide">
        <History v-if="showHistory" />
      </transition>
    </div>
    <div class="mask" v-show="showRule">
      <transition name="slide">
        <Rule v-show="showRule" />
      </transition>
    </div>
  </div>
</template>

<script>

import Star from "./Star"
import Tutable from "./Tutable"
import History from "./History"
import Rule from "./Rule"
import RoolMsg from "./RoolMsg"
import { roolMsg } from "../apis"
import { mapState } from "vuex"

export default {
  data () {
    return {
      showHistory: false,
      showRule: false,
      roolMsgs: []
    }
  },
  created () {
    roolMsg().then(res => {
      this.roolMsgs = res.data.response_data.list
    })
  },
  computed: {
    ...mapState(['luckDrawCount'])
  },
  components: {
    Star,
    Tutable,
    History,
    Rule,
    RoolMsg
  }
}
</script>

<style lang="scss">
.pageIndex {
  overflow-x: hidden;
  .tipsBox {
    position: absolute;
    top: 4.1rem;
    right: 0;
    z-index: 5;
    span {
      display: block;
      width: 1.49rem;
      height: 0.44rem;
      background: url(../img/ruleTips.png);
      background-size: 100% 100%;
      font-size: 0.26rem;
      color: #ffff;
      line-height: 0.44rem;
      text-align: center;
      text-indent: 0.2rem;
      margin-bottom: 0.08rem;
    }
  }
  .header {
    position: relative;
    z-index: 3;
  }
  .con {
    position: absolute;
    width: 7.5rem;
    height: 18.78rem;
    background: url(../img/starBg.png);
    background-size: 100% 100%;
    top: 5.35rem;
  }
  .starCon {
    width: 100%;
    z-index: 5;
    position: absolute;
    top: 5.35rem;
  }
  img {
    display: block;
    width: 100%;
  }
  .lastTIips {
    color: rgba(90, 224, 248, 1);
    font-size: 0.24rem;
    text-align: center;
    margin-top: 0.55rem;
    span {
      display: block;
      font-size: 0.28rem;
    }
  }
}
</style>