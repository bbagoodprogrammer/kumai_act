<template>
  <div class="downTime">
    <p class="title">
      <strong v-if="actStatus == 1">離比賽結束時間還有</strong>
      <strong v-else-if="actStatus == 0">離比賽結束時間還有</strong>
      <strong v-else>活動已結束</strong>
    </p>
    <div class="time">
      <div class="day">
        <strong>{{surplusTime.day}}</strong>
        <em>天</em>
      </div>
      <div class="hours">
        <strong>{{surplusTime.hour}}</strong>
        <em>時</em>
      </div>
      <div class="min">
        <strong>{{surplusTime.minute}}</strong>
        <em>分</em>
      </div>
      <div class="second">
        <strong>{{surplusTime.second}}</strong>
        <em>秒</em>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex"
import downTime from '../utils/downTime.js'
export default {
  data() {
    return {
      surplusTime: {}
    }
  },
  computed: {
    ...mapState(["second", "actStatus"])
  },
  watch: {
    second(val) {
      this.downTimeGo('time1', val)
    }
  },
  methods: {
    downTimeGo(timeName, val) {
      downTime(timeName, val);
      this.surplusTime = downTime(timeName);
      this.timer = setInterval(() => {
        this.surplusTime = downTime(timeName);
        if (this.surplusTime.end) {
          clearInterval(this.timer)
        }
      }, 1000)
    },
  }
}
</script>
<style lang="scss" scoped>
.downTime {
  width: 7.39rem;
  height: 2.95rem;
  padding-top: 0.48rem;
  background: url(../assets/img/time.png);
  background-size: 100% 100%;
  .title {
    text-align: center;
    strong {
      font-size: 0.34rem;
      font-family: Microsoft YaHei;
      font-weight: 900;
      color: rgba(255, 254, 141, 1);
      -webkit-text-stroke: 0.8px #821352;
      text-stroke: 0.8px #821352;
    }
  }
  .time {
    margin: 0.98rem auto 0;
    // background: url(../assets/img/timeDown.png);
    background-size: 100% 100%;
    display: flex;
    justify-content: space-between;
    padding: 0 0.53rem 0 0.42rem;
    > div {
      line-height: 0.6rem;
      display: inline-block;
      display: flex;
      strong {
        display: block;
        width: 0.9rem;
        height: 0.9rem;
        line-height: 0.9rem;
        text-align: center;
        color: #d72a65;
        font-size: 0.66rem;
        background: #ffe7b8;
        border-radius: 0.12rem;
        font-weight: bold;
        // font-family: Microsoft YaHei;
      }
      em {
        color: #9f3219;
        font-size: 0.24rem;
        margin: 0.35rem 0 0 0.25rem;
      }
    }
  }
}
</style>
