<template>
  <div class="prizeBox">
    <em class="prizeNum"> <em class="now">{{nowPrizeChange}}</em>/{{prize.length}}</em>
    <i class="close" @click="closePrizeBox()"></i>
    <div class="gift" v-if="nowPrize.type == 1">
      <div class="imgBox">
        <img src="../assets/img/bottleBg3.png" class="bg" alt="">
        <img :src="nowPrize.img" class="gBt" alt="">
      </div>
      <strong>恭喜你撈到驚喜禮物-{{nowPrize.name}}背包禮物（7）天,已放入背包,請查收~</strong>
    </div>
    <div class="noThing" v-else-if="nowPrize.type == 4">
      <div class="imgBox">
        <img src="../assets/img/noThing.png" alt="">
      </div>
      <strong>運氣差了一點點<br />撈到額是碎片瓶子</strong>
    </div>
    <div class="song" v-else-if="nowPrize.type == 2 || nowPrize.type == 3">
      <div class="userMsg">
        <div class="avBox">
          <img v-lazy="nowPrize.avatar" alt="">
          <i @click="follow(nowPrize.attension,index,nowPrize.suid)" :class="{black:nowPrize.attension}">{{nowPrize.attension?'已關注':'+關注'}}</i>
        </div>
        <div class="userNick">{{nowPrize.nick}}</div>
      </div>
      <div class="songBar">
        <p class="barStatus" v-if="isLoading!='loaded'">Loading...</p>
        <div class="timerBox" v-else>
          <div class="songName">《{{nowPrize.name}}》</div>
          <div class="timebar">
            <div class="actbar" :style="{width:this.now+'%'}">
              <i class="store"></i>
            </div>
            <em class="totalTime">{{maxLength}}</em>
            <em class="nowTime">{{nowTime}}</em>
            <input id="range" type="range" min="0" max="100" step="1" v-model="now" v-on:change="change()">
          </div>
          <i class="go" :class="{stop:isPlay}" @click="go()"></i>
        </div>
      </div>
      <p v-if="!showLuckTips" class="luckTips">恭喜你撈到{{nowPrize.type==2?'普通':'高級'}}瓶子，<br />聽完{{luckTime}}S後有驚喜哦~</p>
      <p v-else class="luckTips">恭喜你獲得{{luckGift}}，獎勵已放入錢包，請注意查收</p>
    </div>
    <span class="next" @click="next()"> {{isOver?"完成":"下一個"}}</span>
  </div>
</template>
<script>
import { Howl, Howler } from 'howler';
import { globalBus } from '../utils/eventBus.js'
import api from "../api/apiConfig"
import { setInterval } from 'timers';
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
      showLuckTips: false,
      getGift: false,
    }
  },
  watch: {
    sound(val) {
      console.log(val)
      setInterval(() => {
        let sing = this.sound.playing()
        console.log(sing)
        if (sing) {
          this.listenTime++
        }
      }, 1000)
    },
    nowPrizeChange() {
      let type = this.nowPrize.type
      if (type == 2 || type == 3) {
        this.init([this.nowPrize.url])
      }
    },
    listenTime(val) {
      console.log(val)
      if (val >= this.luckTime && !this.getGift) {
        console.log('fa', val)
        this.getGift = true
        api.geiGift(this.nowPrize.tid, this.key).then(res => {
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
    },
    isPlay() {
      return this.sound.playing()
    }
  },
  methods: {
    init(addres) {
      this.sound = new Howl({
        src: addres,
        autoplay: true,
        loop: true,
        volume: 0.5,
        onplay: () => {
          this.musicGo()
          if (!this.key) {
            globalBus.$emit('stopBg')
            api.singIng(this.nowPrize.tid).then(res => {
              if (res.data.response_status.code == 0) {
                this.key = res.data.response_data.key
              } else {
                this.toast(res.data.response_status.error)
              }

            })
          }
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
        this.sound.play();
        this.musicGo()
      }
    },
    musicGo() {
      clearInterval(this.timer)
      this.timer = setInterval(() => {
        // this.listenTime++
        let seek = this.sound.seek(this.sound)
        this.now = seek / this.sound.duration() * 100
        this.nowTime = this.formatDate(seek)
      }, 1000)
    },
    next() {
      if ((this.nowPrize.type == 2 || this.nowPrize.type == 3) && this.isLoading == 'loaded') { //如果當前是歌並且加載完
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
        if (this.nowPrize.type == 2 || this.nowPrize.type == 3) {  //如果當前是歌的話重置播放器狀態
          clearInterval(this.timer)
          this.sound.unload()
          this.nowTime = '00:00'
          this.now = 0
          this.listenTime = 0
          this.getGift = false
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
      this.sound.play();
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
      globalBus.$emit('goBg')
      if (this.sound) {
        this.sound.unload()
      }
      if (this.nowPrize.type == 2 || this.nowPrize.type == 3 && this.isLoading == 'loaded') {
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
    follow(status, index) {
      if (!status) {
        let bottle = this.nowPrize.tid
        let suid = this.nowPrize.suid
        api.appAttemsion(suid).then(res => {
          if (res.data.response_data.result) {
            api.attemsion(bottle, suid).then(res => {
              if (res.data.response_status.code == 0) {
                this.$emit('setFollow', index)
              } else {
                this.toast(res.data.response_status.error)
              }
            })
          }
        })
      }
    }
  }
}
</script>
<style lang="scss">
.songBar {
  width: 5.7rem;
  height: 2.58rem;
  background: rgba(180, 110, 82, 0.51);
  border-radius: 0.1rem;
  margin: 0.33rem auto 0;
  padding-top: 0.29rem;
  .timerBox {
    .songName {
      color: #8cfffe;
      font-size: 0.36rem;
      font-weight: 600;
      text-align: center;
    }
    .timebar {
      width: 5.1rem;
      margin: 0.76rem auto 0;
      position: relative;
      height: 0.1rem;
      background: #611300;
      border-radius: 0.1rem;
      .actbar {
        position: absolute;
        left: 0;
        height: 0.1rem;
        background: #ffc900;
        border-radius: 0.1rem;
        .store {
          display: block;
          width: 0.31rem;
          height: 0.31rem;
          border-radius: 50%;
          background: url(../assets/img/store.png);
          background-size: 100% 100%;
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
    .go {
      display: block;
      width: 0.6rem;
      height: 0.6rem;
      background: url(../assets/img/musGo.png);
      background-size: 100% 100%;
      margin: 0.37rem auto 0;
      &.stop {
        background: url(../assets/img/musStop.png);
        background-size: 100% 100%;
      }
    }
  }
  .barStatus {
    text-align: center;
  }
}

.luckTips {
  text-align: center;
  color: #611300;
  font-weight: 600;
  margin-top: 0.2rem;
  padding: 0 0.8rem;
}
.next {
  display: block;
  width: 2.08rem;
  height: 0.68rem;
  background: url(../assets/img/comitBtn.png);
  background-size: 100% 100%;
  text-align: center;
  line-height: 0.68rem;
  color: #ae4800;
  font-weight: 700;
  margin-top: 0.51rem;
  margin: 0.42rem auto 0;
}
.prizeBox {
  position: relative;
  width: 7.17rem;
  height: 8.28rem;
  padding-top: 0.88rem;
  background: url(../assets/img/pupBg.png);
  background-size: 100% 100%;
  position: relative;
  .prizeNum {
    position: absolute;
    top: 1.1rem;
    right: 1.2rem;
    color: #611300;
    font-weight: 600;
    .now {
      color: #fff;
    }
  }
  .close {
    width: 0.75rem;
    height: 0.75rem;
    background: url(../assets/img/close.png);
    background-size: 100% 100%;
    position: absolute;
    right: 0.3rem;
    top: 0.1rem;
  }
  .gift {
    width: 4.01rem;
    padding-top: 0.62rem;
    margin: 0 auto;
    .imgBox {
      width: 4.01rem;
      height: 4.01rem;
      position: relative;
      img {
        position: absolute;
        &.bg {
          width: 4.01rem;
          height: 4.01rem;
          animation: turn 6s linear infinite;
        }
        &.gBt {
          width: 1.55rem;
          height: 1.59rem;
          top: 1.12rem;
          left: 1.14rem;
        }
      }
    }
    strong {
      display: block;
      font-weight: 600;
      color: #611300;
      text-align: center;
    }
  }
  .noThing {
    .imgBox {
      width: 4.01rem;
      height: 3.39rem;
      background: url(../assets/img/bottleBg3.png);
      background-size: 100% 100%;
      padding-top: 0.62rem;
      margin: 0 auto;
      img {
        width: 1.53rem;
        height: 2.71rem;
        display: block;
        margin: 0 auto;
      }
    }
    strong {
      display: block;
      font-weight: 600;
      color: #611300;
      text-align: center;
    }
  }
  .song {
    .userMsg {
      .avBox {
        width: 1.06rem;
        height: 1.06rem;
        margin: 0 auto;
        position: relative;
        img {
          width: 1.06rem;
          height: 1.06rem;
          border-radius: 50%;
          border: 0.03rem solid #e5775c;
        }
        i {
          position: absolute;
          bottom: -0.2rem;
          left: -0.03rem;
          display: block;
          width: 1.21rem;
          height: 0.49rem;
          background: url(../assets/img/ast.png);
          background-size: 100% 100%;
          text-align: center;
          line-height: 0.49rem;
          font-size: 0.22rem;
          font-weight: 500;
          &.black {
            background: url(../assets/img/bast.png);
            background-size: 100% 100%;
          }
        }
      }
      .userNick {
        text-align: center;
        color: #611300;
        font-weight: 0.24rem;
        font-weight: 600;
        margin-top: 0.3rem;
      }
    }
  }
}
</style>
