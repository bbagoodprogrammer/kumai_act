<template>
  <div id="app">
    <keep-alive>
      <router-view class="appView" :style="{minHeight:viewHeight+'px'}"></router-view>
    </keep-alive>
    <Loading v-show="loading" />
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Loading from './components/common/Loading';
import { setTimeout } from 'timers';

export default {
  computed: {
    ...mapState(['loading']),
    viewHeight: () => window.innerHeight,
  },
  mounted() {
    this.$store.dispatch('getInitInfo');
  },
  components: {
    Loading,
  },
};
</script>

<style lang="scss">
#app {
  background: RGBA(243, 191, 129, 1);
}
</style>