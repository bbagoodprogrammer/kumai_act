<template>
  <div class="page pageIndex">
    <div class="shareBar" v-if="isShare">
      <div class="bar" @click="downApp()"></div>
    </div>
    <div class="header">

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


export default {
  components: { TabsScrollLoadList },
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
        const { c_day, days, step, stime, etime, schule } = res.data.response_data
        this.vxc('setSchule', schule)
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
  background: #ff7784;
  .header {
    height: 12.4rem;
  }
}
</style>