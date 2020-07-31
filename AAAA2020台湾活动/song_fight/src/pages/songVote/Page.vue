<template>
  <div class="songVote">
    <div class="title"></div>
    <div class="songCon">
      <div class="pkTitle">打擂台</div>
      <div class="sName">《再見只是陌生人》</div>
      <div class="user">
        <div class="userItem">
          <img src="../../assets/img/songAv/1.png" alt="">
          <i class="playIcon"></i>
          <i class="tipIcon"></i>
        </div>
        <span class="vs"></span>
        <div class="userItem">
          <img src="../../assets/img/songAv/1.png" alt="">
          <i class="playIcon"></i>
          <i class="tipIcon"></i>
        </div>
      </div>
      <div class="timebar">
        <div class="actbar" :style="{width:this.now+'%'}">
          <i class="store"></i>
        </div>
        <em class="totalTime">{{maxTime}}</em>
        <em class="nowTime">{{nowTime}}</em>
        <input id="range" type="range" min="0" max="100" step="1" v-model="now" v-on:change="change()">
      </div>
    </div>
  </div>
</template>
<script>
import { Howl, Howler } from 'howler';
export default {
  data() {
    return {
      sounds: ["mp3/0.mp3", "mp3/1.mp3"],
      howl: {},
      howlMsg: {
        0: {},
        1: {}
      },
      nowTime: `00:00`,
      // maxTime: `00:00`,
      now: 0,
      nowIndex: 0,
      timer: null
    }
  },
  computed: {
    nowHowl() {
      return this.howl[this.nowIndex]
    },
    maxTime() {
      if (this.nowHowl) {
        return this.nowHowl.duration()
      }
    }
  },
  created() {
    var rand = Math.floor(Math.random() * (4)) + 1;
    this.init()
  },
  methods: {
    init() {
      var that = this
      this.sounds.forEach((element, index) => {
        (function (element, index) {
          that.howl[index] = new Howl({
            src: [element],
            html5: true,
            onload: function () {
              console.log('load')
              // if (index == that.nowIndex) {
              //   that.maxTime = that.formatDate(this.duration())
              // }
            },
            onplay: function () {
              console.log('play')
            }
          })
        })(element, index)
      })
      this.nowHowl.play()
      this.musicGo()
    },
    musicGo() {
      clearInterval(this.timer)
      this.timer = setInterval(() => {
        // this.listenTime++
        // console.log(this.sound.seek(), this.sound, this.sound.duration())
        console.log(this.nowHowl.seek(), this.nowHowl.playing())
        let seek = this.nowHowl.seek()
        this.now = seek / this.nowHowl.duration() * 100
        if (typeof (seek) == "number") {
          this.nowTime = this.formatDate(seek)
        } else if (this.nowHowl.duration() > 0) {
          this.nowTime = this.formatDate((this.now / 100) * this.nowHowl.duration())
        } else {
          this.nowTime = `00:00`
        }
      }, 1000)
    },
    change() {
      // this.sound.pause()
      clearInterval(this.timer)
      let t = (this.now / 100) * this.nowHowl.duration()
      console.log(t)
      this.nowHowl.seek(t)
      // this.sound.play();
      this.musicGo()  //這裡會重複播放
    },
    formatDate(second) {
      second = Math.round(second)
      var minute = parseInt(second / 60 % 60, 10) < 10 ? '0' + parseInt(second / 60 % 60, 10) : parseInt(second / 60 % 60, 10)
      var second = parseInt(second % 60, 10) < 10 ? '0' + parseInt(second % 60, 10) : parseInt(second % 60, 10)
      return `${minute}:${second}`
    },
  }
}
</script>
<style lang="scss">
body {
  background: rgba(117, 67, 240, 1) url(../../assets/img/htmlBg.png) no-repeat;
  background-size: 100% auto;
  .songVote {
    padding-top: 0.28rem;
    .title {
      width: 4.26rem;
      height: 1.3rem;
      background: url(../../assets/img/songVoteTitle.png);
      background-size: 100% 100%;
      margin: 0 auto;
    }
    .songCon {
      width: 6.16rem;
      height: 7.69rem;
      background: url(../../assets/img/songConBg.png);
      background-size: 100% 100%;
      margin: 0.59rem auto 0;
      .pkTitle {
        height: 0.8rem;
        text-align: center;
        color: rgba(255, 214, 75, 1);
        font-size: 0.36rem;
        line-height: 0.8rem;
        font-weight: bold;
      }
      .sName {
        text-align: center;
        margin-top: 0.5rem;
      }
      .user {
        padding: 0 0.88rem;
        display: flex;
        justify-content: space-between;
        margin-top: 0.75rem;
        .userItem {
          img {
            width: 1.4rem;
            height: 1.21rem;
          }
          .playIcon {
            display: block;
            margin: 0.42rem auto 0;
            width: 0.54rem;
            height: 0.54rem;
            background: url(../../assets/img/sStop.png);
            background-size: 100% 100%;
            &.play {
              background: url(../../assets/img/sPlay.png);
              background-size: 100% 100%;
            }
          }
          .tipIcon {
            display: block;
            margin: 0.15rem auto 0;
            width: 0.42rem;
            height: 0.42rem;
            background: url(../../assets/img/defaultPlaying.png);
            background-size: 100% 100%;
            &.play {
              background: url(../../assets/img/playIng.gif);
              background-size: 100% 100%;
            }
          }
        }
        .vs {
          width: 0.88rem;
          height: 0.65rem;
          background: url(../../assets/img/vs.png);
          background-size: 100% 100%;
          margin-top: 0.3rem;
        }
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
            background: url(../../assets/img/store.png);
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
    }
  }
}
</style>
