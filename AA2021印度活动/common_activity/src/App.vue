<template>
  <div id="app">
    <router-view class="appView" :style="{minHeight:viewHeight+'px'}"></router-view>
    <Loading v-show="loading" />
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Loading from './components/common/Loading';
import { globalBus } from './utils/eventBus'
export default {
  computed: {
    ...mapState(['loading']),
    viewHeight: () => window.innerHeight,
  },
  created () {
    // globalBus.$on('commonEvent', (callback) => {
    //   if (this.isShare) {
    //     APP()
    //     return
    //   } else if (this.actStatus === 0) {
    //     this.tastMsg = this.lang.noAct
    //     this.showT = true
    //   } else if (this.actStatus === 2) {
    //     this.tastMsg = this.lang.actEd
    //     this.showT = true
    //   } else {
    //     callback()
    //   }
    // })
  },
  mounted () {
    // this.$store.dispatch('getInitInfo');
  },
  components: {
    Loading,
  },
};
</script>

<style lang="scss" scoped>
</style>