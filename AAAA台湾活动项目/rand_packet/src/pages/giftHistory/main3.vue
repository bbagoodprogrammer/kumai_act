<template>
  <div class="giftHistory">
    <div class="title"></div>
    <div class="tabTitle">
      <span>{{lang.openBoxTime}}</span>
      <span>{{lang.gift}}</span>
    </div>
    <p v-if="list.length == 0" class="noData">{{lang.noData}}</p>
    <ul class="scrollable" v-if="list.length > 0">
      <li v-for="(item,index) in list" :key="index">
        <span class="tm">{{getTime(item.time)}}</span>
        <span class="gift">
          <strong v-if="item.type == 'coupon'">{{item.num}}{{lang.ticket}}</strong>
          <strong v-else-if="item.type == 'bean'">{{item.num}}{{lang.bean}}</strong>
          <strong v-else-if="item.type == 'car'">{{item.name}}({{item.day}}{{lang.day}})</strong>
          <strong v-else-if="item.type == 'gift'">{{item.name}}*{{item.num}}</strong>
        </span>
      </li>
    </ul>
    <loading />
  </div>
</template>
<script>
import Loading from "../../components/Loading"
import api from "../../api/apiConfig"
import getDate from "../../utils/getDate"
export default {
  components: { Loading },
  data() {
    return {
      list: [],
      loaded: false,
      more: true
    }
  },
  created() {
    api.getBoxHistory(0).then(res => {
      this.list = res.data.response_data.list
    })
  },
  mounted() {
    this.scrollable = this.$el.querySelector('.scrollable');
    if (this.scrollable) {
      this.scrollable.addEventListener('scroll', this.onScroll);
    }
  },
  methods: {
    getTime(tm) {
      return getDate(new Date(tm * 1000), 3)
    },
    onScroll() {
      const scrollToBottom = this.scrollable.scrollTop + this.scrollable.clientHeight >= this.scrollable.scrollHeight - 10;
      if (scrollToBottom) { //滾動加載，沒有加載完成
        if (this.loaded) return
        if (this.more) {
          this.more = false
          api.getBoxHistory(this.list.length, 'more').then(res => {
            this.more = true
            if (res.data.response_data.list.length === 0) {
              this.loaded = true
            } else {
              this.list = this.list.concat(res.data.response_data.list)
            }
          })
        }
      }
    }
  },
}
</script>
<style lang= "scss">
body {
  background: #5e1dc2;
  .giftHistory {
    padding: 0.47rem 0.35rem 0;
  }
  .title {
    width: 6.12rem;
    height: 2.3rem;
    margin: 0 auto;
    background: url(../../assets/img/historyTitle.png);
    background-size: 100% 100%;
  }
  .tabTitle {
    height: 0.84rem;
    border-bottom: 0.04rem solid #7d57cf;
    display: flex;
    span {
      display: block;
      width: 50%;
      text-align: center;
      line-height: 0.84rem;
      color: #7d5dcd;
      font-weight: 700;
    }
  }
  ul {
    width: 6.08rem;
    max-height: 8.32rem;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
    -webkit-overflow-scrolling: auto;
    margin: 0 auto;
    li {
      display: flex;
      align-items: center;
      min-height: 0.7rem;
      border-bottom: 0.015rem solid #7231d6;
      span {
        flex: 1;
        text-align: center;
      }
      .tm {
        font-size: 0.24rem;
        font-weight: 600;
        color: #8fccf0;
      }
      .gift {
        font-size: 0.24rem;
        font-weight: 600;
        color: #fed463;
      }
    }
  }
  .noData {
    text-align: center;
    font-weight: 700;
    margin-top: 0.8rem;
  }
}
@import "../../assets/scss/common.scss";
</style>
