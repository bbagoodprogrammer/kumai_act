<template>
  <div class="luckGiftBox" :style="{height:pupHeight+'px'}">
    <div class="herder">
      <i class="back" @click="closeGiftBox"></i> {{lang.luckBox_title}}<i class="close" @click="closeGiftBox"></i>
    </div>
    <LuckBoxList />
  </div>
</template>
<script>
import LuckBoxList from "./LuckBoxList"
export default {
  components: { LuckBoxList },
  created() {
    this.pupHeight = sessionStorage.getItem('pupHeight')
  },
  methods: {
    closeGiftBox() {
      this.$emit('closeGiftBox')
    }
  }
}
</script>
<style lang="scss">
.luckGiftBox {
  max-width: 750px;
  height: 9.74rem;
  // overflow-x: hidden;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  background: url(../img/bigBox.png) center 0 no-repeat;
  background-size: 100% 100%;
  .herder {
    height: 1rem;
    text-align: center;
    line-height: 1rem;
    font-size: 0.36rem;
    font-weight: 600;
    position: relative;
    border-bottom: 0.01rem solid #837cff;
    .back {
      display: block;
      width: 0.18rem;
      height: 0.3rem;
      background: url(../img/backArrow.png);
      background-size: 100% 100%;
      position: absolute;
      top: 0.35rem;
      left: 0.34rem;
    }
    .close {
      display: block;
      width: 0.37rem;
      height: 0.37rem;
      background: url(../img/close.png);
      background-size: 100% 100%;
      position: absolute;
      top: 0.35rem;
      right: 0.34rem;
    }
  }
}
</style>
