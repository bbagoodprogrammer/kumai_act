<template>
  <div class="petBar">
    <div class="barTips">
      <p>每收到一種禮物可解鎖一級獎勵 <br />已有<em>{{nums}}</em> 位歌友收集齊6種禮物</p>
      <span class="pHistory" @click="shoHistoryList()"></span>
    </div>
    <div class="barItem">
      <div class="liner">
        <span class="store" :style="{left:getLeft(index)}" :class="{act:shucle >= index}" v-for="(item,index) in petObj" :key="index">
          <em class="gift">
            <img :src="require(`../assets/img/giftIcon/${item.gift.type +'_act'}.png`)" alt="" v-if="shucle >= index">
            <img :src="require(`../assets/img/giftIcon/${item.gift.type}.png`)" alt="" v-else>
            <strong>{{item.gift.num?`x${item.gift.num}`:`${item.gift.day}天`}}</strong>
          </em>
        </span>
        <div class="actLiner" :style="{width: (shucle -1)/ 5 *100+'%'}"></div>
      </div>
    </div>
    <!-- 歷史記錄 -->
    <div class="mask" v-show="showList">
      <transition name="slide">
        <div class="historyList" v-show="showList">
          <i class="close" @click="closeHistory()"></i>
          <div class="title"></div>
          <div class="tabHeader">
            <span>贈送者</span>
            <span>收集時間</span>
            <span>收集禮物</span>
          </div>
          <p class="noData" v-if="!pList.length">暫無收集紀錄</p>
          <ul class="scrollable">
            <li v-for="(item,index) in pList" :key="index">
              <span class="people" @click="goUser(item.uid)">
                <img v-lazy="item.avatar" alt="">
              </span>
              <span class="time">{{getTime(item.time)}}</span>
              <span class="name">
                <img :src="item.img" alt="">*{{item.num}}
              </span>
            </li>
          </ul>
        </div>
      </transition>
    </div>
  </div>
</template>
<script>
import api from "../api/apiConfig"
import { mapState } from "vuex"
import getDate from "../utils/getDate"
export default {
  props: ['nums', 'shucle'],
  data() {
    return {
      petObj: {
        1: {
          gift: {
            type: 'beat',
            num: 20
          }
        },
        2: {
          gift: {
            type: 'beat',
            num: 60
          }
        },
        3: {
          gift: {
            type: 'gift2',
            num: 1
          }
        },
        4: {
          gift: {
            type: 'gift1',
            num: 1
          }
        },
        5: {
          gift: {
            type: 'vip',
            day: 7
          }
        },
        6: {
          gift: {
            type: 'car',
            day: 7
          }
        },
      },
      showList: false,
      pList: [],
      more: true,
      loaded: false
    }
  },
  mounted() {
    this.scrollable = this.$el.querySelector('.scrollable');
    if (this.scrollable) {
      this.scrollable.addEventListener('scroll', this.onScroll);
    }
  },
  methods: {
    getLeft(index) {
      if (index == 1) {
        return '-1.3%'
      } else if (index == 6) {
        return ((index - 1) * 20) - 2.9 + '%'
      } else {
        return (index - 1) * 20 - 1.45 + '%'
      }
    },
    shoHistoryList() {
      api.record3(0).then(res => {
        this.showList = true
        this.pList = res.data.response_data ? res.data.response_data.list : []
      })
    },
    getTime(tm) {
      return getDate(new Date(tm * 1000), 1)
    },
    onScroll() {
      const scrollToBottom = this.scrollable.scrollTop + this.scrollable.clientHeight >= this.scrollable.scrollHeight - 10;
      if (scrollToBottom) { //滾動加載，沒有加載完成
        if (this.loaded) return
        if (this.more) {
          this.more = false
          api.record3(this.pList.length, 'more').then(res => {
            this.more = true
            if (res.data.response_data.list.length === 0) {
              this.loaded = true
            } else {
              this.pList = this.pList.concat(res.data.response_data.list)
            }
          })
        }
      }
    },
    closeHistory() {
      this.showList = false
    },
    goUser(uid) { //跳转
      location.href = `uid:${uid}`
    },
  }
}
</script>
<style lang="scss">
.barTips {
  height: 0.76rem;
  margin: 0.42rem 0 0.24rem;
  position: relative;
  p {
    font-size: 0.24rem;
    text-align: center;
    line-height: 0.4rem;
    em {
      font-size: 0.24rem;
      color: rgba(255, 252, 169, 1);
    }
  }
  .pHistory {
    width: 1.66rem;
    height: 0.68rem;
    background: url(../assets/img/pHistory.png);
    background-size: 100% 100%;
    position: absolute;
    right: 0.22rem;
    top: 0.06rem;
  }
}
.barItem {
  width: 7.17rem;
  height: 2rem;
  background: url(../assets/img/petNumsBg.png);
  background-size: 100% 100%;
  margin: 0.15rem auto;
  padding-top: 0.1rem;
  .liner {
    width: 5.41rem;
    height: 0.08rem;
    background: rgba(121, 121, 121, 1);
    margin: 0 auto;
    position: relative;
    border-radius: 0.04rem;
    margin-top: 0.4rem;
    .store {
      display: block;
      width: 0.16rem;
      height: 0.16rem;
      background: #797979;
      border-radius: 50%;
      position: absolute;
      top: -0.05rem;
      z-index: 10;
      &.act {
        width: 0.26rem;
        height: 0.26rem;
        background: url(../assets/img/actPoint.png);
        background-size: 100% 100%;
        top: -0.1rem;
      }
      .gift {
        position: absolute;
        left: -0.3rem;
        top: 0.27rem;
        img {
          width: 0.72rem;
          height: 0.72rem;
        }
        strong {
          display: block;
          text-align: center;
          font-size: 0.24rem;
          white-space: nowrap;
          margin-top: -0.05rem;
        }
      }
    }
    .actLiner {
      height: 0.08rem;
      border-radius: 0.04rem;
      background: linear-gradient(
        270deg,
        rgba(255, 129, 248, 0.99),
        rgba(255, 236, 111, 0.99)
      );
      position: absolute;
      top: 0;
      left: 0;
    }
  }
}
.noData {
  margin-top: 0.6rem;
  text-align: center;
}
.historyList {
  width: 7.16rem;
  height: 9.91rem;
  background: url(../assets/img/giftBg2.png);
  background-size: 100% 100%;
  position: relative;
  .title {
    width: 1.89rem;
    height: 0.69rem;
    background: url(../assets/img/shouTitle.png);
    background-size: 100% 100%;
    margin: 0.72rem auto 0.2rem;
  }
  .tabHeader {
    width: 5.6rem;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
  }
  .scrollable {
    width: 5.6rem;
    height: 7rem;
    margin: 0.2rem auto;
    overflow-x: hidden;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
    -webkit-overflow-scrolling: auto;
    li {
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 0.24rem;
      margin-bottom: 0.15rem;
      .people {
        img {
          width: 0.64rem;
          height: 0.64rem;
          border-radius: 50%;
          border: 0.03rem solid RGBA(191, 143, 230, 1);
        }
      }
      .name {
        width: 1.2rem;
        display: flex;
        align-items: center;
        img {
          width: 0.55rem;
          height: 0.55rem;
        }
      }
    }
  }
  .close {
    display: block;
    width: 0.42rem;
    height: 0.42rem;
    position: absolute;
    top: 0rem;
    right: 0.18rem;
    background: url(../assets/img/close.png);
    background-size: 100% 100%;
  }
}
</style>
