<template>
  <div class="page pageIndex">
    <div class="shareBar" v-if="isShare">
      <div class="bar" @click="downApp()"></div>
    </div>
    <div class="header">
      <Tree />
      <Integral />
    </div>
    <TabsScrollLoadList ref="scorll" />
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { getUrlString } from '../utils'
import APP from "../utils/openApp"
import TabsScrollLoadList from "./TabsScrollLoadList"
import { init } from "../apis"
import Tree from "./Tree"
import Integral from "./Integral"

export default {
  components: { TabsScrollLoadList, Tree, Integral },
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
      init().then(res => {
        console.log(res)
        const { c_day, days, step, stime, etime, schule, score } = res.data.response_data
        this.vxc('setSchule', schule)
        this.vxc('setStep', step)
        this.vxc('setScore', score)
      })
    },
    judgeShare() {//判断是否为分享环境,请求相应的接口 
      this.isShare = getUrlString('token') ? false : true
      console.log(this.isShare)
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
  background: #ff7784 url(../img/banner.png) no-repeat;
  background-size: 100% auto;
  .header {
    height: 7.97rem;
    padding-top: 4.43rem;
  }
}
</style>