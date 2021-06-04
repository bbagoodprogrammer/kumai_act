<template>
  <div class="get_ring__dialog">
    <div class="get_ring__screen__container" @click="handleCloseDialog"></div>
    <img class="dialog_crown" src="../img/dialog_crown.png" />
    <div class="get_ring__container">
      <img
        src="../img/close.png"
        @click="handleCloseDialog"
        class="close__img"
      />
      <div class="dialog_header">{{ info.type == 'finishCompleteRingBeforeCP' ? lang.congratulate_get: lang.congratulate}}</div>
      <div class="get_ring__box">
        <img :src="images[`dialog_ring_${info.data.index}`]" />
      </div>
      <div class="need_engine">
        <span v-if="info.type == 'finishCompleteRingBeforeCP'">{{lang.congratulate_des_1.replace('%s', info.data.rname)}}</span>
        <span v-else>{{lang.congratulate_des_2.replace('%s', info.data.rname).replace('{0}', info.data.cp_nick)}}</span>
      </div>
      <div class="btn__box">
        <div class="btn" @click="handleSure()">
          {{ info.type == 'finishCompleteRingBeforeCP' ? lang.take_happiness: lang.go_cp_house  }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { toast } from "../utils/index";
import callApp from "../utils/callApp";
import { mapGetters, mapState } from "vuex";

export default {
  name: "GetRingDialog",

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

  computed: {
    ...mapGetters(["userInfo"]),
  },

  created() {
    document.body.style.overflow = "hidden";
  },

  beforeDestroy() {
    document.body.style.overflow = "";
  },

  methods: {

    handleSure() {
      callApp.cpHouse(this.userInfo.uid)
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
.get_ring__dialog {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1000;
  .get_ring__screen__container {
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
    top: 1.9rem;
    left: 50%;
    transform: translateX(-50%);
    width: 5.55rem;
    height: 2.02rem;
    background: url("../img/dialog_crown.png") 0/100% 100% no-repeat;
    z-index: 1000;
  }
  .get_ring__container {
    width: 6.38rem;
    height: 5.03rem;
    background: url("../img/mini_dialog_bg.png") 0/100% 100% no-repeat;
    position: fixed;
    top: 3.5rem;
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
      height: 0.82rem;
      font-size: 0.4rem;
      font-weight: 500;
      color: #ffefbf;
      line-height: 0.8rem;
      // padding-top: 0.62rem;
      // padding-bottom: 0.42rem;
    }
    .get_ring__box {
      width: 2.04rem;
      height: 2.07rem;
      margin: 0 auto;
      background: url("../img/gift_img_box.png") 0/100% 100% no-repeat;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-top: 0.2rem;
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
      width: 5.8rem;
      height: 1.5rem;
      // background: red;
      margin: 0 auto;
      text-align: center;
      font-size: 0.26rem;
      font-weight: 500;
      color: #8afffb;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .btn__box {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      bottom: -0.32rem;
      // margin-top: 0.46rem;
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