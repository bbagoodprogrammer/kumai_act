<template>
  <div class="page pageIndex">
    <div class="header">

    </div>
    <div class="con">

    </div>
  </div>
</template>

<script>

import Star from "./Star"
export default {
  components: {
    Star
  }
}
</script>

<style lang="scss">
.pageIndex {
  .header {
    position: relative;
    z-index: 2;
  }
  .con {
    position: relative;
    width: 7.5rem;
    height: 20.78rem;
    background: url(../img/starBg.png);
    background-size: 100% 100%;
    margin-top: -1.75rem;
  }
  img {
    display: block;
    width: 100%;
  }
}
</style>