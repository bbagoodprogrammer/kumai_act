<template>
  <div class="hotSong">
    <div class="searchBox">
      <input type="text" placeholder="本期打擂歌曲(100)">
      <span class="search"></span>
    </div>
    <div class="noSongTips">
      <div class="next">
        <h3>此歌曲為下期打擂歌曲</h3>
        <p>快去練習吧</p>
        <p>非下期打擂期間發佈的練習歌曲無法報名參賽</p>
      </div>
      <div class="noSong">
        <h3>本期暫無該打擂歌曲</h3>
        <p>先看看大家都在唱的歌吧</p>
      </div>
    </div>
    <ul class="hotSongList">
      <li v-for="(item,index) in hotSong" :key="index">
        <div class="songMsg">
          <div class="sName">{{item.songName}}<i></i> </div>
          <div class="songNick"><em>{{item.songNick}}</em><strong> / 打擂 {{item.num}} 人</strong></div>
        </div>
        <div class="songStatusBtn">
          <em>打擂</em>
          <!-- <em>提交歌曲</em>
          <em>已參賽</em> -->
        </div>
      </li>
    </ul>
    <div class="mask" v-show="isOverTime">
      <transition name="slide">
        <div class="overTime" v-show="isOverTime">
          <i class="close" @click="closeOverTime()"></i>
          <h3>無法打擂</h3>
          <p>本期打擂時間已結束，快去做評委評分吧！<br />超多好禮在等你</p>
          <div class="goBtn" @click="goSongVote()">去做評委</div>
        </div>
      </transition>
    </div>
    <div class="mask" v-show="cSongPup">
      <transition name="slide">
        <div class="choiceSong" v-if="cSongPup">
          <i class="close" @click="closeSongPup()"></i>
          <h3>選擇你最滿意的打擂作品參賽吧</h3>
          <ul class="choiceSongList">
            <li v-for="(item,index) in hotSong" :key="index">
              <div class="songMsg">
                <div class="sName">{{item.songName}}<i></i> </div>
                <div class="songNick"><em>{{item.songNick}}</em><strong> / 打擂 {{item.num}} 人</strong></div>
              </div>
              <div class="songStatusBtn">
                <em>選擇</em>
              </div>
            </li>
          </ul>
          <div class="choicetips">
            <p>1、參賽作品需為X月X日18:00:00后發佈的指定打擂歌曲伴奏作品</p>
            <p>2、每期每首打擂伴奏僅可上傳一首歌曲參賽，但可選擇多首打擂伴奏參賽</p>
            <p>
              3、若成功選擇打擂歌曲參賽並匹配打擂對手後，刪除該打擂歌曲作品，視為自動棄權，該輪打擂失敗，另一方自動獲勝</p>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>
<script>
import getString from "../utils/getString"
export default {
  data() {
    return {
      hotSong: [
        {
          songName: '被風吹過的冬天',
          songNick: '陳超俊',
          num: 5678,
          icon: true,
          status: 0,  // 0打擂  1提交歌曲 2已參賽 3灰色打擂最後一點時間
        }
      ],
      isOverTime: false,
      cSongPup: false
    }
  },
  methods: {
    closeOverTime() {
      this.isOverTime = false
    },
    closeSongPup() {
      this.cSongPup = false
    },
    goSongVote() {
      let regstr = getString('token')
      location.href = `./songVote.html?token=${regstr}`
    },
  },
}
</script>
<style lang="scss">
.hotSong {
  margin-top: 0.8rem;
  padding: 0 0.47rem;
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
    margin: 0 auto;
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
      background: url(../assets/img/searchIcon.png);
      background-size: 100% 100%;
    }
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
  .hotSongList {
    margin-top: 0.2rem;
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
            background: url(../assets/img/songIcon.png);
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
        background: url(../assets/img/songActBtn.png);
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
          background: url(../assets/img/songBlackBtn.png);
          background-size: 100% 100%;
        }
      }
    }
  }
  .overTime {
    width: 6.16rem;
    height: 2.82rem;
    background: rgba(116, 68, 255, 1);
    border: 0.04rem solid rgba(213, 197, 255, 1);
    border-radius: 0.4rem;
    position: relative;
    padding-top: 0.6rem;

    h3 {
      text-align: center;
      color: rgba(255, 213, 86, 1);
      font-size: 0.36rem;
      font-weight: bold;
    }
    p {
      text-align: center;
      font-size: 0.24rem;
      color: RGBA(255, 239, 255, 1);
      margin-top: 0.34rem;
    }
    .goBtn {
      width: 2.24rem;
      height: 0.84rem;
      line-height: 0.84rem;
      text-align: center;
      font-weight: bold;
      color: rgba(174, 72, 0, 1);
      background: url(../assets/img/ok.png);
      background-size: 100% 100%;
      margin: 0.3rem auto 0;
    }
  }
  .choiceSong {
    width: 5.7rem;
    height: 7.23rem;
    background: rgba(116, 68, 255, 1);
    border: 0.04rem solid rgba(213, 197, 255, 1);
    border-radius: 0.4rem;
    position: relative;
    padding: 0.45rem 0.23rem 0;
    h3 {
      color: rgba(255, 213, 86, 1);
      font-size: 0.36rem;
      text-align: center;
      font-weight: 600;
    }
    .choiceSongList {
      margin-top: 0.37rem;
      height: 3.8rem;
      overflow-x: hidden;
      overflow-y: scroll;
      -webkit-overflow-scrolling: touch;
      -webkit-overflow-scrolling: auto;
      li {
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 1.12rem;
        border-radius: 0.01rem;
        padding-left: 0.3rem;
        .songMsg {
          .sName {
            font-weight: normal;
            display: flex;
            align-items: center;
            i {
              display: inline-block;
              width: 0.7rem;
              height: 0.31rem;
              background: url(../assets/img/songIcon.png);
              background-size: 100% 100%;
              margin-left: 0.13rem;
            }
          }
          .songNick {
            color: rgba(221, 202, 255, 1);
            em {
              font-size: 0.24rem;
            }
            strong {
              font-size: 0.24rem;
            }
          }
        }
        .songStatusBtn {
          width: 1.7rem;
          height: 0.66rem;
          background: url(../assets/img/songActBtn.png);
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
            background: url(../assets/img/songBlackBtn.png);
            background-size: 100% 100%;
          }
        }
      }
    }
    .choicetips {
      p {
        font-size: 0.24rem;
        color: RGBA(255, 244, 255, 1);
      }
    }
  }
  .close {
    display: block;
    width: 0.6rem;
    height: 0.6rem;
    background: url(../assets/img/close.png);
    background-size: 100% 100%;
    position: absolute;
    right: 0;
    top: -0.9rem;
  }
}
</style>
