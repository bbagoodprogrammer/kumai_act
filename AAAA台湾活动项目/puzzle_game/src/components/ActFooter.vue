<template>
  <div class="footerBar">
    <div class="acrStatus">
      <span class="noAct" v-if="astState === 0">活動未開始</span>
      <span class="noAct" v-if="astState === 2">活動已結束</span>
      <span class="goAct" v-if="astState === 1" @click="singUp()">立即報名</span>
      <div class="actIng" v-if="astState === 3">
        <span class="itemRank">{{userMsg.rank}}</span>
        <div class="imgBox">
          <img v-lazy="userMsg.avatar" alt="">
        </div>
        <div class="uerMsg">
          <div class="name">{{userMsg.nick}}</div>
          <div class="uid">已合成拼圖：<em>{{puzzle_total_counts}}</em> 張</div>
        </div>
        <div class="scoreBox">
          <div class="score"> <i>感恩值 : </i> <em>{{userMsg.score}}</em> </div>
          <div class="giftItem">
            <span class="hear"> <i></i> {{userMsg.charm_score}}</span>
            <span class="star"> <i></i> {{userMsg.task_score}}</span>
          </div>
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
import { globalBus } from "../utils/eventBus"
import MsgToast from "../components/commonToast"
export default {
  components: { MsgToast },
  data() {
    return {
      tastMsg: '',
      showT: false
    }
  },
  computed: {
    ...mapState(['actStatus', 'userMsg', "isShare", "puzzle_total_counts"]),
    astState() {
      if (this.actStatus === 0) { //活动未开始
        return 0
      } else if (this.actStatus === 2) { //活动已结束
        return 2
      } else if ((this.actStatus === 1 && this.userMsg.is_reg == 0) || this.isShare) { //活动开始未报名，或者分享
        return 1
      } else if (this.actStatus === 1 && this.userMsg.is_reg == 1) { //活动开始已报名
        return 3
      }
    }
  },
  methods: {
    singUp() {
      globalBus.$emit('commonEvent', callback => {
        api.singUp().then(res => {
          if (res.data.response_status.code == 0) {
            const newMsg = res.data.response_data.owner_msg
            this.$store.commit('singUped', newMsg)
          } else {
            this.tastMsg = res.data.response_status.error
            this.showT = true
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
    height: 1.5rem;
    margin: auto;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    background: url(../assets/img/footerBg.png) no-repeat;
    background-size: contain;
    > span {
      display: inline-block;
      margin-top: 0.5rem;
    }
    .goAct {
      display: block;
      width: 3.05rem;
      height: 0.85rem;
      font-size: 120%;
      line-height: 0.65rem;
      color: #661714;
      background: url(../assets/img/synthesisBtn.png);
      background-size: 100% 100%;
    }
    .actIng {
      width: 7.5rem;
      height: 1.33rem;
      margin-top: 0.35rem;
      display: flex;
      align-items: center;
      .itemRank {
        width: 0.9rem;
        line-height: 0.65rem;
        height: 0.65rem;
        color: #af3600;
        font-size: 120%;
        margin-left: 0.06rem;
        text-align: center;
      }
      .imgBox {
        width: 0.88rem;
        height: 0.88rem;
        margin-left: 0.13rem;
        img {
          width: 0.88rem;
          height: 0.88rem;
          border-radius: 50%;
          border: 0.02rem solid rgba(255, 232, 195, 1);
        }
      }
      .uerMsg {
        width: 2rem;
        height: 0.8rem;
        margin-left: 0.13rem;
        .name {
          height: 50%;
          line-height: 0.4rem;
          max-width: 2rem;
          text-align: left;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
        .uid {
          height: 50%;
          margin-top: 0.05rem;
          line-height: 0.4rem;
          font-size: 80%;
          color: #731a0f;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #ffe897;
        }
      }
      .scoreBox {
        margin-left: 0.6rem;
        height: 0.8rem;
        .score {
          display: flex;
          align-items: center;
          color: #ffe897;
          i {
            font-size: 80%;
          }
          em {
            margin-left: 0.05rem;
            margin-top: -0.05rem;
            font-size: 110%;
          }
        }
        .giftItem {
          width: 2.5rem;
          margin-top: 0.15rem;
          display: flex;
          color: #ffe0aa;
          font-size: 80%;
          .hear {
            display: flex;
            align-items: center;
            width: 1.4rem;
            i {
              display: block;
              width: 0.34rem;
              height: 0.3rem;
              margin-right: 0.1rem;
              background: url(../assets/img/heart.png);
              background-size: 100% 100%;
            }
          }
          .star {
            display: flex;
            flex: 1;
            align-items: center;
            i {
              display: block;
              width: 0.3rem;
              height: 0.3rem;
              margin-right: 0.1rem;
              background: url(../assets/img/star.png);
              background-size: 100% 100%;
            }
          }
        }
      }
      &.rank1 {
        background: url(../assets/img/top1Bg.png);
        background-size: 100% 100%;
        .itemRank {
          background: url(../assets/img/rank1.png);
          background-size: 100% 100%;
          text-indent: -999rem;
        }
      }
      &.rank2 {
        background: url(../assets/img/top2Bg.png);
        background-size: 100% 100%;
        .itemRank {
          background: url(../assets/img/rank2.png);
          background-size: 100% 100%;
          text-indent: -999rem;
        }
      }
      &.rank3 {
        background: url(../assets/img/top2Bg.png);
        background-size: 100% 100%;
        .itemRank {
          background: url(../assets/img/rank3.png);
          background-size: 100% 100%;
          text-indent: -999rem;
        }
      }
    }
  }
}
</style>
