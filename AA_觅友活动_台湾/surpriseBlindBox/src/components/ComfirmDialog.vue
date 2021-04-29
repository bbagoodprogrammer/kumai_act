<template>
  <div>
    <!-- 二次确认弹框 -->
    <div class="confirm__box" v-if="visible">
      <div class="screen" @click="handleCloseDialog"></div>
      <div class="main">
        <img class="send__icon" src="../img/send_box_icon.png" alt="">
        <span v-if="type == 'friend'" class="title">{{ lang.give_friend.replace('%s', nick) }}</span>
        <span class="des">{{ lang.cost_coin_des.replace('N', count).replace('%s', initData.price * count) }}</span>
        <div class="btn__box">
          <img
            class="confirm__btn"
            @click="handleCloseDialog"
            :src="images.think_again"
          />
          <img
            v-if="type == 'friend'"
            class="confirm__btn"
            @click="handleSurePurchase"
            :src="images.sure_give"
          />
           <img
            v-else
            class="confirm__btn"
            @click="handleSurePurchase"
            :src="images.sure_purchase"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
export default {
  name: 'ComfirmDialog',

  props: {
    visible: {
      type: Boolean,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    count: {
      required: true,
    },
    nick: {
      type: String,
    }
  },

  computed: {
    ...mapState(["initData"]),
  },

  data() {
    return {
      showSuccDialog: false,
    };
  },

  methods: {

    handleSurePurchase () {
      this.$emit('handlePurchase')
      this.handleCloseDialog()
    },

    handleCloseDialog() {
      this.$emit("update:visible", false);
    },
  },
};
</script>

<style lang="scss">
.confirm__box {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1000;
  .screen {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: black;
    opacity: 0.5;
    z-index: 1000;
  }
  .main {
    width: 6.35rem;
    height: 5.62rem;
    background: url("../img/comfirm_dialog.png") 0/100% 100% no-repeat;
    position: fixed;
    top: 0;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    z-index: 1000;
    opacity: 1;
    .send__icon {
      display: block;
      width: 2.34rem;
      height: 2.34rem;
      margin: 0.67rem auto 0.2rem auto;
    }
    .title {
      display: block;
      text-align: center;
      font-size: 0.28rem;
      font-weight: 400;
      color: #ffffff;
      line-height: 0.31rem;
      width: 4rem;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      margin: 0 auto;
    }
    .des {
      display: block;
      text-align: center;
      padding-top: 0.11rem;
      font-size: 0.24rem;
      font-weight: 400;
      color: #fff94a;
      line-height: 0.31rem;
    }
    .btn__box {
      display: flex;
      justify-content: center;
      margin-top: 0.4rem;
      .confirm__btn {
        width: 2.14rem;
        height: 0.77rem;
        margin: 0 0.1rem;
      }
    }
  }
}
</style>