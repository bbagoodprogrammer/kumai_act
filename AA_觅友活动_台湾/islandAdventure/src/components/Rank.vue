<template>
  <div class="rankList">
    <div class="rankTab">
      <span class="tab1" :class="{act:type == 1}" @click="tabClick(1)">日榜</span>
      <span class="tab2" :class="{act:type == 2}" @click="tabClick(2)">總榜</span>
    </div>
    <div class="downTime">
      <p>{{openLand.name}} 閉島倒計時</p>
      <div class="actTime">
        <span>{{surplusTime.day}}</span>
        <em>{{lang.day}}</em>
        <span>{{surplusTime.hour}}</span>
        <em>{{lang.hour}}</em>
        <span>{{surplusTime.minute}}</span>
        <em>{{lang.min}}</em>
        <span>{{surplusTime.second}}</span>
        <em>{{lang.second}}</em>
      </div>
    </div>
    <div class="top3">
      <p v-if="!top3.length" class="noData">暫無數據</p>
      <div class="topItem" v-for="(item,index) in top3" :key="index" :class="'top3_'+item.rank">
        <div class="imgBox">
          <span class="frame"></span>
          <img :src="item.avatar" alt="">
        </div>
        <div class="nick">{{item.nick}}</div>
        <div class="score">{{item.score}}</div>
      </div>
    </div>
    <ul class="otherList">
      <li v-for="(item,index) in otherRank" :key="index">
        <div class="rank">{{item.rank}}</div>
        <img :src="item.avatar" alt="">
        <div class="nick">{{item.nick}}</div>
        <div class="score">
          <span class="tips">島主積分</span>
          <span class="nums">{{item.score}}</span>
        </div>
      </li>
    </ul>
    <Footer />
  </div>
</template>

<script>

import { mapState } from "vuex"
import downTime from "../utils/downTime"
import { totalRank } from "../apis"
import Footer from "./Footer"
export default {
  components: { Footer },
  data () {
    return {
      type: 1,
      totalRank: {
        load: false,
        list: []
      },
      surplusTime: {}
    }
  },
  computed: {
    ...mapState(['rank', 'activity', 'islands']),
    openLand () {
      return this.activity.vol ? this.islands[this.activity.vol - 1] : {}
    },
    showRank () {
      return this.type == 1 ? this.rank : this.totalRank.list
    },
    top3 () {
      return this.showRank.slice(0, 3)
    },
    otherRank () {
      return this.showRank.slice(3)
    }
  },
  created () {
    this.downTimeGo('time1', this.activity.today_seconds)
  },
  watch: {
    type (val) {
      this.downTimeGo('time' + val, val == 1 ? this.activity.today_seconds : this.activity.seconds)
    },
  },
  methods: {
    tabClick (val) {
      this.vxc('setShowType', val)
      if (!this.totalRank.load && val == 2) {
        totalRank().then(res => {
          this.totalRank.load = true
          this.totalRank.list = res.data.response_data.rank
          this.type = val
          this.vxc('setTotleOwner', res.data.response_data.owner)
        })
      } else {
        this.type = val
      }
    },
    downTimeGo (timeName, val) {
      console.log(val)
      clearInterval(this.timer)
      if (!downTime(timeName)) {
        downTime(timeName, val);
      }
      this.surplusTime = downTime(timeName);
      this.timer = setInterval(() => {
        this.surplusTime = downTime(timeName);
        if (this.surplusTime.end) {
          clearInterval(this.timer)
          // this.$store.commit("changday_down_time", 0)  //當天剩餘時間
        }
      }, 1000)
    },
  }
}
</script>

<style lang="scss">
.rankList {
  width: 7.34rem;
  min-height: 7rem;
  padding-top: 0.42rem;
  background: url(../img/rankBg.png) no-repeat;
  background-size: 100% auto;
  margin: 0.25rem auto 0;
  .rankTab {
    padding: 0 1.43rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    > span {
      width: 2.18rem;
      height: 0.96rem;
      font-size: 0.36rem;
      text-align: center;
      line-height: 0.99rem;
      color: #05257F;
      background-size: 100% 100% !important;
    }
    .tab1 {
      background: url(../img/rankTab.png);
      &.act {
        color: #561F04;
        background: url(../img/rankTab_act.png);
      }
    }
    .tab2 {
      background: url(../img/rankTab.png);
      &.act {
        color: #561F04;
        background: url(../img/rankTab_act.png);
      }
    }
  }
  .downTime {
    text-align: center;
    color: #A36E41;
    p {
      font-size: 0.28rem;
      margin-top: 0.15rem;
    }
    .actTime {
      display: flex;
      align-items: center;
      justify-content: center;
      span {
        width: 0.72rem;
        height: 0.72rem;
        text-align: center;
        line-height: 0.72rem;
        font-size: 0.4rem;
        font-weight: 600;
        // background: RGBA(75, 59, 104, 1);
        border-radius: 0.1rem;
      }
      em {
        color: #7D3F0A;
        font-size: 0.22rem;
        margin: 0.1rem 0.15rem 0 0.15rem;
      }
    }
  }
  .top3 {
    height: 5.36rem;
    padding: 0 0.3rem;
    display: flex;
    justify-content: space-between;
    .noData {
      width: 100%;
      text-align: center;
      color: #7D3F0A;
    }
    .topItem {
      width: 2.2rem;
      .imgBox {
        width: 2.2rem;
        height: 2.37rem;
        position: relative;
        .frame {
          width: 100%;
          height: 100%;
          position: absolute;
          background-size: 100% 100% !important;
        }
        img {
          width: 1.71rem;
          height: 1.71rem;
          border-radius: 50%;
          margin: 0 auto;
          position: absolute;
          top: 0.37rem;
          left: 0.25rem;
        }
      }
      .nick,
      .score {
        color: #7D3F0A;
        font-size: 0.28rem;
        text-align: center;
      }
      .nick {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        margin: 0.13rem 0 0.1rem;
      }
      &.top3_1 {
        margin-top: 1.74rem;
        .frame {
          background: url(../img/top1.png);
        }
      }
      &.top3_2 {
        .frame {
          background: url(../img/top2.png);
        }
      }
      &.top3_3 {
        margin-top: 1.74rem;
        .frame {
          background: url(../img/top3.png);
        }
      }
    }
  }
  .otherList {
    width: 6.84rem;
    margin: 0 auto;
    li {
      height: 1.48rem;
      display: flex;
      align-items: center;
      background: url(../img/taskItem.png);
      background-size: 100% 100%;
      margin-bottom: 0.05rem;
      .rank {
        width: 1.07rem;
        text-align: center;
        font-size: 0.36rem;
        color: #652F00;
      }
      img {
        width: 1.07rem;
        height: 1.07rem;
        border: 0.02rem solid #7D3F0A;
        border-radius: 50%;
      }
      .nick {
        width: 2.6rem;
        color: #652F00;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        margin-left: 0.14rem;
      }
      .score {
        flex: 1;
        text-align: center;
        span {
          display: block;
          margin-bottom: 0.06rem;
          &.tips {
            font-size: 0.26rem;
            color: #E98834;
          }
          &.nums {
            color: #652F00;
          }
        }
      }
    }
  }
}
</style>