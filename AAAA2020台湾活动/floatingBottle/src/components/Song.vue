<template>
  <div class="prizeBox">
    <i class="close" @click="closePrizeBox()"></i>
    <div class="gift" v-if="nowPrize.type == 1">
      <img :src="nowPrize.img" alt="">
      <strong>恭喜你撈到驚喜禮物-{{nowPrize.name}}背包禮物（7）天,已放入背包,請查收~</strong>
    </div>
    <div class="noThing" v-else-if="nowPrize.type == 4">
      <img :src="nowPrize.img" alt="">
      <strong>運氣差了一點點<br />撈到額是碎片瓶子</strong>
    </div>
    <div class="song" v-else-if="nowPrize.type == 2 || nowPrize.type == 3">
      <div class="userMsg">
        <div class="avBox">
          <img v-lazy="nowPrize.avatar" alt="">
          <i @click="follow(nowPrize.attension,index)">{{nowPrize.attension?'已關注':'關注'}}</i>
        </div>
        <div class="userNick">{{nowPrize.nick}}</div>
        <div class="songName">{{nowPrize.name}}</div>
      </div>
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
      <p v-if="showLuckTips">恭喜你獲得{{luckGift}}金豆，獎勵已放入錢包，請注意查收</p>
    </div>
    <button @click="next()"> {{isOver?"完成":"下一個"}}</button>
  </div>
</template>
<script>
import { Howl, Howler } from 'howler';
import { globalBus } from '../utils/eventBus.js'
import api from "../api/apiConfig"
export default {
  props: ["prize"],
  data() {
    return {
      now: 0,
      sound: null,
      timer: null,
      nowTime: `00:00`,
      listenTime: 0,
      index: 0,
      nowPrizeChange: 0,
      key: null,
      luckGift: "",
      showLuckTips: false
    }
  },
  watch: {
    nowPrizeChange() {
      let type = this.nowPrize.type
      if (type == 2 || type == 3) {
        this.init([this.nowPrize.url])
      }
    },
    listenTime(val) {
      console.log(val)
      if (val >= this.luckTime && !this.showLuckTips) {
        api.geiGift(this.nowPrize.tid).then(res => {
          let gift = res.data.response_data
          this.luckGift = `${gift.nums}${gift.type == 2 ? '金豆' : '金幣'}`
          this.showLuckTips = true
        })
      }
    }
  },
  computed: {
    nowPrize() {
      this.nowPrizeChange++
      return this.prize[this.index] ? this.prize[this.index] : this.prize[this.prize.length - 1]
    },
    isOver() {
      return this.index >= this.prize.length - 1
    },
    isLoading() {
      if (this.sound) {
        return this.sound.state()  //unloaded, loading or loaded.
      }
      return `unloaded`
    },
    maxLength() {
      return this.formatDate(this.sound.duration())
    },
    luckTime() {
      if (this.nowPrize.type == 2) {
        return 20
      } else if (this.nowPrize.type == 3) {
        return 30
      }
    }
  },
  methods: {
    init(addres) {
      this.sound = new Howl({
        src: addres,
        onload: () => {
          this.musicGo()
          globalBus.$emit('setBg')
          api.singIng(this.nowPrize.tid).then(res => {
            this.key = res.data.response_data.key
          })
        },
        onloaderror: () => {
          this.toast(`音頻加載失敗，請稍後再試`)
        },
        // onplay: () => {
        //   console.log('onp')
        //   this.musicGo()
        // },
        // onpause: () => {
        //   console.log(`onpause`, this.sound.state())
        // },
        onend: () => {
          clearInterval(this.timer)
        }
      });
    },
    go() {
      if (this.sound.playing()) {
        clearInterval(this.timer)
        this.sound.pause()
      } else {
        this.musicGo()
      }
    },
    musicGo() {
      clearInterval(this.timer)
      this.sound.play();
      this.timer = setInterval(() => {
        this.listenTime++
        let seek = this.sound.seek(this.sound)
        this.now = seek / this.sound.duration() * 100
        this.nowTime = this.formatDate(seek)
      }, 1000)
    },
    next() {
      if ((this.nowPrize.type == 2 || this.nowPrize.type == 3) && this.isLoading == 'loaded') {
        let nowP = this.nowPrize
        let bottle = nowP.tid
        let type = nowP.type
        let h_time = this.listenTime
        let s_key = this.key
        api.singTime(bottle, type, h_time, s_key).then(res => {
          this.key = null
        })
      }
      if (this.isOver) {
        this.closePrizeBox()
      } else {
        this.showLuckTips = false
        if (this.nowPrize.type == 2 || this.nowPrize.type == 3) {
          clearInterval(this.timer)
          this.sound.unload(this.sound)
          this.nowTime = '00:00'
          this.now = 0
          this.listenTime = 0
        }
        this.index++
      }

      // this.init('mp3/CRITTY - 青春不散.mp3')
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
    },
    closePrizeBox() {
      this.$parent.showBottle = false
      globalBus.$emit('setBg')
      if (this.nowPrize.type == 2 || this.nowPrize.type == 3) {
        let nowP = this.nowPrize
        let bottle = nowP.tid
        let type = nowP.type
        let h_time = this.listenTime
        let s_key = this.key
        if (s_key) {
          api.singTime(bottle, type, h_time, s_key).then(res => {
            this.key = null
          })
        }
      }
    },
    follow(status) {
      if (!status) {
        location.href = `focusuid:${uid}`
        let bottle = nowP.tid
        let suid = this.nowPrize.suid
        api.attemsion(bottle, suid).then(res => {
          this.$emit('setFollow')
        })
      }
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
.prizeBox {
  position: relative;
  .close {
    display: block;
    width: 0.5rem;
    height: 0.5rem;
    background: red;
    position: absolute;
    right: 0.1rem;
    top: 0.1rem;
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
}
</style>
