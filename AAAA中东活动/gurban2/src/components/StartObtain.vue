<template>
  <div class="startObtain">
    <div class="tips1"></div>
    <div class="giveWards">
      <span class="title">No.1</span>
      <div class="mutton">
        <p>الحصول على بعد إهداء واحد من هدية تالية <span><i></i><em>X2</em></span></p>
        <div class="totalStar"><em class="total">يمكن الاستلام</em><span><em>X {{gift_star}}</em><i></i></span></div>
        <div class="sugar">
          <img src="../assets/img/sugar1.png" alt="">
          <span>
            <em class="c1">سكر أحمر</em>
            <em class="c2">للأعمال</em>
          </span>
          <img src="../assets/img/sugar2.png" alt="">
          <span>
            <em class="c3">سكر أخضر</em>
            <em class="c2">لغرفة الغناء</em>
          </span>
        </div>
        <span class="ling" @click="getGiftStar(gift_star)">استلام</span>
        <!-- <span><em>{{gift_star}}</em> <em @click="getGiftStar(gift_star)">ling</em></span> -->
      </div>
    </div>
    <div class="vip">
      <span class="title">No.2</span>
      <div class="vipCont">
        <p class="vipMsg clearfix">VIP لشهر واحد<del>(777 عملة ذهبية)</del></p>
        <p class="vipMsg2">377 عملة ذهبية <em>يمكن الاستلام</em> <span>x 189 <i></i></span> </p>
        <p class="vipMsg3">لا يمكنك أن تحصل على هذه الجائزة والنجوم إلا تشتري VIP عبر هذا الإعلان</p>
        <span class="buy" @click="buyVip()">شراء</span>
        <!-- <span class="startBox"> x 194<span class="start"></span></span> -->
      </div>
    </div>
    <div class="Receive">
      <span class="title">No.3</span>
      <div class="ReceiveCon" v-if="userMsg.is_first == 0">
        <div class="conTop">
          <div class=msg>العد التنازلي لاستلام</div>
          <div class="time">
            {{downTime.minute}}:{{downTime.second}}
          </div>
        </div>
        <div class="conBtn">
          <em>يمكن الاستلام</em>
          <span>x 1<i></i></span>
        </div>
        <div :class="{active:!sureState}" @click="Receive()" class="ReceiveBtm">استلام</div>
      </div>
      <div class="ReceiveCon" v-else>
        <div class="conBtn">
          <em class="first">يمكن الاستلام بعد دخولك الأول</em>
          <span>x 1<i></i></span>
        </div>
        <div :class="{active:!sureState}" @click="Receive()" class="ReceiveBtm">استلام</div>
      </div>
    </div>
    <!-- 购买Vip提交 -->
    <transition name="slide">
      <div class="confirmBuy" v-show="showBuy || noshowBuy ">
        <div class="confirmContent">
          <!--  v-show="showBuy" -->
          <div class="buy" v-show="showBuy">
            <p>هل أنت متأكد من شراء VIP لشهر واحد</br>سوف تحصل على 189 نجمة</p>
            <span class="surebuy" @click="confirmBuy()">تحديد من الشراء</span>
            <a href="" @click.prevent="closefirm()" class="cloasBuy"></a>
          </div>
          <!-- v-show="noshowBuy" -->
          <div class="nobuy" v-show="noshowBuy">
            <p>فشل في الشراء</br>رصيدك لعملات ذهبية يقل من 377 عملة ذهبية</p>
            <span class="recharge" @click="recharge()">اذهب إلى الشحن</span>
            <a href="" @click.prevent="closefirm()" class="cloasBuy"></a>
          </div>
        </div>
      </div>
    </transition>
    <transition name="slide">
      <msg-toast :msg="tastMsg" @closeToast="closeToast()" v-show="showT"></msg-toast>
    </transition>

  </div>

</template>

<script>
import downTime from "../utils/downTime.js"
import api from "../api/apiConfig.js"
import MsgToast from "./commonToast"
import { mapState } from "vuex"
import APP from "../utils/openApp.js"
export default {
  components: { MsgToast },
  data() {
    return {
      downTime: { minute: '00', second: '00' },
      timer: null,
      showConfirm: false, //confirm弹窗
      showBuy: false,
      noshowBuy: false,
      tastMsg: '',  //提示信息
      showT: false
    }
  },
  computed: {
    ...mapState(["second", "activite", "userState", "isShare", "userMsg", "userRank", "gift_star"]),
    sureState() {
      if (this.second === 0) { //可以领取
        return true
      } else if (this.second > 0 && this.activite === 1) { //不可领取倒计时开始
        this.downTimeGo(this.second)
        return false
      }
    }
  },
  created() {

  },
  watch: {
    userMsg(val) {
    }
  },
  methods: {
    downTimeGo(val) {
      downTime('time2', val);
      this.timer = setInterval(() => {
        this.downTime = downTime('time2');
        if (this.downTime.end) {
          clearInterval(this.timer)
          this.$store.commit('changeSecond', 0)  //倒计时结束可以领取星星
        }
      }, 1000);
    },
    Receive() {
      if (this.isShare) {
        APP()
        return
      }
      if (this.sureState && this.activite == 1) { //如果可领取后重置时间,请求接口领取星值后重置时间
        if (this.userState === 1) { //已报名
          api.getStart().then(res => {
            this.$store.commit('changeSecond', res.data.response_data.second)  //设置样式变灰
            this.$store.getters.addscore  //底部个人信息星星数加一
            if (this.userMsg.rank < 20) {   //排行榜星星加一
              var rank = this.userMsg.rank
              this.$store.commit("addListStare", --rank)
            }
            if (this.userMsg.is_first == 1) { //首次领取
              this.$store.commit('changFirst', 0)
            }
            //请求领取接口后重新设置十分钟时间
            downTime('time2', res.data.response_data.second);
            this.downTime = downTime('time2');
            this.timer = setInterval(() => {
              this.downTime = downTime('time2');
              if (this.downTime.end) {
                clearInterval(this.timer)
                this.$store.commit('changeSecond', 0)  //倒计时结束可以领取星星
              }
            }, 1000);
          })
        } else if (this.userState === 0) {//未报名提示请先报名否则不可领取
          this.tastMsg = `يمكنك استلامها بعد تسجيلك`
          this.showT = true
        }
      } else if (this.activite == 0) { //活动未开始
        this.tastMsg = 'لم يبدأ النشاط'
        this.showT = true
      } else if (this.activite == 2) {
        this.tastMsg = 'قد انتهى النشاط'
        this.showT = true
      }
    },
    buyVip() { //购买Vip
      if (this.isShare) {
        APP()
        return
      }
      if (this.activite == 1) {
        if (this.userState === 1) { //报名
          api.VIPyue().then((res) => {
            if (res.data.response_status.code === 0) {
              if (res.data.response_data.balance === 0) { // 余额不足
                this.showConfirm = true
                this.noshowBuy = true
              } else if (res.data.response_data.balance === 1) { //余额足够
                this.showConfirm = true
                this.showBuy = true
              }
            }
          })
        } else if (this.userState === 0) {//未报名提示请先报名否则不可领取
          this.tastMsg = `يمكنك استلامها بعد تسجيلك`
          this.showT = true
        }
      } else if (this.activite == 0) { //活动未开始
        this.tastMsg = 'لم يبدأ النشاط'
        this.showT = true
      } else if (this.activite == 2) {
        this.tastMsg = 'قد انتهى النشاط'
        this.showT = true
      }
    },
    confirmBuy() { //购买Vip请求
      if (this.activite === 1) {
        api.openVIP().then((res) => {
          if (res.data.response_data.status === 1) {//开通成功
            this.$store.getters.addscoreVip  //底部个人信息星星数加194
            if (this.userMsg.rank < 20) {   //排行榜星星加194
              var rank = this.userMsg.rank
              this.$store.commit("addVipStart", --rank)
            }
            this.tastMsg = `نجاح في شراء VIP`
            this.showT = true
            this.closefirm()
          } else {
            this.closefirm()
          }
        })
      }
    },
    getGiftStar(startNum) {  //领取送礼星星
      if (this.isShare) {
        APP()
        return
      }
      if (this.activite === 1) {
        if (startNum > 0) {
          api.getGiftStar(startNum).then(res => {
            if (res.data.response_status.code == 0) {
              this.tastMsg = `نجاح في الاستلام`
              this.showT = true
              this.$store.commit('changGift_star', res.data.response_data.star) //更新可领取星值
              var rank = this.userMsg.rank
              let giftStarObj = {
                rank: --rank,
                startNum: startNum
              }
              this.$store.commit('addGiftStart', giftStarObj)
            }
          })
        } else {
          this.tastMsg = `لا توجد النجوم المتراكمة، أسرع إلى إهداء هذه الهدايا لاستلام النجوم!`
          this.showT = true
        }
      } else if (this.activite == 0) { //活动未开始
        this.tastMsg = 'لم يبدأ النشاط'
        this.showT = true
      } else if (this.activite == 2) {
        this.tastMsg = 'قد انتهى النشاط'
        this.showT = true
      }
    },
    closefirm() { //关闭confirm弹窗
      this.showConfirm = false
      this.showBuy = false
      this.noshowBuy = false
    },
    recharge() { //跳转充值页面
      location.href = "walletConfig://"
    },
    closeToast() {
      this.showT = false
    }
  }
}
</script>

<style lang="scss">
.startObtain {
  .tips1 {
    width: 3.72rem;
    height: 1.36rem;
    background: url(../assets/img/tips1.png);
    background-size: 100% 100%;
    margin: -0.3rem auto;
  }
  .giveWards {
    width: 6.9rem;
    height: 2.04rem;
    margin: 0.4rem auto 0;
    background: url(../assets/img/No.1.png) no-repeat;
    background-size: 100% 100%;
    padding: 0.18rem 0 0.1rem 0;
    display: flex;
    align-items: center;
    position: relative;
    .title {
      color: #ffed99;
      font-weight: bold;
      font-style: italic;
      margin-right: 0.18rem;
    }
    .mutton {
      margin-right: 0.3rem;
      white-space: nowrap;
      flex: 1;
      p {
        font-size: 70%;
        color: #ffdc4f;
        display: flex;
        align-items: center;
        span {
          display: flex;
          align-items: center;
          margin-right: 0.15rem;
          em {
            font-size: 70%;
          }
          i {
            display: block;
            margin-left: 0.1rem;
            width: 0.38rem;
            height: 0.36rem;
            background: url(../assets/img/star.png);
            background-size: 100% 100%;
          }
        }
      }
      .totalStar {
        display: flex;
        align-items: center;
        margin-top: 0.1rem;
        .total {
          font-size: 80%;
          color: #e0d9ff;
        }
        span {
          display: flex;
          align-items: center;
          margin-right: 0.15rem;
          i {
            display: block;
            margin-right: 0.15rem;
            margin-left: 0.1rem;
            width: 0.38rem;
            height: 0.36rem;
            background: url(../assets/img/star.png);
            background-size: 100% 100%;
          }
        }
      }
      .sugar {
        display: flex;
        margin-top: 0.17rem;
        height: 0.64rem;
        img {
          width: 0.64rem;
          height: 0.64rem;
          margin: 0 0.07rem;
        }
        span {
          em {
            font-size: 80%;
            display: block;
            height: 50%;
            &.c1 {
              color: #f9528a;
            }
            &.c2 {
              color: #cfc5ff;
              font-size: 70%;
            }
            &.c3 {
              color: #15f2a1;
            }
          }
        }
      }
      .ling {
        display: block;
        width: 1.76rem;
        height: 0.65rem;
        background: url(../assets/img/rankBtn.png);
        background-size: 100% 100%;
        text-align: center;
        line-height: 0.55rem;
        position: absolute;
        left: 0.17rem;
        bottom: 0.27rem;
        color: #814e00;
      }
    }
  }
  .vip {
    width: 6.9rem;
    margin: 0.08rem auto;
    background: url(../assets/img/No.2.png);
    background-size: 100% 100%;
    padding: 0.18rem 0 0.15rem 0;
    display: flex;
    align-items: center;
    position: relative;
    .title {
      color: #ffed99;
      font-weight: bold;
      font-style: italic;
      margin-right: 0.18rem;
    }
    .vipCont {
      margin-right: 0.3rem;
      .vipMsg {
        color: #ffdc4f;
        font-size: 110%;
        del {
          font-size: 80%;
          color: #ffdc4f;
        }
      }
      .vipMsg2 {
        color: #ffdc4f;
        font-size: 70%;
        display: flex;
        align-items: center;
        > em {
          font-size: 70%;
          color: #e0d9ff;
          margin-right: 0.15rem;
        }
        > span {
          color: #fff;
          display: flex;
          align-items: center;
          margin-right: 0.15rem;
          i {
            display: inline-block;
            margin-right: 0.1rem;
            width: 0.36rem;
            height: 0.36rem;
            background: url(../assets/img/star.png);
            background-size: 100% 100%;
          }
        }
      }
      .vipMsg3 {
        // width: 3.6rem;
        // height: 0.9rem;
        font-size: 70%;
        color: #5deaff;
      }
      .buy {
        display: block;
        width: 1.76rem;
        height: 0.65rem;
        background: url(../assets/img/rankBtn.png);
        background-size: 100% 100%;
        color: #814e00;
        text-align: center;
        line-height: 0.55rem;
        position: absolute;
        left: 0.17rem;
        top: 0.25rem;
      }
    }
  }
  .Receive {
    width: 6.9rem;
    height: 0.92rem;
    background: url(../assets/img/No3.png) no-repeat;
    margin: 0 auto;
    background-size: 100% 100%;
    padding: 0.18rem 0 0.1rem 0;
    display: flex;
    align-items: center;
    position: relative;
    .title {
      color: #ffed99;
      font-weight: bold;
      font-style: italic;
      margin-right: 0.18rem;
    }
    .ReceiveCon {
      width: 5.8rem;
      height: 0.92rem;
      margin-right: 0.3rem;
      display: flex;
      flex-direction: column;
      justify-content: center;
      position: relative;
      .conTop {
        display: flex;
        align-items: center;
        .msg {
          color: #ffdc4f;
          font-size: 80%;
        }
        .time {
          margin-right: 0.3rem;
          color: #ffdc4f;
          font-weight: bold;
        }
      }
      .conBtn {
        display: flex;
        align-items: center;
        margin-top: 0.1rem;
        .first {
          color: #ffdc4f;
          font-size: 70%;
        }
        span {
          display: flex;
          align-items: center;
          margin-right: 0.1rem;
        }
        em {
          color: #e0d9ff;
          font-size: 80%;
        }
        i {
          display: inline-block;
          width: 0.36rem;
          height: 0.36rem;
          background: url(../assets/img/star.png);
          background-size: 100% 100%;
          margin-right: 0.1rem;
        }
      }
      .ReceiveBtm {
        display: block;
        width: 1.76rem;
        height: 0.65rem;
        background: url(../assets/img/rankBtn.png);
        background-size: 100% 100%;
        text-align: center;
        line-height: 0.55rem;
        position: absolute;
        left: 0.17rem;
        bottom: 0.1rem;
        color: #814e00;
      }
      .active {
        color: #fff;
        background: url(../assets/img/nolq.png) no-repeat;
        background-size: contain;
      }
    }
  }
}
.confirmBuy {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 1000;
  background: RGB(0, 0, 0, 0.8);
  .confirmContent {
    width: 7.16rem;
    height: 4.32rem;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1001;
    background: rgba(232, 117, 25, 1);
    border: 0.04rem solid rgba(254, 194, 3, 1);
    border-radius: 0.3rem;
    .buy {
      p {
        margin: 1rem 0 0 0.44rem;
        text-align: center;
        font-weight: bold;
        padding-right: 0.2rem;
      }
      .surebuy {
        display: block;
        width: 1.96rem;
        height: 0.65rem;
        background: url(../assets/img/rankBtn.png) no-repeat;
        background-size: 100% 100%;
        color: #814e00;
        text-align: center;
        font-size: 70%;
        // font-weight: bold;
        line-height: 0.65rem;
        margin: 1rem auto 0;
      }
      .cloasBuy {
        display: block;
        width: 0.71rem;
        height: 0.71rem;
        background: url(../assets/img/cloas.png) no-repeat;
        background-size: contain;
        position: absolute;
        top: -1rem;
        right: 0rem;
      }
    }
    .nobuy {
      direction: rtl;
      p {
        margin: 1rem 0 0 0.44rem;
        text-align: center;
        font-weight: bold;
        padding-right: 0.2rem;
      }
      .recharge {
        display: block;
        width: 2.36rem;
        height: 0.65rem;
        background: url(../assets/img/rankBtn.png) no-repeat;
        background-size: 100% 100%;
        color: #814e00;
        text-align: center;
        font-size: 70%;
        // font-weight: bold;
        line-height: 0.65rem;
        margin: 1rem auto 0;
      }
      .cloasBuy {
        display: block;
        width: 0.71rem;
        height: 0.71rem;
        background: url(../assets/img/cloas.png) no-repeat;
        background-size: contain;
        position: absolute;
        top: -1rem;
        right: 0rem;
      }
    }
  }
}
.clearfix:after {
  content: ".";
  display: block;
  height: 0;
  clear: both;
  visibility: hidden;
}
</style>
