<template>
  <div id="app">
    <LandsBox />
  </div>
</template>

<script>
import LandsBox from './components/LandsBox';
import { isSupportedTouch } from './utils';

export default {
  mounted() {
    document.addEventListener(isSupportedTouch ? 'touchend' : 'click', this.resetLandSteps);
    this.$store.commit('setLandInfo');
  },
  methods: {
    resetLandSteps() {
      console.log('ffff')
      this.$store.commit('resetLandSteps');
    },
  },
  components: {
    LandsBox,
  },
}
</script>

<style lang="scss">
</style>