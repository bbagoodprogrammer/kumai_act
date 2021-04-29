<template>
  <div class="svga__box">
    <div class="screen"></div>
    <canvas id="box"></canvas>
  </div>
</template>

<script>
import { Downloader, Parser, Player } from "svga.lite";
export default {
  name: 'SvgaDialog',

  props: {
    visible: {
      type: Boolean,
      required: true,
    },
    index: {
      default: 0
    }
  },

  data() {
    return {};
  },

  mounted() {
    this.fetchSvgaData()
  },

  methods: {
    async fetchSvgaData() {
      const downloader = new Downloader();
      const parser = new Parser({ disableWorker: !("Worker" in window) });
      let url = ''
      if (this.index == 1 || this.index == 5 || this.index == 7) {
        url = '//fstatic.cat1314.com/uc/svga/927c3bbf85d8609126316bba355840f1_1614149409.svga'
      } else if (this.index == 0 || this.index == 4 || this.index == 6) {
        url = '//fstatic.cat1314.com/uc/svga/a8bb948b6b781d14d7f0060830a20893_1614149570.svga'
      } else {
        url = '//fstatic.cat1314.com/uc/svga/cf1299a4a45c16ac309a380fd66341bf_1614149697.svga'
      }
      const fileData1 = await downloader.get(url);
      this.svgaData1 = await parser.do(fileData1);
      let player1 = new Player("#box");
      player1.set({
        loop: 1,
      });
      await player1.mount(this.svgaData1);
      player1.$on('end', () => {
        this.$emit('end')
        this.handleCloseDialog()
      })
      player1.start();
    },

    handleCloseDialog() {
      this.$emit("update:visible", false);
    },
  },
};
</script>

<style lang="scss">
.svga__box {
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
    opacity: 0.3;
    z-index: 1000;
  }
  canvas {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
  }
}
</style>