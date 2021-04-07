<template>
  <div class="history">
    <i class="close" @click="$parent.showHistory = false"></i>
    <div class="title">中獎記錄</div>
    <ul class="list scrollable">
      <li v-for="(item,index) in list" :key="index">
        <div class="tips">
          <span>{{getTipsStr(item.type,item)}}</span>
          <!-- 十連抽提示 -->
          <div class="tenGifts" v-if="item.type == 'light' && item.count == 10">
            <em v-for="(item,index) in item.prizes" :key="index">
              {{item.name}}*1
            </em>
          </div>
        </div>
        <span class="tm">{{getTmStr(item.time)}}</span>
      </li>
    </ul>
  </div>
</template>

<script>

import { getHistoryList } from "../apis"
import getDate from "../utils/getDate"
export default {
  data () {
    return {
      list: [],
      tipes: {
        turntable: "參與轉盤抽獎,獲得$",
        luckDraw: "首次點亮%個星座,獲得轉盤抽獎機會一次",
        light: '點亮一次,獲得$',
        light_tm: '點亮10次',
        firstLight: ''
      },
      loaded: false,
      more: true
    }
  },
  created () {
    getHistoryList(0).then(res => {
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
    getTipsStr (type, item) {
      console.log(type)
      if (type == 'light') {
        if (item.count == 10) {
          return this.tipes.light_tm
        } else {
          return this.tipes[light].replace('$', item.prizes[0].name)
        }

      } else {
        return this.tipes[type].replace('$', item.name).replace('%', item.count)
      }
    },
    getTmStr (tm) {
      return getDate(new Date(tm * 1000), 1)
    },
    onScroll () {
      const scrollToBottom = this.scrollable.scrollTop + this.scrollable.clientHeight >= this.scrollable.scrollHeight - 10;
      if (scrollToBottom) { //滾動加載，沒有加載完成
        if (this.loaded) return
        if (this.more) {
          this.more = false
          getHistoryList(this.list.length, 'more').then(res => {
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
  }

}
</script>

<style lang="scss">
.history {
  width: 7.07rem;
  height: 7.53rem;
  background: url(../img/history.png);
  background-size: 100% 100%;
  position: relative;
  .close {
    width: 0.69rem;
    height: 0.69rem;
    background: url(../img/close.png);
    background-size: 100% 100%;
    position: absolute;
    right: -0.15rem;
    top: -0.15rem;
  }
  .title {
    height: 0.8rem;
    text-align: center;
    line-height: 0.8rem;
    font-size: 0.32rem;
    color: #fff;
  }
  ul {
    color: #fff;
    max-height: 6.2rem;
    overflow-x: hidden;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
    -webkit-overflow-scrolling: auto;
    margin-top: 0.2rem;
    li {
      padding: 0 0.32rem;
      display: flex;
      align-items: center;
      font-size: 0.28rem;
      margin-bottom: 0.15rem;
      .tips {
        width: 4rem;
        .tenGifts {
          em {
            font-size: 0.28rem;
          }
        }
      }
      .tm {
        flex: 1;
        color: rgba(246, 223, 254, 1);
        font-size: 0.26rem;
        text-align: center;
      }
    }
  }
}
</style>