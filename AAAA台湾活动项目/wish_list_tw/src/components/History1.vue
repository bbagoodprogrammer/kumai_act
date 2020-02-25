<template>
  <div class="history1">
    <p v-if="history1.list && history1.list.length == 0" class="tips">暫無心願!</p>
    <ul class="scrollable" v-else>
      <li v-for="(item,index) in history1.list" :key="index">
        <span class="noPing" v-if="item.score  == 0"></span>
        <div class="imgBox" :class="{nv:item.sex == 1}" @click="goUser(item.uid)">
          <img :src="item.avatar" alt="">
        </div>
        <p class="name">{{item.nick}}</p>
        <p class="id">{{item.uid}}</p>
        <p class="tips">完成你的心願曲目</p>
        <div class="auido">
          <i class="auidoLabel" @click="setAudio(item.path,item.song_id)" :class="{pust:isPlaying && auidoSong_id == item.song_id}"></i>
          <span class="songName">{{item.song_name}}</span>
        </div>
        <div class="score">
          <p class="scoreTitle">- 滿意度打分 -</p>
          <div class="scoreBox">
            <i v-for="(item2,index2) in 5" :key="index2" :class="{active:Number(item.score)>index2}" @click="getSocre(index,index2,item.score,item.id)"></i>
          </div>
        </div>
      </li>
      <p v-show="loading" class="loadingTips">加載中...</p>
    </ul>
    <!-- <span class="one" @click="play()"></span>
    <span class="two" @click="stop()"></span> -->
  </div>
</template>
<script>
import { mapState } from 'vuex'
import api from "../api/apiConfig"
import { globalBus } from "../utils/eventBus"
export default {
  data() {
    return {
      // testArr: [
      //   {
      //     "id": "2",
      //     "vol": "1",
      //     "puid": "100880",
      //     "ptime": "1570520687",
      //     "sex": "0",
      //     "city": "1",
      //     "wish": "我是心愿寄语2",
      //     "song_id": "2",
      //     "song_name": "吻别2",
      //     "song_author": "张学友2",
      //     "fuid": "0",
      //     "ftime": "0",
      //     "score": "0",
      //     "status": "0",
      //     "work_id": "0",
      //     "uid": 4979504,
      //     "nick": "Hevin Ling",
      //     "avatar": "http://umediakm.singnowapp.com/uc/img/head_11075373_1563174738.png_small",
      //     distance: 'http://umediakm.singnowapp.com/uc/song/13019748_1571120904.mp3'
      //   },
      //   {
      //     "id": "2",
      //     "vol": "1",
      //     "puid": "100880",
      //     "ptime": "1570520687",
      //     "sex": "0",
      //     "city": "1",
      //     "wish": "我是心愿寄语2",
      //     "song_id": "3",
      //     "song_name": "吻别2",
      //     "song_author": "张学友2",
      //     "fuid": "0",
      //     "ftime": "0",
      //     "score": "0",
      //     "status": "0",
      //     "work_id": "0",
      //     "uid": 4979504,
      //     "nick": "Hevin Ling",
      //     "avatar": "http://umediakm.singnowapp.com/uc/img/head_11075373_1563174738.png_small",
      //     distance: 'http://umediakm.singnowapp.com/uc/song/13019748_1571120904.mp3'
      //   }
      // ],
      loaded: false,
      more: true,
      loading: false
    }
  },
  computed: {
    ...mapState(['history1']),
    isPlaying() {
      return this.$parent.isPlaying
    },
    auidoSong_id() {
      return this.$parent.auidoSong_id
    }
  },
  mounted() {
    this.scrollable = this.$el.querySelector('.scrollable');
    if (this.scrollable) {
      this.scrollable.addEventListener('scroll', this.onScroll);
    }
  },
  methods: {
    getSocre(index, index2, score, id) { //评分
      if (score == 0) {
        let newIndex2 = ++index2
        api.getScore(id, newIndex2).then((res) => {
          if (res.data.response_status.code === 0) {
            let scoreObg = {
              index: index,
              score: newIndex2
            }
            this.$store.commit('getScore', scoreObg)
          }
        })
      }
    },
    setAudio(path, songId) {
      let val = {
        path: path,
        songId: songId
      }
      globalBus.$emit('getTarget', val);
    },
    onScroll() {
      const scrollToBottom = this.scrollable.scrollTop + this.scrollable.clientHeight >= this.scrollable.scrollHeight - 10;
      if (scrollToBottom) { //滾動加載，沒有加載完成
        if (this.loaded) return
        if (this.more) {
          this.more = false
          this.loading = true
          api.wishHistory('done', this.history1.list.length).then((res) => {
            this.more = true
            this.loading = false
            if (res.data.response_status.code === 0) {
              let list = res.data.response_data.list
              if (list.length == 0) {
                this.loaded = true
              } else {
                this.$store.commit('addHistory1', list)
              }
            }
          })
        }
      }
    },
    goUser(uid) {
      location.href = `uid:${uid}`
    }
  }
}
</script>
<style lang="scss" scoped>
.history1 {
  width: 6.33rem;
  height: 5.72rem;
  margin-top: 0.12rem;
  .loadingTips {
    text-align: center;
  }
  > .tips {
    text-align: center;
    margin: 1.6rem auto 0;
  }
  ul {
    height: 5.42rem;
    margin: 0.3rem 0.1rem 0 0;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
    li {
      margin-top: -0.17rem;
      position: relative;
      border-bottom: 0.015rem solid #9569f8;
      .noPing {
        display: block;
        width: 1.09rem;
        height: 0.44rem;
        background: url(../assets/img/noPing.png);
        background-size: 100% 100%;
        position: absolute;
        right: 0.1rem;
        top: -0.05rem;
      }
      .imgBox {
        width: 1.25rem;
        height: 1.25rem;
        background: url(../assets/img/nanBg.png);
        background-size: 100% 100%;
        margin: 0.3rem auto 0;
        &.nv {
          background: url(../assets/img/nvBg.png);
          background-size: 100% 100%;
        }
        img {
          display: inline-block;
          width: 1.07rem;
          height: 1.07rem;
          margin: 0.1rem 0.09rem;
          border-radius: 50%;
        }
      }
      p {
        text-align: center;
        font-size: 80%;
        &.name {
          max-width: 5rem;
          margin: 0.17rem auto 0;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
        &.tips {
          margin-top: 0.54rem;
          font-size: 113%;
          color: #fefeff;
        }
      }
      .auido {
        height: 0.52rem;
        margin-top: 0.2rem;
        display: flex;
        align-items: center;
        justify-content: center;
        .auidoLabel {
          display: block;
          width: 0.5rem;
          height: 0.52rem;
          background: url(../assets/img/audioPlay.png);
          background-size: 100% 100%;
          &.pust {
            background: url(../assets/img/pust.png);
            background-size: 100% 100%;
          }
        }
        .songName {
          font-size: 110%;
          color: #fffde3;
          margin-left: 0.1rem;
          max-width: 5rem;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
      }
      .score {
        .scoreTitle {
          font-size: 80%;
          color: #fcf872;
          margin-top: 0.47rem;
        }
        .scoreBox {
          height: 0.71rem;
          margin-top: 0.1rem;
          display: flex;
          justify-content: center;
          i {
            display: block;
            width: 0.71rem;
            height: 0.69rem;
            background: url(../assets/img/xin1.png);
            background-size: 100% 100%;
            &.active {
              background: url(../assets/img/xin2.png);
              background-size: 100% 100%;
            }
          }
        }
      }
    }
  }
  ul::-webkit-scrollbar {
    margin-top: 0.2rem;
    width: 0.05rem;
  }
  ul::-webkit-scrollbar-thumb {
    background: #efbeff;
  }
}
</style>
