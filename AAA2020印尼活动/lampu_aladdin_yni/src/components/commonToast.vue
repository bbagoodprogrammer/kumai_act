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
    ...mapState(['toast', 'toastTitle', 'toastMsg', 'toastCb'])
  },
  methods: {
    close() {
      if (this.toastCb) {
        this.toastCb()
      }
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
  width: 6.56rem;
  height: 5.96rem;
  background: url(../assets/img/pupBg.png);
  background-size: 100% 100%;
  position: relative;
  .title {
    height: 0.4rem;
    margin-top: 2.2rem;
    text-align: center;
    font-weight: 600;
    color: #f7c30c;
  }
  p {
    height: 2.3rem;
    padding: 0 0.8rem;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    font-size: 0.22rem;
    color: #f7c30c;
  }
  .close {
    display: block;
    width: 0.68rem;
    height: 0.65rem;
    background: url(../assets/img/close.png);
    background-size: 100% 100%;
    position: absolute;
    right: 0.1rem;
    top: 0.9rem;
  }
  .ok {
    display: block;
    width: 2.3rem;
    height: 0.84rem;
    line-height: 0.84rem;
    font-weight: 700;
    text-align: center;
    margin: 0.1rem auto 0;
    color: #fdf144;
  }
}
</style>
