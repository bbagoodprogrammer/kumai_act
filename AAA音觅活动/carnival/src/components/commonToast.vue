<template>
  <div class="toastBox" v-show="toastObj.toast">
    <transition name="slide">
      <div class="promptBox" v-show="toastObj.toast">
        <i class="close" @click="close()" v-if="toastObj.noOk"></i>
        <div class="text">
          <div class="title">{{toastObj.toastTitle}}</div>
          <p v-html="toastObj.toastMsg"></p>
        </div>

        <div class="ok" @click="close()" v-if="toastObj.noOk">
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
  width: 6.6rem;
  height: 3.22rem;
  padding-top: 1rem;
  background: url(../assets/img/toast.png);
  background-size: 100% 100%;
  position: relative;
  .text {
    height: 2.8rem;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    .title {
      text-align: center;
      font-size: 0.35rem;
      color: rgba(107, 38, 193, 1);
      font-weight: 600;
    }
    p {
      color: rgba(107, 38, 193, 1);
      font-weight: 600;
      padding: 0 0.4rem;
      font-size: 0.26rem;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }

  .close {
    display: block;
    width: 0.95rem;
    height: 0.95rem;
    background: url(../assets/img/close.png);
    background-size: 100% 100%;
    position: absolute;
    right: -0.2rem;
    top: 0.63rem;
  }

  .ok {
    width: 2.6rem;
    height: 0.97rem;
    text-align: center;
    line-height: 0.97rem;
    background: url(../assets/img/ok.png);
    background-size: 100% 100%;
    position: absolute;
    left: 2rem;
    bottom: -0.4rem;
  }
}
</style>
