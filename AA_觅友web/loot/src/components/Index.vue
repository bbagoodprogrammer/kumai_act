<template>
  <div class="page pageIndex">
    <div class="iconList">
      <span class="history"></span>
      <div class="rank"></div>
      <div class="userTicketNums"><i class="tIcon"></i> <span>284</span> <i class="get">獲取</i></div>
    </div>
    <div class="logo"></div>
    <div class="tabs">
      <span :class="{act:type == 1}" @click="type = 1">熱門奪寶</span>
      <span :class="{act:type == 2}" @click="type = 2">歷史奪寶</span>
    </div>
    <component :is="type == 1?'hotList':'historyList'" />
  </div>
</template>

<script>

import hotList from "./HotList"
import historyList from "./HistoryList"
export default {
  components: { hotList, historyList },
  data () {
    return {
      type: 1
    }
  }
}
</script>

<style lang="scss">
.pageIndex {
  width: 7.5rem;
  padding-top: 1.21rem;
  background: url(../img/banner.png) no-repeat;
  background-size: 100% auto;
  position: relative;
  .iconList {
    display: flex;
    position: absolute;
    top: 0.32rem;
    left: 0.31rem;
    .history,
    .rank {
      width: 0.48rem;
      height: 0.48rem;
      background: url(../img/history.png);
      background-size: 100% 100%;
      margin-right: 0.17rem;
    }
    .rank {
      background: url(../img/rank.png);
      background-size: 100% 100%;
    }
    .userTicketNums {
      width: 1.75rem;
      height: 0.48rem;
      background: rgba(255, 255, 255, 0.3);
      border-radius: 0.24rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      span {
        flex: 1;
        text-align: center;
        font-size: 0.24rem;
      }
      .tIcon {
        width: 0.48rem;
        height: 0.48rem;
        background: url(../img/tIcon.png);
        background-size: 100% 100%;
      }
      .get {
        width: 0.56rem;
        height: 0.3rem;
        background: #FFDD00;
        border-radius: 0.15rem;
        margin-right: 0.08rem;
        text-align: center;
        line-height: 0.3rem;
        font-size: 0.2rem;
        color: rgba(44, 43, 54, 1);
      }
    }
  }
  .tabs {
    width: 6.38rem;
    height: 0.8rem;
    background: #6E1ACC;
    border-radius: 0.4rem;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: center;
    span {
      width: 3.08rem;
      height: 0.8rem;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 0.32rem;
      color: rgba(255, 255, 255, 0.6);
      &.act {
        color: #ffff;
        background: url(../img/tabAct.png);
        background-size: 100% 100%;
      }
    }
  }
  img {
    display: block;
    width: 100%;
  }
}
</style>