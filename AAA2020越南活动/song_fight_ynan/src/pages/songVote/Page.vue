<template>
  <div class="songVote" @click="closeMusic()">
    <div class="title"></div>
    <div class="songCon">
      <div class="pkTitle">Tham gia</div>
      <div class="errorTips" v-if="errorTips != ''" v-html="errorTips"></div>
      <div class="con" v-else>
        <div class="sName">《{{sounds[0]?sounds[0].name:''}}》</div>
        <div class="user" :class="{chioneState:chioneState}">
          <div class="userItem" v-if="!chioneState || (chioneState&& chioneIndex == 0)">
            <img :src="require(`../../assets/img/songAv/${randAv1}.png`)" alt="" v-if="!chioneState">
            <div class="imgBox" v-else>
              <span class="ligt"></span>
              <img v-lazy="chioneUserMsg.userinfo.avatar" alt="">
              <div class="nick"> <strong>{{chioneUserMsg.userinfo.nick}}</strong> <em>Lv.{{chioneUserMsg.userinfo.star}}</em> </div>
            </div>
            <i class="playIcon" :class="{stop:nowIndex == 0 && isPlay}" @click="go(0)"></i>
            <i class="tipIcon" :class="{play:nowIndex == 0 && isPlay}"></i>
          </div>
          <span class="vs" v-if="!chioneState"></span>
          <div class="userItem" v-if="!chioneState ||(chioneState&& chioneIndex == 1) ">
            <img :src="require(`../../assets/img/songAv/${randAv2}.png`)" alt="" v-if="!chioneState">
            <div class="imgBox" v-else>
              <span class="ligt"></span>
              <img v-lazy="chioneUserMsg.userinfo.avatar" alt="">
              <div class="nick"> <strong>{{chioneUserMsg.userinfo.nick}}</strong> <em>Lv.{{chioneUserMsg.userinfo.star}}</em> </div>
            </div>
            <i class="playIcon" :class="{stop:nowIndex == 1 && isPlay}" @click="go(1)"></i>
            <i class="tipIcon" :class="{play:nowIndex == 1 && isPlay}"></i>
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
        <div class="chioneBtn">
          <div class="chioneItem" v-if="!chioneState">
            <span @click="chione(0)">Chọn người thắng</span>
            <span @click="chione(1)">Chọn người thắng</span>
          </div>
          <div class="chioneUserBtn" v-else>
            <i class="comments" @click="comments(chioneUserMsg.sid)"></i>
            <span @click="attention(chioneUserMsg.uid,chioneUserMsg.attension)"> {{chioneUserMsg.attension?'Đã quan tâm':'+Quan tâm'}}</span>
            <i class="share" @click="share()"></i>
          </div>
        </div>
      </div>
    </div>
    <div class="chioneChange">
      <div class="next" @click="clearHowl()" v-if="chioneState">Nhóm kế tiếp></div>
      <p class="chioneTips">
        Nhấn nghe để nghe bài dự thi, nghe mỗi bài 10 giây và chọn 1 bài thắng<br />
        2、Mỗi giám khảo mỗi ngày chấm điểm 30 nhóm đầu, mỗi nhóm được thưởng 2 đậu.<br />
        3、Mỗi kỳ liên tục chọn trúng 8 nhóm có thể nhận ngẫu nhiên 1 túi quà Hộp Nhạc (360 đậu)/Túi quà Kẹo Bông (1 xu)/VIP 2 ngày/Chiến Đấu Cơ (2 ngày)
      </p>
    </div>
    <loading />
  </div>
</template>
<script>
import { Howl, Howler } from 'howler';
import loading from "../../components/Loading"
import api from "../../api/apiConfig"
import getString from "../../utils/getString"
Howler.autoUnlock = false;
export default {
  components: { loading },
  data() {
    return {
      // "mp3/0.mp3", "mp3/1.mp3"
      sounds: [],
      howl: {
        0: {
        },
        1: {
        }
      },
      nowTime: `00:00`,
      // maxTime: `00:00`,
      now: 0,
      nowIndex: 0,
      timer: null,
      giftTimer: null,
      isPlay: false,
      chioneState: null,
      chioneIndex: null,
      errorTips: '',
      pk: null,
      chioneUserMsg: {},
      randAv1: 1,
      randAv2: 2,
      ready: 0,
      nowHowl: null,
      listenTime1: 0,
      listenTime2: 0
    }
  },
  computed: {
    // nowHowl() {
    //   return this.howl[this.nowIndex].howl
    // },
    maxTime() {
      if (this.nowHowl) {
        return this.formatDate(this.nowHowl.duration())
      }
    },
    playing() {
      if (this.nowHowl) {
        return this.nowHowl.playing()
      }
    },
  },
  watch: {
    // nowIndex(val) {
    //   clearInterval(this.timer)
    //   this.nowHowl.play()
    //   this.musicGo()
    // }
  },
  created() {
    document.title = 'Tham gia'
    sessionStorage.setItem("need-refresh", true);
    this.setData()
  },
  methods: {
    init(next) {
      this.setAv()
      var that = this
      // if (next) {
      //   this.sconedTime()
      // }
      // this.sounds.forEach((element, index) => {
      //   (function (element, index) {
      //     let obj = {
      //       howl: new Howl({
      //         src: [element.path],
      //         html5: true,
      //         onload: function () {
      //           console.log('load', this)
      //         },
      //         onplay: function () {
      //           console.log('play')
      //         },
      //         onend: () => {
      //           that.isPlay = false
      //           console.log('onend')
      //         },
      //       }),
      //       listenTime: 0
      //     }
      //     that.howl[index] = obj
      //   })(element, index)
      // })
      this.howl[0] = {
        howl: new Howl({
          src: [this.sounds[0].path],
          html5: true,
          onload: function () {
            setTimeout(() => {
              that.ready++
            }, 300)

            console.log('load', this)
          },
          onplay: function () {
            console.log('play')
          },
          onend: () => {
            that.isPlay = false
            console.log('onend')
          },

        }),
      }
      this.howl[1] = {
        howl: new Howl({
          src: [this.sounds[1].path],
          html5: true,
          onload: function () {
            setTimeout(() => {
              that.ready++
            }, 300)
            console.log('load', this)
          },
          onplay: function () {
            console.log('play')
          },
          onend: () => {
            that.isPlay = false
            console.log('onend')
          },
        }),
      }
      // new Howl({
      //   src: [element.path],
      //   html5: true,
      //   onload: function () {
      //     console.log('load', this)
      //   },
      //   onplay: function () {
      //     console.log('play')
      //   },
      //   onend: () => {
      //     that.isPlay = false
      //     console.log('onend')
      //   },
      // }),
      console.log(this.howl)
      this.nowHowl = this.howl[0].howl
      // this.nowHowl.play()
      this.musicGo()
      // this.ready = true
    },
    setAv() {
      this.randAv1 = Math.floor(Math.random() * (4)) + 1;
      this.randAv2 = Math.floor(Math.random() * (4)) + 1;
      if (this.randAv2 === this.randAv1) {
        if (this.randAv2 == 4) {
          this.randAv2 = 1
        } else {
          this.randAv2++
        }
      }
    },
    setData(val) {
      api.getWork().then(res => {
        // console.log(res.data.response_status.code)
        if (res.data.response_status.code == 0) {
          this.sounds = res.data.response_data.data.song
          this.pk = res.data.response_data.data.pk
          this.init(val)
          this.sconedTime()
        } else {
          this.errorTips = res.data.response_status.error.replace(',', '<br/>')
        }
      })
    },
    musicGo() {
      clearInterval(this.timer)
      this.timer = setInterval(() => {
        // console.log(this.sound.seek(), this.sound, this.sound.duration())
        if (this.nowIndex == 0) {
          this.howl[1].howl.pause()
        } else {
          this.howl[0].howl.pause()
        }
        //  console.log(this.nowHowl.seek(), this.nowIndex) // this.nowHowl.duration(), this.nowHowl.playing()
        let seek = this.nowHowl.seek()
        // console.log(this.nowHowl, this.nowIndex)]
        this.now = seek / this.nowHowl.duration() * 100
        if (typeof seek === "number") {
          this.nowTime = this.formatDate(seek)
        } else if (this.nowHowl.duration() > 0) {
          this.nowTime = this.formatDate((this.now / 100) * this.nowHowl.duration())
        } else {
          console.log(this.nowHowl.seek().seek())
          this.nowTime = `00:00`
        }
      }, 1000)
    },
    change() {
      // this.sound.pause()
      clearInterval(this.timer)
      let t = (this.now / 100) * this.nowHowl.duration()
      this.nowHowl.seek(t)
      //this.sound.play();
      this.musicGo()  //這裡會重複播放
    },
    go(index) {
      // alert(index)
      // alert(index, this.nowIndex)
      // if (this.ready != 2) {
      //   this.toast('資源未加載完成，請稍後再試！')
      //   return
      // }
      if (index == this.nowIndex) {
        this.isPlay = !this.isPlay
        if (this.playing) {
          clearInterval(this.timer)
          this.nowHowl.pause()
        } else {
          this.nowHowl.play();
          this.musicGo()
        }
      } else {
        this.nowHowl.pause()
        this.isPlay = true
        this.nowIndex = index
        // setTimeout(() => {
        // clearInterval(this.timer)
        this.nowHowl = this.howl[index].howl
        this.nowHowl.play()
        this.musicGo()
        // }, 0)

      }
    },
    chione(val) {
      console.log(this.listenTime1, this.listenTime2)
      if (this.listenTime1 < 10 && this.listenTime2 < 10) {
        this.toast(`Mỗi người phải nghe đủ 10 giây mới được bỏ phiếu, 2 người chưa nghe đủ 10 giây.`)
      } else if (this.listenTime1 < 10) {
        this.toast(`Mỗi người phải nghe đủ 10 giây mới được bỏ phiếu, người bên trái chưa nghe đủ 10 giây.`)
      } else if (this.listenTime2 < 10) {
        this.toast(`Mỗi người phải nghe đủ 10 giây mới được bỏ phiếu, người bên phải chưa nghe đủ 10 giây. `)
      } else {
        api.selectWork(this.pk, this.sounds[val].id).then(res => {
          if (res.data.response_status.code == 0) {
            this.chioneUserMsg = res.data.response_data.data
            // console.log(this.chioneUserMsg)
            this.chioneState = true
            this.chioneIndex = val
            if (val != this.nowIndex) {
              this.nowHowl.pause()
              this.isPlay = true
              this.nowIndex = val
              setTimeout(() => {
                clearInterval(this.timer)
                this.nowHowl = this.howl[val].howl
                this.nowHowl.play()
                this.musicGo()
              }, 0)
            }
          } else {
            this.toast(res.data.response_status.error)
          }
        })
      }
    },
    sconedTime() {
      clearInterval(this.giftTimer)
      let lastSeek = 0
      let sing = null
      let seek = 0
      this.giftTimer = setInterval(() => {
        lastSeek = seek
        sing = this.playing
        seek = this.nowHowl.seek()
        if (sing && lastSeek != seek) {
          if (this.nowIndex == 0) {
            this.listenTime1 += 0.2
          } else {
            this.listenTime2 += 0.2
          }
        }
      }, 200)
    },
    clearHowl() {  //請求下一對,重置狀態
      this.nowHowl.stop()
      for (let i in this.howl) {
        this.howl[i].howl.unload()
      }
      clearInterval(this.timer)
      clearInterval(this.giftTimer)
      this.chioneState = null
      this.chioneIndex = null
      this.nowIndex = 0
      this.now = 0
      this.nowTime = `00:00`
      this.listenTime2 = 0
      this.listenTime1 = 0
      this.isPlay = false
      this.ready = 0
      this.setData('next')
    },
    formatDate(second) {
      second = Math.round(second)
      var minute = parseInt(second / 60 % 60, 10) < 10 ? '0' + parseInt(second / 60 % 60, 10) : parseInt(second / 60 % 60, 10)
      var second = parseInt(second % 60, 10) < 10 ? '0' + parseInt(second % 60, 10) : parseInt(second % 60, 10)
      if (minute) {
        return `${minute}:${second}`
      }
      return `00:00`
    },
    comments(sid) {
      location.href = 'songid:{"songlist":[' + sid + ' ],"index":0}';
    },
    attention(uid, type) {
      if (type) { return }
      api.appAttemsion(uid).then(res => {
        if (res.data.response_data) {
          this.chioneUserMsg.attension = true
        } else {
          this.toast(res.data.response_status.error)
        }
      })
    },
    share() {
      var ios = navigator.userAgent.match(/iPhone|iPod|ios|iPad/i);
      let uid = getString('uid')
      // console.log(this.chioneUserMsg)
      var data = {
        "share_title": this.chioneUserMsg.song.name,
        "share_content": this.chioneUserMsg.song.desc,
        "share_image": this.chioneUserMsg.userinfo.avatar,
        "link": `http://17sing.tw/share_song_new/index.php?sid=${this.chioneUserMsg.sid}&selfUid=${uid}&app=Gaoge`,
        "image": this.chioneUserMsg.userinfo.avatar,
        "share_url": `http://17sing.tw/share_song_new/index.php?sid=${this.chioneUserMsg.sid}&selfUid=${uid}&app=Gaoge`
      }
      if (ios) {
        if (window.share != undefined) {
          share(JSON.stringify(data))
        } else {
          location.href = `shareUserInfo://17sing.tw/share_song_new/index.php?sid=${this.chioneUserMsg.sid}&selfUid=${uid}&app=Gaoge&shareText=${this.chioneUserMsg.desc}&userImg=${this.chioneUserMsg.userinfo.avatar}&title=${this.chioneUserMsg.song.name}`;
        }
      } else {
        javascript: JSInterface.share(JSON.stringify(data));
      }
    },
    closeMusic() {
      var ios = navigator.userAgent.match(/iPhone|iPod|ios|iPad/i);
      //停止原生APP歌曲播放
      if (ios) {
        try {
          closeMusic();
        } catch (e) {

        }
      } else {
        try {
          javascript: JSInterface.closeMusic();
        } catch (e) {

        }
      }
    }
  },
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
    .errorTips {
      padding: 0 0.3rem;
      line-height: 0.4rem;
      margin-top: 1.7rem;
      text-align: center;
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
        justify-content: center;
        margin-top: 0.75rem;
        &.chioneState {
          margin-top: 0;
        }
        .userItem {
          > img {
            width: 1.4rem;
            height: 1.21rem;
          }
          .imgBox {
            width: 2.01rem;
            height: 2.04rem;
            position: relative;
            .ligt {
              display: block;
              width: 100%;
              height: 100%;
              background: url(../../assets/img/ligt.png);
              background-size: 100% 100%;
              animation: heartbeat 2s linear infinite;
              position: absolute;
            }
            img {
              width: 1rem;
              height: 1rem;
              border-radius: 50%;
              position: absolute;
              top: 0.5rem;
              left: 0.5rem;
            }
            .nick {
              display: flex;
              text-align: center;
              justify-content: center;
              align-items: center;
              position: absolute;
              bottom: 0;
              left: -0.8rem;
              white-space: nowrap;
              strong {
                width: 2rem;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
              }
              em {
                display: inline-block;
                vertical-align: bottom;
                font-size: 0.24rem;
                width: 0.81rem;
                height: 0.33rem;
                background: rgba(251, 162, 91, 1);
                border-radius: 0.1rem;
                text-align: center;
                line-height: 0.4rem;
                margin-left: 0.11rem;
              }
              .star {
                width: 0.33rem;
                height: 0.31rem;
                background: url(../../assets/img/star.png);
                background-size: 100% 100%;
                margin: 0 0.04rem;
              }
            }
          }
          .playIcon {
            display: block;
            margin: 0.42rem auto 0;
            width: 0.54rem;
            height: 0.54rem;
            background: url(../../assets/img/sPlay.png);
            background-size: 100% 100%;
            &.stop {
              background: url(../../assets/img/sStop.png);
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
          margin: 0.3rem 0.4rem 0;
        }
      }
      .timebar {
        margin: 0.56rem auto 0;
        position: relative;
        width: 2.39rem;
        height: 0.04rem;
        background: rgba(0, 0, 0, 0.2);
        border-radius: 0.02rem;
        .actbar {
          position: absolute;
          left: 0;
          height: 0.04rem;
          background: rgba(255, 248, 51, 1);
          border-radius: 0.1rem;
          .store {
            display: block;
            width: 0.31rem;
            height: 0.31rem;
            border-radius: 50%;
            background: url(../../assets/img/store.png);
            background-size: 100% 100%;
            position: absolute;
            top: -0.13rem;
            right: -0.15rem;
          }
        }
        .totalTime {
          position: absolute;
          right: -0.75rem;
          top: -0.12rem;
          color: rgba(191, 166, 255, 1);
          font-size: 0.22rem;
        }
        .nowTime {
          position: absolute;
          left: -0.8rem;
          top: -0.13rem;
          color: rgba(191, 166, 255, 1);
          font-size: 0.22rem;
        }
        #range {
          width: 100%;
          opacity: 0;
          height: 0.3rem;
          position: absolute;
          top: -0.13rem;
        }
      }
      .chioneBtn {
        padding: 0.45rem;
        margin-top: 0.2rem;
        .chioneItem,
        .chioneUserBtn {
          display: flex;
          align-items: center;
          justify-content: space-between;
          i {
            width: 0.66rem;
            height: 0.74rem;
            text-align: center;
            line-height: 0.74rem;
            font-size: 0.24rem;
            &.comments {
              margin-left: 0.24rem;
              background: url(../../assets/img/comments.png);
              background-size: 100% 100%;
            }
            &.share {
              margin-right: 0.24rem;
              background: url(../../assets/img/share.png);
              background-size: 100% 100%;
            }
          }
          span {
            width: 2.24rem;
            height: 0.74rem;
            background: url(../../assets/img/ok.png);
            background-size: 100% 100%;
            text-align: center;
            line-height: 0.74rem;
            color: rgba(174, 72, 0, 1);
            font-weight: bold;
          }
        }
      }
    }
    .chioneChange {
      margin-top: 0.87rem;
      .next {
        width: 0.9rem;
        margin: 0 auto;
        text-align: center;
        color: RGBA(194, 179, 247, 1);
        white-space: nowrap;
      }
      .chioneTips {
        font-size: 0.24rem;
        padding: 0 0.67rem;
        margin-top: 0.6rem;
        line-height: 0.4rem;
      }
    }
  }
}
</style>
