<template>
  <div class="wishHistory">
    <div class="historyCon">
      <i class="close" @click="closePup()"></i>
      <div class="imgbox" :class="{nv:userMsgState.sex == 1}">
        <img v-lazy="userMsgState.avatar" alt="">
      </div>
      <div class="userMsg">
        <div class="name">{{userMsgState.nick}}</div>
        <div class="finished">Menyelesaikan keinginan：{{history1.finished}}</div>
        <div class="sent">Kirim keinginan:{{history1.sent}}</div>
      </div>
      <div class="tabs">
        <span v-for="(item,index) in tabArr" :key="index" @click="changTab(index)" :class="{active:showCom == 'History'+ ++index}">{{item.name}}</span>
      </div>
      <div class="showComBox">
        <keep-alive>
          <component :is="showCom"></component>
        </keep-alive>
        <audio :src="currentSong" autoplay="" @ended="stopMus()" id="audio" controls></audio>
      </div>
      <transition name="slide">
        <msg-toast :msg="tastMsg" @closeToast="closeToast()" v-show="showT"></msg-toast>
      </transition>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import { globalBus } from "../utils/eventBus"
import api from '../api/apiConfig'
import History1 from './History1'
import History2 from './History2'
import History3 from './History3'
import MsgToast from "../components/commonToast"
export default {
  components: { History1, History2, History3, MsgToast },
  data() {
    return {
      tabArr: [
        { name: 'Sudah selesai' },
        { name: 'Belum selesai' },
        { name: 'Keinginan diambil' }
      ],
      showCom: 'History1',
      currentSong: '',
      auidoSong_id: '',
      isPlaying: false,
      showT: false,  //提示弹窗显示
      tastMsg: "提示信息",  //基础弹窗提示信息
    }
  },
  computed: {
    ...mapState(['userMsgState', 'history1', 'history2', 'history3'])
  },
  created() {
    globalBus.$on('getTarget', val => {
      this.setAudio(val.path, val.songId)
    });
  },
  methods: {
    changTab(val) {
      if (val == 1) {
        this.showCom = 'History' + val
      } else if (val == 2 && !this.history2.list) {
        api.wishHistory('waiting', 0).then((res) => {
          if (res.data.response_status.code === 0) {
            this.$store.commit('changHistory2', res.data.response_data)
            this.showCom = 'History' + val
          }
        })
      } else if (val == 3 && !this.history3.list) {
        api.wishHistory('took', 0).then((res) => {
          if (res.data.response_status.code === 0) {
            this.$store.commit('changHistory3', res.data.response_data)
            this.showCom = 'History' + val
          }
        })
      } else {
        this.showCom = 'History' + val
      }
    },
    setAudio(path, songId) {
      if (path == '') {
        this.showT = true
        this.tastMsg = 'lagu ini udah dihapus'
        return
      }
      if (this.auidoSong_id == '' && !this.isPlaying) { //第一次播放
        this.currentSong = path
        this.auidoSong_id = songId
        this.play()
      } else if (this.auidoSong_id == songId && !this.isPlaying) { //继续播放
        this.play()
      } else if (this.auidoSong_id == songId && this.isPlaying) { //暂停
        this.stop()
      } else if (this.auidoSong_id !== songId) { //点击其他首歌曲
        this.currentSong = path
        this.auidoSong_id = songId
        var audio = document.querySelector('#audio');
        audio.currentTime = 0;
        this.play()
      }
    },
    play() {
      var audio = document.querySelector('#audio');
      if (!this.isPlaying) {
        audio.play();
        this.isPlaying = true;
      }
    },
    stop() {
      var audio = document.querySelector('#audio');
      if (this.isPlaying) {
        audio.pause();
        this.isPlaying = false
        // audio.currentTime = 0;
      }
    },
    stopMus() {
      this.isPlaying = false;
      audio.currentTime = 0;
    },
    closePup() {
      this.auidoSong_id = ''
      this.isPlaying = false
      this.$store.commit('changHistory1', {})
      this.$store.commit('changHistory2', {})
      this.$store.commit('changHistory3', {})
      this.$emit('closePup')
    },
    closeToast() {
      this.showT = false
    }
  }
}
</script>
<style lang="scss">
.wishHistory {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: #2d0080;
  z-index: 30;
  #audio {
    display: none;
  }
  .historyCon {
    width: 6.32rem;
    height: 8.08rem;
    padding: 1.76rem 0.29rem 0;
    background: url(../assets/img/historyBg.png);
    background-size: 100% 100%;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    .close {
      display: block;
      width: 0.51rem;
      height: 0.51rem;
      opacity: 0.6;
      background: url(../assets/img/close.png);
      background-size: 100% 100%;
      position: absolute;
      top: 1.3rem;
      right: 0.34rem;
    }
    .imgbox {
      width: 1.8rem;
      height: 1.8rem;
      margin: -0.3rem 0.28rem 0 0.17rem;
      background: url(../assets/img/nanBg.png);
      background-size: contain;
      position: absolute;
      left: 2.5rem;
      top: 0.3rem;
      &.nv {
        background: url(../assets/img/nvBg.png);
        background-size: 100% 100%;
      }
      img {
        width: 1.55rem;
        height: 1.55rem;
        margin: 0.13rem;
        border-radius: 50%;
      }
    }
    .userMsg {
      text-align: center;
      .name {
        font-size: 113%;
        color: #fffde3;
      }
      .finished {
        font-size: 80%;
        color: #00ffde;
        margin-top: 0.1rem;
      }
      .sent {
        font-size: 80%;
        color: #00ffde;
        margin-top: 0.1rem;
      }
    }
    .tabs {
      font-size: 70%;
      color: #f6ceff;
      display: flex;
      justify-content: space-between;
      padding: 0 0.27rem;
      margin-top: 0.1rem;
      span {
        display: inline-block;
        width: 1.73rem;
        height: 0.52rem;
        background: #a739da;
        line-height: 0.52rem;
        text-align: center;
        border: 0.02rem solid rgba(187, 129, 251, 1);
        border-radius: 0.26rem;
        white-space: nowrap;
        &.active {
          //   border: 0.03rem solid #ddd;
          background-image: linear-gradient(
            0deg,
            rgba(168, 43, 255, 1) 34%,
            rgba(170, 101, 255, 1) 100%
          );
          //   border-image: linear-gradient(
          //       200deg,
          //       rgba(255, 148, 231, 1),
          //       rgba(118, 202, 255, 1)
          //     )
          //     10 10;
          border-radius: 0.32rem;
        }
      }
    }
  }
}
</style>
