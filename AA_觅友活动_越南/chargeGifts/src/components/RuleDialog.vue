<template>
  <div @touchmove.prevent class="common__dialog">
    <div class="common__screen__container" @click="handleCloseDialog"></div>
    <div class="common__container">
      <slot></slot>
      <img src="../assets/images/close.png" @click="handleCloseDialog" class="common__dialog_close__img" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Dialog',

  props: {
    visible: {
      type: Boolean,
      required: true
    }
  },

  methods: {
    handleCloseDialog () {
      this.$emit('update:visible', false)
    }
  }
}
</script>

<style lang="scss">
.common__dialog {
  width: 100%;
  height: 100%;
  .common__screen__container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: black;
    opacity: 0.7;
    z-index: 1000;
  }

  .common__container {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    z-index: 1000;
    opacity: 1;
    width:750px;
    height:636px;
    background: url('../assets/images/dialog_bg.png');
    background-size: 100% 100%;
    background-repeat: no-repeat;
    .common__dialog_close__img {
      width: 47px;
      height: 47px;
      position: absolute;
      top: -70px;
      right: 35px;
      z-index: 1000;
    }
  }
}
</style>