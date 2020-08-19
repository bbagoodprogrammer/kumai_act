<template>
  <div class="footerBar" v-if="astState!=4 && astState!=5">
    <div class="acrStatus">
      <span class="noAct" v-if="astState === 0">{{lang.noAct}}</span>
      <span class="noAct" v-if="astState === 2">{{lang.actEd}}</span>
      <div class="anchorMsg msg" :class="'rank'+userMsg.anchor_rank" v-if="astState === 1">
        <div :class="'rank'+userMsg.anchor_rank" class="rank">
          <em>{{userMsg.anchor_rank}}</em>
        </div>
        <div class="userImg">
          <span class="imgBor"></span>
          <img v-lazy="userMsg.avatar" class="userAtr" alt="">
        </div>
        <div class="userMsg">
          <div class="name">{{userMsg.nick}}</div>
          <div class="id">{{userMsg.uid}}</div>
        </div>
        <!-- v-if="userMsg.anchor_rank>=20" -->
        <div class="scoreBox">
          <div class="score">{{lang.totalScore}}{{userMsg.anchor_rank_score}}</div>
          <!-- <div class="score">{{lang.todyGetScore}}{{userMsg.get_score_today}}</div> -->
        </div>
        <!-- <div class="scoreBox" v-else>
          <div class="score">{{lang.distance}}{{userMsg.anchor_rank_score2up}}</div>
        </div> -->
      </div>
      <div class="guard msg" :class="'rank'+userMsg.guard_rank" v-if="astState === 3 || astState === 6">
        <div :class="'rank'+userMsg.guard_rank" class="rank">
          <strong v-if="userMsg.guard_rank == 0">{{lang.otherRank}}</strong>
          <em v-else>{{userMsg.guard_rank}}</em>
        </div>
        <div class="userImg">
          <span class="imgBor"></span>
          <img v-lazy="userMsg.avatar" class="userAtr" alt="">
        </div>
        <div class="userMsg">
          <div class="name">{{userMsg.nick}}</div>
          <div class="id">{{userMsg.uid}}</div>
        </div>
        <div class="scoreBox" v-if="userMsg.guard_rank<=20">
          <div class="score">{{lang.totalConis}} {{userMsg.guard_rank_score}}</div>
          <div class="score">{{lang.dayCoins}} {{userMsg.send_coins_today}}</div>
        </div>
        <div class="scoreBox" v-else>
          <div class="score">{{lang.distance}} {{userMsg.guard_rank_score2up}}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState(['actStatus', "isShare", "userMsg", 'mainTab']),
    astState() {
      if (this.actStatus === 0) { //活动未开始
        return 0
      } else if (this.actStatus === 2) { //活动已结束
        return 2
      } else if (this.isShare) {  //分享模式不显示底部
        return 4
      } else if (this.userMsg.is_anchor && this.mainTab == 0) { //显示主播个人信息
        return 1
      } else if (this.userMsg.is_anchor && this.mainTab == 1) { //显示用户信息
        return 6
      } else if (!this.userMsg.is_anchor && this.mainTab == 1) { //显示用户信息
        return 3
      } else {
        return 5
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
    height: 1.26rem;
    margin: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    background: url(../assets/img/footerBg.png) no-repeat;
    background-size: 100% 100%;
    span {
      display: inline-block;
    }
  }
  .msg {
    display: flex;
    align-items: center;
    height: 1.15rem;
    margin-top: 0.05rem;
    .rank {
      width: 0.75rem;
      height: 0.65rem;
      text-align: center;
      margin-left: 0.15rem;
      display: flex;
      align-items: center;
      justify-content: center;
      em {
        color: #ffdde8;
        font-weight: 700;
        font-size: 0.36rem;
        font-style: italic;
      }
      strong {
        font-size: 0.24rem;
        display: block;
        line-height: 0.25rem;
      }
    }
    .userImg {
      position: relative;
      width: 1.09rem;
      height: 1.09rem;
      margin-left: 0.09rem;
      .imgBor {
        display: block;
        width: 1.09rem;
        height: 1.09rem;
        background: url(../assets/img/userAtrBor.png);
        background-size: 100% 100%;
        position: absolute;
        z-index: 5;
      }
      .userAtr {
        width: 1rem;
        height: 1rem;
        border-radius: 50%;
        position: absolute;
        left: 0.045rem;
        top: 0.045rem;
      }
    }
    .userMsg {
      width: 2.1rem;
      margin-left: 0.09rem;
      .name {
        font-size: 0.26rem;
        font-weight: 500;
        max-width: 2.1rem;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      .id {
        color: #93e7ff;
        font-weight: 500;
        font-size: 0.22rem;
        display: flex;
        align-items: center;
        em {
          display: block;
          width: 0.66rem;
          height: 0.19rem;
          background: url(../assets/img/live.gif);
          background-size: 100% 100%;
          margin-left: 0.1rem;
        }
      }
    }
    .scoreBox {
      width: 2.3rem;
      margin-left: 0.25rem;
      .score {
        font-size: 0.24rem;
        strong {
          font-weight: 700;
          font-size: 0.3rem;
        }
      }
      .gua {
        font-size: 0.24rem;
        color: #fffec6;
      }
    }
    &.rank1 {
      .rank {
        text-indent: -999rem;
        background: url(../assets/img/rank1.png);
        background-size: 100% 100%;
      }
      .imgBor {
        width: 1.11rem;
        height: 1.25rem;
        background: url(../assets/img/top1.png);
        background-size: 100% 100%;
        top: -0.17rem;
        left: -0.02rem;
      }
    }
    &.rank2 {
      .rank {
        text-indent: -999rem;
        background: url(../assets/img/rank2.png);
        background-size: 100% 100%;
      }
      .imgBor {
        width: 1.11rem;
        height: 1.25rem;
        background: url(../assets/img/top2.png);
        background-size: 100% 100%;
        top: -0.17rem;
        left: -0.02rem;
      }
    }
    &.rank3 {
      .rank {
        text-indent: -999rem;
        background: url(../assets/img/rank3.png);
        background-size: 100% 100%;
      }
      .imgBor {
        width: 1.11rem;
        height: 1.25rem;
        background: url(../assets/img/top3.png);
        background-size: 100% 100%;
        top: -0.17rem;
        left: -0.02rem;
      }
    }
  }
}
</style>
