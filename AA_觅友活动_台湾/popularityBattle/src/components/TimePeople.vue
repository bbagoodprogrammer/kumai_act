<template>
  <div class="timePeople">
    <div class="tm">{{getDate(nowUser.timestamp)}}</div>
    <div class="pelple">
      <i class="arr_left" @click="pre()"></i>
      <i class="arr_right" @click="next()"></i>
      <div class="people_list">
        <div class="people_item" v-for="(item,index) in nowUser.hours" :key="index">
          <img v-lazy="item.user?item.user.avatar:''" alt="" class="av">
          <div class="hour">{{item.hour}}:00</div>
          <div class="score" v-if="item.user">{{item.user.score}}</div>
          <div class="scoreTips" v-if="item.user">{{lang.rank_listHeader4}}</div>
        </div>
      </div>
    </div>
    <div class="people_scoreTips">
      {{lang.people_scoreTips}}
    </div>
  </div>
</template>

<script>

import { mapState } from "vuex"
import getDate from "../utils/getDate"
export default {
  data () {
    return {
      showIndex: 0
    }
  },
  watch: {
    activity (val) {
      this.showIndex = val.days
    }
  },
  computed: {
    ...mapState(['days_rank', 'activity']),
    nowUser () {
      return this.days_rank[this.showIndex] || {}
    }
  },
  methods: {
    pre () {
      if (this.showIndex > 0) {
        this.showIndex--
      }
    },
    next () {
      if (this.showIndex < this.days_rank.length - 1) {
        this.showIndex++
      }
    },
    getDate (tm) {
      if (AREA == 'tw') {
        return getDate(new Date(tm * 1000), 1)
      } else {
        return getDate(new Date(tm * 1000), 2)
      }

    }
  }
}
</script>

<style lang="scss" lang="scss">
.timePeople {
  width: 7.31rem;
  height: 5.34rem;
  padding-top: 0.13rem;
  background: url(../img/tm_peopleBg.png);
  background-size: 100% 100%;
  margin: 0 auto;
  position: relative;
  .tm {
    width: 3.4rem;
    height: 0.49rem;
    background: url(../img/tm_title_bg.png);
    background-size: 100% 100%;
    text-align: center;
    line-height: 0.49rem;
    font-size: 0.28rem;
    font-weight: bold;
    margin: 0 auto;
  }
  .pelple {
    margin-top: 0.8rem;
    position: relative;
    .arr_left,
    .arr_right {
      display: block;
      width: 0.4rem;
      height: 0.59rem;
      background: url(../img/arr.png);
      background-size: 100% 100%;
      position: absolute;
      top: 0.4rem;
    }
    .arr_left {
      left: 0.06rem;
      transform: rotate(180deg);
    }
    .arr_right {
      right: 0.06rem;
    }
    .people_list {
      padding: 0 0.47rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .people_item {
        width: 1.47rem;
        height: 1.98rem;
        background: url(../img/people_item.png);
        background-size: 100% 100%;
        position: relative;
        .av {
          width: 1.15rem;
          height: 1.15rem;
          border-radius: 50%;
          border: 0.02rem solid RGBA(249, 194, 247, 1);
          box-sizing: border-box;
          position: absolute;
          left: 0.16rem;
          top: -0.5rem;
        }
        .hour {
          width: 1.25rem;
          height: 0.51rem;
          background: url(../img/hourBg.png);
          background-size: 100% 100%;
          text-align: center;
          line-height: 0.51rem;
          font-size: 0.26rem;
          position: absolute;
          top: 0.45rem;
          left: 0.1rem;
        }
        .score {
          width: 100%;
          height: 0.4rem;
          line-height: 0.4rem;
          font-size: 0.32rem;
          font-weight: bold;
          color: rgba(255, 248, 59, 1);
          position: absolute;
          top: 0.9rem;
          text-align: center;
        }
        .scoreTips {
          width: 1.36rem;
          height: 0.32rem;
          text-align: center;
          line-height: 0.32rem;
          background: url(../img/score_tips.png);
          background-size: 100% 100%;
          position: absolute;
          bottom: 0.3rem;
          font-size: 0.24rem;
          color: rgba(249, 194, 247, 1);
        }
      }
    }
  }
  .people_scoreTips {
    padding: 0 0.4rem;
    text-align: center;
    font-size: 0.24rem;
    color: rgba(216, 173, 252, 1);
    margin: 0.3rem auto 0;
  }
}
.timePeople::before {
  content: '';
  display: block;
  width: 7.23rem;
  height: 4.81rem;
  border: 1px solid #E43E7E;
  border-radius: 0.1rem;
  position: absolute;
  top: 0.6rem;
  left: 0.03rem;
}
</style>