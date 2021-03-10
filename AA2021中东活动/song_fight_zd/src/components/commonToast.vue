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
    close () {
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
  width: 6.16rem;
  height: 2.82rem;
  background: rgba(116, 68, 255, 1);
  border: 0.04rem solid rgba(213, 197, 255, 1);
  border-radius: 0.4rem;
  position: relative;
  padding-top: 0.6rem;

  .title {
    height: 0.3rem;
    text-align: center;
    color: rgba(255, 213, 86, 1);
    font-size: 0.36rem;
    font-weight: bold;
  }
  p {
    text-align: center;
    font-size: 0.24rem;
    color: RGBA(255, 239, 255, 1);
    margin-top: 0.34rem;
    padding: 0 0.3rem;
  }
  .ok {
    width: 2.24rem;
    height: 0.84rem;
    line-height: 0.84rem;
    text-align: center;
    font-weight: bold;
    color: rgba(174, 72, 0, 1);
    background: url(../assets/img/ok.png);
    background-size: 100% 100%;
    margin: 0.3rem auto 0;
  }
  .close {
    display: block;
    width: 0.6rem;
    height: 0.6rem;
    background: url(../assets/img/close.png);
    background-size: 100% 100%;
    position: absolute;
    right: 0;
    top: -0.9rem;
  }
}
</style>
