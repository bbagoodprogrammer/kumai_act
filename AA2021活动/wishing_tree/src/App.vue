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
import APP from './utils/openApp'

export default {
  created() {
    globalBus.$on('commonEvent', (callback) => {
      if (this.isShare) {
        APP()
        return
      } else if (this.step === 0) {
        this.toast(this.lang.noAct)
      } else if (this.step === 2) {
        this.toast(this.lang.actEd)
      } else {
        callback()
      }
    })

  },
  computed: {
    ...mapState(['loading', 'step', 'isShare']),
    viewHeight: () => window.innerHeight,
  },
  mounted() {
    // this.$store.dispatch('getInitInfo');
  },
  components: {
    Loading,
  },
};
</script>