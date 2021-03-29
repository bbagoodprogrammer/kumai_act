<template>
  <div class="toastBox" v-show="toast">
    <transition name="slide">
      <div class="promptBox" v-show="toast">
        <i class="close" @click="close()"></i>
        <div class="title">{{toastTitle}}</div>
        <p v-html="toastMsg"></p>
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
    ...mapState(['toast', 'toastTitle', 'toastMsg', 'cb'])
  },
  methods: {
    close() {
      this.vxc('closeToast')
      if (this.cb) {
        this.cb()
      }
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
  width: 4.2rem;
  height: 2.28rem;
  background: rgba(253, 247, 235, 1);
  border-radius: 0.1rem;
  position: relative;
  .title {
    height: 1.14rem;
    font-size: 0.36rem;
    line-height: 1.14rem;
    color: #056005;
    font-weight: 800;
    text-align: center;
  }
  p {
    padding: 0 0.3rem;
    font-size: 0.24rem;
    color: #6aa46a;
    text-align: center;
  }
  .close {
    display: block;
    width: 0.21rem;
    height: 0.23rem;
    background: url(../assets/img/close.png);
    background-size: 100% 100%;
    position: absolute;
    right: 0;
    top: -0.4rem;
  }
  // .ok {
  //   width: 1rem;
  //   height: 1rem;
  //   background: red;
  // }
}
</style>
