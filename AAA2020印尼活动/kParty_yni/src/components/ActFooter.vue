<template>
  <div class="footerBar" v-if="astState!=-1">
    <div class="acrStatus">
      <span class="noAct" v-if="astState === 0">{{lang.noAct}}</span>
      <span class="noAct" v-if="astState === 2">{{lang.actEd}}</span>
      <span class="goAct" v-if="astState === 1" @click="singUp()">{{lang.creatAct}}</span>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import getString from "../utils/getString"
import { globalBus } from '../utils/eventBus'
export default {
  computed: {
    ...mapState(['actStatus', 'is_admin', "isShare"]),
    astState() {
      if (this.actStatus === 0) { //活动未开始
        return 0
      } else if (this.actStatus === 2) { //活动已结束
        return 2
      } else if (this.is_admin || this.isShare) { //活动开始未报名，或者分享
        return 1
      } else {
        return -1
      }
    }
  },
  methods: {
    singUp() {
      globalBus.$emit('commonEvent', () => {
        let regstr = getString('token')
        location.href = `./index2.html?token=${regstr}`
      })
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
    height: 1.3rem;
    margin: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    background: url(../assets/img/footer.png) no-repeat;
    background-size: 100% 100%;
    span {
      display: inline-block;
    }
    .noAct {
      font-size: 0.36rem;
      font-weight: 600;
    }
    .goAct {
      width: 3.97rem;
      height: 0.9rem;
      font-size: 0.32rem;
      background: url(../assets/img/commitBtn.png);
      background-size: 100% 100%;
      text-align: center;
      line-height: 0.9rem;
      margin: 0.5rem auto 0.53rem;
    }
  }
}
</style>
