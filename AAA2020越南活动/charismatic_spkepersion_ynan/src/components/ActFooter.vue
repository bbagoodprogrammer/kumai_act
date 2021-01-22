<template>
  <div class="footerBar">
    <div class="acrStatus" :class="{noStart:astState == 0,actEd:astState == 2,singUp:astState == 1}" @click="singUp()">
      <div class="actIng" v-if="astState === 3">
        <div class="total" :class="'rank' + nowMsg.rank">
          <div class="rank" :class="{noRank:nowMsg.rank == 0}">{{nowMsg.rank == 0?'Chưa lên bảng':nowMsg.rank}}</div>
          <div class="imgBox" @click="goUser(nowMsg.uid)">
            <img v-if="nowMsg.avatar_frame &&nowMsg.avatar_frame != ''" :src="nowMsg.avatar_frame" class="frame" alt="">
            <img v-else-if="nowMsg.nob > 0" :src="require(`../assets/img/nob/${nowMsg.nob}.png`)" class="nob" alt="">
            <img v-lazy="nowMsg.avatar" alt="" class="av">
          </div>
          <div class="songMsg">
            <div class="score" v-if="tab == 'total'">Điểm tổng:{{nowMsg.score}}</div>
            <div class="score" v-else>Điểm {{act_day}}:{{nowMsg.score}}</div>
            <div class="add" v-if="nowMsg.rate > 0">Tăng thêm:{{nowMsg.rate}}%</div>
          </div>
          <div class="commitSongBtn" @click="commitSong()">Tải tác phẩm</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import { globalBus } from '../utils/eventBus'
import api from "../api/apiConfig"
import getString from "../utils/getString"
import getDate from "../utils/getDate"

export default {
  computed: {
    ...mapState(['actStatus', 'reg', 'tab', 'groupsUserMsg', "isShare", "dateArr", "c_day"]),
    astState() {
      if (this.actStatus === 0) { //活动未开始
        return 0
      } else if (this.actStatus === 2) { //活动已结束
        return 2
      } else if (!this.reg || this.isShare) { //活动开始未报名，或者分享
        return 1
      } else if (this.reg && (this.tab <= this.c_day || this.tab == 'total')) { //活动开始已报名
        return 3
      }
    },
    nowMsg() {
      return this.groupsUserMsg[this.tab] ? this.groupsUserMsg[this.tab].msg : {}
    },
    act_day() {
      return getDate(new Date(this.dateArr[this.tab - 1] * 1000), 3)
    }
  },
  methods: {
    singUp() {
      globalBus.$emit('commonEvent', () => {
        if (this.astState != 1) {
          return
        }
        api.singUp().then(res => {
          if (res.data.response_status.code == 0) {
            this.$parent.$refs.scorll.onRefresh()
            this.$parent.$refs.getDefaultData()
          } else {
            this.toast(res.data.response_status.error)
          }
        })

      })
    },
    commitSong() {
      globalBus.$emit('commonEvent', () => {
        let token = getString('token')
        location.href = `./index3.html?token=${token}`
      })
    },
    goUser(uid) { //跳转
      location.href = `uid:${uid}`
    },
    goSong(sid) {
      location.href = 'songid:{"songlist":[' + sid + '],"index":0}';
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
    height: 1.4rem;
    margin: auto;
    display: flex;
    align-items: center;
    justify-content: center;

    &.noStart {
      height: 0.96rem;
      background: url(../assets/img/footer/noStart.png);
      background-size: 100% 100%;
    }
    &.actEd {
      height: 0.96rem;
      background: url(../assets/img/footer/actEd.png);
      background-size: 100% 100%;
    }
    &.singUp {
      height: 0.96rem;
      background: url(../assets/img/footer/singUp.png);
      background-size: 100% 100%;
    }
  }
  .actIng {
    width: 100%;
    height: 100%;
    border-top: 0.04rem solid RGBA(255, 246, 219, 1);
    background: linear-gradient(-60deg, #9b69f8, #9953ff);
    .total {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      .rank {
        width: 1.3rem;
        text-align: center;
        white-space: nowrap;
        &.noRank {
          font-size: 0.21rem;
          margin-left: 0.15rem;
          white-space: pre-wrap;
        }
      }
      .imgBox {
        width: 1.1rem;
        height: 1.1rem;
        position: relative;
        margin: 0 0.1rem;
        .nob {
          width: 1.1rem;
          height: 1.1rem;
          position: absolute;
          top: 0rem;
          left: 0rem;
          z-index: 10;
        }
        .frame {
          width: 1.5rem;
          height: 1.5rem;
          position: absolute;
          top: -0.21rem;
          left: -0.2rem;
          z-index: 10;
        }
        .av {
          width: 0.88rem;
          height: 0.88rem;
          position: absolute;
          top: 0.1rem;
          left: 0.11rem;
          border-radius: 50%;
          box-sizing: border-box;
          border: 0.04rem solid #f7e0a0;
        }
        &.ml {
          margin-left: 0.7rem;
        }
      }
      .songMsg {
        width: 2.5rem;
        font-size: 0.26rem;
        .topNum {
          margin-top: 0.1rem;
        }
        .add {
          display: inline-block;
          padding: 0 0.05rem;
          height: 0.33rem;
          background: linear-gradient(90deg, #ffd6ba 0%, #fdf2d5 100%);
          border: 0.02rem solid #ffef9d;
          box-sizing: border-box;
          border-radius: 0.17rem;
          text-align: center;
          line-height: 0.33rem;
          color: rgba(133, 88, 14, 1);
          font-size: 0.22rem;
          margin-top: 0.15rem;
          white-space: nowrap;
        }
      }
      &.rank1 {
        .rank {
          width: 0.75rem;
          height: 0.65rem;
          margin-left: 0.3rem;
          text-indent: -999rem;
          background: url(../assets/img/rank/top1.png);
          background-size: 100% 100%;
        }
      }
      &.rank2 {
        .rank {
          width: 0.75rem;
          height: 0.65rem;
          margin-left: 0.3rem;
          text-indent: -999rem;
          background: url(../assets/img/rank/top2.png);
          background-size: 100% 100%;
        }
      }
      &.rank3 {
        .rank {
          width: 0.75rem;
          height: 0.65rem;
          margin-left: 0.3rem;
          text-indent: -999rem;
          background: url(../assets/img/rank/top3.png);
          background-size: 100% 100%;
        }
      }
    }
    .commitSongBtn {
      width: 2.21rem;
      height: 0.65rem;
      background: url(../assets/img/footer/commit.png);
      background-size: 100% 100%;
      text-align: center;
      font-size: 0.24rem;
      color: rgba(126, 26, 6, 1);
      line-height: 0.65rem;
      margin-left: 0.1rem;
    }
  }
}
</style>
