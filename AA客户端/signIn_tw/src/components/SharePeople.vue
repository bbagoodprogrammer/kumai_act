<template>
  <div class="sharePeople">
    <div class="time" v-if="!surplusTime.end && surplusTime.seconds >0">助力倒計時 {{surplusTime.hour}}:{{surplusTime.minute}}:{{surplusTime.second}}</div>
    <div class="time" v-else>請明天再試</div>
    <div class="peopleList">
      <span v-for="(item,index) in list" :key="index">
        <img v-lazy="item.headImg" alt="" @click="goUser(item.uid)">
        <strong :class="{act:item.headImg!=''}">{{item.nick}}</strong>
      </span>
      <span v-for="item2 in 3-list.length" :key="item2+'d'">
        <img src="../assets/img/shareBtn.png" alt="">
        <strong>待邀請</strong>
      </span>
    </div>
  </div>
</template>
<script>
import downTime from "../utils/downTime"
export default {
  props: ['type', 'list', 'leftTime'],
  data() {
    return {
      surplusTime: {},
    }
  },
  watch: {
    leftTime(val) {
      if (val > 0) {
        this.timeGo(val)
      }

    }
  },
  methods: {
    goUser(uid) {
      location.href = `uid:${uid}`
    },
    timeGo(val) {
      downTime('time1', val);
      this.surplusTime = downTime('time1');
      this.timer = setInterval(() => {
        this.surplusTime = downTime('time1');
        if (this.surplusTime.end) {
          console.log(this.surplusTime)
          clearInterval(this.timer)
        }
      }, 1000)
    }
  }
}
</script>
<style lang="scss">
.sharePeople {
  width: 6.92rem;
  height: 3.16rem;
  background: rgba(255, 255, 255, 1);
  border-radius: 0.12rem;
  margin: 0 auto;
  .time {
    height: 1.02rem;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.26rem;
    color: #666666;
  }
  .peopleList {
    padding: 0 1.32rem;
    display: flex;
    span {
      flex: 1;
      img {
        display: block;
        width: 1.1rem;
        height: 1.1rem;
        border-radius: 50%;
        margin: 0 auto;
      }
      strong {
        display: block;
        font-size: 0.26rem;
        color: #999999;
        text-align: center;
        margin-top: 0.12rem;
        max-width: 1.4rem;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        &.act {
          color: #111111;
        }
      }
    }
  }
}
</style>
