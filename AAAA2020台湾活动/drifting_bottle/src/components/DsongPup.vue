<template>
  <div class="dSongPup">
    <i class="close" @click="closeDsongPup()"></i>
    <div class="tabs">
      <span :class="{act:type==1}" @click="tabClick(1)">{{lang.me}}</span>
      <span :class="{act:type==2}" @click="tabClick(2)">{{lang.firend}}</span>
    </div>
    <!-- 我的歌 -->
    <div class="mySong" v-if="type==1">
      <p v-if="dSongList.length ==0" class="noData">暫無滿足要求的作品，請去發佈新作品~</p>
      <ul class="songList">
        <li v-for="(item,index) in dSongList" :key="index">
          <img v-lazy="item.avatar" alt="">
          <div class="songMsg">
            <div class="name">{{item.name}}</div>
            <div class="songScore">
              <span class="score1"><i></i>{{item.listen}}</span>
              <span class="score2"><i></i>{{item.comms}}</span>
              <span class="score3"><i></i>{{item.like}}</span>
            </div>
          </div>
          <span class="status" @click="queryBottle(item)">{{lang.change}}</span>
        </li>
      </ul>
    </div>
    <!-- 好友列表 -->
    <div class="fSongList" v-else>
      <p v-if="fLoading" class="noData">{{lang.loading}}</p>
      <p v-if="friendList.length == 0 && !fLoading" class="noData">{{lang.noFriend}}</p>
      <ul class="list">
        <li v-for="(item,index) in friendList" :key="index">
          <img v-lazy="item.avatar" class="av" alt="">
          <div class="fMsg">
            <div class="nick">{{item.nick}}</div>
            <div class="work">{{lang.near}}<strong>{{item.work.name}}</strong> </div>
          </div>
          <div class="queyBtn" @click="showFworks(item)">{{lang.lookWork}}</div>
        </li>
      </ul>
    </div>
    <!-- 好友歌曲 -->
    <transition name="moveR">
      <div class="fWorks" v-show="isShowFworks">
        <i class="close" @click="closeFworks()"></i>
        <p v-if="fwLoading" class="noData">{{lang.loading}}</p>
        <p v-if="fworksList.length == 0 && !fwLoading" class="noData">{{lang.noData}}</p>
        <ul class="songList mH" v-if="fworksList.length > 0">
          <li v-for="(item,index) in fworksList" :key="index">
            <img v-lazy="item.avatar" alt="">
            <div class="songMsg">
              <div class="name">{{item.name}}</div>
              <div class="songScore">
                <span class="score1"><i></i>{{item.listen}}</span>
                <span class="score2"><i></i>{{item.comms}}</span>
                <span class="score3"><i></i>{{item.like}}</span>
              </div>
            </div>
            <span class="status" @click="queryBottle(item)">{{lang.change}}</span>
          </li>
        </ul>
      </div>
    </transition>
    <!-- 投瓶確定彈窗 -->
    <div class="mask" v-show="showQueryBottle">
      <transition name="slide">
        <QueryBottle v-if="showQueryBottle" :querySong="querySong" />
      </transition>
    </div>
  </div>
</template>
<script>
import api from "../api/apiConfig"
import QueryBottle from "./QueryBottle"
import { setTimeout } from 'timers';
export default {
  components: { QueryBottle },
  props: ["dSongList"],
  data() {
    return {
      type: 1,
      load: false,
      friendList: [],
      fworksList: [],
      fLoading: false,
      fwLoading: false,
      isShowFworks: false,
      showQueryBottle: false,
      querySong: {}
    }
  },
  methods: {
    tabClick(val) {
      this.type = val
      if (val == 2 && !this.load && !this.fLoading) {
        this.fLoading = true
        this.getFriend()
      }
    },
    getFriend() {
      api.getFriendList().then(res => {
        let list = res.data.response_data.list
        if (list) {
          this.fLoading = false
          this.load = true
          this.friendList = list
        } else {
          setTimeout(() => {
            this.getFriend()
          }, 2000)
        }
      })
    },
    showFworks(item) {
      this.isShowFworks = true
      this.fwLoading = true
      api.getFriendSong(item.uid).then(res => {
        this.fwLoading = false
        this.fworksList = res.data.response_data.list
      })
    },
    closeFworks() {
      this.fworksList = []
      this.isShowFworks = false
    },
    queryBottle(item) {
      this.querySong = item
      this.showQueryBottle = true
    },
    closeDsongPup() {
      this.$parent.showDsongPup = false
    }
  }
}
</script>
<style lang="scss">
.dSongPup {
  width: 7.17rem;
  height: 8.28rem;
  padding-top: 0.88rem;
  background: url(../assets/img/pupBg.png);
  background-size: 100% 100%;
  position: relative;
  .close {
    width: 0.75rem;
    height: 0.75rem;
    background: url(../assets/img/close.png);
    background-size: 100% 100%;
    position: absolute;
    right: 0.3rem;
    top: 0.1rem;
  }
  .tabs {
    width: 5.24rem;
    height: 0.74rem;
    display: flex;
    background: url(../assets/img/tabs1.png);
    background-size: 100% 100%;
    margin: 0 auto;
    span {
      flex: 1;
      text-align: center;
      line-height: 0.7rem;
      color: #ffd565;
      font-size: 0.28rem;
      font-weight: 800;
      &.act {
        background: url(../assets/img/tabAct1.png);
        background-size: 100% 100%;
        color: #ae4800;
      }
    }
  }
  .noData {
    text-align: center;
    margin-top: 0.2rem;
  }
  .mySong {
    width: 5.7rem;
    height: 6.36rem;
    background: rgba(180, 110, 82, 0.5);
    border-radius: 0.1rem;
    margin: 0.11rem auto 0;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
    -webkit-overflow-scrolling: auto;
    .songList {
      background: none;
    }
  }
  .songList,
  .fSongList {
    width: 5.7rem;
    height: 6.36rem;
    background: rgba(180, 110, 82, 0.5);
    border-radius: 0.1rem;
    margin: 0.11rem auto 0;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
    -webkit-overflow-scrolling: auto;
    &.mH {
      height: 7.1rem;
    }
    li {
      height: 1.35rem;
      display: flex;
      align-items: center;
      position: relative;
      img {
        width: 1rem;
        height: 1rem;
        border-radius: 50%;
        margin-left: 0.24rem;
      }
      .songMsg {
        width: 2.75rem;
        margin-left: 0.21rem;
        .name {
          font-size: 0.26rem;
          max-width: 2.75rem;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
      }
      .songScore {
        display: flex;
        margin-top: 0.15rem;
        span {
          flex: 1;
          display: flex;
          align-items: center;
          font-size: 0.24rem;
          color: #fff7d4;
          font-weight: 600;
          i {
            width: 0.27rem;
            height: 0.25rem;
            margin-right: 0.07rem;
          }
          &.score1 {
            i {
              background: url(../assets/img/score1.png);
              background-size: 100% 100%;
            }
          }
          &.score2 {
            i {
              background: url(../assets/img/score2.png);
              background-size: 100% 100%;
            }
          }
          &.score3 {
            i {
              background: url(../assets/img/score3.png);
              background-size: 100% 100%;
            }
          }
        }
      }
      .status {
        width: 1.13rem;
        height: 0.6rem;
        background: url(../assets/img/btnBg.png);
        background-size: 100% 100%;
        text-align: center;
        line-height: 0.6rem;
        font-size: 0.26rem;
        color: #fff999;
        font-weight: 600;
      }
      .fMsg {
        width: 2.5rem;
        margin-left: 0.15rem;
        .nick {
          font-size: 0.26rem;
          font-weight: 600;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
        .work {
          font-size: 0.24rem;
          color: #611300;
          margin-top: 0.13rem;
          display: flex;
          align-items: center;
          white-space: nowrap;
          strong {
            color: #fff7d4;
            font-size: 0.24rem;
            font-weight: 700;
            max-width: 1.8rem;
            display: block;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }
        }
      }
      .queyBtn {
        width: 1.5rem;
        height: 0.6rem;
        border: 0.03rem solid rgba(255, 249, 153, 1);
        border-radius: 0.3rem;
        text-align: center;
        line-height: 0.6rem;
        color: #fff999;
        font-size: 0.26rem;
        font-weight: 600;
      }
    }
    li:before {
      content: "";
      width: 5rem;
      height: 0.02rem;
      background: rgba(215, 92, 80, 0.58rem);
      position: absolute;
      bottom: 0;
      left: 0.35rem;
    }
  }
  .fSongList::-webkit-scrollbar {
    width: 0.04rem;
    background: rgba(230, 128, 116, 1);
    border-radius: 0.02rem;
    margin-right: 0.5rem;
  }
  .fSongList::-webkit-scrollbar-thumb {
    width: 0.04rem;
    background: #fff999;
    border-radius: 0.02rem;
    margin-right: 0.5rem;
  }
  .songList::-webkit-scrollbar {
    width: 0.04rem;
    background: rgba(230, 128, 116, 1);
    border-radius: 0.02rem;
    margin-right: 0.5rem;
  }
  .songList::-webkit-scrollbar-thumb {
    width: 0.04rem;
    background: #fff999;
    border-radius: 0.02rem;
    margin-right: 0.5rem;
  }

  .fWorks {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    width: 7.17rem;
    height: 8.28rem;
    padding-top: 0.88rem;
    background: url(../assets/img/pupBg.png);
    background-size: 100% 100%;
    .close {
      width: 0.75rem;
      height: 0.75rem;
      background: url(../assets/img/close.png);
      background-size: 100% 100%;
      position: absolute;
      right: 0.3rem;
      top: 0.1rem;
    }
  }
}
.moveR-enter-active,
.moveR-leave-active {
  transition: all 0.1s linear;
  transform: translateX(0);
}
.moveR-enter,
.moveR-leave {
  transform: translateX(100%);
}
.moveR-leave-to {
  transform: translateX(100%);
}
</style>
