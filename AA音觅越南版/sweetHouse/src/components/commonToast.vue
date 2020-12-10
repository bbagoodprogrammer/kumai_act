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
  width: 5.32rem;
  height: 2.89rem;
  background: url(../assets/img/singUpSuc.png);
  background-size: 100% 100%;
  position: relative;
  .close {
    display: block;
    width: 0.36rem;
    height: 0.37rem;
    background: url(../assets/img/close.png);
    background-size: 100% 100%;
    position: absolute;
    right: 0.35rem;
    top: 0.3rem;
  }
  .title {
    height: 1rem;
    line-height: 1rem;
    text-align: center;
    font-size: 0.4rem;
    color: rgba(215, 55, 17, 1);
    font-weight: bold;
  }
  > p {
    font-size: 0.24rem;
    color: rgba(233, 140, 86, 1);
    text-align: center;
    height: 1rem;
  }
  .ok {
    width: 5.07rem;
    height: 0.75rem;
    // background: url(../assets/img/singUpSucBtn.png);
    // background-size: 100% 100%;
    margin: 0 auto;
    text-align: center;
    line-height: 0.75rem;
  }
}
</style>
