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
  width: 5.68rem;
  height: 3.16rem;
  background: RGBA(58, 37, 30, 1);
  border-radius: 0.16rem;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  p {
    font-size: 0.28rem;
    font-weight: 600;
    text-align: center;
    padding: 0 0.15rem;
    line-height: 0.45rem;
  }
  .ok {
    width: 2.15rem;
    height: 0.73rem;
    background: url(../assets/img/ok.png);
    background-size: 100% 100%;
    text-align: center;
    line-height: 0.73rem;
    color: rgba(137, 63, 30, 1);
    margin-top: 0.5rem;
    font-weight: 600;
  }
  .close {
    display: block;
    width: 0.6rem;
    height: 0.57rem;
    background: url(../assets/img/close.png);
    background-size: 100% 100%;
    position: absolute;
    top: -0.2rem;
    right: 0.04rem;
  }
}
</style>
