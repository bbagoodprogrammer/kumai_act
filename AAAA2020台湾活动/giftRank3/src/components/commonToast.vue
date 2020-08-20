<template>
  <div class="toastBox" v-show="toast">
    <transition name="slide">
      <div class="promptBox" v-show="toast">
        <i class="close" @click="close()"></i>
        <div class="title">{{toastTitle}}</div>
        <p v-html="toastMsg"></p>
        <!-- <div class="ok" @click="close()">
          {{lang.ok}}
        </div> -->
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
  width: 6.59rem;
  height: 3.98rem;
  background: url(../assets/img/toastBg.png);
  background-size: 100% 100%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  p {
    font-size: 0.4rem;
    font-weight: 600;
    text-align: center;
    padding: 0 0.15rem;
    color: #983347;
  }
  .close {
    display: block;
    width: 0.95rem;
    height: 0.95rem;
    background: url(../assets/img/close.png);
    background-size: 100% 100%;
    position: absolute;
    top: -0.45rem;
    right: 0.25rem;
  }
}
</style>
