<template>
  <div class="actFooter" v-if="astState != 6">
    <div class="actState">
      <span v-if="astState === 0">لم يبدأ النشاط</span>
      <span v-if="astState === 2">انتهى النشاط</span>
      <span class="goAct" v-if="astState === 1" @click="singUp()">التسجيل الآن</span>
      <!-- <span class="upload" v-if="astState === 3">اختيار للاشتراك</span> -->
      <span class="shouli" v-if="astState === 4">
        <div class="rank">{{shouliMsg.rank}}</div>
        <div class="imgBox">
          <img v-lazy="shouliMsg.avatar" alt="" class="img1">
        </div>
        <div class="userMsg">
          <div class="name">{{shouliMsg.nick}}</div>
          <div class="givingPeople">عدد المصباح المتلقى : <em>{{shouliMsg.score}}</em></div>
        </div>
        <!-- <div class="surplusLamp">
          <span class="title">عدد الجان الباقي</span>
          <span class="num">{{shouliMsg.spirit_counts}}</span>
        </div> -->
      </span>
      <div class="songli" v-if="astState === 5">
        <div class="rank">{{songliMsg.rank}}</div>
        <div class="imgBox">
          <img v-lazy="songliMsg.avatar" alt="" class="img1">
        </div>
        <div class="userMsg">
          <div class="name">{{songliMsg.nick}}</div>
          <div class="givingPeople">عدد المصباح المقدم : <em>{{songliMsg.score}}</em></div>
        </div>
        <!-- <div class="surplusLamp">
          <span class="title">عدد الجان الباقي</span>
          <span class="num">{{songliMsg.spirit_counts}}</span>
        </div> -->
      </div>
      <span class="leftLampGod"></span>
      <span class="rigthLampGod" v-if="astState != 4 && astState != 5"></span>
    </div>
    <msg-toast :msg="tastMsg" @closeToast="closeToast()" v-show="showT"></msg-toast>
    <!-- <transition name="slide">
      <div class="nowardsPup" v-show="goSingUp">
        <div class="nowardCon">
          <div class="nowardsMsg">
            {{showMsg}}
          </div>
          <div class="go" @click="cloesNoWard()"></div>
        </div>
      </div>
    </transition> -->
  </div>
</template>
<script>
import { mapState } from 'vuex'
import APP from "../utils/openApp"
import MsgToast from "../components/commonToast"
import api from "../api/apiConfig"
import getString from "../utils/getString.js"
export default {
  components: { MsgToast },
  data() {
    return {
      tastMsg: '',
      showT: false,
      goSingUp: false,
      showMsg: ''
    }
  },
  computed: {
    ...mapState(['activeityState', 'shouliMsg', "isShare", "nowTab", "songliMsg"]),
    astState() {
      if (this.activeityState === 0) { //活动未开始
        return 0
      } else if (this.activeityState === 2) { //活动已结束
        return 2
      } else if ((this.activeityState === 1 && this.shouliMsg.is_reg === 0 && this.nowTab == 'giving') || this.isShare) { //收礼榜单报名按钮
        return 1
      } else if ((this.activeityState === 1 || this.activeityState === 2) && this.shouliMsg.is_reg === 1 && this.nowTab == 'giving') {  //收礼榜单个人信息
        return 4
      } else if ((this.activeityState === 1 || this.activeityState === 2) && this.songliMsg.score > 0 && this.nowTab == 'receiving') {  //送礼榜个人信息
        return 5
      } else if ((this.activeityState === 1 || this.activeityState === 2) && this.songliMsg.score <= 0 && this.nowTab == 'receiving') { //送礼榜单空显示
        return 6
      }
    }
  },
  methods: {
    singUp() {
      if (this.isShare) {
        APP()
        return
      } else if (this.activeityState === 0) {
        this.tastMsg = "لم يبدأ النشاط!"
        this.showT = true
      } else if (this.activeityState === 2) {
        this.tastMsg = "انتهى النشاط!"
        this.showT = true
      } else {
        let regstr = getString('token')
        location.href = `./index3.html?token=${regstr}`
      }
    },
    cloesNoWard() {
      this.goSingUp = false
    },
    closeToast() {
      this.showT = false
    }
  }
}
</script>
<style lang="scss" scoped>
.nowardsPup {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  z-index: 10000;
}
.slide-enter-active {
  animation-name: slideInUp;
  animation-duration: 0.2s;
  animation-fill-mode: both;
}
.slide-leave-active {
  animation-name: slideOutDown;
  animation-duration: 0.2s;
  animation-fill-mode: both;
}
@keyframes slideInUp {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.2);
  }
  to {
    transform: scale(1);
  }
}
@keyframes slideOutDown {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.2);
  }
  to {
    transform: scale(0);
  }
}
.actFooter {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  .actState {
    width: 7.5rem;
    height: 1.19rem;
    background: url(../assets/img/footerBg.png) no-repeat;
    background-size: 100% 100%;
    text-align: center;
    line-height: 1.19rem;
    margin: auto;
    position: relative;
    span {
      display: inline-block;
    }
    .leftLampGod {
      display: inline-block;
      width: 1.44rem;
      height: 1.58rem;
      background: url(../assets/img/leftLampGod.png);
      background-size: 100% 100%;
      position: absolute;
      bottom: 0;
      left: 0;
    }
    .rigthLampGod {
      display: inline-block;
      width: 1.44rem;
      height: 1.58rem;
      background: url(../assets/img/rigthLampGod.png);
      background-size: 100% 100%;
      position: absolute;
      bottom: 0;
      right: 0;
    }
    .goAct {
      width: 3.51rem;
      height: 0.76rem;
      background: url(../assets/img/footerStateBg.png) no-repeat;
      background-size: 100% 100%;
      margin-top: 0.22rem;
      line-height: 0.7rem;
    }
    .upload {
      width: 3.51rem;
      height: 0.76rem;
      background: url(../assets/img/footerStateBg.png) no-repeat;
      background-size: 100% 100%;
      margin-top: 0.22rem;
      line-height: 0.7rem;
    }
    .songli {
      display: flex;
      height: 1.16rem;
      padding-right: 0.28rem;
      align-items: center;
      .rank {
        width: 0.75rem;
        height: 0.65rem;
        line-height: 0.65rem;
        text-align: center;
        color: #ffbb8d;
        font-size: 120%;
      }
      .imgBox {
        width: 0.9rem;
        height: 0.9rem;
        margin-right: 0.11rem;
        > .img1 {
          width: 0.9rem;
          height: 0.9rem;
          border-radius: 50%;
          border: 0.02rem solid #ffee78;
        }
      }
      .userMsg {
        width: 2.85rem;
        margin-right: 0.16rem;
        display: flex;
        flex-direction: column;
        div {
          flex: 1;
          font-size: 70%;
          line-height: 0.5rem;
          text-align: right;
        }
        .name {
          width: 1.8rem;
          color: #fffcef;
          overflow: hidden; /*超出部分隐藏*/
          text-overflow: ellipsis; /* 超出部分显示省略号 */
          white-space: nowrap;
        }
        .givingPeople {
          color: #fff8ab;
          em {
            color: #fff8ab;
            font-size: 80%;
            margin-right: 0.01rem;
          }
        }
        .showMsg {
          width: 100%;
          color: #dac1ff;
          overflow: hidden; /*超出部分隐藏*/
          text-overflow: ellipsis; /* 超出部分显示省略号 */
          white-space: nowrap;
          em {
            color: #3effd4;
            font-size: 80%;
          }
        }
      }
      .surplusLamp {
        position: absolute;
        left: 1.44rem;
        font-size: 70%;
        span {
          display: block;
          line-height: 0.5rem;
        }
        .title {
          font-size: 120%;
          color: #3effd4;
          font-weight: bold;
        }
        .num {
          color: #3effd4;
          font-size: 160%;
        }
      }
    }
    .shouli {
      display: flex;
      height: 1.16rem;
      padding-right: 0.28rem;
      align-items: center;
      .rank {
        width: 0.75rem;
        height: 0.65rem;
        line-height: 0.65rem;
        text-align: center;
        color: #ffbb8d;
        font-size: 120%;
      }
      .imgBox {
        width: 0.9rem;
        height: 0.9rem;
        margin-right: 0.11rem;
        > .img1 {
          width: 0.9rem;
          height: 0.9rem;
          border-radius: 50%;
          border: 0.02rem solid #ffee78;
        }
      }
      .userMsg {
        width: 2.85rem;
        margin-right: 0.16rem;
        display: flex;
        flex-direction: column;
        div {
          flex: 1;
          font-size: 70%;
          line-height: 0.5rem;
          text-align: right;
        }
        .name {
          width: 1.8rem;
          color: #fffcef;
          overflow: hidden; /*超出部分隐藏*/
          text-overflow: ellipsis; /* 超出部分显示省略号 */
          white-space: nowrap;
        }
        .givingPeople {
          color: #fff8ab;
          em {
            color: #fff8ab;
            font-size: 80%;
            margin-right: 0.01rem;
          }
        }
        .showMsg {
          width: 100%;
          color: #dac1ff;
          overflow: hidden; /*超出部分隐藏*/
          text-overflow: ellipsis; /* 超出部分显示省略号 */
          white-space: nowrap;
          em {
            color: #3effd4;
            font-size: 80%;
          }
        }
      }
      .surplusLamp {
        position: absolute;
        left: 1.44rem;
        font-size: 70%;
        span {
          display: block;
          line-height: 0.5rem;
        }
        .title {
          font-size: 120%;
          color: #3effd4;
          font-weight: bold;
        }
        .num {
          color: #3effd4;
          font-size: 160%;
        }
      }
    }
  }
}
</style>
