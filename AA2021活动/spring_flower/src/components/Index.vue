<template>
  <div class="page pageIndex">
    <div class="shareBar" v-if="isShare">
      <div class="bar" @click="downApp()"></div>
    </div>
    <LandsBox />
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { getUrlString } from '../utils'
import APP from "../utils/openApp"
import LandsBox from './LandsBox';
import { isSupportedTouch } from '../utils';
export default {
  data () {
    return {
      isShare: false
    }
  },
  created () {
    this.judgeShare()
  },
  mounted () {
    document.addEventListener(isSupportedTouch ? 'touchend' : 'click', this.resetLandSteps);
    this.$store.commit('setLandInfo');
  },
  methods: {
    resetLandSteps () {
      console.log('ffff')
      this.$store.commit('resetLandSteps');
    },
    judgeShare () {//判断是否为分享环境,请求相应的接口 
      this.isShare = getUrlString('token') ? false : true
      this.vxc('setShareState', this.isShare) //分享状态
    },
    downApp () {
      APP()
    },

  },
  components: {
    LandsBox,
  },
}
</script>

<style lang="scss">
.pageIndex {
}
</style>