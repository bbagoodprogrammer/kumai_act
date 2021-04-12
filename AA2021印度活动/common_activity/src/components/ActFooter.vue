<template>
  <div class="footerBar" v-if="astState != 3">
    <div class="acrStatus">
      <span class="noAct" v-if="astState === 0">{{lang.noAct}}</span>
      <span class="noAct" v-if="astState === 2">{{lang.actEd}}</span>
      <span class="goAct" v-if="astState === 1" @click="singUp()">{{lang.singUp}}</span>
    </div>
    <div class="mask" v-show="showT">
      <transition name="slide">
        <msg-toast :msg="tastMsg" @closeToast="closeToast()" v-show="showT"></msg-toast>
      </transition>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import api from "../apis/apiConfig"
import { globalBus } from '../utils/eventBus'
import MsgToast from "../components/commonToast"
export default {
  components: { MsgToast },
  data () {
    return {
      showT: false,
      tastMsg: ''
    }
  },
  computed: {
    ...mapState(['actStatus', 'user_info', 'isShare']),
    astState () {
      if (this.actStatus === 0) { //活动未开始
        return 0
      } else if (this.actStatus === 2) { //活动已结束
        return 2
      } else if (!this.user_info.registered || this.isShare) { //活动开始未报名，或者分享
        return 1
      } else if (this.user_info.registered) { //活动开始已报名
        return 3
      }
    }
  },
  methods: {
    singUp () {
      console.log('xxx')
      globalBus.$emit('commonEvent', () => {
        api.singUp().then(res => {
          if (res.data.response_status.code == 0) {
            this.tastMsg = this.lang.singUpSuc
            this.showT = true
          } else {
            this.tastMsg = res.data.response_status.error
            this.showT = true
          }
        })
      })
    },
    closeToast () {
      this.showT = false
      this.$parent.refrsh('sing')
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
  z-index: 100;
  .acrStatus {
    width: 7.5rem;
    height: 1.26rem;
    margin: auto;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    background: url(../img/footer.png) no-repeat;
    background-size: 100% 100%;
    span {
      display: inline-block;
      font-weight: 700;
    }
    .goAct {
      width: 3.66rem;
      height: 0.9rem;
      background: url(../img/singUpBg.png);
      background-size: 100% 100%;
      text-align: center;
      line-height: 0.9rem;
      font-size: 0.36rem;
    }
  }
}
</style>
