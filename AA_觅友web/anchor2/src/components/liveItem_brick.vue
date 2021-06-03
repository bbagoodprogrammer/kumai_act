<template>
  <div class="rankItem_box">
    <div class="rankItem">
      <div class="user">
        <img v-lazy="info.avatar" alt="">
        <div class="userMsg">
          <div class="nick">{{info.nick}}</div>
          <div class="uid">ID {{info.uid}}</div>
        </div>
      </div>
      <div class="score">
        {{info.pinkJewel}}
      </div>
      <div class="time">
        {{info.opTime}}
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
  > div {
    // flex: 1;
    text-align: center;
    font-size: 0.24rem;
    color: rgba(153, 153, 153, 1);
  }
  .user {
    width: 2.8rem;
    display: flex;
    align-items: center;
    img {
      width: 0.88rem;
      height: 0.88rem;
      border-radius: 50%;
      margin: 0 0.1rem 0 0.3rem;
    }
  }

  .userMsg {
    width: 1.5rem;
    .nick {
      text-align: left;
      font-size: 0.28rem;
      color: #fff;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    .uid {
      text-align: left;
      margin-top: 0.05rem;
      font-size: 0.24rem;
      color: rgba(153, 153, 153, 1);
    }
  }
  .score {
    width: 1.3rem;
    font-size: 0.24rem;
    color: rgba(153, 153, 153, 1);
    text-align: center;
  }
  .time {
    flex: 1;
  }
}
</style>