<template>
  <div class="rank_list">
    <a @click.prevent="onRefresh" href="" :style="{transform:'rotate('+rotatePx+'deg)'}" id="refresh"></a>
    <!-- <p v-if="activity.activity_status==0">- {{lang.tm_tips1}} -</p>
    <p v-else-if="activity.activity_status == 1">- {{lang.tm_tips2}} -</p>
    <p v-else-if="activity.activity_status ==2">- {{lang.tm_tips3}} -</p> -->
    <div class="timeDown" v-if="surplusTime&& !surplusTime.end && activity.activity_status!=2">
      <strong>{{surplusTime.day}}</strong>
      <em>{{lang.rank_day}}</em>
      <strong>{{surplusTime.hour}}</strong>
      <em>{{lang.rank_hour}}</em>
      <strong>{{surplusTime.minute}}</strong>
      <em>{{lang.rank_min}}</em>
      <!-- <strong>{{surplusTime.second}}</strong>
      <em>{{lang.rank_second}}</em> -->
    </div>
    <p v-if="!rank.length">{{lang.noData}}</p>
    <ul>
      <li v-for="(item,index) in rank" :key="index" :class="['rank' + item.rank]" @click="goUser(item)">
        <div class="userRank">{{item.rank}}</div>
        <div class="imgBox">
          <img v-lazy="item.avatar" alt="" class="avatar">
          <span class="live">Live</span>
        </div>
        <div class="nick">{{item.nick}}</div>
        <div class="score">
          <span class="tips">著陸次數</span>
          <span class="nums">{{item.score}}</span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>

import downTime from '../utils/downTime.js'
import { mapState } from "vuex"
import { allList } from "../apis"
import { chang_floor } from "../apis"
export default {
  data () {
    return {
      rotatePx: 0,    //刷新旋转动画
      rotatec: 0,
      surplusTime: {},
      loaded: false,
      more: true
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
      if (!this.more) {
        return
      }
      if (this.is_anchor) {
        this.vxc('reSetChange_floor')
      }
      this.rotatePx = 540 * ++this.rotatec  //旋转动画
      this.loaded = false
      this.$store.dispatch('getInitInfo');
      this.list = []
      this.onScroll('refresh')
    },
    goUser (item) {
      chang_floor(item.uid).then(res => {
        this.vxc('setChangeFloor', res.data.response_data.owner)
      })
    }
  }
}
</script>

<style lang="scss">
.rank_list {
  width: 7.2rem;
  min-height: 3rem;
  margin: 0.54rem auto 0;
  padding: 1.17rem 0 2rem 0;
  > p {
    text-align: center;
    font-size: 0.24rem;
    color: rgba(10, 86, 177, 1);
  }
  .timeDown {
    padding: 0 1.8rem;
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
      color: rgba(116, 228, 247, 1);
      //   margin: 0 0 0.22rem;
    }
  }
  ul {
    width: 7.02rem;
    margin: 0 auto;
    li {
      height: 1.43rem;
      display: flex;
      align-items: center;
      background: url(../img/rankBg.png);
      background-size: 100% 100%;
      margin-bottom: 0.11rem;
      .userRank {
        width: 0.52rem;
        height: 0.67rem;
        text-align: center;
        line-height: 0.67rem;
        font-size: 0.26rem;
        font-weight: bold;
        font-style: italic;
        color: rgba(116, 223, 254, 1);
        margin: 0 0.28rem 0 0.27rem;
      }
      .imgBox {
        width: 1.01rem;
        height: 1.01rem;
        position: relative;
        .avatar {
          width: 1.01rem;
          height: 1.01rem;
          box-sizing: border-box;
          border: 0.02rem solid RGBA(113, 117, 199, 1);
          border-radius: 50%;
          position: absolute;
        }
        .live {
          display: block;
          width: 0.88rem;
          height: 0.29rem;
          text-align: center;
          line-height: 0.29rem;
          background: linear-gradient(136deg, #52EDFF 0%, #CA2FFF 99%);
          border-radius: 0.13rem;
          font-size: 0.24rem;
          font-weight: 500;
          position: absolute;
          bottom: 0;
          left: 0.08rem;
        }
      }
      .nick {
        width: 2.5rem;
        font-size: 0.28rem;
        margin-left: 0.26rem;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      .score {
        flex: 1;
        padding-right: 0.43rem;
        span {
          display: block;
          text-align: right;
          &.tips {
            font-size: 0.24rem;
            color: rgba(82, 237, 255, 1);
          }
          &.nums {
            font-size: 0.32rem;
            color: rgba(255, 219, 112, 1);
            margin-top: 0.08rem;
          }
        }
      }

      &.rank1 {
        background: url(../img/top1.png);
        background-size: 100% 100%;
        .userRank {
          text-indent: -999rem;
        }
      }
      &.rank2 {
        background: url(../img/top2.png);
        background-size: 100% 100%;
        .userRank {
          text-indent: -999rem;
        }
      }
      &.rank3 {
        background: url(../img/top3.png);
        background-size: 100% 100%;
        .userRank {
          text-indent: -999rem;
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
  z-index: 100;
  &.mb {
    bottom: 2.8rem;
  }
}
</style>