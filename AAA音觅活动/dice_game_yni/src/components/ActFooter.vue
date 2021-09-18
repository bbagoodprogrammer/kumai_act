<template>
  <div class="footerBar">
    <div class="acrStatus" :class="{bg:astState!=1}">
      <span class="noAct" v-if="astState === 0">{{lang.noAct}}</span>
      <span class="noAct" v-if="astState === 2">{{lang.actEd}}</span>
      <span class="goAct" v-if="astState === 1" @click="singUp()"></span>
      <div class="actIng" v-if="astState === 3">
        <span class="rank">{{nowUser.rank>100?'100+':nowUser.rank}}</span>
        <img v-lazy="owner.avatar" alt="" class="av">
        <div class="nick">{{owner.nick}}</div>
        <div class="score">{{lang.stepNums.replace('%s',nowUser.score)}}</div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import api from "../api/apiConfig"
import { globalBus } from '../utils/eventBus'
export default {
  computed: {
    ...mapState(['actStatus', 'owner', 'isShare', 'reg', 'tab', 'day', 'total']),
    astState () {
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
      globalBus.$emit('commonEvent', () => {
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
    height: 1.24rem;
    margin: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    &.bg {
      background: linear-gradient(
        90deg,
        rgba(35, 161, 255, 1),
        rgba(142, 23, 255, 1)
      );
    }
    span {
      display: inline-block;
    }
    .goAct {
      display: block;
      width: 100%;
      height: 0.96rem;
      position: fixed;
      bottom: 0;
      background: url(../assets/img/singUp.png);
      background-size: 100% 100%;
    }
    .actIng {
      width: 100%;
      display: flex;
      align-items: center;
      position: relative;
      .rank {
        width: 0.8rem;
        text-align: center;
        font-size: 0.24rem;
      }
      .av {
        width: 0.88rem;
        height: 0.88rem;
        border-radius: 50%;
      }
      .nick {
        width: 3rem;
        max-width: 3rem;
        font-size: 0.28rem;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        margin-left: 0.2rem;
      }
      .score {
        color: RGBA(237, 178, 254, 1);
        font-size: 0.24rem;
        margin-left: 0.6rem;
        color: RGBA(170, 159, 189, 1);
      }
    }
  }
}
</style>
