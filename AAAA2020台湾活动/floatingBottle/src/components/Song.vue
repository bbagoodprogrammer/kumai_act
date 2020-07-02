<template>
  <div>
    <p v-if="isLoading!='loaded'">Loading...</p>
    <div class="timerBox" v-else>
      <i class="go" @click="go()"></i>
      <div class="timebar">
        <div class="actbar" :style="{width:this.now+'%'}">
          <i class="store"></i>
        </div>
        <em class="totalTime">{{maxLength}}</em>
        <em class="nowTime">{{nowTime}}</em>
        <input id="range" type="range" min="0" max="100" step="1" v-model="now" v-on:change="change()">
      </div>
    </div>
    <button @click="next()">下一首</button>
    <p>你已經聽了{{listenTime}}秒</p>
  </div>
</template>
<script>
import { Howl, Howler } from 'howler';
export default {
  data() {
    return {
      now: 0,
      sound: null,
      timer: null,
      nowTime: `00:00`,
      listenTime: 0
    }
  },
  created() {
    this.init(['mp3/test.mp3'])
  },
  computed: {
    isLoading() {
      console.log(this.sound)
      return this.sound.state()  //unloaded, loading or loaded.
    },
    maxLength() {
      return this.formatDate(this.sound.duration())
    }
  },
  methods: {
    init(addres) {
      this.sound = new Howl({
        src: addres,
        onload: () => {
          this.musicGo()
        },
        // onplay: () => {
        //   console.log('onp')
        //   this.musicGo()
        // },
        // onpause: () => {
        //   console.log(`onpause`, this.sound.state())
        // },
        // onend: () => {
        //   alert('over')
        // }
      });
    },
    go() {
      if (this.sound.playing()) {
        clearInterval(this.timer)
        this.sound.pause()
        console.log(this.listenTime)
      } else {
        this.musicGo()
      }
    },
    musicGo() {
      clearInterval(this.timer)
      this.sound.play();
      this.timer = setInterval(() => {
        this.listenTime++
        console.log('xxxxx')
        let seek = this.sound.seek(this.sound)
        this.now = seek / this.sound.duration() * 100
        console.log(seek)
        this.nowTime = this.formatDate(seek)
      }, 1000)
    },
    next() {
      clearInterval(this.timer)
      this.sound.unload(this.sound)
      this.nowTime = '00:00'
      this.now = 0
      this.listenTime = 0
      this.init('mp3/CRITTY - 青春不散.mp3')
    },
    change() {
      this.sound.pause()
      clearInterval(this.timer)
      let t = (this.now / 100) * this.sound.duration()
      this.sound.seek(t)
      this.musicGo()  //這裡會重複播放
    },
    formatDate(second) {
      second = Math.round(second)
      var minute = parseInt(second / 60 % 60, 10) < 10 ? '0' + parseInt(second / 60 % 60, 10) : parseInt(second / 60 % 60, 10)
      var second = parseInt(second % 60, 10) < 10 ? '0' + parseInt(second % 60, 10) : parseInt(second % 60, 10)
      return `${minute}:${second}`
    }
  }
}
</script>
<style lang="scss">
.timerBox {
  height: 1rem;
  .go {
    display: block;
    width: 0.5rem;
    height: 0.5rem;
    background: red;
  }
}
.timebar {
  width: 7rem;
  margin: 0 auto;
  position: relative;
  height: 0.1rem;
  background: #ddd;
  border-radius: 0.1rem;
  .actbar {
    position: absolute;
    left: 0;
    height: 0.1rem;
    background: orange;
    border-radius: 0.1rem;
    .store {
      display: block;
      width: 0.3rem;
      height: 0.3rem;
      border-radius: 50%;
      background: #fff;
      position: absolute;
      top: -0.11rem;
      right: -0.15rem;
    }
  }
  .totalTime {
    position: absolute;
    right: 0;
    top: 0.15rem;
  }
  .nowTime {
    position: absolute;
    left: 0;
    top: 0.15rem;
  }
  #range {
    width: 100%;
    opacity: 0;
    height: 0.3rem;
    position: absolute;
    top: -0.13rem;
  }
}
</style>
