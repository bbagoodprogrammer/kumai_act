<template>
  <div class="toastBox" v-show="toastObj.toast">
    <transition name="slide">
      <div class="promptBox" v-show="toastObj.toast">
        <div class="title"><i :class="{room:toastObj.toastTitle == 'room'}"></i></div>
        <!-- <div class="title">{{toastObj.toastTitle}}</div> -->
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
  width: 6.48rem;
  height: 6.76rem;
  background: linear-gradient(0deg, #83d2fb, #9e81fa, #a875f1);
  border: 0.08rem solid #ffffff;
  border-radius: 0.24rem;
  position: relative;
  .title {
    width: 5.14rem;
    height: 1.42rem;
    background: url(../assets/img/title/ribbon.png);
    background-size: 100% 100%;
    position: absolute;
    top: -0.8rem;
    left: 0.71rem;
    i {
      display: block;
      width: 5.14rem;
      height: 1.42rem;
      background: url(../assets/img/title/title_12.png);
      background-size: 100% 100%;
      &.room {
        background: url(../assets/img/title/title_13.png);
        background-size: 100% 100%;
      }
    }
  }
  p {
    height: 5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
  }
  .ok {
    width: 3.76rem;
    height: 1rem;
    background: url(../assets/img/singUpBtn.png);
    background-size: 100% 100%;
    margin: 0 auto;
    text-align: center;
    color: rgba(126, 45, 0, 1);
    line-height: 0.8rem;
  }
}
</style>
