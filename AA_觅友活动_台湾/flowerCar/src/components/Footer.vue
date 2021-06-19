<template>
  <div class="footer" v-if="astState">
    <div class="acrStatus">
      <div class="act_not" v-if="astState == 1">{{lang.noAct}}</div>
      <div class="act_not" v-else-if="astState == 2">{{lang.actEd}}</div>
      <div class="actIng" :class="'rank'+nowUsrMsg.rank">
        <div class="rank">{{nowUsrMsg.rank}}</div>
        <div class="uerImg" @click="goUser(nowUsrMsg.uid)">
          <img v-if="nowUsrMsg.avatar_frame &&nowUsrMsg.avatar_frame != ''" :src="nowUsrMsg.avatar_frame" class="frame" alt="">
          <img v-lazy="nowUsrMsg.avatar" alt="" class="av">
          <!-- <i>LIVE</i> -->
        </div>
        <div class="userMsg">
          <div class="nick"><strong>{{nowUsrMsg.nick}}</strong> <i v-if="nowUsrMsg.live  && mainTab == 0"> </i></div>
          <div class="uid"><i>{{showType==1? lang.floowScore:lang.peopleScore}}</i> <em>{{nowUsrMsg.score}}</em> </div>
        </div>
        <div class="fansList" v-if="nowUsrMsg.fans.length">
          <p @click="showFans(nowUsrMsg)">{{lang.fanList}}</p>
          <div class="imgList" v-if="nowUsrMsg.fans">
            <img v-lazy="item2.avatar" alt="" v-for="(item2,index2) in nowUsrMsg.fans" :key="index2" @click="goUser(item2.uid)">
          </div>
        </div>
      </div>
    </div>
    <!-- <div class="mask" v-show="showSingUpPup">
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
    </div> -->
  </div>
</template>

<script>

import { mapState } from 'vuex'

export default {
  data () {
    return {

    }
  },
  computed: {
    ...mapState(['groupsUserMsg', 'showType', 'tab', 'activity']),
    astState () {
      if (this.activity.status === 0) { //活动未开始
        return 1
      } else if (this.activity.status === 2) { //活动已结束
        return 2
      } else if (this.nowUsrMsg) {
        return 3
      }
    },
    nowUsrMsg () {
      let nowList = this.groupsUserMsg[this.showType][this.tab] || {}
      return nowList.msg
    },
  },
  methods: {
    goUser (uid) { //跳转
      var isiOS = navigator.userAgent.match(/iPhone|iPod|ios|iPad/i);
      if (isiOS) {
        sendJsData('app://userInfo?uid=' + uid);
      } else {
        javascript: JSInterface.sendJsData('app://userInfo?uid=' + uid);
      }
    },
    showFans (item) {
      this.$parent.$refs.rank.showFans(item)
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
    height: 2.19rem;
    display: flex;
    align-items: center;
    justify-content: center;
    background: url(../img/footer.png);
    background-size: 100% 100%;
    .act_not {
      margin-top: 0.5rem;
      font-size: 0.32rem;
      font-weight: 600;
    }
    .actIng {
      width: 100%;
      height: 1.56rem;
      margin-top: 0.8rem;
      display: flex;
      align-items: center;
      position: relative;
      .rank {
        width: 0.87rem;
        height: 0.7rem;
        line-height: 0.7rem;
        text-align: center;
        font-size: 0.28rem;
        color: #711ED8;
      }
      .uerImg {
        width: 1.22rem;
        height: 1.22rem;
        position: relative;
        .av {
          width: 100%;
          height: 100%;
          border: 0.02rem solid #FF99FE;
          border-radius: 50%;
          box-sizing: border-box;
        }
        i {
          width: 0.84rem;
          height: 0.27rem;
          background: #FF99FE;
          border-radius: 0.14rem;
          position: absolute;
          left: 0.19rem;
          bottom: 0;
          text-align: center;
          line-height: 0.27rem;
          font-size: 0.26rem;
        }
      }
      .userMsg {
        width: 2.8rem;
        margin-left: 0.15rem;
        .nick {
          color: #711ED8;
          display: flex;
          align-items: center;
          strong {
            flex: 1;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          i {
            display: inline-block;
            width: 0.28rem;
            height: 0.22rem;
            // background: url(../img/ktving.gif);
            // background-size: 100% 100%;
            margin-left: 0.1rem;
          }
        }
        .uid {
          display: flex;
          align-items: center;
          margin-top: 0.05rem;
          i {
            color: #C703F1;
            font-size: 0.22rem;
          }
          em {
            color: #711ED8;
            font-size: 0.28rem;
            margin-left: 0.05rem;
          }
        }
      }
      .fansList {
        margin-right: 0.38rem;
        p {
          font-size: 0.22rem;
          color: #C703F1;
          text-align: right;
        }
        .imgList {
          width: 2.14rem;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-top: 0.08rem;
          img {
            width: 0.41rem;
            height: 0.41rem;
            background: #9C55F4;
            border: 1px solid #FFFFFF;
            border-radius: 50%;
            margin-right: 0.02rem;
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
}
</style>