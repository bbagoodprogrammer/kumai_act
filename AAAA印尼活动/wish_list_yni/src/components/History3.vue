<template>
  <div class="history3">
    <div class="userItemPup">
      <p v-if="history3.list && history3.list.length == 0" class="tips">Sekarang belum ada data</p>
      <ul class="userCon scrollable" v-else>
        <li v-for="(item,index) in history3.list" :key="index">
          <div class="imgBox" :class="{nv:item.sex == 1}" @click="goUser(item.uid)">
            <img v-lazy="item.avatar" alt="">
          </div>
          <p class="name">{{item.nick}}</p>
          <p class="songName">{{item.song_name}}</p>
          <p class="songUser">{{item.song_author}}</p>
          <p class="jiyuTitle">——<i>·</i> Send word <i>·</i> ——</p>
          <p class="jiyu">{{item.wish}}</p>
          <div class="userSatisfied" v-if="item.status == 2">
            Skor kepuasan:<em>{{item.score}}</em><i class="xinTip" :class="{red:item.score > 0}"></i>
          </div>
          <div class="userSatisfied" v-if="item.status == 1">
            <span class="goSing" @click="goSing()"></span>
          </div>
        </li>
        <p class="loadingTips" v-show="loading">Loading...</p>
      </ul>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import api from "../api/apiConfig"
import getUrlString from '../utils/getString.js';
export default {
  data() {
    return {
      loaded: false,
      more: true,
      loading: false
    }
  },
  mounted() {
    this.scrollable = this.$el.querySelector('.scrollable');
    if (this.scrollable) {
      this.scrollable.addEventListener('scroll', this.onScroll);
    }
  },
  computed: {
    ...mapState(['history3']),
  },
  methods: {
    goSing() {
      // location.href = "goto:songLibrary"
      let regstr = getUrlString('token')
      location.href = `./index5.html?token=${regstr}`
    },
    onScroll() {
      const scrollToBottom = this.scrollable.scrollTop + this.scrollable.clientHeight >= this.scrollable.scrollHeight - 10;
      if (scrollToBottom) { //滾動加載，沒有加載完成
        if (this.loaded) return
        if (this.more) {
          this.more = false
          this.loading = true
          api.wishHistory('took', this.history3.list.length).then((res) => {
            this.more = true
            this.loading = false
            if (res.data.response_status.code === 0) {
              let list = res.data.response_data.list
              if (list.length == 0) {
                this.loaded = true
              } else {
                this.$store.commit('addHistory3', res.data.response_data.list)
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
.history3 {
  width: 6.33rem;
  height: 5.72rem;
  margin-top: 0.12rem;
}
.userItemPup {
  > .tips {
    text-align: center;
    margin: 0.2rem;
  }
  .userCon {
    height: 5.32rem;
    margin: 0.3rem 0.1rem 0 0;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
    position: relative;
    li {
      margin-top: -0.2rem;
      border-bottom: 0.015rem solid #9569f8;
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
      width: 5rem;
      margin: 0 auto;
      &.name {
        margin: 0.17rem auto 0;
        font-size: 80%;
        color: #ffffff;
        max-width: 5rem;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      &.songName {
        font-size: 113%;
        margin-top: 0.1rem;
        color: #fffde3;
      }
      &.songUser {
        font-size: 113%;
        color: #fffde3;
      }
      &.jiyuTitle {
        font-size: 93%;
        color: #fffa5a;
        font-weight: 500;
        margin-top: 0.29rem;
        vertical-align: middle;
        display: flex;
        align-items: center;
        justify-content: center;
        i {
          margin-top: 0.1rem;
        }
        i:first-child {
          margin-right: 0.2rem;
        }
        i:last-child {
          margin-left: 0.2rem;
        }
      }
      &.jiyu {
        color: #fffa5a;
        min-height: 1rem;
        font-size: 80%;
        margin-top: 0.1rem;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 4;
      }
    }
    .userSatisfied {
      display: flex;
      align-items: center;
      font-size: 80%;
      justify-content: center;
      color: #fffa5a;
      // position: absolute;
      // bottom: 0.3rem;
      // left: 2.3rem;
      .xinTip {
        display: block;
        width: 0.71rem;
        height: 0.69rem;
        margin-top: -0.05rem;
        background: url(../assets/img/xin1.png);
        background-size: 100% 100%;
        &.red {
          background: url(../assets/img/xin2.png);
          background-size: 100% 100%;
        }
      }
      .goSing {
        display: block;
        width: 2.8rem;
        height: 0.79rem;
        background: url(../assets/img/goSing.png);
        background-size: 100% 100%;
      }
      em {
        font-weight: 600;
        font-size: 140%;
        margin-left: 0.1rem;
      }
    }
    .Tips {
      width: 5.8rem;
      font-size: 70%;
      color: #fffdbd;
      text-align: center;
      margin-top: 0.2rem;
      position: absolute;
      left: 0.7rem;
      bottom: 0.84rem;
    }
  }
}
.loadingTips {
  text-align: center;
}
ul::-webkit-scrollbar {
  margin-top: 0.2rem;
  width: 0.05rem;
}
ul::-webkit-scrollbar-thumb {
  background: #efbeff;
}
</style>
