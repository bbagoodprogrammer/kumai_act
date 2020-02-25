<template>
  <div class="footer">
    <div class="fLeft">
      <div class="ticket" v-if="shoCom == 'Trun'">
        <i class="tickTips"></i>
        <img v-for="(item,index) in getNumber(userMsg.ticket)" :key="index" :src="numberArr[item]" alt="">
      </div>
      <div class="lackBox" v-else>
        <i class="boxTips"></i>
        <img v-for="(item,index) in getNumber(userMsg.lock_box)" :key="index+'2'" :src="numberArr[item]" alt="">
        <i class="keyTips"></i>
        <img v-for="(item,index) in getNumber(userMsg.box_key)" :key="index+'1'" :src="numberArr[item]" alt="">
      </div>
    </div>
    <div class="fRight">
      <span class="quster">
        <i @click="showTipsType"></i>
      </span>
      <div class="backBox">
        <span class="history" @click="chowHistory()"></span>
        <span class="back" @click="goknapsack()"></span>
      </div>
    </div>
    <div class="tips1" v-show="showTips == 1 || showTips == 2">
      <transition name="slide">
        <div class="tipsCon" v-show="showTips == 1 || showTips == 2">
          <div class="title">{{showTips ==1 ?tipsTitle1:tipsTitle2}} <i class="close" @click="closeTips1()"></i></div>
          <div class="con" v-html="showTips ==1?tipsCon1:tipsCon2">
          </div>
        </div>
      </transition>
    </div>
    <div class="historyList" v-show="showHistory">
      <transition name="slide">
        <div class="historyCon" v-show="showHistory">
          <div class="title">抽獎記錄<i class="close" @click="closeHistory()"></i></div>
          <div class="list">
            <p v-if="loading" class="loadingTips">加载中...</p>
            <p class="noDateTips" v-if="record.length==0 && !loading">暫無抽獎信息！</p>
            <ul class="scrollable">
              <li v-for="(item,index) in record" :key="index">
                <span class="time">{{getTime(item.tm)}}</span>
                <span class="ward">從 <em>{{item.status==0?'幸運轉盤':'驚喜寶箱'}}</em> 抽出 <em>{{item.name}}</em></span>
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
import api from "../api/apiConfig"
import getDate from "../utils/getDate"
export default {
  data() {
    return {
      showTips: 0,
      tipsTitle1: '如何獲取抽獎券？',
      tipsTitle2: '關於寶箱和鑰匙',
      tipsCon1: '在任意K房內每送出滿100金幣的禮物，即可免費獲得一張抽獎券。',
      tipsCon2: '當你獲得寶箱和其對應鑰匙後，即可打開寶箱獲取神秘獎勵 </br >* 你可通過玩轉盤或者特定方法獲取寶箱和鑰匙',
      showHistory: false,
      loaded: false,
      more: true,
      record: [],
      loading: false,
      numberArr: {
        0: require('../assets/img/number/0.png'),
        1: require('../assets/img/number/1.png'),
        2: require('../assets/img/number/2.png'),
        3: require('../assets/img/number/3.png'),
        4: require('../assets/img/number/4.png'),
        5: require('../assets/img/number/5.png'),
        6: require('../assets/img/number/6.png'),
        7: require('../assets/img/number/7.png'),
        8: require('../assets/img/number/8.png'),
        9: require('../assets/img/number/9.png'),
      }
    }
  },
  computed: {
    ...mapState(["shoCom", "userMsg"])
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
  height: 0.97rem;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(255, 255, 255, 0.15);
  display: flex;
  align-items: center;
  justify-content: space-between;
  .fLeft {
    margin-left: 0.3rem;
    .ticket {
      display: flex;
      align-items: center;
      color: #fef129;
      font-size: 150%;
      font-family: Nike Total 90;
      i {
        display: block;
        width: 0.64rem;
        height: 0.57rem;
        background: url(../assets/img/ticketTips.png);
        background-size: 100% 100%;
        margin-right: 0.06rem;
      }
      img {
        width: 0.16rem;
        height: 0.34rem;
      }
    }
    .lackBox {
      display: flex;
      align-items: center;
      img {
        width: 0.16rem;
        height: 0.34rem;
      }
      em {
        color: #fef129;
        font-size: 150%;
        font-family: Nike Total 90;
      }
      .boxTips {
        width: 0.65rem;
        height: 0.64rem;
        background: url(../assets/img/box.png);
        background-size: 100% 100%;
        margin-right: 0.06rem;
      }
      .keyTips {
        width: 0.63rem;
        height: 0.63rem;
        background: url(../assets/img/key.png);
        background-size: 100% 100%;
        margin: 0 0.06rem 0 0.4rem;
      }
    }
  }
  .fRight {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 0.3rem 0;
    .quster {
      display: block;
      width: 0.48rem;
      height: 0.48rem;
      padding-right: 0.2rem;
      border-right: 0.01rem solid rgba(0, 0, 0, 0.3);
      i {
        display: block;
        width: 0.45rem;
        height: 0.45rem;
        background: url(../assets/img/quester.png);
        background-size: 100% 100%;
        margin: 0.015rem;
      }
    }
    .backBox {
      width: 1.5rem;
      display: flex;
      justify-content: space-between;
      .history {
        width: 0.73rem;
        height: 0.73rem;
        background: url(../assets/img/history.png);
        background-size: 100% 100%;
      }
      .back {
        width: 0.73rem;
        height: 0.73rem;
        background: url(../assets/img/back.png);
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
    .tipsCon {
      width: 5.2rem;
      padding-bottom: 0.25rem;
      background: rgba(124, 65, 241, 1);
      border-radius: 0.16rem;
      position: absolute;
      top: 2.26rem;
      left: 1.14rem;
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
          background: url(../assets/img/close.png);
          background-size: 100% 100%;
          position: absolute;
          top: 0.27rem;
          right: 0.3rem;
        }
      }
      .con {
        font-size: 86%;
        color: #cccccc;
        margin: 0.25rem 0.31rem 0 0.31rem;
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
    .historyCon {
      width: 5.2rem;
      background: rgba(124, 65, 241, 1);
      border-radius: 0.16rem;
      position: absolute;
      top: 2.26rem;
      left: 1.14rem;
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
          background: url(../assets/img/close.png);
          background-size: 100% 100%;
          position: absolute;
          top: 0.27rem;
          right: 0.3rem;
        }
      }
      .list {
        height: 3.2rem;
        display: flex;
        align-items: center;
        justify-content: center;
        .scrollable {
          max-height: 3rem;
          overflow-y: scroll;
          -webkit-overflow-scrolling: touch;
          padding: 0 0.3rem 0.2rem;
          margin-right: 0.1rem;
          li {
            font-size: 86%;
            color: #cccccc;
            display: flex;
            align-items: center;
            min-height: 0.5rem;
            .time {
              width: 1.2rem;
            }
            .ward {
              margin-left: 0.3rem;
            }
            em {
              color: #fedd29;
              font-size: 0.26rem;
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
          margin-left: 0.8rem;
        }
      }
    }
  }
}
</style>
