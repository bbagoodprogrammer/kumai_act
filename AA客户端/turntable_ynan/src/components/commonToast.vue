<template>
  <!-- <div class="toastBox"> -->
  <div class="promptBox">
    <p v-html="msg"></p>
    <div class="ok">
      <a href="javascript:;" @click="close()">Xác nhận</a>
    </div>
    <!-- </div> -->

  </div>

</template>

<script>
export default {
  props: ["msg"],
  data() {
    return {
    }
  },
  methods: {
    close() {
      this.$emit('closeToast')
    }
  }
}
</script>

<style lang="scss">
.toastBox {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  z-index: 10000;
}
.promptBox {
  position: absolute;
  left: 1.15rem;
  top: 2.26rem;
  background-color: #7c41f1;
  text-align: center;
  border-radius: 0.2rem;
  z-index: 100;
  color: #000;
  width: 5.2rem;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.3);
  p {
    font-size: 0.24rem;
    color: #fff;
    padding: 10px 30px 5px;
  }
  .ok {
    white-space: nowrap;
    padding: 10px 30px;
    text-align: center;
    a {
      display: inline-block;
      width: auto;
      min-width: 90px;
      margin-left: 0px;
      margin-top: 2px;
      outline: none;
      background-color: #fef129;
      color: #7c41f1;
      text-decoration: none;
      padding: 4px 12px;
      border-radius: 4px;
      font-size: 14px;
    }
  }
}
</style>
