<template>
  <div class="history">
    <div class="totalGift">
      <h3 class="totalTitle">累計抽中的獎品</h3>
      <div class="giftItem">
        <div class="giftT">
          <span>{{total_gift.total_coins}}</span>
          <span>{{total_gift.total_vip}}</span>
          <span>{{total_gift.total_beans}}</span>
          <span>{{total_gift.total_ticket}}</span>
        </div>
        <div class="giftB">
          <span>{{total_gift.puzzle_1}}</span>
          <span>{{total_gift.puzzle_2}}</span>
          <span>{{total_gift.puzzle_3}}</span>
          <span>{{total_gift.puzzle_4}}</span>
          <span>{{total_gift.puzzle_5}}</span>
          <span>{{total_gift.puzzle_6}}</span>
        </div>
      </div>

      <div class="timeBox">
        <h3>抽獎時間明細</h3>
        <div class="tiemTitle">
          <span>抽獎時間</span>
          <span>獲得的獎品</span>
        </div>
        <div class="timeItem">
          <ul class="scrollable" :class="{mingHight:record.length==0}">
            <li v-for="(item,index) in  record" :key="index">
              <span class="tm">{{item.tm}}</span>
              <span class="name">{{getGiftName(item.gift_id)}}</span>
            </li>
          </ul>
          <p v-if="record.length == 0" class="nodataTips">暂无抽奖信息</p>
        </div>
      </div>

    </div>
    <loading></loading>
  </div>
</template>
<script>
import Loading from "../../components/Loading"
import api from "../../api/apiConfig"
import { wardName } from "../../config/ward"
export default {
  components: { Loading },
  data() {
    return {
      total_gift: {},
      record: [],
      loaded: false,
      more: true
    }
  },
  created() {
    api.getHistory(0).then(res => {
      this.total_gift = res.data.response_data.gift_total_detail
      this.record = res.data.response_data.record
    })
  },
  mounted() {
    this.scrollable = this.$el.querySelector('.scrollable');
    if (this.scrollable) {
      this.scrollable.addEventListener('scroll', this.onScroll);
    }
    sessionStorage.setItem("need-refresh", true);
  },
  methods: {
    getGiftName(id) {
      return wardName[id]
    },
    onScroll() {
      console.log('gg')
      const scrollToBottom = this.scrollable.scrollTop + this.scrollable.clientHeight >= this.scrollable.scrollHeight - 10;
      if (scrollToBottom) { //滾動加載，沒有加載完成
        if (this.loaded) return
        if (this.more) {
          this.more = false
          api.getHistory(this.record.length, 'more').then(res => {
            this.more = true
            if (res.data.response_data.record.length === 0) {
              this.loaded = true
            } else {
              this.record = this.record.concat(res.data.response_data.record)
            }
          })
        }
      }
    }
  }
}
</script>
<style lang="scss">
body {
  background: #9c3633;
  .totalGift {
    padding: 0.49rem 0.32rem;
    .totalTitle {
      text-align: center;
      font-size: 120%;
      color: #ffc867;
    }
    .giftItem {
      margin-top: 0.23rem;
      width: 6.88rem;
      height: 4.12rem;
      background: url(../../assets/img/historyGift.png);
      background-size: 100% 100%;
      position: relative;
      .giftT {
        width: 6.88rem;
        height: 0.45rem;
        position: absolute;
        top: 1.6rem;
        display: flex;
        span {
          flex: 1;
          line-height: 0.45rem;
          text-align: center;
          font-size: 80%;
        }
      }
      .giftB {
        width: 6.88rem;
        height: 0.45rem;
        position: absolute;
        top: 3.65rem;
        display: flex;
        span {
          flex: 1;
          line-height: 0.45rem;
          text-align: center;
          font-size: 80%;
        }
      }
    }
    .timeBox {
      margin: 0.64rem auto;
      width: 6rem;
      h3 {
        text-align: center;
        font-size: 120%;
        color: #ffc867;
      }
      .tiemTitle {
        display: flex;
        justify-content: space-between;
        margin-top: 0.27rem;
        span {
          display: block;
        }
      }
      ul {
        width: 6rem;
        height: 5rem;
        padding-right: 0.15rem;
        overflow-y: scroll;
        &.mingHight {
          height: 0.5rem;
        }
        li {
          display: flex;
          justify-content: space-between;
          align-items: center;
          color: #fff8d7;
          min-height: 0.5rem;
          .name {
            width: 1.5rem;
            text-align: center;
          }
        }
      }
      .nodataTips {
        margin-top: 0.15rem;
        text-align: center;
        font-size: 80%;
      }
      ul::-webkit-scrollbar {
        width: 0.08rem;
      }
    }
  }
}
@import "../../assets/scss/common.scss";
</style>
