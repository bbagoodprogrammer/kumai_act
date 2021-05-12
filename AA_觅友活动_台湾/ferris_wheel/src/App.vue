<template>
  <div id="app">
    <router-view class="appView" :style="{minHeight:viewHeight+'px'}"></router-view>
    <Loading v-show="loading" />
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Loading from './components/common/Loading';

export default {
  computed: {
    ...mapState(['loading']),
    viewHeight: () => window.innerHeight,
  },
  mounted () {
    // this.$store.dispatch('getInitInfo');
  },
  components: {
    Loading,
  },
};
</script>