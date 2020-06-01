<template>
  <div class="toastBox">
    <div class="promptBox">
      <p v-html="msg"></p>
      <div class="ok">
        <a href="javascript:;" @click="close()">{{lang.query}}</a>
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
  // background: rgba(0, 0, 0, 0.8);
  z-index: 10000;
}
.promptBox {
  position: fixed;
  left: 1.09rem;
  top: 2.5rem;
  width: 5.45rem;
  height: 6.37rem;
  background: url(../assets/img/carPup.png);
  background-size: 100% 100%;
  p {
    width: 4.45rem;
    padding: 0 0.5rem;
    text-align: center;
    font-weight: 800;
    position: absolute;
    top: 3.5rem;
  }
  .ok {
    white-space: nowrap;
    text-align: center;
    position: absolute;
    bottom: 0.5rem;
    left: 1.51rem;
    a {
      display: block;
      width: 2.42rem;
      height: 0.8rem;
      line-height: 0.78rem;
      font-weight: 700;
      color: #fffbed;
      background: url(../assets/img/openBtn.png);
      background-size: 100% 100%;
    }
  }
}
</style>
