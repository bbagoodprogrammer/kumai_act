<template>
  <div class="historyList">
    <i class="close" @click="closeHistory()"></i>
    <div class="title">挖寶記錄</div>
    <div class="hasData">
      <ul class='scrollable'>
        <li v-for="(item,index) in hList" :key="index">
          <span class="gift">
            使用{{item.type=='gold'?'金鏟子':'鐵鏟子'}},挖到【{{item.prize_name}}】
          </span>
          <span class="time">{{getDateStr(item.tm)}}</span>
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
      hList: [],    // 獎勵列表,
      loaded: false,
      more: true,
      total_num: 0
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
            if (res.data.response_data.records.length === 0) {
              this.loaded = true
            } else {
              this.hList = this.hList.concat(res.data.response_data.records)
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
  position: relative;
  width: 5.42rem;
  height: 8.47rem;
  padding: 0 0.57rem;
  background: url(../img/getShovel.png);
  background-size: 100% 100%;
  position: relative;
  .title {
    height: 0.8rem;
    text-align: center;
    line-height: 0.8rem;
    font-size: 0.36rem;
    font-weight: bold;
  }
  .hasData {
    margin-top: 1rem;
  }

  ul {
    padding: 0 0.15rem;
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
  }
  .time {
    flex: 1;
    color: #B88038;
    font-size: 0.24rem;
    text-align: center;
  }
  .gift {
    width: 3rem;
    font-size: 0.28rem;
    color: #7D4903;
    margin-right: 0.15rem;
  }
}
.noData {
  margin-top: 1rem;
  text-align: center;
  color: #7D3F0A;
}
.close {
  display: block;
  width: 0.56rem;
  height: 0.56rem;
  background: url(../img/close.png);
  background-size: 100% 100%;
  position: absolute;
  top: 0rem;
  right: 0.3rem;
}
</style>
