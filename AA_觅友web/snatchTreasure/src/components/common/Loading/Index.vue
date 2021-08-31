<template>
  <div v-show="show" class="loading"></div>
</template>

<script>
export default {
  props: ['show'],
}
</script>

<style lang="scss">
.loading {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 100000;
  background: rgba(0, 0, 0, 0.4) url('./loading.gif') center center no-repeat;
  background-size: 0.7rem 0.38rem;
}
</style>