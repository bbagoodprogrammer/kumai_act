<template>
  <div class="footerBar">
    <div class="acrStatus">
      <span class="noAct" v-if="astState === 0">{{lang.noAct}}</span>
      <span class="noAct" v-if="astState === 2">{{lang.actEd}}</span>
      <div class="actIng" v-if="astState === 1">
        <span class="notice">打擂歌單預告>></span>
        <span class="Judges">做評委>> <em>1688人</em></span>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState(['actStatus', 'userMsg', "isShare"]),
    astState() {
      return 1
      if (this.actStatus === 0) { //活动未开始
        return 0
      } else if (this.actStatus === 2) { //活动已结束
        return 2
      } else if (!this.userMsg.registered || this.isShare) { //活动开始未报名，或者分享
        return 1
      } else if (this.userMsg.registered) { //活动开始已报名
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
    height: 1.26rem;
    margin: auto;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    background: url(../assets/img/footer.png);
    background-size: 100% 100%;
    span {
      display: inline-block;
    }
    .actIng {
      width: 100%;
      height: 100%;
      padding: 0 0.47rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      span {
        width: 2.83rem;
        height: 0.92rem;
        background: url(../assets/img/footerBtn.png);
        background-size: 100% 100%;
        text-align: center;
        color: rgba(174, 72, 0, 1);
        font-weight: bold;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        line-height: 0.3rem;
        em {
          font-weight: bold;
          display: block;
        }
      }
      .notice {
      }
    }
  }
}
</style>
