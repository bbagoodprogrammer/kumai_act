<template>
  <div class="giftHistory">
    <h3 class="historyTitle">{{lang.historyTitle}}</h3>
    <div class="tabTitle">
      <span>{{lang.openBoxTime}}</span>
      <span>{{lang.gift}}</span>
    </div>
    <p v-if="list.length == 0" class="noData">{{lang.noData}}</p>
    <ul class="scrollable" v-if="list.length > 0">
      <li v-for="(item,index) in list" :key="index">
        <span class="tm">{{getTime(item.time)}}</span>
        <span class="gift">
          {{item.prize_name}} * {{item.prize_count}}
        </span>
      </li>
    </ul>
    <loading />
  </div>
</template>
<script>
import Loading from "./Loading"
import api from "../apis/apiConfig"
import getDate from "../utils/getDate"
export default {
  components: { Loading },
  data () {
    return {
      list: [],
      loaded: false,
      more: true
    }
  },
  created () {
    api.giftHistory(0).then(res => {
      this.list = res.data.response_data.records
    })
  },
  mounted () {
    this.scrollable = this.$el.querySelector('.scrollable');
    if (this.scrollable) {
      this.scrollable.addEventListener('scroll', this.onScroll);
    }
  },
  methods: {
    getTime (tm) {
      return getDate(new Date(tm * 1000), 'pai')
    },
    onScroll () {
      const scrollToBottom = this.scrollable.scrollTop + this.scrollable.clientHeight >= this.scrollable.scrollHeight - 10;
      if (scrollToBottom) { //滾動加載，沒有加載完成
        if (this.loaded) return
        if (this.more) {
          this.more = false
          api.giftHistory(this.list.length, 'more').then(res => {
            this.more = true
            if (res.data.response_data.list.length === 0) {
              this.loaded = true
            } else {
              this.list = this.list.concat(res.data.response_data.records)
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
  background: #be4e4e;
  .giftHistory {
    padding: 0.47rem 0.35rem 0;
  }
  .historyTitle {
    text-align: center;
    font-size: 0.48rem;
    color: #fff583;
    font-weight: 700;
    margin-bottom: 0.4rem;
  }
  .tabTitle {
    width: 6.08rem;
    height: 0.84rem;
    display: flex;
    margin: 0 auto;
    span {
      display: block;
      width: 50%;
      text-align: center;
      line-height: 0.84rem;
      color: #fff583;
      font-weight: 600;
      font-size: 0.26rem;
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
      span {
        flex: 1;
        text-align: center;
        font-size: 0.26rem;
        font-weight: 600;
      }
    }
  }
  .noData {
    text-align: center;
    font-weight: 700;
    margin-top: 0.8rem;
  }
}
</style>
