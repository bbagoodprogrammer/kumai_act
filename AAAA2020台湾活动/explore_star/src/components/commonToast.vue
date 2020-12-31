<template>
  <div class="toastBox" v-show="toastObj.toast">
    <transition name="slide">
      <div class="promptBox" v-show="toastObj.toast">
        <i class="close" @click="close()"></i>
        <div class="pupTitle">{{toastObj.toastTitle}}</div>
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
  width: 6.14rem;
  height: 3.49rem;
  background: #2a53af;
  border: 0.04rem solid #171a49;
  border-radius: 0.4rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  .close {
    display: block;
    width: 0.34rem;
    height: 0.35rem;
    background: url(../assets/img/close.png);
    background-size: 100% 100%;
    position: absolute;
    top: 0.16rem;
    right: 0.26rem;
  }

  .pupTitle {
    font-size: 0.4rem;
  }
  p {
    height: 1.2rem;
    line-height: 0.4rem;
    margin-top: 0.15rem;
    text-align: center;
  }
  .ok {
    width: 2.52rem;
    height: 0.89rem;
    background: url(../assets/img/ok.png);
    background-size: 100% 100%;
    text-align: center;
    line-height: 0.89rem;
    color: rgba(23, 26, 73, 1);
    font-size: 0.4rem;
    font-weight: 600;
  }
}
.promptBox::before {
  content: "";
  display: block;
  width: 6.22rem;
  height: 0.71rem;
  background: url(../assets/img/pupTips.png);
  background-size: 100% 100%;
  position: absolute;
  bottom: -0.2rem;
  z-index: -1;
}
</style>
