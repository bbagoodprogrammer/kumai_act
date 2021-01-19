<template>
  <div class="footerBar">
    <div class="acrStatus">
      <span class="noAct" v-if="astState === 0">{{lang.noStart}}</span>
      <span class="noAct" v-if="astState === 2">{{lang.actEnd}}</span>
      <span class="goAct" v-if="astState === 1" @click="singUp()"></span>
      <div class="actIng" v-if="astState === 3">
        <div class="avatar">
          <img src="../assets/img/userAv.png" alt="" class="defa">
          <img v-lazy="userMsg.avatar" alt="" class="user">
        </div>
        <div class="userMsg">
          <span class="vip">{{lang.nowVip}}<strong>VIP <i>{{userMsg.vip}}</i></strong></span>
          <span class="num">{{lang.ci}} <strong>{{userMsg.chances}}</strong></span>
        </div>
        <div class="goVip" @click="showBuyVip()">{{lang.goVip}}</div>
      </div>
      <div class="mask" v-show="showGoVip">
        <transition name="slide">
          <div class="goVipHtml" v-show="showGoVip">
            <div class="title"></div>
            <i class="close" @click="closeBuyVip()"></i>
            <h3 v-html="lang.thankGift"></h3>
            <div class="table">
              <ul>
                <li class="tabHeader">
                  <span class="bor">{{lang.buyTime}}</span>
                  <span>{{lang.buyNum}}</span>
                </li>
                <li>
                  <span class="bor">شهر</span>
                  <span>2</span>
                </li>
                <li>
                  <span class="bor">ثلاثة شهور</span>
                  <span>6</span>
                </li>
                <li>
                  <span class="bor">ستة شهور</span>
                  <span>14</span>
                </li>
                <li>
                  <span class="bor">سنة</span>
                  <span>30</span>
                </li>
              </ul>
            </div>
            <span class="external" @click="goHtml()">{{lang.buy}}</span>
          </div>
        </transition>
      </div>
      <transition name="slide">
        <msg-toast :msg="tastMsg" @closeToast="closeToast()" v-show="showT"></msg-toast>
      </transition>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import MsgToast from "../components/commonToast"
import api from "../api/apiConfig"
import { globalBus } from '../utils/eventBus'
import getString from "../utils/getString"
export default {
  components: { MsgToast },
  data() {
    return {
      showGoVip: false,
      showT: false,  //提示弹窗显示
      tastMsg: "",  //基础弹窗提示信息
    }
  },
  computed: {
    ...mapState(['actStatus', "isShare", "userMsg"]),
    astState() {
      if (this.actStatus === 0) { //活动未开始
        return 0
      } else if (this.actStatus === 2) { //活动已结束
        return 2
      } else if (!this.userMsg.registered || this.isShare) { //活动开始未报名，或者分享
        return 1
      } else if (this.userMsg.registered) { //活动开始已报名
        return 3
      }
    }
  },
  methods: {
    singUp() {
      globalBus.$emit('commonEvent', () => {
        api.singUp().then(res => {
          const { response_data, response_status } = res.data
          if (response_status.code == 0) {
            this.vux('changUserMsg', response_data.user_info)
          } else {
            this.tastMsg = response_status.error
            this.showT = true
          }
        })
      })
    },
    showBuyVip() {
      this.showGoVip = true
    },
    closeBuyVip() {
      this.showGoVip = false
    },
    closeToast() {
      this.showT = false
    },
    goHtml() {
      let token = getString("token")
      let uid = getString("uid")
      location.href = `http://act.supervoice-app.com/html/member_new/index.html?token=${token}&uid=${uid}&v=2&lang=ar`
    }
  }
}
</script>
<style lang="scss">
.footerBar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 100;
  .acrStatus {
    width: 7.5rem;
    height: 1.26rem;
    margin: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    background: url(../assets/img/footer.png) no-repeat;
    background-size: 100% 100%;
    font-weight: 650;
    span {
      display: inline-block;
    }
    .goAct {
      display: block;
      width: 3.66rem;
      height: 0.9rem;
      background: url(../assets/img/singUp.png);
      background-size: 100% 100%;
      margin-top: 0.15rem;
    }
    .actIng {
      width: 7.5rem;
      height: 1.09rem;
      display: flex;
      .avatar {
        width: 1.09rem;
        height: 1.09rem;
        position: relative;
        margin-right: 0.18rem;
        .user {
          width: 1rem;
          height: 1rem;
          position: absolute;
          left: 0.045rem;
          top: 0.045rem;
          border-radius: 50%;
        }
        .defa {
          width: 1.09rem;
          height: 1.09rem;
          position: absolute;
          top: 0;
          left: 0;
        }
      }
      .userMsg {
        margin-right: 0.07rem;
        height: 0.7rem;
        color: #833600;
        font-size: 0.24rem;
        margin-top: 0.2rem;
        span {
          display: block;
          height: 50%;
          line-height: 0.5rem;
          font-weight: normal;
          white-space: nowrap;
          strong {
            font-size: 0.36rem;
            font-weight: bold;
            color: #fff;
            margin-left: 0.15rem;
          }
          i {
            font-size: 0.36rem;
            font-weight: bold;
            margin-left: 0.05rem;
          }
        }
      }
      .goVip {
        width: 2.43rem;
        height: 0.8rem;
        line-height: 0.8rem;
        font-weight: bold;
        font-size: 0.32rem;
        color: #ae4800;
        text-align: center;
        background: url(../assets/img/goVip.png);
        background-size: 100% 100%;
        margin: 0.22rem 0.18rem 0 0;
      }
    }
  }
  .goVipHtml {
    width: 6.21rem;
    height: 5.48rem;
    background: url(../assets/img/pup1.png);
    background-size: 100% 100%;
    position: absolute;
    left: 0.69rem;
    top: 4.2rem;
    .title {
      width: 5.49rem;
      height: 2.07rem;
      background: url(../assets/img/pupTitle.png);
      background-size: 100% 100%;
      position: absolute;
      left: 0.36rem;
      top: -2.07rem;
    }
    .close {
      display: block;
      width: 0.8rem;
      height: 0.8rem;
      background: url(../assets/img/close.png);
      background-size: 100% 100%;
      position: absolute;
      right: 0;
      top: -1rem;
    }
    h3 {
      height: 1.2rem;
      padding: 0 0.3rem;
      text-align: center;
      font-size: 0.3rem;
      line-height: 0.45rem;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .table {
      width: 4.66rem;
      height: 3.56rem;
      margin: 0 auto;
      overflow: hidden;
      border-radius: 0.28rem;
      ul {
        li {
          height: 0.7rem;
          line-height: 0.7rem;
          background: rgba(255, 201, 158, 1);
          display: flex;
          box-sizing: border-box;
          border-bottom: 0.03rem solid rgba(255, 224, 199, 1);
          span {
            display: block;
            flex: 1;
            text-align: center;
            font-weight: bold;
            font-size: 0.26rem;
          }
          .bor {
            border-left: 0.03rem solid rgba(255, 224, 199, 1);
          }
          &.tabHeader {
            height: 0.8rem;
            background: rgba(229, 150, 87, 1);
          }
        }
      }
    }
    .external {
      width: 2.83rem;
      height: 0.92rem;
      background: url(../assets/img/go.png);
      background-size: 100% 100%;
      font-size: 0.36rem;
      color: #ae4800;
      font-weight: bold;
      line-height: 0.93rem;
      text-align: center;
      position: absolute;
      left: 1.75rem;
      bottom: -0.4rem;
    }
  }
}
</style>
