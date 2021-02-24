<template>
  <div class="page pageIndex">
    <div class="header"></div>
    <TrunMsg />
    <div class="shareBar" v-if="isShare">
      <div class="bar" @click="downApp()"></div>
    </div>
    <ListGrounp />
    <!-- <ActFooter /> -->
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { getUrlString } from '../utils'
import APP from "../utils/openApp"
import ActFooter from "./ActFooter"
import TrunMsg from "./TrunMsg"
import ListGrounp from "./ListGrounp"

export default {
  components: { ActFooter, TrunMsg, ListGrounp },
  data() {
    return {
      isShare: false
    }
  },
  created() {
    this.judgeShare()
    this.init()
  },
  computed: {

  },
  methods: {
    init() {
      setTimeout(() => {
        this.vxc('setNotice', [
          {
            nick: '111',
            name: 'xxxxx'
          },
          {
            nick: '111222',
            name: 'xxxxx'
          }
        ])
      }, 1000)

    },
    judgeShare() {//判断是否为分享环境,请求相应的接口 
      this.isShare = getUrlString('token') ? false : true
      this.vxc('setShareState', this.isShare) //分享状态
    },
    downApp() {
      APP()
    },
  },
}
</script>

<style lang="scss">
.pageIndex {
  // background: url();
  .header {
    height: 10.32rem;
  }
}
</style>