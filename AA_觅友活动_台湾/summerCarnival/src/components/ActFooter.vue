<template>
  <div class="footerBar">
    <div class="acrStatus">
      <span class="noAct" v-if="astState === 0">{{lang.noAct}}</span>
      <span class="noAct" v-if="astState === 2">{{lang.actEd}}</span>
      <span class="goAct" v-if="astState === 1" @click="singUp()">{{lang.singUp}}</span>
      <div class="actIng" v-if="astState === 3">
        <div class="rank" v-if="nowMsg.rank !=0">{{nowMsg.rank>100?'100+':nowMsg.rank}}</div>
        <div class="noRank" v-else>{{lang.noRank}}</div>
        <img v-lazy="userMsg.avatar" alt="">
        <div class="nick">{{userMsg.nick}}</div>
        <div class="userScore">
          <div class="total">{{lang.totalScore}} {{nowMsg.sugar_score*1 + nowMsg.gift_score*1}}</div>
          <div class="score1">{{lang.userScore1}} {{nowMsg.sugar_score}}</div>
          <div class="score1">{{lang.userScore2}} {{nowMsg.gift_score}}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import api from "../api/apiConfig"
export default {
  computed: {
    ...mapState(['userMsg', "isShare", "groupsUserMsg", "tab", "userMsg", "activity"]),
    astState () {
      if (this.activity.activity_status === 0) { //活动未开始
        return 0
      } else if (this.activity.activity_status === 2) { //活动已结束
        return 2
      } else if (!this.userMsg.reg || this.isShare) { //活动开始未报名，或者分享
        return 1
      } else if (this.userMsg.reg) { //活动开始已报名
        return 3
      }
    },
    nowMsg () {
      console.log(this.groupsUserMsg, this.tab)
      return this.groupsUserMsg[this.tab] ? this.groupsUserMsg[this.tab].msg : {}
    }
  },
  methods: {
    singUp () {
      api.singUp().then(res => {
        if (res.data.response_status.code == 0) {
          this.$parent.getDefaultData()
          this.toast(this.lang.singUpSuc)
          api.tasks().then(res => {
            this.vxc('setTasks', res.data.response_data)
          })
        } else {
          this.toast(res.data.response_status.error)
        }
      })
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
    height: 1.63rem;
    margin: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    background: url(../assets/img/footer.png);
    background-size: 100% 100%;
    span {
      display: inline-block;
      margin-top: 0.5rem;
      font-size: 0.36rem;
    }
    .goAct {
      width: 3.35rem;
      height: 0.96rem;
      font-size: 0.31rem;
      background: url(../assets/img/singUp.png);
      background-size: 100% 100%;
      text-align: center;
      line-height: 0.96rem;
    }
    .actIng {
      width: 100%;
      display: flex;
      align-items: center;
      margin-top: 0.25rem;
      .rank,
      .noRank {
        width: 1.2rem;
        font-size: 0.36rem;
        color: rgba(99, 38, 255, 1);
        text-align: center;
        font-weight: 500;
      }
      .noRank {
        font-size: 0.24rem;
      }
      img {
        width: 0.91rem;
        height: 0.91rem;
        border: 0.06rem solid #7734c6;
        border-radius: 50%;
      }
      .nick {
        width: 2.2rem;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        margin-left: 0.1rem;
      }
      .userScore {
        margin-left: 0.3rem;
        .total {
          font-size: 0.27rem;
          font-weight: 600;
        }
        .score1 {
          color: rgba(44, 14, 192, 1);
          font-size: 0.18rem;
        }
      }
    }
  }
}
</style>
