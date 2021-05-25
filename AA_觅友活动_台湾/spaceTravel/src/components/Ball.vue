<template>
  <div class="ball">
    <div class="universe">
      <div class="ballItem" v-for="(item,index) in stars" :key="index" :class="[{no_people:!item.landing_num},'star' + index ]">
        <i class="addres">{{item.name}}</i>
        <div class="ball_icon"></div>
        <div class="user">
          <img :src="item.user.avatar" alt="" v-if="item.user" class="user_av">
          <img src="../img/usre_default.png" alt="" v-else class="user_av">
          <strong>{{item.user?item.user.nick:lang.not_people}}</strong>
        </div>
      </div>
      <div class="top0">
        <i class="addres">{{lang.space_station}}</i>
        <div class="top0_msg">
          <img :src="top0.avatar" alt="" v-if="top0.uid" class="user_av">
          <img src="../img/top0_defauultAv.png" alt="" v-else class="user_av">
          <strong>{{top0.nick?top0.nick:lang.not_people}}</strong>
        </div>
      </div>
    </div>
    <div class="luck" :class="{black:!owner.landing_num}" @click="luck()">
      <div class="tip">{{lang.landing_star}}</div>
      <div class="user_nums">（{{lang.landing_nums}}{{owner.landing_num}}）</div>
    </div>
    <div class="ball_bar">
      <div class="liner">
        <div class="default_bar"></div>
        <div class="act_liner">
          <span class="act" :style="{width:mysterious.progress +'%'}"></span>
        </div>
        <span class="title">{{lang.mysterious_star}}</span>
        <span class="barNums">{{mysterious.progress}}%</span>
      </div>
      <div class="bar_tips" v-html="lang.starTips">
      </div>
    </div>
    <div class="mask" v-show="showLuckPup">
      <transition name="slide">
        <div class="boll_luck_pup" v-if="showLuckPup">
          <i class="close" @click="showLuckPup = false"></i>
          <p class="luck_tips">{{lang.starTips2}}</p>
          <div class="luckGift">
            <div class="giftItem" v-for="(item,index) in luckGift" :key="index">
              <div class="imgBox">
                <img src="../img/gift_1.png" alt="" v-if="item.type == 'bean'">
                <img src="../img/gift_2.png" alt="" v-else-if="item.type == 'coin'">
                <img :src=" item.image" alt="" v-else>
              </div>
              <strong>{{item.name}}</strong>
            </div>
          </div>
          <p class="luck_tips2">{{lang.starTips3.replace(`$`,luckGift[0].name).replace(`%`,luckGift[1]?luckGift[1].name:'')}}</p>
          <div class="luck_get" @click="showLuckPup = false">{{lang.star_get}}</div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>

import { mapState } from "vuex"
import { starLuck } from "../apis"
export default {
  data () {
    return {
      showLuckPup: false,
      luckGift: []
    }
  },
  computed: {
    ...mapState(['stars', 'rank_space_station', 'owner', 'mysterious']),
    top0 () {
      if (this.rank_space_station.length) {
        return this.rank_space_station[0]
      }
      return {}
    }
  },
  methods: {
    luck () {
      if (this.owner.landing_num) {
        starLuck().then(res => {
          if (res.data.response_status.code == 0) {
            const { gifts, star } = res.data.response_data
            if (star != 7) {
              this.toast(`${this.lang.landing_addres}${star.name}`)
            } else {
              this.toast(this.lang.landing_addres_tips)
            }
            if (gifts) {
              setTimeout(() => {
                this.luckGift = res.data.response_data.gifts
                this.showLuckPup = true
              }, 1100)
            }
            this.$store.dispatch('getInitInfo');

          } else {
            this.toast(res.data.response_status.error)
          }
        })
      }
    }
  }

}
</script>

<style lang="scss">
@keyframes translateY {
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(-6px);
  }
}
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
      animation: translateY 3s linear infinite alternate;
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
          box-sizing: border-box;
          border: 0.02rem solid #71F9F6;
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
    &.black {
      width: 3.29rem;
      height: 0.85rem;
      background: url(../img/ball_star_black.png);
      background-size: 100% 100%;
      > div {
        color: rgba(128, 124, 124, 1);
      }
    }
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
          max-width: 100%;
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
  .boll_luck_pup {
    position: relative;
    .close {
      display: block;
      width: 0.75rem;
      height: 0.75rem;
      background: url(../img/close.png);
      background-size: 100% auto;
      position: absolute;
      top: -1rem;
      right: 0rem;
    }
    .luck_tips {
      text-align: center;
      color: RGBA(55, 43, 148, 1);
      font-size: 0.26rem;
    }
    .luckGift {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 0.32rem;
      margin-top: 0.4rem;
      .giftItem {
        width: 1.7rem;
        .imgBox {
          width: 1.7rem;
          height: 1.7rem;
          background: url(../img/luckGift_bg.png);
          background-size: 100% 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          img {
            width: 1.34rem;
            height: 1.34rem;
          }
        }
        strong {
          width: 100%;
          height: 0.7rem;
          display: block;
          text-align: center;
          font-size: 0.26rem;
        }
      }
    }
    .luck_tips2 {
      font-size: 0.28rem;
      color: RGBA(114, 234, 255, 1);
      text-align: center;
      margin-top: 0.22rem;
    }
    .luck_get {
      width: 2.45rem;
      height: 0.74rem;
      background: url(../img/go.png);
      background-size: 100% 100%;
      text-align: center;
      line-height: 0.74rem;
      margin: 0.3rem auto 0;
    }
  }
}
</style>