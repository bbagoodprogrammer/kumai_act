<template>
  <div class="page pageIndex">
    <div class="header"></div>
    <div class="con">
      <div class="tab">
        <span class="tab1" :class="{act:type == 1}" @click="type = 1">遨遊太空</span>
        <span class="tab2" :class="{act:type == 2}" @click="type = 2">星際漫步</span>
      </div>
      <component :is="type == 1?'Ball':'Slice'"></component>
    </div>

  </div>
</template>

<script>

import Ball from "./Ball"
import Slice from "./Slice"

export default {
  components: { Ball, Slice },
  data () {
    return {
      type: 1
    }
  }
}
</script>

<style lang="scss">
.pageIndex {
  .header {
    height: 4.77rem;
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
  img {
    display: block;
    width: 100%;
  }
}
</style>