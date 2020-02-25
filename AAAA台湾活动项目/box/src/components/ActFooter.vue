<template>
  <div class="footerBar">
    <div class="acrStatus">
      <span class="noAct" v-if="astState === 0">活動未開始</span>
      <span class="noAct" v-if="astState === 2">活動已結束</span>
      <span class="goAct" v-if="astState === 1" @click="singUp()"></span>
      <span class="actIng" v-if="astState === 3"></span>
      <span class="acted" v-if="astState === 4"></span>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState(['actStatus', 'registered', "isShare"]),
    astState() {
      if (this.actStatus === 0) { //活动未开始
        return 0
      } else if (this.actStatus === 2) { //活动已结束
        return 2
      } else if ((this.actStatus === 1 && !this.registered) || this.isShare) { //活动开始未报名，或者分享
        return 1
      } else if (this.actStatus === 1 && this.registered) { //活动开始已报名
        return 3
      }
    }
  }
}
</script>
<style lang="scss">
.footerBar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  .acrStatus {
    width: 7.5rem;
    height: 1.75rem;
    margin: auto;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    // background: url() no-repeat;
    // background-size: contain;
    span {
      display: inline-block;
    }
  }
}
</style>
