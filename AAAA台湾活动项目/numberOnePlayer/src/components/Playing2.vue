<template>
  <div class="palying2">
    <div class="availableB">
      <div class="coins">{{lang.GameB}}<i></i> <em>{{daily_b}}</em></div>
      <div class="coinsTips">
        <p>{{lang.ticketB}}</p>
        <p class="tipsCon" v-html="lang.getTicketTips"></p>
      </div>
    </div>
    <div class="actItem" v-for="(item,index) in newTicketState" :key="index">
      <div class="imgBox">
        <img :src="item.img" alt="">
      </div>
      <div class="ticketMsg">
        <div class="title">{{item.title}}</div>
        <div class="tips">{{item.tips}}</div>
        <div class="time">{{item.tm}}</div>
      </div>
      <div class="btn">
        <span v-if="item.is_get==0" :class="{act:item.status == 1}" @click="getTicket(item.tid,item.status)">{{lang.exchang}}</span>
        <span v-else class="exchanged">{{lang.exchanged}}</span>
      </div>
    </div>
    <transition name="slide">
      <div class="noConisTips2" v-show="showNoCoins">
        <div class="noCoinsCon">
          <span class="close" @click="closeNoCoins()"></span>
          <p>{{lang.noCoinsTips3}}</br>{{lang.noCoinsTips2}}</p>
          <span class="doTask" @click="goTask()">{{lang.goGetConis}}</span>
        </div>
      </div>
    </transition>
    <transition name="slide">
      <div class="ticketPup" v-if="sucTicket">
        <div class="ticketCon">
          <div class="close" @click="closeTickePup()">
          </div>
          <img :src="defaluteTicketData[tid].img" alt="">
          <p>已兌換一張{{defaluteTicketData[tid].titleTips}}選票,</br>
            可在{{defaluteTicketData[tid].titleCon}}中送出,</br>
            已放至您的背包,快去查收吧！
          </p>
        </div>
      </div>
    </transition>
    <transition name="slide">
      <msg-toast :msg="tastMsg" @closeToast="closeToast()" v-show="showT"></msg-toast>
    </transition>
  </div>
</template>
<script>
import { mapState } from "vuex"
import api from "../api/apiConfig"
import { globalBus } from '../utils/eventBus'
import MsgToast from "../components/commonToast"
import lang from "../config/lang"
export default {
  components: { MsgToast },
  data() {
    return {
      tastMsg: '不在兌換時間內',
      showT: false,
      showNoCoins: false,
      tid: 0,
      sucTicket: false,
      defaluteTicketData: [
        {
          img: require('../assets/img/ticket1.png'),
          titleTips: '魅力歌手',
          titleCon: '年度魅力歌手大賽',
          title: "魅力歌手票",
          tips: "年度魅力歌手大賽選票",
          tm: "1月9日 18:00-1月18日20:00"
        },
        {
          img: require('../assets/img/ticket2.png'),
          titleTips: '人氣男女神',
          titleCon: '年度人氣男女神活動',
          title: "人氣男女神票",
          tips: "年度人氣男女神活動選票",
          tm: "1月13日 12:00-1月22日23:00"
        },
        {
          img: require('../assets/img/ticket3.png'),
          titleTips: '家族榮耀',
          titleCon: '年度金牌家族活動',
          title: "家族榮耀票",
          tips: "年度金牌家族作品選票",
          tm: "1月19日 14:30-1月27日19:00"
        },
        {
          img: require('../assets/img/ticket4.png'),
          titleTips: '家族榮耀',
          titleCon: '年度金牌家族活動',
          title: "家族榮耀票",
          tips: "年度金牌家族K房選票",
          tm: "1月19日 14:30-1月27日19:00"
        }
      ]
    }
  },
  computed: {
    ...mapState(["ticketState", "daily_b", "registered"]),
    newTicketState() {
      let newObj = this.defaluteTicketData.map((item, index) => {
        return { ...item, ...this.ticketState[index] };
      });
      return newObj
    }
  },
  methods: {
    getTicket(tid, status) {
      globalBus.$emit('commonEvent', () => {
        if (!this.registered) {
          this.tastMsg = lang.NoSingUp
          this.showT = true
        } else if (status == 2) {
          this.tastMsg = lang.NogetTicket
          this.showT = true
        } else if (status != 1) {
          this.tastMsg = lang.NogetTicket2
          this.showT = true
        } else if (this.daily_b >= 20) {
          api.getTicket(tid).then(res => {
            if (res.data.response_status.code == 0) {
              this.tid = --tid
              this.sucTicket = true
              this.$store.commit('reduceB', 20)
              this.$store.commit('addTicketState', tid)
              this.$store.commit('addTotalScore', 20)
            } else {
              this.tastMsg = res.data.response_status.error
              this.showT = true
            }
          })
        } else {
          this.showNoCoins = true
        }
      })
    },
    closeToast() {
      this.showT = false
    },
    closeTickePup() {
      this.sucTicket = false
    },
    closeNoCoins() {
      this.showNoCoins = false
    },
    goTask() {
      globalBus.$emit('tabClick', 2, 1)
      this.showNoCoins = false
    }
  }
}
</script>
<style lang="scss" scoped>
.availableB {
  height: 1.1rem;
  display: flex;
  justify-content: space-between;
  padding: 0 0.2rem 0 0.54rem;
  margin: 0.26rem 0 0.2rem;
  .coins {
    display: flex;
    align-items: center;
    color: #ffe0aa;
    i {
      display: block;
      width: 0.4rem;
      height: 0.41rem;
      background: url(../assets/img/coins.png);
      background-size: 100% 100%;
      margin-right: 0.05rem;
    }
  }
  .coinsTips {
    width: 3.9rem;
    p {
      font-size: 80%;
    }
    .tipsCon {
      color: #ffdab6;
      white-space: nowrap;
    }
  }
}
.actItem {
  display: flex;
  align-items: center;
  width: 7.1rem;
  height: 1.5rem;
  margin: 0 auto 0.13rem;
  background: url(../assets/img/ticketBg.png);
  background-size: 100% 100%;
  .imgBox {
    width: 1.2rem;
    height: 1.2rem;
    background: url(../assets/img/imgBg.png);
    background-size: 100% 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: 0.24rem;
    img {
      width: 1.02rem;
      height: 1.1rem;
    }
  }
  .ticketMsg {
    width: 3.5rem;
    margin-left: 0.25rem;
    .tips {
      font-size: 80%;
      color: #ffdab6;
      margin-top: 0.06rem;
    }
    .time {
      font-size: 71%;
      color: #ffdab6;
    }
  }
  .btn {
    margin-left: 0.25rem;
    span {
      display: block;
      width: 1.45rem;
      height: 0.69rem;
      line-height: 0.69rem;
      font-size: 85%;
      text-align: center;
      color: #e4e4e4;
      background: url(../assets/img/exchange3.png);
      background-size: 100% 100%;
      &.act {
        color: #b98300;
        background: url(../assets/img/exchange2.png);
        background-size: 100% 100%;
      }
      &.exchanged {
        color: #ffbe6a;
        background: url(../assets/img/exchange1.png);
        background-size: 100% 100%;
      }
    }
  }
}
.noConisTips2 {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  z-index: 10000;
  .noCoinsCon {
    width: 4.8rem;
    // height: 2.12rem;
    padding: 0.5rem 0 0.3rem 0;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: linear-gradient(
      0deg,
      rgba(211, 61, 59, 1),
      rgba(255, 94, 92, 1)
    );
    border: 0.04rem solid rgba(255, 244, 137, 1), rgba(255, 249, 214, 1);
    border-radius: 0.4rem;
    .close {
      display: block;
      width: 0.42rem;
      height: 0.42rem;
      background: url(../assets/img/getGiftClose.png);
      background-size: 100% 100%;
      position: absolute;
      right: 0;
      top: -1rem;
    }
    p {
      text-align: center;
      color: #ffdab6;
      font-size: 80%;
      line-height: 0.6rem;
    }
    span {
      display: block;
      width: 2.33rem;
      height: 0.81rem;
      margin: 0.3rem auto 0;
      text-align: center;
      background: url(../assets/img/taskBgAct.png);
      background-size: 100% 100%;
      line-height: 0.81rem;
      font-size: 93%;
      color: #b98300;
    }
  }
}
.ticketPup {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  z-index: 10000;
  .ticketCon {
    width: 4.8rem;
    padding: 0.24rem 0 0.35rem;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: linear-gradient(
      0deg,
      rgba(211, 61, 59, 1),
      rgba(255, 94, 92, 1)
    );
    border: 0.04rem solid rgba(255, 244, 137, 1), rgba(255, 249, 214, 1);
    border-radius: 0.4rem;
    .close {
      display: block;
      width: 0.42rem;
      height: 0.42rem;
      background: url(../assets/img/getGiftClose.png);
      background-size: 100% 100%;
      position: absolute;
      right: 0;
      top: -1rem;
    }
    img {
      width: 1.14rem;
      height: 1.14rem;
      display: block;
      margin: 0 auto;
    }
    p {
      margin-top: 0.16rem;
      text-align: center;
      color: #ffdab6;
      font-size: 80%;
    }
  }
}
</style>
