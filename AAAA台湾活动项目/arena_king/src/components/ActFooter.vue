<template>
  <div class="footerBar">
    <div class="acrStatus" v-if="mainTab!==1">
      <span class="noAct" v-if="astState === 0">活動未開始</span>
      <span class="noAct" v-if="astState === 2">活動已結束</span>
      <span class="goAct" v-if="astState === 1" @click="singUp()">報名參賽</span>
      <div class="actIng" v-if="astState === 3">
        <div class="rank">
          <em v-if="userMsg.winner" class="winnerTips"></em>
          <em>{{tab ==1?userMsg.rank:userMsg2.rank}}</em>
        </div>
        <img v-lazy="userMsg.avatar" alt="">
        <div class="score">
          <i :class="{leitai:tab==2}"></i>
          <em>{{tab ==1?userMsg.score:userMsg2.score}}</em>
        </div>
        <div class="default" :class="{promotionTips:userMsg.up == 1 && tab ==1}"></div>
        <div class="goPk" @click="goPk()">匹配K房</div>
      </div>
    </div>
    <transition name="slide">
      <div class="singUpSuccess" v-show="singUpSuccess">
        <div class="content">
          <span class="close" @click="closeSucPup()"></span>
          <p>您已報名參與擂臺之王爭霸賽</p>
          <span class="goPk" @click="goPk()">匹配K房</span>
        </div>
      </div>
    </transition>
    <transition name="slide">
      <msg-toast :msg="tastMsg" @closeToast="closeToast()" v-show="showT"></msg-toast>
    </transition>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import MsgToast from "./commonToast"
import api from '../api/apiConfig'
import { globalBus } from '../utils/eventBus'
export default {
  components: { MsgToast },
  data() {
    return {
      singUpSuccess: false,
      tastMsg: ``,
      showT: false
    }
  },
  computed: {
    ...mapState(['actStatus', 'userMsg', "userMsg2", "isShare", "tab", "step1", "mainTab"]),
    astState() {
      if (this.actStatus === 0) { //活动未开始
        return 0
      } else if (this.actStatus === 2) { //活动已结束
        return 2
      } else if ((this.userMsg && !this.userMsg.registered) || this.isShare) { //活动开始未报名，或者分享
        return 1
      } else if (this.userMsg.registered && this.mainTab == 0) { //活动开始已报名
        return 3
      }
    }
  },
  methods: {
    singUp() {
      globalBus.$emit('commonEvent', () => {
        if (this.step1 == 2) {
          this.tastMsg = `風雲賽已結束!`
          this.showT = true
        } else {
          api.singUp(this.tab).then(res => {
            if (res.data.response_status.code == 0) {
              this.singUpSuccess = true
              this.$store.commit('singUpSuc', res.data.response_data.owner)
            } else {
              this.tastMsg = res.data.response_status.error
              this.showT = true
            }
          })
        }
      })
    },
    goPk() {
      globalBus.$emit('commonEvent', () => {
        api.goPk().then(res => {
          if (res.data.response_status.code == 0) {
            if (res.data.response_data.rid > 0) {
              location.href = `rid:${res.data.response_data.rid}`
            } else {    //目前没有公开的PK房间哦
              this.tastMsg = `目前没有公开的PK房间哦!`
              this.showT = true
            }
          } else {
            this.tastMsg = res.data.response_status.error
            this.showT = true
          }
        })
      })
    },
    closeSucPup() {
      this.singUpSuccess = false
    },
    closeToast() {
      this.showT = false
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
  z-index: 1000;
  .acrStatus {
    width: 7.5rem;
    height: 1.55rem;
    margin: auto;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    background: url(../assets/img/footer.png) no-repeat;
    background-size: 100% 100%;
    span {
      display: inline-block;
    }
    .noAct {
      margin-top: 0.5rem;
    }
    .goAct {
      width: 2.89rem;
      height: 0.79rem;
      margin-top: 0.5rem;
      color: #532e01;
      font-size: 98%;
      text-align: center;
      line-height: 0.79rem;
      background: url(../assets/img/singUpBg.png);
      background-size: 100% 100%;
    }
    .actIng {
      width: 7.5rem;
      height: 1.2rem;
      margin-top: 0.3rem;
      display: flex;
      align-items: center;
      .rank {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin-left: 0.32rem;
        width: 1rem;
        .winnerTips {
          display: block;
          width: 0.83rem;
          height: 0.85rem;
          background: url(../assets/img/rankLei.png);
          background-size: 100% 100%;
        }
        em {
          color: #864e22;
        }
      }
      img {
        width: 0.78rem;
        height: 0.77rem;
        margin-left: 0.07rem;
        border-radius: 50%;
        border: 0.02rem solid rgba(232, 157, 23, 1);
      }
      .score {
        width: 1.6rem;
        display: flex;
        align-items: center;
        margin-left: 0.17rem;
        i {
          display: block;
          width: 0.39rem;
          height: 0.4rem;
          margin-right: 0.1rem;
          background: url(../assets/img/Microphone.png);
          background-size: 100% 100%;
          &.leitai {
            width: 0.43rem;
            height: 0.44rem;
            background: url(../assets/img/leizhu.png);
            background-size: 100% 100%;
          }
        }
        em {
          color: #fff88e;
          font-size: 98%;
        }
      }
      .default {
        width: 0.99rem;
        height: 0.39rem;
        margin: 0 0.15rem;
        &.promotionTips {
          background: url(../assets/img/promotionTips.png);
          background-size: 100% 100%;
        }
      }
      .goPk {
        width: 2.04rem;
        height: 0.71rem;
        line-height: 0.71rem;
        text-align: center;
        color: #532e01;
        background: url(../assets/img/goPk.png);
        background-size: 100% 100%;
      }
    }
  }
  .singUpSuccess {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.8);
    z-index: 1000;
    .content {
      width: 5.34rem;
      height: 3.28rem;
      background: url(../assets/img/successPup.png);
      background-size: 100% 100%;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      .close {
        display: block;
        width: 0.58rem;
        height: 0.58rem;
        background: url(../assets/img/close.png);
        background-size: 100% 100%;
        top: 0.15rem;
        right: 0.15rem;
        position: absolute;
      }
      p {
        width: 100%;
        color: #583500;
        text-align: center;
        position: absolute;
        top: 1.1rem;
      }
      .goPk {
        width: 2.04rem;
        height: 0.71rem;
        line-height: 0.71rem;
        text-align: center;
        color: #532e01;
        position: absolute;
        bottom: 0.36rem;
        left: 1.65rem;
        background: url(../assets/img/goPk.png);
        background-size: 100% 100%;
      }
    }
  }
}
</style>
