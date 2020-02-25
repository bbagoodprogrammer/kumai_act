<template>
  <div class="box">
    <div class="header">
      <a href="./index2.html" class="rules">{{lang.Rules}}</a>
      <a href="" class="history" @click.prevent="showHistory()">مظروفي الأحمر</a>
    </div>
    <a href="" class="downLo" @click.prevent="downLoApp()" v-if="isShare"></a>
    <!-- <share-component v-if="isShare"></share-component> -->
    <avtivity-contion></avtivity-contion>
    <activity-footer v-if="!isShare"></activity-footer>
    <!-- 个人奖励 -->
    <transition name="slide">
      <user-history-list @cloasList="cloasList" v-show="showList"></user-history-list>
    </transition>
    <msg-toast :msg="tastMsg" @closeToast="closeToast()" v-show="showT"></msg-toast>
    <loading></loading>
    <a href="" class="refresh" @click.prevent="refrsh()" :style="{transform:'rotate('+rotatePx+'deg)'}" v-show="activite!= 0 && !isShare"></a>
  </div>
</template>

<script>

import getString from "../utils/getString.js"
import api from "../api/apiConfig.js"
import Loading from "../components/Loading.vue"
import APP from "../utils/openApp.js"
import downTime from "../utils/downTime.js"
import vietnamLang from "../config/lang.js"
import avtivityContion from "../components/activityContion"
import ShareComponent from "../components/ShareComponent"
import ActivityFooter from "../components/ActivityFooter"
import MsgToast from "../components/commonToast.vue"
import UserHistoryList from "../components/UserHistoryList"
export default {
  components: { avtivityContion, ShareComponent, ActivityFooter, MsgToast, Loading, UserHistoryList },
  data() {
    return {
      isShare: false, //是否分享
      lang: vietnamLang, // 语言包
      activite: 1,    //活动状态
      userState: 0,   //用户状态（是否报名）
      // showCount:1,  //瓜分羊肉状态
      // second:0,    //瓜分倒计时的时候时间
      timer: 0,
      showT: false,  //提示弹窗显示
      tastMsg: "提示信息",  //基础弹窗提示信息
      ranklist: [],  //排行榜
      isMore: true,
      rotatePx: 0,    //刷新旋转动画
      rotatec: 0,
      showList: false
    }
  },
  computed: {
    // showCountState(){ //计算是否是倒计时阶段
    //     if(this.activite === 1 && this.showCount === 1){ //活动开始时倒数计时阶段，第一阶段
    //         return 1
    //     }else if(this.activite === 1 && this.showCount ===2){ //活动开始时倒数计时阶段，第二阶段
    //         return 2
    //     }
    // }
  },
  created() {
    this.judgeShare()  //判断是否为分享环境,请求相应的接口 
    if (!this.isShare) {
      this.getDefaultData()
    }
  },
  mounted() {
    if (!this.isShare) {
      window.addEventListener('scroll', this.onScroll)
    }
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
    getDefaultData(val) {
      api.getDefault(0).then((res) => {
        if (res.data.response_status.code == 20000) {  //活动未开始
          this.activite = 0
          this.$store.commit('changActivateState', this.activite) //當前活動狀態
        } else if (res.data.response_status.code == 0) {
          // var res = {
          //     "second": 0,  // 可以领取星星的倒计时，为 0 可以领取。
          //     "order": 0,  // 1-已经预约，0 未预约
          //     "activity_status": 1,  // 活动状态，0-未开始，1-进行中，2-已结束
          //     "red_rnvelope": { // 红包状态
          //         "status": 3, // 0-未开奖，1 开奖倒计时，2-開完獎展示一分鐘，3-开奖进行中
          //         "second": 3, // 红包倒计时时间
          //         "coins": 0,  // 0-还没抽奖，大于 0 表示当前抽中了多少金币
          //         "tm": 0,  // 多少秒抢完，为 0 一般是还没抢完
          //         "star_counts": 0,  // 目前的星星个数
          //         "divide_red_rnvelope": 99 //红包剩余个数
          //     },
          //     "user_rank": [  // 排行榜
          //         {
          //             "uid": 5018805,
          //             "rank": 1, // 排名
          //             "score": 0,  // 星值
          //             "avatar": "http:\/\/ufile.gosingapp.com\/uc\/img\/head_5018805_1551233743.png_small",
          //             "nick": "قلبي أسيرة"
          //         } ,
          //         {
          //             "uid": 100868,
          //             "rank": 2,
          //             "score": 200,
          //             "avatar": "http:\/\/img.17sing.tw:8081\/uc\/img\/head_100868_1551236405.png_small",
          //             "nick": "拾夢人啦啦啦啦啦啦啦"
          //         }
          //     ],
          //     "owner_msg": {  // 个人信息
          //         "uid": 5018805,
          //         "avatar": "http:\/\/ufile.gosingapp.com\/uc\/img\/head_5018805_1551233743.png_small",
          //         "nick": "قلبي أسيرة",
          //         "is_reg": 0, // 是否报名表示,1-已报名，0-未报名
          //         "rank": 1,  // 个人真实排名
          //         "score": 0  // 个人分数
          //     }
          // }
          const { second, activity_status, red_rnvelope, user_rank, owner_msg, order, gift_star } = res.data.response_data
          this.activite = activity_status  //活动状态
          this.userState = owner_msg.is_reg  //是否报名
          this.ranklist = user_rank   //存當前排行榜
          this.$store.commit('changeSecond', second)  //倒計時領取
          this.$store.commit('changered_rnvelope', red_rnvelope)  //紅包狀態
          this.$store.commit('changeuserRank', user_rank)  //排行榜
          this.$store.commit('changeActivite', activity_status)  //活动状态
          this.$store.commit('changeuserState', owner_msg.is_reg)
          this.$store.commit('changeuserMsg', owner_msg)  //当前用户信息
          this.$store.commit('changeorder', order)
          this.$store.commit('changGift_star', gift_star)
          if (val) {
            setTimeout(() => {
              window.addEventListener("scroll", this.onScroll)
            }, 300)
          }
        }
      })
    },
    closeToast() {
      this.showT = false
    },
    onScroll() {
      if (this.isMore) {
        const scrollToBottom = (document.documentElement.scrollTop || document.body.scrollTop) + window.innerHeight >= document.body.scrollHeight - 100
        if (scrollToBottom) { //加載更多
          this.isMore = false
          var arrlength = this.ranklist.length
          if (arrlength > 0) { //长度大于0
            api.getDefault(arrlength).then((res) => {
              this.isMore = true
              var newArr = res.data.response_data.user_rank
              if (newArr.length > 0) {
                this.ranklist = this.ranklist.concat(newArr)
                this.$store.commit('changeuserRank', this.ranklist)  //排行榜
              }
            })
          }
        }
      }
    },
    refrsh() { //刷新
      this.rotatePx = 540 * ++this.rotatec  //旋转动画
      window.removeEventListener("scroll", this.onScroll)
      this.getDefaultData('ref')
    },
    downLoApp() {
      APP();
      return;
    },
    destroyed() {
      window.removeEventListener('scroll', this.onScroll)
    },
    showHistory() { //显示自己中奖信息
      api.getHistory(0).then(res => {
        if (res.data.response_status.code == 0) {
          this.$store.commit('changHistoryList', res.data.response_data.record)
          this.showList = true
        }
      })

    },
    cloasList() {
      this.showList = false
    }
  }
}
</script>
<style lang='scss'>
body {
  background-color: #433795;
  direction: rtl;
  // overflow-x: hidden;
}
body::-webkit-scrollbar {
  width: 0;
}
.box {
  max-width: 7.5rem;
  position: relative;
  margin: auto;
  background: url(../assets/img/bigBg.png) center 0 no-repeat;
  background-size: 100% auto;
  padding-bottom: 1.3rem;
  overflow-x: hidden;
  .header {
    height: 6.3rem;
    position: relative;
    .rules {
      display: block;
      width: 1.73rem;
      height: 0.53rem;
      color: #af643a;
      position: absolute;
      right: 0;
      top: 0.34rem;
      z-index: 999;
      font-size: 70%;
      line-height: 0.45rem;
      background: url(../assets/img/ruleBg.png) no-repeat;
      background-size: 100% 100%;
      text-align: center;
    }
    .history {
      display: block;
      width: 1.73rem;
      height: 0.53rem;
      color: #af643a;
      position: absolute;
      right: 0;
      top: 1rem;
      z-index: 999;
      font-size: 70%;
      line-height: 0.45rem;
      background: url(../assets/img/ruleBg.png) no-repeat;
      background-size: 100% 100%;
      text-align: center;
    }
  }
  .wards {
    width: 7.1rem;
    height: 4.85rem;
    margin: 0.31rem auto 0;
    background: url(../assets/img/wards.png);
    background-size: contain;
  }
  .refresh {
    display: block;
    width: 0.94rem;
    height: 0.94rem;
    position: fixed;
    left: 0.08rem;
    bottom: 1.35rem;
    background: url(../assets/img/refrsh.png) no-repeat;
    background-size: contain;
    transition: all 1s;
  }
  .downLo {
    display: block;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 999;
    height: 1.2rem;
    background: url(../assets/img/downLo.png) no-repeat;
    background-size: 100% 100%;
  }
}
</style>


