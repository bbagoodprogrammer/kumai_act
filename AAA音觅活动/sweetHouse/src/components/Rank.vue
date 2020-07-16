<template>
  <div class="rank">
    <i class="close" @click="close()"></i>
  </div>
</template>
<script>
export default {
  methods: {
    close() {
      console.log('xxx')
      this.$parent.showRank = false
    }
  }
}
</script>
<style lang="scss">
.rank {
  width: 7.1rem;
  height: 11.32rem;
  background: url(../assets/img/rankBg.png);
  background-size: 100% 100%;
  position: relative;
  .close {
    display: block;
    width: 0.51rem;
    height: 0.51rem;
    background: url(../assets/img/close2.png);
    background-size: 100% 100%;
    position: absolute;
    right: 0.54rem;
    top: 1.08rem;
    z-index: 10;
  }
}
</style>
