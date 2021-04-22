<template>
  <div class="rankList" v-if="rank.length > 0">
    <h6>排行榜</h6>
    <div class="list">
      <div class="top1">
        <div class="top1Rank">
          <div class="imgBox" @click="goUser(top1.uid)">
            <img src="../assets/img/rankDeer/top1.png" alt="" class="top1Tips">
            <img v-lazy="top1.avatar" alt="" class="top1Avatar">
          </div>
          <strong>{{top1.nick}}</strong>
        </div>
        <div class="topDeer">
          <img :src="require(`../assets/img/top1Deer/deer${top1.deer_level}.png`)" alt="" v-if="top1.deer_level">
          <strong>{{top1.deer_nick}}</strong>
        </div>
        <div class="score">
          <em>成長值</em>
          <strong>{{top1.rank_score}}</strong>
        </div>
      </div>
      <li v-for="(item,index) in surplusArr" :key="index" :class="'rank'+item.rank">
        <div class="rank">{{item.rank}}</div>
        <img v-lazy="item.avatar" alt="" class="userAvatar" @click="goUser(item.uid)">
        <div class="nick">{{item.nick}}</div>
        <div class="deerLv">
          <img :src="require(`../assets/img/rankDeer/deer${item.deer_level}.png`)" alt="" class="userDeer" :class="'deer'+item.lv">
        </div>
        <div class="score">
          <em>成長值</em>
          <strong>{{item.rank_score}}</strong>
        </div>
      </li>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex"
import api from "../api/apiConfig"
export default {
  data () {
    return {
      isMore: true,
      loaded: false
    }
  },
  computed: {
    ...mapState(['rank']),
    top1 () {
      if (this.rank.length) {
        return this.rank[0]
      }
      return {}
    },
    surplusArr () {
      if (this.rank.length) {
        return this.rank.slice(1)
      }
      return []
    }
  },
  mounted () {
    window.addEventListener('scroll', this.onScroll)
  },
  methods: {
    goUser (uid) {
      var u = navigator.userAgent;
      var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
      var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
      if (isiOS) {
        sendJsData('app://userInfo?uid=' + uid);
      } else {
        javascript: JSInterface.sendJsData('app://userInfo?uid=' + uid);
      }
    },
    onScroll () {
      if (this.isMore) {
        const scrollToBottom = (document.documentElement.scrollTop || document.body.scrollTop) + window.innerHeight >= document.body.scrollHeight - 100
        if (scrollToBottom && !this.loaded) { //加載更多
          this.isMore = false
          api.getRank(this.rank.length).then(res => {
            this.isMore = true
            this.vxc('addRank', res.data.response_data.rank)
            if (res.data.response_data.rank.length < 20) {
              this.loaded = true
            }
          })
        }
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.rankList {
  margin-top: 0.4rem;
  padding: 0 0.31rem;
  h6 {
    color: #386e06;
    font-weight: bold;
  }
  .list {
    margin-top: 0.26rem;
    .top1 {
      height: 3.01rem;
      margin-bottom: 0.11rem;
      background: url(../assets/img/top1Bg.png);
      background-size: 100% 100%;
      display: flex;
      align-items: center;
      .top1Rank {
        width: 2.76rem;
        height: 100%;
        position: relative;
        .imgBox {
          width: 2.76rem;
          height: 2.4rem;
          position: relative;
          .top1Tips {
            width: 2.76rem;
            height: 1.94rem;
            position: absolute;
            top: 0.25rem;
            left: 0.21rem;
            z-index: 2;
          }
          .top1Avatar {
            width: 1.45rem;
            height: 1.45rem;
            border-radius: 50%;
            position: absolute;
            left: 0.9rem;
            top: 0.7rem;
          }
        }
        strong {
          display: block;
          min-width: 2.2rem;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          text-align: center;
          text-indent: 0.4rem;
          margin: 0 auto 0;
        }
      }
      .topDeer {
        width: 2.2rem;
        height: 100%;
        margin-left: 0.15rem;
        img {
          display: block;
          width: 2rem;
          height: 2rem;
          margin: 0.13rem auto 0;
        }
        strong {
          display: block;
          text-align: center;
          // text-indent: 0.4rem;
          margin: 0 auto 0;
        }
      }
      .score {
        width: 1.5rem;
        text-align: center;
        margin-left: 0.15rem;
        em {
          display: block;
          color: #ffe479;
          font-weight: bold;
        }
        strong {
          font-size: 0.34rem;
          color: #6ffff3;
        }
      }
    }
    li {
      height: 0.95rem;
      margin-bottom: 0.11rem;
      background: url(../assets/img/rankDefault.png);
      background-size: 100% 100%;
      display: flex;
      align-items: center;
      .rank {
        width: 1rem;
        text-align: center;
        font-size: 0.42rem;
        color: #beffcf;
        font-weight: 800;
        margin-left: 0.15rem;
      }
      .userAvatar {
        width: 0.65rem;
        height: 0.65rem;
        border-radius: 50%;
        border: 0.02rem solid #f0f861;
      }
      .nick {
        font-weight: bold;
        font-size: 0.32rem;
        margin-left: 0.15rem;
        width: 2.5rem;
        max-width: 2.5rem;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      .deerLv {
        width: 0.8rem;
        height: 100%;
        margin: 0 0.1rem;
        display: flex;
        align-items: center;
        justify-content: center;
        .userDeer {
          width: 0.9rem;
          height: 0.9rem;
        }
      }

      .score {
        width: 1.2rem;
        text-align: center;
        em {
          display: block;
          font-size: 0.22rem;
          color: #ffe479;
          font-weight: bold;
        }
        strong {
          font-size: 0.24rem;
          color: #6ffff3;
        }
      }
      &.rank2 {
        background: url(../assets/img/rank2Bg.png);
        background-size: 100% 100%;
        .rank {
          text-indent: -999rem;
        }
      }
      &.rank3 {
        background: url(../assets/img/rank3Bg.png);
        background-size: 100% 100%;
        .rank {
          text-indent: -999rem;
        }
      }
    }
  }
}
</style>
