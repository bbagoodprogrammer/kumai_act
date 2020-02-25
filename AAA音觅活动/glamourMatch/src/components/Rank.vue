<template>
  <div class="list" :class="{maxTop:rank.length == 0}">
    <div class="noData" v-if="rank.length == 0">
      暫無歌友上榜噢~
    </div>
    <div class="rankList" v-else>
      <div class="top1">
        <div class="rank"></div>
        <div class="msg">
          <div class="imgBox" @click="goUser(top1.uid)">
            <img src="../assets/img/top1.png" alt="" class="img1">
            <img v-lazy="top1.avatar" alt="" class="img2">
          </div>
          <strong>{{top1.nick}}</strong>
        </div>
        <div class="score">
          <strong>金幣魅力值</strong>
          <em>{{top1.score}}</em>
        </div>
      </div>
      <ul>
        <li :class="'rank'+item.rank" v-for="(item,index) in newRank" :key="index">
          <div class="rank">
            {{item.rank}}
          </div>
          <img v-lazy="item.avatar" alt="" class="avatar" @click="goUser(item.uid)">
          <div class="userMsg">
            <div class="name">{{item.nick}}</div>
            <div class="ming">{{item.sign}}</div>
          </div>
          <div class="score">
            <strong>金幣魅力值</strong>
            <em>{{item.score}}</em>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex"
import api from "../api/apiConfig"
export default {
  data() {
    return {
      more: true,
      loaded: false
    }
  },
  computed: {
    ...mapState(["rank"]),
    top1() {
      return this.rank.length > 0 ? this.rank[0] : {}
    },
    newRank() {
      return this.rank.length > 1 ? this.rank.slice(1) : []
    }
  },
  mounted() {
    window.addEventListener('scroll', this.onScroll);
  },
  methods: {
    goUser(uid) {
      var u = navigator.userAgent;
      var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
      var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
      if (isiOS) {
        sendJsData('app://userInfo?uid=' + uid);
      } else {
        javascript: JSInterface.sendJsData('app://userInfo?uid=' + uid);
      }
    },
    onScroll() {
      const scrollToBottom = (document.documentElement.scrollTop || document.body.scrollTop) + window.innerHeight >= document.body.scrollHeight - 100;
      if (scrollToBottom && this.more && !this.loaded) {
        this.more = false
        api.getRank(this.rank.length).then(res => {
          this.more = true
          let list = res.data.response_data.rank
          if (list.length > 0) {
            this.$store.commit('addRank', list)
          } else {
            this.loaded = true
          }
        })
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.list {
  width: 7.22rem;
  padding-bottom: 1.5rem;
  margin: 0.32rem auto;
  background: #fdc9c8 url(../assets/img/rankBg.png) center 0 no-repeat;
  background-size: 100% auto;
  &.maxTop {
    padding-top: 1rem;
  }
  .noData {
    text-align: center;
    color: #9b3022;
  }
  .top1 {
    height: 3.43rem;
    display: flex;
    align-items: center;
    .rank {
      width: 0.8rem;
      height: 0.97rem;
      background: url(../assets/img/no1.png);
      background-size: 100% 100%;
      margin: 0 0.88rem 0 0.92rem;
    }
    .msg {
      width: 2.19rem;
      position: relative;
      .imgBox {
        height: 2.08rem;
        .img1 {
          width: 2.19rem;
          height: 2.08rem;
          position: absolute;
          z-index: 50;
        }
        .img2 {
          width: 1.8rem;
          height: 1.8rem;
          border-radius: 50%;
          position: absolute;
          top: 0.26rem;
          left: 0.19rem;
        }
      }
      strong {
        display: block;
        max-width: 2.19rem;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        text-align: center;
        color: #9b3022;
        margin-top: 0.1rem;
      }
    }
    .score {
      width: 2rem;
      color: #9b3022;
      text-align: center;
      margin-left: 0.25rem;
      strong {
        display: block;
        font-size: 0.28rem;
      }
      em {
        font-size: 0.26rem;
        font-weight: bold;
      }
    }
  }
  ul {
    width: 6.88rem;
    margin: 0 auto;
    li {
      height: 1.53rem;
      background: url(../assets/img/rankDefalute.png);
      background-size: 100% 100%;
      display: flex;
      align-items: center;
      margin-bottom: 0.08rem;
      .rank {
        width: 0.56rem;
        height: 0.67rem;
        line-height: 0.67rem;
        text-align: center;
        margin: 0 0.13rem 0 0.18rem;
        font-weight: bold;
        color: rgba(155, 48, 34, 1);
      }
      .avatar {
        width: 1rem;
        height: 1rem;
        border-radius: 50%;
        border: 0.03rem solid #fffff8;
      }
      .userMsg {
        width: 2.8rem;
        margin-left: 0.14rem;
        .name {
          color: #9b3022;
          max-width: 2.3rem;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .ming {
          color: #844c1a;
          font-size: 0.24rem;
          margin-top: 0.05rem;
          max-width: 2.8rem;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }
      .score {
        font-size: 0.28rem;
        text-align: center;
        margin-left: 0.28rem;
        strong {
          display: block;
          color: #b2670e;
        }
        em {
          font-weight: bold;
          color: #aa4721;
        }
      }
      &.rank2 {
        background: url(../assets/img/rank2.png);
        background-size: 100% 100%;
        .rank {
          text-indent: -999rem;
          background: url(../assets/img/no2.png);
          background-size: 100% 100%;
        }
      }
      &.rank3 {
        background: url(../assets/img/rank3.png);
        background-size: 100% 100%;
        .rank {
          text-indent: -999rem;
          background: url(../assets/img/no3.png);
          background-size: 100% 100%;
        }
      }
    }
  }
}
</style>
