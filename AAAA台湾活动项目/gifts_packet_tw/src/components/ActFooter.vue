<template>
  <div class="footerBar">
    <div class="acrStatus">
      <span class="noAct" v-if="astState === 0">活動未開始</span>
      <span class="noAct" v-if="astState === 2">活動已結束</span>
      <span class="goAct" v-if="astState === 1" @click="singUp()">立即報名</span>
      <div class="actIng" v-if="astState === 3" :class="'rank'+ nowMsg.rank">
        <div class="top" :class="'top'+ nowMsg.rank">
          {{nowMsg.rank}}
        </div>
        <img v-lazy="owner.avatar" alt="" class="userImg">
        <div class="userMsg">
          <div class="name">{{owner.nick}}</div>
          <div class="id">{{owner.uid}}</div>
        </div>
        <div class="score" v-if="tab == 0">
          <i></i> {{nowMsg.score}}
        </div>
        <div class="score" v-else>
          <i></i> {{nowMsg.score}}
        </div>
      </div>
    </div>
    <transition name="slide">
      <msg-toast :msg="tastMsg" @closeToast="closeToast()" v-show="showT"></msg-toast>
    </transition>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import api from "../api/apiConfig"
import MsgToast from "../components/commonToast"
import { globalBus } from '../utils/eventBus'
export default {
  components: { MsgToast },
  data() {
    return {
      tastMsg: '',
      showT: false
    }
  },
  computed: {
    ...mapState(['actStatus', "isShare", "owner", "owner2", "tab"]),
    astState() {
      if (this.actStatus === 0) { //活动未开始
        return 0
      } else if (this.actStatus === 2) { //活动已结束
        return 2
      } else if (!this.owner.registered || this.isShare) { //活动开始未报名，或者分享
        return 1
      } else if (this.owner.registered) { //活动开始已报名
        return 3
      }
    },
    nowMsg() {
      return this.tab == 0 ? this.owner : this.owner2
    }
  },
  methods: {
    singUp() {
      // var ios = navigator.userAgent.match(/iPhone|iPod|ios|iPad/i)
      // if (ios) {
      //   this.tastMsg = '本次活動僅支持安卓用戶參與，IOS用戶敬請期待!'
      //   this.showT = true
      //   return
      // }
      globalBus.$emit('commonEvent', () => {
        api.singUp().then(res => {
          if (res.data.response_status.code == 0) {
            this.tastMsg = '報名成功！'
            this.showT = true
            this.$store.commit('setOwer', res.data.response_data.owner)
          } else {
            this.showT = true
            this.tastMsg = res.data.response_status.error
          }
        })
      })
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
    height: 1.26rem;
    margin: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    background: url(../assets/img/footer.png) no-repeat;
    background-size: contain;
    span {
      display: inline-block;
      font-weight: 600;
    }
    .goAct {
      display: block;
      width: 3.66rem;
      height: 0.9rem;
      background: url(../assets/img/tab1.png);
      background-size: 100% 100%;
      color: #ae4800;
      font-weight: bold;
      font-size: 0.42rem;
      text-align: center;
      line-height: 0.9rem;
    }
    .actIng {
      width: 7.5rem;
      height: 1.21rem;
      display: flex;
      align-items: center;
      margin-top: 0.1rem;
      .top {
        min-width: 0.84rem;
        height: 0.73rem;
        color: #fefed5;
        font-weight: bold;
        font-size: 0.36rem;
        text-align: center;
        line-height: 0.73rem;
        margin: 0 0.1rem 0 0.52rem;
      }
      .userImg {
        width: 0.89rem;
        height: 0.89rem;
        border-radius: 50%;
        border: 0.03rem solid #ffe0b3;
        font-size: 0.24rem;
        color: #fffaee;
      }
      .userMsg {
        width: 2rem;
        margin-left: 0.05rem;
        .name {
          max-width: 2rem;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
        .id {
          font-size: 0.24rem;
          color: #b05416;
          margin-top: 0.05rem;
        }
      }
      .score {
        font-size: 0.28rem;
        color: #9a2d02;
        font-weight: 500;
        margin-left: 0.05rem;
        i {
          display: inline-block;
          width: 0.4rem;
          height: 0.61rem;
          vertical-align: middle;
          margin: -0.2rem 0.15rem 0;
          background: url(../assets/img/redBack.png);
          background-size: 100% 100%;
        }
      }
      &.rank1 {
        .top {
          text-indent: -999rem;
          background: url(../assets/img/top1.png);
          background-size: 100% 100%;
        }
      }
      &.rank2 {
        .top {
          text-indent: -999rem;
          background: url(../assets/img/top2.png);
          background-size: 100% 100%;
        }
      }
      &.rank3 {
        .top {
          text-indent: -999rem;
          background: url(../assets/img/top3.png);
          background-size: 100% 100%;
        }
      }
    }
  }
}
</style>
