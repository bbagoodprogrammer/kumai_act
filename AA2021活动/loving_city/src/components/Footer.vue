<template>
  <div class="footer" v-if="astState">
    <div class="acrStatus" :class="{singUp:astState == 3}">
      <div class="act_not" v-if="astState == 1">{{lang.noAct}}</div>
      <div class="act_not" v-else-if="astState == 2">{{lang.actEd}}</div>
      <div class="singUp" @click="singUp()" v-else-if="astState == 3"></div>
      <div class="rankMsg" v-else-if="astState == 4" :class="'rank' + nowUsrMsg.rank">
        <i class="dayIcon" v-if="showType == 1">{{lang.dayIcon}}</i>
        <i class="dayIcon" v-else-if="showType == 2 && tab == 0">{{lang.scoreIcon}}</i>
        <div class="totalIcon" v-else-if="tab == 'total' && showType == 2">
          <span class="scoreIcon">{{lang.scoreIcon}}</span>
          <span class="peopleList" @click="$router.push('PeopleList')">{{lang.peopleList_tips}}<i></i></span>
        </div>
        <div class="rank" :class="{noRank:!nowUsrMsg.rank}">{{nowUsrMsg.rank?nowUsrMsg.rank:lang.noRank}}</div>
        <div class="uerImg" @click="goUser(nowUsrMsg.uid)">
          <img v-if="nowUsrMsg.avatar_frame &&nowUsrMsg.avatar_frame != ''" :src="nowUsrMsg.avatar_frame" class="frame" alt="">
          <img v-lazy="nowUsrMsg.avatar" alt="" class="av">
        </div>
        <div class="userMsg">
          <div class="nick">{{nowUsrMsg.nick}}</div>
          <div class="uid">UID {{nowUsrMsg.uid}}</div>
        </div>
        <div class="score"><i :class="{type2: tab == 'total'}"></i><em>{{nowUsrMsg.score}}</em></div>
      </div>
    </div>
    <div class="mask" v-show="showSingUpPup">
      <transition name="slide">
        <div class="singUpSuc" v-show="showSingUpPup">
          <i class="close" @click="showSingUpPup = false"></i>
          <div class="title">{{lang.singUpSuc}}</div>
          <div class="msg">
            <strong v-if="singUpType == 1">{{lang.singUpSuc_tips1}}</strong>
            <strong v-else>{{lang.singUpSuc_tips2}}</strong>
          </div>
          <div class="share" @click="showTop = true" v-if="!is_kol">
            {{lang.share}}
          </div>
        </div>
      </transition>
    </div>
    <div class="mask" v-show="showTop">
      <transition name="slide">
        <Top v-show="showTop" />
      </transition>
    </div>
  </div>
</template>

<script>

import { mapState } from 'vuex'
import { globalBus } from '../utils/eventBus'
import { singUp } from "../apis"
import Top from "../components/Top"

export default {
  components: { Top },
  data () {
    return {
      singUpType: 1,
      showSingUpPup: false,
      showTop: false
    }
  },
  computed: {
    ...mapState(['step', 'reg', 'groupsUserMsg', 'showType', 'tab', 'is_kol']),
    astState () {
      if (this.step === 0) { //活动未开始
        return 1
      } else if (this.step === 2) { //活动已结束
        return 2
      } else if ((!this.reg && this.is_kol && this.tab == 0 && this.showType == 1) || (!this.reg && !this.is_kol && this.tab == 'total' && this.showType == 1) || this.isShare) { //活动开始未报名，或者分享
        return 3
      } else if ((this.reg && this.is_kol && this.tab == 0) || (this.reg && !this.is_kol && this.tab == 'total')) {
        return 4
      }
    },
    nowUsrMsg () {
      let nowList = this.groupsUserMsg[this.showType][this.tab] || {}
      return nowList.msg || { info: {} }
    },
  },
  methods: {
    singUp () {
      singUp().then(res => {
        if (res.data.response_status.code == 0) {
          this.$store.dispatch('getInitInfo');
          if (!this.is_kol) {
            this.singUpType = 2
          }
          this.showSingUpPup = true
        } else {
          this.toast(res.data.response_status.error)
        }
      })
    }
  }
}
</script>

<style lang="scss">
.footer {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  .acrStatus {
    width: 7.5rem;
    height: 1.4rem;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #fff;
    color: rgba(168, 168, 176, 1);
    &.singUp {
      height: 0.92rem;
    }
    .act_not {
      margin-top: 0.3rem;
      font-size: 0.32rem;
      font-weight: 600;
    }
    .rankMsg {
      width: 100%;
      height: 1.4rem;
      display: flex;
      align-items: center;
      border-top: 0.02rem solid rgba(255, 151, 196, 1);
      position: relative;
      .dayIcon {
        display: block;
        width: 3.13rem;
        height: 0.49rem;
        background: url(../img/dayIcon.png);
        background-size: 100% 100%;
        position: absolute;
        right: 0.15rem;
        top: -0.49rem;
        text-align: center;
        font-size: 0.24rem;
        color: #fff;
        line-height: 0.49rem;
        text-indent: -0.15rem;
      }
      .totalIcon {
        width: 5.7rem;
        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;
        top: -0.49rem;
        left: 0.93rem;
        span {
          width: 2.8rem;
          height: 0.49rem;
          font-size: 0.24rem;
          color: #fff;
          line-height: 0.49rem;
          text-align: center;
          display: flex;
          align-items: center;
          justify-content: center;
          i {
            width: 0.12rem;
            height: 0.21rem;
            background: url(../img/arr_left.png);
            background-size: 100% 100%;
            margin-left: 0.1rem;
          }
        }
        .scoreIcon {
          background: url(../img/totalIcon1.png);
          background-size: 100% 100%;
          margin: 0;
        }
        .peopleList {
          background: url(../img/totalIcon2.png);
          background-size: 100% 100%;
          margin-left: 0.2rem;
        }
      }
      .rank {
        width: 0.87rem;
        height: 0.7rem;
        line-height: 0.7rem;
        text-align: center;
        color: rgba(171, 171, 182, 1);
        &.noRank {
          width: 1.2rem;
          font-size: 0.26rem;
          line-height: 0.25rem;
          margin-left: 0.15rem;
        }
      }
      .uerImg {
        width: 1.1rem;
        height: 1.1rem;
        position: relative;
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
        .room_frame {
          width: 0.94rem;
          height: 0.94rem;
          position: absolute;
          top: 0.055rem;
          left: 0.065rem;
          z-index: 10;
        }
        .av {
          width: 0.88rem;
          height: 0.88rem;
          position: absolute;
          top: 0.1rem;
          left: 0.11rem;
          border-radius: 50%;
          //   border: 0.02rem solid rgba(131, 9, 67, 1);
          &.room {
            border-radius: 0.14rem;
            &.noBor {
              border: none;
            }
          }
        }
      }
      .userMsg {
        width: 2.8rem;
        margin-right: 0.1rem;
        .nick {
          font-size: 0.32rem;
          color: rgba(168, 168, 176, 1);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .uid {
          color: rgba(171, 171, 182, 0.7);
          font-size: 0.26rem;
        }
      }
      .score {
        display: flex;
        align-items: center;
        color: rgba(255, 191, 208, 1);
        margin-left: 0.15rem;
        i {
          width: 0.32rem;
          height: 0.26rem;
          background: url(../img/scoreIcon1.png);
          background-size: 100% 100%;
          margin-right: 0.1rem;
          &.type2 {
            background: url(../img/scoreIcon2.png);
            background-size: 100% 100%;
          }
        }
      }
      &.rank1 {
        .rank {
          text-indent: -999rem;
          background: url(../img/top1.png) center center no-repeat;
          background-size: 0.44rem 0.55rem;
        }
      }
      &.rank2 {
        .rank {
          text-indent: -999rem;
          background: url(../img/top2.png) center center no-repeat;
          background-size: 0.44rem 0.55rem;
        }
      }
      &.rank3 {
        .rank {
          text-indent: -999rem;
          background: url(../img/top3.png) center center no-repeat;
          background-size: 0.44rem 0.55rem;
        }
      }
    }
  }
  .singUpSuc {
    width: 6.46rem;
    height: 4.1rem;
    background: url(../img/singUpSuc.png);
    background-size: 100% 100%;
    color: rgba(168, 168, 176, 1);
    position: relative;
    .close {
      display: block;
      width: 0.23rem;
      height: 0.23rem;
      background: url(../img/close.png);
      background-size: 100% 100%;
      position: absolute;
      right: 0.53rem;
      top: 0.53rem;
    }
    .title {
      height: 1.6rem;
      text-align: center;
      line-height: 2rem;
      font-size: 0.32rem;
    }
    .msg {
      padding: 0 0.6rem;
      text-align: center;
      font-size: 0.32rem;
    }
    .share {
      width: 2.9rem;
      height: 0.64rem;
      background: url(../img/showListBtn.png);
      background-size: 100% 100%;
      margin: 0.5rem auto;
      font-size: 0.26rem;
      text-align: center;
      line-height: 0.64rem;
      color: #fff;
    }
  }
}
</style>