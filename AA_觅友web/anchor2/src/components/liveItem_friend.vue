<template>
  <div class="rankItem_box">
    <div class="rankItem">
      <img v-lazy="info.avatar" alt="" @click="goUser(info.uid)">
      <div class="userMsg">
        <div class="nick">{{info.nick}}</div>
        <div class="uid">ID {{info.uid}}</div>
      </div>
      <div class="score">
        {{info.pinkJewel}}
      </div>
    </div>
  </div>
</template>

<script>
// import mixin from '../utils/mixin';
import { getUrlString, getTimeObj } from '../utils';
export default {
  // mixins: [mixin],
  props: ['info', 'from'],
  computed: {
    star () {
      if (typeof this.info.cid != 'undefined') {
        // return zodiac[this.info.cid];
      }
    },
  },
  components: {
    // Avatar,
  },
  methods: {
    getAvatar (url) {
      return url ? url : require('../img/avatar.png');
    },
    appPro (id) {
      if (id) {
        location.href = "rid:" + id;
      }
    },
    getHour (seconds) {
      return (seconds / 60 / 60).toFixed(1);
    },
    getShowTime (ts) {
      return this.lang.live_time.replace('{0}', getTimeObj(ts).month).replace('{1}', getTimeObj(ts).day).replace('{2}', getTimeObj(ts).hour).replace('{3}', getTimeObj(ts).minute);
    },
    goUser (uid) {
      var isiOS = navigator.userAgent.match(/iPhone|iPod|ios|iPad/i);
      if (isiOS) {
        sendJsData('app://userInfo?uid=' + uid);
      } else {
        javascript: JSInterface.sendJsData('app://userInfo?uid=' + uid);
      }
    }
  },
}
</script>

<style lang="scss" scoped>
.rankItem {
  width: 6.9rem;
  height: 1.36rem;
  margin: 0 auto;
  display: flex;
  align-items: center;
  position: relative;
  img {
    width: 0.88rem;
    height: 0.88rem;
    border-radius: 50%;
    margin: 0 0.1rem 0 0.3rem;
  }
  .userMsg {
    width: 2.18rem;
    .nick {
      font-size: 0.28rem;
      color: #fff;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    .uid {
      margin-top: 0.08rem;
      font-size: 0.24rem;
      color: rgba(153, 153, 153, 1);
    }
  }
  .score {
    font-size: 0.24rem;
    color: rgba(153, 153, 153, 1);
    flex: 1;
    text-align: center;
  }
}
</style>