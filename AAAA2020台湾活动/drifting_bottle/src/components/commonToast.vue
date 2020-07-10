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
  background: rgba(16, 128, 208, 0.5);
  z-index: 10000;
  display: flex;
  align-items: center;
  justify-content: center;
}
.promptBox {
  width: 7.17rem;
  height: 8.28rem;
  padding-top: 0.88rem;
  background: url(../assets/img/pupBg.png);
  background-size: 100% 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  p {
    color: #611300;
    font-weight: 600;
    padding: 0 1rem;
    text-align: center;
  }
  .close {
    width: 0.75rem;
    height: 0.75rem;
    background: url(../assets/img/close.png);
    background-size: 100% 100%;
    position: absolute;
    right: 0.3rem;
    top: 0.1rem;
  }
  .ok {
    width: 2.08rem;
    height: 0.68rem;
    background: url(../assets/img/comitBtn.png);
    background-size: 100% 100%;
    color: #ae4800;
    font-weight: 700;
    text-align: center;
    margin-top: 0.8rem;
    line-height: 0.68rem;
  }
}
</style>
