<template>
  <div class="page pageIndex">
    <RoolMsg />
    <div class="pupTips">
      <span class="rule" @click="$router.push({name:'rule'})">{{lang.ruleTips1}}</span>
      <span class="get" @click="showGetShovel = true">{{lang.ruleTips2}}</span>
      <span class="history" @click="showHistory = true">{{lang.ruleTips3}}</span>
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
    <div class="mask" v-show="showHistory">
      <transition name="slide">
        <History v-if="showHistory" />
      </transition>
    </div>
  </div>
</template>

<script>


import Task from "./Task"
import Rank from "./Rank"
import GetShovel from "./GetShovel"
import RoolMsg from "./RoolMsg"
import History from "./History"

export default {
  components: { Task, Rank, GetShovel, RoolMsg, History },
  data () {
    return {
      type: 1,
      showGetShovel: false,
      showHistory: false
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
      width: 1.1rem;
      padding: 0 0.2rem;
      height: 0.67rem;
      background: url(../img/pupTips.png);
      background-size: 100% 100%;
      text-align: center;
      font-size: 0.26rem;
      color: #0D4A6D;
      display: flex;
      align-items: center;
      justify-content: center;
      line-height: 0.25rem;
      position: absolute;
      z-index: 1;
      right: 0;
      &.rule {
        top: 2.7rem;
      }
      &.get {
        top: 5.6rem;
      }
      &.history {
        top: 6.3rem;
      }
    }
  }
  img {
    display: block;
    width: 100%;
  }
}
</style>