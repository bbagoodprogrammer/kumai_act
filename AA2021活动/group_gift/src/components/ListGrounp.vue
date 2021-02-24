<template>
  <div class="listGrounp">
    <div class="tabs">
      <span v-for="(item,index) in tabsArr" :class="{act:type == (index+1)}" :key="index" @click="type = (index+1)">
        {{item}}
      </span>
    </div>
    <div class="time">
      <div class="peopleNums listTips" v-if="type == 1 || type ==2">已有<em>184</em>拼團成功</div>
      <div class="timeTips listTips" v-if="type==1">本輪拼團結束倒計時</div>
      <div class="downTimeBox2">
        <div class="timeDown" v-if="surplusTime&& !surplusTime.end">
          <div class="day">
            <strong>{{surplusTime.day}}</strong>
            <em>{{lang.day}}</em>
          </div>
          <div class="hours">
            <strong>{{surplusTime.hour}}</strong>
            <em>{{lang.hour}}</em>
          </div>
          <div class="min">
            <strong>{{surplusTime.minute}}</strong>
            <em>{{lang.min}}</em>
          </div>
          <div class="second">
            <strong>{{surplusTime.second}}</strong>
            <em>{{lang.second}}</em>
          </div>
        </div>
      </div>
      <div class="rankTips listTips" v-if="type==3">本期活動拼團成功后使用的金幣數</div>
    </div>
    <keep-alive>
      <component :is="nowCom"></component>
    </keep-alive>
  </div>
</template>
<script>

import downTime from '../utils/downTime.js'
import List1 from './List1'
import List2 from './List2'
import List3 from './List3'
export default {
  components: { List1, List2, List3 },
  data() {
    return {
      type: 1,
      tabsArr: [
        '禮物櫥窗',
        '禮物拼圖',
        '拼團榜'
      ],
      surplusTime: {}
    }
  },
  computed: {
    nowCom() {
      return `List${this.type}`
    }
  },
  created() {
    this.downTimeGo('time' + this.rankKey, 898999)
  },
  methods: {
    downTimeGo(timeName, val) {
      console.log(timeName, val)
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
  }
}
</script>
<style lang="scss" scoped>
.listGrounp {
  .tabs {
    width: 7.18rem;
    height: 0.88rem;
    background: #ffffff;
    border-radius: 0.44rem;
    margin: 0.37rem auto 0;
    display: flex;
    align-items: center;
    span {
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      line-height: 0.25rem;
      flex: 1;
      color: rgba(133, 90, 55, 1);
      font-size: 0.32rem;
      text-align: center;
      border-radius: 0.44rem;
      &.act {
        color: #fff;
        background: linear-gradient(-90deg, #ff885a, #ff6957);
      }
    }
  }
  .time {
    color: rgba(133, 90, 55, 1);
    font-size: 0.28rem;
    .listTips {
      height: 0.8rem;
      line-height: 0.8rem;
      text-align: center;
      em {
        color: rgba(255, 106, 87, 1);
      }
      &.timeTips {
        font-size: 0.32rem;
      }
    }
  }
  .downTimeBox2 {
    margin: 0.11rem auto 0;
    width: 6.98rem;
    text-align: center;
    position: relative;
    .timeDown {
      width: 5.15rem;
      padding: 0 0.09rem;
      margin: 0.17rem auto 0;
      display: flex;
      justify-content: space-between;
      > div {
        height: 100%;
        line-height: 0.6rem;
        display: flex;
        align-items: center;
        strong {
          display: block;
          text-align: center;
          width: 0.88rem;
          height: 0.88rem;
          background: rgba(255, 255, 255, 0.6);
          border-radius: 0.16rem;
          line-height: 0.88rem;
          font-size: 0.5rem;
        }
        em {
          font-size: 0.24rem;
          margin: 0.15rem 0.05rem 0 0.05rem;
        }
      }
    }
    .timeTips {
      font-size: 0.24rem;
      text-align: center;
      margin: 0.13rem auto 0;
    }
    .noTime {
      line-height: 0.6rem;
    }
  }
}
</style>
