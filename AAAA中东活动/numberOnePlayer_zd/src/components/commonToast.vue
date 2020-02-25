<template>
  <div class="toastBox">
    <div class="promptBox">
      <span class="close" @click="close()"></span>
      <p v-html="msg"></p>
      <span class="ok" @click="close()">عرفت</span>
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
  width: 4.8rem;
  // height: 2.12rem;
  padding: 0.4rem 0 0.4rem 0;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: linear-gradient(0deg, rgba(211, 61, 59, 1), rgba(255, 94, 92, 1));
  border: 0.04rem solid rgba(255, 244, 137, 1), rgba(255, 249, 214, 1);
  border-radius: 0.4rem;
  .close {
    display: block;
    width: 0.42rem;
    height: 0.42rem;
    background: url(../assets/img/getGiftClose.png);
    background-size: 100% 100%;
    position: absolute;
    right: 0;
    top: -0.7rem;
  }
  p {
    text-align: center;
    color: #ffdab6;
    font-size: 80%;
    line-height: 0.6rem;
  }
  .ok {
    display: block;
    width: 2.33rem;
    height: 0.81rem;
    margin: 0.3rem auto 0;
    text-align: center;
    background: url(../assets/img/taskBgAct.png);
    background-size: 100% 100%;
    line-height: 0.81rem;
    font-size: 93%;
    color: #b98300;
  }
}
</style>
