<template>
  <div id="app">
    <router-view class="appView" :style="{minHeight:viewHeight+'px'}"></router-view>
    <Loading v-show="loading" />
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Loading from './components/common/Loading';
import { isSupportedTouch } from './utils';
export default {
  computed: {
    ...mapState(['loading']),
    viewHeight: () => window.innerHeight,
  },
  mounted () {
    document.addEventListener(isSupportedTouch ? 'touchend' : 'click', this.resetLandSteps);
    this.vxc('setLandInfo');
    //this.$store.dispatch('getInitInfo');
  },
  methods: {
    resetLandSteps () {
      console.log('ffff')
      this.$store.commit('resetLandSteps');
    },
  },

  components: {
    Loading,
  },
};
</script>