<template>
  <div class="divideUp">
    <div class="defalute">
      <p class="tips">كلما يتراكم جميع المستخدمين 600 نجمة يمكنك أن تشترك في اقتسام المظروف الأحمر واكتساب العملات في هذه المظروف الأحمر!</p>
      <div class="big">
        <span class="man"></span>
        <span ref="bar" :style="{width:barWidth+ '%'}" class="bar" :class="{manW:barWidth == 100}"></span>
        <span class="nowStart">{{red_rnvelope.total_stars}}/{{red_rnvelope.star_counts}}</span>
      </div>
      <span class="make lh" @click="make()" v-if="order === 0 || isShare">ضرب الموعد لاقتسام </span>
      <span class="make lh" v-if="order === 1" @click="maked()">إلغاء ضرب الموعد</span>
    </div>
    <!-- 120秒弹窗 v-if="showState === 1 && showcoven"-->
    <transition name="slide">
      <div class="Cut-down-countdownPup" v-if="showState === 1 && showcoven">
        <div class="Cut-down-cont">
          <div class="contBg">
            <!-- <div class="lunbo" :style="{'background-position-Y':imgPos[imgindex]}"></div> -->
            <!-- <img :src="require('../assets/img/lunbo1.png')" alt=""> -->
            العد التنازلي لاقتسام لحم الخروف</br>سيبدأ بعد <span>{{surplusTime.seconds}}</span> ثانية!
          </div>
          <!-- <div class="shareFirend" @click="shareFriend()">
          تذكير أصدقائك لاقتسام لحم الخروف
        </div> -->
          <!-- <div class="contMsg">
          كلما تتراكم 1000 نجمة، يمكنك أن تشترك في اقتسام لحم الخروف.</br>
          1000 عملة ذهبية لكل مرة، و100 شخص يستطيعون اكتساب هذه العملات فق
        </div> -->
          <span class="cloasCoun" @click="closeCoun()"></span>
        </div>
      </div>
    </transition>
    <!-- 瓜分礼物弹窗 v-if="(showState === 2 || showState === 3) && showmutton" -->
    <transition name="slide">
      <div class="countdownPup" v-if="(showState === 2 || showState === 3) && showmutton">
        <div class="downPupCon">
          <span @click="carveup()">اقتسام</span>
          <a class="cloasCoun" @click.prevent="closeCoun()"></a>
        </div>
      </div>
    </transition>
    <!-- 瓜分结果，得了多少多少金豆 v-show="showGetConios"-->
    <transition name="slide">
      <div class="getCoins" v-show="showGetConios">
        <div class="getCoincCont">
          <span class="cloasCoun" @click="closeSgin()"></span>
          <div class="getMsg">
            <p class="msg">مبروك للحصول</p>
            <div class="coins">
              <span></span> {{coins}}
            </div>
            <!-- <p class="goShare" @click="showList()">انظر تفاصيل الاستلام>></p> -->
            <p class="nextMsg">أشخاص أكثر، ونجوم أكثر، تشارك هذا النشاط وتحصل على الجائزة الكبيرة مرة قادمة</p>
            <!-- <span @click="showList()">瓜分记录</span>
          <button @click="shareFriend()">分享活动</button> -->
            <div class="btm">
              <span class="guafen" @click="showList()">انظر تفاصيل الاستلام>></span>
              <span class="share" @click="shareFriend()"> <i></i><em>مشاركة </em></span>
            </div>
          </div>
        </div>
      </div>
    </transition>

    <!-- 手慢了弹窗  v-show="nogetCoins"-->
    <transition name="slide">
      <div class="getCoins" v-show="nogetCoins">
        <div class="getCoincCont">
          <span class="cloasCoun" @click="closeSgin()"></span>
          <div class="getMsg">
            <p class="msg">أنت بطيء، قد تم الاقتسام</p>
            <!-- <p class="goShare" @click="showList()">انظر تفاصيل الاستلام>></p> -->
            <p class="nextMsg mt">أشخاص أكثر، ونجوم أكثر، تشارك هذا النشاط وتحصل على الجائزة الكبيرة مرة قادمة</p>
          </div>
          <div class="btm">
            <span class="guafen" @click="showList()">انظر تفاصيل الاستلام>></span>
            <span class="share" @click="shareFriend()"> <i></i><em>مشاركة </em></span>
          </div>
        </div>
      </div>
    </transition>

    <!-- 预约成功弹窗 v-show="showMakePup"-->
    <transition name="slide">
      <div class="makePup" v-show="showMakePup">
        <div class="makeCon">
          <p>تنجح في ضرب الموعد!</p>
          <!-- <span @click="shareFriend()">تذكير أصدقائك لضرب الموعد</span> -->
          <a href="" @click.prevent="cloesMake()" class="cloesMake"></a>
        </div>
      </div>
    </transition>

    <!-- 多个账号领取 -->
    <transition name="slide">
      <div class="makePup" v-if="errPup">
        <div class="makeCon">
          <p>لا يمكن أن تقتسم بحسابات كثيرة</p>
          <a class="cloesMake" @click="cloesErr()"></a>
        </div>
      </div>
    </transition>
    <!-- 获奖列表 -->
    <transition name="slide">
      <make-list v-if="showMakeList" @cloasList="cloasList()"></make-list>
    </transition>
    <transition name="slide">
      <msg-toast :msg="tastMsg" @closeToast="closeToast()" v-show="showT"></msg-toast>
    </transition>
  </div>
</template>

<script>
import { mapState } from "vuex"
import downTime from "../utils/downTime.js"
import MsgToast from "../components/commonToast"
import api from "../api/apiConfig.js"
import MakeList from "../components/MaksList" //瓜分记录
import APP from "../utils/openApp.js" //打开APP
import getAppUaInfo from "../utils/getAppUaInfo"
export default {
  components: { MakeList, MsgToast },
  data() {
    return {
      surplusTime: {},//到计时秒数
      showGetConios: false,
      nogetCoins: false,
      coins: 20,  //瓜分到多少金币
      showMakeList: false, //显示记录
      showMakePup: false, //预约成功弹窗
      errPup: false, //不可用多个账号领取
      tastMsg: '',
      showT: false,
      imgindex: 0,
      showcoven: false, //显示倒计时，用于点击关闭
      showmutton: false,
      timer: null,  //瓜分羊肉倒计时
      tmier2: null,  //图片轮播倒计时
      imgPos: [
        "-3.35rem", "-5.08rem", "-6.82rem", ".1rem", "-1.62rem", "-17.19rem", "-18.95rem", "-15.47rem", "-8.55rem", "-10.27rem", "-12rem", "-13.76rem"
      ]
    }
  },
  computed: {
    ...mapState(["red_rnvelope", "activite", "order", "isShare", "userMsg"]),
    showState() {
      if (this.red_rnvelope.status == 0 && this.activite == 1) { //红包未开奖
        return 0
      } else if (this.red_rnvelope.status === 1 && (this.activite == 1 || this.activite == 2) && this.red_rnvelope.coins === 0) { //开始倒计时
        this.downTimeGo(this.red_rnvelope.second)
        this.showcoven = true
        return 1
      } else if (this.red_rnvelope.status === 2 && this.red_rnvelope.coins === 0 && (this.activite == 1 || this.activite == 2) && this.red_rnvelope.none == 0) { //展示抽奖结束后的一分钟,用户未抽奖
        this.showmutton = true
        return 2
      } else if (this.red_rnvelope.status === 3 && this.red_rnvelope.coins === 0 && (this.activite == 1 || this.activite == 2) && this.red_rnvelope.none == 0) { //开奖进行中
        this.showmutton = true
        return 3
      } else if (this.red_rnvelope.coins > 0 && this.activite == 1) {
        return 4
      }
    },
    barWidth() {
      return (this.red_rnvelope.star_counts / this.red_rnvelope.total_stars) * 100
    }
  },
  destroyed() {
    clearInterval(this.tmier2)
  },
  watch: {
    showcoven(val) {
      if (val) {
        this.tmier2 = setInterval(() => {
          this.imgindex++
          if (this.imgindex === 12) {
            this.imgindex = 0
          }
        }, 100);
      } else {
        clearInterval(this.tmier2)
      }
    }
  },
  methods: {
    downTimeGo(val) { //瓜分羊肉弹窗1倒计时
      downTime('time1', val);
      this.surplusTime = downTime('time1');
      this.timer = setInterval(() => {
        this.surplusTime = downTime('time1');
        if (this.surplusTime.end) {
          clearInterval(this.timer)
          this.showmutton = true  //显示弹窗
          this.red_rnvelope.status = 3 //开奖进行时
          clearInterval(this.tmier2)
        }
      }, 1000);
    },
    make() {  //预约瓜分羊肉,调用接口,切换按钮
      if (this.isShare) {
        APP()
        return
      }
      if (this.activite == 1) {
        api.maskMutton().then(() => {
          this.$store.commit('changeorder', 1)
          this.showMakePup = true
        })
      } else if (this.activite == 0) {
        this.tastMsg = 'لم يبدأ النشاط'
        this.showT = true
      } else if (this.activite == 2) {
        this.tastMsg = 'قد انتهى النشاط'
        this.showT = true
      }
    },
    maked() { //取消预约
      if (this.isShare) {
        APP()
        return
      }
      if (this.activite == 1) {
        api.cancelRedReminder().then(res => {
          if (res.data.response_status.code == 0) {
            this.$store.commit('changeorder', 0)
            this.tastMsg = 'نجاح في إلغاء ضرب الموعد'
            this.showT = true
          }
        })
      } else if (this.activite == 0) {
        this.tastMsg = 'لم يبدأ النشاط'
        this.showT = true
      } else if (this.activite == 2) {
        this.tastMsg = 'قد انتهى النشاط'
        this.showT = true
      }
    },
    carveup() { //开始瓜分
      api.carveup().then((res) => {
        if (res.data.response_status.code == 20010) {
          //弹窗不可以多个ID领取羊肉
          this.errPup = true
        } else if (res.data.response_status.code == 0) {  //瓜分成功
          //弹窗获得多少多少金币或已经瓜分完毕
          if (res.data.response_data.coins === 0) { //抢不到
            this.red_rnvelope.coins = 1 //已抽过转换状态
            this.nogetCoins = true       //显示对应弹窗
          } else if (res.data.response_data.coins > 0) {  //抢到多少金币弹窗
            this.red_rnvelope.coins = res.data.response_data.coins //已抽过转换状态
            this.coins = res.data.response_data.coins
            this.showGetConios = true
          }
        }
      })
    },
    showList() { //显示瓜分记录
      api.countList().then((res) => {
        this.$store.commit('changecountedList', res.data.response_data)
        //显示弹窗
        this.showMakeList = true
      })
    },
    shareFriend(val) { //跳转默认分享
      var ios = navigator.userAgent.match(/iPhone|iPod|ios|iPad/i);
      var ua = navigator.userAgent;
      var data = {
        "share_title": "نشاط المولد النبوي الشريف",
        "share_content": "تُعطَى العملات الذهبية، وتستلمها مجانا! اذهب إلى اقتسامها سريعا!",
        "share_image": "http://activity.gosingapp.com/static_html/2019/gurban2/mutton.jpg",
        "link": `http://activity.gosingapp.com/static_html/2019/gurban2/index.html?uid=${this.userMsg.uid}`,
        "image": "http://activity.gosingapp.com/static_html/2019/gurban2/mutton2.jpg",
      }
      if (ios) {
        // if (window.share != undefined) {
        //   share(JSON.stringify(data))
        // } else {
        location.href = 'shareUserInfo://activity.gosingapp.com/static_html/2019/gurban2/index.html&shareText=تُعطَى العملات الذهبية، وتستلمها مجانا! اذهب إلى اقتسامها سريعا! &userImg=http://activity.gosingapp.com/static_html/2019/gurban2/mutton.jpg&title=نشاط المولد النبوي الشريف';
        // }
      } else {
        // if (getAppUaInfo(ua).ver > 670682) {
        //   javascript: JSInterface.share(JSON.stringify(data));
        // } else {
        javascript: JSInterface.share('http://activity.gosingapp.com/static_html/2019/gurban2/index.html?uid=' + this.userMsg.uid + '', 'نشاط المولد النبوي الشريف', 'تُعطَى العملات الذهبية، وتستلمها مجانا! اذهب إلى اقتسامها سريعا!', 'http://activity.gosingapp.com/static_html/2019/gurban2/mutton.jpg');
        // }
      }
    },
    closeCoun() { //手动关闭两个宰羊的弹窗
      this.showcoven = false
      this.showmutton = false
    },
    closeToast() {
      this.showT = false
    },
    closeSgin() {
      this.showGetConios = false
      this.nogetCoins = false
    },
    cloesMake() {
      this.showMakePup = false
    },
    cloesErr() {
      this.errPup = false
    },
    cloasList() {
      this.showMakeList = false
    }
  }

}
</script>

<style lang="scss">
.divideUp {
  .defalute {
    width: 7.49rem;
    height: 2.82rem;
    margin: 0 auto;
    background: url(../assets/img/cutmuttonBg.png);
    background-size: contain;
    position: relative;
    padding-top: 0.79rem;
    .tips {
      width: 5rem;
      font-size: 70%;
      text-align: center;
      margin-right: 0.35rem;
    }
    .big {
      width: 3.89rem;
      height: 0.39rem;
      background: url(../assets/img/lineBg.png);
      background-size: 100% 100%;
      margin: 0.08rem 0.81rem 0 0;
      position: relative;
      z-index: 10;
      .man {
        display: block;
        width: 4.08rem;
        height: 0.42rem;
        background: url(../assets/img/lineStar.png);
        background-size: 100% 100%;
        position: absolute;
        left: -0.1rem;
        top: -0.02rem;
        z-index: 20;
      }
      .bar {
        position: absolute;
        height: 85%;
        top: 0.03rem;
        background: linear-gradient(
          to bottom,
          rgba(223, 218, 72, 1),
          rgba(255, 189, 16, 1),
          rgba(255, 96, 5, 1)
        );
        border-radius: 0 0.16rem 0.16rem 0;
        &.manW {
          border-radius: 0.16rem;
        }
      }
      .nowStart {
        position: absolute;
        top: 50%;
        right: 50%;
        font-size: 80%;
        transform: translate(50%, -50%);
        z-index: 30;
      }
    }
    .make {
      width: 2.12rem;
      height: 0.79rem;
      background: url(../assets/img/yuyueBg.png);
      background-size: 100% 100%;
      position: absolute;
      bottom: 0.6rem;
      right: 1.69rem;
      text-align: center;
      padding: 0.1rem 0.1rem 0;
      font-size: 80%;
      font-weight: bold;
      white-space: nowrap;
      &.lh {
        line-height: 0.59rem;
      }
    }
  }
  .Cut-down-countdownPup {
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 1000;
    background: RGB(0, 0, 0, 0.8);
    .Cut-down-cont {
      width: 5.99rem;
      height: 3.61rem;
      background: url(../assets/img/muttonBg.png) no-repeat;
      background-size: contain;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      z-index: 1001;
      // .shareFirend {
      //   width: 2.63rem;
      //   height: 0.82rem;
      //   padding: 0.1rem 0.2rem 0 0.1rem;
      //   background: url(../assets/img/defaluteTos.png) no-repeat;
      //   background-size: contain;
      //   position: absolute;
      //   top: 4rem;
      //   left: 2rem;
      //   color: #b98300;
      //   font-size: 80%;
      //   text-align: center;
      //   line-height: 0.3rem;
      //   direction: rtl;
      // }
      .contBg {
        width: 4.05rem;
        height: 1.1rem;
        padding-top: 0.1rem;
        position: absolute;
        top: 1rem;
        right: -0.1rem;
        z-index: 1002;
        font-size: 93%;
        text-align: center;
        direction: rtl;
        line-height: 0.5rem;
        // font-weight: 600;
        // .lunbo {
        //   width: 4.7rem;
        //   height: 1.71rem;
        //   background: url("../assets/img/lunbo.png") -0.01rem;
        //   background-size: 100% auto;
        //   position: absolute;
        //   top: -0.35rem;
        //   left: -0.35rem;
        // }
        > span {
          font-size: 140%;
          font-weight: bold;
          color: #fff;
        }
      }
      // .contMsg {
      //   font-size: 80%;
      //   position: absolute;
      //   bottom: -1.2rem;
      //   text-align: center;
      //   color: #fff496;
      //   direction: rtl;
      // }
      .cloasCoun {
        display: block;
        width: 0.5rem;
        height: 0.5rem;
        background: url(../assets/img/cloas.png) no-repeat;
        background-size: contain;
        position: absolute;
        top: -0.3rem;
        right: 0rem;
      }
    }
  }
  .countdownPup {
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 99;
    background: RGB(0, 0, 0, 0.8);
    z-index: 1000;
    .downPupCon {
      width: 5.99rem;
      height: 3.61rem;
      background: url(../assets/img/muttonBg.png) no-repeat;
      background-size: contain;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      span {
        display: block;
        width: 2.12rem;
        height: 0.79rem;
        text-align: center;
        line-height: 0.69rem;
        background: url(../assets/img/yuyueBg.png) no-repeat;
        background-size: contain;
        position: absolute;
        top: 1.3rem;
        right: 0.8rem;
        color: rgba(255, 255, 255, 1);
        font-size: 120%;
        -webkit-text-stroke: 0.01rem #d67100;
        text-stroke: 0.01rem #d67100;
      }
      .cloasCoun {
        display: block;
        width: 0.5rem;
        height: 0.5rem;
        background: url(../assets/img/cloas.png) no-repeat;
        background-size: contain;
        position: absolute;
        top: -0.4rem;
        right: 0;
      }
    }
  }
  .getCoins {
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 1000;
    background: RGB(0, 0, 0, 0.8);
    .getCoincCont {
      width: 5.99rem;
      height: 3.61rem;
      background: url(../assets/img/muttonBg.png) no-repeat;
      background-size: contain;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      .cloasCoun {
        display: block;
        width: 0.5rem;
        height: 0.5rem;
        background: url(../assets/img/cloas.png) no-repeat;
        background-size: contain;
        position: absolute;
        top: -0.3rem;
        right: 0rem;
      }
      .getMsg {
        width: 3.56rem;
        height: 3rem;
        position: absolute;
        top: 0.7rem;
        .coins {
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 140%;
          margin-top: 0.1rem;
          color: #ffe9bd;
          span {
            display: inline-block;
            width: 0.49rem;
            height: 0.52rem;
            margin-left: 0.15rem;
            background: url(../assets/img/coins.png) no-repeat;
            background-size: contain;
          }
        }
        .msg {
          padding: 0 0.1rem 0 0;
          text-align: center;
          color: #ffe9bd;
          font-weight: bold;
          font-size: 120%;
        }
        // .goShare {
        //   color: #fce302;
        //   font-size: 110%;
        //   text-align: center;
        //   font-weight: bold;
        //   margin-top: 0.1rem;
        // }
        .nextMsg {
          margin-top: 0.05rem;
          text-align: center;
          // padding: 0 0.2rem;
          font-size: 70%;
          // padding: 0 0.15rem;
          &.mt {
            margin-top: 0.2rem;
          }
        }
      }
      .btm {
        width: 4.3rem;
        height: 0.62rem;
        position: absolute;
        bottom: 0rem;
        display: flex;
        .guafen {
          display: inline-block;
          width: 2.83rem;
          color: #ffcb36;
          white-space: nowrap;
          text-align: center;
          font-size: 90%;
          line-height: 0.62rem;
        }
        .share {
          display: inline-block;
          width: 2.83rem;
          margin-left: 0.19rem;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #ffcb36;
          font-size: 120%;
          margin-right: 0.2rem;
          i {
            display: block;
            width: 0.22rem;
            height: 0.23rem;
            background: url(../assets/img/shareBg.png);
            background-size: 100% 100%;
            margin-left: 0.15rem;
          }
        }
      }
    }
  }
  // .nogetCoins {
  //   position: fixed;
  //   left: 0;
  //   top: 0;
  //   right: 0;
  //   bottom: 0;
  //   z-index: 99;
  //   background: RGB(0, 0, 0, 0.8);
  //   z-index: 1000;
  //   .getCoincCont {
  //     width: 7.16rem;
  //     height: 6.08rem;
  //     background: url(../assets/img/coinsBg.png) no-repeat;
  //     background-size: contain;
  //     position: absolute;
  //     top: 2.1rem;
  //     left: 0.21rem;
  //     .getMsg {
  //       width: 7.16rem;
  //       height: 4rem;
  //       position: absolute;
  //       top: 2rem;
  //       .nextMsg {
  //         margin-top: 0.4rem;
  //         direction: rtl;
  //         text-align: center;
  //         padding: 0 0.5rem;
  //       }
  //       .msg {
  //         direction: rtl;
  //         text-align: center;
  //         color: #00ffd2;
  //         font-weight: bold;
  //         font-size: 160%;
  //       }
  //       .goShare {
  //         color: #fce302;
  //         direction: rtl;
  //         font-size: 140%;
  //         text-align: center;
  //         font-weight: bold;
  //         margin-top: 0.2rem;
  //       }
  //       .btm {
  //         height: 0.92rem;
  //         margin-top: 0.2rem;
  //         .again {
  //           display: inline-block;
  //           width: 2.83rem;
  //           height: 0.92rem;
  //           background: url(../assets/img/defaluteTos.png) no-repeat;
  //           background-size: contain;
  //           margin-left: 0.69rem;
  //           color: #b98300;
  //           font-weight: bold;
  //           float: left;
  //           text-align: center;
  //           line-height: 0.88rem;
  //           direction: rtl;
  //         }
  //         .share {
  //           display: inline-block;
  //           width: 2.83rem;
  //           height: 0.92rem;
  //           background: url(../assets/img/share.png) no-repeat;
  //           background-size: contain;
  //           margin-left: 0.19rem;
  //         }
  //       }
  //     }
  //   }
  // }
  .makePup {
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 99;
    background: RGB(0, 0, 0, 0.8);
    z-index: 1000;
    .makeCon {
      width: 5.54rem;
      height: 3.07rem;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: rgba(232, 117, 25, 1);
      border: 0.04rem solid rgba(254, 194, 3, 1);
      border-radius: 0.3rem;
      p {
        text-align: center;
        top: 1.17rem;
        margin-top: 1.17rem;
      }
      span {
        display: inline-block;
        width: 2.63rem;
        height: 0.82rem;
        padding: 0.1rem 0.2rem 0 0.1rem;
        // background: url(../assets/img/defaluteTos.png) no-repeat;
        // background-size: contain;
        margin: 0.7rem 2rem 0 0;
        color: #b98300;
        font-size: 80%;
        text-align: center;
        line-height: 0.3rem;
      }
    }
    .cloesMake {
      display: block;
      width: 0.54rem;
      height: 0.54rem;
      background: url(../assets/img/cloas.png) no-repeat;
      background-size: contain;
      position: absolute;
      top: -1.1rem;
      right: 0rem;
    }
  }
  .errPup {
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 99;
    background: RGB(0, 0, 0, 0.8);
    z-index: 1000;
    .errCont {
      width: 7.1rem;
      height: 4.32rem;
      position: absolute;
      top: 4rem;
      left: 0.16rem;
      // background: url(../assets/img/pupbg.png) no-repeat;
      // background-size: contain;
      p {
        text-align: center;
        direction: rtl;
        top: 1.17rem;
        margin-top: 1.17rem;
      }
      span {
        display: inline-block;
        width: 2.63rem;
        height: 0.82rem;
        padding: 0.1rem 0.2rem 0 0.1rem;
        // background: url(../assets/img/defaluteTos.png) no-repeat;
        // background-size: contain;
        margin: 0.7rem 0 0 2rem;
        color: #b98300;
        font-size: 80%;
        text-align: center;
        line-height: 0.6rem;
      }
    }
  }
}
</style>
