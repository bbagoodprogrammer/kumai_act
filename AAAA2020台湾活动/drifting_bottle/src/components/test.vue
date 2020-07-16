<template>
  <div>

  </div>
</template>
<script>
import { Howl, Howler } from 'howler';
export default {
  data() {
    return {
      sound: null
    }
  },
  created() {
    this.giftTimer = setInterval(() => {
      let sing = this.sound.playing()
      console.log(sing)
      if (sing) {
        this.listenTime += 0.2
      }
    }, 1000)
    this.sound = new Howl({
      src: ['http://song.17sing.tw/uc/song/100904_1594637293.mp3'],
      autoplay: true,
      html5: true,
      preload: 'metadata',
      loop: true,
      volume: 0.5,
      onplay: () => {
        console.log('onplay')
        // this.musicGo()
        // if (!this.key) {
        //   api.singIng(this.nowPrize.tid).then(res => {
        //     // if (res.data.response_status.code == 0) {
        //     this.key = res.data.response_data.key
        //     // } else {
        //     //   this.toast(res.data.response_status.error)
        //     // }
        //   })
        // }
      },
      onpause: () => {
        console.log('onpause')
      },
      onend: () => {
        console.log('onend')
      },
      onstop: () => {
        console.log('onstop')
      },
      onmute: () => {
        console.log('onmute')
      },
      onrate: () => {
        console.log('onrate')
      },
      onseek: () => {
        console.log('onseek')
      },
      onfade: () => {
        console.log('onfade')
      },
      onunlock: () => {
        console.log('onunlock')
      },
      onplayerror: () => {
        console.log('onplayerror')
      },
      onloaderror: () => {
        console.log('onloaderror')
      },
      onplayerror: () => {
        console.log('onplayerror')
      },
      onfade: () => {
        console.log('onfade')
      }
    })
  }
}
</script>