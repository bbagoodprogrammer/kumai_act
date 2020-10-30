<template>
  <div class="turnBox">
    <div class="coins">{{lang.GameB}}<em>{{daily_b}}</em><i></i></div>
    <div class="turntable">
      <span class="giftHistory" @click="goHistory()"></span>
      <div class="giftItem" :style="{transform:'rotate('+nowAngle+'deg)'}"></div>
      <div class="needld">
        <div class="oneLuck" @click="luckGO(1)"></div>
        <div class="fireLuck" @click="luckGO(5)"></div>
      </div>
    </div>
    <transition name="slide">
      <msg-toast :msg="tastMsg" @closeToast="closeToast()" v-show="showT"></msg-toast>
    </transition>
    <!-- 禮物彈窗 -->
    <div class="mask" v-show="showGetGift">
      <transition name="slide">
        <div class="getGiftCon" :class="{five:getGift_list.length == 5}" v-if="showGetGift">
          <span class="close" @click="closeGetGift()"></span>
          <div class="giftItemBox">
            <p class="fiveTitle" v-if="getGift_list.length == 5">{{lang.fiveTips}}</p>
            <div class="gift">
              <span v-for="(item,index) in getGift_list" :key="index">
                <div class="imgBox">
                  <img :src="getWardImg(item)" alt="" :class="'img'+index">
                </div>
                <p class="giftName">{{getWardName(item)}}</p>
              </span>
            </div>
            <p class="luckGiftTips" v-if="getGift_list.length == 1">恭喜您成功抽中了 <em>{{getWardName(getGift_list[0])}}</em> </p>
            <p class="luckGiftTips"><em>{{getGiftTips(getGift_list)}}</em> </p>
          </div>
        </div>
      </transition>
    </div>
    <!-- 遊戲幣不足彈窗 -->
    <div class="mask" v-show="showNoCoins">
      <transition name="slide">
        <div class="noCoinsCon" v-show="showNoCoins">
          <span class="close" @click="closeNoCoins()"></span>
          <div class="title">{{lang.noCointTitle}}</div>
          <p>{{lang.noCoinsTips4}}</br>{{lang.noCoinsTips2}}</p>
          <span class="doTask" @click="goTask()"></span>
        </div>
      </transition>
    </div>
    <!-- 抽獎記錄 -->
    <div class="mask" v-show="showHistory">
      <transition name="slise">
        <div class="historyPup" v-show="showHistory">
          <i class="close" @click="closeHistory()"></i>
          <div class="title"></div>
          <div class="tabHeader">
            <span>抽獎時間</span>
            <span>獲得的獎品</span>
          </div>
          <p class="noData" v-if="!historyList.length">抽獎記錄空空如也<br />快去賺取盛典幣抽獎吧！</p>
          <ul class="scrollable">
            <li v-for="(item,index) in historyList" :key="index">
              <span class="time">{{getTime(item.time)}}</span>
              <span class="name">{{getWardName(item.tid)}}</span>
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
import MsgToast from "../components/commonToast"
import getString from "../utils/getString"
import getDate from "../utils/getDate"
import { globalBus } from "../utils/eventBus"
import { wardImg, wardName } from "../config/ward"
import lang from "../config/lang"
export default {
  components: { MsgToast },
  data() {
    return {
      giftAngle: {
        1: 0, //小星星礼物
        2: 330, //vip
        3: 300,  //40盛典币
        4: 270,  //2张欢卡
        5: 240,  //50金币
        6: 210,    //荧光棒
        7: 180,   //VIP3天
        8: 150,    //5%储值返利券
        9: 120,  //葡萄
        10: 90,  //满50送5送礼券
        11: 60,   //座驾
        12: 30,   //润喉糖
      },
      nowAngle: 0,
      giftIndex: 0,
      tastMsg: '',
      showT: false,
      getGift_list: [],
      showGetGift: false,
      showNoCoins: false,
      luckIng: false,
      historyList: [],
      showHistory: false,
      more: true,
      loaded: false
    }
  },
  computed: {
    ...mapState(['groupsUserMsg', 'daily_b', 'registered'])
  },
  mounted() {
    this.scrollable = this.$el.querySelector('.scrollable');
    if (this.scrollable) {
      this.scrollable.addEventListener('scroll', this.onScroll);
    }
  },
  methods: {
    luckGO(val) {
      globalBus.$emit('commonEvent', callback => {
        if (this.luckIng) return
        if (!this.registered) {
          this.tastMsg = lang.NoSingUp
          this.showT = true
        } else {
          if (this.daily_b < 20 * val) {
            this.showNoCoins = true
          } else {
            this.luckIng = true
            api.go(val == 1 ? 1 : 2).then(res => {
              if (res.data.response_status.code == 0) {
                this.getGift_list = res.data.response_data.prize
                this.giftIndex = this.getGift_list[0]
                this.turnAngle()     //動畫開始
                setTimeout(() => {   //禮物彈窗
                  this.showGetGift = true
                  this.$store.commit('reduceB', val * 20)
                  // this.$store.commit('addTotalScore', val * 20)
                  var coins = 0
                  this.getGift_list.forEach(element => {
                    if (element == 3) {
                      coins += 40
                    }
                  })
                  this.$store.commit('addB', coins)
                  this.luckIng = false
                }, 5000);
              } else {
                this.tastMsg = res.data.response_status.error
                this.showT = true
              }
            })
          }
        }
      })
    },
    turnAngle() {
      if (this.nowAngle % 360 > this.giftAngle[this.giftIndex]) { //目标礼物在前面
        this.nowAngle += 1800 + (this.giftAngle[this.giftIndex] - this.nowAngle % 360)
      } else if (this.nowAngle % 360 < this.giftAngle[this.giftIndex]) {
        this.nowAngle += 1800 + (360 - (this.nowAngle % 360)) + this.giftAngle[this.giftIndex]
      } else if (this.nowAngle % 360 == this.giftAngle[this.giftIndex]) {
        this.nowAngle += 1800
      }
    },
    getWardImg(giftId) {
      return wardImg[giftId]
    },
    getWardName(giftId) {
      return wardName[giftId]
    },
    getTime(tm) {
      return getDate(new Date(tm * 1000), 1)
    },
    getGiftTips(gitfList) {
      if (gitfList.length == 1) {
        let gid = gitfList[0]
        if (gid == 4) {
          return `歡卡為年度人物評選活動的投票券，可在年度人物評選活動中投出`
        } else if (gid == 1 || gid == 6 || gid == 9 || gid == 12) {
          return `有效期為7天`
        } else if (gid == 2 || gid == 8 || gid == 10) {
          return '有效期為1天'
        } else {
          return ''
        }
      } else {
        let str = ''
        let arr = Array.from(new Set(gitfList))
        let status = false
        let status2 = false
        let strArr = []
        arr.forEach(element => {
          if (element == 4) {
            strArr.push('歡卡為年度人物評選活動的投票券')
          } else if ((element == 1 || element == 6 || element == 9 || element == 12) && !status) {
            status = true
            strArr.push('背包禮物有效期為7天')
          } else if (element == 8) {
            strArr.push('儲值券有效期為1天')
          } else if ((element == 2 || element == 10) && !status2) {
            status2 = true
            strArr.push('送禮券有效期為1天')
          }
        });
        return strArr.join(',') + '。'
      }
    },
    closeGetGift() {
      this.showGetGift = false
    },
    closeToast() {
      this.showT = false
    },
    goHistory() {
      api.record1(0).then(res => {
        this.historyList = res.data.response_data.list
        this.showHistory = true
      })
    },
    goTask() {
      this.showNoCoins = false
      this.scorllTo('taskTabs')
    },
    closeNoCoins() {
      this.showNoCoins = false
    },
    onScroll() {
      const scrollToBottom = this.scrollable.scrollTop + this.scrollable.clientHeight >= this.scrollable.scrollHeight - 10;
      if (scrollToBottom) { //滾動加載，沒有加載完成
        if (this.loaded) return
        if (this.more) {
          this.more = false
          api.record1(this.historyList.length, 'more').then(res => {
            this.more = true
            if (res.data.response_data.list.length === 0) {
              this.loaded = true
            } else {
              this.historyList = this.historyList.concat(res.data.response_data.list)
            }
          })
        }
      }
    },
    closeHistory() {
      this.showHistory = false
    },
    scorllTo(className) {
      let a = document.getElementsByClassName(className)[0].getBoundingClientRect().top
      let c = document.documentElement.scrollTop
      let e = a + c + 10
      this.timer = setInterval(() => {
        const scrollToBottom = (document.documentElement.scrollTop || document.body.scrollTop) + window.innerHeight >= document.body.scrollHeight - 10;
        let c = document.documentElement.scrollTop
        let t = (e - c) / 10
        window.scrollTo(0, c + t)
        if (t < 1 || scrollToBottom) {
          clearInterval(this.timer)
        }
      }, 10)
    },
  }
}
</script>
<style lang="scss" scoped>
.turnBox {
  position: relative;
  height: 8.02rem;
  padding-top: 0.42rem;
  background: url(../assets/img/turnBg.png) -0.38rem 0 no-repeat;
  background-size: auto 100%;
  margin-top: 0.35rem;
  .coins {
    display: flex;
    align-items: center;
    font-size: 0.28rem;
    position: absolute;
    top: 0rem;
    left: 0.2rem;
    i {
      display: block;
      width: 0.35rem;
      height: 0.36rem;
      background: url(../assets/img/coins.png);
      background-size: 100% 100%;
      margin-right: 0.05rem;
    }
    em {
      font-size: 0.28rem;
      color: rgba(255, 243, 140, 1);
      margin: 0 0.1rem 0 0.1rem;
    }
  }
  .turntable {
    width: 7.46rem;
    height: 7.46rem;
    margin: 0 auto;
    background: url("../assets/img/turnBg2.png") 0 0 no-repeat;
    background-size: 100% 100%;
    position: relative;
    z-index: 10;
    .giftHistory {
      width: 1.86rem;
      height: 0.68rem;
      background: url(../assets/img/historyBg.png);
      background-size: 100% 100%;
      position: absolute;
      top: -0.5rem;
      right: 0.11rem;
    }
    .giftItem {
      width: 6.08rem;
      height: 6.08rem;
      transition: transform 5s ease;
      background: url(../assets/img/giftItem.png);
      background-size: 100% 100%;
      position: absolute;
      top: 0.7rem;
      left: 0.69rem;
    }
    .needld {
      width: 2.52rem;
      height: 1.85rem;
      padding: 0.5rem 0 0.1rem;
      background: url(../assets/img/needld.png);
      background-size: 100% 100%;
      position: absolute;
      top: 2.33rem;
      left: 2.47rem;
      div {
        width: 1.62rem;
        height: 50%;
        margin: 0 auto;
      }
      .oneLuck {
        background: url(../assets/img/go1.png) 0 0.1rem no-repeat;
        background-size: 100% auto;
        border-radius: 0.6rem 0.6rem 0 0;
      }
      .fireLuck {
        background: url(../assets/img/go10.png);
        background-size: 100% auto;
        border-radius: 0 0 0.6rem 0.6rem;
      }
    }

    @keyframes trun {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(1turn);
      }
    }
  }
}
.noData {
  margin-top: 0.6rem;
  text-align: center;
}
.getGiftCon {
  width: 6.4rem;
  height: 5.2rem;
  background: url(../assets/img/giftBg1.png);
  background-size: 100% 100%;
  position: relative;
  .giftItemBox {
    .fiveTitle {
      text-align: center;
      color: #ffe178;
      margin-top: 0.1rem;
    }
    .gift {
      height: 3.21rem;
      display: flex;
      align-items: center;
      justify-content: center;
      span {
        display: inline-block;
        vertical-align: middle;
        width: 33%;
        height: 1.5rem;
        .imgBox {
          width: 1.24rem;
          height: 1.24rem;
          margin: 0 auto;
          background: url(../assets/img/luckBg.png);
          background-size: 100% 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          img {
            display: block;
            margin: 0 auto;
            width: 1rem;
            height: 1rem;
          }
        }
        .giftName {
          display: block;
          text-align: center;
          font-size: 0.28rem;
          height: 0.3rem;
          line-height: 0.3rem;
          margin-top: 0.05rem;
          padding: 0 0.1rem;
          color: rgba(255, 250, 121, 1);
        }
      }
    }
    .luckGiftTips {
      padding: 0 0.7rem;
      font-size: 0.28rem;
      text-align: center;
      margin-bottom: 0.2rem;
      em {
        font-size: 0.28rem;
        color: rgba(255, 250, 121, 1);
      }
    }
  }
  .close {
    display: block;
    width: 0.42rem;
    height: 0.42rem;
    position: absolute;
    top: 0rem;
    right: 0rem;
    background: url(../assets/img/close.png);
    background-size: 100% 100%;
  }
  &.five {
    width: 7.16rem;
    height: 9.5rem;
    background: url(../assets/img/giftBg2.png);
    background-size: 100% 100%;
    .close {
      right: 0.2rem;
    }
    .fiveTitle {
      height: 1.83rem;
      line-height: 1.83rem;
      color: rgba(255, 255, 255, 1);
      font-size: 0.32rem;
    }
    .gift {
      height: 4.5rem;
      padding: 0 0.51rem;
      flex-wrap: wrap;
      span {
        margin-bottom: 0.6rem;
      }
      .imgBox {
        width: 1.24rem;
        height: 1.24rem;
        margin: 0 auto;
        background: url(../assets/img/luckBg.png);
        background-size: 100% 100%;
        img {
          display: block;
          margin: 0 auto;
        }
      }
      .giftName {
        color: rgba(255, 255, 255, 1) !important;
        font-size: 0.24rem !important;
      }
    }
    .luckGiftTips {
      color: #fff;
      margin-top: 1rem;
    }
  }
}
.noCoinsCon {
  width: 6.1rem;
  height: 5.2rem;
  background: url(../assets/img/giftBg1.png);
  background-size: 100% 100%;
  position: relative;
  .close {
    display: block;
    width: 0.42rem;
    height: 0.42rem;
    background: url(../assets/img/close.png);
    background-size: 100% 100%;
    position: absolute;
    right: 0;
    top: 0;
  }
  .title {
    height: 1.75rem;
    line-height: 1.75rem;
    text-align: center;
    font-size: 0.32rem;
  }
  p {
    text-align: center;
    color: rgba(255, 255, 255, 1);
    font-size: 0.26rem;
    line-height: 0.6rem;
  }
  .doTask {
    display: block;
    width: 3.61rem;
    height: 1.14rem;
    margin: 0.3rem auto 0;
    text-align: center;
    background: url(../assets/img/taskBgAct.png);
    background-size: 100% 100%;
  }
}

.historyPup {
  width: 7.16rem;
  height: 9.91rem;
  background: url(../assets/img/giftBg2.png);
  background-size: 100% 100%;
  position: relative;
  .title {
    width: 1.89rem;
    height: 0.69rem;
    background: url(../assets/img/historyTitle.png);
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
