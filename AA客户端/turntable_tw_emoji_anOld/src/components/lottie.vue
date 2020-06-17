<template>
  <div class="canvasBox">
    <canvas id="canvas" width="140px" height="140px"></canvas>
  </div>
</template>
<script>
import { Downloader, Parser, Player } from 'svga.lite'
export default {
  mounted() {
    let canArr = document.getElementsByTagName('canvas')
    for (let i = 0; i < canArr.length; i++) {
      this.aniGo(canArr[i])
    }
  },
  methods: {
    aniGo(el) {
      let downloader = new Downloader()
      let parser = new Parser()
        ; (async () => {
          let player = new Player(el)

          let fileData1 = await downloader.get('/images/gun.svga')

          let svgaData1 = await parser.do(fileData1)

          await player.mount(svgaData1)

          player.start()
        })()
    }
  }
}
</script>
<style lang="scss" scoped>
.canvasBox {
  canvas {
    width: 1.4rem;
    height: 1.4rem;
  }
}
</style>
