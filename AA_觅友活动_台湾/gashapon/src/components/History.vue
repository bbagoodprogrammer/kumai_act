<template>
  <div class="historyList" :class="{noData: hList.length== 0}">
    <i class="close" @click="closeHistory()"></i>
    <div class="title">{{lang.history_title}}</div>
    <p>{{lang.getedNums}}{{owner.coupons_total}}</p>
    <div class="hasData">
      <ul class='scrollable'>
        <li v-for="(item,index) in hList" :key="index">
          <div class="msg">
            <span class="gift" v-if="item.type == 'go' && item.level=='rare'">
              {{lang.historyTips1.replace('%n',item.name).replace('%c',item.count)}}
            </span>
            <span class="gift" v-else-if="item.type == 'go'">
              {{lang.historyTips2.replace('%n',item.name).replace('%c',item.count)}}
            </span>
            <span class="gift" v-else-if="item.type == 'charge'">
              {{lang.historyTips3.replace('%c',item.count)}}
            </span>
            <span class="time">{{getDateStr(item.tm)}}</span>
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
import { mapState } from "vuex"

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
  computed: {
    ...mapState(['owner'])
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
  width: 5.85rem;
  height: 5.51rem;
  background: url(../img/history.png);
  background-size: 100% 100%;
  .title {
    height: 1.1rem;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.34rem;
    text-shadow: #8048D5 1px 0 0, #8048D5 0 1px 0, #8048D5 -1px 0 0,
      #8048D5 0 -1px 0;
  }

  > p {
    font-size: 0.28rem;
    color: #5220E2;
    padding-left: 0.27rem;
  }
  .scrollable {
    padding: 0 0.27rem;
    margin-top: 0.2rem;
    max-height: 3.6rem;
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
              color: #5220E2;
            }
            &.time {
              font-size: 0.24rem;
            }
          }
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
  top: -0.9rem;
  right: 0rem;
}
</style>
