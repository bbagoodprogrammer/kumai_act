<template>
  <div class="actFooter">
    <div class="actState">
      <span class="noAct" v-if="astState === 0">活動未開始</span>
      <span class="noAct" v-if="astState === 2">活動已结束</span>
      <span class="goAct" v-if="astState === 1" @click="singUp()"></span>
      <span class="actIng" v-if="astState === 3"></span>
      <span class="acted" v-if="astState === 4"></span>
    </div>
    <msg-toast :msg="tastMsg" @closeToast="closeToast()" v-show="showT"></msg-toast>
    <transition name="slide">
      <div class="nowardsPup" v-show="goSingUp">
        <div class="nowardCon">
          <div class="nowardsMsg">
            {{showMsg}}
          </div>
          <div class="go" @click="cloesNoWard()"></div>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import APP from "../utils/openApp"
import MsgToast from "../components/commonToast"
import api from "../api/apiConfig"
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
    ...mapState(['activeityState', 'registered', "isShare", "packets"]),
    astState() {
      if (this.activeityState === 0) { //活动未开始
        return 0
      } else if (this.activeityState === 2) { //活动已结束
        return 2
      } else if ((this.activeityState === 1 && !this.registered) || this.isShare) { //活动开始未报名，或者分享
        return 1
      } else if (this.activeityState === 1 && this.registered) { //活动开始已报名
        return 3
      } else if (this.activeityState === 1 && this.packets[this.packets.length - 1].status) {  //活动开始完成任务
        return 4
      }
    }
  },
  methods: {
    singUp() {
      if (this.isShare) {
        APP()
        return
      }
      api.singUp().then((res) => {
        if (res.data.response_status.code === 0) { //注册成功
          this.$store.commit('changRegistered', true) //用户是否报名
          //刷新默认接口
          this.$emit('getDefaultData')
        } else if (res.data.response_status.code === 20010) { //等级过高
          this.showMsg = `本活動僅限銅牌及以下用戶參與,</br>您可以前往參加其他有趣的活動！`
          this.goSingUp = true
        } else if (res.data.response_status.code === 20011) { //相同设备注册
          this.showMsg = `本活動限定正式及以下歌手參與，且不能用相同設備註冊哦！`
          this.goSingUp = true
        }
      })
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
<style lang="scss">
.nowardsPup {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  z-index: 10000;
  .nowardCon {
    width: 5.49rem;
    height: 2.68rem;
    padding: 0.58rem 0.7rem 0;
    background: url(../assets/img/noWardBg.png) no-repeat;
    background-size: 100% 100%;
    position: absolute;
    left: 0.3rem;
    top: 4rem;
    .nowardsMsg {
      font-size: 120%;
      color: #4178bb;
      text-align: center;
      line-height: 0.55rem;
    }
    .go {
      width: 1.58rem;
      height: 0.62rem;
      background: url(../assets/img/qust.png) no-repeat;
      background-size: 100% 100%;
      margin: 0.37rem auto;
    }
  }
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
  .actState {
    width: 7.5rem;
    height: 0.97rem;
    padding-top: 0.34rem;
    background: url(../assets/img/footerBg.png) no-repeat;
    background-size: 100% 100%;
    margin: auto;
    .noAct {
      display: block;
      text-align: center;
      margin: 0.18rem auto;
    }
    .goAct {
      display: block;
      width: 2.8rem;
      height: 0.62rem;
      margin: 0 auto;
      background: url(../assets/img/goAct.png) no-repeat;
      background-size: 100% 100%;
    }
    .actIng {
      display: block;
      width: 2.8rem;
      height: 0.62rem;
      margin: 0 auto;
      background: url(../assets/img/actIng.png) no-repeat;
      background-size: 100% 100%;
    }
    .acted {
      display: block;
      width: 2.8rem;
      height: 0.62rem;
      margin: 0 auto;
      background: url(../assets/img/acted.png) no-repeat;
      background-size: 100% 100%;
    }
  }
}
</style>
