<template>
  <div class="page pageIndex">
    <div class="header"></div>
    <div class="con" :style="{minHeight:viewHeight+'px'}">
      <div class="play_all">
        <i class="playIcon"></i>
        <div class="songNums">
          <span>播放全部</span>
          <strong>(99)</strong>
        </div>
        <div class="collection"></div>
      </div>
      <ul>
        <li>
          <div class="songMsg">
            <div class="songCover">
              <i class="mv">mv</i>
              <i class="song_play"></i>
              <span class="songNums"><i></i><em>999</em></span>
              <img src="../img/banner.png" alt="" class="cover">
            </div>
            <div class="songName">曲目《爱我中华》 <img src="../img/ktving.gif" alt="" class="ktving"></div>
          </div>
          <div class="songReason">
            <div class="title">推荐理由</div>
            <div class="msg">
              帥氣古風歌手來啦！這首歌就是一個“颯”字！千山
              飛絕，萬徑人蹤滅~
            </div>
          </div>
          <div class="user">
            <img v-lazy="" alt="">
            <strong class="nick">xxxxxxxx</strong>
            <span class="collection2">+关注</span>
          </div>
        </li>
      </ul>
    </div>
    <audio :src="song[songIndex].addres" type="audio/mp3" controls="controls" ontimeupdate="updata()" ref="audio"></audio>
  </div>
</template>

<script>
export default {
  data () {
    return {
      songIndex: 0,
      song: [
        {
          addres: `http://song.17sing.tw/uc/song/6907398_1616070994.mp3`
        },
        {
          addres: `http://song.17sing.tw/uc/song/6907398_1616070994.mp3`
        }
      ],
      list: [
        {
          img: '',
        }
      ]
    }
  },
  computed: {
    viewHeight: () => window.innerHeight,
    audio () {
      return this.$refs.audio
    }
  },
  methods: {
    updata () {

    },
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
          img {
            width: 0.48rem;
            height: 0.48rem;
            border-radius: 50%;
            margin: 0 0.08rem;
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
            width: 0.62rem;
            height: 0.32rem;
            text-align: center;
            line-height: 0.32rem;
            background: #FFFFFF;
            border-radius: 0.16rem;
            font-size: 0.16rem;
            color: rgba(253, 39, 73, 1);
          }
        }
      }
    }
  }
  img {
    display: block;
    width: 100%;
  }
}
</style>