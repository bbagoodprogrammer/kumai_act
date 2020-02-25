<template>
  <div class="box">
    <div class="shareBar" v-if="isShare" @click="downAPP()">
      <div class="bar"></div>
    </div>
    <div class="header">
      <rool-msg :roolmsg="roolmsg"></rool-msg>
      <span class="openRules" @click="openRules()"></span>
      <span class="openCoins" @click="showResults()"></span>
      <span class="giftTab" @click="goExchange()"></span>
      <!-- <span class="rules" @click="goRules()">活动规则</span> -->
      <span class="tasksTab" @click="showTask()"></span>
      <tasks-list v-show="shotasks" :tasksList='tasksList' @closeTaskList="closeTaskList()"></tasks-list>
      <div class="totalb">{{totalB_str}}</div>
    </div>
    <act-cont></act-cont>
    <!-- 规则 -->
    <transition name="slide">
      <div class="rules" v-show="showRules">
        <div class="rulesCon">
          <i href="" class="close" @click="closeRules()"></i>
          <p class="titale">Thể lệ</p>
          <h5 class="tips">Chia làm 3 dạng đặt:</h5>
          <h6>1. Lớn nhỏ chẵn lẻ:</h6>
          <p>
            Tổng 3 số của xúc sắc từ 11 ~ 17 là lớn, từ 4 ~ 10 là nhỏ. Tổng 3 số của xúc sắc 4, 6, 8, 10, 12, 14, 16 là chẵn; 3, 5, 7, 9, 11, 13, 15, 17 là lẻ. Đặt không trúng sẽ không nhận lại được điểm đã đặt!
            </br>*Nếu 3 xúc xắc cùng điểm, đặt lớn nhỏ chẵn lẻ đều bị trừ điểm
          </p>
          <h6>2. Đặt số:</h6>
          <p>
            Đặt 1, nếu 3 xúc sắc là 1, 2, 3 thì tỷ lệ thưởng là 1:1. Nếu đặt 1, xúc sắc là 1, 1, 3 thì tỷ lệ thưởng là 1:2, cứ thể suy ra. Đặt không trúng sẽ không nhận lại được điểm đã đặt!
          </p>
          <h6>3. Đặt tổng:</h6>
          <p>
            Tổng 3 số của xúc sắc là 4 hoặc 7, tỷ lệ thưởng là 1:50</br>
            Tổng 3 số của xúc sắc là 5 hoặc 16, tỷ lệ thưởng là 1:18</br>
            Tổng 3 số của xúc sắc là 6 hoặc 15, tỷ lệ thưởng là 1:14</br>
            Tổng 3 số của xúc sắc là 7 hoặc 14, tỷ lệ thưởng là 1:12</br>
            Tổng 3 số của xúc sắc là 8 hoặc 13, tỷ lệ thưởng là 1:8</br>
            Tổng 3 số của xúc sắc là 9 hoặc 10 hoặc 11 hoặc 12, tỷ lệ thưởng là 1:6</br>
            Đặt không trúng sẽ không nhận lại được điểm đã đặt!
          </p>
        </div>
      </div>
    </transition>
    <!-- 中奖结果 -->
    <lottery-result v-if="showResult" @closeResult="closeResult()"></lottery-result>
    <!-- 兑换礼物 -->
    <gift-list v-show="showGift" :giftList="giftList" @closeGift="closeGift()"></gift-list>
    <loading></loading>
    <transition name="slide">
      <msg-toast :msg="tastMsg" @closeToast="closeToast()" v-show="showT"></msg-toast>
    </transition>
    <div href="" class="refresh" @click.prevent="refrsh()" :style="{transform:'rotate('+rotatePx+'deg)'}" v-if="activite == 1 && !isShare"></div>
    <!-- 可拖拽刷新按钮 -->
    <!-- <div href="" class="refresh circle" @click.prevent="refrsh()" :style="{transform:'rotate('+rotatePx+'deg)'}" @touchstart="down" @touchmove="move" @touchend="end" id="circlebox"></div> -->
    <!-- 遮罩,用来加阻止移动端屏幕默认滑动事件 -->
    <div class="mask-box" id="page1mask" v-if="showif"></div>
  </div>
</template>

<script>

import getString from "../utils/getString"
import APP from "../utils/openApp"
import api from "../api/apiConfig"
import Loading from "../components/Loading"
import MsgToast from "../components/commonToast"
import { globalBus } from '../utils/eventBus'
import RoolMsg from "../components/RoolMsg"
import ActCont from "../components/ActCont"
import LotteryResult from '../components/LotteryResult'
import GiftList from '../components/GiftList'
import TasksList from "../components/TasksList"
import { mapState } from 'vuex'
export default {
  components: { Loading, MsgToast, RoolMsg, LotteryResult, GiftList, TasksList, ActCont },
  data() {
    return {
      isShare: false, //是否分享
      isMore: true,   //加载更多
      activite: 0,    //活动状态
      showT: false,  //提示弹窗显示
      tastMsg: "提示信息",  //基础弹窗提示信息
      userState: 0,   //用户状态（是否报名）
      rotatePx: 0,    //刷新旋转动画
      rotatec: 0,
      showif: false, //刷新按钮拖拽
      positionX: 0,
      positionY: 0,
      innerHeight: 0,
      innerWidth: 0,//刷新按钮拖拽
      showResult: false,  //押注结果
      showGift: false,   //礼物兑换
      shotasks: false,  //更多任务
      showRules: false,
      giftList: [],
      owner_msg: {},
      roolmsg: [],
      tasksList: [],
      get_gift_status: null
    }
  },
  computed: {
    ...mapState(['total_bet_b']),
    totalB_str() {
      return this.toThousands(this.total_bet_b)
    }
  },
  created() {
    window.addEventListener("pageshow", function () {
      if (sessionStorage.getItem("need-refresh")) {
        location.reload();
        sessionStorage.removeItem("need-refresh");
      }
    });
    this.judgeShare()  //判断是否为分享环境,请求相应的接口 
    this.getDefaultData()
  },
  methods: {
    judgeShare() {//判断是否为分享环境,请求相应的接口 
      let regstr = getString('token')
      if (regstr) {
        this.isShare = false
      } else {
        this.isShare = true
      }
      this.$store.commit('changShareState', this.isShare) //分享状态
    },
    getDefaultData(val) { //初始化
      api.getDefault().then(res => {
        const { response_data, response_status } = res.data
        if (response_status.code === 20000) {
          this.activite = 0
          this.$store.commit('changActStatus', this.activite)
        } else if (response_status.code === 0) {
          const { activity_status, owner_msg, lucky_record, total_bet_b, second, open_tm, bet_counts, get_gift_status } = response_data
          this.activite = activity_status
          this.$store.commit('changActStatus', activity_status)
          this.roolmsg = lucky_record
          if (owner_msg) {
            this.owner_msg = owner_msg
            this.$store.commit('changOwner_msg', owner_msg)
          }
          this.get_gift_status = get_gift_status
          this.$store.commit('changTotal_bet_b', total_bet_b)
          this.$store.commit('changDownTime', second)
          this.$store.commit('changHours', open_tm)
          this.$store.commit('changBet_countsp', bet_counts)
        }
      })
    },
    goExchange() {
      // if (this.giftList.length == 0) {
      //   api.giftList().then(res => {
      //     if (res.data.response_status.code === 0) {
      //       this.showGift = true
      //       this.giftList = res.data.response_data.gift_lists
      //     }
      //   })
      // } else {
      //   this.showGift = true
      // }
      if (this.get_gift_status === 0) {
        this.tastMsg = "Sự kiện chưa bắt đầu"
        this.showT = true
      } else if (this.get_gift_status === 2) {
        this.tastMsg = "Sự kiện đã kết thúc"
        this.showT = true
      } else if (this.owner_msg.is_reg === 0) {
        this.tastMsg = `Mời báo danh`
        this.showT = true
      } else {
        sessionStorage.setItem('surplusCoins', this.owner_msg.b)
        sessionStorage.setItem('get_gift_status', this.get_gift_status)
        let regstr = getString('token')
        location.href = `./index3.html?token=${regstr}`
      }
    },
    showResults() { //显示投注中奖记录
      if (this.isShare) {
        APP()
        return
      }
      api.bettingRecord(0).then(res => {
        let record = res.data.response_data.record
        this.$store.commit('changBettingRecord', record)
        this.showResult = true
      })
    },
    openRules() {
      this.showRules = true
    },
    showTask() { //显示任务
      if (this.isShare) {
        APP()
        return
      }
      if (this.tasksList.length === 0) {
        api.tasksDetails().then(res => {
          if (res.data.response_status.code === 0)
            this.tasksList = res.data.response_data.daily_tasks
          this.shotasks = true
        })
      } else {
        this.shotasks = true
      }
    },
    toThousands(number) {
      var arr = String(number).split('.');
      var num = arr[0], result = '';
      while (num.length > 3) {
        result = ',' + num.slice(-3) + result;
        num = num.slice(0, num.length - 3);
      }
      if (num.length > 0) result = num + result;
      return arr[1] ? result + '.' + arr[1] : result
    },
    goRules() {
      location.href = `./index2.html`
    },
    downAPP() {
      APP()
    },
    closeResult() {
      this.showResult = false
    },
    closeRules() {
      this.showRules = false
    },
    closeGift() {
      this.showGift = false
    },
    closeTaskList() {
      this.shotasks = false
    },
    refrsh() { //刷新
      this.rotatePx = 540 * ++this.rotatec  //旋转动画
      window.removeEventListener("scroll", this.onScroll)
      this.getDefaultData('ref')
      this.tasksList = []
    },
    closeToast() {
      this.showT = false
    }
    // /* 阻止移动端屏幕默认滑动 */
    // default(e) {
    //   let divv = document.getElementById('page1mask')
    //   if (divv) {
    //     divv.addEventListener(
    //       'touchmove',
    //       function (e) {
    //         e.preventDefault()
    //       },
    //       { passive: false }
    //     )
    //   }
    // },
    // getThisNode() {
    //   let odiv = document.getElementById('circlebox')
    //   odiv.style.left = `${this.positionX - 20}px`
    //   odiv.style.top = `${this.positionY - 20}px`
    // },
    // down(e) {
    //   console.log(e, e.touches)
    //   this.showif = true
    //   this.default()
    //   this.innerHeight = e.view.innerHeight
    //   this.innerWidth = e.view.innerWidth
    //   this.positionX = e.changedTouches[0].pageX
    //   this.positionY = e.changedTouches[0].pageY
    // },
    // move(e) {
    //   this.getThisNode()
    //   this.default()
    //   this.positionX = e.changedTouches[0].pageX
    //   this.positionY = e.changedTouches[0].pageY
    //   this.getThisNode()
    //   if (this.positionX <= 20) {
    //     this.positionX = 20
    //   } else if (this.positionX >= this.innerWidth - 20) {
    //     this.positionX = this.innerWidth - 20
    //   } else {
    //     this.positionX = this.positionX
    //   }
    //   if (this.positionY <= 20) {
    //     this.positionY = 20
    //   } else if (this.positionY >= this.innerHeight - 40) {
    //     this.positionY = this.innerHeight - 20
    //   } else {
    //     this.positionY = this.positionY
    //   }
    // },
    // end(e) {
    //   this.showif = false
    // },
  }
}
</script>
<style lang='scss'>
.box {
  max-width: 750px;
  overflow-x: hidden;
  position: relative;
  margin: auto;
  // background:url(../assets/img/主视觉.png) center 0 no-repeat;
  background-size: 100% auto;
  .shareBar {
    position: fixed;
    z-index: 1000;
    top: 0;
    left: 0;
    right: 0;
    text-align: center;
    .bar {
      width: 7.5rem;
      height: 1.2rem;
      margin: auto;
      background: url(../assets/img/share_bar.png) no-repeat;
      background-size: 100% 100%;
    }
  }
  .header {
    height: 5.07rem;
    background: url(../assets/img/bingBg.png) no-repeat;
    background-size: 100% 100%;
    position: relative;
    > span {
      display: block;
      width: 1.55rem;
      height: 0.58rem;
      position: absolute;
      z-index: 10;
      right: 0;
      &.openRules {
        top: 2.5rem;
        background: url(../assets/img/rules.png);
        background-size: 100% 100%;
      }
      &.openCoins {
        top: 3.28rem;
        background: url(../assets/img/openCoins.png);
        background-size: 100% 100%;
      }
      &.giftTab {
        top: 4rem;
        background: url(../assets/img/giftTab.png);
        background-size: 100% 100%;
      }
      &.tasksTab {
        top: 4.72rem;
        background: url(../assets/img/taskList.png);
        background-size: 100% 100%;
      }
    }
    .totalb {
      position: absolute;
      width: 2.7rem;
      text-align: center;
      top: 4.26rem;
      left: 2.4rem;
      font-weight: bold;
      font-size: 120%;
      color: #ffd145;
    }
  }
  .rules {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.8);
    z-index: 10000;
    .rulesCon {
      width: 6.8rem;
      padding: 0.52rem 0.2rem;
      background-color: #0f2123;
      position: absolute;
      top: 2.8rem;
      left: 50%;
      transform: translate(-50%, 0);
      h5 {
        font-weight: bold;
        margin-top: 0.1rem;
      }
      h6 {
        font-weight: bold;
        color: #22808a;
        margin-top: 0.1rem;
      }
      .close {
        display: block;
        width: 0.62rem;
        height: 0.62rem;
        background: url(../assets/img/close.png);
        background-size: 100% 100%;
        position: absolute;
        top: -1rem;
        right: 0rem;
      }
      .titale {
        font-size: 160%;
        color: #ffde5c;
        font-weight: bold;
        text-align: center;
      }
      .tips {
        font-size: 110%;
        color: #22808a;
        text-align: left;
        margin-top: 0.2rem;
      }
      p {
        margin-top: 0.1rem;
        font-size: 80%;
        color: #22808a;
        text-align: left;
      }
    }
  }
}
.refresh {
  display: block;
  width: 0.94rem;
  height: 1rem;
  position: fixed;
  right: 0.3rem;
  bottom: 1.35rem;
  background: url(../assets/img/refresh.png) no-repeat;
  background-size: contain;
  transition: transform 1s;
  z-index: 10;
}
#circlebox {
  // width: 2rem;
  // height: 2rem;
  // background-color: red;
  // position: fixed;
}
</style>


