<template>
  <div id="lottie" :class="{mount:mouthAni==2}">
    <canvas id="canvas" width="510" height="510"></canvas>
    <canvas id="canvas2" width="510" height="510"></canvas>
  </div>
</template>

<script>
// import * as animationData from '../images/six';
import { Downloader, Parser, Player } from 'svga.lite';
import { setTimeout, setInterval, clearTimeout } from 'timers';
import { mapState } from "vuex"
import getString from "../utils/getString"
export default {
  data() {
    return {
      // lottieOptions: { animationData: animationData.default },
      ainArr: [
        'images/deer1/gun.svga',
        'images/deer2/gun.svga',
        'images/deer3/gun.svga',
        'images/deer4/gun.svga',
        'images/deer5/gun.svga',
      ],
      index: 0,
      fileArr: [],
      player: {},
      player2: {},
      timer: null,
      list: []
    };
  },
  computed: {
    ...mapState(['aniImg', 'isShare', 'mouthAni', 'userMsg', 'deerAmi']),
    imgDerss() {
      return this.ainArr[this.index]
    }
  },
  mounted() {
    // this.loadImg().then(result => {
    //   console.log(result)
    //   this.ainGo()
    // })
  },
  watch: {
    userMsg() {
      if (!getString('type') && !this.timer) {
        this.ainGo()
      }
    },
    deerAmi(val) {
      this.updaDeer(val)
    }
  },
  methods: {
    // acnClick() {
    //   if (this.index < this.ainArr.length - 1) {
    //     this.index++
    //   } else {
    //     this.index = 0
    //   }
    //   this.player.clear()
    //   // this.ainGo()
    // },
    // loadImage(src) {
    //   const downloader = new Downloader()
    //   return new Promise((resolve, reject) => {
    //     resolve(downloader.get(src))
    //     // resolve = loaderItme.then
    //   });
    // },
    // loadImg() {
    //   const list = [];
    //   this.ainArr.forEach(src => {
    //     list.push(this.loadImage(src));
    //   });
    //   this.fileArr = list
    //   return Promise.all(list);
    // },
    loadAllSvgaData(files) {
      const list = [];
      files.map(file => {
        list.push(this.loadSvgaData(file));
      });
      return Promise.all(list);
    },
    loadSvgaData(file) {
      const downloader = new Downloader();
      const parser = new Parser();
      return new Promise((resolve, reject) => {
        ; (async () => {
          const fileData = await downloader.get(file);
          const data = await parser.do(fileData);
          const arr = file.split(/\//);
          if (arr.length) {
            const name = arr[arr.length - 1].split(/\./)[0];
            resolve({ name, data });
          }
        })();
      });
    },
    async ainGo() {
      this.list = await this.loadAllSvgaData(this.ainArr)
      this.player = new Player('#canvas') // #canvas is HTMLCanvasElement
      this.player2 = new Player('#canvas2') // #canvas is HTMLCanvasElement
      this.player.set({
        loop: 0,
        fillMode: 'forwards',
        startFrame: 60,
        endFrame: 120
      })
      this.player2.set({
        loop: 0,
        fillMode: 'forwards',
        startFrame: 0,
        endFrame: 60
      })
      let nowLv = this.userMsg.deer_level == 0 ? 0 : this.userMsg.deer_level - 1
      await this.player.mount(this.list[nowLv].data)
      await this.player2.mount(this.list[nowLv].data)
      this.player2.start()
      this.earMove()
    },
    earMove() {
      this.player.start()
      setTimeout(() => {  //先動一次耳朵後隔10s在動一次
        this.player.stop()
        this.timer = setInterval(() => {
          this.player.start()
          setTimeout(() => {
            this.player.stop()
          }, 2000)
        }, 5000)
      }, 2000)
    },
    async updaDeer(val) {
      clearTimeout(this.timer)
      this.player.clear()
      this.player2.clear()
      if (val <= 5) {
        await this.player.mount(this.list[val - 1].data)
        await this.player2.mount(this.list[val - 1].data)
      }
      this.player2.start()
      this.earMove()
    }
  }
};
</script>

<style lang="scss">
#lottie {
  width: 5.1rem;
  height: 5.1rem;
  position: absolute;
  top: 2.5rem;
  left: 1.2rem;
  &.mount {
    #canvas {
      display: none;
    }
    #canvas2 {
      display: block;
    }
  }
  canvas {
    width: 5.1rem;
    height: 5.1rem;
    position: absolute;
  }
  #canvas2 {
    display: none;
  }
}
// #canvas {
//   width: 3.5rem;
//   height: 3.5rem;
//   position: absolute;
//   top: 3.92rem;
//   left: 1.93rem;
// }
// #canvas2 {
//   width: 3.5rem;
//   height: 3.5rem;
//   position: absolute;
//   top: 3.59rem;
//   left: 1.63rem;
//   display: none;
// }
</style>