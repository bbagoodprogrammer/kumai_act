<template>
  <div class="rank">
    <h3 class="title">歌曲榜單</h3>
    <p class="tips">本首作品收聽人數、收聽時長、增加關注人數綜合進行排名</p>
    <p class="noData" v-if="list.length == 0">暫無數據</p>
    <ul>
      <li v-for="(item,index) in list " :key="index" :class="'rank' + item.rank" @click="goSid(item.sid)">
        <span class="userRank">{{item.rank}}</span>
        <img v-lazy="activite==1?'':item.avatar" alt="">
        <div class="userMsg">
          <!-- activite==1?'?????': -->
          <!-- activite==1?'???': -->
          <div class="nick">{{item.name}}</div>
          <div class="uid">{{item.uid}}</div>
        </div>
        <div class="score">人氣值：<strong>{{item.score}}</strong> </div>
      </li>
    </ul>
    <loading />
  </div>
</template>
<script>
import Loading from "../../components/Loading"
import api from "../../api/apiConfig"
export default {
  components: { Loading },
  data() {
    return {
      list: [],
      ismore: false,
      loaded: false,
      activite: null
    }
  },
  mounted() {
    window.addEventListener('scroll', this.onScroll)
  },
  destroyed() {
    window.removeEventListener('scroll', this.onScroll)
  },
  created() {
    document.title = '歌曲榜單'
    this.activite = sessionStorage.getItem('activite')
    api.getRank(0).then(res => {
      this.list = res.data.response_data.list
    })
  },
  methods: {
    onScroll() { //滾動加載
      const scrollToBottom = (document.documentElement.scrollTop || document.body.scrollTop) + window.innerHeight >= document.body.scrollHeight - 100
      if (scrollToBottom && !this.ismore && !this.loaded) { //加載更多合併數組存入vuex
        this.ismore = true
        api.getRank(this.list.length, 'more').then(res => {
          this.ismore = false
          let list = res.data.response_data.list
          if (list.length < 20) {
            this.loaded = true
          } else {
            this.list = this.list.concat(list)
          }

        })
      }
    },
    goSid(sid) {
      if (this.activite != 1) {
        location.href = 'songid:{"songlist":[' + sid + ' ],"index":0}';
      }
    }
  }
}
</script>
<style lang="scss">
body {
  background: rgba(16, 128, 208, 1);
}
.rank {
  padding: 0.61rem 0.24rem 0;
  .title {
    color: rgba(255, 211, 168, 1);
    font-size: 0.36rem;
    font-weight: 800;
    text-align: center;
  }
  .tips {
    font-size: 0.24rem;
    font-weight: 600;
    text-align: center;
    margin: 0.22rem auto 0.45rem;
  }
  .noData {
    text-align: center;
  }
  ul {
    li {
      height: 1rem;
      display: flex;
      align-items: center;
      margin-bottom: 0.34rem;
      .userRank {
        width: 0.75rem;
        height: 0.65rem;
        text-align: center;
        line-height: 0.65rem;
        color: rgba(197, 255, 245, 1);
        font-size: 0.36rem;
        font-weight: 600;
      }
      img {
        width: 1rem;
        height: 1rem;
        border-radius: 50%;
        margin: 0 0.16rem;
        border: 0.03rem solid RGBA(229, 119, 92, 1);
      }
      .userMsg {
        width: 2.8rem;
        font-weight: 600;
        .nick {
          max-width: 2.8rem;
          font-size: 0.26rem;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
        .uid {
          font-size: 0.22rem;
          color: rgba(165, 222, 255, 1);
          margin-top: 0.12rem;
        }
      }
      .score {
        font-size: 0.22rem;
        color: rgba(196, 181, 255, 1);
        font-weight: 600;
        strong {
          font-size: 0.22rem;
          color: rgba(255, 181, 181, 1);
        }
      }
      &.rank1 {
        .userRank {
          background: url(../../assets/img/top1.png);
          background-size: 100% 100%;
          text-indent: -999rem;
        }
      }
      &.rank2 {
        .userRank {
          background: url(../../assets/img/top2.png);
          background-size: 100% 100%;
          text-indent: -999rem;
        }
      }
      &.rank3 {
        .userRank {
          background: url(../../assets/img/top3.png);
          background-size: 100% 100%;
          text-indent: -999rem;
        }
      }
    }
  }
}
@import "../../assets/scss/common.scss";
</style>
