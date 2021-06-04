<template>
  <div class="ring__dialog">
    <div class="ring__screen__container" @click="handleCloseDialog"></div>
    <img class="dialog_crown" src="../img/dialog_crown.png" />
    <div class="ring__container">
      <img
        src="../img/close.png"
        @click="handleCloseDialog"
        class="close__img"
      />
      <div class="dialog_header">{{ info.rname }}</div>
      <div class="ring__box">
        <img :src="images[`dialog_ring_${info.index}`]" />
      </div>
      <div class="ring_des" v-html="getBrHtml(lang[`ring_des_${info.index}`])"></div>
      <div class="need_engine">
        {{ lang.need_magic_engine.replace("%s", info.score) }}
      </div>
      <div class="btn__box">
        <div v-if="info.received" class="maked_btn" @click="handleSure()">
          {{ lang.ring_maked  }}
        </div>
        <div v-else class="btn" @click="handleSure()">
          {{lang.get_engine }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { toast } from "../utils/index";
import callApp from "../utils/callApp";

export default {
  name: "RingDialog",

  props: {
    visible: {
      type: Boolean,
      required: true,
    },
    info: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {

    };
  },

  created() {
    document.body.style.overflow = "hidden";
  },

  beforeDestroy() {
    document.body.style.overflow = "";
  },

  methods: {

    handleSure() {
      if (!this.info.received) {
        this.$store.commit('changeCurrentTab', 0)
        window.scrollTo(0, document.body.scrollHeight)
      } 
      this.handleCloseDialog()
    },

    getBrHtml(text) {
      if (!text) {
        return;
      }
      return text.replace(/\n/g, "<br>");
    },

    handleCloseDialog() {
      this.$emit("update:visible", false);
    },
  },
};
</script>

<style lang="scss">
.ring__dialog {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1000;
  .ring__screen__container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: black;
    opacity: 0.7;
    z-index: 1000;
  }

  .dialog_crown {
    position: absolute;
    top: 0.9rem;
    left: 50%;
    transform: translateX(-50%);
    width: 5.55rem;
    height: 2.02rem;
    background: url("../img/dialog_crown.png") 0/100% 100% no-repeat;
    z-index: 1000;
  }
  .ring__container {
    width: 6.38rem;
    height: 8.29rem;
    background: url("../img/ring_dialog_bg.png") 0/100% 100% no-repeat;
    position: fixed;
    top: 2.5rem;
    left: 50%;
    transform: translateX(-50%);
    z-index: 1000;
    opacity: 1;
    .close__img {
      width: 0.64rem;
      height: 0.64rem;
      position: absolute;
      top: -0.15rem;
      right: 0rem;
      z-index: 1100;
    }

    .dialog_header {
      text-align: center;
      height: 0.38rem;
      font-size: 0.4rem;
      font-weight: 500;
      color: #ffefbf;
      padding-top: 0.62rem;
      padding-bottom: 0.42rem;
    }
    .ring__box {
      width: 2.04rem;
      height: 2.07rem;
      margin: 0 auto;
      background: url("../img/gift_img_box.png") 0/100% 100% no-repeat;
      display: flex;
      align-items: center;
      justify-content: center;
      img {
        width: 2rem;
        height: 2rem;
      }
    }
    .ring_des {
      width: 5.56rem;
      height: 2.07rem;
      background: linear-gradient(
        180deg,
        rgba($color: #5c24f1, $alpha: 0.5) 20%,
        rgba($color: #8d3cff, $alpha: 0.5) 100% 100%
      );
      border-radius: 0.1rem;
      margin: 0.39rem auto 0.29rem auto;
      font-size: 0.28rem;
      font-weight: 300;
      color: #ffffff;
      line-height: 0.4rem;
      text-align: center;
      padding: 0 0.15rem;
      box-sizing: border-box;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .need_engine {
      text-align: center;
      font-size: 0.26rem;
      font-weight: 500;
      color: #8afffb;
    }
    .btn__box {
      position: relative;
      margin-top: 0.46rem;
      .btn {
        width: 2.48rem;
        height: 0.7rem;
        background: url("../img/cp_selected_btn.png") 0/100% 100% no-repeat;
        position: relative;
        left: 50%;
        transform: translateX(-50%);
        font-size: 0.28rem;
        font-weight: 500;
        color: #ffffff;
        line-height: 0.7rem;
        text-align: center;
      }
      .maked_btn {
        @extend .btn;
        background: url("../img/dialog_left_action_tab.png") 0/100% 100%
          no-repeat;
      }
    }
  }
}
</style>