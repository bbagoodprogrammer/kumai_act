<template>
  <div class="toastBox">
    <div class="promptBox">
      <i class="close" @click="close()"></i>
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
  transform: translate(-50%, -50%);
  width: 6.1rem;
  height: 4.51rem;
  background: rgba(255, 255, 255, 1);
  border-radius: 0.4rem;
  display: flex;
  align-items: center;
  justify-content: center;
  .close {
    display: block;
    width: 0.21rem;
    height: 0.2rem;
    background: url(../assets/img/close.png);
    background-size: 100% 100%;
    position: absolute;
    right: 0.28rem;
    top: 0.28rem;
  }
  p {
    font-size: 0.42rem;
    color: #9a3600;
    font-weight: 500;
    text-align: center;
    padding: 0 0.35rem;
  }
}
</style>
