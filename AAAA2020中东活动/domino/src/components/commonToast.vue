<template>
  <div class="toastBox" v-show="toastObj.toast">
    <transition name="slide">
      <div class="promptBox" v-show="toastObj.toast">
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
  width: 6.26rem;
  height: 4.32rem;
  background: url(../assets/img/pupBg.png);
  background-size: 100% 100%;
  p {
    height: 2.88rem;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 0 1.2rem;
    font-size: 0.36rem;
    color: #c1f7ff;
  }
  .ok {
    width: 2.11rem;
    height: 0.8rem;
    background: url(../assets/img/ok.png);
    background-size: 100% 100%;
    margin: 0 auto;
    text-align: center;
    line-height: 0.8rem;
  }
}
</style>
