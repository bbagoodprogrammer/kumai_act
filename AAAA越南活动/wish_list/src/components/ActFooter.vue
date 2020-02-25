<template>
  <div class="footerBox">
    <div class="footerBar">
      <div class="acrStatus" :class="{black:userMsgState.count<=0}">
        <span class="noAct" v-if="astState === 0">Sự kiện chưa bắt đầu</span>
        <span class="noAct" v-if="astState === 2">Sự kiện đã kết thúc</span>
        <span class="goAct" v-if="astState === 1" @click="showChoosingPup()">
          <div class="title">Gửi Điều Ước</div>
          <div class="shengyu">Lượt gửi hôm nay: {{userMsgState.count}}</div>
          <span class="history" @click.stop="showHistory()"></span>
        </span>
      </div>
    </div>
    <transition name="slide">
      <wish-history v-show="showHistoryPup" @closePup="closePup()" ref="history"></wish-history>
    </transition>
    <transition name="slide">
      <msg-toast :msg="tastMsg" @closeToast="closeToast()" v-show="showT"></msg-toast>
    </transition>
  </div>

</template>
<script>
import { mapState } from 'vuex'
import api from "../api/apiConfig"
import getString from "../utils/getString"
import WishHistory from "./WishHistory"
import MsgToast from "../components/commonToast"
import APP from "../utils/openApp"
import { globalBus } from '../utils/eventBus'
export default {
  components: { WishHistory, MsgToast },
  data() {
    return {
      showHistoryPup: false,
      tastMsg: '',
      showT: false,
    }
  },
  computed: {
    ...mapState(['actStatus', 'registered', 'isShare', 'userMsgState']),
    astState() {
      if (this.actStatus === 0) { //活动未开始
        return 0
      } else if (this.actStatus === 2) { //活动已结束
        return 2
      } else {
        return 1
      }
    }
  },
  methods: {
    showChoosingPup() {
      globalBus.$emit('commonEvent', () => {
        if (this.userMsgState.count <= 0) {
          this.tastMsg = `Không đủ lượt!`
          this.showT = true
        } else {
          let regstr = getString('token')
          location.href = `./index3.html?token=${regstr}`
        }
      })
    },
    showHistory() {
      if (this.isShare) {
        APP()
        return
      }
      this.$refs.history.showCom = 'History1'
      api.wishHistory('done', 0).then((res) => {
        if (res.data.response_status.code === 0) {
          this.showHistoryPup = true
          this.$store.commit('changHistory1', res.data.response_data)
        }
      })
    },
    closePup() {
      this.showHistoryPup = false
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
  z-index: 9;
  .acrStatus {
    width: 7.5rem;
    height: 2.03rem;
    margin: auto;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    background: url(../assets/img/footerBg.png) no-repeat;
    background-size: contain;
    &.black {
      background: url(../assets/img/blackFooterBg.png) no-repeat;
      background-size: contain;
    }
    .noAct {
      margin-top: 0.6rem;
    }
    span {
      display: inline-block;
    }
    .goAct {
      width: 7.5rem;
      height: 1.53rem;
      margin-top: 0.5rem;
      position: relative;
      .title {
        font-size: 120%;
        color: #fffde3;
        margin-top: 0.35rem;
      }
      .shengyu {
        // margin-top: 0.2rem;
        color: #fcf872;
        font-size: 85%;
      }
      .history {
        display: block;
        width: 1.47rem;
        height: 0.79rem;
        background: url(../assets/img/history.png);
        background-size: 100% 100%;
        position: absolute;
        top: 0.41rem;
        right: 0.32rem;
        z-index: 15;
      }
    }
  }
}
</style>
