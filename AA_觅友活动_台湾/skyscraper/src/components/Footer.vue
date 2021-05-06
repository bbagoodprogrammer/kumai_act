<template>
  <div class="footerBar">
    <div class="acrStatus" :class="{bg:astState!=1}">
      <span class="noAct" v-if="astState === 0">{{lang.noAct}}</span>
      <span class="noAct" v-if="astState === 2">{{lang.actEd}}</span>
      <span class="goAct" v-if="astState === 1" @click="singUp()"></span>
      <div class="actIng" v-if="astState === 3" :class="['rank' + user.rank]">
        <div class="userRank">{{user.rank}}</div>
        <img v-lazy="user.avatar" alt="" class="avatar">
        <div class="msg">
          <div class="nick">{{user.nick}}</div>
          <span class="live"></span>
        </div>
        <div class="score">
          <i :class="['lv' + user.lv]"></i>
          {{user.score}}
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
// import api from "../api/apiConfig"
// import { globalBus } from '../utils/eventBus'
export default {
  data () {
    return {
      user: {
        rank: '1',
        nick: '刀刀刀刀刀',
        lv: '4',
        score: '1111',
        live: false
      },
    }
  },
  computed: {
    ...mapState(['actStatus', 'owner', 'isShare', 'reg']),
    astState () {
      return 3
      if (this.actStatus === 0) { //活动未开始
        return 0
      } else if (this.actStatus === 2) { //活动已结束
        return 2
      } else if (!this.reg || this.isShare) { //活动开始未报名，或者分享
        return 1
      } else if (this.reg) { //活动开始已报名
        return 3
      }
    },
    nowUser () {
      return this.tab == "total" ? this.total : this.day
    }
  },
  methods: {
    singUp (fuid) {
      //   globalBus.$emit('commonEvent', () => {
      api.singUp(fuid).then(res => {
        if (res.data.response_status.code == 0) {
          this.vxc('setReg', true)
          this.$parent.getDefaultData()
          this.$parent.invitation = false
          //弹起任务弹窗
        } else {
          this.toast(res.data.response_status.error)
        }
      })
      // })
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
    height: 1.58rem;
    margin: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    background: url(../img/footer.png);
    background-size: 100% 100%;
    span {
      display: inline-block;
    }
    .noAct {
      color: rgba(39, 26, 118, 1);
      font-size: 0.36rem;
      font-weight: 600;
      margin-top: 0.2rem;
    }
    .goAct {
      display: block;
      width: 100%;
      height: 0.96rem;
      position: fixed;
      bottom: 0;
    }
    .actIng {
      height: 1.49rem;
      display: flex;
      align-items: center;
      margin-top: 0.2rem;
      .userRank {
        width: 0.82rem;
        height: 0.67rem;
        text-align: center;
        line-height: 0.67rem;
        font-size: 0.36rem;
        font-weight: bold;
        font-style: italic;
        color: #271A76;
        margin: 0 0.32rem 0 0.27rem;
      }
      .avatar {
        width: 0.95rem;
        height: 0.95rem;
        border-radius: 50%;
      }
      .msg {
        width: 1.6rem;
        margin-left: 0.15rem;
        .nick {
          color: rgba(39, 26, 118, 1);
          font-size: 0.28rem;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
        .live {
          display: block;
          margin-top: 0.1rem;
          width: 0.74rem;
          height: 0.29rem;
          background: url(../img/live.png);
          background-size: 100% 100%;
        }
      }
      .score {
        width: 2.1rem;
        height: 0.49rem;
        background: rgba(56, 56, 56, 0.13);
        border-radius: 0.25rem;
        text-align: center;
        line-height: 0.49rem;
        margin-left: 0.6rem;
        position: relative;
        i {
          display: block;
          width: 0.86rem;
          height: 1.44rem;
          position: absolute;
          top: -0.56rem;
          left: -0.47rem;
          &.lv1 {
            background: url(../img/rank_floor/lv1.png);
            background-size: 100% 100%;
          }
          &.lv2 {
            background: url(../img/rank_floor/lv2.png);
            background-size: 100% 100%;
          }
          &.lv3 {
            background: url(../img/rank_floor/lv3.png);
            background-size: 100% 100%;
          }
          &.lv4 {
            background: url(../img/rank_floor/lv4.png);
            background-size: 100% 100%;
          }
        }
      }
      &.rank1,
      &.rank2,
      &.rank3 {
        .userRank {
          text-indent: -999rem;
        }
      }
      &.rank1 {
        .userRank {
          background: url(../img/top1.png);
          background-size: 100% 100%;
        }
      }
      &.rank2 {
        .userRank {
          background: url(../img/top2.png);
          background-size: 100% 100%;
        }
      }
      &.rank3 {
        .userRank {
          background: url(../img/top3.png);
          background-size: 100% 100%;
        }
      }
    }
    li:last-child {
      margin-bottom: 0;
    }
  }
}
</style>
