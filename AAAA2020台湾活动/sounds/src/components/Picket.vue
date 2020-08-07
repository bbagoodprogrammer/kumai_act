<template>
  <div class="picket">

  </div>
</template>
<script>
import { Howl, Howler } from 'howler';
Howler.autoUnlock = false;
export default {
  //sounds:音樂文件(數組) playIndex 初始播放數組索引  seek 初始播放進度(百分比)  playStatus音樂器播放狀態
  props: ["sounds", "playIndex", "seek", "playStatus"],
  data() {
    return {
      soundHowl: {},
      pIndex: 0
    }
  },
  computed: {
    howl() {
      return this.soundHowl[this.playIndex].howl
    },
    duration() {
      return this.formatDate(this.howl.duration())
    },
  },
  watch: {
    sounds(val) {
      if (Array.isArray(val)) {
        this.init(val)
      } else {
        throw new Error("sounds Not an array");
      }
    },
    playIndex(val) { // 切換其他歌
      this.playIndex = val
    },
    seek(val) {//歌曲進度拖拽
      let t = val * this.duration //百分比乘歌曲時長
      this.howl.seek(t)
    },
  },
  methods: {
    init(sounds) {
      var that = this
      sounds.forEach((element, index) => {
        (function (element, index) {
          let obj = {
            howl: new Howl({
              src: [element.path],
              html5: true,
              onload: function () {
                console.log('load', this)
              },
              onplay: function () {
                console.log('play')
              },
              onend: () => {
                console.log('onend')
              },
            }),
            listenTime: 0,
          }
          that.soundHowl[index] = obj
        })(element, index)
      })
    }
  }
}
</script>
<style lang="scss">
</style>
