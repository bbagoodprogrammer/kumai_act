<template>
  <div class="histroy">
    <i class="close" @click="closePup()"></i>
    <div class="firstInTitle">
      <i class="liner_l"></i>
      <strong>{{lang.history_title}}</strong>
      <i class="liner_r"></i>
    </div>
    <p class="noData">{{lang.history_noData}}</p>
    <ul class='scrollable'>
      <li v-for="(item,index) in list" :key="index">
        <span class="msg">{{type[item.type].replace('%n',item.name).replace('%s',item.num).replace('%b',item.score)}}</span>
        <span class="tm">{{getDate(item.tm)}}</span>
      </li>
    </ul>
  </div>
</template>

<script>

import { history } from "../apis"
import getDate from "../utils/getDate"

export default {
  data () {
    return {
      list: [],
      //   type: {
      //     synthesis: '合成【%n】*%s，戰鬥力+%b',
      //     divination: '【今日占卜】，戰鬥力+%b',
      //     receive: '收到【%n】*%s，戰鬥力+%b'
      //   },
      loaded: false,
      more: true,
    }
  },
  computed: {
    type () {
      return this.lang.history_type
    }
  },
  created () {
    history().then(res => {
      this.list = res.data.response_data.list
    })
  },
  mounted () {
    this.scrollable = this.$el.querySelector('.scrollable');
    if (this.scrollable) {
      this.scrollable.addEventListener('scroll', this.onScroll);
    }
  },
  methods: {
    getDate (tm) {
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
          history(this.list.length, 'more').then(res => {
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
    closePup () {
      this.$parent.showHistory = false
    }
  }
}
</script>

<style lang="scss">
.histroy {
  width: 5.75rem;
  height: 6.73rem;
  padding: 0 0.5rem;
  background: url(../img/history.png);
  background-size: 100% 100%;
  position: relative;
  .close {
    display: block;
    width: 0.79rem;
    height: 0.78rem;
    background: url(../img/close.png);
    background-size: 100% 100%;
    position: absolute;
    right: 0.44rem;
    top: 0;
  }
  .noData {
    text-align: center;
    margin-top: 0.5rem;
    color: #330D0E;
  }
  .firstInTitle {
    margin-top: 0.79rem;
    text-align: center;
    color: #330D0E;
    display: flex;
    align-items: center;
    justify-content: center;
    .liner_l {
      width: 1.67rem;
      height: 0.21rem;
      background: url(../img/liner_l2.png);
      background-size: 100% 100%;
      margin-right: 0.15rem;
    }
    strong {
      flex: 1;
      font-size: 0.28rem;
    }
    .liner_r {
      width: 1.67rem;
      height: 0.21rem;
      background: url(../img/liner_r2.png);
      background-size: 100% 100%;
      margin-left: 0.15rem;
    }
  }
  ul {
    margin-top: 0.35rem;
    height: 4.5rem;
    overflow-y: scroll;
    li {
      display: flex;
      align-items: center;
      margin-bottom: 0.25rem;
      .msg {
        width: 3.5rem;
        color: #96451D;
        font-size: 0.28rem;
      }
      .tm {
        flex: 1;
        color: #613610;
        font-size: 0.28rem;
        margin-left: 0.2rem;
      }
    }
  }
}
</style>