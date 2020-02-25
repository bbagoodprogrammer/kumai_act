<template>
  <div class="toastBox">
    <div class="promptBox">
      <p v-html="msg"></p>
      <div class="ok">
        <a href="javascript:;" @click="close()"></a>
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
  z-index: 10000;
}
.promptBox {
  position: fixed;
  width: 5.15rem;
  height: 2.76rem;
  display: flex;
  align-items: center;
  left: 50%;
  top: 35%;
  background: rgba(243, 114, 110, 1);
  border: 0.04rem solid rgba(247, 185, 169, 1);
  border-radius: 0.1rem;
  text-align: center;
  border-radius: 0.2rem;
  margin-left: -3.2rem;
  z-index: 100;
  color: #000;
  width: 6.4rem;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.3);
  p {
    font-size: 100%;
    color: #fff;
    width: 100%;
    text-align: center;
    padding: 0.1rem 0.3rem 0.05rem;
  }
  .ok {
    position: absolute;
    left: 50%;
    bottom: -1.5rem;
    transform: translate(-50%, 0);
    a {
      display: block;
      width: 0.71rem;
      height: 0.71rem;
      background: url(../assets/img/close.png);
      background-size: 100% 100%;
    }
  }
}
</style>
