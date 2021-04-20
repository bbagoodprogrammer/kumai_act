<template>
  <div id="app">
    <keep-alive>
      <router-view class="appView" :style="{minHeight:viewHeight+'px'}" v-if="$route.meta.keep_alive"></router-view>
    </keep-alive>
    <router-view class="appView" :style="{minHeight:viewHeight+'px'}" v-if="!$route.meta.keep_alive"></router-view>
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