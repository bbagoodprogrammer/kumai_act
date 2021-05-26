<template>
  <div class="footerBar" v-if="astState">
    <div class="acrStatus">
      <span class="noAct" v-if="astState === 1">{{lang.noAct}}</span>
      <span class="noAct" v-if="astState === 2">{{lang.actEd}}</span>
      <div class="actIng" v-if="astState === 3" :class="['rank' + owner.rank]" @click="resetUserMsg()">
        <div class="userRank">{{owner.rank}}</div>
        <div class="imgBox">
          <img v-lazy="owner.avatar" alt="" class="avatar">
          <span class="live" v-if="owner.live_room">Live</span>
        </div>
        <div class="nick">{{owner.nick}}</div>
        <div class="score">
          <span class="tips">{{lang.landing_nums2}}</span>
          <span class="nums">{{owner.landing_num_used}}</span>
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
  props: ['type'],
  computed: {
    ...mapState(['activity', 'owner', 'is_anchor']),
    astState () {
      if (this.activity.activity_status === 0) { //活动未开始
        return 1
      } else if (this.activity.activity_status === 2) { //活动已结束
        return 2
      } else if (this.owner && this.type == 1) { //活动开始已报名
        return 3
      }
    },
  },
  methods: {
    resetUserMsg () {
      if (this.is_anchor) {
        this.vxc('reSetChange_floor')
      }
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
      font-size: 0.36rem;
      font-weight: 600;
      margin-top: 0.1rem;
    }
    .goAct {
      display: block;
      width: 100%;
      height: 0.96rem;
      position: fixed;
      bottom: 0;
    }
    .actIng {
      width: 100%;
      height: 1.43rem;
      display: flex;
      align-items: center;
      margin-bottom: 0.11rem;
      .userRank {
        width: 0.52rem;
        height: 0.67rem;
        text-align: center;
        line-height: 0.67rem;
        font-size: 0.26rem;
        font-weight: bold;
        font-style: italic;
        margin: 0 0.28rem 0 0.27rem;
      }
      .imgBox {
        width: 1.01rem;
        height: 1.01rem;
        position: relative;
        .avatar {
          width: 1.01rem;
          height: 1.01rem;
          box-sizing: border-box;
          border: 0.02rem solid RGBA(113, 117, 199, 1);
          border-radius: 50%;
          position: absolute;
        }
        .live {
          display: block;
          width: 0.88rem;
          height: 0.29rem;
          text-align: center;
          line-height: 0.29rem;
          background: linear-gradient(136deg, #52EDFF 0%, #CA2FFF 99%);
          border-radius: 0.13rem;
          font-size: 0.24rem;
          font-weight: 500;
          position: absolute;
          bottom: 0;
          left: 0.08rem;
        }
      }
      .nick {
        width: 2.5rem;
        font-size: 0.28rem;
        margin-left: 0.26rem;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      .score {
        flex: 1;
        padding-right: 0.63rem;
        span {
          display: block;
          text-align: center;
          &.tips {
            font-size: 0.24rem;
            color: rgba(82, 237, 255, 1);
          }
          &.nums {
            font-size: 0.32rem;
            color: rgba(255, 219, 112, 1);
            margin-top: 0.08rem;
          }
        }
      }

      //   &.rank1 {
      //     background: url(../img/top1.png);
      //     background-size: 100% 100%;
      //     .userRank {
      //       text-indent: -999rem;
      //     }
      //   }
      //   &.rank2 {
      //     background: url(../img/top2.png);
      //     background-size: 100% 100%;
      //     .userRank {
      //       text-indent: -999rem;
      //     }
      //   }
      //   &.rank3 {
      //     background: url(../img/top3.png);
      //     background-size: 100% 100%;
      //     .userRank {
      //       text-indent: -999rem;
      //     }
      //   }
    }
    li:last-child {
      margin-bottom: 0;
    }
  }
}
</style>
