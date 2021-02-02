<template>
  <div class="history">
    <div class="tabs">
      <a class="tab1" @click.prevent="mainTabClick(0)" :class="{current:mainTab==0}" href="">許願值記錄</a>
      <a class="tab2" @click.prevent="mainTabClick(1)" :class="{current:mainTab==1}" href="">獎勵記錄</a>
    </div>
    <div class="list">
      <div class="listHeader">
        <span>時間</span>
        <span>途徑</span>
        <span v-if="mainTab == 0">獲得許願值</span>
        <span v-else>獎勵</span>
      </div>
      <ul class="scrollable">
        <li v-for="(itme,index) in list1" :key="index">

        </li>
      </ul>
    </div>
    <p v-if="loading1">暫無數據</p>
    <p v-if="loading2">加載中...</p>
  </div>
</template>
<script>

import { histtoryList } from "../apis"
export default {
  data() {
    return {
      mainTab: 0,
      list1: [],
      list2: [],
      loading1: false,
      loading2: false,
    }
  },
  created() {
    histtoryList(0, 0).then(res => {

    })
  }
}
</script>
<style lang= "scss" scoped>
.history {
  width: 7.02rem;
  height: 7.79rem;
  background: url(../img/history_bg.png);
  background-size: 100% 100%;
  padding-top: 0.52rem;
  > p {
    color: rgba(157, 96, 77, 1);
  }
  .tabs {
    width: 5.59rem;
    height: 0.88rem;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
    background: url(../img/his_tabs.png);
    background-size: 100% 100%;
    a {
      display: block;
      width: 3.56rem;
      height: 100%;
      text-align: center;
      line-height: 0.9rem;
      font-size: 0.32rem;
      color: rgba(255, 245, 219, 1);
      transition: all 0.1s linear;
      &.current {
        color: rgba(145, 77, 68, 1);
        background: url(../img/his_act.png);
        background-size: 100% 100%;
      }
    }
  }
  .listHeader {
    color: rgba(157, 96, 77, 1);
    font-size: 0.24rem;
  }
}
</style>
