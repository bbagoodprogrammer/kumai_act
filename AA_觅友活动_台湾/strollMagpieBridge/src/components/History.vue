<template>
  <div class="historyList" :class="{noData: hList.length== 0}">
    <i class="close" @click="closeHistory()"></i>
    <div class="title">{{lang.history_title}}</div>
    <div class="totleNums">{{lang.history_nums.replace('$',total_num)}}</div>
    <div class="hasData">
      <ul class='scrollable'>
        <li v-for="(item,index) in hList" :key="index">
          <span class="gift">
            <strong>{{lang.history_get}}</strong>
            <strong>{{item.name}}</strong>
          </span>
          <span class="time">{{getDateStr(item.tm)}}</span>
        </li>
      </ul>
    </div>
    <div class="noData" v-if="hList.length == 0">
      {{lang.history_noData}}
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
      hList: [],    // 獎勵列表,
      loaded: false,
      more: true,
      total_num: 0
    }
  },
  created () {
    lotteryRecord(0).then(res => {
      this.total_num = res.data.response_data.total_num
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
      if (AREA == 'tw') {
        return getDate(new Date(tm * 1000), 1)
      } else if (AREA == 'vn') {
        return getDate(new Date(tm * 1000), 2)
      }
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
<style lang="scss" scoped>
.historyList {
  width: 7.2rem;
  height: 8.45rem;
  padding-top: 0.28rem;
  background: url(../img/inivitBg.png);
  background-size: 100% 100%;
  position: relative;
  .title {
    height: 1.1rem;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.34rem;
    color: rgba(188, 37, 104, 1);
  }
  .totleNums {
    padding: 0 0.75rem;
    font-size: 0.32rem;
    font-weight: 600;
    color: rgba(234, 81, 235, 1);
  }
  .listHeader {
    display: flex;
    align-items: center;
    font-size: 0.28rem;
    margin: 0.15rem 0;
    text-align: center;
  }
  ul {
    padding: 0 0.75rem;
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
    color: rgba(240, 179, 255, 1);
  }
  .time {
    flex: 1;
    color: #EA51EB;
    font-size: 0.24rem;
    text-align: center;
  }
  .gift {
    flex: 1;
    strong {
      display: block;
      color: #B06165;
      font-size: 0.26rem;
    }
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
  top: -0.8rem;
  right: 0.5rem;
}
</style>
