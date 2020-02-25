<template>
  <div class="toastBox">
    <div class="promptBox">
      <i class="close" @click="close()"></i>
      <p v-html="msg"></p>
      <div class="ok">
        <a href="javascript:;" @click="close()">確定</a>
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
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  z-index: 100;
  width: 4.18rem;
  padding: 0.92rem 0.46rem 0.54rem;
  background: rgba(245, 240, 236, 1);
  border: 0.04rem solid rgba(247, 177, 155, 1);
  border-radius: 0.6rem;
  .close {
    display: block;
    width: 0.53rem;
    height: 0.53rem;
    background: url(../assets/img/close.png);
    background-size: 100% 100%;
    position: absolute;
    right: 0rem;
    top: -0.7rem;
  }
  p {
    font-size: 85%;
    color: #833700;
  }
  .ok {
    white-space: nowrap;
    padding: 10px 30px;
    text-align: center;
    a {
      display: inline-block;
      width: auto;
      height: 0.64rem;
      line-height: 0.64rem;
      min-width: 90px;
      outline: none;
      border-image: linear-gradient(
          182deg,
          rgba(255, 235, 70, 1),
          rgba(255, 156, 60, 1)
        )
        10 10;
      background: linear-gradient(
        0deg,
        rgba(252, 169, 49, 1) 0%,
        rgba(253, 232, 40, 1) 100%
      );
      border-radius: 0.3rem;
      color: #833700;
      font-weight: bold;
      text-decoration: none;
      margin-top: 0.4rem;
    }
  }
}
</style>
