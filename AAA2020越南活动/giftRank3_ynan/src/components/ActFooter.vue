<template>
  <div class="footerBar">
    <div class="acrStatus">
      <span class="noAct" v-if="astState === 0">{{lang.noAct}}</span>
      <span class="noAct" v-if="astState === 2">{{lang.actEd}}</span>
      <span class="goAct" v-if="astState === 1" @click="showQueryPup()">Báo danh</span>
      <div class="actIng" :class="'rank'+nowUsrMsg.rank" v-if="astState === 3">
        <div class="rank" v-if="nowUsrMsg.rank >0">{{nowUsrMsg.rank}}</div>
        <div class="rank noTop" v-else>Chưa có hạng</div>
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
    <div class="mask" v-show="showQuery">
      <transition name="slide">
        <div class="queryBox" v-if="showQuery">
          <i class="close" @click="close()"></i>
          <p>Sau khi báo danh tham gia sự kiện, điểm số kỳ này chỉ tính vào BXH Ca Sĩ, các nhận tham gia?</p>
          <div class="btnBox">
            <span @click="close()">Huỷ</span>
            <span class="ok" @click="singUp()">Xác nhận</span>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import api from "../api/apiConfig"
import { globalBus } from '../utils/eventBus'
export default {
  data() {
    return {
      showQuery: false
    }
  },
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
    showQueryPup() {
      this.showQuery = true
    },
    close() {
      this.showQuery = false
    },
    singUp() {
      globalBus.$emit('commonEvent', (callback) => {
        api.singUp().then(res => {
          const { response_status, response_data } = res.data
          if (response_status.code == 0) {
            this.close()
            this.vxc('setUserSingUp', true)
            this.vxc('setToast', {
              msg: 'Đã báo danh xong!'
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
        text-align: center;
        line-height: 0.72rem;
        margin-left: 0.13rem;
        &.noTop {
          font-size: 0.24rem;
          line-height: 0.25rem;
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
.queryBox {
  width: 6.59rem;
  height: 3.98rem;
  background: url(../assets/img/toastBg.png);
  background-size: 100% 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  p {
    font-size: 0.38rem;
    font-weight: 600;
    text-align: center;
    padding: 0 0.15rem;
    color: #983347;
  }
  .btnBox {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 0.3rem;
    span {
      width: 2.57rem;
      height: 0.72rem;
      background: url(../assets/img/actDayTitle.png);
      background-size: 100% 100%;
      text-align: center;
      line-height: 0.72rem;
      &.ok {
        margin-left: 0.25rem;
      }
    }
  }
}
</style>
