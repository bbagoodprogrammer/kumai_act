<template>
  <div class="toastBox">
    <div class="promptBox">
      <div class="title"></div>
      <i class="close" @click="close()"></i>
      <p v-html="msg"></p>
      <div class="ok">
        <a href="javascript:;" @click="close()">{{lang.ok}}</a>
      </div>
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
  z-index: 1000;
}
.promptBox {
  width: 6.21rem;
  height: 5.48rem;
  background: url(../assets/img/pup1.png);
  background-size: 100% 100%;
  position: absolute;
  left: 0.69rem;
  top: 4.2rem;
  .title {
    width: 5.49rem;
    height: 2.07rem;
    background: url(../assets/img/pupTitle.png);
    background-size: 100% 100%;
    position: absolute;
    left: 0.36rem;
    top: -2.07rem;
  }
  .close {
    display: block;
    width: 0.8rem;
    height: 0.8rem;
    background: url(../assets/img/close.png);
    background-size: 100% 100%;
    position: absolute;
    right: 0;
    top: -1rem;
  }
  p {
    height: 3.5rem;
    margin-top: 0.35rem;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.36rem;
    font-weight: bold;
    text-align: center;
    padding: 0 0.3rem;
  }
  .ok {
    a {
      display: block;
      width: 2.43rem;
      height: 0.8rem;
      background: url(../assets/img/goVip.png);
      background-size: 100% 100%;
      text-align: center;
      line-height: 0.8rem;
      color: #ae4800;
      font-weight: bold;
      font-size: 0.36rem;
      margin: 0 auto;
    }
  }
}
</style>
