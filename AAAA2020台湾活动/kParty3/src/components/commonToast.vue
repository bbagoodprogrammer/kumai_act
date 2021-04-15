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
    ...mapState(['toast', 'toastTitle', 'toastMsg'])
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
  width: 5.9rem;
  height: 3.78rem;
  background: rgba(104, 30, 181, 1);
  border-radius: 0.4rem;
  position: relative;
  p {
    height: 2.5rem;
    padding: 0 0.25rem;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 0.3rem;
  }
  .close {
    display: block;
    width: 0.58rem;
    height: 0.58rem;
    background: url(../assets/img/close.png);
    background-size: 100% 100%;
    position: absolute;
    right: 0;
    top: -0.7rem;
  }
  .ok {
    display: block;
    width: 1.78rem;
    height: 0.64rem;
    line-height: 0.64rem;
    background: url(../assets/img/followBtn1.png);
    background-size: 100% 100%;
    font-size: 0.26rem;
    font-weight: 500;
    text-align: center;
    margin: 0 auto;
  }
}
</style>
