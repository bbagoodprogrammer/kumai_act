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
  width: 5.84rem;
  height: 5rem;
  padding-top: 1.3rem;
  background: url(../assets/img/pupBg.png);
  background-size: 100% 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .title {
    font-size: 0.38rem;
    color: #fddd4e;
    font-weight: 700;
  }
  p {
    margin-top: 0.45rem;
    font-size: 0.24rem;
    font-weight: 700;
    color: #c66242;
    padding: 0 0.4rem;
    text-align: center;
    em {
      font-size: 0.24rem;
      font-weight: 700;
      color: #fff;
    }
  }
  .ok {
    width: 2.32rem;
    height: 0.88rem;
    background: url(../assets/img/rechargeBtn.png);
    background-size: 100% 100%;
    color: #fff09d;
    -webkit-text-stroke: 0.5px #6d2c06;
    text-stroke: 0.5px #6d2c06;
    text-align: center;
    line-height: 0.88rem;
    margin-top: 0.59rem;
  }

  .close {
    display: block;
    width: 0.7rem;
    height: 0.7rem;
    background: url(../assets/img/close.png);
    background-size: 100% 100%;
    position: absolute;
    top: 0.32rem;
    right: 0;
  }
}
</style>
