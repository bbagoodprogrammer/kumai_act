<template>
  <div id="app">
    <router-view class="appView" :style="{minHeight:viewHeight+'px'}"></router-view>
    <Loading v-show="loading" />
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { globalBus } from './utils/eventBus'
import Loading from './components/common/Loading';
import APP from './utils/openApp'
// import MsgToast from "../components/commonToast"
export default {
  computed: {
    viewHeight: () => window.innerHeight,
    ...mapState(['step', 'isShare', 'reg', 'loading'])
  },
  created () {
    globalBus.$on('commonEvent', (callback) => {
      if (this.isShare) {
        APP()
        return
      } else if (this.step === 0) {
        this.toast(this.lang.noAct)
      } else if (this.step === 2) {
        this.toast(this.lang.actEd)
      } else if (!this.reg) {
        this.toast(`您暫未報名活動，不能進行操作哦!`)
      } else {
        callback()
      }
    })
  },
  mounted () {
    // this.$store.dispatch('getInitInfo');
  },
  components: {
    Loading
  },
};
</script>