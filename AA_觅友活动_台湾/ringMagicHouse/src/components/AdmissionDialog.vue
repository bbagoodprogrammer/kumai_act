<template>
  <div class="admission_dialog">
    <div class="select__screen__container"></div>
    <div class="select__container">
      <!-- <img
        src="../img/close.png"
        @click="handleCloseDialog"
        class="close__img"
      /> -->
      <div class="dialog_header">{{ lang.welcome_act }}</div>
      <canvas class="canvas" id="canvas3"></canvas>
      <div class="admission_des" v-html="getBrHtml(lang.admission_des)"></div>

      <div class="action__tabs">
        <div class="tab" @click="handleSure">{{ lang.get_into_house }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { toast } from "../utils/index";
import callApp from "../utils/callApp";
import { subscribe } from "../apis/index";
import { Downloader, Parser, Player } from "svga.lite";

export default {
  name: "AdmissionDialog",

  props: {
    visible: {
      type: Boolean,
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

  mounted() {
    this.handleSvga()
  },

  beforeDestroy() {
    document.body.style.overflow = "";
  },

  methods: {
    async handleSvga() {
      const downloader = new Downloader();
      const parser = new Parser({ disableWorker: !("Worker" in window) });
      let player = new Player("#canvas3");
      const fileData1 = await downloader.get(
        "//fstatic.cat1314.com/uc/svga/5f2d8985e308063be8436de332201d20_1611029019.svga"
      );
      let svgaData1 = await parser.do(fileData1);
      player.set({
        fillMode: "forwards",
        noExecutionDelay: true,
      });
      await player.mount(svgaData1);
      player.start();
    },

    async handleSure() {
      let res = await subscribe();
      let { response_status, response_data } = res.data;
      if (response_status.code === 0) {
        this.handleCloseDialog()
      } else {
        toast(response_status.error);
      }
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
.admission_dialog {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1000;
  .select__screen__container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: black;
    opacity: 0.7;
    z-index: 1000;
  }
  .select__container {
    width: 6.38rem;
    height: 5.03rem;
    background: url("../img/mini_dialog_bg.png") 0/100% 100% no-repeat;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1000;
    opacity: 1;
    .close__img {
      width: 0.64rem;
      height: 0.64rem;
      position: absolute;
      top: 0.1rem;
      right: 0rem;
      z-index: 1100;
    }
    .dialog_header {
      width: 6.38rem;
      height: 0.82rem;
      text-align: center;
      line-height: 0.8rem;
      font-size: 0.36rem;
      font-weight: 500;
      color: #ffefbf;
      position: relative;
      z-index: 1050;
    }
    .canvas {
      width: 2.87rem;
      height: 2.77rem;
      // background: red;
      display: block;
      margin: 0 auto;
    }
    .admission_des {
        font-size: 0.22rem;
        font-weight: 300;
        color: #FFFFFF;
      // margin: 0.7rem auto 0.46rem auto;
      text-align: center;
    }

    .action__tabs {
      position: absolute;
      bottom: -0.28rem;
      left: 50%;
      transform: translateX(-50%);
      display: flex;
      justify-content: center;
      .tab {
        width: 2.48rem;
        height: 0.7rem;
        line-height: 0.7rem;
        background: url("../img/cp_selected_btn.png") 0/100% 100% no-repeat;
        text-align: center;
        font-size: 0.28rem;
        font-weight: 500;
        color: #ffffff;
      }
    }
  }
}
</style>