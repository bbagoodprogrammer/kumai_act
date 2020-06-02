<template>
  <div class="history2">
    <p v-if="history2.list && history2.list.length == 0" class="tips">Tạm chưa có số liệu</p>
    <ul class="scrollable" v-else>
      <li v-for="(item,index) in history2.list" :key="index">
        <div class="imgBox" :class="{nv:item.fuser?item.fuser.sex == 1:item.sex == 1}">
          <img v-lazy="item.fuser.avatar" alt="" v-if="item.fuser" @click="goUser(item.fuser.uid)">
          <img src="../assets/img/default.png" alt="" v-else>
          <i class="sex" :class="{sex2:item.fuser?item.fuser.sex == 1:item.sex==1}"></i>
        </div>
        <div class="userBox">
          <div class="songName">{{item.song_name}}</div>
          <div class="userName">From: {{item.nick}}</div>
          <div class="getUid">
            <span v-if="!item.fuser">Điều ước này chưa được hái</span>
            <span v-else>Điều ước này đã được bạn có uid {{item.fuser.uid}} hái</span>
          </div>
        </div>
        <p class="time">Thời gian đăng: {{getTimeStr(item.ptime)}}</p>
      </li>
      <p class="loadingTips" v-show="loading">Đang tải...</p>
    </ul>

  </div>
</template>
<script>
import { mapState } from 'vuex'
import api from '../api/apiConfig'
import getDate from '../utils/getDate'
export default {
  data() {
    return {
      loaded: false,
      more: true,
      loading: false
    }
  },
  computed: {
    ...mapState(['history2'])
  },
  mounted() {
    this.scrollable = this.$el.querySelector('.scrollable');
    if (this.scrollable) {
      this.scrollable.addEventListener('scroll', this.onScroll);
    }
  },
  methods: {
    getTimeStr(time) {
      return getDate(new Date(time * 1000), 'pai')
    },
    onScroll() {
      const scrollToBottom = this.scrollable.scrollTop + this.scrollable.clientHeight >= this.scrollable.scrollHeight - 10;
      if (scrollToBottom) { //滾動加載，沒有加載完成
        if (this.loaded) return
        if (this.more) {
          this.more = false
          this.loading = true
          api.wishHistory('waiting', this.history2.list.length).then((res) => {
            this.more = true
            this.loading = false
            if (res.data.response_status.code === 0) {
              let list = res.data.response_data.list
              if (list.length == 0) {
                this.loaded = true
              } else {
                this.$store.commit('addHistory2', list)
              }
            }
          })
        }
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.history2 {
  width: 6.33rem;
  height: 5.52rem;
  margin-top: 0.12rem;
  > .tips {
    text-align: center;
    margin: 0.2rem;
  }
  ul {
    padding: 0.2rem 0.2rem 0;
    height: 5.22rem;
    margin: 0.3rem 0.1rem 0 0;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
    li {
      display: flex;
      align-items: center;
      background: linear-gradient(
        90deg,
        rgba(255, 255, 255, 0.5) 0%,
        rgba(255, 255, 255, 0.5) 100%
      );
      height: 1.71rem;
      border-radius: 0.25rem;
      position: relative;
      margin-top: 0.17rem;
      .imgBox {
        width: 1.28rem;
        height: 1.28rem;
        background: url(../assets/img/nanBg.png);
        background-size: 100% 100%;
        margin-left: 0.3rem;
        position: relative;
        &.nv {
          background: url(../assets/img/nvBg.png);
          background-size: 100% 100%;
        }
        img {
          display: inline-block;
          width: 1.07rem;
          height: 1.07rem;
          margin: 0.1rem 0.1rem;
          border-radius: 50%;
        }
        .sex {
          display: block;
          width: 0.27rem;
          height: 0.27rem;
          background: url(../assets/img/sex1.png);
          background-size: 100% 100%;
          position: absolute;
          right: 0.1rem;
          bottom: 0.1rem;
          &.sex2 {
            background: url(../assets/img/sex2.png);
            background-size: 100% 100%;
          }
        }
      }
      .userBox {
        margin: -0.15rem 0 0 0.15rem;
        div {
          color: #fffde3;
          font-size: 0.24rem;
          height: 50%;
        }
        .getUid {
          color: #fffa5a;
          span {
            font-size: 0.21rem;
          }
        }
      }
      .time {
        font-size: 70%;
        color: #dfceff;
        position: absolute;
        bottom: 0.12rem;
        right: 0.1rem;
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
}
</style>
