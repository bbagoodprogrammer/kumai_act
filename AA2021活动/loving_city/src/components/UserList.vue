<template>
  <div class="userList">
    <div class="title">{{lang.u_title}}</div>
    <div class="listTips" v-html="lang.u_tips">
    </div>
    <ul>
      <li v-for="(item,index) in list" :key="index" :class="'rank' + item.rank">
        <div class="rankTitle" v-if="item.rank == 1">{{lang.userList_rankTips}}</div>
        <div class="rank">{{item.rank}}</div>
        <div class="uerImg" @click="goUser(item.uid)">
          <img v-if="item.info.avatar_frame &&item.info.avatar_frame != ''" :src="item.info.avatar_frame" class="frame" alt="">
          <img v-lazy="item.info.avatar" alt="" class="av">
        </div>

        <div class="userMsg">
          <div class="nick">{{item.info.nick}}</div>
          <div class="linerBox">
            <i></i>
            <div class="liner">
              <div class="actLiner" :style="{width:item.score /1500 * 100 +'%'}"></div>
            </div>
            <div class="score">{{item.score}}</div>
          </div>
        </div>
        <div class="uerImg" @click="goUser(user_msg.uid)">
          <img v-if="user_msg.avatar_frame && user_msg.avatar_frame != ''" :src="user_msg.avatar_frame" class="frame" alt="">
          <img v-lazy="user_msg.avatar" alt="" class="av">
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
  computed: {
    user_msg () {
      return this.$route.params.userItem || {}
    }
  },
  mounted () {
    guard(this.$route.params.userItem.uid).then(res => {
      this.list = res.data.response_data.list
      this.totalScore = res.data.response_data.amount
    })
  },
  methods: {
    goUser (uid) {
      location.href = `uid:${uid}`
    }
  }
  //   computed: {
  //     ...mapState(['user_info'])
  //   }
}
</script>

<style lang="scss">
.userList {
  background: url(../img/peopleListBg.png) no-repeat;
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
      .userMsg {
        width: 3.5rem;
        .nick {
          font-size: 0.28rem;
          color: rgba(153, 157, 166, 1);
          margin-bottom: 0.1rem;
        }
      }
      .linerBox {
        width: 2.39rem;
        display: flex;
        align-items: center;
        i {
          width: 0.32rem;
          height: 0.26rem;
          background: url(../img/scoreIcon2.png);
          background-size: 100% auto;
        }
        .liner {
          flex: 1;
          position: relative;
          margin-left: 0.1rem;
          height: 0.08rem;
          .actLiner {
            max-width: 100%;
            height: 100%;
            background: linear-gradient(90deg, #D7C4FF, #FFC2C3);
            border-radius: 0.04rem;
            position: absolute;
            top: 0;
            left: 0;
          }
        }
        .score {
          color: rgba(255, 152, 196, 1);
          font-size: 0.2rem;
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
      &.rank1 {
        width: 7.5rem;
        height: 1.5rem;
        padding-top: 0.43rem;
        background: url(../img/no1.png);
        background-size: 100% auto;
        margin-left: -0.24rem;
        .nick {
          color: rgba(144, 116, 115, 1);
        }
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