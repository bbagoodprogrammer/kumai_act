<template>
  <div class="toastBox">
    <div class="promptBox">
      <a href="" class="close" @click="close()"></a>
      <p v-html="msg"></p>
      <!-- <div class="ok">
        <a href="javascript:;" @click="close()">確認</a>
      </div> -->
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
  display: flex;
  align-items: center;
  justify-content: center;
}
.promptBox {
  width: 6.1rem;
  height: 4.51rem;
  background: rgba(255, 255, 255, 1);
  border-radius: 0.4rem;
  position: relative;
  display: flex;
  align-items: center;
  .close {
    display: block;
    width: 0.21rem;
    height: 0.2rem;
    background: url(../assets/img/close.png);
    background-size: 100% 100%;
    position: absolute;
    top: 0.28rem;
    right: 0.28rem;
  }
  p {
    width: 5.6rem;
    font-size: 0.42rem;
    font-weight: 600;
    color: #9a3600;
    padding: 0 0.3rem;
    text-align: center;
  }
}
</style>
