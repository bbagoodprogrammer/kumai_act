<template>
  <div class="page pageIndex">
    <div class="header">
      <div class="tipsArr">
        <span @click="showRule = true">{{lang.index_ruleTips1}}</span>
        <span @click="showHistory = true">{{lang.index_ruleTips2}}</span>
      </div>
      <RoolMsg />
    </div>
    <div class="con">
      <div class="tab">
        <span class="tab1" :class="{act:type == 1}" @click="type = 1">{{lang.index_tab1}}</span>
        <span class="tab2" :class="{act:type == 2}" @click="type = 2">{{lang.index_tab2}}</span>
      </div>
      <keep-alive>
        <component :is="type == 1?'Ball':'Slice'"></component>
      </keep-alive>
      <Rank />
      <Footer :type="type" />
    </div>
    <div class="mask" v-show="first_enter">
      <transition name="slide">
        <div class="first_pup" v-show="first_enter">
          <i class="close" @click="first_enter = false"></i>
          <img src="../img/plane.png" alt="" class="plane">
          <p class="palne_tips" v-html="lang.index_firstTips">
          </p>
          <div class="go" @click="first_enter = false">
            {{lang.fly}}
          </div>
        </div>
      </transition>
    </div>
    <div class="mask" v-show="showHistory">
      <transition name="slide">
        <HistoryTabsScrollLoadList v-if="showHistory" />
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

import Ball from "./Ball"
import Slice from "./Slice"
import Rank from "./Rank"
import Footer from "./Footer"
import RoolMsg from "./RoolMsg"
import HistoryTabsScrollLoadList from "./HistoryTabsScrollLoadList"
import Rule from "./Rule"
import { mapState } from "vuex"
export default {
  components: { Ball, Slice, Rank, Footer, RoolMsg, HistoryTabsScrollLoadList, Rule },
  data () {
    return {
      type: 1,
      first_enter: false,
      showHistory: false,
      showRule: false
    }
  },
  computed: {
    ...mapState(['owner'])
  },
  watch: {
    owner (val) {
      if (!val.enter_time) {
        this.first_enter = true
      }
    }
  }
}
</script>

<style lang="scss">
.pageIndex {
  .header {
    height: 4.77rem;
    .tipsArr {
      position: absolute;
      top: 2.65rem;
      right: 0;
      span {
        display: block;
        width: 1.4rem;
        height: 0.53rem;
        background: url(../img/ruleTips.png);
        background-size: 100% 100%;
        text-align: center;
        line-height: 0.53rem;
        font-size: 0.28rem;
        color: rgba(255, 175, 243, 1);
        text-indent: 0.1rem;
        margin-bottom: 0.08rem;
      }
    }
  }
  .tab {
    padding: 0 0.7rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    span {
      width: 2.72rem;
      height: 0.79rem;
      line-height: 0.79rem;
      background: url(../img/tab_bg.png);
      background-size: 100% 100%;
      text-align: center;
      color: rgba(136, 214, 255, 1);
      font-size: 0.34rem;
      font-weight: bold;
      transition: all 0.1s ease;
      &.act {
        width: 2.82rem;
        height: 0.82rem;
        line-height: 0.82rem;
        color: #fff;
        background: url(../img/tab_act.png);
        background-size: 100% 100%;
      }
    }
  }
  .con {
    background: url(../img/star_bg.png);
    background-size: 100% auto;
  }
  .first_pup {
    position: relative;
    .close {
      display: block;
      width: 0.75rem;
      height: 0.75rem;
      background: url(../img/close.png);
      background-size: 100% auto;
      position: absolute;
      top: -1rem;
      right: 0rem;
    }
    .plane {
      width: 4.35rem;
      height: 3.3rem;
      margin: 0 auto;
    }
    .palne_tips {
      font-size: 0.28rem;
      color: rgba(114, 234, 255, 1);
      text-align: center;
      padding: 0 0.82rem;
      margin-top: 0.35rem;
    }
    .go {
      width: 2.45rem;
      height: 0.74rem;
      background: url(../img/go.png);
      background-size: 100% auto;
      text-align: center;
      font-weight: 500;
      font-style: italic;
      line-height: 0.74rem;
      margin: 0.1rem auto 0;
    }
  }
  img {
    display: block;
    width: 100%;
  }
}
</style>