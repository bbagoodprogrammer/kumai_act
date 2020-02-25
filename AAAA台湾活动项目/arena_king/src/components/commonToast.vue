<template>
  <div class="toastBox">
    <div class="promptBox">
      <p v-html="msg"></p>
      <div class="ok">
        <a href="javascript:;" @click="close()">確認</a>
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
  width: 5.34rem;
  height: 3.28rem;
  background: url(../assets/img/successPup.png);
  background-size: 100% 100%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  p {
    color: #fff;
    text-align: center;
    width: 5.34rem;
    position: absolute;
    top: 30%;
  }
  .ok {
    white-space: nowrap;
    padding: 10px 30px;
    text-align: center;
    position: absolute;
    left: 1rem;
    bottom: 0.3rem;
    a {
      display: inline-block;
      width: auto;
      min-width: 90px;
      margin-left: 0px;
      margin-top: 2px;
      outline: none;
      background-color: #ffd935;
      color: #fff;
      text-decoration: none;
      padding: 4px 12px;
      border-radius: 4px;
      font-size: 14px;
    }
  }
}
</style>
