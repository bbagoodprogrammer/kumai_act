<template>
  <div id="app">
      <luck-wednesday></luck-wednesday>
  </div>
</template>

<script>
import LuckWednesday from './view/LuckWednesday.vue'
export default {
  name: 'App',
  components: {
    LuckWednesday
  }
}
</script>

<style lang="scss">
    @import './assets/scss/common.scss';
</style>

