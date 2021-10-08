<template>
  <div class="page pageIndex">
    <Rule />
  </div>
</template>

<script>

import Rule from "./Rule"
export default {
  components: { Rule }
}
</script>

<style lang="scss">
.pageIndex {
  height: 9.18rem;
  background: url(../img/bg.png) no-repeat;
  background-size: 100% auto;
  padding-top: 0.13rem;

  img {
    display: block;
    width: 100%;
  }
}
</style>