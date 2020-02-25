<template>
  <div class="footerBar">
    <div class="acrStatus">
      <span class="noAct" v-if="astState === 0">活動未開始</span>
      <span class="noAct" v-if="astState === 2">活動已結束</span>
      <span class="goAct" v-if="astState === 1" @click="goActState()">نشاطي>></span>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import getString from "../utils/getString"
export default {
  computed: {
    ...mapState(['actStatus', "isShare"]),
    astState() {
      if (this.actStatus === 0) { //活动未开始
        return 0
      } else if (this.actStatus === 2) { //活动已结束
        return 2
      } else if (this.actStatus === 1 || this.isShare) { //活动开始未报名，或者分享
        return 1
      }
    }
  },
  methods: {
    goActState() {
      let regstr = getString('token')
      location.href = `./index3.html?token=${regstr}`
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
    height: 0.87rem;
    padding-top: 0.1rem;
    margin: auto;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 80%;
    background: url(../assets/img/footerBg.png) no-repeat;
    background-size: 100% 100%;
    .goAct {
      font-size: 120%;
      font-weight: bold;
    }
  }
}
</style>
