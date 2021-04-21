<template>
  <div class="toastBox" v-show="toast">
    <transition name="hehe">
      <div class="promptBox" v-show="toast">
        <!-- <i class="close" @click="close()"></i> -->
        <img :src="toastImg" alt="" v-if="toastImg" class="gift">
        <img :src="toastTitle" alt="" class="title" v-if="toastTitle">
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
import { setTimeout } from 'timers';
export default {
  props: ["msg"],
  computed: {
    ...mapState(['toast', 'toastTitle', 'toastMsg', 'toastImg'])
  },
  mounted() {

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
}
.promptBox {
  position: absolute;
  width: 5.23rem;
  min-height: 1rem;
  padding: 0.15rem 0.2rem 0.5rem 0.2rem;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background: rgba(226, 255, 194, 1);
  border-radius: 0.1rem;
  .close {
    display: block;
    width: 0.32rem;
    height: 0.32rem;
    background: url(../assets/img/close.png);
    background-size: 100% 100%;
    position: absolute;
    right: 0.25rem;
    top: 0.25rem;
  }
  .gift {
    width: 3.96rem;
    height: 4.02rem;
    display: block;
    margin: 0.1rem auto 0;
  }
  .title {
    width: 4.15rem;
    height: 0.49rem;
    display: block;
    margin: 0.2rem auto 0;
  }
  p {
    margin-top: 0.35rem auto;
    text-align: center;
    color: #5f962d;
    font-weight: bold;
    margin-top: 0.3rem;
    span {
      display: block;
      font-weight: bold;
      font-size: 0.36rem;
      color: #48850f;
    }
    i {
      display: inline-block;
      width: 0.29rem;
      height: 0.3rem;
      background: url(../assets/img/water.png);
      background-size: 100% 100%;
    }
  }
}
</style>
