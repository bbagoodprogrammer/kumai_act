<template>
  <div class="giftHistory">
    <div class="title"></div>
    <div class="tabTitle">
      <span>{{lang.openTime}}</span>
      <span>{{lang.openGet}}</span>
    </div>
    <p v-if="list.length == 0" class="noData">{{lang.noData}}</p>
    <ul class="scrollable">
      <li v-for="(item,index) in list" :key="index">
        <span class="tm">{{getTime(item.time)}}</span>
        <span class="gift">
          <em>{{getWardName(item)}} <i v-if="item.double > 0"> *2</i> </em>
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
import { hisWards } from "../../config/wards"
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
    api.getHistory(0).then(res => {
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
      return getDate(new Date(tm * 1000), '~')
    },
    onScroll() {
      const scrollToBottom = this.scrollable.scrollTop + this.scrollable.clientHeight >= this.scrollable.scrollHeight - 10;
      if (scrollToBottom) { //滾動加載，沒有加載完成
        if (this.loaded) return
        if (this.more) {
          this.more = false
          api.getHistory(this.list.length, 'more').then(res => {
            this.more = true
            if (res.data.response_data.list.length === 0) {
              this.loaded = true
            } else {
              this.list = this.list.concat(res.data.response_data.list)
            }
          })
        }
      }
    },
    getWardName(item) {
      if (item.name) {
        let newName = hisWards[item.etype].replace('X', item.num || item.day).replace('%', item.name)
        if (item.gtype == 'bean' || item.gtype == '') {
          return newName.replace('&', 'đậu')
        } else {
          return newName.replace('&', 'xu')
        }
      } else {
        return hisWards[item.etype].replace('X', item.num)
      }
    },
  },
}
</script>
<style lang= "scss">
body {
  background: #af6f4c;
  .giftHistory {
    padding: 0.47rem 0.35rem 0;
  }
  .title {
    width: 5.13rem;
    height: 3.04rem;
    margin: 0 auto;
    background: url(../../assets/img/histotyTitle.png);
    background-size: 100% 100%;
  }
  .tabTitle {
    height: 0.84rem;
    display: flex;
    span {
      display: block;
      width: 50%;
      text-align: center;
      line-height: 0.84rem;
      color: #37ffb1;
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
      span {
        flex: 1;
        text-align: center;
      }
      .tm {
        font-size: 0.24rem;
        font-weight: 600;
        color: #fff0c4;
      }
      .gift {
        font-size: 0.24rem;
        font-weight: 600;
        color: #fed463;
        em {
          font-size: 0.26rem;
        }
        i {
          font-size: 0.26rem;
        }
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
