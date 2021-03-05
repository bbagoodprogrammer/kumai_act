<template>
  <div class="footer">
    <div class="swiper" v-show="footerStatus == 1">
      <div class="tips">{{lang.myGroup}}</div>
      <van-swipe class="my-swipe-sGift" :loop="false" :touchable="false" :indicator-color="'#FF6A57'" ref="swiper">
        <van-swipe-item v-for="(item,index) in my_group" :key="index">
          <div class="imgBox">
            <img :src="item.img" alt="">
          </div>
          <div class="msg">
            <div class="numsTips">{{lang.groupMsg.replace('#',item.num).replace('$',item.num - item.surplus).replace('%',item.surplus)}}</div>
            <div class="time">{{actTime}} {{lang.group_end}}</div>
            <div class="friendBtn" :class="{over:step!=1}" @click="showFriendsPup(item.id)">{{lang.group_inivte}}</div>
          </div>
        </van-swipe-item>
      </van-swipe>
      <span class="pre" @click="pre()"></span>
      <span class="next" @click="next()"></span>
    </div>
    <div class="userRank" v-if="footerStatus == 3" :class="'rank' +user.rank ">
      <div class="rank">{{user.rank?user.rank:lang.noRank}}</div>
      <div class="uerImg" @click="goUser(user.uid)">
        <img v-if="user.avatar_frame &&user.avatar_frame != ''" :src="user.avatar_frame" class="frame" alt="">
        <!-- <img src="../assets/img/testFrame.png" class="frame" alt=""> -->
        <!-- <img v-else-if="user.nob > 0" :src="require(`../img/nob/${user.nob}.png`)" class="nob" alt=""> -->
        <img v-lazy="user.avatar" alt="" class="av">
      </div>
      <div class="msg">
        <div class="nick">{{user.nick}}</div>
        <div class="uid">UID {{user.uid}}</div>
      </div>
      <div class="score">
        <em>{{user.score}}</em>
        <i></i>
      </div>
    </div>
    <!-- 好友 -->
    <div class="mask" v-show="showFriends">
      <transition name="slide">
        <Friends v-if="showFriends" :order_id="order_id" />
      </transition>
    </div>
  </div>

</template>


<script>
import { mapState } from "vuex"
import getDate from "../utils/getDate"
import Friends from "./Friends"
export default {
  components: { Friends },
  data () {
    return {
      swiper: {},
      showFriends: false,
      order_id: null
    }
  },
  computed: {
    ...mapState(['my_group', 'user', 'type', 'end', 'step']),
    footerStatus () {
      if (this.type == 1 && this.my_group.length) {
        return 1
      } else if (this.type == 3) {
        return 3
      }
    },
    actTime () {
      if (_app == 'hsing') {
        return getDate(new Date(this.end * 1000), 5)
      } else if (_app == 'singnow') {
        return getDate(new Date(this.end * 1000), 8)
      }
    }
  },
  mounted () {
    this.swiper = this.$refs.swiper
  },
  methods: {
    showFriendsPup (id) {
      console.log(id)
      this.order_id = id
      this.showFriends = true

    },
    pre () {
      console.log(this.swiper)
      this.swiper.prev()
    },
    next () {
      this.swiper.next()
    },
    goUser (uid) {
      location.href = `uid:${uid}`
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
  z-index: 1000;
  bottom: -0.01rem;
  border-top: 0.02rem solid RGBA(255, 114, 88, 1);
  .tips {
    // width: 1.96rem;
    white-space: nowrap;
    padding: 0 0.15rem;
    height: 0.36rem;
    line-height: 0.36rem;
    background: linear-gradient(
      -90deg,
      rgba(255, 136, 90, 0.1),
      rgba(255, 105, 87, 0.1)
    );
    border-radius: 0px 0px 0px 0.12rem;
    text-align: center;
    color: rgba(255, 106, 87, 1);
    font-size: 0.22rem;
    position: absolute;
    top: 0;
    right: 0;
  }
  .imgBox {
    width: 1.4rem;
    height: 1.4rem;
    background: rgba(255, 226, 206, 0.3);
    border-radius: 0.1rem;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .msg {
    margin-left: 0.22rem;
    flex: 1;
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
      &.over {
        background: rgba(188, 188, 188, 1);
      }
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
  padding-top: 0.4rem;
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
  top: 1rem;
  left: 0.26rem;
}
.next {
  left: 7.08rem;
  background: url(../img/next.png);
  background-size: 100% 100%;
}
.van-swipe__indicators {
  bottom: 0.1rem !important;
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
    border: 0.02rem solid rgba(131, 9, 67, 1);
    &.room {
      border-radius: 0.14rem;
      &.noBor {
        border: none;
      }
    }
  }
}
</style>