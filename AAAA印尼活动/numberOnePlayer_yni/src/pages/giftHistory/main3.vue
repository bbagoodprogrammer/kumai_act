<template>
  <div class="history">
    <div class="totalGift">
      <div class="timeBox">
        <h3>{{lang.DetailsOfPrizes}}</h3>
        <div class="tiemTitle">
          <span>{{lang.PrizesTime}}</span>
          <span class="name">{{lang.GetPrizes}}</span>
        </div>
        <div class="timeItem">
          <ul class="scrollable" :class="{mingHight:record.length==0}">
            <li v-for="(item,index) in  record" :key="index">
              <span class="tm">{{getTm(item.tm)}}</span>
              <span class="name">{{getGiftName(item.gift_id)}}</span>
            </li>
          </ul>
          <p v-if="record.length == 0" class="nodataTips">{{lang.noPrizes}}</p>
        </div>
      </div>

    </div>
    <loading></loading>
  </div>
</template>
<script>
import Loading from "../../components/Loading"
import api from "../../api/apiConfig"
import { wardName } from "../../config/ward.js"
import getDate from "../../utils/getDate"
import lang from "../../config/lang"
export default {
  components: { Loading },
  data() {
    return {
      // total_gift: {},
      record: [],
      loaded: false,
      more: true,
      lang: lang
    }
  },
  created() {
    api.getHistroy(0).then(res => {
      // this.total_gift = res.data.response_data.gift_total_detail
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
    getTm(tm) {
      return getDate(new Date(tm * 1000), "~")
    },
    getGiftName(id) {
      return wardName[id]
    },
    onScroll() {
      const scrollToBottom = this.scrollable.scrollTop + this.scrollable.clientHeight >= this.scrollable.scrollHeight - 10;
      if (scrollToBottom) { //滾動加載，沒有加載完成
        if (this.loaded) return
        if (this.more) {
          this.more = false
          api.getHistroy(this.record.length, 'more').then(res => {
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
  background: #d94343;
  .totalGift {
    padding: 0.49rem 0.32rem;
    .timeBox {
      margin: 0.64rem auto;
      width: 6rem;
      h3 {
        text-align: center;
        font-size: 120%;
        color: #ffe178;
      }
      .tiemTitle {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-top: 0.27rem;
        span {
          display: block;
          color: #ffb30f;
        }
        .name {
          width: 2.5rem;
          text-align: center;
        }
      }
      ul {
        width: 6rem;
        height: 9rem;
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
          font-size: 80%;
          .name {
            width: 2.5rem;
            text-align: center;
          }
        }
      }
      .nodataTips {
        margin-top: 0.15rem;
        text-align: center;
        font-size: 80%;
        color: #ffb30f;
      }
      ul::-webkit-scrollbar {
        width: 0.08rem;
      }
    }
  }
}
@import "../../assets/scss/common.scss";
</style>
