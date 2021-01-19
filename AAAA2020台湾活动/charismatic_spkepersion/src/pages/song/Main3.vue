<template>
  <div class="song">
    <div class="noSong" v-if="!isLength">
      <h5>你還沒有符合參賽要求的參賽作品喔</h5>
      <div class="sing" @click="goSing()">去唱一首</div>
    </div>
    <div class="haSong" v-else>
      <h5>選擇你最滿意的作品報名參賽吧</h5>
      <div class="songList">
        <ul>
          <li v-for="(item,index) in songList" :key="index">
            <div class="songLeft">
              <span class="name">{{item.name}}</span>
              <span class="tm">{{item.time}}</span>
            </div>
            <span class="joinBtn" @click="choiceSong(item.sid,index)">選擇參賽</span>
          </li>
        </ul>
      </div>
      <div class="goSing" :class="{border:isLength}">
        <p v-if="isLength">沒有符合心意的歌曲嗎？</p>
        <div class="sing" @click="goSing()">去唱一首</div>
        <span v-if="isLength">唱完記得回來完成報名喔</span>
      </div>
    </div>
    <div class="tipsBox">
      <p class="tips"><i>1.</i>參賽作品需為11月16日18:00:00后發佈的任意公開作品(清唱5分鐘除外)</p>
      <p class="tips"><i>2.</i>可上傳多首作品參賽，報名後作品收禮才會被計算</p>
      <p class="tips"><i>3.</i>若刪除活動期間報名的參賽作品，該刪除作品收禮魅力值作廢</p>
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
    <Loading></Loading>
  </div>
</template>
<script>
import api from "../../api/apiConfig.js"
import Loading from "../../components/Loading"
import getString from "../../utils/getString"
export default {
  components: { Loading },
  data() {
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
    isLength() {
      return this.songList.length > 0
    }
  },
  created() {
    document.title = '上傳作品'
    api.song().then((res) => { //请求歌曲列表
      if (res.data.response_status.code === 0) {
        this.songList = res.data.response_data.list
        // this.songList = [
        //   {
        //     "sid": 85924428,
        //     "name": "小雨",
        //     "type": "0",
        //     "addtime": 1603275952,
        //     "url": "http://song.17sing.tw/uc/song/100880_1603275952.mp3"
        //   },
        //   {
        //     "sid": 85924428,
        //     "name": "小雨",
        //     "type": "0",
        //     "addtime": 1603275952,
        //     "url": "http://song.17sing.tw/uc/song/100880_1603275952.mp3"
        //   },
        //   {
        //     "sid": 85924428,
        //     "name": "小雨",
        //     "type": "0",
        //     "addtime": 1603275952,
        //     "url": "http://song.17sing.tw/uc/song/100880_1603275952.mp3"
        //   }
        // ]
      }
    })
    sessionStorage.setItem("need-refresh", true);
  },
  methods: {
    goSing() {
      location.href = "goto:songLibrary"
    },
    choiceSong(itemId, index) { //选择歌曲
      this.songid = itemId  //當前歌曲ID
      this.showPup = true
      this.songIndex = index //當前歌曲索引
    },
    changed() {
      api.upload(this.songid).then((res) => {
        if (res.data.response_status.code === 0) { //提交成功顯示OK提示
          this.showPup = false
          // let gift = res.data.response_data.gift
          // if (gift) {
          //   this.tostTitle = `送出心願歌曲成功`
          //   this.tastMsg = `恭喜你成功送出1首心願歌曲，獎勵${gift.count}個${gift.name}背包禮物，快去你的背包看看吧！`
          // } else {
          //   this.tostTitle = `送出心願歌曲成功 `
          //   this.tastMsg = `恭喜你成功送出1首心願歌曲，再接再厲唷!`
          // }
          // this.showT = true
          //刪除當前歌曲
          this.songList.splice(this.songIndex, 1)
          this.back = true
        } else {
          this.showPup = false
          this.toast(res.data.response_status.error)
        }
      })
    },
    hdPup() {
      this.showPup = false
    },
    closeToast() {
      this.showT = false
    }
  }
}
</script>
<style lang="scss">
body {
  background: RGBA(162, 119, 243, 1);
}

.song {
  padding-top: 0.3rem;
  .noSong {
    width: 7.16rem;
    height: 2.24rem;
    background: url(../../assets/img/box/boxBg.png);
    background-size: 100% 100%;
    padding-top: 1.06rem;
    margin: 0 auto;
    h5 {
      text-align: center;
      font-size: 0.32rem;
    }
    .sing {
      width: 1.8rem;
      height: 0.56rem;
      margin: 0.33rem auto 0;
      background: linear-gradient(255deg, #ffbf5e, #ffdda3);
      border-radius: 0.28rem;
      color: rgba(96, 37, 0, 1);
      font-size: 0.28rem;
      text-align: center;
      line-height: 0.56rem;
    }
  }
  .haSong {
    padding: 0 0.17rem;
    h5 {
      font-size: 0.28rem;
      text-indent: 0.08rem;
    }
    .songList {
      ul {
        width: 7.16rem;
        border-radius: 0.1rem;
        border: 0.03rem solid rgba(247, 224, 160, 1);
        margin: 0.36rem auto 0;
        li {
          height: 1.35rem;
          display: flex;
          padding: 0 0.44rem;
          align-items: center;
          justify-content: space-between;
          position: relative;
          .songLeft {
            span {
              display: block;
              height: 50%;
            }
            .name {
              font-size: 0.32rem;
            }
          }
          .joinBtn {
            width: 1.8rem;
            height: 0.56rem;
            background: linear-gradient(255deg, #ffbf5e, #ffdda3);
            border-radius: 0.28rem;
            color: rgba(96, 37, 0, 1);
            text-align: center;
            line-height: 0.56rem;
          }
        }
        li::before {
          content: "";
          display: block;
          width: 6.55rem;
          height: 0.02rem;
          background: url(../../assets/img/xu.png);
          background-size: 100% 100%;
          position: absolute;
          bottom: 0;
          left: 0.3rem;
        }
        li:last-child:before {
          height: 0;
        }
      }
    }
    .goSing {
      width: 7.16rem;
      height: 2.44rem;
      background: url(../../assets/img/box/boxBg.png);
      background-size: 100% 100%;
      padding-top: 0.86rem;
      margin: 0.53rem auto;
      position: relative;
      > p {
        font-size: 0.26rem;
        text-align: center;
        font-size: 0.32rem;
      }
      .sing {
        width: 1.8rem;
        height: 0.56rem;
        background: linear-gradient(255deg, #ffbf5e, #ffdda3);
        border-radius: 0.28rem;
        color: rgba(96, 37, 0, 1);
        text-align: center;
        line-height: 0.56rem;
        margin: 0.33rem auto 0;
      }
      span {
        display: block;
        font-size: 0.24rem;
        text-align: center;
        color: rgba(255, 255, 255, 0.6);
        position: absolute;
        right: 0.44rem;
        bottom: 0.41rem;
      }
    }
  }

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
}
.tipsBox {
  margin-top: 0.5rem;
}
.tips {
  font-size: 0.26rem;
  margin: 0.25rem 0;
  font-size: 0.26rem;
  padding-left: 0.1rem;
  display: flex;
  i {
    display: block;
  }
  em {
    color: rgba(237, 114, 72, 1);
    font-size: 0.24rem;
  }
}
@import "../../assets/scss/common.scss";
</style>
