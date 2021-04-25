<template>
  <div class="apply__dialog">
    <div
      @touchmove.prevent
      class="list__screen__container"
      @click="handleCloseDialog"
    ></div>
    <div class="apply__main">
      <div class="dialog__title">
        {{ lang.out_confirm }}
      </div>
      <div class="apply_des">{{ lang.sign_out_des.replace("%s", name) }}</div>
      <div class="btn__box">
        <div class="btn" @click="handleSignOut">{{ lang.firmly_withdraw }}</div>
        <div class="btn" @click="handleCloseDialog">{{ lang.think_again }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { quitFamily } from "../apis";
import { toast } from "../utils";
export default {
  name: "SignOutDialog",

  props: {
    visible: {
      type: Boolean,
      required: true,
    },
    familyId: {
      required: true,
    },
    name: {
      required: true,
    },
  },

  computed: {},

  data() {
    return {};
  },

  created() {
    document.body.style.overflow = "hidden";
  },

  beforeDestroy() {
    document.body.style.overflow = "";
  },

  methods: {
    async handleSignOut() {
      let res = await quitFamily();
      let { response_status, response_data } = res.data;
      if (response_status.code === 0) {
        toast(this.lang.sign_out_succ);
        this.$store.dispatch("initData");
        this.$parent.handleCloseDialog()
      } else {
        toast(response_status.error);
      }
    },

    getBrHtml(text) {
      if (!text) {
        return "";
      }
      return text.replace("%s", "<br>");
    },

    handleCloseDialog() {
      this.$emit("update:visible", false);
    },
  },
};
</script>

<style lang="scss">
.apply__dialog {
  .list__screen__container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: black;
    opacity: 0.5;
    z-index: 1000;
  }

  .apply__main {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1000;
    opacity: 1;
    width: 6.81rem;
    height: 3.51rem;
    background: url("../img/mini_dialog_bg.png");
    background-size: 100% 100%;
    background-repeat: no-repeat;
    box-sizing: border-box;
    .close__img {
      width: 0.69rem;
      height: 0.69rem;
      position: absolute;
      top: -0.2rem;
      right: -0rem;
      z-index: 1000;
    }

    .dialog__title {
      display: inline-block;
      font-size: 0.34rem;
      color: #e4bd68;
      position: relative;
      left: 50%;
      transform: translateX(-50%);
      margin-top: 0.31rem;
    }
    .dialog__title::before {
      content: "";
      width: 1.94rem;
      height: 0.16rem;
      position: absolute;
      left: -2.06rem;
      background-image: url("../img/title_left.png");
      background-size: 100% 100%;
      top: 50%;
      transform: translateY(-50%);
    }
    .dialog__title::after {
      content: "";
      width: 1.94rem;
      height: 0.16rem;
      position: absolute;
      right: -2.06rem;
      background-image: url("../img/title_right.png");
      background-size: 100% 100%;
      top: 50%;
      transform: translateY(-50%);
    }

    .apply_des {
      text-align: center;
      font-size: 0.26rem;
      font-weight: 400;
      color: #e9faf9;
      padding: 0.48rem 1rem 0.4rem 1rem;
    }

    .btn__box {
      display: flex;
      justify-content: center;
      .btn:first-child {
        background: url("../img/tab_bg.png");
        background-size: 100% 100%;
        color: #ffffff;
      }
      .btn {
        width: 2.3rem;
        height: 0.78rem;
        background: url("../img/current_tab_bg.png");
        background-size: 100% 100%;
        line-height: 0.78rem;
        text-align: center;
        font-size: 0.28rem;
        font-weight: bold;
        color: #7a2a10;
        margin: 0 0.2rem 0 0.2rem;
      }
    }
  }
}
</style>