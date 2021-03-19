<template>
  <div class="page pageIndex">
    <div class="header"></div>
    <div class="con" :style="{minHeight:viewHeight+'px'}">
      <div class="play_all">
        <div class="play_con" @click="playAll()">
          <i class="playIcon"></i>
          <div class="songNums">
            <span>播放全部</span>
            <strong>({{list.length}})</strong>
          </div>
        </div>
        <div class="collection" @click="showHotSong = true"></div>
      </div>
      <ul>
        <li v-for="(item,index) in list" :key="index">
          <div class="songMsg">
            <div class="songCover">
              <i class="mv">{{songType[item.sinfo.type]}}</i>
              <i class="song_play" @click="playSong(item.sinfo.path,item.sid,index,'not_all')" :class="{stop:playIng && songIndex == index}"></i>
              <span class="songNums"><i></i><em>{{item.sinfo.listen}}</em></span>
              <img :src="item.sinfo.cover" alt="" class="cover">
            </div>
            <div class="songName">曲目《{{item.sinfo.name}}》 <img src="../img/ktving.gif" alt="" class="ktving" v-if="playIng && songIndex == index"></div>
          </div>
          <div class="songReason">
            <div class="title">推荐理由</div>
            <div class="msg">
              {{item.mark}}
            </div>
          </div>
          <div class="user">
            <div class="uerImg" @click="goUser(item.uid)">
              <img v-if="item.uinfo.avatar_frame &&item.uinfo.avatar_frame != ''" :src="item.uinfo.avatar_frame" class="frame" alt="">
              <img v-lazy="item.uinfo.avatar" alt="" class="av">
            </div>
            <strong class="nick">{{item.uinfo.nick}}</strong>
            <span class="collection2">
              <em v-if="!item.attension" @click="attem(item.uinfo.uid,index)">+關注</em>
              <em v-else>已關注</em>
            </span>
          </div>
        </li>
      </ul>
    </div>
    <!-- controls="controls" -->
    <!-- <audio :src="currentSong" @timeupdate="updata()" ref="audio" id="audio" controls></audio> -->
    <audio :src="currentSong" autoplay="" @ended="stopMus()" id="audio" ref="audio"></audio>
    <div class="mask2" v-show="showHotSong" @click="showHotSong = false"> </div>
    <transition name="moveR">
      <div class="hot_song" v-show="showHotSong">
        <div class="selectAll">
          <div class="selectBtn" @click="selectSongAll()">
            <i class="set_icon" :class="{act:allStatus}"></i>
            <em>全選</em>
          </div>
          <div class="cancel" @click="showHotSong = false">取消</div>
        </div>
        <ul class="hotSong">
          <li v-for="(item,index) in list " :key="index" @click="selectSong(index)">
            <i class="set_icon" :class="{act:item.collect || item.act}"></i>
            <div class="songMsg">
              <div class="songName">曲目:《{{item.sinfo.name}}》</div>
              <div class="songUser">
                <div class="nick">{{item.uinfo.nick}}</div>
                <div class="uid">UID{{item.uinfo.uid}}</div>
              </div>
            </div>
          </li>
        </ul>
        <div class="act_btm" @click="addCollect()">
          <i></i>
          <em>添加歌曲到我的收藏</em>
        </div>
      </div>
    </transition>
    <div class="mask" v-show="showAccSuc">
      <transition name="slide">
        <div class="accSuc" v-show="showAccSuc">
          <div class="title"> {{sucType?'添加成功':'添加失敗'}}</div>
          <div class="msg" v-if="sucType">
            所選曲目已成功添加到我的收藏，<br />
            可在我的——收藏中查看
          </div>
          <div class="msg" v-else>
            還沒有選擇歌曲,無法添加
          </div>
          <div class="ok" @click="showAccSuc = false">我知道啦</div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>

import { mapState } from "vuex"
import { linsten, hearBottle, appAttemsion, collectSong, } from "../apis"
import store from "../store"
export default {
  data () {
    return {
      showHotSong: false,
      songIndex: -1,
      playIng: false,
      listenSecond: 0,
      auidoSong_id: 0,
      currentSong: '',
      song_key: '',
      isAllPlay: false,
      showAccSuc: false,
      songType: {
        1: '獨唱',
        2: '獨唱',
        3: 'mv',
        4: 'mv'
      },
      sucType: true
    }
  },
  mounted () {
    this.sconedTime()
  },
  computed: {
    ...mapState(['list']),
    viewHeight: () => window.innerHeight,
    audio () {
      return this.$refs.audio
    },
    now_song () {
      return this.list[this.songIndex] ? this.list[this.songIndex].sinfo : {}
    },
    allStatus () {  //是否全部選中
      for (let i = 0; i < this.list.length; i++) {
        if (this.list[i].collect) {
          continue
        }
        if (!this.list[i].act) {
          return false
        }
      }
      return true
    },
    allSet () {  //是否全部收藏
      for (let i = 0; i < this.list.length; i++) {
        if (!this.list[i].collect) {
          return false
        }
      }
      return true
    },
    allItmeSet () {  //是否有选中的歌曲
      for (let i = 0; i < this.list.length; i++) {
        if (this.list[i].act && !this.list[i].collect) {
          return true
        }
      }
      return false
    }
  },
  methods: {
    playSong (path, songId, index, not_all) {
      this.songIndex = index
      if (this.auidoSong_id == '' && !this.playIng) { //第一次播放
        this.currentSong = path
        this.auidoSong_id = songId
        this.startListen(songId)
        this.play()
        this.isAllPlay = false
      } else if (this.auidoSong_id == songId && !this.playIng) { //继续播放
        this.play()
      } else if (this.auidoSong_id == songId && this.playIng) { //暂停
        this.stop()
      } else if (this.auidoSong_id !== songId) { //点击其他首歌曲
        this.isAllPlay = false
        this.endListen(this.auidoSong_id, this.song_key)
        this.currentSong = path
        this.auidoSong_id = songId
        this.listenSecond = 0
        this.play()
      }
    },
    updata () {
      console.log(this.audio.duration, this.audio.currentTime, this.audio.readyState)
    },
    sconedTime () {
      clearInterval(this.giftTimer)
      let lastSeek = 0
      let seek = 0
      setInterval(() => {
        lastSeek = seek
        seek = this.audio.currentTime
        if (this.playIng && lastSeek != seek) {
          this.listenSecond += 0.2
          console.log(this.listenSecond)
        }
      }, 200)
    },
    play () {
      var audio = document.querySelector('#audio');
      console.log(audio)
      if (!this.playIng) {
        audio.play();
        this.playIng = true;
      }
    },
    stop () {
      var audio = document.querySelector('#audio');
      if (this.playIng) {
        audio.pause();
        this.playIng = false
        // audio.currentTime = 0;
      }
    },
    startListen (sid) {
      linsten(sid).then(res => {
        this.song_key = res.data.response_data.key
      })
    },
    endListen (sid, s_key) {
      hearBottle(sid, s_key)
    },
    playAll () {
      this.isAllPlay = true
      this.clearSongStatus()
      this.$store.dispatch('getInitInfo');
      this.songIndex = 0
      const path = this.list[0]
      this.playSong(this.now_song.path, this.now_song.id, 0)
    },
    stopMus () {
      if (this.isAllPlay) {
        this.songIndex += 1
        if (this.songIndex <= this.list.length - 1) {
          this.playSong(this.now_song.path, this.now_song.id, this.songIndex)
        }
      }
    },
    clearSongStatus () {
      this.playIng = false
      this.listenSecond = 0
      this.auidoSong_id = 0
      this.currentSong = 0
    },
    attem (uid, index) {
      store.commit("updateLoading", true);
      appAttemsion(uid).then(res => {
        store.commit("updateLoading", false);
        if (res.response_data) {
          this.$set(this.list[index], 'attension', true)
        } else {
          this.toast(res.response_status.error)
        }
      })
    },
    selectSongAll () {
      for (let i = 0; i < this.list.length; i++) {
        if (!this.list[i].collect) {
          this.$set(this.list[i], 'act', true)
        }
      }
    },
    selectSong (index) {
      if (this.list[index].collect) {
        return
      }
      if (this.list[index].act) {
        this.$set(this.list[index], 'act', false)
      } else {
        this.$set(this.list[index], 'act', true)
      }
    },
    addCollect () {
      if (this.allSet) {
        this.toast(`本期歌單已全部收藏！`)
        return
      }
      if (!this.allItmeSet) {
        this.showAccSuc = true
        this.sucType = false
        return
      }
      let arr = []
      //   let song_indexArr = []
      for (let i = 0; i < this.list.length; i++) {
        if (this.list[i].act && !this.list[i].collect) {
          //   song_indexArr.push(i)
          this.$set(this.list[i], 'collect', true)
          arr.push(collectSong(this.list[i].sid))
        }
      }
      if (arr.length) {
        store.commit("updateLoading", true);
        Promise.all([...arr]).then(res => {
          //   for (let i = 0; i < song_indexArr.length; i++) {
          //     this.$set(this.list[i], 'collect', true)
          //   }
          this.sucType = true
          this.showAccSuc = true
          store.commit("updateLoading", false);
        }).catch((error) => {
          console.log(error)
          store.commit("updateLoading", false);
          this.toast(error)
        })
      }
    },
    goUser (uid) {
      location.href = `uid:${uid}`
    }
  }
}
</script>

<style lang="scss">
.pageIndex {
  background: url(../img/banner.png) no-repeat;
  background-size: 100% auto;
  .header {
    height: 3.48rem;
  }
  .con {
    width: 100%;
    background-image: linear-gradient(
      90deg,
      RGBA(159, 111, 249, 1),
      RGBA(121, 118, 255, 1)
    );
    margin-top: -0.4rem;
    .play_all {
      width: 7.02rem;
      height: 0.96rem;
      background: #FFFFFF;
      border-radius: 0.16rem;
      margin: 0 auto;
      display: flex;
      align-items: center;
      position: relative;
      .play_con {
        display: flex;
        align-items: center;
      }
      .playIcon {
        width: 0.34rem;
        height: 0.34rem;
        background: url(../img/play.png);
        background-size: 100% 100%;
        margin: 0 0.18rem 0 0.23rem;
      }
      .songNums {
        font-size: 0.26rem;
        color: rgba(34, 34, 34, 1);
        strong {
          font-size: 0.26rem;
          color: rgba(136, 136, 136, 1);
        }
      }
      .collection {
        width: 0.4rem;
        height: 0.34rem;
        background: url(../img/collection2.png);
        background-size: 100% 100%;
        position: absolute;
        right: 0.29rem;
      }
    }
    ul {
      width: 7.02rem;
      margin: 0.24rem auto;
      li {
        min-height: 3.52rem;
        background: #FFFFFF;
        border-radius: 0.16rem;
        padding: 0.24rem;
        position: relative;
        margin-bottom: 0.24rem;
        .songMsg {
          display: flex;
          .songCover {
            width: 2.4rem;
            height: 2.4rem;
            border-radius: 0.16rem;
            overflow: hidden;
            position: relative;
            .cover {
              width: 100%;
              height: 100%;
            }
            .song_play,
            .songNums,
            .mv {
              position: absolute;
            }
            .mv {
              width: 0.54rem;
              height: 0.3rem;
              background: #FFEEA1;
              border-radius: 0.06rem;
              top: 0.12rem;
              right: 0.12rem;
              font-size: 0.22rem;
              text-align: center;
              line-height: 0.3rem;
            }
            .song_play {
              width: 0.28rem;
              height: 0.28rem;
              background: url(../img/play2.png);
              background-size: 100% 100%;
              right: 0.08rem;
              bottom: 0.08rem;
              &.stop {
                background: url(../img/stop.png);
                background-size: 100% 100%;
              }
            }
            .songNums {
              //   height: 0.3rem;
              display: flex;
              align-items: center;
              left: 0.13rem;
              bottom: 0.13rem;
              color: #fff;
              i {
                width: 0.24rem;
                height: 0.22rem;
                background: url(../img/err.png);
                background-size: 100% 100%;
                margin-right: 0.05rem;
              }
              em {
                font-size: 0.22rem;
              }
            }
          }
          .songName {
            height: 0.5rem;
            font-size: 0.26rem;
            color: rgba(116, 158, 220, 1);
            font-size: 0.26rem;
            margin-left: 0.19rem;
            display: flex;
            align-items: center;
            .ktving {
              width: 0.28rem;
              height: 0.22rem;
            }
          }
        }
        .songReason {
          width: 6.54rem;
          height: 0.72rem;
          background: #F5F5F5;
          border-radius: 0.12rem;
          display: flex;
          padding-top: 0.17rem;
          margin-top: 0.24rem;
          .title {
            color: rgba(111, 100, 50, 1);
            font-size: 0.22rem;
            width: 1.32rem;
            text-align: center;
          }
          .msg {
            font-size: 0.22rem;
            color: rgba(153, 153, 153, 1);
            flex: 1;
            padding-right: 0.39rem;
          }
        }
        .user {
          width: 2.98rem;
          height: 0.64rem;
          background: #FFE9EC;
          border-radius: 0.32rem 0 0 0.32rem;
          position: absolute;
          right: 0;
          top: 2rem;
          display: flex;
          align-items: center;
          .uerImg {
            width: 0.816rem;
            height: 0.816rem;
            position: relative;
            .frame {
              width: 0.816rem;
              height: 0.816rem;
              position: absolute;
              z-index: 10;
            }
            .av {
              width: 0.48rem;
              height: 0.48rem;
              border-radius: 50%;
              position: absolute;
              top: 0.168rem;
              left: 0.168rem;
            }
          }

          .nick {
            width: 1.6rem;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            font-size: 0.22rem;
            color: rgba(34, 34, 34, 1);
          }
          .collection2 {
            // width: 0.62rem;
            padding: 0 0.1rem;
            white-space: nowrap;
            height: 0.32rem;
            text-align: center;
            line-height: 0.32rem;
            background: #FFFFFF;
            border-radius: 0.16rem;
            font-size: 0.16rem;
            color: rgba(253, 39, 73, 1);
            em {
              font-size: 0.16rem;
            }
          }
        }
      }
    }
  }
  img {
    display: block;
    width: 100%;
  }
  .hot_song {
    width: 7.5rem;
    height: 7.2rem;
    background: #FFFFFF;
    border-radius: 0.24rem 0.24rem 0 0;
    position: fixed;
    bottom: 0;
    z-index: 101;
    .selectAll {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 0.96rem;
      background: #FAFAFA;
      border-radius: 0.24rem 0.24rem 0 0;
      .selectBtn {
        display: flex;
        align-items: center;
        .set_icon {
          width: 0.3rem;
          height: 0.3rem;
          background: url(../img/select_not.png);
          background-size: 100% 100%;
          margin: 0 0.3rem;
          &.act {
            background: url(../img/select_act.png);
            background-size: 100% 100%;
          }
        }
        em {
          color: rgba(34, 34, 34, 1);
        }
      }
      .cancel {
        color: rgba(136, 136, 136, 1);
        margin-right: 0.31rem;
      }
    }
    ul {
      height: 4.8rem;
      overflow-y: scroll;
      li {
        height: 1.2rem;
        display: flex;
        align-items: center;
        .set_icon {
          width: 0.3rem;
          height: 0.3rem;
          background: url(../img/select_not.png);
          background-size: 100% 100%;
          margin: 0 0.3rem;
          &.act {
            background: url(../img/select_act.png);
            background-size: 100% 100%;
          }
        }
        .songMsg {
          .songName {
            color: rgba(34, 34, 34, 1);
          }
          .songUser {
            display: flex;
            align-items: center;
            color: rgba(136, 136, 136, 1);
            font-size: 0.24rem;
            margin-top: 0.15rem;
            .uid {
              margin-left: 0.25rem;
            }
          }
        }
      }
    }
    .act_btm {
      width: 6.9rem;
      height: 0.88rem;
      background: linear-gradient(90deg, #9F71F8, #7F6FFA);
      border-radius: 0.16rem;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0.2rem auto 0;
      color: #FFFFFF;
      i {
        width: 0.4rem;
        height: 0.34rem;
        background: url(../img/collection.png);
        background-size: 100% 100%;
        margin-right: 0.18rem;
      }
    }
  }
  .accSuc {
    width: 6rem;
    height: 4rem;
    background: #FFFFFF;
    border-radius: 0.16rem;
    color: rgba(34, 34, 34, 1);
    .title {
      height: 1.43rem;
      line-height: 2rem;
      text-align: center;
    }
    .msg {
      font-size: 0.26rem;
      text-align: center;
    }
    .ok {
      width: 4rem;
      height: 0.8rem;
      background: linear-gradient(90deg, #9F71F8, #7F6FFA);
      border-radius: 0.4rem;
      margin: 0.5rem auto 0;
      text-align: center;
      color: #fff;
      line-height: 0.8rem;
    }
  }
  .moveR-enter-active,
  .moveR-leave-active {
    transition: all 0.1s linear;
    transform: translateY(0);
  }
  .moveR-enter,
  .moveR-leave {
    transform: translateY(50%);
  }
  .moveR-leave-to {
    transform: translateY(50%);
  }
}
</style>