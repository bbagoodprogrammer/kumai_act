<template>
  <div>
    <!-- <div class="svga_loading" v-show="loading">
        <span></span>
    </div> -->
    <!--<canvas v-show="!loading" id="canvas_gift" class="canvas" width="" height=""></canvas> -->
    <canvas id="canvas_temp"></canvas>
    <canvas id="canvas_img"></canvas>
    <canvas id="canvas_gift" ref="canvas" class="canvas" width="" height="">

    </canvas>
  </div>
</template>
<script>
import { Downloader, Parser, Player } from 'svga.lite';

const downloader = new Downloader();
const parser = new Parser({ disableWorker: !('Worker' in window) });
const _this = window._lang;
var _avatar = '';

function loadSvgaData (file) {
  return new Promise((resolve, reject) => {
    ; (async () => {
      const text = _this.svga_tips;
      const fontCanvas = document.getElementById('canvas_temp')
      const fontContext = fontCanvas.getContext('2d')
      fontContext.font = '28px Arial'
      fontContext.textAlign = 'center'
      fontContext.textBaseline = 'middle'
      fontContext.fillStyle = '#fff'
      if (__lang == 'id') {
        fontContext.fillText(text, fontCanvas.width / 2 + 20, fontCanvas.height / 2)
      } else {
        fontContext.fillText(text, fontCanvas.width / 2 + 20, fontCanvas.height / 2)
      }
      const downloader = new Downloader()
      const parser = new Parser()
      const player = new Player('#canvas_gift')
      const fileData = await downloader.get(file)
      const data = await parser.do(fileData)

      data.dynamicElements['text'] = fontCanvas;

      // const image = new Image(0,0);
      // image.src = _avatar;
      // image.style.position = 'absolute';
      // image.style.top = '50%';
      // image.style.left = '50%';
      // console.log(image);
      // data.images['Avatar'] = image;

      await player.mount(data);

      const arr = file.split(/\//);
      if (arr.length) {
        const name = arr[arr.length - 1].split(/\./)[0];
        resolve({ name, data });
      }
    })();
  });
}
function loadAllSvgaData (...files) {
  const list = [];
  files.map(file => {
    list.push(loadSvgaData(file));
  });
  return Promise.all(list);
}
export default {
  data () {
    return {
      loading: true,
      svgaPlay: null,
    }
  },
  props: {
    start: {
      type: String,
    },
    isGo: {
      type: Boolean,
    },
    url: {
      type: String,
    },
    avatarInfo: {
      type: String,
    },
  },

  // created(){
  //     this._avatar = this.avatarInfo;
  // },
  mounted () {
    _avatar = this.avatarInfo;
    this.svgaPlay = new Player(this.$refs.canvas)
    this.svgaPlay.set({
      // loop: 1,
      fillMode: 'forwards',
      startFrame: 1,
    })
      ; (async () => {

        const svgadata = await loadAllSvgaData(this.url)
        // const svgadata = await loadAllSvgaData('../images/lv04_small.svga');
        await this.svgaPlay.mount(svgadata[0].data);

        this.svgaPlay.start();
        // this.svgaPlay.stop();
      })()
  },
  methods: {
    async svgaStart (data) {
      console.log(data);
      // let canvas = document.getElementById('#canvas_gift');
      let player = new Player((this.$refs.canvas));
      player.set({ startFrame: 1 })
      const svgadata = await loadAllSvgaData(data)
      await player.mount(svgadata)
      // if (isGo ) {
      player.start()
      // }
      // this.plarerArr[className] = {
      //     player
      // }
    },
    load () {
      (async () => {
        // this.svgaPlay = new Player('#canvas_gift');
        // this.svgaPlay.set({ startFrame: 1,loop:1})
        // this.svgaPlay.set({ startFrame: 1})
        // const player = new Player('#canvas_gift');
        // console.log(this.svgaPlay);
        // const svgadata = await loadSvgaData(this.url)
        // await this.svgaPlay.mount(svgadata);
        // this.svgaPlay.start();
        // this.svgaPlay.stop();
        // this.svgaPlay.$on('stop', () => console.log('event stop'))
        // this.loading = false;
      })()
    },
    childMethod () {
      // console.log('砸');
      // const player = new Player('#canvas_gift');
      // const svgadata = await loadSvgaData(this.url)
      // await player.mount(svgadata);
      this.svgaPlay.set({ loop: 1 });//砸蛋一次
      this.svgaPlay.start();
      // this.svgaPlay.$on('stop', () => console.log('event stop'))
    },
    closeEgg () {
      this.svgaPlay = new Player(this.$refs.canvas)
      this.svgaPlay.set({
        fillMode: 'forwards',
        startFrame: 1
      })
        ; (async () => {
          const svgadata = await loadAllSvgaData(this.url)
          await this.svgaPlay.mount(svgadata[0].data);
          this.svgaPlay.start();
          this.svgaPlay.stop();
        })()
    }
  },
}   
</script>
<style lang="scss">
#canvas_temp,
#canvas_img {
  position: absolute;
  top: 1000rem;
}
#canvas_gift {
  position: relative;
}
.svga_loading {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 9999;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  span {
    display: block;
    width: 0.7rem;
    height: 0.38rem;
    // background: url("../img/loading.gif") no-repeat;
    background-size: 0.7rem 0.38rem;
  }
}
canvas {
  width: 100%;
}
</style>