<template>
  <div class="history">
    <div class="title">獲獎時間明細</div>
    <div class="giftlist">
      <div class="listTitle">
        <span class="time">時間</span>
        <span class="gift">獲得獎品</span>
      </div>
      <ul class="scrollable">
        <li v-for="(item,index) in record" :key="index">
          <span class="time">{{item.tm}}</span>
          <span class="gift" v-html="getGiftName(item)"></span>
        </li>
      </ul>
      <p v-if="record.length == 0" class="noDate">暫無獲獎記錄</p>
    </div>
    <Loading></Loading>
  </div>
</template>
<script>
import api from "../../api/apiConfig"
import Loading from "../../components/Loading"
import gift from "../../config/gift.js"
export default {
  components: { Loading },
  data() {
    return {
      record: [],
      loaded: false,
      more: true
    }
  },
  created() {
    api.getHistory(0).then(res => {
      this.record = res.data.response_data.record
    })
  },
  mounted() {
    this.scrollable = this.$el.querySelector('.scrollable');
    if (this.scrollable) {
      this.scrollable.addEventListener('scroll', this.onScroll);
    }
  },
  methods: {
    getGiftName(item) {
      if (item.gift_id == 3) {
        let giftTwoName = gift[item.gift_list_id][item.rand_gift_id].name
        return giftTwoName.replace('X', item.counts).replace('*1', '').replace('</br>', '') + '*2'
      } else if (item.gift_id == 0) {
        return `${item.counts}金豆`
      } else {
        return gift[item.gift_list_id][item.rand_gift_id].name.replace('</br>', '')
      }
    },
    onScroll() {
      const scrollToBottom = this.scrollable.scrollTop + this.scrollable.clientHeight >= this.scrollable.scrollHeight - 10;
      if (scrollToBottom) { //滾動加載，沒有加載完成
        if (this.loaded) return
        if (this.more) {
          this.more = false
          api.getHistory(this.record.length).then(res => {
            this.more = true
            if (res.data.response_data.record.length === 0) {
              this.loaded = true
            } else {
              this.record = this.record.concat(res.data.response_data.record)
            }
          })
        }
      }
    },
  }
}
</script>
<style lang= "scss">
body {
  background: #cf3052;
  .history {
    padding: 0.34rem 0.21rem;
  }
  .title {
    width: 4.86rem;
    height: 0.9rem;
    line-height: 0.9rem;
    background: url(../../assets/img/h3Bg.png);
    background-size: 100% 100%;
    margin: 0.29rem auto 0;
    text-align: center;
    color: #ffeabe;
  }
  .giftlist {
    margin-top: 0.38rem;
    width: 7rem;
    .listTitle {
      height: 0.7rem;
      line-height: 0.7rem;
      color: #ffeabe;
      display: flex;
      text-align: center;
      border-bottom: 0.01rem solid #ffeabe;
      .time {
        width: 3rem;
      }
      .gift {
        flex: 1;
      }
    }
    ul {
      max-height: 9rem;
      overflow-y: scroll;
      -webkit-overflow-scrolling: touch; //有回弹效果
      -webkit-overflow-scrolling: auto; //滑到哪停到哪
      li {
        display: flex;
        align-items: center;
        color: #ffd3dc;
        font-size: 73%;
        height: 0.45rem;
        border-bottom: 0.01rem solid rgba(255, 234, 190, 0.4);
        .time {
          width: 3rem;
          text-align: center;
        }
        .gift {
          flex: 1;
          white-space: nowrap;
          text-align: center;
        }
      }
    }
    .noDate {
      text-align: center;
      color: #ffeabe;
      margin-top: 0.2rem;
    }
  }
}
@import "../../assets/scss/common.scss";
</style>
