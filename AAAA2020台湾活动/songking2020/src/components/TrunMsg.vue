<template>
  <div class="trunbg" v-show="notice.length">
    <i class="horn"></i>
    <div class="trunMsg">
      <p class="msgItem" v-for="(item,index) in notice" :key="index" v-if="index == msgIndex">
        UID:{{item.uid}} <em class="nick"> {{item.nick}}</em>收到{{item.count}}個 <i class="giftIcon"> </i> 禮物
      </p>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import { setTimeout } from 'timers';
export default {
  data() {
    return {
      msgIndex: 0,
      timer: null
    }
  },
  watch: {
    notice(val) {
      if (val.length > 0 && this.timer == null) {
        this.msgGo()
      }
    }
  },
  computed: {
    ...mapState(['notice']),
  },
  mounted() {
    // this.msgGo()
  },
  methods: {
    msgGo() {
      if (this.notice.length == 1) {
        this.timer = setInterval(() => {
          this.msgIndex = null
          setTimeout(() => {
            this.msgIndex = 0
          }, 0)
        }, 5000);
      } else {
        this.timer = setInterval(() => {
          if (this.msgIndex == this.notice.length - 1) {
            this.msgIndex = 0
          } else {
            this.msgIndex++
          }
        }, 5000);
      }

    }
  }
}
</script>
<style lang="scss">
.trunbg {
  width: 7.2rem;
  height: 0.64rem;
  margin: 0.4rem auto 0;
  background: url(../assets/img/turnMsgBg.png);
  background-size: 100% 100%;
  display: flex;
  align-items: center;
  .horn {
    display: block;
    width: 0.26rem;
    height: 0.24rem;
    margin: 0 0.15rem 0 1.27rem;
    background: url(../assets/img/laba.png);
    background-size: 100% 100%;
  }
  .trunMsg {
    width: 5.26rem;
    height: 0.64rem;
    position: relative;
    overflow: hidden;
    .msgItem {
      height: 100%;
      font-size: 0.24rem;
      display: flex;
      align-items: center;
      position: absolute;
      left: 100%;
      white-space: nowrap;
      animation: trun linear 5s;
      color: rgba(252, 245, 193, 1);
      .nick {
        max-width: 1.5rem;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        font-size: 0.24rem;
        margin-left: 0.15rem;
      }
      .giftIcon {
        width: 0.48rem;
        height: 0.48rem;
        background: url(../assets/img/giftIcon.png);
        background-size: 100% 100%;
      }
    }
  }
}

@keyframes trun {
  // 0% {
  //   left: -8rem;
  // }
  // 80% {
  //   // top: 0;
  //   left: 5.3rem;
  //   // opacity: 1;
  // }
  100% {
    // top: -0.5rem;
    left: -100%;
    // opacity: 0;
  }
}
</style>
