<template>
  <div class="bgBox">
    <div class="bgTop"></div>
    <div class="bgBtn"></div>
    <act-cont-top></act-cont-top>
    <point-bottom></point-bottom>
  </div>
</template>
<script>

import PointBottom from '../components/PointBottom'
import ActContTop from '../components/ActContTop'
export default {
  components: { PointBottom, ActContTop }
}
</script>
<style lang="scss">
.bgBox {
  position: relative;
  height: 14rem;
  background: #0f221f;
}
.bgTop {
  position: absolute;
  margin-top: -0.02rem;
  width: 100%;
  top: 0;
  height: 6.93rem;
  background: url(../assets/img/bgTop.png);
  background-size: 100% 100%;
}
.bgBtn {
  width: 100%;
  top: 6.93rem;
  margin-top: -0.05rem;
  position: absolute;
  height: 7.07rem;
  background: url(../assets/img/bgBtn.png);
  background-size: contain;
}
</style>
