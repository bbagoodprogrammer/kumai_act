<template>
  <div id="app">
    <!--  style="overflow: hidden" -->
    <router-view class="appView" :style="{minHeight:viewHeight+'px',maxHeight:viewHeight+'px'}"></router-view>
    <Loading v-show="loading" />
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Loading from './components/common/Loading';
import 'vant/lib/index.css';
import { getAppVer, getPlatform } from './utils';
import { getStatusBarHeight } from './utils/navigation';
export default {
  data () {
    return {
      navigatorHeight: 0
    }
  },
  computed: {
    ...mapState(['loading']),
    viewHeight () {
      return window.innerHeight + this.navigatorHeight
    }
  },
  mounted () {
    // this.$store.dispatch('getInitInfo');
    const pt = getPlatform();
    const ver = getAppVer();
    if ((pt == 'ios' && ver >= 165) || pt == 'android') {
      this.navigatorHeight = getStatusBarHeight()
    }
  },
  components: {
    Loading,
  },
};
</script>