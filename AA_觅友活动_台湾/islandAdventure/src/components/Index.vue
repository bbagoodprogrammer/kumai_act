<template>
  <div class="page pageIndex">
    <div class="pupTips">
      <span class="rule">規則&獎勵</span>
      <span class="get" @click="showGetShovel = true">兌換鏟子</span>
      <span class="history">挖寶紀錄</span>
    </div>
    <div class="header"></div>
    <div class="tab">
      <span class="tab1" :class="{act:type == 1}" @click="type = 1"></span>
      <span class="tab2" :class="{act:type == 2}" @click="type = 2"></span>
    </div>
    <keep-alive>
      <component :is="type == 1?'Task':'Rank'" />
    </keep-alive>
    <div class="mask" v-show="showGetShovel">
      <transition name="slide">
        <GetShovel v-if="showGetShovel" />
      </transition>
    </div>
  </div>
</template>

<script>

import Task from "./Task"
import Rank from "./Rank"
import GetShovel from "./GetShovel"
export default {
  components: { Task, Rank, GetShovel },
  data () {
    return {
      type: 1,
      showGetShovel: false
    }
  }
}
</script>

<style lang="scss" >
.pageIndex {
  .header {
    height: 3.54rem;
  }
  .pupTips {
    span {
      display: block;
      width: 1.51rem;
      height: 0.67rem;
      background: url(../img/pupTips.png);
      background-size: 100% 100%;
      text-align: center;
      font-size: 0.26rem;
      color: #0D4A6D;
      line-height: 0.67rem;
      position: absolute;
      z-index: 1;
      right: 0;
      &.rule {
        top: 2.7rem;
      }
      &.get {
        top: 5rem;
      }
      &.history {
        top: 5.8rem;
      }
    }
  }
  img {
    display: block;
    width: 100%;
  }
}
</style>