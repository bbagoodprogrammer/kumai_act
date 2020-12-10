<template>
  <div class="rank">
    <i class="close" @click="close()"></i>
    <p v-if="rank.length == 0">không có dữ liệu</p>
    <ul class="scrollable" :class="{noData:rank.length == 0}">
      <li v-for="(item,index) in rank" :key="index" :class="'list' + item.rank" @click="goUser(item.uid)">
        <div class="userRank" v-if="item.rank>1">{{item.rank}}</div>
        <div class="imgBox">
          <span class="avBg" v-if="item.rank<=3"></span>
          <img v-lazy="item.avatar" alt="">
        </div>
        <div class="nick">{{item.nick}}</div>
        <div class="score">Điểm<em>{{item.score}}</em></div>
      </li>
    </ul>
    <div class="userMsg" v-if="reg">
      <div class="userRank" v-if="omerMsg.rank>1">{{omerMsg.rank>100?'100+':omerMsg.rank}}</div>
      <div class="imgBox">
        <span class="avBg" v-if="omerMsg.rank<=3"></span>
        <img v-lazy="omerMsg.avatar" alt="">
      </div>
      <div class="nick">{{omerMsg.nick}}</div>
      <div class="score">Điểm<em>{{omerMsg.score}}</em></div>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex"
import api from "../api/apiConfig"
export default {
  props: ['omerMsg'],
  data() {
    return {
      loaded: false,
      more: true
    }
  },
  computed: {
    ...mapState(['rank', 'reg'])
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
          api.getRank(this.rank.length, 'more').then(res => {
            this.more = true
            if (res.data.response_data.list.length === 0) {
              this.loaded = true
            } else {
              this.vxc('addRank', res.data.response_data.list)
            }
          })
        }
      }
    },
    close() {
      this.$parent.showRank = false
    },
    goUser(uid) { //跳转
      var isiOS = navigator.userAgent.match(/iPhone|iPod|ios|iPad/i);
      if (isiOS) {
        sendJsData('app://userInfo?uid=' + uid);
      } else {
        javascript: JSInterface.sendJsData('app://userInfo?uid=' + uid);
      }
    },
  }
}
</script>
<style lang="scss">
.noData {
  text-align: center;
  margin: 0.5rem auto 0;
}
.rank {
  width: 7.1rem;
  height: 10rem;
  padding-top: 1.31rem;
  background: url(../assets/img/rankBg.png);
  background-size: 100% 100%;
  position: relative;
  ul {
    height: 8.4rem;
    overflow-y: scroll;
    &.noData {
      height: 7rem;
    }
  }
  li,
  .userMsg {
    width: 6.37rem;
    display: flex;
    align-items: center;
    height: 1.21rem;
    margin: 0 auto;
    background: url(../assets/img/listItembg.png);
    background-size: 100% 100%;
    margin-bottom: 0.1rem;
    .userRank {
      width: 0.6rem;
      margin-left: 0.14rem;
      text-align: center;
      font-weight: 800;
    }
    .imgBox {
      width: 0.95rem;
      height: 0.94rem;
      margin-left: 0.15rem;
      position: relative;
      .avBg {
        display: block;
        width: 100%;
        height: 100%;
        position: absolute;
      }
      img {
        display: block;
        width: 0.8rem;
        height: 0.8rem;
        margin: 0.07rem 0 0 0.06rem;
        border-radius: 50%;
      }
    }
    .nick {
      width: 3rem;
      color: rgba(240, 249, 254, 1);
      font-size: 0.38rem;
      font-weight: 500;
      margin-left: 0.17rem;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    .score {
      width: 1.3rem;
      font-size: 0.24rem;
      font-weight: 500;
      text-align: center;
      em {
        font-size: 0.28rem;
        font-weight: 500;
        display: block;
      }
    }
    &.list1 {
      width: 2.2rem;
      height: 3.45rem;
      flex-direction: column;
      background: none;
      margin: 0 auto;
      .imgBox {
        width: 2.2rem;
        height: 2.15rem;
        position: relative;
        .avBg {
          display: block;
          width: 100%;
          height: 100%;
          background: url(../assets/img/top1.png);
          background-size: 100% 100%;
          position: absolute;
          z-index: 1;
        }
        img {
          position: absolute;
          width: 1.72rem;
          height: 1.72rem;
          top: 0.1rem;
          left: 0.24rem;
          margin: 0;
          border-radius: 50%;
        }
      }
      .nick {
        width: 100%;
        font-weight: 600;
        text-align: center;
        color: rgba(212, 62, 25, 1);
      }
      .score {
        width: 100%;
        text-align: center;
        font-size: 0.24rem;
        font-weight: 500;
        color: rgba(233, 140, 86, 1);
        em {
          font-size: 0.33rem;
          font-weight: 800;
        }
      }
    }
    &.list2 {
      background: url(../assets/img/top2.png);
      background-size: 100% 100%;
      .avBg {
        background: url(../assets/img/av2.png);
        background-size: 100% 100%;
      }
    }
    &.list3 {
      background: url(../assets/img/top2.png);
      background-size: 100% 100%;
      .avBg {
        background: url(../assets/img/av3.png);
        background-size: 100% 100%;
      }
    }
  }
  .userMsg {
    background: url(../assets/img/ownerBg.png);
    background-size: 100% 100%;
  }
  .close {
    display: block;
    width: 0.51rem;
    height: 0.51rem;
    background: url(../assets/img/close.png);
    background-size: 100% 100%;
    position: absolute;
    right: 0.54rem;
    top: 1.08rem;
    z-index: 10;
  }
}
</style>
