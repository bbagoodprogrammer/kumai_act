<template>
  <div class="ball">
    <div class="universe">
      <div class="ballItem" v-for="(item,index) in stars" :key="index" :class="[{no_people:!item.user},'star' + index ]">
        <i class="addres">{{item.name}}</i>
        <div class="ball_icon"></div>
        <div class="user">
          <img :src="item.user.avatar" alt="" v-if="item.user" class="user_av">
          <img src="../img/usre_default.png" alt="" v-else class="user_av">
          <strong>{{item.user?item.user.nick:'虛位以待'}}</strong>
        </div>
      </div>
      <div class="top0">
        <i class="addres">空間站</i>
        <div class="top0_msg">
          <img :src="top0.avatar" alt="" v-if="top0.uid" class="user_av">
          <img src="../img/usre_default.png" alt="" v-else class="user_av">
          <strong>{{top0?top0.nick:'虛位以待'}}</strong>
        </div>
      </div>
    </div>
    <div class="luck">
      <div class="tip">著陸到星球</div>
      <div class="user_nums">（著陸次數：10）</div>
    </div>
    <div class="ball_bar">
      <div class="liner">
        <div class="default_bar"></div>
        <div class="act_liner">
          <span class="act"></span>
        </div>
        <span class="title">神秘星球</span>
        <span class="barNums">30%</span>
      </div>
      <div class="bar_tips">
        每收到1223金幣指定禮物，進度條+1<br />
        當進度條達到100%，全站出現神秘星球概率翻倍1小時並重置儘速條
      </div>
    </div>
  </div>
</template>

<script>

import { mapState } from "vuex"
export default {
  computed: {
    ...mapState(['stars', 'rank_space_station']),
    top0 () {
      if (this.rank_space_station.length) {
        return this.rank_space_station[0]
      }
      return {}
    }
  }
}
</script>

<style lang="scss">
.ball {
  padding-top: 0.71rem;
  .universe {
    width: 7.5rem;
    height: 7.83rem;
    background: url(../img/universe.png);
    background-size: 100% 100%;
    position: relative;
    .ballItem {
      width: 1.5rem;
      height: 0.98rem;
      background: url(../img/starItem_bg.png);
      background-size: 100% 100%;
      position: absolute;
      z-index: 2;
      .addres {
        display: block;
        width: 100%;
        height: 0.4rem;
        line-height: 0.4rem;
        font-size: 0.2rem;
        color: rgba(93, 238, 255, 1);
        text-align: center;
        position: absolute;
        top: 0.48rem;
      }
      .ball_icon {
        width: 1.14rem;
        height: 1.12rem;
        position: absolute;
        left: 0.18rem;
        top: -0.91rem;
      }
      .user {
        width: 1.56rem;
        height: 0.46rem;
        padding: 0 0.1rem 0 0.4rem;
        background: url(../img/user_bg.png);
        background-size: 100% 100%;
        position: absolute;
        left: -0.32rem;
        bottom: -0.3rem;
        strong {
          display: block;
          line-height: 0.46rem;
          color: rgba(93, 255, 219, 1);
          font-size: 0.24rem;
          text-align: center;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
        .user_av {
          width: 0.58rem;
          height: 0.58rem;
          box-sizing: border-box;
          border: 0.02rem solid rgba(93, 255, 219, 1);
          border-radius: 50%;
          position: absolute;
          left: -0.22rem;
          top: -0.12rem;
        }
      }
      &.star1 {
        top: 0.38rem;
        left: 3.15rem;
        .ball_icon {
          background: url(../img/star/star_1.png);
          background-size: 100% 100%;
        }
        &.no_people {
          .ball_icon {
            background: url(../img/star/star_1_black.png);
            background-size: 100% 100%;
          }
        }
      }
      &.star2 {
        top: 2.07rem;
        right: 0.24rem;
        .ball_icon {
          background: url(../img/star/star_2.png);
          background-size: 100% 100%;
        }
        &.no_people {
          .ball_icon {
            background: url(../img/star/star_2_black.png);
            background-size: 100% 100%;
          }
        }
      }
      &.star3 {
        top: 4.8rem;
        right: 0.24rem;
        .ball_icon {
          background: url(../img/star/star_3.png);
          background-size: 100% 100%;
        }
        &.no_people {
          .ball_icon {
            background: url(../img/star/star_3_black.png);
            background-size: 100% 100%;
          }
        }
      }
      &.star4 {
        top: 7.12rem;
        right: 1.34rem;
        .ball_icon {
          background: url(../img/star/star_4.png);
          background-size: 100% 100%;
        }
        &.no_people {
          .ball_icon {
            background: url(../img/star/star_4_black.png);
            background-size: 100% 100%;
          }
        }
      }
      &.star5 {
        top: 7.12rem;
        left: 1.59rem;
        .ball_icon {
          background: url(../img/star/star_5.png);
          background-size: 100% 100%;
        }
        &.no_people {
          .ball_icon {
            background: url(../img/star/star_5_black.png);
            background-size: 100% 100%;
          }
        }
      }
      &.star6 {
        top: 4.8rem;
        left: 0.49rem;
        .ball_icon {
          background: url(../img/star/star_6.png);
          background-size: 100% 100%;
        }
        &.no_people {
          .ball_icon {
            background: url(../img/star/star_6_black.png);
            background-size: 100% 100%;
          }
        }
      }
      &.star7 {
        top: 2.07rem;
        left: 0.49rem;
        .ball_icon {
          background: url(../img/star/star_7.png);
          background-size: 100% 100%;
        }
        &.no_people {
          .ball_icon {
            background: url(../img/star/star_7_black.png);
            background-size: 100% 100%;
          }
        }
      }
    }
    .top0 {
      width: 3.93rem;
      height: 3.96rem;
      background: url(../img/top0_bg.png);
      background-size: 100% 100%;
      position: absolute;
      top: 1.94rem;
      left: 1.89rem;
      .addres {
        display: block;
        width: 100%;
        height: 0.4rem;
        line-height: 0.4rem;
        font-size: 0.2rem;
        color: rgba(93, 238, 255, 1);
        text-align: center;
        position: absolute;
        top: 0.38rem;
      }
      .top0_msg {
        width: 1.2rem;
        height: 1.2rem;
        position: absolute;
        top: 1.01rem;
        left: 1.37rem;
        img {
          width: 1.03rem;
          height: 1.03rem;
          border-radius: 50%;
          margin: 0 auto;
        }
        strong {
          font-size: 0.28rem;
          color: rgba(93, 255, 219, 1);
          text-align: center;
          display: block;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
      }
    }
  }
  .luck {
    width: 3.29rem;
    height: 0.85rem;
    background: url(../img/ball_luck.png);
    background-size: 100% 100%;
    margin: 0.94rem auto 0;
    .tip {
      text-align: center;
      font-size: 0.36rem;
      font-weight: 500;
      font-style: italic;
    }
    .user_nums {
      font-size: 0.2rem;
      color: rgba(100, 35, 222, 1);
      text-align: center;
      margin-top: -0.05rem;
    }
  }
  .ball_bar {
    width: 7.2rem;
    height: 1.26rem;
    padding-top: 0.77rem;
    background: url(../img/bar.png);
    background-size: 100% 100%;
    margin: 0.14rem auto 0;
    .liner {
      width: 6.41rem;
      height: 0.29rem;
      //   background: url(../img/bar_liner.png);
      //   background-size: 100% 100%;
      margin: 0 auto;
      position: relative;
      .default_bar {
        width: 6.41rem;
        height: 0.29rem;
        background: url(../img/bar_liner.png);
        background-size: 100% 100%;
        position: absolute;
        top: 0;
        left: 0;
        z-index: 2;
      }
      .act_liner {
        display: block;
        width: 100%;
        height: 0.2rem;
        background: rgba(32, 19, 92, 1);
        position: absolute;
        left: 0;
        top: 0.045rem;
        .act {
          display: block;
          width: 30%;
          height: 100%;
          background: linear-gradient(0deg, #6422DF 12%, #C556EE 100%);
          border-radius: 0.08rem;
        }
      }
      .title {
        font-size: 0.28rem;
        font-weight: bold;
        color: rgba(190, 235, 255, 1);
        position: absolute;
        left: 0;
        top: -0.4rem;
      }
      .barNums {
        position: absolute;
        right: 0;
        top: -0.4rem;
        font-size: 0.22rem;
        color: rgba(255, 200, 255, 1);
        font-weight: bold;
      }
    }
    .bar_tips {
      text-align: center;
      font-size: 0.22rem;
      color: rgba(90, 172, 247, 1);
      margin-top: 0.25rem;
    }
  }
}
</style>