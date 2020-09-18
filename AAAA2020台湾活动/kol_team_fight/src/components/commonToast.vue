<template>
  <div class="toastBox" v-show="toastObj.toast">
    <transition name="slide">
      <div class="queryPup" v-show="toastObj.toast">
        <i class="close" @click="close()"></i>
        <!-- <div class="title">{{toastObj.toastTitle}}</div> -->
        <p v-html="toastObj.toastMsg"></p>
        <div class="btnBox">
          <span class="ok" @click="close()">
            {{lang.ok}}
          </span>
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
</style>
