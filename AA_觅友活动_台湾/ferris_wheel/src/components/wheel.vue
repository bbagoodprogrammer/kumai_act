<template>
  <div class="wheel">
    <canvas id="lun"></canvas>
    <canvas id="deng"></canvas>
    <div class="wheelTips">
      xx月xx日-xx月xx日期間每天日榜的第一名cp
      可乘坐摩天輪，並獲得當天真愛值的10%加成
      和xxx獎勵*2（一人一個）
    </div>
  </div>
</template>

<script>
import { Downloader, Parser, Player } from 'svga.lite'

const downloader = new Downloader()
const parser = new Parser({ disableWorker: true })

export default {
  data () {
    return {
      svgaDdress: [
        {
          key: 'bg',
          addres: 'http://fstatic.cat1314.com/uc/svga/40d0317043a7b137bde5ff5b6d20c988_1620787147.svga'
        },
        {
          key: 'lun',
          addres: 'http://fstatic.cat1314.com/uc/svga/7f64bee2fa7ceb89fb8fecc9abe44846_1620787163.svga'
        },
        {
          key: 'deng',
          addres: 'http://fstatic.cat1314.com/uc/svga/b7894ea3832f294ecc35a18be1ac2350_1620787177.svga'
        },
      ]
    }
  },
  mounted () {
    this.downloaderData(this.svgaDdress)
  },
  methods: {
    downloaderData (arr) {
      return new Promise((res, rej) => {
        let PromiseArr = []
        for (let i = 0; i < arr.length; i++) {
          PromiseArr.push(this.loadSvgaData(arr[i]))
        }
        Promise.all(PromiseArr).then((values) => {
          res(values)
          this.svgaGo()
        })
      })
    },
    loadSvgaData (fileItem) {
      return new Promise((resolve, reject) => {
        ; (async () => {
          const fileData = await downloader.get(fileItem.addres);
          const data = await parser.do(fileData);
          fileItem.data = data
          resolve(data);
        })()
      });
    },
    svgaGo () {
      this.svgaStart('bg', 1, true, this.svgaDdress[0].data)  //节点类名,開始幀數,是否开始动画,加载的对应Data
      this.svgaStart('lun', 1, true, this.svgaDdress[1].data)
      this.svgaStart('deng', 1, true, this.svgaDdress[2].data)
    },
    async svgaStart (className, start, isGo, data) {//节点类名,開始幀數,是否开始动画,加载的对应Data
      let canvas = document.getElementById(className)
      let player = new Player(canvas)
      player.set({ startFrame: start })
      if (!isGo && start == 1) {
        player.set({ startFrame: start }) //loop: 1, 
      } else {
        player.set({ startFrame: start })
      }
      //   if (className == 'deng') {
      //     for (let i = 0; i < 14; i++) {
      //       const image = new Image()
      //       image.src = 'http://udatefile.cat1314.com/uc/img/head_1139051_1617266825.png'
      //       data.images[`user${i}`] = image
      //     }
      //   }
      await player.mount(data)
      player.start()
      if (!isGo && start == 1) {
        player.stop()
      }
      //   this.plarerArr[className] = {
      //     player,
      //   }
      //   console.log(this.plarerArr)
    },
  }
}
</script>

<style lang="scss">
.wheel {
  width: 7.5rem;
  position: relative;
  height: 10.5rem;
  overflow: hidden;
  .wheelTips {
    width: 5.17rem;
    height: 1.56rem;
    padding: 0.4rem 1.1rem 0;
    background: url(../img/wheelTips.png);
    background-size: 100% 100%;
    position: absolute;
    left: 0.065rem;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.26rem;
    color: rgba(140, 76, 199, 1);
  }
  #lun {
    width: 6.85rem;
    height: 6.85rem;
    position: absolute;
    top: 0.5rem;
    left: 0.325rem;
  }
  #deng {
    width: 8.55rem;
    height: 7.74rem;
    position: absolute;
    top: 0rem;
    left: -0.5rem;
  }
}
</style>