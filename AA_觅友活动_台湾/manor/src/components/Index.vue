<template>
  <div class="page pageIndex">
    <LandsBox />
  </div>
</template>

<script>

import LandsBox from "./LandsBox"
export default {
  components: { LandsBox }
}
</script>

<style lang="scss">
.pageIndex {
  background: url(../img/banner.png);
  background-size: 100% auto;
  img {
    display: block;
    width: 100%;
  }
}
</style>