<template>
  <div class="user_rank">
    <div class="title"></div>
    <div class="timeDown" v-if="surplusTime&& !surplusTime.end && activity.activity_status!=2">
      <strong>{{surplusTime.day}}</strong>
      <em>{{lang.rank_day}}</em>
      <strong>{{surplusTime.hour}}</strong>
      <em>{{lang.rank_hour}}</em>
      <strong>{{surplusTime.minute}}</strong>
      <em>{{lang.rank_min}}</em>
      <strong>{{surplusTime.second}}</strong>
      <em>{{lang.rank_second}}</em>
    </div>
    <a @click.prevent="onRefresh" href="" :style="{transform:'rotate('+rotatePx+'deg)'}" id="refresh"></a>
    <p v-if="!rank.length" class="noData">{{lang.noData}}</p>
    <ul>
      <li v-for="(item,index) in rank" :key="index" :class="['rank' + item.rank]" @click="goUser(item)">
        <div class="userRank">{{item.rank}}</div>
        <div class="imgBox">
          <img :src="item.avatar_frame" alt="" v-if="item.avatar_frame" class="frame">
          <img v-lazy="item.avatar" alt="" class="avatar">
        </div>
        <div class="msg">
          <div class="nick">{{item.nick}}</div>
          <div class="iconList" v-if="item.wealth_lv || item.medals.length">
            <img :src="item2.url" alt="" v-for="(item2,index2) in item.medals" :key="index2">
            <div class="inner" v-if="item.wealth_lv">
              <img :src="require(`../img/wealv/icon${ parseInt(item.wealth_lv / 10)}.png`)" alt="" class="icon_lv">
              <span :class="{gt:item.wealth_lv>=10,
              bg9:item.wealth_lv>=1 && item.wealth_lv<10,
              bg10:item.wealth_lv>=10 && item.wealth_lv<20,
              bg20:item.wealth_lv>=20 && item.wealth_lv<30,
              bg30:item.wealth_lv>=30 && item.wealth_lv<40,
              bg40:item.wealth_lv>=40 && item.wealth_lv<50,
              bg50:item.wealth_lv>=50}">{{item.wealth_lv}}</span>
            </div>
          </div>
        </div>
        <div class="score">
          <i>{{lang.scoreName}}</i>
          <em>{{item.score}}</em>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>


import { mapState } from "vuex"
import downTime from '../utils/downTime.js'
export default {
  data () {
    return {
      rotatePx: 0,    //刷新旋转动画
      rotatec: 0,
      surplusTime: {},
      more: false
    }
  },
  computed: {
    ...mapState(['activity', 'rank'])
  },
  watch: {
    activity (val) {
      this.downTimeGo('time', val.seconds)
    }
  },
  methods: {
    downTimeGo (timeName, val) {
      clearInterval(this.timer)
      if (!downTime(timeName)) {
        downTime(timeName, val);
      }
      this.surplusTime = downTime(timeName);
      this.timer = setInterval(() => {
        this.surplusTime = downTime(timeName);
        if (this.surplusTime && this.surplusTime.end) {
          clearInterval(this.timer)
          // this.$store.commit("changday_down_time", 0)  //當天剩餘時間
        }
      }, 1000)
    },
    onRefresh () {
      this.rotatePx = 540 * ++this.rotatec  //旋转动画
      this.$store.dispatch('getInitInfo');
    },
    goUser (item) {
      var isiOS = navigator.userAgent.match(/iPhone|iPod|ios|iPad/i);
      if (isiOS) {
        sendJsData('app://userInfo?uid=' + item.uid);
      } else {
        javascript: JSInterface.sendJsData('app://userInfo?uid=' + item.uid);
      }
    },
  }
}
</script>

<style lang="scss">
.user_rank {
  width: 7.5rem;
  min-height: 1.97rem;
  margin: -1.4rem auto 0;
  //background: url(../img/wealv/icon1.png);
  background: url(../img/rankBg.png) no-repeat;
  background-size: 100% auto;
  position: relative;
  padding: 1rem 0 2rem;
  .title {
    width: 5.81rem;
    height: 2.17rem;
    position: absolute;
    left: 0.84rem;
    top: -1.23rem;
  }
  .noData {
    text-align: center;
    margin-top: 0.3rem;
  }
  .timeDown {
    padding: 0 1.1rem;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    strong {
      font-size: 0.46rem;
      font-weight: bold;
      display: block;
      width: 0.7rem;
      height: 0.7rem;
      display: flex;
      align-items: center;
      justify-content: center;
      background: url(../img/tm_bg.png);
      background-size: 100% 100%;
      img {
        width: 0.38rem;
        height: 0.59rem;
      }
    }
    em {
      display: block;
      font-size: 0.24rem;
      line-height: 0.9rem;
      color: #FFD25F;
      margin: 0 0.1rem 0 0.17rem;
    }
  }
  ul {
    width: 6.98rem;
    margin: 0 auto;
    li {
      height: 1.53rem;
      display: flex;
      align-items: center;
      background: url(../img/listItem.png);
      background-size: 100% 100%;
      margin-bottom: 0.06rem;
      .userRank {
        width: 1rem;
        height: 0.86rem;
        text-align: center;
        line-height: 0.86rem;
        font-size: 0.32rem;
        font-weight: bold;
        color: #F2E87E;
        margin: 0 0.09rem 0 0.05rem;
      }
      .imgBox {
        position: relative;
        margin-left: 0.3rem;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 1.08rem;
        height: 1.08rem;
        .frame {
          width: 1.836rem;
          height: 1.836rem;
          position: absolute;
          left: -0.378rem;
          top: -0.378rem;
          z-index: 2;
        }
        .avatar {
          width: 1.08rem;
          height: 1.08rem;
          border-radius: 50%;
          box-sizing: border-box;
          border: 0.03rem solid #fff;
        }
      }
      .msg {
        width: 2.3rem;
        margin-left: 0.15rem;
        display: flex;
        flex-direction: column;
        // align-items: center;
        justify-content: center;
        .nick {
          font-size: 0.28rem;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
        .iconList {
          height: 0.6rem;
          display: flex;
          margin-top: 0.1rem;
          > img {
            width: 0.49rem;
            height: 0.53rem;
            margin-left: 0.05rem;
          }
          .inner {
            display: flex;
            justify-content: center;
            box-sizing: border-box;
            margin-left: 0.1rem;
            .icon_lv {
              display: inline-block;
              width: 0.4rem;
              height: 0.4rem;
              position: relative;
              margin-top: 0.1rem;
            }
            span {
              display: inline-block;
              width: 0.67rem;
              height: 0.4rem;
              line-height: 0.4rem;
              background: linear-gradient(322deg, #8C8995 0%, #BCBBC7 100%);
              border-radius: 0 0.25rem 0.25rem 0;
              margin: 0.1rem 0 0 -0.25rem;
              font-size: 0.28rem;
              font-family: PingFang SC;
              font-weight: bold;
              color: #FFFFFF;
              box-sizing: border-box;
              text-align: center;
              padding-left: 0.16rem;
              &.gt {
                width: 0.87rem;
              }
              &.bg9 {
                background: linear-gradient(322deg, #4A85B2 0%, #7BABD2 100%);
              }
              &.bg10 {
                background: linear-gradient(322deg, #40ABA1 0%, #69C9D2 100%);
              }
              &.bg20 {
                background: linear-gradient(322deg, #4AC96C 0%, #94E9AB 100%);
              }
              &.bg30 {
                background: linear-gradient(322deg, #BF883B 0%, #E4C396 100%);
              }
              &.bg40 {
                background: linear-gradient(322deg, #CE7445 0%, #D29473 100%);
              }
              &.bg50 {
                background: linear-gradient(322deg, #C55451 0%, #D46B71 100%);
              }
            }
            .privilege_icon {
              width: 2rem;
              height: 1.6rem;
            }
            .privilege4 {
              width: 2rem;
              height: 2rem;
            }
            .float {
              width: 2rem;
              height: 0.88rem;
            }
          }
        }
      }
      .score {
        flex: 1;
        text-align: center;
        position: relative;
        i {
          display: block;
          color: #FFD25F;
          font-size: 0.28rem;
          //   text-align: right;
        }
        em {
          display: block;
          width: 2rem;
          height: 0.37rem;
          border-radius: 0.1rem;
          margin-top: 0.04rem;
        }
      }
      &.rank1,
      &.rank2,
      &.rank3 {
        background: url(../img/top3_bg.png);
        background-size: 100% 100%;
        .userRank {
          text-indent: -999rem;
          margin: 0 0.09rem 0 0.16rem;
        }
      }
      &.rank1 {
        .userRank {
          background: url(../img/top1.png);
          background-size: 100% 100%;
        }
      }
      &.rank2 {
        .userRank {
          background: url(../img/top2.png);
          background-size: 100% 100%;
        }
      }
      &.rank3 {
        .userRank {
          background: url(../img/top3.png);
          background-size: 100% 100%;
        }
      }
    }
    li:last-child {
      margin-bottom: 0;
    }
  }
}
#refresh {
  display: block;
  width: 0.94rem;
  height: 0.94rem;
  position: fixed;
  right: 0.08rem;
  bottom: 1.6rem;
  background: url(../img/refresh.png) no-repeat;
  background-size: contain;
  transition: transform 1s;
  text-indent: -999rem;
  z-index: 1002;
  &.mb {
    bottom: 2.8rem;
  }
}
</style>