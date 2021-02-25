<template>
  <div class="footer">
    <div class="swiper" v-show="footerStatus == 1">
      <div class="tips">我的拼團進行中</div>
      <van-swipe class="my-swipe-sGift" :loop="false" :touchable="false" :indicator-color="'#FF6A57'" ref="swiper">
        <van-swipe-item v-for="(item,index) in my_group" :key="index">
          <div class="imgBox">
            <img :src="item.img" alt="">
          </div>
          <div class="msg">
            <div class="numsTips">{{item.num}}人團，已拼團{{item.num - item.surplus}}人，還差{{item.surplus}}人</div>
            <div class="time">{{actTime}} 後結束</div>
            <div class="friendBtn">邀請好友拼團</div>
          </div>
        </van-swipe-item>
      </van-swipe>
      <span class="pre" @click="pre()"></span>
      <span class="next" @click="next()"></span>
    </div>
    <div class="userRank" v-if="footerStatus == 3" :class="'rank' +user.rank ">
      <div class="rank">{{user.rank?user.rank:'未上榜'}}</div>
      <img v-lazy="user.avatar" alt="" @click="goUser(user.uid)">
      <div class="msg">
        <div class="nick">{{user.nick}}</div>
        <div class="uid">UID {{user.uid}}</div>
      </div>
      <div class="score">
        <em>{{user.score}}</em>
        <i></i>
      </div>
    </div>
  </div>

</template>


<script>
import { mapState } from "vuex"
import getDate from "../utils/getDate"
export default {
  data() {
    return {
      swiper: {}
    }
  },
  computed: {
    ...mapState(['my_group', 'user', 'type', 'end']),
    footerStatus() {
      if (this.type == 1) {
        return 1
      } else if (this.type == 3) {
        return 3
      }
    },
    actTime() {
      return getDate(new Date(this.end * 1000), 5)
    }
  },
  mounted() {
    this.swiper = this.$refs.swiper
  },
  methods: {
    pre() {
      console.log(this.swiper)
      this.swiper.prev()
    },
    next() {
      this.swiper.next()
    },
  },
};
</script>

<style lang="scss">
.footer {
  width: 100%;
  background: #ffffff;
  overflow-x: hidden;
  position: fixed;
  bottom: -0.01rem;
  border-top: 0.02rem solid RGBA(255, 114, 88, 1);
  .tips {
    height: 1.1rem;
    line-height: 1.1rem;
    text-align: center;
    color: rgba(133, 90, 55, 1);
    font-size: 0.28rem;
  }
  .imgBox {
    width: 1.6rem;
    height: 1.6rem;
    background: rgba(255, 226, 206, 0.3);
    border-radius: 0.1rem;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .msg {
    margin-left: 0.22rem;
    .numsTips {
      font-size: 0.26rem;
      color: rgba(133, 90, 55, 1);
      font-size: 0.26rem;
      em {
        color: rgba(255, 106, 87, 1);
      }
    }
    .time {
      color: rgba(133, 90, 55, 1);
      font-size: 0.22rem;
    }
    .friendBtn {
      width: 1.96rem;
      height: 0.48rem;
      background: linear-gradient(-90deg, #ff885a, #ff6957);
      border-radius: 0.24rem;
      text-align: center;
      line-height: 0.48rem;
      font-size: 0.24rem;
      color: #fff;
      margin-top: 0.23rem;
    }
  }
}
// .my-swipe {
//   width: 7.5rem;
//   height: 4.62rem;
//   position: relative;
//   padding-top: 0.6rem;
// }
.my-swipe-sGift {
  width: 5.6rem;
  height: 2.12rem;
  // overflow: hidden;
  margin: 0 auto;
  position: relative;
  .vipTips {
    padding: 0 0.4rem;
    font-size: 0.26rem;
  }
  .vipBox {
    // height: 2.6rem;
    overflow: hidden;
  }

  .vipItem::-webkit-scrollbar {
    display: none;
  }
}
// .van-swipe {
//   overflow: visible !important ;
// }
.van-swipe-item {
  height: 100%;
  display: flex;
  // align-items: center;
}
.pre,
.next {
  display: block;
  width: 1rem;
  height: 1rem;
  background: green;
}
.pre,
.next {
  display: block;
  width: 0.17rem;
  height: 0.28rem;
  background: url(../img/pre.png);
  background-size: 100% 100%;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 5;
  top: 1.64rem;
  left: 0.26rem;
}
.next {
  left: 7.08rem;
  background: url(../img/next.png);
  background-size: 100% 100%;
}
.van-swipe__indicators {
  .van-swipe__indicator {
    background-color: #dddddd;
  }
}
.userRank {
  height: 1.4rem;
  display: flex;
  align-items: center;
  color: rgba(133, 90, 55, 1);
  font-size: 0.32rem;
  position: relative;
  .rank {
    width: 0.87rem;
    height: 0.7rem;
    line-height: 0.7rem;
    text-align: center;
    white-space: nowrap;
    margin: 0 0.2rem 0 0.1rem;
  }
  img {
    width: 0.88rem;
    height: 0.88rem;
    border-radius: 50%;
  }
  .msg {
    width: 3.1rem;
    margin-left: 0.28rem;
    .nick {
      font-size: 0.32rem;
      color: rgba(133, 90, 55, 1);
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    .uid {
      font-size: 0.26rem;
      color: rgba(133, 90, 55, 1);
    }
    .tm {
      font-size: 0.24rem;
    }
  }
  .score {
    display: flex;
    align-items: center;
    i {
      width: 0.28rem;
      height: 0.28rem;
      background: url(../img/coins.png);
      background-size: 100% 100%;
      margin-left: 0.08rem;
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
</style>