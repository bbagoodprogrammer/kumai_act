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
  width: 6.1rem;
  height: 5.2rem;
  background: url(../assets/img/giftBg1.png);
  background-size: 100% 100%;
  position: relative;
  .close {
    display: block;
    width: 0.42rem;
    height: 0.42rem;
    background: url(../assets/img/close.png);
    background-size: 100% 100%;
    position: absolute;
    right: 0;
    top: 0;
  }
  .title {
    height: 1.75rem;
    line-height: 2rem;
    text-align: center;
    font-size: 0.32rem;
  }
  p {
    text-align: center;
    color: rgba(255, 255, 255, 1);
    font-size: 0.26rem;
    line-height: 0.6rem;
  }
  .ok {
    width: 3.61rem;
    height: 1.14rem;
    background: url(../assets/img/ok.png);
    background-size: 100% 100%;
    margin: 0.3rem auto 0;
  }
}
</style>
