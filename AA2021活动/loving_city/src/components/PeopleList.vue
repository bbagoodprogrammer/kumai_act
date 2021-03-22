<template>
  <div class="peopleRank">
    <div class="title">{{lang.p_title}}</div>
    <div class="listTips" v-html="lang.p_tips">
    </div>
    <div class="userMsg">
      <img v-lazy="user_info.avatar" alt="">
      <div class="nick">{{user_info.nick}}</div>
    </div>
    <ul>
      <li v-for="(item,index) in list" :key="index" :class="'rank' + item.rank">
        <div class="rankTitle" v-if="item.rank == 1">{{lang.peopleList_rankTips}}</div>
        <div class="rank">{{item.rank}}</div>
        <div class="linerBox">
          <i></i>
          <div class="liner">
            <div class="actLiner" :style="{width:item.score /totalScore * 100 +'%'}"></div>
          </div>
        </div>
        <div class="score">{{item.score}}</div>
        <div class="uerImg" @click="goUser(item.uid)">
          <img v-if="item.info.avatar_frame &&item.info.avatar_frame != ''" :src="item.info.avatar_frame" class="frame" alt="">
          <img v-lazy="item.info.avatar" alt="" class="av">
        </div>
      </li>
    </ul>
  </div>
</template>

<script>

import { guard } from "../apis"
import { mapState } from "vuex"

export default {
  data () {
    return {
      list: [],
      totalScore: 0
    }
  },
  created () {
    guard(0).then(res => {
      this.list = res.data.response_data.list
      this.totalScore = res.data.response_data.amount
    })
  },
  computed: {
    ...mapState(['user_info'])
  },
  methods: {
    goUser (uid) {
      location.href = `uid:${uid}`
    }
  }
}
</script>

<style lang="scss" >
.peopleRank {
  background: url(../img/peopleListBg.png);
  background-size: 100% 100%;
  padding-top: 0.33rem;
  .title {
    width: 5.09rem;
    height: 0.52rem;
    background: url(../img/peopleListTitleBg.png);
    background-size: 100% auto;
    text-align: center;
    line-height: 0.52rem;
    font-size: 0.32rem;
    margin: 0.33rem auto;
  }
  .listTips {
    text-align: center;
    font-size: 0.28rem;
    color: rgba(107, 122, 164, 1);
    margin: 0.37rem auto 0.53rem;
  }
  .userMsg {
    text-align: center;
    img {
      width: 1.4rem;
      height: 1.4rem;
      border-radius: 50%;
      border: 0.02rem solid #fff;
      margin: 0 auto;
    }
    .nick {
      color: rgba(129, 130, 130, 1);
      font-size: 0.28rem;
      margin: 0.1rem auto 0;
      max-width: 1.4rem;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }
  ul {
    width: 7.02rem;
    margin: 0.3rem auto;
    li {
      width: 7.02rem;
      height: 1.4rem;
      margin-bottom: 0.12rem;
      display: flex;
      align-items: center;
      background: rgba(255, 255, 255, 0.53rem);
      position: relative;
      .rankTitle {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 0.35rem;
        line-height: 0.65rem;
        text-align: center;
        font-size: 0.2rem;
      }
      .rank {
        width: 0.87rem;
        height: 0.7rem;
        line-height: 0.7rem;
        text-align: center;
        color: rgba(171, 171, 182, 1);
      }
      .linerBox {
        width: 3.56rem;
        display: flex;
        align-items: center;
        i {
          width: 0.32rem;
          height: 0.26rem;
          background: url(../img/scoreIcon1.png);
          background-size: 100% auto;
        }
        .liner {
          flex: 1;
          position: relative;
          margin-left: 0.25rem;
          height: 0.08rem;
          .actLiner {
            max-width: 100%;
            height: 100%;
            background: linear-gradient(90deg, #FF97C4, #FFC2C3);
            border-radius: 0.04rem;
            position: absolute;
            top: 0;
            left: 0;
          }
        }
      }
      .score {
        width: 1rem;
        text-align: center;
        color: rgba(255, 152, 196, 1);
        font-size: 0.2rem;
        margin-left: 0.2rem;
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
      &.rank1 {
        width: 7.5rem;
        height: 1.5rem;
        padding-top: 0.43rem;
        background: url(../img/no1.png);
        background-size: 100% auto;
        margin-left: -0.24rem;
        .rank {
          text-indent: -999rem;
          background: url(../img/top1.png) center center no-repeat;
          background-size: 0.44rem 0.55rem;
          margin-left: 0.24rem;
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