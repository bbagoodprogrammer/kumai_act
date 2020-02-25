<template>
  <div class="footerBar">
    <div class="acrStatus">
      <span class="noAct" v-if="astState === 0">{{lang.ActNot}}</span>
      <span class="noAct" v-if="astState === 2">{{lang.ActEnd}}</span>
      <span class="goAct" v-if="astState === 1" @click="singUp()">{{lang.SingUp}}</span>
      <span class="type type3" v-if="astState===3">
        <div class="rank">{{nowMsg.rank}}</div>
        <img v-lazy="nowMsg.avatar" alt="">
        <div class="name">{{nowMsg.nick}}</div>
        <div class="coins">
          {{lang.Daily_b}}{{daily_b}}
        </div>
      </span>
      <span class="type type4" v-if="astState===4">
        <div class="rank">{{nowMsg.rank}}</div>
        <img v-lazy="nowMsg.avatar" alt="">
        <div class="name">{{nowMsg.nick}}</div>
        <div class="coins">
          <div class="lv">Lv.{{getLv(nowMsg.score)}}</div>
          <div class="scoreItem">{{lang.Score}}{{nowMsg.score}}</div>
        </div>
      </span>
      <span class="type type5" v-if="astState===5">
        <div class="rank">{{nowMsg.rank}}</div>
        <img v-lazy="nowMsg.avatar" alt="">
        <div class="name">{{nowMsg.nick}}</div>
        <div class="coins">
          <div class="lv">{{lang.PlayValue}}{{nowMsg.score}}</div>
        </div>
      </span>
    </div>
    <transition name="slide">
      <msg-toast :msg="tastMsg" @closeToast="closeToast()" v-show="showT"></msg-toast>
    </transition>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import api from "../api/apiConfig"
import { findValueUseTwoSplit } from "../utils/getGrade"
import MsgToast from "../components/commonToast"
import { globalBus } from "../utils/eventBus"
export default {
  components: { MsgToast },
  data() {
    return {
      tastMsg: '',
      showT: false
    }
  },
  computed: {
    ...mapState(['actStatus', "isShare", "tab2", "registered", "groupsUserMsg", "daily_b"]),
    astState() {
      if (this.actStatus === 0) { //活动未开始
        return 0
      } else if (this.actStatus === 2 && this.registered == 0) { //活动已结束
        return 2
      } else if (this.registered == 0 || this.isShare) { //活动开始未报名，或者分享
        return 1
      } else if (this.tab2 == 2) { //當前在任務列表展示剩餘遊戲幣
        return 3
      } else if (this.tab2 == 0) { //當前地鼠榜單展示地鼠排名
        return 4
      } else if (this.tab2 == 'total') { //當前在頭號玩家榜單展示總排名
        return 5
      }
    },
    nowMsg() {
      if (this.groupsUserMsg[this.tab2]) {
        return this.groupsUserMsg[this.tab2].msg
      }
      return {}
    }
  },
  methods: {
    singUp() {
      globalBus.$emit('commonEvent', () => {
        let state = this.tab2 == 'total' ? 0 : this.tab
        api.singUp(state).then(res => {
          if (res.data.response_status.code == 0) {
            const owner_msg = res.data.response_data.owner_msg
            this.$store.commit('changRegistered', owner_msg.is_reg)
            this.$store.commit("changGroupsUserMsg", {//初始当前日榜个人信息
              key: this.tab2,
              msg: owner_msg
            })
            this.$store.commit('addRank', owner_msg)
          } else {
            this.tastMsg = res.data.response_status.error
            this.showT = true
          }
        })
      })
    },
    getLv(score) {
      if (score !== undefined) {
        return findValueUseTwoSplit(score).grade
      }
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
  z-index: 20;
  .acrStatus {
    width: 7.5rem;
    height: 1.26rem;
    margin: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    background: url(../assets/img/footerBg.png) no-repeat;
    background-size: 100% 100%;
    span {
      display: inline-block;
      &.noAct {
        color: #ffdab6;
        margin-top: 0.4rem;
      }
      &.goAct {
        display: block;
        margin-top: 0.1rem;
        width: 2.33rem;
        height: 0.81rem;
        text-align: center;
        line-height: 0.81rem;
        color: #b98300;
        background: url(../assets/img/taskBgAct.png);
        background-size: 100% 100%;
      }
      &.type {
        width: 7.5rem;
        display: flex;
        align-items: center;
        margin-top: 0.2rem;
        .rank {
          width: 1rem;
          text-align: center;
          color: #af3600;
          font-size: 120%;
        }
        img {
          width: 0.86rem;
          height: 0.86rem;
          border-radius: 50%;
          border: 0.03rem solid #ffe178;
          margin-left: 0.05rem;
        }
        .name {
          width: 1.5rem;
          min-width: 1.5rem;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          margin: 0 0.89rem 0 0.17rem;
          font-size: 93%;
        }
        .coins {
          font-size: 80%;
        }
      }
      &.type4 {
        .coins {
          margin-left: 0.4rem;
        }
      }
      &.type5 {
        .coins {
          margin-left: 0.4rem;
        }
      }
    }
  }
}
</style>
