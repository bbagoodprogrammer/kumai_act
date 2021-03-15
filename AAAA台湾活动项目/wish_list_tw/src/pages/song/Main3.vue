<template>
  <div class="song">
    <h5 v-if="isLength> 0">選擇你最滿意的作品報名參賽吧</h5>
    <h5 v-else>你還沒有符合參賽要求的作品喔</h5>
    <div class="songList" v-if="isLength> 0">
      <ul>
        <li v-for="(item,index) in songList" :key=index>
          <div class="songLeft">
            <span class="name">{{item.name}}</span>
            <span class="tm">{{item.time}}</span>
          </div>
          <span class="joinBtn" @click="choiceSong(item.sid,index)"></span>
        </li>
      </ul>
    </div>
    <div class="goSing" :class="{border:isLength> 0}">
      <p v-if="isLength> 0">沒有符合心意的歌曲嗎？</p>
      <div class="sing" @click="goSing()"></div>
      <span>唱完記得回來完成報名喔</span>
    </div>
    <div class="determinePup" v-if="showPup">
      <div class="determinCon">
        <p>確認提交這一首作品參賽嗎？</p>
        <div class="chang">
          <span class="no" @click="hdPup()">取消</span>
          <span class="ok" @click="changed()">確定</span>
        </div>
      </div>
    </div>
    <transition name="slide">
      <msg-toast :msg="tastMsg" :tostTitle="tostTitle" :back="back" @closeToast="closeToast()" v-show="showT"></msg-toast>
    </transition>
    <div class="bMsg">
      <p>心願歌曲需為本期活動開始後發佈的任意公開作品（清唱5分鐘除外）</p>
    </div>
    <Loading></Loading>
  </div>
</template>
<script>
import api from "../../api/apiConfig.js"
import Loading from "../../components/Loading"
import msgToast from "../../components/commonToast"
import getString from "../../utils/getString"
export default {
  components: { Loading, msgToast },
  data () {
    return {
      songList: [],
      showPup: false,
      songid: null,
      tastMsg: '',
      showT: false,
      songIndex: null,
      tostTitle: '',
      back: false
    }
  },
  computed: {
    isLength () {
      return this.songList.length > 0
    }
  },
  created () {
    api.getSongList().then((res) => { //请求歌曲列表
      if (res.data.response_status && res.data.response_status.code === 0) {
        this.songList = res.data.response_data.list
      }
    })
    sessionStorage.setItem("need-refresh", true);
  },
  methods: {
    goSing () {
      location.href = "goto:songLibrary"
    },
    choiceSong (itemId, index) { //选择歌曲
      this.songid = itemId  //當前歌曲ID
      this.showPup = true
      this.songIndex = index //當前歌曲索引
    },
    changed () {
      api.selectSong(this.songid).then((res) => {
        if (res.data.response_status.code === 0) { //提交成功顯示OK提示
          this.showPup = false
          let gift = res.data.response_data.gift
          if (gift) {
            this.tostTitle = `送出心願歌曲成功`
            this.tastMsg = `恭喜你成功送出1首心願歌曲，獎勵${gift.count}個${gift.name}背包禮物，快去你的背包看看吧！`
          } else {
            this.tostTitle = `送出心願歌曲成功 `
            this.tastMsg = `恭喜你成功送出1首心願歌曲，再接再厲唷!`
          }
          this.showT = true
          //刪除當前歌曲
          this.songList.splice(this.songIndex, 1)
          this.back = true
        } else {
          this.showPup = false
          this.tastMsg = res.data.response_status.error
          this.showT = true
        }
      })
    },
    hdPup () {
      this.showPup = false
    },
    closeToast () {
      this.showT = false
    }
  }
}
</script>
<style lang="scss">
body {
  background: #2d0080;
}
.song {
  padding: 0.64rem 0.38rem 0;
  .determinePup {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.8);
    z-index: 10000;
    .determinCon {
      position: absolute;
      background: #2e3846;
      padding: 0.2rem 0.2rem 0.3rem;
      top: 5rem;
      left: 1rem;
      width: 5.5rem;
      text-align: center;
      .chang {
        margin-top: 0.2rem;
        span {
          display: inline-block;
          width: 2rem;
          height: 0.5rem;
          line-height: 0.5rem;
        }
        .ok {
          background: #f44a56;
          margin-left: 0.2rem;
        }
        .no {
          background: #795aac;
        }
      }
    }
  }
  > h5 {
    color: #fffde4;
    font-size: 0.33rem;
    text-align: center;
  }
  .bMsg {
    color: #fffde4;
    margin-top: 0.51rem;
    font-size: 0.26rem;
    text-align: center;
  }
  .songList {
    ul {
      border-radius: 0.12rem;
      padding: 0 0.25rem;
      margin-top: 0.31rem;
    }
    li {
      height: 1.2rem;
      display: flex;
      padding-left: 0.1rem;
      align-items: center;
      justify-content: space-between;
      border-bottom: 0.02rem solid rgba(13, 13, 13, 0.2);
      .songLeft {
        span {
          display: block;
          height: 50%;
        }
        .name {
          color: #ffffff;
          font-size: 0.36rem;
        }
        .tm {
          color: #7f25de;
          font-size: 0.21rem;
        }
      }
      .joinBtn {
        width: 1.25rem;
        height: 0.4rem;
        background: url(../../assets/img/queding.png);
        background-size: 100% 100%;
      }
    }
  }
  .goSing {
    margin-top: 2.46rem;
    position: relative;
    &.border {
      border-bottom: 0.02rem solid rgba(13, 13, 13, 0.2);
      margin-top: 1rem;
    }
    > p {
      color: #fffde4;
      font-size: 0.28rem;
      text-align: center;
    }
    .sing {
      width: 1.75rem;
      height: 0.56rem;
      background: url(../../assets/img/goSingOne.png);
      background-size: 100% 100%;
      margin: 0.4rem auto 0;
    }
    span {
      display: block;
      color: #7f25de;
      font-size: 0.26rem;
      margin: 0.45rem 0;
      text-align: center;
    }
  }
}
@import '../../assets/scss/common.scss';
</style>
