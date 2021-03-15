<template>
  <div class="historyList" :class="{noData: hList.length== 0}">
    <i class="close" @click="closeHistory()"></i>
    <div class="hasData">
      <div class="listHeader">
        <span class="time">{{lang.date}}</span>
        <span class="gift">{{lang.get_gift}}</span>
      </div>
      <ul class='scrollable'>
        <li v-for="(item,index) in hList" :key="index">
          <span class="time">{{getDateStr(item.time)}}</span>
          <span class="gift">{{item.name}}</span>
        </li>
      </ul>
    </div>
    <div class="noData" v-if="hList.length == 0">
      {{lang.noData}}
    </div>
  </div>
</template>
<script>
import { lotteryRecord } from '../apis';
import getDate from "../utils/getDate"
import { replaceLang } from '../utils';

export default {
  data () {
    return {
      hList: [],
      loaded: false,
      more: true
    }
  },
  created () {
    lotteryRecord(0).then(res => {
      this.hList = res.data.response_data.list
    })
  },
  mounted () {
    this.scrollable = this.$el.querySelector('.scrollable');
    if (this.scrollable) {
      this.scrollable.addEventListener('scroll', this.onScroll);
    }
  },
  methods: {
    getDateStr (tm) {
      return getDate(new Date(tm * 1000), 1)
    },
    onScroll () {
      const scrollToBottom = this.scrollable.scrollTop + this.scrollable.clientHeight >= this.scrollable.scrollHeight - 10;
      if (scrollToBottom) { //滾動加載，沒有加載完成
        if (this.loaded) return
        if (this.more) {
          this.more = false
          lotteryRecord(this.hList.length, 'more').then(res => {
            this.more = true
            if (res.data.response_data.list.length === 0) {
              this.loaded = true
            } else {
              this.hList = this.hList.concat(res.data.response_data.list)
            }
          })
        }
      }
    },
    closeHistory () {
      this.$parent.showHistory = false
      this.loaded = false
    }
  }
}
</script>
<style lang="scss">
.historyList {
  width: 6.4rem;
  height: 8.07rem;
  padding: 1.07rem 0.46rem 0 0.2rem;
  background: url(../img/pup/whiteBg.png);
  background-size: 100% 100%;
  margin: -1rem 0 0 0.3rem;
  position: relative;
  .listHeader {
    display: flex;
    align-items: center;
    font-size: 0.28rem;
    margin: 0.15rem 0;
    text-align: center;
  }
  ul {
    max-height: 6rem;
    overflow-x: hidden;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
    -webkit-overflow-scrolling: auto;
  }
  li {
    display: flex;
    align-items: center;
    font-size: 0.24rem;
    margin-bottom: 0.15rem;
    text-align: center;
    color: rgba(240, 179, 255, 1);
  }
  .time {
    flex: 1;
  }
  .gift {
    flex: 1;
  }
}
.noData {
  //   margin-top: 0.5rem;
  text-align: center;
}
.close {
  display: block;
  width: 0.56rem;
  height: 0.56rem;
  background: url(../img/close.png);
  background-size: 100% 100%;
  position: absolute;
  bottom: -0.8rem;
  left: 2.86rem;
}
</style>
