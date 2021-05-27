<template>
  <div class="rankItem_box">
    <div class="rankItem">
      <span>
        <strong>
          <img :src="info.avatar" alt="">
        </strong>
        <strong>
          <em>{{info.nick}}</em>
          <i>ID {{info.uid}}</i>
        </strong>
      </span>
      <span>{{info.coins}}</span>
      <span>{{info.validDay}}</span>
      <span>{{getHour(info.validMicTime)}}h</span>
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
  // padding: .3rem 0;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  line-height: 1;
  span {
    display: inline-block;
    vertical-align: middle;
  }
  span:nth-of-type(1) {
    width: 2.6rem;
    font-size: 0;
    display: flex;
    align-items: center;
    box-sizing: border-box;
    padding-left: 0.26rem;
    strong:nth-of-type(1) {
      width: 0.88rem;
      height: 0.88rem;
      margin-right: 0.07rem;
      img {
        width: 0.88rem;
        height: 0.88rem;
        border-radius: 50%;
      }
    }
    strong:nth-of-type(2) {
      em,
      i {
        display: block;
      }
      em {
        font-size: 0.28rem;
        line-height: 0.3rem;
        color: #FFFFFF;
        margin-bottom: 0.05rem;
        width: 1.54rem;
        max-width: 1.54rem;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
      }
      i {
        font-size: 0.24rem;
        line-height: 0.33rem;
        color: #999999;
      }
    }
  }
  span:nth-of-type(2) {
    width: 1.7rem;
    font-size: 0.28rem;
    line-height: 0.7rem;
    color: #FFDD00;
    -webkit-text-stroke: 1 rgba(0, 0, 0, 0);
    text-stroke: 1 rgba(0, 0, 0, 0);
    text-align: center;
  }
  span:nth-of-type(3) {
    width: 1.3rem;
    font-size: 0.24rem;
    line-height: 0.3rem;
    color: #999999;
    opacity: 1;
    text-align: center;
  }
  span:nth-of-type(4) {
    width: 1.3rem;
    font-size: 0.24rem;
    line-height: 0.3rem;
    color: #999999;
    opacity: 1;
    text-align: center;
  }
}
</style>