<template>
  <div class="footer">
    <div class="fLeft">
      <div class="backBox">
        <span class="history" @click="chowHistory()"></span>
        <span class="rule" @click="showTipsType()"></span>
      </div>
    </div>
    <div class="fRight">
      <span v-for="(item,index) in userStock" :key="index">
        <img :src="require(`../img/footerIcon/${item.icon}.png`)" alt="">
        <em>{{userNum[item.icon] || 0}}</em>
      </span>
    </div>
    <div class="tips1" :style="{height:pupHeight+'px'}" v-show="showTips">
      <transition name="slide">
        <div class="tipsCon" v-show="showTips">
          <div class="title"> {{lang.footer_rule_title}}<i class="close" @click="closeTips1()"></i></div>
          <div class="con">
            <p>{{lang.footer_rule_p1}}</p>
            <p>{{lang.footer_rule_p2}}</p>
            <p>{{lang.footer_rule_p3}}</p>
            <p>{{lang.footer_rule_p4}}</p>
            <p>{{lang.footer_rule_p5}}</p>
            <p>{{lang.footer_rule_p6}}</p>
            <p>{{lang.footer_rule_p7}}</p>
          </div>
        </div>
      </transition>
    </div>
    <div class="historyList" :style="{height:pupHeight+'px'}" v-show="showHistory">
      <transition name="slide">
        <div class="historyCon" v-show="showHistory">
          <div class="title">{{lang.footer_history_title}}<i class="close" @click="closeHistory()"></i></div>
          <div class="list">
            <p v-if="loading" class="loadingTips">{{lang.common_loading}}</p>
            <p class="noDateTips" v-if="record.length==0 && !loading">{{lang.footer_history_noData}}</p>
            <ul class="scrollable">
              <li v-for="(item,index) in record" :key="index">
                <span class="time">{{getTime(item.tm)}}</span>
                <div class="gift">
                  <!-- <img src="../img/icon1.png" alt="">
                  <em>x99</em> -->
                  {{lang.footer_co}} <em>{{item.status==0?lang.title:lang.title_box}}</em> {{lang.footer_get}} <em>{{item.name}}</em>{{item.emty}}
                </div>
              </li>
            </ul>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex"
import api from "../apis"
import getDate from "../utils/getDate"
export default {
  props: ["user_wallet", "type", "height"],
  data() {
    return {
      showTips: false,
      showHistory: false,
      loaded: false,
      more: true,
      record: [],
      loading: false,
      userStock: [
        {
          icon: 'ticket',
          num: 0
        },
        {
          icon: 'lock_box',
          num: 1
        },
        {
          icon: 'box_key',
          num: 0
        },
        {
          icon: 'icon_puzzle',
          num: 0
        },
        {
          icon: 'gift_puzzle',
          num: 0
        }
      ],
      // numberArr: {
      //   0: require('../img/number/0.png'),
      //   1: require('../img/number/1.png'),
      //   2: require('../img/number/2.png'),
      //   3: require('../img/number/3.png'),
      //   4: require('../img/number/4.png'),
      //   5: require('../img/number/5.png'),
      //   6: require('../img/number/6.png'),
      //   7: require('../img/number/7.png'),
      //   8: require('../img/number/8.png'),
      //   9: require('../img/number/9.png'),
      // }
    }
  },
  computed: {
    ...mapState(["shoCom", "userMsg", "mainHeight"]),
    userNum() {
      if (this.user_wallet && this.type) {
        return this.user_wallet
      } else {
        return this.userMsg
      }
    },
    pupHeight() {
      if (this.type) {
        return sessionStorage.getItem('pupHeight')
      } else {
        return this.mainHeight
      }
    }
  },
  mounted() {
    this.scrollable = this.$el.querySelector('.scrollable');
    if (this.scrollable) {
      this.scrollable.addEventListener('scroll', this.onScroll);
    }
  },
  methods: {
    showTipsType() {
      if (this.shoCom == 'Trun') {
        this.showTips = 1
      } else {
        this.showTips = 2
      }
    },
    chowHistory() {
      this.record = []
      this.showHistory = true
      // if (this.record.length == 0) {
      this.loading = true
      api.getHistroy(0).then(res => {
        this.loading = false
        this.record = res.data.response_data.record
      })
      // }
    },
    goknapsack() {
      var u = navigator.userAgent;
      var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
      var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
      if (isAndroid) {
        location.href = `goto:{"controller":"com.utalk.hsing.activity.MyPackActivity","property": {}}`
      } else {
        location.href = "goto:packet"
      }
    },
    onScroll() {
      console.log('xxxx')
      const scrollToBottom = this.scrollable.scrollTop + this.scrollable.clientHeight >= this.scrollable.scrollHeight - 10;
      if (scrollToBottom) { //滾動加載，沒有加載完成
        if (this.loaded) return
        if (this.more) {
          this.more = false
          api.getHistroy(this.record.length).then(res => {
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
    getNumber(number) {
      if (number >= 0) {
        var numberSpr = String(number).split('')
        return numberSpr
      }
    },
    getTime(tm) {
      return getDate(new Date(tm * 1000), '~')
    },
    closeTips1() {
      this.showTips = 0
    },
    closeHistory() {
      this.showHistory = false
    }
  }
}
</script>
<style lang= "scss" scoped>
.footer {
  height: 0.79rem;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  /* z-index: -1; */
  background: rgba(255, 255, 255, 0.15);
  display: flex;
  align-items: center;
  justify-content: space-between;
  .fRight {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 0.15rem;
    span {
      min-width: 0.8rem;
      margin-right: 0.1rem;
      img {
        display: inline-block;
        vertical-align: middle;
        width: 0.4rem;
        height: 0.4rem;
      }
      em {
        font-size: 0.24rem;
      }
    }
  }
  .fLeft {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 0.31rem;
    .backBox {
      width: 1.5rem;
      display: flex;
      align-items: center;
      .history {
        width: 0.4rem;
        height: 0.4rem;
        background: url(../img/footerIcon/history.png);
        background-size: 100% 100%;
      }
      .rule {
        width: 0.4rem;
        height: 0.4rem;
        margin-left: 0.26rem;
        background: url(../img/footerIcon/quester.png);
        background-size: 100% 100%;
      }
    }
  }
  .tips1 {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.8);
    z-index: 10000;
    display: flex;
    align-items: center;
    justify-content: center;
    .tipsCon {
      width: 5.2rem;
      height: 6rem;
      background: rgba(124, 65, 241, 1);
      border-radius: 0.16rem;
      /* position: absolute;
      top: 2.26rem;
      left: 1.14rem; */
      .title {
        font-size: 106%;
        height: 0.9rem;
        line-height: 0.9rem;
        padding-left: 0.3rem;
        background: rgba(255, 255, 255, 0.1);
        border-radius: 0.16rem 0.16rem 0px 0px;
        position: relative;
        .close {
          display: block;
          width: 0.37rem;
          height: 0.37rem;
          background: url(../img/close.png);
          background-size: 100% 100%;
          position: absolute;
          top: 0.27rem;
          right: 0.3rem;
        }
      }
      .con {
        line-height: 0.4rem;
        color: #cccccc;
        padding: 0.39rem 0.28rem 0;
        max-height: 4.5rem;
        overflow-y: scroll;
        p {
          font-size: 0.26rem;
        }
      }
    }
  }
  .historyList {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.8);
    z-index: 10000;
    display: flex;
    align-items: center;
    justify-content: center;
    .historyCon {
      width: 5.2rem;
      background: rgba(124, 65, 241, 1);
      border-radius: 0.16rem;
      /* position: absolute;
      top: 2.26rem;
      left: 1.14rem; */
      .title {
        font-size: 106%;
        height: 0.9rem;
        line-height: 0.9rem;
        padding-left: 0.3rem;
        background: rgba(255, 255, 255, 0.1);
        border-radius: 0.16rem 0.16rem 0px 0px;
        position: relative;
        .close {
          display: block;
          width: 0.37rem;
          height: 0.37rem;
          background: url(../img/close.png);
          background-size: 100% 100%;
          position: absolute;
          top: 0.27rem;
          right: 0.3rem;
        }
      }
      .list {
        height: 3.2rem;
        /* display: flex;
        align-items: center;
        justify-content: center; */
        .scrollable {
          width: 4.6rem;
          height: 2.8rem;
          overflow-y: scroll;
          -webkit-overflow-scrolling: touch;
          padding: 0 0.3rem 0.2rem;
          margin-right: 0.1rem;
          li {
            font-size: 86%;
            color: #cccccc;
            display: flex;
            align-items: center;
            /* justify-content: space-between; */
            min-height: 0.69rem;
            border-bottom: 0.015rem solid rgba(255, 255, 255, 0.1);
            .gift {
              em {
                font-size: 0.26rem;
                color: #fedd29;
              }
            }
            .time {
              width: 1.8rem;
            }
          }
        }
        .scrollable::-webkit-scrollbar {
          width: 0.06rem;
        }
        .scrollable::-webkit-scrollbar-thumb {
          width: 0.06rem;
          background: rgba(255, 255, 255, 0.15);
        }
        .noDateTips,
        .loadingTips {
          text-align: center;
        }
      }
    }
  }
}
</style>
