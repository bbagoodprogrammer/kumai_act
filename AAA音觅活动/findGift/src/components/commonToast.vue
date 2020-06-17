<template>
  <div class="toastBox" v-show="toast">
    <transition name="slide">
      <div class="promptBox" v-show="toast">
        <i class="close" @click="close()"></i>
        <div class="title">{{toastTitle}}</div>
        <p v-html="toastMsg"></p>
        <div class="btnBox" v-if="totasType!=1">
          <span class="red" @click="close()">取消</span>
          <span class="ok" v-if="totasType==2" @click="query()">確認</span>
          <span class="ok" v-else-if="totasType==3" @click="query()">前往儲值</span>
          <span class="ok" v-else @click="query()">前往獲取</span>
        </div>
        <div class="oneOk" @click="close()" v-else>
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
    ...mapState(['toast', 'toastTitle', 'toastMsg', 'totasCb', 'totasType'])
  },
  methods: {
    close() {
      this.vxc('closeToast')
      this.vxc('restTotal')
    },
    query() {
      if (this.totasCb) {
        this.totasCb()
      }
      this.close()
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
  width: 4.96rem;
  height: 2.81rem;
  padding-top: 0.47rem;
  background: rgba(248, 242, 255, 1);
  border-radius: 0.2rem;
  position: relative;
  .title {
    text-align: center;
    font-size: 0.36rem;
    font-weight: bold;
    color: #8217f3;
  }
  p {
    height: 1.3rem;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #501991;
    font-size: 0.28rem;
    text-align: center;
  }
  .close {
    width: 0.22rem;
    height: 0.22rem;
    background: url(../assets/img/close.png);
    background-size: 100% 100%;
    position: absolute;
    right: -0.3rem;
    top: -0.3rem;
  }
  .btnBox {
    padding: 0 0.3rem;
    display: flex;
    justify-content: space-between;
    span {
      width: 2.04rem;
      height: 0.68rem;
      border-radius: 0.34rem;
      background: #c4b2d9;
      text-align: center;
      line-height: 0.68rem;
      &.ok {
        background: #fd4682;
      }
    }
  }
  .oneOk {
    width: 2.04rem;
    height: 0.68rem;
    border-radius: 0.34rem;
    background: #fd4682;
    text-align: center;
    line-height: 0.68rem;
    margin: 0 auto;
  }
}
</style>
