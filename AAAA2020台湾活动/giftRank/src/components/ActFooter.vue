<template>
  <div class="footerBar">
    <div class="acrStatus">
      <span class="noAct" v-if="astState === 0">{{lang.noAct}}</span>
      <span class="noAct" v-if="astState === 2">{{lang.actEd}}</span>
      <span class="goAct" v-if="astState === 1" @click="singUp()">立即報名</span>
      <div class="actIng" :class="'rank'+nowUsrMsg.rank" v-if="astState === 3">
        <div class="rank" :class="{noTop:nowUsrMsg.rank==0}">{{nowUsrMsg.rank>0?nowUsrMsg.rank:'未上榜'}}</div>
        <div class="uerImg">
          <span class="imgBg"></span>
          <img v-lazy="nowUsrMsg.info.avatar" alt="" class="imgItem">
        </div>
        <div class="userMsg">
          <div class="name">{{nowUsrMsg.info.nick}}</div>
          <div class="score"><i></i> {{nowUsrMsg.score}}</div>
        </div>
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
    ...mapState(['actStatus', 'groupsUserMsg', "nowTab", "showType", "isShare", "registered"]),
    astState() {
      if (this.actStatus === 0) { //活动未开始
        return 0
      } else if (this.actStatus === 2) { //活动已结束
        return 2
      } else if (!this.registered || this.isShare) { //活动开始未报名，或者分享
        return 1
      } else if (this.registered) { //活动开始已报名
        return 3
      }
    },
    nowUsrMsg() {
      let nowList = this.groupsUserMsg[this.showType][this.nowTab] || {}
      return nowList.msg || { info: {} }
    },
  },
  methods: {
    singUp() {
      globalBus.$emit('commonEvent', (callback) => {
        console.log('xxxxx')
        api.singUp().then(res => {
          const { response_status, response_data } = res.data
          if (response_status.code == 0) {
            this.vxc('setUserSingUp', true)
            this.vxc('setToast', {
              msg: '已報名成功！'
            })
          } else {
            this.vxc('setToast', {
              msg: response_status.error
            })
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
    height: 1.5rem;
    margin: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    background: url(../assets/img/footer.png) no-repeat;
    background-size: 100% 100%;
    span {
      display: inline-block;
    }
    .noAct {
      font-size: 0.36rem;
      font-weight: 700;
    }
    .goAct {
      width: 2.76rem;
      height: 0.99rem;
      background: url(../assets/img/singUp.png);
      background-size: 100% 100%;
      text-align: center;
      line-height: 0.99rem;
      font-size: 0.36rem;
      font-weight: 500;
      margin-top: 0.2rem;
    }
    .actIng {
      width: 7.5rem;
      display: flex;
      align-items: center;
      margin-top: 0.2rem;
      .rank {
        width: 0.84rem;
        height: 0.72rem;
        font-size: 0.46rem;
        color: #e765a3;
        text-align: center;
        line-height: 0.72rem;
        margin-left: 0.13rem;
        &.noTop {
          font-size: 0.24rem;
        }
      }
      .uerImg {
        width: 1.21rem;
        height: 1.01rem;
        position: relative;
        margin-left: 0.21rem;
        .imgBg {
          width: 1rem;
          height: 1.01rem;
          background: url(../assets/img/av4.png);
          background-size: 100% 100%;
          position: absolute;
          z-index: 10;
        }
        .imgItem {
          width: 0.94rem;
          height: 0.94rem;
          position: absolute;
          top: 0.035rem;
          left: 0.03rem;
          border-radius: 50%;
        }
      }
      .userMsg {
        width: 2.5rem;
        .name {
          display: flex;
          align-items: center;
          max-width: 2.5rem;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          font-size: 0.26rem;
        }
        .score {
          display: flex;
          align-items: center;
          color: #ffed82;
          font-size: 0.22rem;
          font-weight: 500;
          i {
            display: block;
            margin-right: 0.1rem;
            width: 0.22rem;
            height: 0.25rem;
            background: url(../assets/img/coins.png);
            background-size: 100% 100%;
          }
        }
      }
      &.rank1 {
        .imgBg {
          width: 1.11rem;
          height: 1.25rem;
          background: url(../assets/img/av1.png);
          background-size: 100% 100%;
          top: -0.22rem;
          left: -0.05rem;
        }
        .imgItem {
          width: 1rem;
          height: 1rem;
        }
        .rank {
          text-indent: -999rem;
          background: url(../assets/img/top1.png);
          background-size: 100% 100%;
        }
      }
      &.rank2 {
        .imgBg {
          width: 1.11rem;
          height: 1.25rem;
          background: url(../assets/img/av2.png);
          background-size: 100% 100%;
          top: -0.22rem;
          left: -0.05rem;
        }
        .imgItem {
          width: 1rem;
          height: 1rem;
        }
        .rank {
          text-indent: -999rem;
          background: url(../assets/img/top2.png);
          background-size: 100% 100%;
        }
      }
      &.rank3 {
        .imgBg {
          width: 1.11rem;
          height: 1.25rem;
          background: url(../assets/img/av3.png);
          background-size: 100% 100%;
          top: -0.22rem;
          left: -0.05rem;
        }
        .imgItem {
          width: 1rem;
          height: 1rem;
        }
        .rank {
          text-indent: -999rem;
          background: url(../assets/img/top3.png);
          background-size: 100% 100%;
        }
      }
    }
  }
}
</style>
