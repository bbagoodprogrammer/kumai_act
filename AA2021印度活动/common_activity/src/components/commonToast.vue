<template>
  <div class="toastBox">
    <div class="promptBox">
      <i class="close" @click="close()"></i>
      <p v-html="msg"></p>
      <!-- <div class="ok">
        <a href="javascript:;" @click="close()">{{lang.ok}}</a>
      </div> -->
    </div>
  </div>

</template>

<script>
export default {
  props: ["msg"],
  data () {
    return {
    }
  },
  methods: {
    close () {
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
  z-index: 100;
}
.promptBox {
  width: 5.37rem;
  height: 3.72rem;
  background: url(../img/ruleBg.png);
  background-size: 100% 100%;
  position: absolute;
  left: 1.06rem;
  top: 4rem;
  p {
    width: 5.37rem;
    height: 3.72rem;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 600;
    color: #fffab1;
    font-size: 0.36rem;
  }
  .close {
    display: block;
    width: 1.03rem;
    height: 1.05rem;
    background: url(../img/close.png);
    background-size: 100% 100%;
    position: absolute;
    right: -0.25rem;
    top: -0.4rem;
  }
}
</style>
