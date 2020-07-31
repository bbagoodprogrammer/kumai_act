<template>
  <div class="trailer">
    <div class="title">打擂歌單預告</div>
    <div class="searchBox">
      <input type="text" placeholder="打擂歌曲/歌手名">
      <span class="search"></span>
    </div>
    <p class="tips">下期歌單XX月XX日18:00-XX月XX日20:00<br />非下期打擂期間發佈的練習歌曲無法報名參賽</p>
    <!-- <div class="noSongTips">
      <h3>預告歌單暫無該打擂歌曲</h3>
    </div> -->
    <ul class="songList scrollable">
      <li v-for="(item,index) in sList" :key="index">
        <div class="songMsg">
          <div class="sName">{{item.songName}}<i></i> </div>
          <div class="songNick"><em>{{item.songNick}}</em><strong> / 打擂 {{item.num}} 人</strong></div>
        </div>
        <div class="songStatusBtn" @click="goSong(item.sid)">
          <em>練習</em>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
import api from "../../api/apiConfig"
export default {
  data() {
    return {
      sList: [
        {
          songName: '孤芳自赏',
          songNick: '無煙房',
          num: 88,
        },
        {
          songName: '孤芳自赏',
          songNick: '無煙房',
          num: 88,
        },
        {
          songName: '孤芳自赏',
          songNick: '無煙房',
          num: 88,
        }
      ],
      loaded: false,
      more: true
    }
  },
  mounted() {
    this.scrollable = this.$el.querySelector('.scrollable');
    if (this.scrollable) {
      this.scrollable.addEventListener('scroll', this.onScroll);
    }
  },
  methods: {
    onScroll() {
      const scrollToBottom = this.scrollable.scrollTop + this.scrollable.clientHeight >= this.scrollable.scrollHeight - 10;
      if (scrollToBottom) { //滾動加載，沒有加載完成
        if (this.loaded) return
        if (this.more) {
          this.more = false
          api.getHistory(this.sList.length, 'more').then(res => {
            this.more = true
            if (res.data.response_data.list.length === 0) {
              this.loaded = true
            } else {
              this.sList = this.sList.concat(res.data.response_data.list)
            }
          })
        }
      }
    },
    goSong(sid) {
      location.href = 'songid:{"songlist":[' + sid + ' ],"index":0}';
    }
  }
}
</script>
<style lang="scss">
body {
  background: rgba(117, 67, 240, 1) url(../../assets/img/htmlBg.png) no-repeat;
  background-size: 100% auto;
  .trailer {
    padding: 0.41rem 0.47rem 0;
    .title {
      text-align: center;
      font-size: 0.48rem;
      font-weight: bold;
      color: rgba(255, 213, 86, 1);
      .questIcon {
        display: block;
        width: 0.58rem;
        height: 0.58rem;
        background: url(../../assets/img/standIcon.png);
        background-size: 100% 100%;
        position: absolute;
        top: 0.29rem;
        right: 0.26rem;
      }
    }
    .searchBox {
      width: 6.56rem;
      height: 0.8rem;
      background: rgba(147, 103, 255, 1);
      border: 0.02rem solid rgba(201, 165, 255, 1);
      border-radius: 0.39rem;
      box-sizing: border-box;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 0.33rem 0 0.3rem;
      margin: 0.3rem auto;
      input {
        height: 0.6rem;
        color: #fff;
      }
      input::placeholder {
        color: rgba(201, 165, 255, 1);
        font-size: 0.24rem;
        font-weight: bold;
      }
      .search {
        width: 0.43rem;
        height: 0.43rem;
        background: url(../../assets/img/searchIcon.png);
        background-size: 100% 100%;
      }
    }
    .tips {
      font-size: 0.24rem;
      color: RGBA(255, 240, 255, 1);
      text-align: center;
      line-height: 0.4rem;
    }
    .noSongTips {
      text-align: center;
      margin-top: 0.52rem;
      h3 {
        font-size: 0.36rem;
        color: rgba(110, 255, 216, 1);
        font-weight: bold;
      }
      p {
        color: rgba(110, 255, 216, 1);
        font-weight: 500;
      }
    }
    .songList {
      margin-top: 0.25rem;
      height: 9.6rem;
      overflow-x: hidden;
      overflow-y: scroll;
      -webkit-overflow-scrolling: touch;
      -webkit-overflow-scrolling: auto;
      li {
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 1.12rem;
        border-bottom: 0.02rem solid rgba(138, 90, 255, 1);
        border-radius: 0.01rem;
        padding-left: 0.15rem;
        .songMsg {
          .sName {
            font-weight: normal;
            display: flex;
            align-items: center;
            i {
              display: inline-block;
              width: 0.7rem;
              height: 0.31rem;
              background: url(../../assets/img/songIcon.png);
              background-size: 100% 100%;
              margin-left: 0.13rem;
            }
          }
          .songNick {
            em {
              font-size: 0.24rem;
              color: rgba(165, 218, 255, 1);
            }
            strong {
              font-size: 0.24rem;
              color: rgba(201, 165, 255, 1);
            }
          }
        }
        .songStatusBtn {
          width: 1.7rem;
          height: 0.66rem;
          background: url(../../assets/img/songActBtn.png);
          background-size: 100% 100%;
          text-align: center;
          line-height: 0.66rem;
          color: rgba(174, 72, 0, 1);
          font-size: 0.26rem;
          em {
            font-weight: bold;
          }
          &.black {
            color: rgba(255, 255, 255, 1);
            background: url(../../assets/img/songBlackBtn.png);
            background-size: 100% 100%;
          }
        }
      }
    }
  }
}
</style>
