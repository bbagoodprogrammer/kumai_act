<template>
  <div class="dSongPup">
    <i class="close" @click="closeDsongPup()"></i>
    <div class="tabs">
      <span :class="{act:type==1}" @click="tabClick(1)">我的</span>
      <span :class="{act:type==2}" @click="tabClick(2)">好友</span>
    </div>
    <!-- 我的歌 -->
    <div class="mySong" v-if="type==1">
      <p v-if="dSongList.length ==0" class="noData">暫無數據</p>
      <ul class="songList">
        <li v-for="(item,index) in dSongList" :key="index" @click="queryBottle(item)">
          <img v-lazy="item.avatar" alt="">
          <div class="songMsg">
            <div class="name">{{item.name}}</div>
            <div class="songScore">
              <span>收聽：{{item.listen}}</span>
              <span>評論：{{item.comms}}</span>
              <span>贊：{{item.like}}</span>
            </div>
          </div>
          <span class="status"></span>
        </li>
      </ul>
    </div>
    <!-- 好友列表 -->
    <div class="fSongList" v-else>
      <p v-if="fLoading" class="noData">加載中...</p>
      <p v-if="friendList.length == 0 && !fLoading" class="noData">暫無好友，快去添加吧！</p>
      <ul class="list">
        <li v-for="(item,index) in friendList" :key="index" @click="showFworks(item)">
          <img v-lazy="item.avatar" class="av" alt="">
          <div class="fMsg">
            <div class="nick">{{item.nick}}</div>
            <div class="work">近期作品：{{item.work.name}}</div>
          </div>
        </li>
      </ul>
    </div>
    <!-- 好友歌曲 -->
    <transition name="moveR">
      <div class="fWorks" v-show="isShowFworks">
        <i class="close" @click="closeFworks()"></i>
        <p v-if="fwLoading" class="noData">加載中...</p>
        <p v-if="fworksList.length == 0 && !fwLoading" class="noData">暫無數據</p>
        <ul class="songList mH">
          <li v-for="(item,index) in fworksList" :key="index" @click="queryBottle(item)">
            <img v-lazy="item.avatar" alt="">
            <div class="songMsg">
              <div class="name">{{item.name}}</div>
              <div class="songScore">
                <span>收聽：{{item.listen}}</span>
                <span>評論：{{item.comms}}</span>
                <span>贊：{{item.like}}</span>
              </div>
            </div>
            <span class="status"></span>
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
        api.getFriendList().then(res => {
          this.fLoading = false
          this.load = true
          this.friendList = res.data.response_data.list
        })
      }
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
  width: 5rem;
  height: 5rem;
  background: #fff;
  color: #000;
  position: relative;
  .close {
    width: 0.6rem;
    height: 0.6rem;
    background: red;
    position: absolute;
    right: 0.3rem;
    top: 0.3rem;
  }
  .tabs {
    height: 0.7rem;
    display: flex;
    color: hotpink;
    span {
      flex: 1;
      text-align: center;
      line-height: 0.7rem;
      &.act {
        color: red;
      }
    }
  }
  .noData {
    text-align: center;
    margin-top: 0.2rem;
  }
  .songList {
    height: 4.2rem;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
    -webkit-overflow-scrolling: auto;
    &.mH {
      height: 5rem;
    }
    li {
      display: flex;
      align-items: center;
      border-bottom: 0.015rem solid #ccc;
      img {
        width: 1rem;
        height: 1rem;
        border-radius: 50%;
      }
      .status {
        display: block;
        width: 0.2rem;
        height: 0.2rem;
        background: orange;
        margin: 0.3rem 0 0 0.3rem;
      }
    }
  }
  .fSongList {
    .list {
      li {
        display: flex;
        align-items: center;
        .av {
          width: 1rem;
          height: 1rem;
          border-radius: 50%;
        }
      }
    }
  }
  .fWorks {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: red;
    .close {
      display: block;
      width: 0.2rem;
      height: 0.2rem;
      background: #000;
      position: absolute;
      top: 0.3rem;
      right: 0.3rem;
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
