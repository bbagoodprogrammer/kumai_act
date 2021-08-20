<template>
  <div class="page pageIndex">
    <RoolMsg />
    <div class="ruleTips">
      <span class="rule" @click="showRule = true">{{lang.indexRuleTips1}}</span>
      <span class="history" @click="showHistory = true">{{lang.indexRuleTips2}}</span>
    </div>
    <Machine />
    <Rank />
    <Footer />
    <div class="mask" v-show="showHistory">
      <transition name="slide">
        <History v-if="showHistory" />
      </transition>
    </div>
    <div class="mask" v-show="showRule">
      <transition name="slide">
        <Rule v-if="showRule" />
      </transition>
    </div>
  </div>
</template>

<script>

import Machine from "./Machine"
import Rank from "./Rank"
import Footer from "./Footer"
import History from "./History"
import Rule from "./Rule"
import RoolMsg from "./RoolMsg"

export default {
  components: { Machine, Rank, Footer, History, Rule, RoolMsg },
  data () {
    return {
      showHistory: false,
      showRule: false
    }
  }
}
</script>

<style lang="scss">
.pageIndex {
  background: #2B0457FF url(../img/act_bg.png) no-repeat;
  background-size: 100% auto;
  position: relative;
  .ruleTips {
    position: absolute;
    z-index: 5;
    right: 0;
    top: 1.98rem;
    span {
      display: block;
      width: 1.47rem;
      height: 0.45rem;
      background: url(../img/ruleTips.png);
      background-size: 100% 100%;
      text-align: center;
      line-height: 0.45rem;
      font-size: 0.26rem;
      margin-bottom: 0.1rem;
    }
  }
  img {
    position: relative;
    display: block;
    width: 100%;
  }
}
</style>