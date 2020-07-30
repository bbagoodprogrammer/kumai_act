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
  </div>
</template>
<script>
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
      ]
    }
  }
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
}
</style>
