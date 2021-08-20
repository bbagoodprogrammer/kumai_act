<template>
  <div class="historyList" :class="{noData: hList.length== 0}">
    <i class="close" @click="closeHistory()"></i>
    <div class="title">{{lang.history_title}}</div>
    <ul class="stats">
      <li v-for="(item,index) in stats" :key="index">
        <div v-html="lang.historyCoins.replace('%s',item.coins).replace('%n',item.go_count)">

        </div>
        <!-- <em>{{item.coins}}金幣</em>檔抽獎次數：{{item.go_count}} -->
      </li>
    </ul>
    <div class="hasData">
      <ul class='scrollable'>
        <li v-for="(item,index) in hList" :key="index">
          <div class="msg">
            <span class="gift">
              {{lang.luckTitle}}{{item.prize_name}}
            </span>
            <span class="time">{{getDateStr(item.tm)}}</span>
          </div>
          <div class="score">
            +{{item.score}}{{lang.scoreName}}
          </div>
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

export default {
  data () {
    return {
      hList: [],    // 獎勵列表,
      loaded: false,
      more: true,
      total_num: 0,
      stats: []
    }
  },
  created () {
    lotteryRecord(0).then(res => {
      this.hList = res.data.response_data.list
      this.stats = res.data.response_data.stats
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
    }
  }
}
</script>
<style lang="scss">
.historyList {
  position: relative;
  width: 6.51rem;
  height: 7.41rem;
  background: url(../img/history.png);
  background-size: 100% 100%;
  .title {
    height: 1.1rem;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.34rem;
  }
  .totleNums {
    padding: 0 0.75rem;
    font-size: 0.32rem;
    font-weight: 600;
  }
  .listHeader {
    display: flex;
    align-items: center;
    font-size: 0.28rem;
    margin: 0.15rem 0;
    text-align: center;
  }
  .stats {
    padding: 0 0.27rem;
    margin: 0.2rem 0;
    text-align: left;
    li {
      font-size: 0.32rem;
      em {
        font-size: 0.32rem;
        color: #E25DFF;
      }
    }
  }
  .scrollable {
    padding: 0 0.27rem;
    max-height: 4rem;
    overflow-x: hidden;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
    -webkit-overflow-scrolling: auto;
    li {
      display: flex;
      align-items: center;
      font-size: 0.24rem;
      margin-bottom: 0.15rem;
      > div {
        flex: 1;
        &.msg {
          span {
            display: block;
            &.gift {
              font-size: 0.32rem;
            }
            &.time {
              color: #BEB5FF;
              font-size: 0.26rem;
            }
          }
        }
        &.score {
          color: #BEB5FF;
          font-size: 0.32rem;
          text-align: right;
        }
      }
    }
  }
}
.noData {
  //   margin-top: 0.5rem;
  text-align: center;
}
.close {
  display: block;
  width: 0.66rem;
  height: 0.66rem;
  background: url(../img/close.png);
  background-size: 100% 100%;
  position: absolute;
  top: 0.1rem;
  right: 0.1rem;
}
</style>
