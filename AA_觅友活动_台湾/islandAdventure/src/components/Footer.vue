<template>
  <div class="footer">
    <span v-if="actStatus == 1" class="btnBg">{{lang.notStart}}</span>
    <span v-if="actStatus == 2" class="btnBg">{{lang.actEnd}}</span>
    <div class="userMsg" v-if="actStatus == 3">
      <div class="rank">{{showMsg.rank}}</div>
      <img :src="showMsg.avatar" alt="">
      <div class="nick">{{showMsg.nick}}</div>
      <div class="score">
        <span class="tips">島主積分</span>
        <span class="nums">{{showMsg.score}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex"
import { singUp } from "../apis"

export default {
  computed: {
    ...mapState(['owner', 'activity', 'rank', 'showType', 'totleOwner']),
    actStatus () {
      if (this.activity.activity_status == 0) {
        return 1
      } else if (this.activity.activity_status == 2) {
        return 2
      } else {
        return 3
      }
    },
    showMsg () {
      return this.showType == 1 ? this.owner : this.totleOwner
    }
  },
}
</script>

<style lang="scss">
.footer {
  width: 7.5rem;
  height: 1.42rem;
  padding-top: 0.3rem;
  background: url(../img/footer.png);
  background-size: 100% 100%;
  position: fixed;
  bottom: 0;
  z-index: 111;
  .userMsg {
    height: 1.48rem;
    display: flex;
    align-items: center;
    .rank {
      width: 1.07rem;
      text-align: center;
      font-size: 0.36rem;
      color: #fff;
    }
    img {
      width: 1.07rem;
      height: 1.07rem;
      border: 0.02rem solid #7D3F0A;
      border-radius: 50%;
    }
    .nick {
      width: 2.6rem;
      color: #fff;
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
          color: #DFFF5E;
        }
        &.nums {
          color: #fff;
        }
      }
    }
  }
}
</style>