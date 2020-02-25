<template>
  <div class="toastBox">
    <div class="promptBox">
      <span @click="close()" class="close"></span>
      <p v-html="msg"></p>
    </div>

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
  position: fixed;
  left: 50%;
  top: 50%;
  width: 5.49rem;
  height: 2.56rem;
  background: rgba(234, 71, 78, 1);
  border: 0.04rem solid rgba(255, 196, 130, 1);
  border-radius: 0.4rem;
  transform: translate(-50%, -50%);
  display: flex;
  align-items: center;
  justify-content: center;
  p {
    font-size: 120%;
    color: #ffefd7;
    padding: 0 0.5rem;
  }
  .close {
    display: block;
    width: 0.5rem;
    height: 0.5rem;
    background: url(../assets/img/close.png);
    background-size: 100% 100%;
    position: absolute;
    right: 0;
    top: -0.9rem;
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
      background-color: #795aac;
      color: #fff;
      text-decoration: none;
      padding: 4px 12px;
      border-radius: 4px;
      font-size: 14px;
    }
  }
}
</style>
