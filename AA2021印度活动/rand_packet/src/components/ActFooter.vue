<template>
  <div class="footerBar">
    <div class="acrStatus" v-if="(tab <= nowDay) || tab == 'total'">
      <span class="noAct" v-if="astState === 0">{{lang.noStart}}</span>
      <span class="noAct" v-if="astState === 2">{{lang.actEnd}}</span>
      <span class="goAct" v-if="astState === 1" @click="singUp()">{{lang.singUp}}</span>
      <div class="actIng" v-if="astState === 3">
        <div class="rank">{{myMsg.rank}}</div>
        <div class="uerImg" @click="goUser(myMsg.uid)">
          <img v-lazy="myMsg.avatar" alt="" class="imgItem">
          <img v-if="myMsg.noble &&  myMsg.noble!= 0" :src="require(`../img/noble/${myMsg.noble}.png`)" alt="" class="noble">
          <i v-else-if="myMsg.vip > 0" class="vip">VIP{{myMsg.vip}}</i>
        </div>
        <div class="userMsg">
          <div class="name">
            <span>{{myMsg.nick}}</span>
          </div>
          <div class="probability" v-if="tab != 'total'">{{lang.luckGrade}}<em>{{lang.lv}}{{myMsg.level?myMsg.level:0}}</em> <i>{{getDay()}}</i></div>
        </div>
        <div class="score"><i></i><em>{{myMsg.score}}</em></div>
      </div>
    </div>
    <div class="mask" v-show="showT">
      <transition name="slide">
        <msg-toast :msg="tastMsg" @closeToast="closeToast()" v-show="showT"></msg-toast>
      </transition>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import { globalBus } from "../utils/eventBus"
import MsgToast from "./commonToast"
import api from "../apis/apiConfig"
import getDate from "../utils/getDate"
export default {
  components: { MsgToast },
  data () {
    return {
      showT: false,
      tastMsg: ''
    }
  },
  computed: {
    ...mapState(['actStatus', "isShare", 'tab', 'dateArr', 'nowDay', 'groupsUserMsg', 'registered']),
    astState () {
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
    myMsg () {
      if (this.groupsUserMsg[this.tab]) {
        return this.groupsUserMsg[this.tab].msg
      }
      return {}
    },
  },
  methods: {
    singUp () {
      globalBus.$emit('commonEvent', () => {
        let singUpDay = this.tab == 'total' ? -1 : this.nowDay
        api.userSingUp(singUpDay).then(res => {
          const { response_data, response_status } = res.data
          if (response_status.code === 0) {  //报名成功
            let Obj = {
              type: singUpDay,
              owner: response_data.owner
            }
            this.vuexCommit('setSingUp', Obj)
          } else {
            this.tastMsg = response_status.error
            this.showT = false
          }
        })
      })
    },
    getDay () {
      return getDate(new Date(this.dateArr[this.tab - 1] * 1000), '2')
    },
    closeToast () {
      this.showT = false
    },
    goUser (uid) { //跳转
      location.href = `uid:${uid}`
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
    height: 1.3rem;
    margin: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    background: url(../img/footer.png) no-repeat;
    background-size: 100% 100%;
    span {
      display: inline-block;
    }
    .noAct {
      color: #fff3c4;
      font-weight: 600;
      font-size: 0.36rem;
      margin-top: 0.25rem;
    }
    .goAct {
      display: block;
      width: 2.83rem;
      height: 0.92rem;
      background: url(../img/ok.png);
      background-size: 100% 100%;
      line-height: 0.92rem;
      text-align: center;
      line-height: 0.92rem;
      color: #a24e04;
      font-size: 0.32rem;
      font-weight: 800;
    }
    .actIng {
      width: 7.5rem;
      height: 1.15rem;
      margin-top: 0.09rem;
      display: flex;
      align-items: center;
      .rank {
        width: 0.94rem;
        height: 0.72rem;
        font-size: 0.36rem;
        font-style: italic;
        color: #451380;
        text-align: center;
        line-height: 0.72rem;
        margin-left: 0.13rem;
        font-weight: 700;
      }
      .uerImg {
        width: 1rem;
        height: 1rem;
        margin-left: 0.15rem;
        position: relative;
        .noble {
          width: 1.2rem;
          height: 1.22rem;
          position: absolute;
          left: -0.11rem;
          top: -0.1rem;
        }
        .vip {
          display: block;
          width: 0.7rem;
          height: 0.22rem;
          line-height: 0.22rem;
          text-align: center;
          font-size: 0.21rem;
          background: #e95754;
          border-radius: 0.5rem;
          position: absolute;
          bottom: 0;
          right: 0.15rem;
        }
        .imgItem {
          width: 1rem;
          height: 1rem;
          box-sizing: border-box;
          border: 0.02rem solid rgba(83, 129, 247, 1);
          border-radius: 50%;
        }
      }
      .userMsg {
        width: 3.1rem;
        margin-left: 0.18rem;
        .name {
          display: flex;
          align-items: center;
          span {
            font-size: 0.26rem;
            max-width: 2.7rem;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }
        }
        .probability {
          color: #d9cafb;
          font-size: 0.22rem;
          em {
            font-size: 0.22rem;
            margin-left: 0.14rem;
            background: linear-gradient(
              0deg,
              rgba(254, 220, 69, 1) 0%,
              rgba(251, 112, 153, 1) 100%
            );
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
          }
          i {
            color: #d9cafb;
            font-size: 0.22rem;
          }
        }
      }
      .score {
        color: #f8d285;
        font-size: 80%;
        display: flex;
        align-items: center;
        margin-left: 0.15rem;
        font-weight: 600;
        i {
          display: block;
          width: 0.3rem;
          height: 0.26rem;
          background: url(../img/hear.png);
          background-size: 100% 100%;
          margin-right: 0.11rem;
        }
        em {
          font-size: 0.29rem;
        }
      }
      .giftCharm {
        div {
          display: flex;
          align-items: center;
          font-size: 80%;
          color: #fff9d6;
        }
        .star {
          display: block;
          width: 0.32rem;
          height: 0.31rem;
          margin-right: 0.09rem;
          // background: url(../img/star.png);
          background-size: 100% 100%;
        }
        .hear {
          display: block;
          width: 0.32rem;
          height: 0.31rem;
          margin-right: 0.09rem;
          //background: url(../img/hear.png);
          background-size: 100% 100%;
        }
      }
    }
  }
}
</style>
