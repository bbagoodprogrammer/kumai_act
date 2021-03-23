<template>
  <div class="toastBox" v-show="toastObj.toast">
    <transition name="slide">
      <div class="promptBox" v-show="toastObj.toast">
        <i class="close" @click="close()"></i>
        <div class="title">{{toastObj.toastTitle}}</div>
        <p v-html="toastObj.toastMsg"></p>
        <div class="ok" @click="close()">
          {{lang.ok}}
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  props: ["msg"],
  computed: {
    ...mapState(['toastObj'])
  },
  methods: {
    close() {
      this.vxc('closeToast')
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
  width: 7.02rem;
  height: 5rem;
  background: url(../assets/img/commonPup.png);
  background-size: 100% 100%;
  position: relative;
  padding-top: 0.79rem;
  .title {
    height: 1.2rem;
    line-height: 1.4rem;
    text-align: center;
    font-size: 0.32rem;
    color: rgba(252, 245, 193, 1);
    padding: 0 1rem;
  }
  p {
    text-align: center;
    height: 1.6rem;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 1rem;
    font-size: 0.28rem;
    line-height: 0.5rem;
  }
  .close {
    display: block;
    width: 0.65rem;
    height: 0.65rem;
    position: absolute;
    top: -0.5rem;
    right: 0.22rem;
    background: url(../assets/img/close.png);
    background-size: 100% 100%;
  }
  .ok {
    display: block;
    width: 3.76rem;
    height: 0.8rem;
    margin: 0.12rem auto;
    background: url(../assets/img/box/okBtn.png);
    background-size: 100% 100%;
    text-align: center;
    line-height: 0.8rem;
    color: rgba(126, 26, 6, 1);
    font-size: 0.32rem;
  }
}
</style>
