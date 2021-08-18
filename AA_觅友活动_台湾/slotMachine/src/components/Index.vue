<template>
  <div class="page pageIndex">
    <Machine />

  </div>
</template>

<script>

import Machine from "./Machine"

export default {
  components: { Machine }
}
</script>

<style lang="scss">
.pageIndex {
  img {
    position: relative;
    display: block;
    width: 100%;
  }
}
</style>